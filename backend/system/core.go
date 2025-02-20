package system

import (
	"crypto/md5"
	"encoding/base64"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

func configEnv(data string) string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		os.Exit(1)
	}
	return os.Getenv(data)
}

// -- CurrentTime devuelve la hora actual en la zona horaria America/Havana formateada como una cadena.
func CurrentDate() string {
	// Carga la ubicación de la zona horaria "America/Havana"
	loc, _ := time.LoadLocation("America/Havana")

	// Establece la zona horaria local en "America/Havana"
	time.Local = loc

	// Crea un objeto de tiempo con la fecha y hora actual en la zona horaria "America/Havana".
	theTime := time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), time.Now().Hour(), time.Now().Minute(), time.Now().Second(), time.Now().Nanosecond(), loc)

	// Formatea la fecha y la hora como una cadena en el formato "2006-01-02 03:04:05 pm"
	date := theTime.Format("01/02/2006")

	// Retorna la fecha y la hora formateadas como una cadena.
	return date
}

// GetMD5Hash
// -- Generate md5 with ldap format
func GetMD5Hash(str string) string {
	md5Ctx := md5.New()
	md5Ctx.Write([]byte(str))
	cipherStr := md5Ctx.Sum(nil)
	return "{MD5}" + base64.StdEncoding.EncodeToString(cipherStr)
}

func FindFiles(root, ext string) []string {
	var a []string
	_ = filepath.WalkDir(root, func(s string, d fs.DirEntry, e error) error {
		if e != nil {
			return e
		}
		if filepath.Ext(d.Name()) == ext {
			a = append(a, s)
		}
		return nil
	})
	return a
}

// Función que convierte un string en un valor booleano
func StringToBool(value string) bool {
	boolValue, err := strconv.ParseBool(value)
	if err != nil {
		// En caso de error, puedes devolver un valor por defecto, por ejemplo false
		return false
	}
	return boolValue
}
