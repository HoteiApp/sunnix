

# 🚀 SunissUp Workflows

## 📋 Descripción General
Este repositorio contiene workflows de GitHub Actions diseñados para compilar y desplegar los diferentes componentes del sistema SunissUp de manera eficiente y automatizada.

## 🔄 Comportamiento del Sistema

### 🛠️ Modos de Ejecución

#### 🔹 Ejecución Individual
> Cuando se ejecuta un workflow de forma individual:
- 🔄 Se activa por:
  - 🖱️ Ejecución manual
  - 📝 Push en rama `testing`
- ⚙️ Proceso:
  1. Detiene el servicio
  2. Realiza el despliegue
  3. Reinicia el servicio
- 🎯 Ideal para: Actualizaciones individuales y pruebas

#### 🔹 Ejecución Centralizada
> Cuando se usa el SunissUp Deploy Center:
- 🎮 Proceso optimizado:
  1. ⏹️ Detiene el servicio una única vez
  2. 🔄 Ejecuta todos los workflows seleccionados
  3. ▶️ Reinicia el servicio al finalizar
- ✨ Ventajas:
  - Minimiza interrupciones
  - Optimiza tiempos de despliegue
  - Mayor eficiencia

## 🔧 Workflows Disponibles

### 📦 Compile and Deploy Workflows
> Workflows individuales para cada componente del sistema

#### 🏗️ Componentes:
- 🏢 **Backend** (Sistema principal)
- 🔄 **Módulo TCM**
- 🔌 **Plugins**:
  ```
  💬 Chat    📅 Events    🔑 LDAP    📄 PDF
  ☁️ S3      ⚙️ Task      📊 Task Weeks
  ```

#### ⚙️ Características:
- 🎯 **Activación**: Manual vía `workflow_dispatch`
- 🔄 **Proceso**:
  ```mermaid
  graph LR
    A[Inicio] --> B[Compilación]
    B --> C[Transferencia SSH]
    C --> D[Despliegue]
    D --> E[Fin]
  ```

### 🎮 SunissUp Deploy Center
> Control centralizado para todos los componentes

#### 🎯 Características:
- **Activación**: 
  - 🖱️ Manual (`workflow_dispatch`)
  - 🔄 Automática (push a `deploy`)

#### 🎚️ Opciones de Despliegue:
```
🔹 No ejecutar
🔸 Solo compilar
✨ Compilar y desplegar
```

## 📝 Guía de Uso

1. 📍 Accede a "Actions" en GitHub
2. 🎯 Selecciona "SunissUp Deploy Center"
3. ▶️ Click en "Run workflow"
4. ⚙️ Configura:
   ```
   ├── 🌟 Desplegar todo
   └── 🔧 Componentes individuales
       ├── Backend
       ├── Módulo TCM
       └── Plugins...
   ```
5. ✅ Confirma ejecución

## 🔐 Requisitos

> Secrets necesarios en GitHub:
```yaml
SSH_PRIVATE_KEY: 🔑 Clave SSH privada
IP_ADDRESS: 🌐 IP del servidor
USER_NAME: 👤 Usuario SSH
```

## 🤖 Automatización
- 📤 Push a `deploy` → Detección automática
- 🎯 Despliegue selectivo de componentes modificados
- ⚡ Optimización de recursos y tiempo

---
> 💡 **Nota**: Este sistema está diseñado para maximizar la eficiencia y minimizar el tiempo de inactividad durante los despliegues.
