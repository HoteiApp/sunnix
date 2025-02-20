package controllers

import (
	"github.com/HoteiApp/sunnix/plugins/events/database"
	"github.com/HoteiApp/sunnix/plugins/events/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetEvents(id, start, end string) []models.Event {
	var event []models.Event
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.
			Where("user = ? AND STR_TO_DATE(date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')", id, start, end).
			Order("STR_TO_DATE(date, '%m/%d/%Y')").
			Find(&event)
	})
	return event
}

func EventsGet(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var event []models.Event
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("user = ?", claims["ID"].(float64)).Order("date").Find(&event)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"all_event": event,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func EventsGetDate(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	date := data["date"]
	//-------------------
	var events []models.Event
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("uid = ? and date = ?", claims["ID"].(float64), date).Find(&events)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"all_events": events,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// New Request Client
func EventsAdd(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FromAddEvent
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var event models.Event

		event.User = requestData.Eventadd.User
		event.Date = requestData.Eventadd.Date
		event.Title = requestData.Eventadd.Title
		event.Description = requestData.Eventadd.Description

		return db.Save(&event)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "ADD_NEW_EVENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      0,
		// 	Description: "Event saved correctly",
		// }
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Event saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// New Request Client
func EventsDelete(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var data map[string]interface{}
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var event models.Event
		r := db.Where("id = ?", data["id"].(float64)).Delete(&event)

		return r
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "ADD_NEW_EVENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      0,
		// 	Description: "Event deleted",
		// }
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Event deleted",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
