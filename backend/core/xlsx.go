package core

import (
	"fmt"
	"log"
	"regexp"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/xuri/excelize/v2"
	"gorm.io/gorm"
)

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
	headers := rows[0]
	fmt.Println("\nEncabezados:")
	for i, header := range headers {
		fmt.Printf("Columna %d: %s\n", i+1, header)
	}

	// Compilar la expresión regular fuera del bucle
	regex, err := regexp.Compile(`^\d+-[1-5]$`)
	if err != nil {
		log.Fatal(err)
	}

	clientsActive := 0
	clientsClosed := 0
	clientsNoOpend := 0

	// Procesar y mostrar las filas de datos
	for rowIdx, row := range rows {
		if rowIdx == 0 {
			continue // Saltar la fila de encabezado si lo deseas
		}

		uidTCM := ""
		uidTCMS := ""
		// TODO Crear un mapa con los datos que lleva una admision para poderlo guardar en la base de datos
		fmt.Println("------", len(row))
		if len(row) > 16 {
			uidTCM = row[6]
			uidTCMS = row[13]
		}

		// if uidTCM == "islaidefg" {

		//-- Mr
		var mr, admission string
		re, err := regexp.Compile(`^\d+-[1-5]$`)
		if err != nil {
			log.Fatal(err)
		}
		if re.MatchString(row[2]) {
			parts := regexp.MustCompile(`-`).Split(row[2], 2)
			if len(parts) == 2 {
				mr = parts[0]
				admission = parts[1]
				break
			}
			// break
			// parts := regexp.MustCompile(`-`).Split(row[2], 2)
			// if len(parts) == 2 {
			// 	mr = parts[0]
			// 	admission = parts[1]
			// }
		} else {
			mr = row[2]
		}

		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			// Seleccionar TCM
			var recordTcm models.WorkerRecord
			db.Where("uid = ?", uidTCM).Find(&recordTcm)
			// Seleccionar TCMS
			var recordTcms models.WorkerRecord
			db.Where("uid = ?", uidTCMS).Find(&recordTcms)

			// fmt.Println(uidTCM, uidTCMS)
			// fmt.Println(recordTcm.FullName, recordTcms.FullName)

			// step 1
			var client models.Clients
			db.Where("mr = ?", mr).Find(&client)

			fmt.Println(client.Mr, admission)
			// if requestData.Newclient.ClientId == 0 {
			// 	client.Mr = requestData.Newclient.Mr
			// 	client.ReferringAgency = requestData.Newclient.ReferringAgency
			// 	client.ReferringPerson = requestData.Newclient.ReferringPerson
			// 	client.CellPhone = requestData.Newclient.CellPhone
			// 	client.Fax = requestData.Newclient.Fax
			// 	client.Email = requestData.Newclient.Email
			// 	client.Date = requestData.Newclient.Date

			// 	client.LastName = requestData.Newclient.LastName
			// 	client.FirstName = requestData.Newclient.FirstName
			// 	client.SS = requestData.Newclient.SS
			// 	client.DOB = requestData.Newclient.Dob
			// 	client.Sexo = requestData.Newclient.Sexo
			// 	client.Race = requestData.Newclient.Race

			// 	client.Address = requestData.Newclient.Address
			// 	client.State = requestData.Newclient.State
			// 	client.ZipCode = requestData.Newclient.ZipCode

			// 	client.Phone = requestData.Newclient.Phone
			// 	client.School = requestData.Newclient.School
			// 	client.Lenguage = requestData.Newclient.Lenguage

			// 	client.LegalGuardian = requestData.Newclient.LegalGuardian
			// 	client.Relationship = requestData.Newclient.Relationship
			// 	client.CellPhoneGuardian = requestData.Newclient.CellPhoneGuardian

			// 	client.Medicaid = requestData.Newclient.Medicalid
			// 	client.GoldCardNumber = requestData.Newclient.GoldCardNumber
			// 	client.Medicare = requestData.Newclient.Medicare

			// 	client.TcmActive = recordTcm.Uid

			// 	db.Save(&client)
			// 	if db.Error != nil {
			// 		return false
			// 	}
			// }
			// // Obtener el ID del cliente insertado

			// clientID := requestData.Newclient.ClientId
			// if requestData.Newclient.ClientId == 0 {
			// 	clientID = int(client.ID)
			// }

			return ""
		})

		// }
		for colIdx, colCell := range row {
			// Mostrar solo columnas que tienen encabezado (para evitar índices fuera de rango)
			if colIdx < len(headers) {
				// -----------------------

				// TCM
				if colIdx == 6 {
					uidTCM = colCell
				}
				// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
				// 	var recordTcm models.WorkerRecord
				// 	db.Where("uid = ?", tcm.Uid).Find(&recordTcm)
				// })

				if colIdx == 5 {
					if colCell == "ACTIVE" {
						clientsActive++

					} else if colCell == "CLOSED" {
						clientsClosed++
					} else {
						clientsNoOpend++
					}
				}

				if colIdx == 2 {
					if regex.MatchString(colCell) {
						// fmt.Printf("  %s contiene un número seguido de un '-' y otro número del 1 al 5\n", headers[colIdx])
						// fmt.Printf("  %s: %s\n", headers[colIdx], colCell)
					}
				}
			}
		}

	}

	fmt.Printf("\nTotal de filas procesadas: %d\n", len(rows)-1) // Restamos 1 por los encabezados

	fmt.Println(clientsActive, clientsClosed, clientsNoOpend)
	// return c.Status(fiber.StatusOK).JSON(fiber.Map{
	// 	"Total":          len(rows) - 1,
	// 	"ClientsOpen":    clientsActive,
	// 	"ClientsClosed":  clientsClosed,
	// 	"ClientsNoOpend": clientsNoOpend,
	// })
}
