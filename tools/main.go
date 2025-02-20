package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// Función para leer las dependencias del archivo go.mod
func getDependencies(goModFile string) (map[string]string, error) {
	// Abrir el archivo go.mod
	file, err := os.Open(goModFile)
	if err != nil {
		return nil, fmt.Errorf("error al abrir el archivo %s: %v", goModFile, err)
	}
	defer file.Close()

	// Crear un mapa para almacenar las dependencias con versiones
	dependencies := make(map[string]string)
	inRequireSection := false

	// Leer el archivo línea por línea
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()

		// Detectar la sección 'require'
		if strings.Contains(line, "require (") {
			inRequireSection = true
		}
		if strings.Contains(line, ")") {
			inRequireSection = false
		}

		// Si estamos en la sección 'require', buscar líneas que contengan versiones
		if inRequireSection && strings.Contains(line, "v") {
			// Limpiar la línea y extraer el nombre del paquete y la versión
			parts := strings.Fields(line)
			if len(parts) >= 2 {
				packageName := parts[0]
				version := parts[1]

				// Almacenar la dependencia y su versión en el diccionario
				dependencies[packageName] = version
			}
		}
	}

	// Verificar si hubo algún error en el escaneo
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("error al leer el archivo %s: %v", goModFile, err)
	}

	return dependencies, nil
}

// Función para actualizar las dependencias en un archivo go.mod
func updateGoModWithDependencies(goModFile string, dependencies map[string]string) error {
	// Leer el archivo go.mod
	file, err := os.Open(goModFile)
	if err != nil {
		return fmt.Errorf("error al abrir el archivo %s: %v", goModFile, err)
	}
	defer file.Close()

	// Crear un nuevo archivo temporal para escribir los cambios
	tempFile, err := os.Create(goModFile + ".temp")
	if err != nil {
		return fmt.Errorf("error al crear archivo temporal: %v", err)
	}
	defer tempFile.Close()

	// Leer el archivo línea por línea y escribir al archivo temporal
	scanner := bufio.NewScanner(file)
	inRequireSection := false

	for scanner.Scan() {
		line := scanner.Text()

		// Si estamos en la sección 'require', verificar y actualizar las dependencias
		if inRequireSection && strings.Contains(line, "v") {
			// Limpiar la línea y extraer el nombre del paquete y la versión
			parts := strings.Fields(line)
			if len(parts) >= 2 {
				packageName := parts[0]
				// Verificar si la dependencia está en el diccionario de versiones del backend
				if newVersion, exists := dependencies[packageName]; exists {
					// Reemplazar la versión con la del backend
					line = fmt.Sprintf("    %s %s", packageName, newVersion)
				}
			}
		}

		// Detectar la sección 'require'
		if strings.Contains(line, "require (") {
			inRequireSection = true
		}
		if strings.Contains(line, ")") {
			inRequireSection = false
		}

		// Escribir la línea (modificada o no) al archivo temporal
		_, err := tempFile.WriteString(line + "\n")
		if err != nil {
			return fmt.Errorf("error al escribir en el archivo temporal: %v", err)
		}
	}

	// Verificar si hubo algún error en el escaneo
	if err := scanner.Err(); err != nil {
		return fmt.Errorf("error al leer el archivo %s: %v", goModFile, err)
	}

	// Reemplazar el archivo original con el archivo temporal
	err = os.Rename(goModFile+".temp", goModFile)
	if err != nil {
		return fmt.Errorf("error al reemplazar el archivo original: %v", err)
	}

	return nil
}

// Función para ejecutar un comando en la terminal
func runCommand(dir, cmd, args string) error {
	command := exec.Command(cmd, args)
	command.Dir = dir
	output, err := command.CombinedOutput()
	if err != nil {
		return fmt.Errorf("error al ejecutar el comando '%s': %v\n%s", cmd, err, output)
	}
	fmt.Printf("Comando '%s' ejecutado con éxito en %s\n", cmd, dir)
	return nil
}

// Función para recorrer todos los plugins y actualizar las dependencias
func updatePluginsDependencies(projectDir string, dependencies map[string]string) error {
	// Recorrer todos los directorios en zentinelle/plugins
	err := filepath.Walk(projectDir+"/plugins", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Si es un directorio y contiene un archivo go.mod, actualizar las dependencias
		if info.IsDir() && filepath.Base(path) != "plugins" {
			goModFile := path + "/go.mod"
			if _, err := os.Stat(goModFile); err == nil {
				// Actualizar las dependencias en el archivo go.mod del plugin
				fmt.Printf("Actualizando dependencias en: %s\n", goModFile)
				updateGoModWithDependencies(goModFile, dependencies)
			}
		}
		return nil
	})

	if err != nil {
		return fmt.Errorf("error al recorrer los directorios de los plugins: %v", err)
	}

	errModule := filepath.Walk(projectDir+"/modules", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Si es un directorio y contiene un archivo go.mod, actualizar las dependencias
		if info.IsDir() && filepath.Base(path) != "modules" {
			goModFile := path + "/go.mod"
			if _, err := os.Stat(goModFile); err == nil {
				// Actualizar las dependencias en el archivo go.mod del plugin
				fmt.Printf("Actualizando dependencias en: %s\n", goModFile)
				updateGoModWithDependencies(goModFile, dependencies)
			}
		}
		return nil
	})

	if errModule != nil {
		return fmt.Errorf("error al recorrer los directorios de los modules: %v", err)
	}

	errTask := filepath.Walk(projectDir+"/tasks", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Si es un directorio y contiene un archivo go.mod, actualizar las dependencias
		if info.IsDir() && filepath.Base(path) != "tasks" {
			goModFile := path + "/go.mod"
			if _, err := os.Stat(goModFile); err == nil {
				// Actualizar las dependencias en el archivo go.mod del plugin
				fmt.Printf("Actualizando dependencias en: %s\n", goModFile)
				updateGoModWithDependencies(goModFile, dependencies)
			}
		}
		return nil
	})

	if errTask != nil {
		return fmt.Errorf("error al recorrer los directorios de los tasks: %v", err)
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
