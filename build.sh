#!/bin/bash

# Directorio base del proyecto
BASE_DIR="/mnt/d/project/github/sunnix"

# Array de plugins a compilar
plugins=("task" "s3" "pdf" "ldap")

for plugin in "${plugins[@]}"; do
    echo "Procesando plugin: $plugin"
    
    # Cambiar al directorio del plugin
    cd "$BASE_DIR/plugins/$plugin"
    
    # Ejecutar comandos para cada plugin
    go mod tidy
    go mod vendor
    go build -buildmode=plugin -trimpath -o "$plugin.plugin" ./main.go
    
    # Mover el archivo .plugin si es el plugin 'task'
    mv "./$plugin.plugin" "../../backend/plugins/"
    
done

# Array de Tasks a compilar
tasks=("weeks")

for task in "${tasks[@]}"; do
    echo "Procesando Tasks: $task"
    
    # Cambiar al directorio del plugin
    cd "$BASE_DIR/tasks/$task"
    
    # Ejecutar comandos para cada plugin
    go mod tidy
    go mod vendor
    go build -buildmode=plugin -trimpath -o "$task.task" ./main.go
    
    # Mover el archivo .plugin si es el plugin 'task'
    mv "./$task.plugin" "../../backend/plugins/tasks/"
    
done

# Array de dinamic a compilar
dinamics=("events" "chat")

for dinamic in "${dinamics[@]}"; do
    echo "Procesando dinamic: $dinamic"
    
    # Cambiar al directorio del plugin
    cd "$BASE_DIR/plugins/$dinamic"
    
    # Ejecutar comandos para cada plugin
    go mod tidy
    go mod vendor
    go build -buildmode=plugin -trimpath -o "$dinamic.dinamic" ./main.go
    
    # Mover el archivo .plugin si es el plugin 'task'
    
    mv "./$dinamic.dinamic" "../../backend/plugins/"

done

echo "¡Proceso completado!"