package controllers

import (
	"encoding/base64"
	"strconv"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

func CoreGetTCMS(c *fiber.Ctx) error {
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).First(&week)
	})

	result, err := database.WithDB(func(db *gorm.DB) interface{} {
		var tcms []models.OutTCMS
		// Query the database for all users

		listTcms := core.GetUsersFromLDAP("(&(roll=tcms)(active=True))")
		for k, supervisor := range listTcms {
			userInfo := core.GetWorkerRecord(supervisor.Uid)
			userData := GetUserInfo(supervisor.Uid)
			// --
			tcm := core.GetUsersFromLDAP("(&(roll=tcm)(supervisor=" + supervisor.Uid + "))")
			var outTCM []models.OutTCM
			for i, uTCM := range tcm {
				// tcmInfo := core.GetWorkerRecord(uTCM.Uid)
				tcmUserData := GetUserInfo(uTCM.Uid)
				// Billing por tcm
				var bill models.Billing
				_, _ = database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("signature_tcms IS NOT NULL AND signature_tcms != '' AND week = ? AND tcm = ?", week.ID, uTCM.ID).Find(&bill)
				})

				var billData models.BillingDataOUT

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

					billData = models.BillingDataOUT{
						Week:        week,
						Clients:     clients,
						Billing:     billOut,
						Notes:       notesSelect,
						AmountNotes: len(notesSelect),
						Units:       units,
						Hours:       float64(units) / 4,
						PayRate:     bill.PaymentByUnits * 4,
						WeekPay:     (bill.PaymentByUnits) * (float64(units)),
					}
				}

				// --------------------------------
				var clients []models.OutClients
				var caseManagement []models.ClientServiceCaseManagement
				// With this query obtain only one scm from each tcm client
				db.Select("DISTINCT client").Where("tcm = ?", uTCM.ID).Find(&caseManagement)

				for _, val := range caseManagement {
					var client models.Clients
					db.Where("ID = ?", val.Client).Find(&client)
					var cms []models.ClientServiceCaseManagement
					db.Where("client = ?", client.ID).Find(&cms)
					var scm []models.OutClientSCM
					for _, cm := range cms {
						var tcm models.ClienteSCMTcm
						db.Where("scm = ?", cm.ID).Find(&tcm)
						var demografic models.ClientSCMDemografic
						db.Where("scm = ?", cm.ID).Find(&demografic)
						var sures []models.ClientSCMSure
						db.Where("scm = ?", cm.ID).Find(&sures)
						var medicals []models.ClientSCMMedical
						db.Where("scm = ?", cm.ID).Find(&medicals)
						var mentals []models.ClientSCMMental
						db.Where("scm = ?", cm.ID).Find(&mentals)
						// Documents
						var certification models.ClientSCMCertification
						db.Where("scm = ?", cm.ID).Find(&certification)

						var assessment models.ClientSCMAssessment
						db.Where("scm = ?", cm.ID).Find(&assessment)

						var sp models.ClientSCMSp
						db.Where("scm = ?", cm.ID).Find(&sp)

						var goal1 models.SpGoal1
						db.Where("sp = ?", sp.ID).Find(&goal1)
						var goal2 models.SpGoal2
						db.Where("sp = ?", sp.ID).Find(&goal2)
						var goal3 models.SpGoal3
						db.Where("sp = ?", sp.ID).Find(&goal3)
						var goal4 models.SpGoal4
						db.Where("sp = ?", sp.ID).Find(&goal4)
						var goal5 models.SpGoal5
						db.Where("sp = ?", sp.ID).Find(&goal5)
						var goal6 models.SpGoal6
						db.Where("sp = ?", sp.ID).Find(&goal6)
						var goal7 models.SpGoal7
						db.Where("sp = ?", sp.ID).Find(&goal7)
						var goal8 models.SpGoal8
						db.Where("sp = ?", sp.ID).Find(&goal8)

						// var outSp models.OutClientSCMSp
						// // ---
						// decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
						// decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
						// decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)
						// // ---

						// outSp.ID = int(sp.ID)
						// outSp.Client = sp.Client
						// outSp.Scm = sp.Scm
						// outSp.Developmentdate = sp.Developmentdate
						// outSp.Axiscode = sp.Axiscode
						// outSp.Axiscodedescription = sp.Axiscodedescription
						// outSp.Tcm = sp.Tcm
						// outSp.Goal1 = goal1
						// outSp.Goal2 = goal2
						// outSp.Goal3 = goal3
						// outSp.Goal4 = goal4
						// outSp.Goal5 = goal5
						// outSp.Goal6 = goal6
						// outSp.Goal7 = goal7
						// outSp.Goal8 = goal8
						// outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
						// outSp.Signaturetcmdate = sp.Signaturetcmdate
						// outSp.Supervisor = sp.Supervisor
						// outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
						// outSp.Signaturesupervisordate = sp.Signaturesupervisordate
						// outSp.Qa = sp.Qa
						// outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
						// outSp.Signatureqadate = sp.Signatureqadate

						scm = append(scm, models.OutClientSCM{
							ID:          int(cm.ID),
							Status:      cm.Status,
							Doa:         cm.Doa,
							ClosingDate: cm.ClosingDate,
						})
					}

					clients = append(clients, models.OutClients{
						ID:              client.ID,
						ReferrerID:      client.ReferrerID,
						ReferringAgency: client.ReferringAgency,
						ReferringPerson: client.ReferringPerson,
						CellPhone:       client.CellPhone,
						Fax:             client.Fax,
						Email:           client.Email,
						Date:            client.Date,

						LastName:  client.LastName,
						FirstName: client.FirstName,
						SS:        client.SS,
						DOB:       client.DOB,
						Sexo:      client.Sexo,
						Race:      client.Race,

						Address: client.Address,
						State:   client.State,
						ZipCode: client.ZipCode,

						Phone:    client.Phone,
						School:   client.School,
						Lenguage: client.Lenguage,

						SingClient: client.SingClient,

						LegalGuardian:     client.LegalGuardian,
						Relationship:      client.Relationship,
						CellPhoneGuardian: client.CellPhoneGuardian,
						SingGuardian:      client.SingGuardian,

						Medicaid:       client.Medicaid,
						GoldCardNumber: client.GoldCardNumber,
						Medicare:       client.Medicare,
						Scm:            scm,
					})
				}
				// --------------
				outTCM = append(outTCM, models.OutTCM{
					ID:       i + 1,
					Info:     tcmUserData.Record,
					User:     tcmUserData.User,
					Clients:  clients,
					BillData: billData,
				})
			}

			// -------
			tcms = append(tcms, models.OutTCMS{
				ID:      k + 1,
				User:    userData.User,
				Info:    userInfo,
				ListTcm: outTCM,
			})
		}

		return tcms
	})
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Error",
		})
	}

	// Return the list of users
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"tcms": result.([]models.OutTCMS),
	})
}
