package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// Función para leer las dependencias del archivo go.mod
func getDependencies(goModFile string) (map[string]string, error) {
	dependencies := make(map[string]string)
	content, err := os.ReadFile(goModFile)
	if err != nil {
		return nil, fmt.Errorf("error al leer %s: %v", goModFile, err)
	}

	lines := strings.Split(string(content), "\n")
	inRequireSection := false

	for _, line := range lines {
		line = strings.TrimSpace(line)

		switch {
		case strings.Contains(line, "require ("):
			inRequireSection = true
		case line == ")":
			inRequireSection = false
		case inRequireSection && strings.Contains(line, "v"):
			if parts := strings.Fields(line); len(parts) >= 2 {
				dependencies[parts[0]] = parts[1]
			}
		}
	}

	return dependencies, nil
}

// Función para actualizar las dependencias en un archivo go.mod
func updateGoModWithDependencies(goModFile string, dependencies map[string]string) error {
	content, err := os.ReadFile(goModFile)
	if err != nil {
		return fmt.Errorf("error al leer %s: %v", goModFile, err)
	}

	lines := strings.Split(string(content), "\n")
	inRequireSection := false
	modified := make([]string, 0, len(lines))

	for _, line := range lines {
		trimmedLine := strings.TrimSpace(line)

		switch {
		case strings.Contains(trimmedLine, "require ("):
			inRequireSection = true
		case trimmedLine == ")":
			inRequireSection = false
		case inRequireSection && strings.Contains(trimmedLine, "v"):
			if parts := strings.Fields(trimmedLine); len(parts) >= 2 {
				if newVersion, exists := dependencies[parts[0]]; exists {
					line = strings.Replace(line, parts[1], newVersion, 1)
				}
			}
		}
		modified = append(modified, line)
	}

	return os.WriteFile(goModFile, []byte(strings.Join(modified, "\n")), 0644)
}

// Función para ejecutar un comando en la terminal
func runCommand(dir string, cmd string, args ...string) error {
	command := exec.Command(cmd, args...)
	command.Dir = dir
	output, err := command.CombinedOutput()
	if err != nil {
		return fmt.Errorf("error al ejecutar el comando '%s': %v\n%s", cmd, err, output)
	}
	fmt.Printf("Comando '%s %s %s' ejecutado con éxito en %s\n", cmd, args[0], args[1], dir)
	return nil
}

// Nueva función para obtener el nombre del plugin basado en el directorio
func getPluginName(path string) string {
	// Obtiene el último componente del path (nombre de la carpeta)
	baseName := filepath.Base(path)
	// Obtiene el directorio padre
	parentDir := filepath.Base(filepath.Dir(path))

	// Determina la extensión según el directorio padre
	switch parentDir {
	case "plugins":
		return baseName + ".plugin"
	case "tasks":
		return baseName + ".task"
	default:
		return baseName + ".plugin" // Extensión por defecto
	}
}

// Función para compilar un plugin actualizada
func compilePlugin(pluginDir string) error {
	fmt.Printf("Compilando plugin en: %s\n", pluginDir)
	pluginName := getPluginName(pluginDir)

	// Primero ejecutar go mod vendor para sincronizar el directorio vendor
	if err := runCommand(pluginDir, "go", "mod", "vendor"); err != nil {
		return fmt.Errorf("error al ejecutar go mod vendor: %v", err)
	}

	// Compilar usando -mod=vendor para usar el directorio vendor
	return runCommand(pluginDir, "go", "build", "-buildmode=plugin", "-trimpath", "-mod=vendor", "-o", pluginName, "main.go")
}

// Modificación de la función updatePluginsDependencies
func updatePluginsDependencies(projectDir string, dependencies map[string]string) error {
	dirs := []string{"plugins", "tasks"}

	for _, dir := range dirs {
		basePath := filepath.Join(projectDir, dir)
		err := filepath.Walk(basePath, func(path string, info os.FileInfo, err error) error {
			if err != nil || !info.IsDir() || path == basePath {
				return err
			}

			goModFile := filepath.Join(path, "go.mod")
			if _, err := os.Stat(goModFile); err == nil {
				fmt.Printf("Actualizando dependencias en: %s\n", goModFile)
				if err := updateGoModWithDependencies(goModFile, dependencies); err != nil {
					return fmt.Errorf("error en %s: %v", goModFile, err)
				}

				// Ejecutar go mod tidy antes de compilar
				if err := runCommand(path, "go", "mod", "tidy"); err != nil {
					return fmt.Errorf("error ejecutando go mod tidy en %s: %v", path, err)
				}

				// Compilar el plugin
				if err := compilePlugin(path); err != nil {
					return fmt.Errorf("error compilando plugin en %s: %v", path, err)
				}
			}
			return nil
		})

		if err != nil {
			return fmt.Errorf("error al procesar %s: %v", dir, err)
		}
	}
	return nil
}

func main() {
	// Ruta del directorio principal de zentinelle
	projectDir := "./"

	// Ruta del directorio backend
	backendDir := projectDir + "/backend"

	// Verificar si el directorio backend existe
	_, err := os.Stat(backendDir)
	if os.IsNotExist(err) {
		fmt.Printf("El directorio %s no existe.\n", backendDir)
		return
	}

	// Ruta del archivo go.mod del backend
	goModFile := backendDir + "/go.mod"

	// Obtener las dependencias del backend
	dependencies, err := getDependencies(goModFile)
	if err != nil {
		fmt.Printf("Error al obtener dependencias del backend: %v\n", err)
		return
	}

	// Recorrer y actualizar las dependencias en los plugins
	err = updatePluginsDependencies(projectDir, dependencies)
	if err != nil {
		fmt.Printf("Error al actualizar dependencias de los plugins: %v\n", err)
	}
}
