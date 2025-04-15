package polities

import (
	"fmt"

	"github.com/HoteiApp/sunnix/backend/controllers"
	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/gofiber/fiber/v2"
)

// LoggedIn --> Check if the user has the active section
func LoggedIn(c *fiber.Ctx) error {
	cookie := c.Cookies(system.KeySunissUp)
	if cookie == "" {
		return c.SendStatus(fiber.StatusForbidden)
	}
	return c.Next()
}

// Captcha --> Check if the valid tocken
func Captcha(c *fiber.Ctx) error {
	fmt.Println(c.IP())
	if system.Version != "local" {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return err
		}
		token := data["token"]
		if token == "" {
			return c.JSON(fiber.Map{
				"OK":      false,
				"message": "You have not sent the CloudFlare token",
			})
		}

		if ok, _ := core.VerifyTurnstileToken(token, c.IP()); !ok {
			c.Status(fiber.StatusConflict)
			return c.JSON(fiber.Map{
				"OK":      false,
				"message": "Incorrect verification with Cloudflare",
			})
		}
	}

	return c.Next()
}

// LoggedNotAccess --> Check if the user has the roles for access
func LoggedNotAccess(c *fiber.Ctx) error {

	claims, err := controllers.GetClaims(c)
	if err != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "error",
		})
	}

	activeUser := controllers.GetUserInfo(claims["UID"].(string))
	// TODO Definir que roles pueden acceder
	if activeUser.User.Roll == "tmp" {
		return c.SendStatus(fiber.StatusForbidden)
	}

	return c.Next()
}
