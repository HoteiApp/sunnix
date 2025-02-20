package controllers

import (
	"encoding/json"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func VerificationDateServiceModify(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid := strings.ToLower(data["username"])
	service := strings.ToLower(data["service"])
	date := strings.ToLower(data["date"])

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var user models.Users
		// db.Where("email = ?", email).First(&user)
		result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")
		bytes, _ := json.Marshal(&result)
		var resultSearch ldap.SearchResult
		_ = json.Unmarshal(bytes, &resultSearch)

		if len(resultSearch.Entries) > 0 {
			userLdap := resultSearch.Entries[0]

			var record models.WorkerRecord
			db.Where("uid = ?", userLdap.GetAttributeValue("uid")).First(&record)

			user.Uid = userLdap.GetAttributeValue("uid")

			var documents models.NecessaryDocuments
			db.Where("worker_record_id = ?", record.ID).Find(&documents)

			switch service {
			case "service_trainer_provider":
				documents.ServiceTrainerProviderDate = date
			case "service_cpr_aed":
				documents.ServiceCprAedDate = date
			case "service_osha":
				documents.ServiceOSHADate = date
			case "service_infection_control":
				documents.ServiceInfectionControlDate = date

			default:
				documents.ServiceTrainerProviderDate = "false"
			}
			return db.Save(&documents)
		}
		return db
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "APPLICATION_MODIFY_DATE_SERVIVE",
			LoggedIn:    claims["UID"].(string),
			Username:    uid,
			Client:      0,
			Description: "Modified the date of obtaining the service",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Modified the date of obtaining the service",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
