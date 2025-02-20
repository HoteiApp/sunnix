package system

import (
	"log"
	"os"
	"time"

	"github.com/araddon/dateparse"
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

// HowManyDaysAgo --------------------------------------------------------------------------------------
// -- I work with dates
func HowManyDaysAgo(date string) (string, int) {
	loc, _ := time.LoadLocation("America/Havana")
	time.Local = loc
	parse, _ := dateparse.ParseLocal(date)
	days := int(time.Now().Sub(parse).Hours()) / 24
	if days >= 90 {
		return "Expirado", days
	}
	return "Valido", days
}
