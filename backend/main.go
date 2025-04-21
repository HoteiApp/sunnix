package main

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/routes"
	"github.com/HoteiApp/sunnix/backend/system"
	"gorm.io/gorm"
)

func init() {
	// Connect to the database..
	database.InitDB()
	database.InitialsValues()
	// -- Start scheduled tasks
	// -- Generate Weeks
	go core.ExtractFunctionsPlugins("task", "Register", "weeks", "CalculateWeeksAndFortnights", true, "1m", "0")
	// -- Check the week that should be active (It runs one minute after starting and then every 1 hour)
	go core.ExtractFunctionsPlugins("task", "Register", "weeks", "ActiveWeek", true, "1m", "1h")
	// Initialize RPC Server
	// go rpc.RpcServer()
	// Initialize channel listening
	go core.InitializeChannelListening()
	// Watcher the plugins and modules folder
	go core.WatcherModulesPlugins()
	// -- Initialize scheduled tasks
	go core.ExtractFunctionsPlugins("task", "Task", system.MODE)
	// -- Initializar plugins static
	pluginsList := system.FindFiles(system.Path+"/plugins", ".plugin")
	if len(pluginsList) > 0 {
		for _, pluginPath := range pluginsList {
			if strings.Contains(pluginPath, "plugin") {
				pluginName := strings.Split(filepath.Base(pluginPath), ".")[0]
				var pluginConfig models.StaticPluginConfig
				_, _ = core.LoadPluginAndCreatePermission(pluginPath)
				result, _ := database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("name = ?", pluginName).First(&pluginConfig)
				})
				if result.(*gorm.DB).RowsAffected == 0 {
					_, _ = database.WithDB(func(db *gorm.DB) interface{} {
						return db.Create(&models.StaticPluginConfig{Name: pluginName, Active: false})
					})
					system.Log <- models.Logs{
						App:         "MAIN",
						Action:      "PLUGIN_ADD",
						LoggedIn:    "sys",
						Username:    "sys",
						Description: "The system detected a new plugins " + pluginName + ", the plugin is disabled.",
					}
				}
			}
		}
	}
}

func main() {
	// Import Clients
	if system.ImportClients == "yes" {
		core.XlsxImportClients()
		core.XlsxImportAdmission()
	}
	// Create a new Fiber application for the first server
	app := fiber.New(fiber.Config{
		AppName:           "API-Zentinelle v1.0.0",
		CaseSensitive:     false,
		EnablePrintRoutes: false,
	})

	// Add CORS middleware for the first server
	app.Use(cors.New(cors.Config{
		AllowOrigins:     system.AllowOrigins,
		AllowCredentials: true,
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodPut,
			fiber.MethodDelete,
		}, ","),
	}))
	app.Static("/static", "./static")
	// Add routes for the first server
	routes.Routes(app)
	routes.ModuleTCMRoutes(app)
	// Discover and load plugins with url
	//--------------------------------------------------------------------
	pluginsUrlList := system.FindFiles(system.Path+"/plugins", ".dinamic")
	if len(pluginsUrlList) > 0 {
		for _, pluginPath := range pluginsUrlList {
			if strings.Contains(pluginPath, "dinamic") {
				pluginName := filepath.Base(pluginPath)
				var pluginConfig models.PluginConfig
				loadedPlugin, loadedPluginError := core.LoadPluginAndCreatePermission(pluginPath)
				result, _ := database.WithDB(func(db *gorm.DB) interface{} {
					return db.Where("name = ?", pluginName).First(&pluginConfig)
				})
				if result.(*gorm.DB).RowsAffected == 0 {
					_, _ = database.WithDB(func(db *gorm.DB) interface{} {
						return db.Create(&models.PluginConfig{Name: pluginName, Active: false})
					})
					system.Log <- models.Logs{
						App:         "MAIN",
						Action:      "PLUGIN_ADD",
						LoggedIn:    "sys",
						Username:    "sys",
						Description: "The system detected a new plugins_dinamic " + pluginName + ", the plugin is disabled.",
					}
				} else if pluginConfig.Active {
					if loadedPluginError == nil {
						GetRoutes, err := loadedPlugin.Lookup("GetRoutes")
						if err != nil {
							system.Log <- models.Logs{
								App:         "MAIN",
								Action:      "PLUGIN_ADD_ERROR",
								LoggedIn:    "sys",
								Username:    "sys",
								Description: "Error loading plugins_dinamic " + pluginName + " , " + err.Error(),
							}
							fmt.Println("Error loading plugin: ", err)
						}
						_ = GetRoutes.(func(app *fiber.App) error)(app)
					}
				}
			}
		}
	}
	// Discover and load modules
	//--------------------------------------------------------------------
	// modulesList := system.FindFiles(system.Path+"/modules", ".module")
	// if len(modulesList) > 0 {
	// 	for _, modulesPath := range modulesList {
	// 		moduleName := filepath.Base(modulesPath)
	// 		var moduleConfig models.ModuleConfig
	// 		result, _ := database.WithDB(func(db *gorm.DB) interface{} {
	// 			return db.Where("name = ?", moduleName).First(&moduleConfig)
	// 		})
	// 		loadedModule, loadedModuleError := core.LoadPluginAndCreatePermission(modulesPath)
	// 		if result.(*gorm.DB).RowsAffected == 0 {
	// 			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 				return db.Create(&models.ModuleConfig{Name: moduleName, Active: false})
	// 			})
	// 			system.Log <- models.Logs{
	// 				App:         "AGA",
	// 				Action:      "MODULE_ADD",
	// 				LoggedIn:    "sys",
	// 				Username:    "sys",
	// 				Description: "The system detected a new module " + moduleName + ", the module is disabled.",
	// 			}
	// 		} else if moduleConfig.Active {
	// 			if loadedModuleError == nil {
	// 				GetRoutes, err := loadedModule.Lookup("GetRoutes")
	// 				if err != nil {
	// 					system.Log <- models.Logs{
	// 						App:         "AGA",
	// 						Action:      "MODULE_ADD_ERROR",
	// 						LoggedIn:    "sys",
	// 						Username:    "sys",
	// 						Description: "Error loading module " + moduleName + " , " + err.Error(),
	// 					}
	// 					fmt.Println("Error loading module: ", err)
	// 				}
	// 				_ = GetRoutes.(func(app *fiber.App) error)(app)
	// 			}
	// 		}
	// 	}
	// }
	//--------------------------------------------------------------------

	// Listen on the port specified in the "PORT" environment variable for the first server
	go func() {
		_ = app.Listen(":" + system.Port)
	}()

	// Mantener el programa en ejecución
	done := make(chan struct{})
	<-done
}
