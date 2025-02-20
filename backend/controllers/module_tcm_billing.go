package controllers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type GroupedNotes struct {
	Year   string                                 `json:"year"`
	Months map[string]map[string][]models.Billing `json:"months"`
}
type Month struct {
	Month string   `json:"month"`
	Date  []string `json:"date"`
}
type Year struct {
	Year  string  `json:"year"`
	Month []Month `json:"month"`
}
type GroupBills struct {
	Year []Year `json:"year"`
}

func GetMyBilling(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var billing []models.Billing
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ?", claims["ID"].(float64)).Order("date").Find(&billing)
	})
	var groupBills GroupBills
	if result.(*gorm.DB).RowsAffected > 0 {

		// Mapa para agrupar las fechas por año y mes
		groupedDates := make(map[string]map[string][]string)
		for _, bill := range billing {
			date, _ := time.Parse("01/02/2006", bill.Date)
			year := date.Format("2006")
			month := date.Format("01")

			if groupedDates[year] == nil {
				groupedDates[year] = make(map[string][]string)
			}
			groupedDates[year][month] = append(groupedDates[year][month], bill.Date)
		}

		for year, months := range groupedDates {
			var yearStruct Year
			yearStruct.Year = year

			for month, dates := range months {
				monthStruct := Month{
					Month: month,
					Date:  dates,
				}
				yearStruct.Month = append(yearStruct.Month, monthStruct)
			}

			groupBills.Year = append(groupBills.Year, yearStruct)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"billing": groupBills,
	})
}

func BillActiveWeek(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).First(&week)
	})
	// -- Get or Create Bill
	var billing models.Billing
	idBill, _ := database.WithDB(func(db *gorm.DB) interface{} {
		db.Where("tcm = ? and week = ?", claims["ID"].(float64), week.ID).First(&billing)
		return billing.ID
	})
	// -- Get Notes in Bill
	var notesBill []models.NotesBilling
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("billing = ?", idBill).Find(&notesBill)
	})
	// -----------------------------------
	var notesSelect []models.Notes
	for _, note := range notesBill {
		var noteDate models.Notes
		resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ? ", note.Note).Order("date").First(&noteDate)
		})
		if resultN.(*gorm.DB).RowsAffected > 0 {
			notesSelect = append(notesSelect, noteDate)
		}
	}
	// -----------------------------------
	if len(notesSelect) > 0 {
		var clients []models.OutClientsNotesWeekActive
		// -------------------------------------
		units := 0
		// -------------------------------------
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			var caseManagement []models.ClientServiceCaseManagement
			// With this query obtain only one scm from each tcm client
			db.Select("DISTINCT client").Where("tcm = ?", billing.Tcm).Find(&caseManagement)
			for _, val := range caseManagement {
				var scm models.OutClientSCMActive
				var cscm models.ClientServiceCaseManagement
				db.Where("client = ?  and status = ?", val.Client, "Open").First(&cscm)

				// ----
				var tcm models.ClienteSCMTcm
				db.Where("scm = ?", cscm.ID).First(&tcm)
				var demografic models.ClientSCMDemografic
				db.Where("scm = ?", cscm.ID).First(&demografic)
				var sureActive models.ClientSCMSure
				db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)
				var sures []models.ClientSCMSure
				db.Where("scm = ?", cscm.ID).Find(&sures)
				var medicals models.ClientSCMMedical
				db.Where("scm = ?", cscm.ID).First(&medicals)
				var mentals models.ClientSCMMental
				db.Where("scm = ?", cscm.ID).First(&mentals)
				// Documents
				var certification models.ClientSCMCertification
				db.Where("scm = ?", cscm.ID).First(&certification)
				var outCertification models.OutSCMCertification

				decryptedCertSignaturetcm, _ := core.DecryptImage(certification.Signtcm)
				decryptedCertSignaturesupervisor, _ := core.DecryptImage(certification.Signsupervisor)
				decryptedCertSignatureqa, _ := core.DecryptImage(certification.Signqa)
				// -- Copiar de la estructura original a la de salida
				copier.Copy(&outCertification, &certification)

				outCertification.Signtcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturetcm)
				outCertification.Signsupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturesupervisor)
				outCertification.Signqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignatureqa)
				// -----------

				var assessment models.ClientSCMAssessment
				db.Where("scm = ?", cscm.ID).First(&assessment)
				var outAssessmet models.OutSCMAssessment
				decryptedAssessmentSignaturetcm, _ := core.DecryptImage(assessment.Signaturetcm)
				decryptedAssessmentSignaturesupervisor, _ := core.DecryptImage(assessment.Signaturesupervisor)
				decryptedAssessmentSignatureqa, _ := core.DecryptImage(assessment.Signatureqa)
				copier.Copy(&outAssessmet, &assessment)
				outAssessmet.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturetcm)
				outAssessmet.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturesupervisor)
				outAssessmet.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignatureqa)
				var sp models.ClientSCMSp
				db.Where("scm = ?", cscm.ID).First(&sp)

				var goal1 models.SpGoal1
				db.Where("sp = ?", sp.ID).First(&goal1)
				var goal2 models.SpGoal2
				db.Where("sp = ?", sp.ID).First(&goal2)
				var goal3 models.SpGoal3
				db.Where("sp = ?", sp.ID).First(&goal3)
				var goal4 models.SpGoal4
				db.Where("sp = ?", sp.ID).First(&goal4)
				var goal5 models.SpGoal5
				db.Where("sp = ?", sp.ID).First(&goal5)
				var goal6 models.SpGoal6
				db.Where("sp = ?", sp.ID).First(&goal6)
				var goal7 models.SpGoal7
				db.Where("sp = ?", sp.ID).First(&goal7)
				var goal8 models.SpGoal8
				db.Where("sp = ?", sp.ID).First(&goal8)

				var outSp models.OutClientSCMSp

				// ---
				decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
				decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
				decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)
				// ---

				outSp.ID = int(sp.ID)
				outSp.Client = sp.Client
				outSp.Scm = sp.Scm
				outSp.Developmentdate = sp.Developmentdate
				outSp.Axiscode = sp.Axiscode
				outSp.Axiscodedescription = sp.Axiscodedescription
				outSp.Tcm = sp.Tcm
				outSp.Goal1 = goal1
				outSp.Goal2 = goal2
				outSp.Goal3 = goal3
				outSp.Goal4 = goal4
				outSp.Goal5 = goal5
				outSp.Goal6 = goal6
				outSp.Goal7 = goal7
				outSp.Goal8 = goal8
				outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
				outSp.Signaturetcmdate = sp.Signaturetcmdate
				outSp.Supervisor = sp.Supervisor
				outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
				outSp.Signaturesupervisordate = sp.Signaturesupervisordate
				outSp.Qa = sp.Qa
				outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
				outSp.Signatureqadate = sp.Signatureqadate

				scm.ID = int(cscm.ID)
				scm.Status = cscm.Status
				scm.Doa = cscm.Doa
				scm.ClosingDate = cscm.ClosingDate
				scm.TCM = tcm
				scm.Demografic = demografic
				scm.SureActive = sureActive
				scm.Sure = sures
				scm.Medical = medicals
				scm.Mental = mentals

				scm.Certification = outCertification
				scm.Assessment = outAssessmet
				scm.Sp = outSp
				// ----

				var client models.Clients
				db.Where("ID = ?", val.Client).First(&client)
				var notes []models.NotesOut
				for _, note := range notesSelect {
					if note.Scm == int(cscm.ID) {
						units += note.Units
						var noteOut models.NotesOut
						copier.Copy(&noteOut, &note)
						notes = append(notes, noteOut)

					}
				}
				if len(notes) > 0 {
					clients = append(clients, models.OutClientsNotesWeekActive{
						ID:             client.ID,
						LastName:       client.LastName,
						FirstName:      client.FirstName,
						SS:             client.SS,
						DOB:            client.DOB,
						Medicaid:       client.Medicaid,
						GoldCardNumber: client.GoldCardNumber,
						Medicare:       client.Medicare,
						Notes:          notes,
						Scm:            scm,
					})
				}
			}
			return clients
		})
		// -------------------------------------

		var billOut models.BillingOUT
		// var user models.Users
		// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// 	return db.Where("id = ?", billing.Tcm).First(&user)
		// })

		decryptedSignaturetcm, _ := core.DecryptImage(billing.SignatureTcm)
		decryptedSignaturetcms, _ := core.DecryptImage(billing.SignatureTcms)
		decryptedSignatureBiller, _ := core.DecryptImage(billing.SignatureBILLER)
		billOut.Id = int(billing.ID)
		billOut.Week = billing.Week
		billOut.Date = billing.Date
		billOut.Units = units
		billOut.Hours = float64(units) / 4
		// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
		billOut.PayRate = billing.PaymentByUnits * 4
		billOut.WeekPay = (billing.PaymentByUnits) * (float64(units))
		// -- Dates TCM
		billOut.Tcm = billing.Tcm
		billOut.TcmFullName = billing.TcmFullName
		billOut.TcmCredentials = billing.TcmCredentials

		billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
		billOut.SignatureTcmDate = billing.SignatureTcmDate
		// -- Dates TCMS
		billOut.Tcms = billing.Tcms
		billOut.TcmsFullName = billing.TcmsFullName
		billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
		billOut.SignatureTcmsdate = billing.SignatureTcmsdate
		// -- Dates Biller
		billOut.Biller = billing.Biller
		billOut.BillerFullName = billing.BillerFullName
		billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
		billOut.SignatureBillerdate = billing.SignatureBillerdate

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"week":         week,
			"clients":      clients,
			"billing":      billOut,
			"amount_notes": len(notesSelect),
			"units":        units,
			"hours":        float64(units) / 4,
			"pay_rate":     billing.PaymentByUnits * 4,
			"week_pay":     (billing.PaymentByUnits) * (float64(units)),
		})

	}

	// -- Relate Notes with the corresponding billing
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "The active week has no notes to bill",
	})
}

