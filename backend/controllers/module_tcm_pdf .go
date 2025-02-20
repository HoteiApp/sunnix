package controllers

import (
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/gofiber/fiber/v2"
)

type PDFRequest struct {
	HTML        string `json:"html"`
	PagerSize   string `json:"page_size"`
	Orientation string `json:"orientation"`
}
type PDFRequestUpload struct {
	Name     string `json:"name"`
	Folder   string `json:"folder"`
	HTML     string `json:"html"`
	PageSize string `json:"pageSize"`
	Update   string `json:"update"`
}

type FormData struct {
	File     string `json:"file"`
	FileName string `json:"fileName"`
}

func GeneratePDF(c *fiber.Ctx) error {
	var req PDFRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}
	pdf := core.ExtractFunctionsPlugins("pdf", "CreatePDF", req.HTML, req.PagerSize, req.Orientation)

	c.Set("Content-Type", "application/pdf")
	c.Set("Content-Disposition", "attachment; filename=document.pdf")

	// Enviar el PDF generado como bytes para la descarga
	return c.Send(pdf.([]byte))
}

// extractPages es una función auxiliar que extrae el contenido de los divs con id="page"
func extractPages(html string) []string {
	var pages []string
	for {
		start := strings.Index(html, `<div id="page">`)
		if start == -1 {
			break
		}

		end := strings.Index(html[start:], `</div>`)
		if end == -1 {
			break
		}

		pageContent := html[start+len(`<div id="page">`) : start+end]
		pages = append(pages, pageContent)
		html = html[start+end+len(`</div>`):]
	}
	return pages
}
