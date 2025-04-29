package main

import "github.com/HoteiApp/sunnix/plugins/polly/core"

// -- Genera un fichero de audio a partir de un texto
// -- Modo de uso: system.ExtractFunctionsPlugins("polly","GenerateText", "text,voiceId")
// -- Retorna un objeto io.ReadCloser
func GenerateText(arg ...interface{}) interface{} {
	objects := core.GenerateMp3toText(arg[0].(string), arg[1].(string))
	// Retorna objeto []map[string]string
	return objects
}
