package controllers

import (
	"encoding/base64"
	"encoding/json"
	"strconv"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Get all TCM of the SuPERVISOR ---------------------------------------------
func SupervisorTCMs(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var users []models.Users
	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(supervisor="+claims["UID"].(string)+"))")
	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)
	if len(resultSearch.Entries) > 0 {

		for _, userLdap := range resultSearch.Entries {
			// FIXME: Aqui va los campos de la tabla de usuario exportados del LDAP
			id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)

			users = append(users, models.Users{
				ID:           uint(id),
				Uid:          userLdap.GetAttributeValue("uid"),
				Email:        userLdap.GetAttributeValue("mail"),
				Nick:         userLdap.GetAttributeValue("cn"),
				SecurityCode: system.StringToBool(userLdap.GetAttributeValue("securityCode")),
				Active:       system.StringToBool(userLdap.GetAttributeValue("active")),
				Approved:     system.StringToBool(userLdap.GetAttributeValue("approved")),
				Global:       system.StringToBool(userLdap.GetAttributeValue("global")),
				Roll:         userLdap.GetAttributeValue("roll"),
				Credentials:  userLdap.GetAttributeValue("credentials"),
			})
		}

	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"tcms": users,
	})
}

// Get Pending supervisions of the Supervisor ---------------------------------------------
func SupervisorPendingSupervisions(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	// var clients []models.OutClients
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var clients []models.OutClientsSupervise

		var tcms []models.Users
		db.Where("supervisor = ?", claims["ID"].(float64)).Find(&tcms)

		for _, tcm := range tcms {
			var caseManagement []models.ClientServiceCaseManagement
			db.Where("tcm = ? and status = ?", tcm.ID, "Open").Find(&caseManagement)
			for _, val := range caseManagement {

				var client models.Clients
				db.Where("ID = ?", val.Client).Find(&client)

				var scm []models.OutClientSCM

				var tcm models.ClienteSCMTcm
				db.Where("scm = ?", val.ID).Find(&tcm)
				var demografic models.ClientSCMDemografic
				db.Where("scm = ?", val.ID).Find(&demografic)
				var sures []models.ClientSCMSure
				db.Where("scm = ?", val.ID).Find(&sures)
				var medicals []models.ClientSCMMedical
				db.Where("scm = ?", val.ID).Find(&medicals)
				var mentals []models.ClientSCMMental
				db.Where("scm = ?", val.ID).Find(&mentals)

				mark := 0
				// Documents
				certification_pending := false
				var certification models.ClientSCMCertification
				db.Where("scm = ?", val.ID).Find(&certification)
				if certification.Signtcm != "" && certification.Signsupervisor == "" {
					mark++
					certification_pending = true
				}

				assessment_pending := false
				var assessment models.ClientSCMAssessment
				db.Where("scm = ?", val.ID).Find(&assessment)
				if assessment.Signaturetcm != "" && assessment.Signaturesupervisor == "" {
					mark++
					assessment_pending = true
				}

				sp_pending := false
				var sp models.ClientSCMSp
				db.Where("scm = ?", val.ID).Find(&sp)
				if sp.Signaturetcm != "" && sp.Signaturesupervisor == "s" {
					mark++
					sp_pending = true
				}

				notes_pending := false
				var notes models.Notes
				db.Where("scm = ?", val.ID).Find(&notes)
				// TODO: Agregar condicion para que se muestre si el supervisor no ha firmado
				// if notes.Signaturetcm != nil {
				// 	mark++
				// 	notes_pending = true
				// }

				var outSp models.OutClientSCMSp
				decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
				decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
				decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)

				outSp.ID = int(sp.ID)
				outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
				outSp.Signaturetcmdate = sp.Signaturetcmdate

				outSp.Supervisor = sp.Supervisor
				outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
				outSp.Signaturesupervisordate = sp.Signaturesupervisordate

				outSp.Qa = sp.Qa
				outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
				outSp.Signatureqadate = sp.Signatureqadate

				scm = append(scm, models.OutClientSCM{
					ID:          int(val.ID),
					Status:      val.Status,
					Doa:         val.Doa,
					ClosingDate: val.ClosingDate,
				})
				// FIXME Cambiar a > 0 esta asi par poder probar ahora
				if mark > 0 {
					clients = append(clients, models.OutClientsSupervise{
						ID: client.ID,

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

						Certification: certification_pending,
						Assessment:    assessment_pending,
						Sp:            sp_pending,
						Notes:         notes_pending,
						Scm:           scm,
					})
				}

			}

		}

		return clients
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"clients": result.([]models.OutClientsSupervise),
	})
}
