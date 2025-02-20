# weeks.task
Creado para el uso a traves de **task.plugin**, tiene funciones para manejar informacion de la las semanas y quincena.  

## Compilación

Para compilar el submodulo del plugin task, se debe ejecutar el siguiente comando en la línea de comandos:

```sh
go build -buildmode=plugin -trimpath -o weeks.task ./main.go
```

## USO

```go
    // -- Generate Weeks (Se ejecuta al minuto de iniciar unicamente)
	go core.ExtractFunctionsPlugins("task", "Register", "weeks", "CalculateWeeksAndFortnights", true, "1m", "0")
	// -- Check the week that should be active (Se ejecuta al minuto de iniciar y luego cada 1h)
	go core.ExtractFunctionsPlugins("task", "Register", "weeks", "ActiveWeek", true, "1m", "1h")
```