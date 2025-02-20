package system

import (
	"os"
)

// const SecurityKey = "3DG4R4GD3JPH4643DG4R4GD3JPH4643J"

var (
	Path, _ = os.Getwd()
	// -- MYSQL

	KeySunissUp = configEnv("sunissUp.Key")
	SecretKey   = configEnv("sunissUp.SecretKey")
	URL_API     = configEnv("sunissUp.api.URL")

	// -- S3

	Log         = make(chan interface{})
	Permissions = []string{"create"}
)
