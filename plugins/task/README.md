# plugin_task
plugin_task

## Compilación

Para compilar el plugin, se debe ejecutar el siguiente comando en la línea de comandos:

```sh
go build -buildmode=plugin -trimpath -o task.plugin ./main.go
```


Todos los plugins que se creen para ejecutar desde este deben de deben compilarse con la estencion .task
