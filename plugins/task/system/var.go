package system

import (
	b64 "encoding/base64"
	"os"
	"time"
)

var (
	Path, _ = os.Getwd()
	MODE    = configEnv("mode")
	// -- MYSQL
	mysqlPassB64, _  = b64.StdEncoding.DecodeString(configEnv("sunissUp.db.mysql.Password"))
	mysqlPassword    = string(mysqlPassB64)
	mysqlHost        = configEnv("sunissUp.db.mysql.Host")
	mysqlPort        = configEnv("sunissUp.db.mysql.Port")
	mysqlUser        = configEnv("sunissUp.db.mysql.Username")
	mysqlDB          = configEnv("sunissUp.db.mysql.DB")
	MysqlCredentials = mysqlUser + ":" + mysqlPassword + "@tcp(" + mysqlHost + ":" + mysqlPort + ")/" + mysqlDB + "?charset=utf8&parseTime=True&loc=Local"

	KeySunissUp = configEnv("sunissUp.Key")
	SecretKey   = configEnv("sunissUp.SecretKey")
	Location, _ = time.LoadLocation(configEnv("sunissUp.Location"))

	Log         = make(chan interface{})
	Permissions = []string{"list", "create", "delete", "modify"}
)
