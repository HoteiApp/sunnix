package core

import "github.com/gofiber/fiber/v2"

// Función para manejar los errores y devolver una respuesta JSON con un mensaje de error específico.
func HandleError(c *fiber.Ctx, message string) error {
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": message,
	})
}
