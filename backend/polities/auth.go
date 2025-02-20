package polities

import (
	"github.com/HoteiApp/sunnix/backend/controllers"
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