func BillView(c *fiber.Ctx) error {
	//-------------------
	var requestData models.FormRequestViewBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	//-------------------
	// var billings []models.Billing
	var billData []models.BillingDataOUT

	var bill models.Billing
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("date = ? and tcm = ?", requestData.Date, requestData.Tcm).Find(&bill)
	})

	// Obtener notas del billing
	var notesBill []models.NotesBilling
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("billing = ?", bill.ID).Find(&notesBill)
	})

	// Obtener detalles de las notas
	var notesSelect []models.NotesOut
	units := 0
	for _, note := range notesBill {
		var noteDate models.Notes
		resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", note.Note).Order("date").First(&noteDate)
		})
		if resultN.(*gorm.DB).RowsAffected > 0 {
			var noteOut models.NotesOut

			var sure models.ClientSCMSure
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id = ?", noteDate.Insurance).Find(&sure)
			})
			copier.Copy(&noteOut, &noteDate)
			noteOut.InsuranceId = sure.PlanID
			noteOut.InsurancePlan = sure.PlanName
			notesSelect = append(notesSelect, noteOut)

		}
	}

	if len(notesSelect) > 0 {
		var weeks models.Week

		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			// Convertir el formato ISO a time.Time

			result := db.Where("id = ?", bill.Week).First(&weeks)

			if result.Error != nil {
				fmt.Printf("Error en la consulta: %v\n", result.Error)
			}

			return result
		})
		var clients []models.OutClientsNotesWeekActive
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {

			var caseManagement []models.ClientServiceCaseManagement
			db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)

			for _, val := range caseManagement {
				var scm models.OutClientSCMActive

				var cscm models.ClientServiceCaseManagement
				db.Where("client = ? and status = ?", val.Client, "Open").First(&cscm)

				// Obtener todos los datos relacionados con SCM
				var tcm models.ClienteSCMTcm
				db.Where("scm = ?", cscm.ID).First(&tcm)
				var demografic models.ClientSCMDemografic
				db.Where("scm = ?", cscm.ID).First(&demografic)
				var sureActive models.ClientSCMSure
				db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)

				var notes []models.Notes
				db.Where("scm = ? and insurance = ?", cscm.ID, sureActive.ID).Find(&notes)
				// --- Calculte notes available
				var consumedUnits int64
				for _, note := range notes {
					consumedUnits += int64(note.Units)
				}

				scm.ID = int(cscm.ID)
				scm.Status = cscm.Status
				scm.Doa = cscm.Doa
				scm.ClosingDate = cscm.ClosingDate
				scm.TCM = tcm
				scm.Demografic = demografic
				scm.SureActive = sureActive
				scm.UnitsConsumed = consumedUnits

				// Procesar notas del cliente
				var clientNotes []models.NotesOut
				for _, note := range notesSelect {
					if note.Scm == int(cscm.ID) {
						units += note.Units

						decryptedSignatureFinance, _ := core.DecryptImage(note.SignatureFinance)
						decryptedSignatureFinance2, _ := core.DecryptImage(note.SignatureFinance2)
						decryptedSignatureFinance3, _ := core.DecryptImage(note.SignatureFinance3)

						var noteOut models.NotesOut
						copier.Copy(&noteOut, &note)
						noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
						noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
						noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
						clientNotes = append(clientNotes, noteOut)
					}
				}

				if len(clientNotes) > 0 {
					var client models.Clients
					db.Where("ID = ?", val.Client).First(&client)
					clients = append(clients, models.OutClientsNotesWeekActive{
						ID:             client.ID,
						LastName:       client.LastName,
						FirstName:      client.FirstName,
						SS:             client.SS,
						DOB:            client.DOB,
						Medicaid:       client.Medicaid,
						GoldCardNumber: client.GoldCardNumber,
						Medicare:       client.Medicare,
						Notes:          clientNotes,
						Scm:            scm,
					})
				}
			}
			return clients
		})

		// Procesar billing output
		var billOut models.BillingOUT
		decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
		decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
		decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)

		billOut.Id = int(bill.ID)
		billOut.Week = bill.Week
		billOut.Date = bill.Date
		billOut.Units = units
		billOut.Hours = float64(units) / 4
		// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
		billOut.PayRate = bill.PaymentByUnits * 4
		billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
		// -- Dates TCM
		billOut.Tcm = bill.Tcm
		billOut.TcmFullName = bill.TcmFullName
		billOut.TcmCredentials = bill.TcmCredentials

		billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
		billOut.SignatureTcmDate = bill.SignatureTcmDate
		// -- Dates TCMS
		billOut.Tcms = bill.Tcms
		billOut.TcmsFullName = bill.TcmsFullName
		billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
		billOut.SignatureTcmsdate = bill.SignatureTcmsdate
		// -- Dates Biller
		billOut.Biller = bill.Biller
		billOut.BillerFullName = bill.BillerFullName
		billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
		billOut.SignatureBillerdate = bill.SignatureBillerdate

		billData = append(billData, models.BillingDataOUT{
			Week:        weeks,
			Clients:     clients,
			Billing:     billOut,
			Notes:       notesSelect,
			AmountNotes: len(notesSelect),
			Units:       units,
			Hours:       float64(units) / 4,
			PayRate:     bill.PaymentByUnits * 4,
			WeekPay:     (bill.PaymentByUnits) * (float64(units)),
		})
	}

	return c.Status(fiber.StatusOK).JSON(billData)
}

