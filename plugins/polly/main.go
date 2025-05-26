package main

import (
	"github.com/HoteiApp/sunnix/plugins/polly/core"
	"github.com/HoteiApp/sunnix/plugins/polly/system"
)

func GetPermissions() []string {
	return system.Permissions
}

// -- Genera un fichero de audio a partir de un texto
// -- Modo de uso: system.ExtractFunctionsPlugins("polly","GenerateAudiotoText", "text,voiceId")
// -- Retorna un objeto io.ReadCloser
func GenerateAudiotoText(arg ...interface{}) interface{} {
	objects, _ := core.GenerateMp3toText(arg[0].(string), arg[1].(string))
	return objects
}
