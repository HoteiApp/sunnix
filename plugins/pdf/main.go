package main

import (
	"fmt"

	"github.com/HoteiApp/sunnix/plugins/pdf/core"
	"github.com/HoteiApp/sunnix/plugins/pdf/system"
)

func GetPermissions() []string {
	return system.Permissions
}

// -- Crear un pdf
// -- Modo de uso: system.ExtractFunctionsPlugins("pdf","CreatePDF",{HTML})
// -- Retorna los datos de la session.
func CreatePDF(arg ...interface{}) interface{} {
	htmlContent := ""
	pageSize := ""
	orientation := ""

	if len(arg) > 0 {
		htmlContent = arg[0].(string)
	}
	if len(arg) > 1 {
		pageSize = arg[1].(string)
	}
	if len(arg) > 2 {
		orientation = arg[2].(string)
	}

	pdfBytes, err := core.CreatePDF(htmlContent, pageSize, orientation)
	if err != nil {
		fmt.Println(err)
	}
	// session := core.CreateSession(arg[0].(bool))
	// Retorna objeto *session.Session
	return pdfBytes
}
