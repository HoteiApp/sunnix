package main

import (
	"github.com/HoteiApp/sunnix/plugins/chat/controllers"
	"github.com/HoteiApp/sunnix/plugins/chat/database"
	"github.com/HoteiApp/sunnix/plugins/chat/system"
	"github.com/gofiber/fiber/v2"
)

func GetPermissions() []string {
	return system.Permissions
}

func GetRoutes(app *fiber.App) error {
	database.Connect()
	api := app.Group("/api")
	// -- Chat
	chat := api.Group("chat")
	chat.Get("/", controllers.ChatConversations).Name("ChatConversations")
	chat.Get("/:user", controllers.ChatMessages).Name("ChatMessages")
	chat.Get("/sms/:conversation", controllers.ChatMsgConversations).Name("ChatMsgConversations")

	return nil
}