func BillPeriod(c *fiber.Ctx) error {
	//-------------------
	var requestData models.FormRequestPeriodBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	//-------------------
	// Weeks period
	var weeks []models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Convertir el formato ISO a time.Time
		startPeriod, _ := time.Parse(time.RFC3339, requestData.Period[0])
		endPeriod, _ := time.Parse(time.RFC3339, requestData.Period[1])

		// Formatear las fechas en mm/dd/yyyy
		startFormatted := startPeriod.Format("01/02/2006")
		endFormatted := endPeriod.Format("01/02/2006")

		result := db.Where("STR_TO_DATE(start, '%m/%d/%Y') >= STR_TO_DATE(?, '%m/%d/%Y') AND "+
			"STR_TO_DATE(end, '%m/%d/%Y') <= STR_TO_DATE(?, '%m/%d/%Y')",
			startFormatted,
			endFormatted).
			Find(&weeks)

		if result.Error != nil {
			fmt.Printf("Error en la consulta: %v\n", result.Error)
		}

		return result
	})

	// -- Get or Create Bill

	// var billings []models.Billing
	var billData []models.BillingDataOUT

	for _, week := range weeks {
		var weekBillings []models.Billing
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("week = ?", week.ID).Find(&weekBillings)
		})

		for _, bill := range weekBillings {
			// Obtener notas del billing
			var notesBill []models.NotesBilling
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("billing = ?", bill.ID).Find(&notesBill)
			})

			// Obtener detalles de las notas
			var notesSelect []models.NotesOut
			units := 0
			for _, note := range notesBill {
				var noteDate models.Notes
				resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("id = ?", note.Note).Order("date").First(&noteDate)
				})
				if resultN.(*gorm.DB).RowsAffected > 0 {
					var noteOut models.NotesOut

					var sure models.ClientSCMSure
					_, _ = database.WithDB(func(db *gorm.DB) interface{} {
						return db.Where("id = ?", noteDate.Insurance).Find(&sure)
					})
					copier.Copy(&noteOut, &noteDate)
					noteOut.InsuranceId = sure.PlanID
					noteOut.InsurancePlan = sure.PlanName
					notesSelect = append(notesSelect, noteOut)

				}
			}

			if len(notesSelect) > 0 {
				var clients []models.OutClientsNotesWeekActive
				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					var caseManagement []models.ClientServiceCaseManagement
					db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)

					for _, val := range caseManagement {
						var scm models.OutClientSCMActive

						var cscm models.ClientServiceCaseManagement
						db.Where("client = ? and status = ?", val.Client, "Open").First(&cscm)

						// Obtener todos los datos relacionados con SCM
						var tcm models.ClienteSCMTcm
						db.Where("scm = ?", cscm.ID).First(&tcm)
						var demografic models.ClientSCMDemografic
						db.Where("scm = ?", cscm.ID).First(&demografic)
						var sureActive models.ClientSCMSure
						db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)

						var notes []models.Notes
						db.Where("scm = ? and insurance = ?", cscm.ID, sureActive.ID).Find(&notes)
						// --- Calculte notes available
						var consumedUnits int64
						for _, note := range notes {
							consumedUnits += int64(note.Units)
						}

						scm.ID = int(cscm.ID)
						scm.Status = cscm.Status
						scm.Doa = cscm.Doa
						scm.ClosingDate = cscm.ClosingDate
						scm.TCM = tcm
						scm.Demografic = demografic
						scm.SureActive = sureActive
						scm.UnitsConsumed = consumedUnits

						// Procesar notas del cliente
						var clientNotes []models.NotesOut
						for _, note := range notesSelect {
							if note.Scm == int(cscm.ID) {
								units += note.Units

								decryptedSignatureFinance, _ := core.DecryptImage(note.SignatureFinance)
								decryptedSignatureFinance2, _ := core.DecryptImage(note.SignatureFinance2)
								decryptedSignatureFinance3, _ := core.DecryptImage(note.SignatureFinance3)

								var noteOut models.NotesOut
								copier.Copy(&noteOut, &note)
								noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
								noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
								noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
								clientNotes = append(clientNotes, noteOut)
							}
						}

						if len(clientNotes) > 0 {
							var client models.Clients
							db.Where("ID = ?", val.Client).First(&client)
							clients = append(clients, models.OutClientsNotesWeekActive{
								ID:             client.ID,
								LastName:       client.LastName,
								FirstName:      client.FirstName,
								SS:             client.SS,
								DOB:            client.DOB,
								Medicaid:       client.Medicaid,
								GoldCardNumber: client.GoldCardNumber,
								Medicare:       client.Medicare,
								Notes:          clientNotes,
								Scm:            scm,
							})
						}
					}
					return clients
				})

				// Procesar billing output
				var billOut models.BillingOUT
				decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
				decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
				decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)

				billOut.Id = int(bill.ID)
				billOut.Week = bill.Week
				billOut.Date = bill.Date
				billOut.Units = units
				billOut.Hours = float64(units) / 4
				// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
				billOut.PayRate = bill.PaymentByUnits * 4
				billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
				// -- Dates TCM
				billOut.Tcm = bill.Tcm
				billOut.TcmFullName = bill.TcmFullName
				billOut.TcmCredentials = bill.TcmCredentials

				billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
				billOut.SignatureTcmDate = bill.SignatureTcmDate
				// -- Dates TCMS
				billOut.Tcms = bill.Tcms
				billOut.TcmsFullName = bill.TcmsFullName
				billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
				billOut.SignatureTcmsdate = bill.SignatureTcmsdate
				// -- Dates Biller
				billOut.Biller = bill.Biller
				billOut.BillerFullName = bill.BillerFullName
				billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
				billOut.SignatureBillerdate = bill.SignatureBillerdate

				billData = append(billData, models.BillingDataOUT{
					Week:        week,
					Clients:     clients,
					Billing:     billOut,
					Notes:       notesSelect,
					AmountNotes: len(notesSelect),
					Units:       units,
					Hours:       float64(units) / 4,
					PayRate:     bill.PaymentByUnits * 4,
					WeekPay:     (bill.PaymentByUnits) * (float64(units)),
				})
			}
		}
	}

	return c.Status(fiber.StatusOK).JSON(billData)
}

