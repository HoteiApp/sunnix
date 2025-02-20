package controllers

import (
	"encoding/base64"
	"encoding/json"
	"strconv"
	"time"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Diary(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	date := data["date"]
	//-------------------
	// Parsear la fecha proporcionada en formato "mm/dd/yyyy"
	parsedDate, _ := time.Parse("01/02/2006", date)
	// Calcular el rango de fechas
	startDate := parsedDate.AddDate(0, -1, 0) // Un mes antes
	endDate := parsedDate.AddDate(0, 1, 20)   // Un mes y 20 dias después
	// Formatear las fechas a mm/dd/yyyy
	formattedStartDate := startDate.Format("01/02/2006")
	formattedEndDate := endDate.Format("01/02/2006")
	// ------------------
	// obtener notas de un mes antes y uno despues de la fecha que se envie
	var notes []models.Notes
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ? AND STR_TO_DATE(date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')", claims["ID"].(float64), formattedStartDate, formattedEndDate).
			Order("STR_TO_DATE(date, '%m/%d/%Y')").
			Find(&notes)
	})

	// ------------------
	// obtener notas de un mes antes y uno despues de la fecha que se envie
	var supervisionsTCM []models.SupervisionsTCMOut

	var supervisions []models.SupervisionsUser
	resultSupervision, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("`user` = ? AND STR_TO_DATE(date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')", claims["ID"].(float64), formattedStartDate, formattedEndDate).
			Order("STR_TO_DATE(date, '%m/%d/%Y')").
			Find(&supervisions)
	})

	if resultSupervision.(*gorm.DB).RowsAffected >= 0 {
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
			supervisionsTCM = append(supervisionsTCM, models.SupervisionsTCMOut{
				ID:            sup.ID,
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
	// ------------------
	resultEvents := core.ExtractFunctionsPluginsDinamic("events", "GetEvent", strconv.FormatFloat(claims["ID"].(float64), 'f', -1, 64), formattedStartDate, formattedEndDate)
	bytes, _ := json.Marshal(&resultEvents)
	var events []models.Event
	_ = json.Unmarshal(bytes, &events)

	// ------------------
	var fortnights []models.Fortnight

	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where(`
			(STR_TO_DATE(pay_date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')) 
		`, formattedStartDate, formattedEndDate).
			Order("STR_TO_DATE(pay_date, '%m/%d/%Y')").
			Find(&fortnights)
	})

	// ------------------
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"notes":        notes,
		"supervisions": supervisionsTCM,
		"events":       events,
		"payments":     fortnights,
	})

}
