package core

import (
	"fmt"
	"os"
	"plugin"

	"github.com/HoteiApp/sunnix/plugins/events/system"
)

func ExtractFunctionsPlugins(pluginName, function string, args ...interface{}) interface{} {
	if _, err := os.Stat(system.Path + "/plugins/" + pluginName + ".plugin"); os.IsNotExist(err) {
		fmt.Println("Plugins " + pluginName + ".plugins not found")
		return nil
	} else {
		plug, err := plugin.Open(system.Path + "/plugins/" + pluginName + ".plugin")
		if err != nil {
			fmt.Println(err)
		}
		GetFunctions, err := plug.Lookup(function)
		if err != nil {
			fmt.Println(err)
		}
		return GetFunctions.(func(arg ...interface{}) interface{ any })(args...)
	}
}
