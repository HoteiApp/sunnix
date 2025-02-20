package controllers

import (
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	htgotts "github.com/hegedustibor/htgo-tts"
	handlers "github.com/hegedustibor/htgo-tts/handlers"
	voices "github.com/hegedustibor/htgo-tts/voices"
)

func TextToSpeech(text string, lang string) ([]byte, error) {
	// Determinar el idioma
	var language string
	switch lang {
	case "es-ES":
		language = voices.Spanish
	case "en-EN":
		language = voices.English
	default:
		language = voices.English // idioma por defecto
	}

	// Crear directorio temporal
	tempDir, _ := os.MkdirTemp("", "speech_*")
	defer os.RemoveAll(tempDir) // Limpia el directorio al terminar

	speech := htgotts.Speech{
		Folder:   tempDir, // Usar directorio temporal
		Language: language,
		Handler:  &handlers.MPlayer{},
	}

	fileName := "temp_speech"

	// Crear el archivo de audio
	speech.CreateSpeechFile(text, fileName)

	// Actualizar la ruta para leer el archivo
	audioContent, _ := os.ReadFile(filepath.Join(tempDir, fileName+".mp3"))

	return audioContent, nil
}

// HandleTextToSpeech convierte texto a voz
func HandleTextToSpeech(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	text := data["text"]
	lang := data["lang"]

	if text == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "El texto no puede estar vacío",
		})
	}

	audioContent, err := TextToSpeech(text, lang)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	c.Set("Content-Type", "audio/mpeg")
	return c.Send(audioContent)
}
