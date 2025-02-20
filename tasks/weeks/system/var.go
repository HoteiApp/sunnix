package system

import (
	b64 "encoding/base64"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	Path, _      = os.Getwd()
	Port         = configEnv("sunissUp.api.Port")
	AllowOrigins = configEnv("sunissUp.api.AllowOrigins")
	// Database type
	DbType = configEnv("sunissUp.db.type")
	// -- SQLITE
	DbSqliteName = configEnv("sunissUp.db.sqlite.name")
	// -- MYSQL
	mysqlPassB64, _  = b64.StdEncoding.DecodeString(configEnv("sunissUp.db.mysql.Password"))
	mysqlPassword    = string(mysqlPassB64)
	mysqlHost        = configEnv("sunissUp.db.mysql.Host")
	mysqlPort        = configEnv("sunissUp.db.mysql.Port")
	mysqlUser        = configEnv("sunissUp.db.mysql.Username")
	mysqlDB          = configEnv("sunissUp.db.mysql.DB")
	MysqlCredentials = mysqlUser + ":" + mysqlPassword + "@tcp(" + mysqlHost + ":" + mysqlPort + ")/" + mysqlDB + "?charset=utf8&parseTime=True&loc=Local"
	Permissions      = []string{"list", "create", "delete", "modify"}
)

func configEnv(data string) string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		os.Exit(1)
	}
	return os.Getenv(data)
}
