#!/bin/bash

# Verifica si main.go existe en el directorio actual
if [ ! -f "./main.go" ]; then
  echo "El archivo main.go no existe en el directorio actual."
  exit 1
fi

# Compilar el plugin
echo "Compilando el plugin..."
go build -buildmode=plugin -trimpath -o ldap.plugin ./main.go

# Verifica si el archivo ldap.plugin fue creado
if [ ! -f "./ldap.plugin" ]; then
  echo "No se pudo generar el archivo ldap.plugin."
  exit 1
fi

# Mover el plugin al directorio de backend
echo "Moviendo ldap.plugin a ../../backend/plugins/"
mv ./ldap.plugin ../../backend/plugins/

# Verificar si el archivo fue movido correctamente
if [ -f "../../backend/plugins/ldap.plugin" ]; then
  echo "El archivo ldap.plugin se movió correctamente."
else
  echo "Error al mover el archivo ldap.plugin."
fi
