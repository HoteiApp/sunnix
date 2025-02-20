package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
)

func VoiceGet(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	// Obtener archivo de audio
	var req models.S3VoicesURL
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}
	path := "voices/" + req.Module + "/" + req.Component + "/" + req.Id_component + "/"
	objectsUrl := core.ExtractFunctionsPlugins("s3", "ListeFilesInFolder", path)

	var extractIdentities []models.ExtractIdentities

	for _, voice := range objectsUrl.([]map[string]string) {
		key := voice["Key"]
		url := voice["URL"]

		cutKey := strings.Split(key, "_")
		// Extract from in LDAP
		from := cutKey[2]
		if fmt.Sprintf("%.0f", claims["ID"].(float64)) == from {
			from = "You"
		} else {
			resultSearchFrom := core.ExtractFunctionsPlugins("ldap", "Search", "(&(id="+from+"))")
			bytesFrom, _ := json.Marshal(&resultSearchFrom)
			var resultSearch ldap.SearchResult
			_ = json.Unmarshal(bytesFrom, &resultSearch)

			if len(resultSearch.Entries) > 0 {
				userLdap := resultSearch.Entries[0]
				from = userLdap.GetAttributeValue("givenName")
			}
		}

		// Extract To in LDAP
		to := cutKey[3]
		if fmt.Sprintf("%.0f", claims["ID"].(float64)) == to {
			to = "You"
		} else {
			resultSearchTo := core.ExtractFunctionsPlugins("ldap", "Search", "(&(id="+to+"))")
			bytesTo, _ := json.Marshal(&resultSearchTo)
			var resultTo ldap.SearchResult
			_ = json.Unmarshal(bytesTo, &resultTo)

			if len(resultTo.Entries) > 0 {
				userLdapTo := resultTo.Entries[0]
				to = userLdapTo.GetAttributeValue("givenName")
			}
		}
		// Puedes almacenar el key y url en un nuevo slice si deseas procesarlo
		extractIdentities = append(extractIdentities, models.ExtractIdentities{
			From: from,
			To:   to,
			Key:  key,
			URL:  url,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"urls": extractIdentities})
}

func VoicePost(c *fiber.Ctx) error {
	// Obtener archivo de audio
	file, err := c.FormFile("audio")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error al recibir el archivo de audio",
			"error":   err.Error(),
		})
	}

	// Obtener otros datos del formulario
	mode := c.FormValue("mode")
	from := c.FormValue("from")
	to := c.FormValue("to")
	messageNumber := c.FormValue("message_number")
	module := c.FormValue("module")
	component := c.FormValue("component")
	idComponent := c.FormValue("id_component")

	// Crear el nombre del archivo basado en component e id_component
	fileName := fmt.Sprintf("%s_%s_%s_%s.wav", mode, messageNumber, from, to)
	filePath := fmt.Sprintf("/voices/%s/%s/%s/%s", module, component, idComponent, fileName)

	// Leer el archivo en un buffer
	fileContent, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al leer el archivo de audio",
			"error":   err.Error(),
		})
	}
	defer fileContent.Close()

	buffer, err := io.ReadAll(fileContent)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al leer el contenido del archivo de audio",
			"error":   err.Error(),
		})
	}

	// Llamar a la función UploadFile con el buffer
	result := core.ExtractFunctionsPlugins("s3", "UploadFileInByte", filePath, false, buffer)
	if result == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al subir el archivo a S3",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "Archivo recibido y subido correctamente",
		"file":         filePath,
		"component":    component,
		"id_component": idComponent,
	})
}

func VoiceDelete(c *fiber.Ctx) error {
	// Obtener archivo de audio
	var obj models.S3DeleteObj
	if err := c.BodyParser(&obj); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	result := core.ExtractFunctionsPlugins("s3", "DeleteObjet", obj.Key)

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Object deleted"})
	}
	// Devuelve la lista de objetos como JSON
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Failed to delete object"})
}
