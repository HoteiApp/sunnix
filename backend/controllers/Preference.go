package controllers

import (
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func TablePreferencePost(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	userId := claims["UID"].(string)

	var body struct {
		TableKey string `json:"tableKey"`
		Filters  string `json:"filters"`
		Columns  string `json:"columns"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid body"})
	}
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		var pref models.TablePreference
		if err := db.Where("user_id = ? AND table_key = ?", userId, body.TableKey).First(&pref).Error; err != nil {
			// Crear nuevo
			pref = models.TablePreference{
				UserID:   userId,
				TableKey: body.TableKey,
				Filters:  body.Filters,
				Columns:  body.Columns,
			}
			db.Create(&pref)
		} else {
			// Actualizar existente
			pref.Filters = body.Filters
			pref.Columns = body.Columns
			db.Save(&pref)
		}
		return pref
	})
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"msg": "ok"})
}
