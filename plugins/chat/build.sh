# /bin/bash
# Compilar el plugins
go build -buildmode=plugin -trimpath -o chat.dinamic ./main.go
# moverlo para la carpeta de backend
mv ./chat.dinamic ../../backend/plugins/