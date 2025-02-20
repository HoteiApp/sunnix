package controllers

import (
	"fmt"
	"strings"
	"time"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func LogsGetAll(c *fiber.Ctx) error {
	var logs = []models.Logs{}
	paginatedLogs, _ := core.Paginate(database.DB.Model(&models.Logs{}), &logs, c)
	return c.Status(200).JSON(paginatedLogs)
}

func LogsGetMy(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var logs []models.Logs
	query, err := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Model(models.Logs{}).Where("logged_in = ? OR Username = ?", claims["UID"].(string), claims["UID"].(string))
	})
	if err != nil {
		// Manejar el error de conexión a la base de datos
		return err
	}
	pagination, err := core.Paginate(query.(*gorm.DB), &logs, c)
	if err != nil {
		// Manejar el error de paginación
		return err
	}
	// paginatedLogs := models.PaginatedLogs{
	// 	Logs:       logs,
	// 	Pagination: pagination,
	// }
	return c.Status(fiber.StatusOK).JSON(pagination)
}

func LogsGetUser(c *fiber.Ctx) error {
	uid := c.Params("uid")
	var logs []models.Logs
	database.DB.Where("Login = ? OR Uid = ?", uid, uid).Find(&logs)
	return c.Status(200).JSON(logs)
}

func LogsActivityMy(c *fiber.Ctx) error {
	//-------------------
	claims, _ := GetClaims(c)
	//-------------------
	var activity = map[string]int{}
	var logs []models.Logs
	database.DB.Where("Login = ?", claims["UID"].(string)).Find(&logs)

	date := ""
	numActivity := 0
	for k, value := range logs {
		cutDate := strings.Split(value.CreatedAt.String(), " ")
		if cutDate[0] == date {
			numActivity += 1
		} else {
			if date == "" {
				date = cutDate[0]
				numActivity = 1
			} else {
				activity[date] = numActivity
				date = cutDate[0]
				numActivity = 1
			}

		}
		if len(logs) == k+1 {
			activity[date] = numActivity + 1

		}
	}
	return c.JSON(fiber.Map{
		"values": activity,
	})
}

func MyActivityChart(c *fiber.Ctx) error {
	// Obtiene los claims del token JWT almacenado en la cookie de sesión
	claims, _ := GetClaims(c)
	// Define un slice vacío de modelos de actividades

	// Define una subconsulta que cuenta los registros de la tabla "logs" agrupados por fecha y ordenados por cantidad
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var logCounts []models.Activities
		maxCountQuery := fmt.Sprintf(`
			SELECT COUNT(*)
			FROM logs
			WHERE logged_in = '%s'
			GROUP BY DATE(created_at)
			ORDER BY COUNT(*) DESC
			LIMIT 1;
		`, claims["UID"].(string))

		var maxCount int
		db.Model(models.Logs{}).Raw(maxCountQuery).Scan(&maxCount)
		firstQuarter := float64(maxCount) * 0.25
		secondQuarter := float64(maxCount) * 0.5
		thirdQuarter := float64(maxCount) * 0.75

		// Ejecuta una consulta en la tabla "logs" y selecciona la cantidad de registros, la fecha formateada y un nivel calculado
		db.Model(models.Logs{}).
			Where("logged_in = ?", claims["UID"].(string)).
			// Selecciona la cantidad de registros, la fecha formateada y un nivel calculado
			Select(`
				COUNT(*) AS count,
				DATE(created_at) AS date,
				CASE
					WHEN COUNT(*) = 0 THEN 0
					WHEN COUNT(*) > 0 AND COUNT(*) < ? THEN 1
					WHEN COUNT(*) >= ? AND COUNT(*) < ? THEN 2
					WHEN COUNT(*) >= ? AND COUNT(*) < ? THEN 3
					ELSE 4
				END AS level
			`, firstQuarter, firstQuarter, secondQuarter, secondQuarter, thirdQuarter).
			// Agrega una cláusula WHERE para excluir los registros con fecha nula
			Where("DATE(created_at) IS NOT NULL").
			// Agrupa los registros por fecha formateada
			Group("DATE(created_at)").
			// Ejecuta la consulta y almacena los resultados en la variable "logCounts"
			Find(&logCounts)
		// Devuelve una respuesta JSON que contiene los resultados de la consulta
		// Ejemplo de formato de fecha y hora ISO 8601: "2023-12-19T00:00:00-05:00"
		// Supongamos que logCounts es una lista de structs con campos como date, count y level

		// Formatear la fecha antes de devolverla en la respuesta JSON
		for i := range logCounts {
			dateTime, _ := time.Parse(time.RFC3339, logCounts[i].Date) // Suponiendo que Date es un string en formato RFC3339
			formattedDate := dateTime.Format("2006-01-02")             // Formatear la fecha en "yyyy-MM-dd"
			logCounts[i].Date = formattedDate
		}
		return logCounts
	})

	return c.JSON(result.([]models.Activities))

}
