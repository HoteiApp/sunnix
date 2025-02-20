package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func GetTCMHome(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------

	if claims["ID"].(float64) > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Module TCM running",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
