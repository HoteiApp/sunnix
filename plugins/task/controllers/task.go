package controllers

import (
	"time"

	"github.com/HoteiApp/sunnix/plugins/task/database"
	"github.com/HoteiApp/sunnix/plugins/task/models"
)

func CreateOrUpdateTask(nameOfTask string) {
	// day := time.Hour * 24
	minute := time.Minute
	date := time.Now()
	location, _ := time.LoadLocation("America/Havana")
	// date = date.Add(day)
	executionDate := time.Date(date.Year(), date.Month(), date.Day(), date.Hour(), date.Minute()+1, 0, 0, location)
	var task models.Task
	result := database.DB.Model(&models.Task{}).Where("module = ? and function_name = ?", "sys", nameOfTask).First(&task)
	if result.RowsAffected == 0 {
		database.DB.Create(&models.Task{
			Module:       "sys",
			FunctionName: nameOfTask,
			IsEnabled:    true,
			UserId:       "sys",
			DueDate:      executionDate,
			Periodicity:  minute})
	} else {
		task.DueDate = executionDate
		database.DB.Save(&task)
	}
}