func BillPeriodBusiness(c *fiber.Ctx) error {
	//-------------------
	var requestData models.FormRequestPeriodBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	//-------------------
	// Weeks period
	var weeks []models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Convertir el formato ISO a time.Time
		startPeriod, _ := time.Parse(time.RFC3339, requestData.Period[0])
		endPeriod, _ := time.Parse(time.RFC3339, requestData.Period[1])

		// Formatear las fechas en mm/dd/yyyy
		startFormatted := startPeriod.Format("01/02/2006")
		endFormatted := endPeriod.Format("01/02/2006")

		result := db.Where("STR_TO_DATE(start, '%m/%d/%Y') >= STR_TO_DATE(?, '%m/%d/%Y') AND "+
			"STR_TO_DATE(end, '%m/%d/%Y') <= STR_TO_DATE(?, '%m/%d/%Y')",
			startFormatted,
			endFormatted).
			Find(&weeks)

		if result.Error != nil {
			fmt.Printf("Error en la consulta: %v\n", result.Error)
		}

		return result
	})

	// -- Get or Create Bill
	// var billings []models.Billing
	var billData []models.BillingDataOUT

	for _, week := range weeks {
		var weekBillings []models.Billing
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("week = ? AND business = ?", week.ID, requestData.ID).Find(&weekBillings)
		})
		for _, bill := range weekBillings {
			// Obtener notas del billing
			var notesBill []models.NotesBilling
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("billing = ?", bill.ID).Find(&notesBill)
			})

			// Obtener detalles de las notas
			var notesSelect []models.NotesOut
			units := 0

			for _, note := range notesBill {
				var noteDate models.Notes
				resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("id = ?", note.Note).Order("date").First(&noteDate)
				})
				if resultN.(*gorm.DB).RowsAffected > 0 {
					var noteOut models.NotesOut
					copier.Copy(&noteOut, &noteDate)
					notesSelect = append(notesSelect, noteOut)
				}
			}

			if len(notesSelect) > 0 {
				var clients []models.OutClientsNotesWeekActive
				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					var caseManagement []models.ClientServiceCaseManagement
					db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)

					for _, val := range caseManagement {
						var scm models.OutClientSCMActive

						var cscm models.ClientServiceCaseManagement
						db.Where("client = ? and status = ?", val.Client, "Open").First(&cscm)

						// Obtener todos los datos relacionados con SCM
						var tcm models.ClienteSCMTcm
						db.Where("scm = ?", cscm.ID).First(&tcm)
						var demografic models.ClientSCMDemografic
						db.Where("scm = ?", cscm.ID).First(&demografic)
						var sureActive models.ClientSCMSure
						db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)

						var notes []models.Notes
						db.Where("scm = ? and insurance = ?", cscm.ID, sureActive.ID).Find(&notes)
						// --- Calculte notes available
						var consumedUnits int64
						for _, note := range notes {
							consumedUnits += int64(note.Units)
						}

						scm.ID = int(cscm.ID)
						scm.Status = cscm.Status
						scm.Doa = cscm.Doa
						scm.ClosingDate = cscm.ClosingDate
						scm.TCM = tcm
						scm.Demografic = demografic
						scm.SureActive = sureActive
						scm.UnitsConsumed = consumedUnits

						// Procesar notas del cliente
						var clientNotes []models.NotesOut
						for _, note := range notesSelect {
							if note.Scm == int(cscm.ID) {
								units += note.Units

								decryptedSignatureFinance, _ := core.DecryptImage(note.SignatureFinance)
								decryptedSignatureFinance2, _ := core.DecryptImage(note.SignatureFinance2)
								decryptedSignatureFinance3, _ := core.DecryptImage(note.SignatureFinance3)

								var noteOut models.NotesOut
								copier.Copy(&noteOut, &note)
								noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
								noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
								noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
								clientNotes = append(clientNotes, noteOut)
							}
						}

						if len(clientNotes) > 0 {
							var client models.Clients
							db.Where("ID = ?", val.Client).First(&client)
							clients = append(clients, models.OutClientsNotesWeekActive{
								ID:             client.ID,
								LastName:       client.LastName,
								FirstName:      client.FirstName,
								SS:             client.SS,
								DOB:            client.DOB,
								Medicaid:       client.Medicaid,
								GoldCardNumber: client.GoldCardNumber,
								Medicare:       client.Medicare,
								Notes:          clientNotes,
								Scm:            scm,
							})
						}
					}
					return clients
				})

				// Procesar billing output
				var billOut models.BillingOUT
				decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
				decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
				decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)

				billOut.Id = int(bill.ID)
				billOut.Week = bill.Week
				billOut.Date = bill.Date
				billOut.Units = units
				billOut.Hours = float64(units) / 4
				// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
				billOut.PayRate = bill.PaymentByUnits * 4
				billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
				// -- Dates TCM
				billOut.Tcm = bill.Tcm
				billOut.TcmFullName = bill.TcmFullName
				billOut.TcmCredentials = bill.TcmCredentials

				billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
				billOut.SignatureTcmDate = bill.SignatureTcmDate
				// -- Dates TCMS
				billOut.Tcms = bill.Tcms
				billOut.TcmsFullName = bill.TcmsFullName
				billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
				billOut.SignatureTcmsdate = bill.SignatureTcmsdate
				// -- Dates Biller
				billOut.Biller = bill.Biller
				billOut.BillerFullName = bill.BillerFullName
				billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
				billOut.SignatureBillerdate = bill.SignatureBillerdate

				billData = append(billData, models.BillingDataOUT{
					Week:        week,
					Clients:     clients,
					Billing:     billOut,
					Notes:       notesSelect,
					AmountNotes: len(notesSelect),
					Units:       units,
					Hours:       float64(units) / 4,
					PayRate:     bill.PaymentByUnits * 4,
					WeekPay:     (bill.PaymentByUnits) * (float64(units)),
				})
			}
		}
	}

	return c.Status(fiber.StatusOK).JSON(billData)
}

