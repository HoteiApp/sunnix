# /bin/bash
# Compilar el plugins
go build -buildmode=plugin -trimpath -o pdf.plugin ./main.go
# moverlo para la carpeta de backend
mv ./pdf.plugin ../../backend/plugins/