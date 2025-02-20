#!/bin/bash

# Cambiar al directorio donde se encuentra este script
SCRIPT_DIR=$(cd $(dirname "$0") && pwd)
cd "$SCRIPT_DIR"

# Verifica si main.go existe en el directorio actual
if [ ! -f "./main.go" ]; then
  echo "El archivo main.go no existe en el directorio actual."
  exit 1
fi

# Compilar el plugin
echo "Compilando el plugin..."
go build -buildmode=plugin -trimpath -o events.dinamic ./main.go

# Verifica si el archivo ldap.plugin fue creado
if [ ! -f "./events.dinamic" ]; then
  echo "No se pudo generar el archivo events.dinamic."
  exit 1
fi

# Mover el plugin al directorio de backend
echo "Moviendo events.dinamic a ../../backend/plugins/"
mv ./events.dinamic ../../backend/plugins/

# Verificar si el archivo fue movido correctamente
if [ -f "../../backend/plugins/events.dinamic" ]; then
  echo "El archivo events.dinamic se movió correctamente."
else
  echo "Error al mover el archivo events.dinamic."
fi