func BillPeriodTcm(c *fiber.Ctx) error {
	//-------------------
	var requestData models.FormRequestPeriodBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	//-------------------
	// Weeks period
	var weeks []models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Convertir el formato ISO a time.Time
		startPeriod, _ := time.Parse(time.RFC3339, requestData.Period[0])
		endPeriod, _ := time.Parse(time.RFC3339, requestData.Period[1])

		// Formatear las fechas en mm/dd/yyyy
		startFormatted := startPeriod.Format("01/02/2006")
		endFormatted := endPeriod.Format("01/02/2006")

		result := db.Where("STR_TO_DATE(start, '%m/%d/%Y') >= STR_TO_DATE(?, '%m/%d/%Y') AND "+
			"STR_TO_DATE(end, '%m/%d/%Y') <= STR_TO_DATE(?, '%m/%d/%Y')",
			startFormatted,
			endFormatted).
			Find(&weeks)

		if result.Error != nil {
			fmt.Printf("Error en la consulta: %v\n", result.Error)
		}

		return result
	})

	// -- Get or Create Bill

	// var billings []models.Billing
	var billData []models.BillingDataOUT

	for _, week := range weeks {
		var weekBillings []models.Billing
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("week = ? AND tcm = ?", week.ID, requestData.ID).Find(&weekBillings)
		})

		for _, bill := range weekBillings {
			// Obtener notas del billing
			var notesBill []models.NotesBilling
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("billing = ?", bill.ID).Find(&notesBill)
			})

			// Obtener detalles de las notas
			var notesSelect []models.NotesOut
			units := 0
			for _, note := range notesBill {
				var noteDate models.Notes
				resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("id = ?", note.Note).Order("date").First(&noteDate)
				})
				if resultN.(*gorm.DB).RowsAffected > 0 {
					var noteOut models.NotesOut
					copier.Copy(&noteOut, &noteDate)
					notesSelect = append(notesSelect, noteOut)
				}
			}

			if len(notesSelect) > 0 {
				var clients []models.OutClientsNotesWeekActive
				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					var caseManagement []models.ClientServiceCaseManagement
					db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)

					for _, val := range caseManagement {
						var scm models.OutClientSCMActive

						var cscm models.ClientServiceCaseManagement
						db.Where("client = ? ", val.Client).First(&cscm)

						// Obtener todos los datos relacionados con SCM
						var tcm models.ClienteSCMTcm
						db.Where("scm = ?", cscm.ID).First(&tcm)
						var demografic models.ClientSCMDemografic
						db.Where("scm = ?", cscm.ID).First(&demografic)
						var sureActive models.ClientSCMSure
						db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)
						var sures []models.ClientSCMSure
						db.Where("scm = ?", cscm.ID).Find(&sures)

						var notes []models.Notes
						db.Where("scm = ? and insurance = ?", cscm.ID, sureActive.ID).Find(&notes)
						// --- Calculte notes available
						var consumedUnits int64
						for _, note := range notes {
							consumedUnits += int64(note.Units)
						}

						scm.ID = int(cscm.ID)
						scm.Status = cscm.Status
						scm.Doa = cscm.Doa
						scm.ClosingDate = cscm.ClosingDate
						scm.TCM = tcm
						scm.Demografic = demografic
						scm.SureActive = sureActive
						scm.UnitsConsumed = consumedUnits
						// Procesar notas del cliente
						var clientNotes []models.NotesOut
						for _, note := range notesSelect {
							if note.Scm == int(cscm.ID) {
								units += note.Units
								decryptedSignatureFinance, _ := core.DecryptImage(note.SignatureFinance)
								decryptedSignatureFinance2, _ := core.DecryptImage(note.SignatureFinance2)
								decryptedSignatureFinance3, _ := core.DecryptImage(note.SignatureFinance3)
								var noteOut models.NotesOut
								copier.Copy(&noteOut, &note)
								noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
								noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
								noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
								clientNotes = append(clientNotes, noteOut)
							}
						}
						if len(clientNotes) > 0 {
							var client models.Clients
							db.Where("ID = ?", val.Client).First(&client)
							clients = append(clients, models.OutClientsNotesWeekActive{
								ID:             client.ID,
								LastName:       client.LastName,
								FirstName:      client.FirstName,
								SS:             client.SS,
								DOB:            client.DOB,
								Medicaid:       client.Medicaid,
								GoldCardNumber: client.GoldCardNumber,
								Medicare:       client.Medicare,
								Notes:          clientNotes,
								Scm:            scm,
							})
						}
					}
					return clients
				})

				// Procesar billing output
				var billOut models.BillingOUT
				decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
				decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
				decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)
				decryptedSignatureBiller2, _ := core.DecryptImage(bill.SignatureBILLER2)
				decryptedSignatureBiller3, _ := core.DecryptImage(bill.SignatureBILLER3)
				decryptedSignatureFinance, _ := core.DecryptImage(bill.SignatureFinance)
				decryptedSignatureFinance2, _ := core.DecryptImage(bill.SignatureFinance2)
				decryptedSignatureFinance3, _ := core.DecryptImage(bill.SignatureFinance3)

				billOut.Id = int(bill.ID)
				billOut.Week = bill.Week
				billOut.Date = bill.Date
				billOut.Units = units
				billOut.Hours = float64(units) / 4
				// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
				billOut.PayRate = bill.PaymentByUnits * 4
				billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
				// -- Dates TCM
				billOut.Tcm = bill.Tcm
				billOut.TcmFullName = bill.TcmFullName
				billOut.TcmCredentials = bill.TcmCredentials

				billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
				billOut.SignatureTcmDate = bill.SignatureTcmDate
				// -- Dates TCMS
				billOut.Tcms = bill.Tcms
				billOut.TcmsFullName = bill.TcmsFullName
				billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
				billOut.SignatureTcmsdate = bill.SignatureTcmsdate
				// -- Dates Biller
				billOut.Biller = bill.Biller
				billOut.BillerFullName = bill.BillerFullName
				billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
				billOut.SignatureBillerdate = bill.SignatureBillerdate
				// -- Dates Biller2
				billOut.Biller2 = bill.Biller2
				billOut.Biller2FullName = bill.Biller2FullName
				billOut.SignatureBILLER2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller2)
				billOut.SignatureBiller2date = bill.SignatureBiller2date
				// -- Dates Biller3
				billOut.Biller3 = bill.Biller3
				billOut.Biller3FullName = bill.Biller3FullName
				billOut.SignatureBILLER3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller3)
				billOut.SignatureBiller3date = bill.SignatureBiller3date

				// -- Dates Finance
				billOut.Finance = bill.Finance
				billOut.FinanceFullName = bill.FinanceFullName
				billOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
				billOut.SignatureFinancedate = bill.SignatureFinancedate
				// -- Dates Finance2
				billOut.Finance2 = bill.Finance2
				billOut.Finance2FullName = bill.Finance2FullName
				billOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
				billOut.SignatureFinance2date = bill.SignatureFinance2date
				// -- Dates Finance3
				billOut.Finance3 = bill.Finance3
				billOut.Finance3FullName = bill.Finance3FullName
				billOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
				billOut.SignatureFinance3date = bill.SignatureFinance3date

				billData = append(billData, models.BillingDataOUT{
					Week:        week,
					Clients:     clients,
					Billing:     billOut,
					Notes:       notesSelect,
					AmountNotes: len(notesSelect),
					Units:       units,
					Hours:       float64(units) / 4,
					PayRate:     bill.PaymentByUnits * 4,
					WeekPay:     (bill.PaymentByUnits) * (float64(units)),
				})
			}
		}
	}

	return c.Status(fiber.StatusOK).JSON(billData)
}

func BusinessConfig(c *fiber.Ctx) error {
	claims, err := GetClaims(c)
	if err != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Session error",
		})
	}
	// activeUser := GetUserInfo(claims["Uid"].(string))
	//-------------------
	var requestData models.FormRequestBusinessConfig
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	//-------------------
	// Buscar uid del usuario
	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(id="+strconv.Itoa(requestData.ID)+"))")
	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		userLdap := resultSearch.Entries[0]
		uid := userLdap.GetAttributeValue("uid")
		core.ExtractFunctionsPlugins("ldap", "ModifyAccount", uid,
			"rent-->"+strconv.FormatFloat(requestData.Rent, 'f', -1, 64),
			"business-->"+requestData.Business,
		)
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_RENT_BUSINESS",
			LoggedIn:    claims["UID"].(string),
			Username:    uid,
			Client:      0,
			Description: "Information saved correctly",
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"ok":      "true",
			"message": "Rent modify",
		})

	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"ok":      "false",
		"message": "Error Rent modify",
	})
}

func PutBillAdd(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).First(&week)
	})
	// -- Get Date User
	tcm, _ := core.GetUserFromLDAP(claims["UID"].(string))
	tcms, _ := core.GetUserFromLDAP(tcm.Supervisor)
	// -- Get or Create Bill
	var billing models.Billing
	dateBill, _ := database.WithDB(func(db *gorm.DB) interface{} {
		db.Where("tcm = ? and week = ?", claims["ID"].(float64), week.ID).
			Attrs(models.Billing{
				Week:             int(week.ID),
				Date:             system.CurrentDate(),
				Tcm:              int(claims["ID"].(float64)),
				TcmFullName:      claims["FullName"].(string),
				TcmCredentials:   claims["Credentials"].(string),
				SignatureTcm:     tcm.Signature,
				SignatureTcmDate: system.CurrentDate(),
				Tcms:             int(tcms.ID),
				TcmsFullName:     tcms.Nick,
			}).
			FirstOrCreate(&billing)
		return billing.ID
	})
	// -- Get Notes in active weeks
	var notes []models.Notes
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ? and week = ?", claims["ID"].(float64), week.ID).Order("date").Find(&notes)
	})
	// -- Relate Notes with the corresponding billing
	if len(notes) > 0 {
		for _, note := range notes {
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				bill := models.NotesBilling{
					Note:    int(note.ID),
					Billing: int(dateBill.(uint)),
				}
				return db.Create(&bill)
			})

		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "The billing for the active week was created",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "The active week has no notes to bill",
	})
}

func DeleteBillWeekActive(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormRequestBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	var billing models.Billing
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("id = ?", requestData.ID).Delete(&billing)
	})
	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Billing was eliminated",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No billing was found",
	})
}

