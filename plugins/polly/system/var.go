package system

import (
	"os"
)

var (
	Path, _ = os.Getwd()
	// -- S3
	AccessKey = configEnv("sunissUp.polly.ACCESS_KEY")
	SecretKey = configEnv("sunissUp.polly.SECRET_KEY")
	Region    = configEnv("sunissUp.polly.REGION")
	// --
	Log         = make(chan interface{})
	Permissions = []string{"generate"}
)
