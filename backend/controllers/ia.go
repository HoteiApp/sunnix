package controllers

import (
	"context"

	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/franciscoescher/goopenai"
	"github.com/gofiber/fiber/v2"
)

func AiTraslate(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	to := data["to"]
	text := data["text"]

	traslate := "Traducir al Espanol:"
	if to == "en" {
		traslate = "translated into English"
	}

	organization := ""
	client := goopenai.NewClient(system.AiApiKey, organization)

	r := goopenai.CreateChatCompletionsRequest{
		Model: "gpt-3.5-turbo",
		Messages: []goopenai.Message{
			{
				Role:    "system",
				Content: traslate + ":" + text,
			},
		},
		Temperature: 0.7,
	}

	completions, err := client.CreateChatCompletions(context.Background(), r)
	if err != nil {
		panic(err)
	}
	result := ""
	for _, v := range completions.Choices {
		result += result + v.Message.Content
	}
	return c.JSON(fiber.Map{
		"message": result,
	})
}

func AiAsk(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	text := data["text"]

	organization := ""
	client := goopenai.NewClient(system.AiApiKey, organization)

	r := goopenai.CreateChatCompletionsRequest{
		Model: "gpt-3.5-turbo",
		Messages: []goopenai.Message{
			{
				Role:    "system",
				Content: text,
			},
		},
		Temperature: 0.7,
	}

	completions, err := client.CreateChatCompletions(context.Background(), r)
	if err != nil {
		panic(err)
	}
	result := ""
	for _, v := range completions.Choices {
		result += result + v.Message.Content
	}

	return c.JSON(fiber.Map{
		"message": result,
	})
}
