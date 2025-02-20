package controllers

import (
	"encoding/base64"
	"strconv"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/gofiber/fiber/v2"
)

func Signature(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var data map[string]interface{}
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	plainImage, _ := base64.StdEncoding.DecodeString(strings.Replace(data["signature"].(string), "data:image/png;base64,", "", -1))
	encryptedSign, _ := core.EncryptImage(plainImage)

	result := core.ExtractFunctionsPlugins("ldap", "ModifyAccount", claims["UID"],
		"id-->"+strconv.Itoa(int(claims["ID"].(float64))),
		"signature-->"+encryptedSign,
		"status-->application",
	)

	if result.(bool) {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "HIRING_APPLICATION",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Sended hiring application",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Sended hiring application",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
