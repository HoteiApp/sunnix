package main

import (
	"strings"
	"time"

	"github.com/HoteiApp/sunnix/plugins/s3/core"
	"github.com/HoteiApp/sunnix/plugins/s3/system"
)

func GetPermissions() []string {
	return system.Permissions
}

func init() {
	// Iniciar una session para no tener que hacerlo cada vez que se corrar una funcion
	core.CreateSession(true)
}

// -- Crear una session en un bucket. Si utiliza esta funcion debe de importar el las librerias del sdk de AWS
// -- import "github.com/aws/aws-sdk-go/aws/session"
// -- Debe de proporcionar un argumento de tipo bool, en caso de que pase true el plugin guardar la informacion de la session en una variable global.
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","NewSession",[true|false])
// -- Retorna los datos de la session.
func NewSession(arg ...interface{}) interface{} {
	session := core.CreateSession(arg[0].(bool))
	// Retorna objeto *session.Session
	return session
}

// -- Lista los objetos del Bucket
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","ListeFiles")
func ListeFiles(arg ...interface{}) interface{} {
	objects := core.ListeFiles()
	// Retorna objeto []map[string]string
	return objects
}

// -- Lista los objetos del Bucket in Folder
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","ListeFilesInFolder")
func ListeFilesInFolder(arg ...interface{}) interface{} {
	objects := core.ListeFilesInFolder(arg[0].(string))
	// Retorna objeto []map[string]string
	return objects
}

// -- Create Folder
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","CreateFolders", "folderName,folderName1,folderName2")
func CreateFolder(arg ...interface{}) interface{} {
	return core.CreateFolders(strings.Split(arg[0].(string), ","))
}

// -- Eliminar un fichero del Bucket
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","DeleteObjet", "key")
func DeleteObjet(arg ...interface{}) interface{} {
	return core.DeleteObjet(arg[0].(string))

}

// -- Subir un fichero al Bucket
// -- Si en el segundo argumento pasa true el plugin encriptara el fichero
// -- Modo de uso: core.ExtractFunctionsPlugins("s3","UploadFile", "key", [true|false], "pathFile")
func UploadFile(arg ...interface{}) interface{} {
	buffer := system.ReadFile(arg[2].(string))
	return core.UploadFile(arg[0].(string), arg[1].(bool), buffer)
}

// -- Subir un fichero al Bucket
// -- Si en el segundo argumento pasa true el plugin encriptara el fichero
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","UploadFile", "key", [true|false], "pathFile")
func UploadFileInByte(arg ...interface{}) interface{} {
	return core.UploadFile(arg[0].(string), arg[1].(bool), arg[2].([]byte))
}

// -- Subir un fichero al Bucket
// -- Si en el segundo argumento pasa true el plugin desencriptara el fichero automaticamente
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","DownloadFile", "key", [true|false])
func DownloadFile(arg ...interface{}) interface{} {
	return core.DownloadFile(arg[0].(string), arg[1].(bool))
}

// -- Obtener url del objeto
// -- Si en el segundo argumento pasa true el plugin desencriptara el fichero automaticamente
// -- Modo de uso: system.ExtractFunctionsPlugins("s3","PresignedURL", "key", "5m30s")
func PresignedURL(arg ...interface{}) interface{} {
	duration, _ := time.ParseDuration(arg[1].(string))
	return core.GetPresignedURL(arg[0].(string), duration)
}