func ApproveBill(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormRequestBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	var billing models.Billing
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		result := db.Where("id = ?", requestData.ID).First(&billing)
		user, _ := core.GetUserFromLDAP(claims["UID"].(string))

		if user.Roll == "TCMS" {
			billing.TcmsFullName = user.Nick
			billing.SignatureTcms = user.Signature
			billing.SignatureTcmsdate = system.CurrentDate()
		}

		if user.Roll == "BILLER" {
			switch requestData.Number {
			case "1":
				billing.Biller = int(claims["ID"].(float64))
				billing.BillerFullName = user.Nick
				billing.SignatureBILLER = user.Signature
				billing.SignatureBillerdate = system.CurrentDate()
			case "2":
				billing.Biller2 = int(claims["ID"].(float64))
				billing.Biller2FullName = user.Nick
				billing.SignatureBILLER2 = user.Signature
				billing.SignatureBiller2date = system.CurrentDate()
			default:
				billing.Biller3 = int(claims["ID"].(float64))
				billing.Biller3FullName = user.Nick
				billing.SignatureBILLER3 = user.Signature
				billing.SignatureBiller3date = system.CurrentDate()

			}
		}
		if user.Roll == "FINANCE" {
			switch requestData.Number {
			case "1":
				billing.Finance = int(claims["ID"].(float64))
				billing.FinanceFullName = user.Nick
				billing.SignatureFinance = user.Signature
				billing.SignatureFinancedate = system.CurrentDate()
			case "2":
				billing.Finance2 = int(claims["ID"].(float64))
				billing.Finance2FullName = user.Nick
				billing.SignatureFinance2 = user.Signature
				billing.SignatureFinance2date = system.CurrentDate()
			default:
				billing.Finance3 = int(claims["ID"].(float64))
				billing.Finance3FullName = user.Nick
				billing.SignatureFinance3 = user.Signature
				billing.SignatureFinance3date = system.CurrentDate()
			}
		}

		db.Save(&billing)

		return result
	})
	if result.(*gorm.DB).RowsAffected > 0 {

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Billing approved",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No billing was found",
	})
}

func InvoicedBill(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormRequestInvoicedBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	var note models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		result := db.Where("id = ?", requestData.ID).First(&note)
		switch requestData.Invoice {
		case "1":
			note.Invoiced = requestData.Invoiced
			note.InvoicedDate = system.CurrentDate()
		case "2":
			note.Invoiced2 = requestData.Invoiced
			note.InvoicedDate2 = system.CurrentDate()
		default:
			note.Invoiced3 = requestData.Invoiced
			note.InvoicedDate3 = system.CurrentDate()
		}

		db.Save(&note)

		return result
	})
	if result.(*gorm.DB).RowsAffected > 0 {

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Note Status Updated",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No note was found",
	})
}

func PaidBill(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormRequestpaidBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	var note models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		result := db.Where("id = ?", requestData.ID).First(&note)
		user, _ := core.GetUserFromLDAP(claims["UID"].(string))
		switch requestData.Number {
		case "1":
			note.Paid = requestData.Paid
			note.PaidDate = system.CurrentDate()
			note.Finance = int(claims["ID"].(float64))
			note.FinanceFullName = user.Nick
			note.SignatureFinance = user.Signature
			if requestData.Paid == "Full" {
				note.PaidUnits = int64(note.Units)
			}
		case "2":
			note.Paid2 = requestData.Paid
			note.PaidDate2 = system.CurrentDate()
			note.Finance2 = int(claims["ID"].(float64))
			note.Finance2FullName = user.Nick
			note.SignatureFinance2 = user.Signature
			if requestData.Paid == "Full" {
				note.PaidUnits2 = int64(note.Units - int(note.PaidUnits))
			}
		default:
			note.Paid3 = requestData.Paid
			note.PaidDate3 = system.CurrentDate()
			note.Finance3 = int(claims["ID"].(float64))
			note.Finance3FullName = user.Nick
			note.SignatureFinance3 = user.Signature
			if requestData.Paid == "Full" {
				note.PaidUnits3 = int64(note.Units - int(note.PaidUnits) - int(note.PaidUnits2))
			}
		}

		db.Save(&note)

		return result
	})
	if result.(*gorm.DB).RowsAffected > 0 {

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Note Status Updated",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No note was found",
	})
}

func PaidUnitsBill(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormRequestpaidUnitsBill
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	var note models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		result := db.Where("id = ?", requestData.ID).First(&note)

		unitsPaid := requestData.PaidUnits
		switch requestData.Number {
		case "1":
			if note.Paid == "Full" {
				note.PaidUnits = int64(note.Units)
			} else {
				if unitsPaid == int64(note.Units) {
					note.Paid = "Full"
				}
				note.PaidUnits = unitsPaid
			}
		case "2":
			if note.Paid2 == "Full" {
				note.PaidUnits2 = int64(note.Units)
			} else {
				if (unitsPaid + note.PaidUnits) == int64(note.Units) {
					note.Paid = "Full"
				}
				note.PaidUnits2 = unitsPaid
			}
		default:
			if note.Paid3 == "Full" {
				note.PaidUnits3 = int64(note.Units)
			} else {
				if (unitsPaid + note.PaidUnits + note.PaidUnits3) == int64(note.Units) {
					note.Paid = "Full"
				}
				note.PaidUnits3 = unitsPaid
			}
		}

		db.Save(&note)

		return result
	})
	if result.(*gorm.DB).RowsAffected > 0 {

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Note Status Updated",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No note was found",
	})
}

