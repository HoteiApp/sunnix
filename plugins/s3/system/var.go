package system

import (
	b64 "encoding/base64"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws/session"
)

const SecurityKey = "3DG4R4GD3JPH4643DG4R4GD3JPH4643J"

var (
	Path, _ = os.Getwd()
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

	// -- S3
	S3_USE        = configEnv("sunissUp.s3.USE")
	S3_ENDPOINT   = configEnv("sunissUp.s3.ENDPOINT")
	ACCESS_KEY    = configEnv("sunissUp.s3.ACCESS_KEY")
	SECRET_KEY    = configEnv("sunissUp.s3.SECRET_KEY")
	S3_REGION     = configEnv("sunissUp.s3.S3_REGION")
	S3_BUCKET     = configEnv("sunissUp.s3.S3_BUCKET")
	CHUNK_SIZE, _ = strconv.Atoi(configEnv("sunissUp.s3.CHUNK_SIZE"))
	SESSION       *session.Session
	// --
	Log         = make(chan interface{})
	Permissions = []string{"upload", "download", "delete", "modify"}
)
