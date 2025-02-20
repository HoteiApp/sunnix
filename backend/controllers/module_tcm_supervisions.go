package controllers

import (
	"encoding/base64"
	"strconv"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func SupervisionsGetAll(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------

	// if claims["ID"].(float64) > 0 {
	// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
	// 		"message": "Module TCM running",
	// 	})
	// }
	var supervisionsOut []models.SupervisionsOut
	var supervisions_domain []models.SupervisionsDomain
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("`active` = ?", true).Find(&supervisions_domain)
	})
	// Si no se encuentra una entrada en la base de datos, crear una nueva
	if result.(*gorm.DB).RowsAffected >= 0 {
		for _, domain := range supervisions_domain {
			var topics []models.SupervisionsTopics
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("domain = ?", domain.ID).Find(&topics)
			})

			supervisionsOut = append(supervisionsOut, models.SupervisionsOut{
				ID:     domain.ID,
				Order:  domain.Order,
				Domain: domain.Domain,
				Active: domain.Active,
				Topics: topics,
			})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"supervisions": supervisionsOut,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// -- Crear las supervisones de cada tcm, esto lo debe de hacer tcms,qa
// TODO: Crear policity
func SupervisionsUserCreateUpdate(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormNewSupervisions
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	if core.SupervisionsUpdat(int(requestData.NewSupervision.User), requestData.NewSupervision.Date) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Added supervisions",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "error",
	})
}

// TODO: Crear policity
func SupervisionsUserEdit(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	//-------------------
	var requestData models.FormSupervisionsEdit
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	if core.SupervisionsEdit(int(requestData.ID), requestData.Date) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Edited supervision",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "error",
	})
}

// TODO: Crear policity
func SupervisionsGetUser(c *fiber.Ctx) error {
	//-------------------
	// claims, _ := GetClaims(c)
	id := c.Params("id")
	var supervisionsTCM []models.SupervisionsTCMOut

	var supervisions []models.SupervisionsUser
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("`user` = ?", id).Order("id").Find(&supervisions)
	})

	if result.(*gorm.DB).RowsAffected >= 0 {
		for _, sup := range supervisions {
			// Search Topic
			var topic models.SupervisionsTopics
			database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id=?", sup.Topic).First(&topic)
			})
			// Search Domain
			var domain models.SupervisionsDomain
			database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id=?", topic.Domain).First(&domain)
			})

			decryptedSignatureTCM, _ := core.DecryptImage(sup.SignatureTcm)
			decryptedSignatureTCMS, _ := core.DecryptImage(sup.SignatureTcms)

			signatureTCM := ""
			signatureTCMS := ""

			if len(decryptedSignatureTCM) > 0 {
				signatureTCM = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureTCM)
			}
			if len(decryptedSignatureTCMS) > 0 {
				signatureTCMS = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureTCMS)
			}
			idint, _ := strconv.Atoi(id)
			supervisionsTCM = append(supervisionsTCM, models.SupervisionsTCMOut{
				ID:            sup.ID,
				User:          idint,
				DomainID:      int(domain.ID),
				Domain:        domain.Domain,
				TopicID:       int(topic.ID),
				Title:         topic.Title,
				Hour:          topic.Hour,
				Order:         topic.Order,
				Date:          sup.Date,
				DataTcm:       sup.DataTcm,
				SignatureTcm:  signatureTCM,
				DataTcms:      sup.DataTcms,
				SignatureTcms: signatureTCMS,
				Completed:     sup.Completed,
			})
		}

	}
	// Si no se encuentra una entrada en la base de datos, crear una nueva
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"supervisions": supervisionsTCM,
	})
}

// TODO: Crear policity
func SupervisionsComplete(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	var requestData models.FormSupervisionsActivate
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	var supervisions models.SupervisionsUser
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("`id` = ?", requestData.ID).First(&supervisions)
	})

	if result.(*gorm.DB).RowsAffected >= 0 {
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			// var user models.Users
			// db.Where("`id` = ?", claims["ID"]).First(&user)
			tcm, _ := core.GetUserFromLDAP(claims["UID"].(string))
			tcms, _ := core.GetUserFromLDAP(tcm.Supervisor)

			// var tcms models.Users
			// db.Where("`id` = ?", user.Supervisor).First(&tcms)
			supervisions.DataTcm = tcm.Nick
			supervisions.SignatureTcm = tcm.Signature
			supervisions.DataTcms = tcms.Nick
			supervisions.SignatureTcms = tcms.Signature
			supervisions.Completed = true

			db.Save(&supervisions)
			return true
		})
	}
	// Si
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Signed supervision",
	})
}

func SupervisionsPostCreate(c *fiber.Ctx) error {

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