// -----------TCMS
func BillActiveWeekTCMS(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).First(&week)
	})

	// -- Get Bill
	var billing []models.Billing
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcms = ? and week = ?", claims["ID"].(float64), week.ID).Find(&billing)
	})
	var billData []models.BillingDataOUT
	for _, bill := range billing {
		// -- Get Notes in Bill
		var notesBill []models.NotesBilling
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("billing = ?", strconv.FormatUint(uint64(bill.ID), 10)).Find(&notesBill)
		})
		// -----------------------------------
		var notesSelect []models.NotesOut
		for _, note := range notesBill {
			var noteDate models.Notes
			resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id = ? ", note.Note).Order("date").First(&noteDate)
			})
			if resultN.(*gorm.DB).RowsAffected > 0 {
				decryptedSignatureFinance, _ := core.DecryptImage(noteDate.SignatureFinance)
				decryptedSignatureFinance2, _ := core.DecryptImage(noteDate.SignatureFinance2)
				decryptedSignatureFinance3, _ := core.DecryptImage(noteDate.SignatureFinance3)

				var noteOut models.NotesOut
				copier.Copy(&noteOut, &note)
				noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
				noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
				noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
				notesSelect = append(notesSelect, noteOut)
			}
		}
		// -----------------------------------
		if len(notesSelect) > 0 {
			var clients []models.OutClientsNotesWeekActive
			// -------------------------------------
			units := 0
			// -------------------------------------
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				var caseManagement []models.ClientServiceCaseManagement
				// With this query obtain only one scm from each tcm client
				db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)
				for _, val := range caseManagement {
					var scm models.OutClientSCMActive
					var cscm models.ClientServiceCaseManagement
					db.Where("client = ?  and status = ?", val.Client, "Open").First(&cscm)

					// ----
					var tcm models.ClienteSCMTcm
					db.Where("scm = ?", cscm.ID).First(&tcm)
					var demografic models.ClientSCMDemografic
					db.Where("scm = ?", cscm.ID).First(&demografic)
					var sureActive models.ClientSCMSure
					db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)
					var sures []models.ClientSCMSure
					db.Where("scm = ?", cscm.ID).Find(&sures)
					var medicals models.ClientSCMMedical
					db.Where("scm = ?", cscm.ID).First(&medicals)
					var mentals models.ClientSCMMental
					db.Where("scm = ?", cscm.ID).First(&mentals)
					// Documents
					var certification models.ClientSCMCertification
					db.Where("scm = ?", cscm.ID).First(&certification)
					var outCertification models.OutSCMCertification

					decryptedCertSignaturetcm, _ := core.DecryptImage(certification.Signtcm)
					decryptedCertSignaturesupervisor, _ := core.DecryptImage(certification.Signsupervisor)
					decryptedCertSignatureqa, _ := core.DecryptImage(certification.Signqa)
					// -- Copiar de la estructura original a la de salida
					copier.Copy(&outCertification, &certification)

					outCertification.Signtcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturetcm)
					outCertification.Signsupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturesupervisor)
					outCertification.Signqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignatureqa)
					// -----------

					var assessment models.ClientSCMAssessment
					db.Where("scm = ?", cscm.ID).First(&assessment)
					var outAssessmet models.OutSCMAssessment
					decryptedAssessmentSignaturetcm, _ := core.DecryptImage(assessment.Signaturetcm)
					decryptedAssessmentSignaturesupervisor, _ := core.DecryptImage(assessment.Signaturesupervisor)
					decryptedAssessmentSignatureqa, _ := core.DecryptImage(assessment.Signatureqa)
					copier.Copy(&outAssessmet, &assessment)
					outAssessmet.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturetcm)
					outAssessmet.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturesupervisor)
					outAssessmet.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignatureqa)
					var sp models.ClientSCMSp
					db.Where("scm = ?", cscm.ID).First(&sp)

					var goal1 models.SpGoal1
					db.Where("sp = ?", sp.ID).First(&goal1)
					var goal2 models.SpGoal2
					db.Where("sp = ?", sp.ID).First(&goal2)
					var goal3 models.SpGoal3
					db.Where("sp = ?", sp.ID).First(&goal3)
					var goal4 models.SpGoal4
					db.Where("sp = ?", sp.ID).First(&goal4)
					var goal5 models.SpGoal5
					db.Where("sp = ?", sp.ID).First(&goal5)
					var goal6 models.SpGoal6
					db.Where("sp = ?", sp.ID).First(&goal6)
					var goal7 models.SpGoal7
					db.Where("sp = ?", sp.ID).First(&goal7)
					var goal8 models.SpGoal8
					db.Where("sp = ?", sp.ID).First(&goal8)

					var outSp models.OutClientSCMSp

					// ---
					decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
					decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
					decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)
					// ---

					outSp.ID = int(sp.ID)
					outSp.Client = sp.Client
					outSp.Scm = sp.Scm
					outSp.Developmentdate = sp.Developmentdate
					outSp.Axiscode = sp.Axiscode
					outSp.Axiscodedescription = sp.Axiscodedescription
					outSp.Tcm = sp.Tcm
					outSp.Goal1 = goal1
					outSp.Goal2 = goal2
					outSp.Goal3 = goal3
					outSp.Goal4 = goal4
					outSp.Goal5 = goal5
					outSp.Goal6 = goal6
					outSp.Goal7 = goal7
					outSp.Goal8 = goal8
					outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
					outSp.Signaturetcmdate = sp.Signaturetcmdate
					outSp.Supervisor = sp.Supervisor
					outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
					outSp.Signaturesupervisordate = sp.Signaturesupervisordate
					outSp.Qa = sp.Qa
					outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
					outSp.Signatureqadate = sp.Signatureqadate

					scm.ID = int(cscm.ID)
					scm.Status = cscm.Status
					scm.Doa = cscm.Doa
					scm.ClosingDate = cscm.ClosingDate
					scm.TCM = tcm
					scm.Demografic = demografic
					scm.SureActive = sureActive
					scm.Sure = sures
					scm.Medical = medicals
					scm.Mental = mentals

					scm.Certification = outCertification
					scm.Assessment = outAssessmet
					scm.Sp = outSp
					// ----

					var client models.Clients
					db.Where("ID = ?", val.Client).First(&client)
					var notes []models.NotesOut
					for _, note := range notesSelect {
						if note.Scm == int(cscm.ID) {
							units += note.Units
							var noteOut models.NotesOut
							copier.Copy(&noteOut, &note)
							notes = append(notes, noteOut)
						}
					}
					if len(notes) > 0 {
						clients = append(clients, models.OutClientsNotesWeekActive{
							ID:             client.ID,
							LastName:       client.LastName,
							FirstName:      client.FirstName,
							SS:             client.SS,
							DOB:            client.DOB,
							Medicaid:       client.Medicaid,
							GoldCardNumber: client.GoldCardNumber,
							Medicare:       client.Medicare,
							Notes:          notes,
							Scm:            scm,
						})
					}
				}
				return clients
			})
			// -------------------------------------

			var billOut models.BillingOUT

			decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
			decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
			decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)
			billOut.Id = int(bill.ID)
			billOut.Week = bill.Week
			billOut.Date = bill.Date
			billOut.Units = units
			billOut.Hours = float64(units) / 4
			// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
			billOut.PayRate = bill.PaymentByUnits * 4
			billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
			// -- Dates TCM
			billOut.Tcm = bill.Tcm
			billOut.TcmFullName = bill.TcmFullName
			billOut.TcmCredentials = bill.TcmCredentials

			billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
			billOut.SignatureTcmDate = bill.SignatureTcmDate
			// -- Dates TCMS
			billOut.Tcms = bill.Tcms
			billOut.TcmsFullName = bill.TcmsFullName
			billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
			billOut.SignatureTcmsdate = bill.SignatureTcmsdate
			// -- Dates Biller
			billOut.Biller = bill.Biller
			billOut.BillerFullName = bill.BillerFullName
			billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
			billOut.SignatureBillerdate = bill.SignatureBillerdate

			billData = append(billData, models.BillingDataOUT{
				Week:        week,
				Clients:     clients,
				Billing:     billOut,
				Notes:       notesSelect,
				AmountNotes: len(notesSelect),
				Units:       units,
				Hours:       float64(units) / 4,
				PayRate:     bill.PaymentByUnits * 4,
				WeekPay:     (bill.PaymentByUnits) * (float64(units)),
			})
		}

	}

	return c.Status(fiber.StatusOK).JSON(billData)
}

