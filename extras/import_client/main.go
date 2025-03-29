package main

import (
	"fmt"
	"log"
	"regexp"

	"github.com/xuri/excelize/v2"
)

func main() {
	// Abrir el archivo Excel
	excelFile, err := excelize.OpenFile("database.xlsx")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := excelFile.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	// Obtener todas las hojas del archivo
	sheets := excelFile.GetSheetList()
	if len(sheets) == 0 {
		log.Fatal("El archivo Excel no contiene hojas")
	}

	// Usaremos la primera hoja (puedes cambiarlo según necesites)
	sheetName := sheets[0]
	fmt.Printf("Leyendo datos de la hoja: %s\n", sheetName)

	// Obtener todas las filas de la hoja
	rows, err := excelFile.GetRows(sheetName)
	if err != nil {
		log.Fatal(err)
	}

	if len(rows) == 0 {
		log.Fatal("La hoja de Excel está vacía")
	}

	// Mostrar encabezados (primera fila)
	headers := rows[0]
	fmt.Println("\nEncabezados:")
	for i, header := range headers {
		fmt.Printf("Columna %d: %s\n", i+1, header)
	}

	// Compilar la expresión regular fuera del bucle
	regex, err := regexp.Compile(`^\d+-[1-5]$`)
	if err != nil {
		log.Fatal(err)
	}

	// Procesar y mostrar las filas de datos
	fmt.Println("\nDatos:")
	for rowIdx, row := range rows {
		if rowIdx == 0 {
			continue // Saltar la fila de encabezado si lo deseas
		}

		// fmt.Printf("\nFila %d:\n", rowIdx+1)
		for colIdx, colCell := range row {
			// Mostrar solo columnas que tienen encabezado (para evitar índices fuera de rango)
			if colIdx < len(headers) {
				if colIdx == 2 {
					if regex.MatchString(colCell) {
						// fmt.Printf("  %s contiene un número seguido de un '-' y otro número del 1 al 5\n", headers[colIdx])
						fmt.Printf("  %s: %s\n", headers[colIdx], colCell)
					}
				}
			} // else {
			// 	fmt.Printf("  Columna %d: %s\n", colIdx+1, colCell)
			// }
		}
	}

	fmt.Printf("\nTotal de filas procesadas: %d\n", len(rows)-1) // Restamos 1 por los encabezados
}
