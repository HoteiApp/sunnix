package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

const (
	TelegramBotToken = "1812808528:AAHixtQSqqIHXMpu0A5eWLDASoiQw1pKE24" // Reemplaza con el token de tu bot
	TelegramChatID   = "-4694669794"                                    // Reemplaza con el ID del chat
)

// Función para enviar mensajes a Telegram test
func Webhook(text string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", TelegramBotToken)
	body, _ := json.Marshal(map[string]string{
		"chat_id": TelegramChatID,
		"text":    text,
	})
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("error al enviar mensaje: %s", resp.Status)
	}
	return nil
}