// -----------Biller
func BillActiveWeekBiller(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------

	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).First(&week)
	})

	// -- Get Bill
	var billing []models.Billing
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("signature_tcms IS NOT NULL AND signature_tcms != '' AND week = ?", week.ID).Find(&billing)
	})
	var billData []models.BillingDataOUT
	for _, bill := range billing {
		// -- Get Notes in Bill
		var notesBill []models.NotesBilling
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("billing = ?", strconv.FormatUint(uint64(bill.ID), 10)).Find(&notesBill)
		})
		// -----------------------------------
		var notesSelect []models.NotesOut
		for _, note := range notesBill {
			var noteDate models.Notes
			resultN, _ := database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id = ? ", note.Note).Order("date").First(&noteDate)
			})
			if resultN.(*gorm.DB).RowsAffected > 0 {
				decryptedSignatureFinance, _ := core.DecryptImage(noteDate.SignatureFinance)
				decryptedSignatureFinance2, _ := core.DecryptImage(noteDate.SignatureFinance2)
				decryptedSignatureFinance3, _ := core.DecryptImage(noteDate.SignatureFinance3)

				var noteOut models.NotesOut
				copier.Copy(&noteOut, &note)
				noteOut.SignatureFinance = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance)
				noteOut.SignatureFinance2 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance2)
				noteOut.SignatureFinance3 = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureFinance3)
				notesSelect = append(notesSelect, noteOut)
			}
		}
		// -----------------------------------
		if len(notesSelect) > 0 {
			var clients []models.OutClientsNotesWeekActive
			// -------------------------------------
			units := 0
			// -------------------------------------
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				var caseManagement []models.ClientServiceCaseManagement
				// With this query obtain only one scm from each tcm client
				db.Select("DISTINCT client").Where("tcm = ?", bill.Tcm).Find(&caseManagement)
				for _, val := range caseManagement {
					var scm models.OutClientSCMActive
					var cscm models.ClientServiceCaseManagement
					db.Where("client = ?  and status = ?", val.Client, "Open").First(&cscm)

					// ----
					var tcm models.ClienteSCMTcm
					db.Where("scm = ?", cscm.ID).First(&tcm)
					var demografic models.ClientSCMDemografic
					db.Where("scm = ?", cscm.ID).First(&demografic)
					var sureActive models.ClientSCMSure
					db.Where("scm = ? and active = ?", cscm.ID, true).First(&sureActive)
					var sures []models.ClientSCMSure
					db.Where("scm = ?", cscm.ID).Find(&sures)
					var medicals models.ClientSCMMedical
					db.Where("scm = ?", cscm.ID).First(&medicals)
					var mentals models.ClientSCMMental
					db.Where("scm = ?", cscm.ID).First(&mentals)
					// Documents
					var certification models.ClientSCMCertification
					db.Where("scm = ?", cscm.ID).First(&certification)
					var outCertification models.OutSCMCertification

					decryptedCertSignaturetcm, _ := core.DecryptImage(certification.Signtcm)
					decryptedCertSignaturesupervisor, _ := core.DecryptImage(certification.Signsupervisor)
					decryptedCertSignatureqa, _ := core.DecryptImage(certification.Signqa)
					// -- Copiar de la estructura original a la de salida
					copier.Copy(&outCertification, &certification)

					outCertification.Signtcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturetcm)
					outCertification.Signsupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturesupervisor)
					outCertification.Signqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignatureqa)
					// -----------

					var assessment models.ClientSCMAssessment
					db.Where("scm = ?", cscm.ID).First(&assessment)
					var outAssessmet models.OutSCMAssessment
					decryptedAssessmentSignaturetcm, _ := core.DecryptImage(assessment.Signaturetcm)
					decryptedAssessmentSignaturesupervisor, _ := core.DecryptImage(assessment.Signaturesupervisor)
					decryptedAssessmentSignatureqa, _ := core.DecryptImage(assessment.Signatureqa)
					copier.Copy(&outAssessmet, &assessment)
					outAssessmet.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturetcm)
					outAssessmet.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturesupervisor)
					outAssessmet.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignatureqa)
					var sp models.ClientSCMSp
					db.Where("scm = ?", cscm.ID).First(&sp)

					var goal1 models.SpGoal1
					db.Where("sp = ?", sp.ID).First(&goal1)
					var goal2 models.SpGoal2
					db.Where("sp = ?", sp.ID).First(&goal2)
					var goal3 models.SpGoal3
					db.Where("sp = ?", sp.ID).First(&goal3)
					var goal4 models.SpGoal4
					db.Where("sp = ?", sp.ID).First(&goal4)
					var goal5 models.SpGoal5
					db.Where("sp = ?", sp.ID).First(&goal5)
					var goal6 models.SpGoal6
					db.Where("sp = ?", sp.ID).First(&goal6)
					var goal7 models.SpGoal7
					db.Where("sp = ?", sp.ID).First(&goal7)
					var goal8 models.SpGoal8
					db.Where("sp = ?", sp.ID).First(&goal8)

					var outSp models.OutClientSCMSp

					// ---
					decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
					decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
					decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)
					// ---

					outSp.ID = int(sp.ID)
					outSp.Client = sp.Client
					outSp.Scm = sp.Scm
					outSp.Developmentdate = sp.Developmentdate
					outSp.Axiscode = sp.Axiscode
					outSp.Axiscodedescription = sp.Axiscodedescription
					outSp.Tcm = sp.Tcm
					outSp.Goal1 = goal1
					outSp.Goal2 = goal2
					outSp.Goal3 = goal3
					outSp.Goal4 = goal4
					outSp.Goal5 = goal5
					outSp.Goal6 = goal6
					outSp.Goal7 = goal7
					outSp.Goal8 = goal8
					outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
					outSp.Signaturetcmdate = sp.Signaturetcmdate
					outSp.Supervisor = sp.Supervisor
					outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
					outSp.Signaturesupervisordate = sp.Signaturesupervisordate
					outSp.Qa = sp.Qa
					outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
					outSp.Signatureqadate = sp.Signatureqadate

					scm.ID = int(cscm.ID)
					scm.Status = cscm.Status
					scm.Doa = cscm.Doa
					scm.ClosingDate = cscm.ClosingDate
					scm.TCM = tcm
					scm.Demografic = demografic
					scm.SureActive = sureActive
					scm.Sure = sures
					scm.Medical = medicals
					scm.Mental = mentals

					scm.Certification = outCertification
					scm.Assessment = outAssessmet
					scm.Sp = outSp
					// ----

					var client models.Clients
					db.Where("ID = ?", val.Client).First(&client)
					var notes []models.NotesOut
					for _, note := range notesSelect {
						if note.Scm == int(cscm.ID) {
							units += note.Units
							var noteOut models.NotesOut
							copier.Copy(&noteOut, &note)
							notes = append(notes, noteOut)
						}
					}
					if len(notes) > 0 {
						clients = append(clients, models.OutClientsNotesWeekActive{
							ID:             client.ID,
							LastName:       client.LastName,
							FirstName:      client.FirstName,
							SS:             client.SS,
							DOB:            client.DOB,
							Medicaid:       client.Medicaid,
							GoldCardNumber: client.GoldCardNumber,
							Medicare:       client.Medicare,
							Notes:          notes,
							Scm:            scm,
						})
					}
				}
				return clients
			})
			// -------------------------------------

			var billOut models.BillingOUT

			decryptedSignaturetcm, _ := core.DecryptImage(bill.SignatureTcm)
			decryptedSignaturetcms, _ := core.DecryptImage(bill.SignatureTcms)
			decryptedSignatureBiller, _ := core.DecryptImage(bill.SignatureBILLER)
			billOut.Id = int(bill.ID)
			billOut.Week = bill.Week
			billOut.Date = bill.Date
			billOut.Units = units
			billOut.Hours = float64(units) / 4
			// TODO: Cambiar cuando se le ponga el campo al ldap paymentByUnits
			billOut.PayRate = bill.PaymentByUnits * 4
			billOut.WeekPay = (bill.PaymentByUnits) * (float64(units))
			// -- Dates TCM
			billOut.Tcm = bill.Tcm
			billOut.TcmFullName = bill.TcmFullName
			billOut.TcmCredentials = bill.TcmCredentials

			billOut.SignatureTcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
			billOut.SignatureTcmDate = bill.SignatureTcmDate
			// -- Dates TCMS
			billOut.Tcms = bill.Tcms
			billOut.TcmsFullName = bill.TcmsFullName
			billOut.SignatureTcms = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcms)
			billOut.SignatureTcmsdate = bill.SignatureTcmsdate
			// -- Dates Biller
			billOut.Biller = bill.Biller
			billOut.BillerFullName = bill.BillerFullName
			billOut.SignatureBILLER = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureBiller)
			billOut.SignatureBillerdate = bill.SignatureBillerdate

			billData = append(billData, models.BillingDataOUT{
				Week:        week,
				Clients:     clients,
				Billing:     billOut,
				Notes:       notesSelect,
				AmountNotes: len(notesSelect),
				Units:       units,
				Hours:       float64(units) / 4,
				PayRate:     bill.PaymentByUnits * 4,
				WeekPay:     (bill.PaymentByUnits) * (float64(units)),
			})
		}

	}

	return c.Status(fiber.StatusOK).JSON(billData)
}
