# /bin/bash
# Compilar el plugins
go build -buildmode=plugin -trimpath -o weeks.task ./main.go
# moverlo para la carpeta de backend
mv ./weeks.task ../../backend/plugins/tasks/