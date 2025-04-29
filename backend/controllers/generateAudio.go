package controllers

import (
	"io"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/gofiber/fiber/v2"
)

// HandleTextToSpeech convierte texto a voz
func GenerateAudiotoText(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	text := data["text"]
	voiceId := data["voiceId"]

	if text == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "El texto no puede estar vacío",
		})
	}
	if voiceId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "El voiceId no puede estar vacío",
		})
	}

	audioStream := core.ExtractFunctionsPlugins("polly", "GenerateAudiotoText", text, voiceId)
	if audioStream == nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error generando audio")
	}

	_ = WebhookAudio(audioStream.(io.ReadCloser), "audio.mp3")

	c.Set("Content-Type", "audio/mpeg")
	return c.SendStream(audioStream.(io.ReadCloser))
}
