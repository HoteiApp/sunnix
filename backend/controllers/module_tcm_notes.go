package controllers

import (
	"encoding/base64"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

func CoreGetNotesWeekActive(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).Find(&week)
	})
	// All notes in active week
	var notesWeekActive []models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ? and week = ?", claims["ID"].(float64), week.ID).Order("date").Find(&notesWeekActive)
	})
	var clients []models.OutClientsNotesWeekActive
	// -------------------------------------
	units := 0
	// -------------------------------------
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		var caseManagement []models.ClientServiceCaseManagement
		// With this query obtain only one scm from each tcm client
		db.Select("DISTINCT client").Where("tcm = ? and status = ?", claims["ID"].(float64), "Open").Find(&caseManagement)
		for _, val := range caseManagement {
			var scm models.OutClientSCMActive
			var cscm models.ClientServiceCaseManagement
			db.Where("client = ?  and status = ?", val.Client, "Open").Find(&cscm)

			// ----
			var tcm models.ClienteSCMTcm
			db.Where("scm = ?", cscm.ID).Find(&tcm)
			var demografic models.ClientSCMDemografic
			db.Where("scm = ?", cscm.ID).Find(&demografic)
			var sureActive models.ClientSCMSure
			db.Where("scm = ? and active = ?", cscm.ID, true).Find(&sureActive)

			var sure_active models.ClientSCMSure
			db.Where("scm = ? and active = ?", cscm.ID, true).Find(&sure_active)

			var sures []models.ClientSCMSure
			db.Where("scm = ?", cscm.ID).Find(&sures)

			var medicals models.ClientSCMMedical
			db.Where("scm = ?", cscm.ID).Find(&medicals)
			var mentals models.ClientSCMMental
			db.Where("scm = ?", cscm.ID).Find(&mentals)
			// Documents
			var certification models.ClientSCMCertification
			db.Where("scm = ?", cscm.ID).Find(&certification)
			var outCertification models.OutSCMCertification

			decryptedCertSignaturetcm, _ := core.DecryptImage(certification.Signtcm)
			decryptedCertSignaturesupervisor, _ := core.DecryptImage(certification.Signsupervisor)
			decryptedCertSignatureqa, _ := core.DecryptImage(certification.Signqa)
			// -- Copiar de la estructura original a la de salida
			copier.Copy(&outCertification, &certification)

			outCertification.Signtcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturetcm)
			outCertification.Signsupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturesupervisor)
			outCertification.Signqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignatureqa)

			var assessment models.ClientSCMAssessment
			db.Where("scm = ?", cscm.ID).Find(&assessment)
			var outAssessmet models.OutSCMAssessment
			decryptedAssessmentSignaturetcm, _ := core.DecryptImage(assessment.Signaturetcm)
			decryptedAssessmentSignaturesupervisor, _ := core.DecryptImage(assessment.Signaturesupervisor)
			decryptedAssessmentSignatureqa, _ := core.DecryptImage(assessment.Signatureqa)
			copier.Copy(&outAssessmet, &assessment)
			outAssessmet.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturetcm)
			outAssessmet.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturesupervisor)
			outAssessmet.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignatureqa)
			var sp models.ClientSCMSp
			db.Where("scm = ?", cscm.ID).Find(&sp)

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
			scm.SureActive = sure_active
			scm.Sure = sures
			scm.SureActive = sureActive
			scm.Medical = medicals
			scm.Mental = mentals

			scm.Certification = outCertification
			scm.Assessment = outAssessmet
			scm.Sp = outSp
			// ----

			var client models.Clients
			db.Where("ID = ?", val.Client).Find(&client)
			var notes []models.NotesOut
			for _, note := range notesWeekActive {
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

	if result.(*gorm.DB).RowsAffected > 0 {
		// var user models.Users

		// result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+requestData.Editassessment.Supervisor+"))")
		// bytes, _ := json.Marshal(&result)
		// var resultSearch ldap.SearchResult
		// _ = json.Unmarshal(bytes, &resultSearch)

		// if len(resultSearch.Entries) > 0 {
		// 	userLdap := resultSearch.Entries[0]
		// FIXME: Aqui va los campos de la tabla de usuario exportados del LDAP
		// 	id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
		// 	request.Supervisor = int(id)
		// }

		// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// 	return db.Where("id = ?", claims["ID"].(float64)).Find(&user)
		// })
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"week":         week,
			"clients":      clients,
			"amount_notes": len(notesWeekActive),
			"units":        units,
			"hours":        float64(units) / 4,
			"pay_rate":     7.28 * 4,
			"week_pay":     (7.28) * (float64(units)),
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func CoreGetNotesClient(c *fiber.Ctx) error {
	id := c.Params("client")
	// Active Week
	var week models.Week
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("active = ?", true).Find(&week)
	})
	// All notes
	var notes []models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("scm = ?", id).Order("date").Find(&notes)
	})

	// All notes in active week
	var notesWeekActive []models.Notes
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("scm = ? and week = ?", id, week.ID).Order("date").Find(&notesWeekActive)
	})
	// All notes in current week
	var notesWeekCurrent []models.Notes
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("scm = ? and week = ?", id, week.ID+1).Order("date").Find(&notesWeekCurrent)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"week":              week,
			"notes_week_active": notesWeekActive,
			"current_week":      notesWeekCurrent,
			"all_notes":         notes,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func GetMyNotes(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var notes []models.Notes
	result, err := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ?", claims["ID"].(float64)).Order("date").Find(&notes)
	})

	if result.(*gorm.DB).RowsAffected > 0 || err == nil {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"all_notes": notes,
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func GetMyNotesDate(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	date := data["date"]
	//-------------------
	var notes_date []models.Notes
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ? and date = ?", claims["ID"].(float64), date).Find(&notes_date)
	})

	// var notes_all []models.Notes
	// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 	return db.Where("tcm = ?", claims["ID"].(float64)).Find(&notes_all)
	// })

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"day_notes": notes_date,
			// "all_notes": notes_all,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// New Note
