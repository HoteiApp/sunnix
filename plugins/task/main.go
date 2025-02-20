package main

import (
	"github.com/HoteiApp/sunnix/plugins/task/core"
	"github.com/HoteiApp/sunnix/plugins/task/database"
	"github.com/HoteiApp/sunnix/plugins/task/system"
)

func init() {
	database.Connect()
}

func GetPermissions() []string {
	return system.Permissions
}

// -- Main
func Task(arg ...interface{}) interface{} {
	if arg[0].(string) == "debug" {
		Register("sys", "taskHello", true, "1m", "1m")
	} else {
		task := core.FindTask("sys", "taskHello")
		if task != nil {
			core.UpdateTask(task, false, task.DueDate, task.Periodicity)
		}
	}
	core.CreateCronJob()
	// Mantener el programa en ejecución
	done := make(chan struct{})
	<-done

	return true
}

// -- Register Task
// (module, nameOfTask, enabled, executionDate, Periodicity)
func Register(args ...interface{}) interface{} {
	module, nameOfTask, enabled, executionDate, periodicity := core.ParseArgs(args...)
	task := core.FindTask(module, nameOfTask)
	if task == nil {
		core.CreateTask(module, nameOfTask, enabled, executionDate, periodicity)
	} else {
		core.UpdateTask(task, enabled, executionDate, periodicity)
	}
	return true
}
