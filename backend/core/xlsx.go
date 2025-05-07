package core

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
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

var tcmList = make(map[string]string)
var tcmsList = make(map[string]models.Users)

// DuplicateMedicaid: 9537363856 ok
// DuplicateMedicaid: 9525997430 ok
// DuplicateMedicaid: 9647185171 falta doa
// DuplicateMedicaid: 9545201011 falta doa

// contains checks if a string exists in a slice.
func contains(slice []string, item string) bool {
	for _, v := range slice {
		if v == item {
			return true
		}
	}
	return false
}

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
	formatos := []struct {
		formato  string
		anoCorto bool
	}{
		{"1/2/2006", false},
		{"01/02/2006", false},
		{"1/2/06", true},
		{"01/02/06", true},
	}

	var t time.Time
	var err error
	var anoCorto bool

	// Intentamos parsear con cada formato
	for _, f := range formatos {
		t, err = time.Parse(f.formato, fecha)
		if err == nil {
			anoCorto = f.anoCorto
			break
		}
	}

	if err != nil {
		// Si no pudimos parsear, regresamos la fecha original
		return fecha
	}

	// Ajustar año si era de formato corto
	if anoCorto {
		originalYear := t.Year() % 100
		currentYear := time.Now().Year() % 100

		if t.Year() >= 2000 && t.Year() <= 2099 {
			if originalYear > currentYear {
				t = t.AddDate(-100, 0, 0) // restar 100 años
			}
		}
	}

	// Retornamos en formato 01/02/2006 (con ceros agregados)
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

func generateDicctionary() {
	// Abrir el archivo JSON
	file, err := os.Open(system.ImportTcmListFile)
	if err != nil {
		fmt.Println("Error abriendo el archivo:", err)
		return
	}
	defer file.Close()
	// Decodificar el JSON al mapa
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&tcmList)
	if err != nil {
		fmt.Println("Error decodificando el JSON:", err)
		return
	}
}

// Importar clientes desde un archivo Excel
// XlsxImportClients lee un archivo Excel y procesa los datos de los clientes
// 0 LAST NAME
// 1 FIRST NAME
// 2 MR
// 3 DX
// 4 PSYCH EVAL
// 5 DOA
// 6 STATUS
// 7 TCM
// 8 SUPERVISOR
// 9 LOCATION
// 10 HEALTH PLAN
// 11 MEDICAID ID
// 12 MEDICARE ID
// 13 INSURANCE ID
// 14 DOB
// 15 SS#
// 16 PHONE #
// 17 ADDRESS
func XlsxImportClients() {
	generateDicctionary()
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

	// Procesar y mostrar las filas de datos
	for rowIdx, row := range rows {
		if rowIdx == 0 {
			continue // Saltar la fila de encabezado si lo deseas
		}

		uidTCM := ""
		if len(row) > 16 {
			if val, exists := tcmList[row[7]]; exists {
				uidTCM = val
			} else {
				fmt.Printf("No se encontró Usuario para '%s'\n", row[7])
			}
			//-- Mr
			var mr, admission string

			mrData1 := strings.ReplaceAll(row[2], ".", "-")
			mrData := strings.ReplaceAll(mrData1, "_", "-")

			// Comprobar si la celda de MR tiene -
			re, _ := regexp.Compile(`^\d+-[1-5]$`)

			if re.MatchString(mrData) {
				parts := regexp.MustCompile(`-`).Split(mrData, 2)
				if len(parts) == 2 {
					mr = parts[0]
					admission = parts[1]
				}
			} else {
				mr = mrData
			}

			// Solo se tendra en cuenta primera admission
			// ----------------------------------------------------------------------------------------------
			if admission == "" && mr != "" {

				var client models.Clients

				mrInt, err := strconv.Atoi(mr)
				if err != nil {
					log.Fatalf("Error converting mr to int: %v", err)
				}

				status := "Closed"
				if row[6] == "ACTIVE" {
					status = "Open"
				} else if row[6] == "CLOSED" {
					status = "Closed"
				} else {
					status = "No Opened"
				}

				if EsMayuscula(uidTCM) {
					client.ReferringPerson = uidTCM
				} else {
					client.TcmActive = uidTCM
				}

				client.LastName = row[0]
				client.FirstName = row[1]
				client.Mr = mrInt

				client.Status = status
				client.ReferringAgency = "SunissUp"
				client.CellPhone = ""
				client.Fax = ""
				client.Email = ""

				client.Date = FormatearFecha(strings.ReplaceAll(row[5], "-", "/"))
				client.Doa = FormatearFecha(strings.ReplaceAll(row[5], "-", "/"))

				client.DOB = FormatearFecha(strings.ReplaceAll(row[14], "-", "/"))
				client.SS = row[15]

				address := "N/A"
				if len(row) >= 18 {
					address = row[17]
				}

				client.Address = address
				client.State = row[9]

				Phone := "N/A"
				if len(row) >= 17 {
					if len(row[16]) == 12 {
						Phone = fmt.Sprintf("(%s) %s-%s", row[16][:3], row[16][4:7], row[16][8:])
					}
				}
				client.Phone = Phone
				client.Medicaid = row[11]
				client.Medicare = row[12]
				client.InsuranceId = row[13]

				// remplazar el punto por un espacio en blanco en el DX
				client.DxCode = strings.ReplaceAll(row[3], ".", "")
				client.PsychEvaluation = FormatearFecha(strings.ReplaceAll(row[4], "-", "/"))

				client.HealthPlan = row[10]

				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					silentDB := db.Session(&gorm.Session{Logger: logger.Default.LogMode(logger.Silent)})
					// Validar Medicaid
					if client.Medicaid != "" {
						var existing models.Clients
						if err := silentDB.Where("medicaid = ?", client.Medicaid).First(&existing).Error; err == nil {
							return false
						}
					}
					// Validar Medicare
					if client.Medicare != "" && client.Medicare != "N/A" {
						var existing models.Clients
						if err := silentDB.Where("medicare = ?", client.Medicare).First(&existing).Error; err == nil {
							return fmt.Errorf("ya existe otro cliente con el mismo número de Medicare: %s", client.Medicare)
						}

						// Guardar si no hay duplicados
						if err := silentDB.Save(&client).Error; err != nil {
							return fmt.Errorf("error al guardar el cliente: %v", err)
						} else {
							if uidTCM != "" {
								createAdmission(row, mr, uidTCM, 1)
							}
						}
					}

					return client
				})
			} else {
				if uidTCM != "" {
					num_admission, _ := strconv.Atoi(admission)

					createAdmission(row, mr, uidTCM, num_admission+1)
					fmt.Println(mr, " ------------ ", admission)
				}
			}
		}
	}
	fmt.Printf("\nTotal de filas procesadas: %d\n", len(rows)-1) // Restamos 1 por los encabezados
}

