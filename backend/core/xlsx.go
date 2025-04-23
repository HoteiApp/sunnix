package core

import (
	"encoding/json"
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/xuri/excelize/v2"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func openXlsx() *excelize.File {
	excelFile, err := excelize.OpenFile(system.ImportClientsFile)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := excelFile.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	// Obtener todas las hojas del archivo

	return excelFile
}

func rowsSheet(file *excelize.File, sheetName string) [][]string {
	// Obtener todas las filas de la hoja
	rows, err := file.GetRows(sheetName)
	if err != nil {
		log.Fatal(err)
	}

	if len(rows) == 0 {
		log.Fatal("La hoja de Excel está vacía")
	}

	return rows
}

func FormatearFecha(fecha string) string {
	// Posibles formatos de entrada
	formatos := []string{
		"1/2/2006", // 1/4/2021
		"01/02/2006",
		"1/2/06",   // 1/4/21
		"01/02/06", // 01/04/21
	}

	var t time.Time
	var err error

	// Intentamos parsear con cada formato
	for _, f := range formatos {
		t, err = time.Parse(f, fecha)
		if err == nil {
			break
		}
	}

	// Retornamos en formato MM/DD/YYYY
	return t.Format("01/02/2006")
}

func getUserLdap(uid string) models.Users {
	// Seleccionar TCM
	var user models.Users
	result := ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")
	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		userLdap := resultSearch.Entries[0]
		// FIXME: Aqui va los campos de la tabla de usuario exportados del LDAP
		id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
		user.ID = uint(id)
		user.Uid = userLdap.GetAttributeValue("uid")
		user.Email = userLdap.GetAttributeValue("mail")
		user.Nick = userLdap.GetAttributeValue("givenName")
		user.Signature = userLdap.GetAttributeValue("signature")

		user.Roll = userLdap.GetAttributeValue("roll")
		if userLdap.GetAttributeValue("roll") == "TCM" {
			user.Credentials = userLdap.GetAttributeValue("credentials")
		}
		if userLdap.GetAttributeValue("roll") == "TCMS" {
			user.Credentials = "CBHCMS"
		}
		user.Credentials = userLdap.GetAttributeValue("credentials")
		user.Supervisor = userLdap.GetAttributeValue("supervisor")
	}
	return user
}

func EsMayuscula(texto string) bool {
	return texto == strings.ToUpper(texto) && texto != strings.ToLower(texto)
}

