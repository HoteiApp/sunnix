package system

import (
	"context"
	b64 "encoding/base64"
	"os"
)

type contextKey string

const (
	ActiveUserKey contextKey = "activeUser"
)

var (
	Path, _      = os.Getwd()
	MODE         = configEnv("mode")
	UrlApi       = configEnv("sunissUp.api.URL")
	Port         = configEnv("sunissUp.api.Port")
	RpcPort      = configEnv("sunissUp.rpc.Port")
	AllowOrigins = configEnv("sunissUp.api.AllowOrigins")
	AgaContext   context.Context
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
	// -- POSGRES
	posgresPassB64, _  = b64.StdEncoding.DecodeString(configEnv("sunissUp.db.postgres.Password"))
	postgresHost       = configEnv("sunissUp.db.postgres.Host")
	postgresPort       = configEnv("sunissUp.db.postgres.Port")
	postgresUser       = configEnv("sunissUp.db.postgres.User")
	postgresDbname     = configEnv("sunissUp.db.postgres.DB")
	postgresSslmode    = configEnv("sunissUp.db.postgres.SSLmode")
	postgresPassword   = string(posgresPassB64)
	PosgresCredentials = "host=" + postgresHost + " port=" + postgresPort + " user=" + postgresUser + " dbname=" + postgresDbname + " password=" + postgresPassword + " sslmode=" + postgresSslmode
	// -- CHANEL
	Log    = make(chan interface{})
	Notify = make(chan interface{})

	KeySunissUp = configEnv("sunissUp.Key")
	SecretKey   = configEnv("sunissUp.SecretKey")
	Language    = configEnv("sunissUp.Language")
	Location    = configEnv("sunissUp.Location")

	// -- AI
	AiApiKey = configEnv("sunissUp.ia.apiKey")
)