func NotesAdd(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FromAddNote
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// var week models.Week
		// dateStr := requestData.Notesadd.Date
		// db.Where("? >= Start AND ? <= End", dateStr, dateStr).First(&week)
		// var user models.Users
		// db.Where("email = ?", claims["ID"].(float64)).Find(&user)
		var note models.Notes

		note.Tcm = int(claims["ID"].(float64))
		note.Scm = requestData.Notesadd.Scm
		note.Week = requestData.Notesadd.Weeks
		note.Insurance = int(requestData.Notesadd.Insurance)
		note.Date = requestData.Notesadd.Date
		note.Billable = requestData.Notesadd.Billable
		note.Minutes = requestData.Notesadd.Minutes
		note.Units = requestData.Notesadd.Units

		note.Timein = requestData.Notesadd.Timein
		note.Timeout = requestData.Notesadd.Timeout
		note.Location = requestData.Notesadd.Location
		note.Opening = strings.Join(requestData.Notesadd.Opening, ",")
		note.Sp = strings.Join(requestData.Notesadd.Sp, ",")
		note.Addendums = strings.Join(requestData.Notesadd.Addendums, ",")
		note.Sprfollowup = strings.Join(requestData.Notesadd.Sprfollowup, ",")
		note.Spr = strings.Join(requestData.Notesadd.Spr, ",")
		note.Closing = strings.Join(requestData.Notesadd.Closing, ",")
		note.Description = requestData.Notesadd.Description

		note.Timein2 = requestData.Notesadd.Timein2
		note.Timeout2 = requestData.Notesadd.Timeout2
		note.Location2 = requestData.Notesadd.Location2
		note.Opening2 = strings.Join(requestData.Notesadd.Opening2, ",")
		note.Sp2 = strings.Join(requestData.Notesadd.Sp2, ",")
		note.Addendums2 = strings.Join(requestData.Notesadd.Addendums2, ",")
		note.Sprfollowup2 = strings.Join(requestData.Notesadd.Sprfollowup2, ",")
		note.Spr2 = strings.Join(requestData.Notesadd.Spr2, ",")
		note.Closing2 = strings.Join(requestData.Notesadd.Closing2, ",")
		note.Description2 = requestData.Notesadd.Description2

		note.Timein3 = requestData.Notesadd.Timein3
		note.Timeout3 = requestData.Notesadd.Timeout3
		note.Location3 = requestData.Notesadd.Location3
		note.Opening3 = strings.Join(requestData.Notesadd.Opening3, ",")
		note.Sp3 = strings.Join(requestData.Notesadd.Sp3, ",")
		note.Addendums3 = strings.Join(requestData.Notesadd.Addendums3, ",")
		note.Sprfollowup3 = strings.Join(requestData.Notesadd.Sprfollowup3, ",")
		note.Spr3 = strings.Join(requestData.Notesadd.Spr3, ",")
		note.Closing3 = strings.Join(requestData.Notesadd.Closing3, ",")
		note.Description3 = requestData.Notesadd.Description3

		note.Valueprogress1 = requestData.Notesadd.Valueprogress1
		note.Valueprogress2 = requestData.Notesadd.Valueprogress2
		note.Valueprogress3 = requestData.Notesadd.Valueprogress3
		note.Valueprogress4 = requestData.Notesadd.Valueprogress4
		note.Valueprogress5 = requestData.Notesadd.Valueprogress5
		note.Valueprogress6 = requestData.Notesadd.Valueprogress6
		note.Valueprogress7 = requestData.Notesadd.Valueprogress7
		note.Valueprogress8 = requestData.Notesadd.Valueprogress8

		note.Valuefollowup = requestData.Notesadd.Valuefollowup

		return db.Save(&note)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "ADD_REQUEST_NEW_CLIENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      0,
		// 	Description: "Information saved correctly",
		// }
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// Edit Note
func NotesEdit(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FromEditNote
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var note models.Notes
		db.Where("id = ?", requestData.ID).Find(&note)

		note.Tcm = requestData.NotesEdit.Tcm
		note.Scm = requestData.NotesEdit.Scm
		note.Week = requestData.NotesEdit.Weeks
		note.Date = requestData.NotesEdit.Date
		note.Billable = requestData.NotesEdit.Billable
		note.Minutes = requestData.NotesEdit.Minutes
		note.Units = requestData.NotesEdit.Units

		note.Timein = requestData.NotesEdit.Timein
		note.Timeout = requestData.NotesEdit.Timeout
		note.Location = requestData.NotesEdit.Location
		note.Opening = strings.Join(requestData.NotesEdit.Opening, ",")
		note.Sp = strings.Join(requestData.NotesEdit.Sp, ",")
		note.Addendums = strings.Join(requestData.NotesEdit.Addendums, ",")
		note.Sprfollowup = strings.Join(requestData.NotesEdit.Sprfollowup, ",")
		note.Spr = strings.Join(requestData.NotesEdit.Spr, ",")
		note.Closing = strings.Join(requestData.NotesEdit.Closing, ",")
		note.Description = requestData.NotesEdit.Description

		note.Timein2 = requestData.NotesEdit.Timein2
		note.Timeout2 = requestData.NotesEdit.Timeout2
		note.Location2 = requestData.NotesEdit.Location2
		note.Opening2 = strings.Join(requestData.NotesEdit.Opening2, ",")
		note.Sp2 = strings.Join(requestData.NotesEdit.Sp2, ",")
		note.Addendums2 = strings.Join(requestData.NotesEdit.Addendums2, ",")
		note.Sprfollowup2 = strings.Join(requestData.NotesEdit.Sprfollowup2, ",")
		note.Spr2 = strings.Join(requestData.NotesEdit.Spr2, ",")
		note.Closing2 = strings.Join(requestData.NotesEdit.Closing2, ",")
		note.Description2 = requestData.NotesEdit.Description2

		note.Timein3 = requestData.NotesEdit.Timein3
		note.Timeout3 = requestData.NotesEdit.Timeout3
		note.Location3 = requestData.NotesEdit.Location3
		note.Opening3 = strings.Join(requestData.NotesEdit.Opening3, ",")
		note.Sp3 = strings.Join(requestData.NotesEdit.Sp3, ",")
		note.Addendums3 = strings.Join(requestData.NotesEdit.Addendums3, ",")
		note.Sprfollowup3 = strings.Join(requestData.NotesEdit.Sprfollowup3, ",")
		note.Spr3 = strings.Join(requestData.NotesEdit.Spr3, ",")
		note.Closing3 = strings.Join(requestData.NotesEdit.Closing3, ",")
		note.Description3 = requestData.NotesEdit.Description3

		note.Valueprogress1 = requestData.NotesEdit.Valueprogress1
		note.Valueprogress2 = requestData.NotesEdit.Valueprogress2
		note.Valueprogress3 = requestData.NotesEdit.Valueprogress3
		note.Valueprogress4 = requestData.NotesEdit.Valueprogress4
		note.Valueprogress5 = requestData.NotesEdit.Valueprogress5
		note.Valueprogress6 = requestData.NotesEdit.Valueprogress6
		note.Valueprogress7 = requestData.NotesEdit.Valueprogress7
		note.Valueprogress8 = requestData.NotesEdit.Valueprogress8

		note.Valuefollowup = requestData.NotesEdit.Valuefollowup

		return db.Save(&note)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "ADD_REQUEST_NEW_CLIENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      0,
		// 	Description: "Information saved correctly",
		// }
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// Delete Note
func NotesDelete(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	id := c.Params("id")

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {

		var note models.Notes
		db.Where("id = ?", id).Delete(&note)
		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
