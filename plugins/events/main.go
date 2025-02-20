package main

import (
	"github.com/HoteiApp/sunnix/plugins/events/controllers"
	"github.com/HoteiApp/sunnix/plugins/events/database"
	"github.com/HoteiApp/sunnix/plugins/events/system"
	"github.com/gofiber/fiber/v2"
)

func GetPermissions() []string {
	return system.Permissions
}

// -- Crear un pdf
// -- Modo de uso: system.ExtractFunctionsPlugins("event","GetEvent",id_user, startDate, endDate)
// -- El formato de fecha es mm/dd/yyyy
func GetEvent(arg ...interface{}) interface{} {
	return controllers.GetEvents(arg[0].(string), arg[1].(string), arg[2].(string))
}

func GetRoutes(app *fiber.App) error {
	database.Connect()
	api := app.Group("/api")
	my := api.Group("/my")

	// -- Events
	events := my.Group("/events")
	events.Get("/", controllers.EventsGet).Name("EventsGet")
	events.Put("/", controllers.EventsAdd).Name("EventsAdd")
	events.Post("/", controllers.EventsGetDate).Name("EventsGetDate")
	events.Delete("/", controllers.EventsDelete).Name("EventsDelete")

	return nil
}