func createAdmission(row []string, mr string, uidTCM string, order int) interface{} {
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Seleccionar TCM
		// step 1
		var client models.Clients
		db.Where("mr = ?", mr).Find(&client)
		if client.ID != 0 {
			// Seleccionar TCM
			tcm := getUserLdap(uidTCM)

			// Seleccionar TCMS
			tcms := tcmsList[tcm.Supervisor]
			if tcms.Uid == "" {
				if tcm.Supervisor != "" {
					gettcms := getUserLdap(tcm.Supervisor)
					tcms = gettcms
				} else {
					fmt.Println("no tcms")
					return false
				}
			}

			// Seleccionar DOA
			doa := FormatearFecha(strings.ReplaceAll(row[5], "-", "/"))

			status := "Closed"
			if row[6] == "ACTIVE" {
				status = "Open"
			} else if row[6] == "CLOSED" {
				status = "Closed"
			} else {
				status = "Pending"
			}

			mentalPrimary := strings.ReplaceAll(row[3], ".", "")
			mentalPrimaryDate := strings.ReplaceAll(row[4], "-", "/")
			// Create folder in Bucket
			ExtractFunctionsPlugins("s3", "CreateFolder", "clients/"+strconv.FormatUint(uint64(client.ID), 10)+"/")
			// Create addmission
			clientServiceCaseManagement := models.ClientServiceCaseManagement{
				Client: int(client.ID),
				TCM:    int(tcm.ID), // Valor por defecto para TCM
				Doa:    doa,
				Status: status,
				Order:  order,
			}
			db.Save(&clientServiceCaseManagement)
			// Actualizar dato del clientes por los datos de la admision

			client.LastName = row[0]
			client.FirstName = row[1]

			client.Status = status
			client.ReferringAgency = "SunissUp"
			client.CellPhone = "(786)975-7485"
			client.Fax = "(954)860-7166"
			client.Email = ""

			client.Date = FormatearFecha(strings.ReplaceAll(row[5], "-", "/"))
			client.Doa = FormatearFecha(strings.ReplaceAll(row[5], "-", "/"))
			fmt.Println("DOB     ", row[14])
			client.DOB = FormatearFecha(strings.ReplaceAll(row[14], "-", "/"))
			client.SS = row[15]

			address := "N/A"
			if len(row) >= 18 {
				address = row[17]
			}

			client.Address = address
			client.State = row[9]

			Phone := "N/A"
			if len(row) >= 17 {
				if len(row[16]) == 12 {
					Phone = fmt.Sprintf("(%s) %s-%s", row[16][:3], row[16][4:7], row[16][8:])
				}
			}
			client.Phone = Phone
			client.Medicaid = row[11]
			client.Medicare = row[12]
			client.InsuranceId = row[13]

			// remplazar el punto por un espacio en blanco en el DX
			client.DxCode = mentalPrimary
			client.PsychEvaluation = mentalPrimaryDate

			client.HealthPlan = row[10]

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

					Phone:    client.Phone,
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
		}
		return client
	})

	fmt.Println("Client create addmision:", order, " MR: ", mr)
	return true
}
