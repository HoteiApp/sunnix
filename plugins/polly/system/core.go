package system

import (
	"log"
	"os"

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