func XlsxImportClients() {
	excelFile, err := excelize.OpenFile(system.ImportClientsFile)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := excelFile.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	// Obtener todas las hojas del archivo
	sheets := excelFile.GetSheetList()
	if len(sheets) == 0 {
		log.Fatal("El archivo Excel no contiene hojas")
	}

	// Usaremos la primera hoja (puedes cambiarlo según necesites)
	sheetName := sheets[0]
	fmt.Printf("Leyendo datos de la hoja: %s\n", sheetName)

	// Obtener todas las filas de la hoja
	rows, err := excelFile.GetRows(sheetName)
	if err != nil {
		log.Fatal(err)
	}

	if len(rows) == 0 {
		log.Fatal("La hoja de Excel está vacía")
	}

	// Mostrar encabezados (primera fila)
	// headers := rows[0]
	// fmt.Println("\nEncabezados:")
	// for i, header := range headers {
	// 	fmt.Printf("Columna %d: %s\n", i+1, header)
	// }

	// Compilar la expresión regular fuera del bucle
	// regex, err := regexp.Compile(`^\d+-[1-5]$`)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	clientsActive := 0
	clientsClosed := 0
	clientsNoOpend := 0

	// Procesar y mostrar las filas de datos
	for rowIdx, row := range rows {
		if rowIdx == 0 {
			continue // Saltar la fila de encabezado si lo deseas
		}

		uidTCM := ""
		// uidTCMS := ""
		// TODO Crear un mapa con los datos que lleva una admision para poderlo guardar en la base de datos
		// fmt.Println("------", len(row))
		if len(row) > 16 {
			uidTCM = row[6]
			//-- Mr
			var mr, admission string

			// Comprobar si la celda de MR tiene -
			re, _ := regexp.Compile(`^\d+-[1-5]$`)
			mrData := strings.ReplaceAll(row[2], ".", "")

			if re.MatchString(mrData) {
				parts := regexp.MustCompile(`-`).Split(mrData, 2)
				if len(parts) == 2 {
					mr = parts[0]
					admission = parts[1]
					// var client models.Clients
					// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
					// 	silentDB := db.Session(&gorm.Session{Logger: logger.Default.LogMode(logger.Silent)})
					// 	silentDB.Where("mr = ?", mr).Find(&client)
					// 	if client.ID != 0 {
					// 		client.Status = row[5]
					// 		if EsMayuscula(uidTCM) {
					// 			client.ReferringPerson = uidTCM
					// 		} else {
					// 			client.TcmActive = uidTCM
					// 		}
					// 	}
					// 	return client
					// })
					// break
				}
			} else {
				mr = mrData
			}

			// fmt.Println(mr)
			// Solo se tendra en cuenta primera admission
			// ----------------------------------------------------------------------------------------------
			if admission == "" && mr != "" {

				var client models.Clients

				mrInt, err := strconv.Atoi(mr)
				if err != nil {
					log.Fatalf("Error converting mr to int: %v", err)
				}

				// Columna 0: LAST NAME
				// Columna 1: FIRST NAME
				// Columna 2: MR
				// Columna 3: DX
				// Columna 4: DOA
				// Columna 5: CLOSING
				// Columna 6: TCM
				// Columna 7: HEALTH PLAN
				// Columna 8: PSYCH EVAL
				// Columna 9: LOCATION
				// Columna 10: MEDICAID ID
				// Columna 11: MEDICARE ID
				// Columna 12: INSURANCE ID
				// Columna 13: SUPERVISOR
				// Columna 14: Auth. Exp
				// Columna 15: DOB
				// Columna 16: SS#
				// Columna 17: PHONE #
				// Columna 18: ADDRESS

				status := "Closed"
				if row[5] == "ACTIVE" {
					status = "Open"
				} else if row[5] == "CLOSED" {
					status = "Closed"
				} else {
					status = "No Opened"
				}

				if EsMayuscula(uidTCM) {
					client.ReferringPerson = uidTCM
				} else {
					client.TcmActive = uidTCM
				}

				client.Mr = mrInt

				client.Status = status
				client.ReferringAgency = "SunissUp"

				client.CellPhone = ""
				client.Fax = ""
				client.Email = ""
				client.Date = FormatearFecha(strings.ReplaceAll(row[4], "-", "/"))
				client.LastName = row[0]
				client.FirstName = row[1]
				client.SS = row[16]
				client.DOB = FormatearFecha(strings.ReplaceAll(row[15], "-", "/"))

				address := "N/A"
				if len(row) >= 19 {
					address = row[18]
				}

				client.Address = address
				client.State = row[9]
				Phone := "N/A"
				if len(row) >= 18 {
					Phone = row[17]
				}
				client.Phone = Phone
				client.Medicaid = row[10]
				client.Medicare = row[11]

				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					silentDB := db.Session(&gorm.Session{Logger: logger.Default.LogMode(logger.Silent)})
					// Validar Medicaid
					if client.Medicaid != "" {
						var existing models.Clients
						if err := silentDB.Where("medicaid = ?", client.Medicaid).First(&existing).Error; err == nil {
							fmt.Println("DuplicateMedicaid:", client.Medicaid)
							return false
						}
					}

					// Validar Medicare
					if client.Medicare != "" && client.Medicare != "N/A" {
						var existing models.Clients
						if err := silentDB.Where("medicare = ?", client.Medicare).First(&existing).Error; err == nil {
							return fmt.Errorf("ya existe otro cliente con el mismo número de Medicare: %s", client.Medicare)
						}
					}

					// Guardar si no hay duplicados
					if err := silentDB.Save(&client).Error; err != nil {
						return fmt.Errorf("error al guardar el cliente: %v", err)
					}

					return client
				})
			}
		}
		// fmt.Println(uidTCM)
	}
	fmt.Printf("\nTotal de filas procesadas: %d\n", len(rows)-1) // Restamos 1 por los encabezados
	fmt.Println(clientsActive, clientsClosed, clientsNoOpend)
}

