package core

import (
	"fmt"
	"strings"

	"github.com/HoteiApp/sunnix/plugins/pdf/system"
	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
)

type PDFRequest struct {
	HTML string `json:"html"`
}

// CreatePDF genera un PDF a partir del HTML proporcionado y devuelve los bytes del PDF.
// Recibe el contenido HTML como una cadena y el nombre del archivo PDF.
// No guarda el archivo en el sistema de archivos, sino que devuelve los bytes generados.
// TODO: Esto debe de  ir en un plugins
func CreatePDF(htmlContent, pageSize, orientation string) ([]byte, error) {
	// Crear un nuevo generador de PDF
	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		return nil, fmt.Errorf("error al crear el generador de PDF: %w", err)
	}

	// Formatear el HTML con los estilos incluidos
	htmlWithStyles := fmt.Sprintf(`
		<html>
		<head>
			<link rel="stylesheet" href="%s/static/primereact.min.css">
			<link rel="stylesheet" href="%s/static/style1.css">
			<link href="%s/static/tailwin.css" rel="stylesheet">
			<link href="%s/static/CustomCheckbox.css" rel="stylesheet">
			<link href="%s/static/select-button.css" rel="stylesheet">
		</head>
		<body>
			%s
		</body>
		</html>
	`,
		system.URL_API,
		system.URL_API,
		system.URL_API,
		system.URL_API,
		system.URL_API,
		htmlContent)

	// Crear una nueva página a partir del HTML
	page := wkhtmltopdf.NewPageReader(strings.NewReader(htmlWithStyles))
	page.EnableLocalFileAccess.Set(true)
	// Establecer tamaño de página A4
	if pageSize == "" {
		pdfg.PageSize.Set(wkhtmltopdf.PageSizeA4)
	} else {
		pdfg.PageSize.Set(pageSize)
	}
	// Establecer Orientacion
	if orientation == "" || orientation == "vertical" {
		pdfg.Orientation.Set(wkhtmltopdf.OrientationPortrait)
	} else {
		pdfg.Orientation.Set(wkhtmltopdf.OrientationLandscape)
	}

	// Añadir la página al generador de PDF
	pdfg.AddPage(page)

	// Generar el PDF
	if err := pdfg.Create(); err != nil {
		return nil, fmt.Errorf("error al crear el PDF: %w", err)
	}

	// Devolver los bytes del PDF generado
	return pdfg.Bytes(), nil
}
