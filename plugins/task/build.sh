# /bin/bash
# Compilar el plugins
go build -buildmode=plugin -trimpath -o task.plugin ./main.go
# moverlo para la carpeta de backend
mv ./task.plugin ../../backend/plugins/