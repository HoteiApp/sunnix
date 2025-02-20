package system

import (
	"crypto/md5"
	b64 "encoding/base64"
	"fmt"         // Importa el paquete de formateo de cadenas
	_ "image/png" // Importa la biblioteca de imágenes PNG
	"os"          // Importa el paquete de sistema operativo
	"time"

	"github.com/joho/godotenv" // Importa la biblioteca para cargar variables de entorno
)

// -- Función para obtener variables de entorno
func configEnv(data string) string {
	// Carga las variables de entorno desde un archivo .env
	if err := godotenv.Load(); err != nil {
		// Si hay un error al cargar las variables de entorno, registra el error y cierra la aplicacion
		fmt.Println("Error loading .env file")
		os.Exit(1)
	}
	// Retorna el valor de la variable de entorno especificada
	return os.Getenv(data)
}

// -- CurrentTime devuelve la hora actual en la zona horaria America/Havana formateada como una cadena.
func CurrentTime() string {
	// Carga la ubicación de la zona horaria "America/Havana"
	loc, _ := time.LoadLocation("America/Havana")

	// Establece la zona horaria local en "America/Havana"
	time.Local = loc

	// Crea un objeto de tiempo con la fecha y hora actual en la zona horaria "America/Havana".
	theTime := time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), time.Now().Hour(), time.Now().Minute(), time.Now().Second(), time.Now().Nanosecond(), loc)

	// Formatea la fecha y la hora como una cadena en el formato "2006-01-02 03:04:05 pm"
	date := theTime.Format("2006-01-02 03:04:05 pm")

	// Retorna la fecha y la hora formateadas como una cadena.
	return date
}

// -- MD5Hash devuelve el hash MD5 de una cadena como una cadena con un prefijo "{MD5}".
func MD5Hash(str string) string {
	// Crea un nuevo contexto MD5
	md5Ctx := md5.New()

	// Escribe la cadena en el contexto MD5
	md5Ctx.Write([]byte(str))

	// Calcula el hash MD5 de la cadena
	cipherStr := md5Ctx.Sum(nil)

	// Codifica el hash MD5 en una cadena Base64 y agrega un prefijo "{MD5}".
	return "{MD5}" + b64.StdEncoding.EncodeToString(cipherStr)
}
