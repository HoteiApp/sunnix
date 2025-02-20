package controllers

import (
	"fmt"
	"log"
	"net/smtp"
)

func GmailSend() {
	// Configurar los datos de autenticación
	email := "user@gmail.com"
	password := "pass"

	// Configurar el servidor SMTP de Gmail
	smtpHost := "smtp.gmail.com"
	smtpPort := 587

	// Configurar los datos del mensaje
	to := "ej@uho.edu.cu"
	subject := "Correo de prueba"
	body := "Este es un correo de prueba enviado desde Go."

	// Construir el cuerpo del mensaje
	message := fmt.Sprintf("To: %s\r\nSubject: %s\r\n\r\n%s\r\n", to, subject, body)

	// Autenticarse en el servidor SMTP
	auth := smtp.PlainAuth("", email, password, smtpHost)

	// Enviar el correo
	err := smtp.SendMail(fmt.Sprintf("%s:%d", smtpHost, smtpPort), auth, email, []string{to}, []byte(message))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Correo enviado exitosamente")
}
