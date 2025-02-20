package core

import (
	"fmt"
	"reflect"
	"time"

	"github.com/HoteiApp/sunnix/plugins/task/database"
	"github.com/HoteiApp/sunnix/plugins/task/models"
	"github.com/HoteiApp/sunnix/plugins/task/system"
	"github.com/robfig/cron/v3"
)

func TaskHello() error {
	// fmt.Println("Tasks is running")
	return nil
}

var Functions = map[string]interface{}{
	"taskHello": TaskHello,
}

func ParseArgs(args ...interface{}) (string, string, bool, time.Time, time.Duration) {
	// ---
	module := GetArg(args, 0, "sys").(string)
	nameOfTask := GetArg(args, 1, "taskHello").(string)
	enabled := GetArg(args, 2, true).(bool)
	// ----
	date := time.Now().In(system.Location)
	duration, _ := ParseDurationString(GetArg(args, 3, "1m").(string))
	executionDate := date.Add(duration)

	// FIXME: Esta era para cuando se hacia el calculo de la fecha en otro plugins
	// executionDate := GetArg(args, 3, time.Date(date.Year(), date.Month(), date.Day(), date.Hour(), date.Minute()+1, 0, 0, location)).(time.Time)
	// ----
	periodicity, _ := ParseDurationString(GetArg(args, 4, "1m").(string))
	return module, nameOfTask, enabled, executionDate, periodicity
}

func GetArg(args []interface{}, index int, defaultValue interface{}) interface{} {
	if len(args) > index && args[index] != defaultValue {
		return args[index]
	}
	return defaultValue
}

func FindTask(module, nameOfTask string) *models.Task {
	var task models.Task
	result := database.DB.Model(&models.Task{}).Where("module = ? and function_name = ?", module, nameOfTask).First(&task)
	if result.RowsAffected == 0 {
		return nil
	}
	return &task
}

func CreateTask(module, nameOfTask string, enabled bool, executionDate time.Time, periodicity time.Duration) {
	database.DB.Create(&models.Task{
		Module:       module,
		FunctionName: nameOfTask,
		IsEnabled:    enabled,
		UserId:       "sys",
		DueDate:      executionDate,
		Periodicity:  periodicity,
	})
}

func UpdateTask(task *models.Task, enabled bool, executionDate time.Time, periodicity time.Duration) {
	task.IsEnabled = enabled
	task.DueDate = executionDate
	task.Periodicity = periodicity
	database.DB.Save(task)
}

// ----
func ExecuteTask(task models.Task) {
	var runningError error = nil
	task.Status = models.StatusRunning
	task.Error = ""
	database.DB.Save(&task)
	if task.Module == "sys" {
		// Call the scheduled function using reflection
		if fn, ok := Functions[task.FunctionName]; ok {
			result := reflect.ValueOf(fn).Call([]reflect.Value{})
			if err, ok := result[len(result)-1].Interface().(error); ok {
				runningError = err
			}
		}
	} else {
		result := ExtractFunctionsPlugins(task.Module, task.FunctionName)
		if err, ok := result.(error); ok {
			runningError = err
		}
	}

	if task.Periodicity == 0 {
		task.IsEnabled = false
	} else {
		date := time.Now().In(system.Location)
		task.DueDate = date.Add(task.Periodicity)
	}

	if runningError != nil {
		task.Error = runningError.Error()
		task.Status = models.StatusError
	} else {
		task.Status = models.StatusSuccess
		task.Error = ""
	}
	database.DB.Save(task)
}

func CreateCronJob() {
	c := cron.New()

	_, err := c.AddFunc("* * * * *", func() {
		var tasks []models.Task
		now := time.Now()
		database.DB.Where("due_date <= ? AND is_enabled = ?", now, true).Find(&tasks)
		for _, task := range tasks {
			if system.MODE == "debug" {
				fmt.Println(task.FunctionName, "is running")
			}
			// TODO: Aqui ahi que buscar el modo de hacer una cola en caso de que sean muchas tareas la que tienen que ejecutarse
			go ExecuteTask(task)
		}
	})
	if err != nil {
		panic(err)
	}

	go func() {
		c.Start()
	}()
}
