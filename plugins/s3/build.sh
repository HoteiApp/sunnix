# /bin/bash
# Compilar el plugins
go build -buildmode=plugin -trimpath -o s3.plugin ./main.go
# moverlo para la carpeta de backend
mv ./s3.plugin ../../backend/plugins/