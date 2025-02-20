package core

import (
	"fmt"
	"os"
	"plugin"

	"github.com/HoteiApp/sunnix/plugins/task/system"
)

func ExtractFunctionsPlugins(pluginName, function string, args ...interface{}) interface{} {
	if _, err := os.Stat(system.Path + "/plugins/tasks/" + pluginName + ".task"); os.IsNotExist(err) {
		fmt.Println("Plugins " + pluginName + ".task not found")
		return nil
	} else {
		plug, err := plugin.Open(system.Path + "/plugins/tasks/" + pluginName + ".task")
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
