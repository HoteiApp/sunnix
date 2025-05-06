package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"

	"github.com/HoteiApp/sunnix/backend/system"
)

// const (
// 	TelegramBotToken = "7938874108:AAGwhfjN5h-AC9KHb0Am2JteDD1Mz67aBUQ" // Sunnix Bot Token
// 	// TelegramBotToken = "1812808528:AAHixtQSqqIHXMpu0A5eWLDASoiQw1pKE24" // Reemplaza con el token de tu bot
// 	TelegramChatID = "-1002318517831" // Reemplaza con el ID del chat
// )

// Función para enviar mensajes a Telegram
func Webhook(text string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", system.TelegramBotToken)
	body, _ := json.Marshal(map[string]string{
		"chat_id": system.TelegramGroupID,
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

func WebhookAudio(file io.Reader, fileName string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendAudio", system.TelegramBotToken)

	// Crear buffer para el cuerpo de la petición
	var body bytes.Buffer
	writer := multipart.NewWriter(&body)

	// Parte de chat_id
	_ = writer.WriteField("chat_id", system.TelegramGroupID)

	// Parte del archivo de audio
	part, err := writer.CreateFormFile("audio", fileName)
	if err != nil {
		return fmt.Errorf("error creando parte de archivo: %v", err)
	}
	_, err = io.Copy(part, file)
	if err != nil {
		return fmt.Errorf("error copiando el archivo al formulario: %v", err)
	}

	// Cerrar el writer para que se genere el boundary correctamente
	err = writer.Close()
	if err != nil {
		return fmt.Errorf("error cerrando writer: %v", err)
	}

	// Enviar la solicitud
	req, err := http.NewRequest("POST", url, &body)
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respText, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("error al enviar audio: %s - %s", resp.Status, string(respText))
	}

	return nil
}
