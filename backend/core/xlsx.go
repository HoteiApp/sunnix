package core

import (
	"encoding/json"
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/xuri/excelize/v2"
	"gorm.io/gorm"
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

				client.Mr = mrInt
				client.ReferringAgency = "SunissUp"
				client.ReferringPerson = uidTCM
				client.CellPhone = ""
				client.Fax = ""
				client.Email = ""
				client.Date = strings.ReplaceAll(row[4], "-", "/")
				client.LastName = row[0]
				client.FirstName = row[1]
				client.SS = row[16]
				client.DOB = strings.ReplaceAll(row[15], "-", "/")

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

				// fmt.Println(client)
				result, _ := database.WithDB(func(db *gorm.DB) interface{} {

					db.Save(&client)
					if db.Error != nil {
						return false
					}

					return client
				})

				fmt.Println(result)

				// for colIdx, colCell := range row {
				// 	// Mostrar solo columnas que tienen encabezado (para evitar índices fuera de rango)
				// 	if colIdx < len(headers) {
				// 		// -----------------------

				// 		// TCM
				// 		if colIdx == 6 {
				// 			uidTCM = colCell
				// 		}

				// 		if colIdx == 5 {
				// 			if colCell == "ACTIVE" {
				// 				clientsActive++

				// 			} else if colCell == "CLOSED" {
				// 				clientsClosed++
				// 			} else {
				// 				clientsNoOpend++
				// 			}
				// 		}

				// 		if colIdx == 2 {
				// 			if regex.MatchString(colCell) {
				// 				// fmt.Printf("  %s contiene un número seguido de un '-' y otro número del 1 al 5\n", headers[colIdx])
				// 				// fmt.Printf("  %s: %s\n", headers[colIdx], colCell)
				// 			}
				// 		}

				// 	}
				// }
			}
			// ----------------------------------------------------------------------------------------------
			// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
			// 	// Seleccionar TCM
			// 	// step 1
			// 	var client models.Clients
			// 	db.Where("mr = ?", mr).Find(&client)
			// 	if client.ID != 0 {
			// 		var recordTcm models.WorkerRecord
			// 		db.Where("uid = ?", uidTCM).Find(&recordTcm)
			// 		// Seleccionar TCMS
			// 		var recordTcms models.WorkerRecord
			// 		db.Where("uid = ?", uidTCMS).Find(&recordTcms)

			// 		// fmt.Println(uidTCM, uidTCMS)
			// 		// fmt.Println(recordTcm.FullName, recordTcms.FullName)

			// 		fmt.Println(client.Mr, admission, recordTcm.FullName)
			// 		// 	client.Mr = requestData.Newclient.Mr
			// 		// 	client.ReferringAgency = requestData.Newclient.ReferringAgency
			// 		// 	client.ReferringPerson = requestData.Newclient.ReferringPerson
			// 		// 	client.CellPhone = requestData.Newclient.CellPhone
			// 		// 	client.Fax = requestData.Newclient.Fax
			// 		// 	client.Email = requestData.Newclient.Email
			// 		// 	client.Date = requestData.Newclient.Date

			// 		// 	client.LastName = requestData.Newclient.LastName
			// 		// 	client.FirstName = requestData.Newclient.FirstName
			// 		// 	client.SS = requestData.Newclient.SS
			// 		// 	client.DOB = requestData.Newclient.Dob
			// 		// 	client.Sexo = requestData.Newclient.Sexo
			// 		// 	client.Race = requestData.Newclient.Race

			// 		// 	client.Address = requestData.Newclient.Address
			// 		// 	client.State = requestData.Newclient.State
			// 		// 	client.ZipCode = requestData.Newclient.ZipCode

			// 		// 	client.Phone = requestData.Newclient.Phone
			// 		// 	client.School = requestData.Newclient.School
			// 		// 	client.Lenguage = requestData.Newclient.Lenguage

			// 		// 	client.LegalGuardian = requestData.Newclient.LegalGuardian
			// 		// 	client.Relationship = requestData.Newclient.Relationship
			// 		// 	client.CellPhoneGuardian = requestData.Newclient.CellPhoneGuardian

			// 		// 	client.Medicaid = requestData.Newclient.Medicalid
			// 		// 	client.GoldCardNumber = requestData.Newclient.GoldCardNumber
			// 		// 	client.Medicare = requestData.Newclient.Medicare

			// 		// 	client.TcmActive = recordTcm.Uid

			// 		// 	db.Save(&client)
			// 		// 	if db.Error != nil {
			// 		// 		return false
			// 		// 	}
			// 		// }
			// 		// // Obtener el ID del cliente insertado

			// 		// clientID := requestData.Newclient.ClientId
			// 		// if requestData.Newclient.ClientId == 0 {
			// 		// 	clientID = int(client.ID)
			// 		// }

			// 	} else {
			// 		// fmt.Println("Crear MR:", mr)
			// 	}

			// 	return ""

			// })

			// }

		}
		fmt.Println(uidTCM)
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
							// TODO: CREAR ADMISION
							fmt.Println("Client", mr, client.FirstName, tcm.Uid, tcms.Uid)
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