func XlsxImportAdmission() {
	//  Abrir Archivo
	xlsx := openXlsx()
	// Obtener las hojas
	sheets := xlsx.GetSheetList()
	if len(sheets) == 0 {
		log.Fatal("El archivo Excel no contiene hojas")
	}
	// Usaremos la primera hoja
	sheetName := sheets[0]
	fmt.Printf("Leyendo datos de la hoja: %s\n", sheetName)
	rows := rowsSheet(xlsx, sheetName)

	for rowIdx, row := range rows {
		if rowIdx == 0 {
			continue // Saltar la fila de encabezado si lo deseas
		}
		if len(row) > 16 {
			// if row[5] == "ACTIVE" {

			re, _ := regexp.Compile(`^\d+-[1-5]$`)
			mrData := strings.ReplaceAll(row[2], ".", "")
			if re.MatchString(mrData) {
				parts := regexp.MustCompile(`-`).Split(mrData, 2)
				if len(parts) == 2 {
					// ADMISSIONs
					// mr := parts[0]
					// admission := parts[1]
					// fmt.Println("Admmision", mr, admission)
				}
			} else {
				mr := mrData
				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					// Seleccionar TCM
					// step 1
					var client models.Clients
					db.Where("mr = ?", mr).Find(&client)
					if client.ID != 0 {
						if row[6] == "islaidefg" {
							// Seleccionar TCM
							tcm := getUserLdap(row[6])
							// Seleccionar TCMS
							tcms := getUserLdap(tcm.Supervisor)
							// Seleccionar DOA
							doa := FormatearFecha(strings.ReplaceAll(row[4], "-", "/"))

							status := "Closed"
							if row[5] == "ACTIVE" {
								status = "Open"
							} else if row[5] == "CLOSED" {
								status = "Closed"
							} else {
								status = "Pending"
							}

							mentalPrimary := strings.ReplaceAll(row[3], ".", "")
							mentalPrimaryDate := strings.ReplaceAll(row[8], "-", "/")
							// Create folder in Bucket
							ExtractFunctionsPlugins("s3", "CreateFolder", "clients/"+strconv.FormatUint(uint64(client.ID), 10)+"/")
							// Create addmission
							clientServiceCaseManagement := models.ClientServiceCaseManagement{
								Client: int(client.ID),
								TCM:    int(tcm.ID), // Valor por defecto para TCM
								Doa:    doa,
								Status: status,
							}
							db.Save(&clientServiceCaseManagement)
							// Actualizar tcm t tcms en el client
							client.TcmActive = tcm.Uid
							client.Status = status
							db.Save(&client)
							if db.Error != nil {
								return false
							} else {
								scmID := clientServiceCaseManagement.ID
								// Demografic----------------------
								clientSCMDemografic := models.ClientSCMDemografic{
									Client: int(client.ID),
									Scm:    scmID,

									ReferringAgency: client.ReferringAgency,
									ReferringPerson: client.ReferringPerson,
									CellPhone:       client.CellPhone,
									Fax:             client.Fax,
									Email:           client.Email,
									Date:            FormatearFecha(client.Date),

									LastName:  client.LastName,
									FirstName: client.FirstName,
									SS:        client.SS,
									DOB:       FormatearFecha(client.DOB),
									Sexo:      client.Sexo,
									Race:      client.Race,

									Address: client.Address,
									State:   client.State,
									ZipCode: client.ZipCode,

									Phone:    client.CellPhone,
									School:   client.School,
									Lenguage: client.Lenguage,

									LegalGuardian:     client.LegalGuardian,
									Relationship:      client.Relationship,
									CellPhoneGuardian: client.CellPhoneGuardian,

									Medicaid:       client.Medicaid,
									GoldCardNumber: client.GoldCardNumber,
									Medicare:       client.Medicare,
								}
								db.Save(&clientSCMDemografic)
								// TCM-------------------------
								clientSCMTcm := models.ClienteSCMTcm{
									Client:      int(client.ID),
									Scm:         scmID,
									FullName:    tcm.Nick,
									Categorytcm: tcm.Credentials,
									Signature:   tcm.Signature,
									Active:      tcm.Active,
								}
								db.Save(&clientSCMTcm)
								// Medical-------------------------
								clientSCMMedical := models.ClientSCMMedical{
									Client: int(client.ID),
									Scm:    scmID,
									// MedicalPcp:        requestData.NewCMMedical.MedicalPcp,
									// MedicalPcpAddress: requestData.NewCMMedical.MedicalPcpAddress,
									// MedicalPcpPhone:   requestData.NewCMMedical.MedicalPcpPhone,

									// MedicalPsychiatrisy:        requestData.NewCMMedical.MedicalPsychiatrisy,
									// MedicalPsychiatrisyAddress: requestData.NewCMMedical.MedicalPsychiatrisyAddress,
									// MedicalPsychiatrisyPhone:   requestData.NewCMMedical.MedicalPsychiatrisyPhone,
								}
								db.Save(&clientSCMMedical)
								// Mental--------------------------
								clientSCMMental := models.ClientSCMMental{
									Client:            int(client.ID),
									Scm:               scmID,
									MentalPrimary:     mentalPrimary,
									MentalPrimaryDate: FormatearFecha(mentalPrimaryDate),
									// MentalSecondary:     requestData.Newclient.MentalSecondary,
									// MentalSecondaryDate: requestData.Newclient.MentalSecondaryDate,
								}
								db.Save(&clientSCMMental)
								// Certification---------------------
								clientCertification := models.ClientSCMCertification{
									Client: int(client.ID),
									Scm:    scmID,
									// -- Dates TCM
									Tcm:         int(tcm.ID),
									Nametcm:     tcm.Nick,
									Categorytcm: tcm.Credentials,
									// Dates TCMS
									Supervisor:         int(tcms.ID),
									NameSupervisor:     tcms.Nick,
									Categorysupervisor: tcms.Credentials,
								}
								db.Save(&clientCertification)
								// Assessment------------------------
								clientAssessment := models.ClientSCMAssessment{
									Client: int(client.ID),
									Scm:    scmID,
									// Dates TCM
									Tcm:         int(tcm.ID),
									Nametcm:     tcm.Nick,
									Categorytcm: tcm.Credentials,
									// Dates TCMS
									Supervisor:         int(tcms.ID),
									NameSupervisor:     tcms.Nick,
									CategorySupervisor: tcms.Credentials,
								}
								db.Save(&clientAssessment)
								// SP------------------------
								clientSp := models.ClientSCMSp{
									Client: int(client.ID),
									Scm:    scmID,
									// Dates TCM
									Tcm:         int(tcm.ID),
									Nametcm:     tcm.Nick,
									Categorytcm: tcm.Credentials,
									// Dates TCMS
									Supervisor:         int(tcms.ID),
									NameSupervisor:     tcms.Nick,
									CategorySupervisor: tcms.Credentials,
								}
								db.Save(&clientSp)
								var sp models.ClientSCMSp
								db.Where("scm = ?", scmID).Find(&sp)
								// Goal1------------------------
								goal1 := models.SpGoal1{
									Sp: sp.ID,
								}
								db.Save(&goal1)
								// Goal2------------------------
								goal2 := models.SpGoal2{
									Sp: sp.ID,
								}
								db.Save(&goal2)
								// Goal3------------------------
								goal3 := models.SpGoal3{
									Sp: sp.ID,
								}
								db.Save(&goal3)
								// Goal4------------------------
								goal4 := models.SpGoal4{
									Sp: sp.ID,
								}
								db.Save(&goal4)
								// Goal5------------------------
								goal5 := models.SpGoal5{
									Sp: sp.ID,
								}
								db.Save(&goal5)
								// Goal6------------------------
								goal6 := models.SpGoal6{
									Sp: sp.ID,
								}
								db.Save(&goal6)
								// Goal7------------------------
								goal7 := models.SpGoal7{
									Sp: sp.ID,
								}
								db.Save(&goal7)
								// Goal8------------------------
								goal8 := models.SpGoal8{
									Sp: sp.ID,
								}
								db.Save(&goal8)
							}
							fmt.Println("Client create addmision")
						}
					} else {
						// fmt.Println("Crear MR:", mr)
					}
					return ""
				})

			}

			// }

		}
	}
}
