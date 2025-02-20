## PLUGINS
The system supports 2 types of extensions: **.plugin** and **.dinamic**. The first is used to create functions that are accessed through the code of a module or the backend itself. It is used in the following way
```go
// Autenticación de usuario
result := core.ExtractFunctionsPlugins("ldap", "Login", "user", "password")
fmt.Println(result.(bool))

// Listar todos los usuarios
result := core.ExtractFunctionsPlugins("ldap", "ListAll", nil)
bytes, _ := json.Marshal(&result)
var entries []ldap.Entry
_ = json.Unmarshal(bytes, &entries)
```

The .dinamic extensions also have functions that can be used from the code, but they have an integrated URL system so that they are integrated into the main API. These URLs are automatically loaded by the system.

## Compilation
```go 
    // .plugin
    go build -buildmode=plugin -trimpath -o name.plugin ./main.go
    // .dinamic
    go build -buildmode=plugin -trimpath -o name.dinamic ./main.go
```

**Note**: When a plugin has a dependency that the backend also has, plugins must ensure that they are in the same version, so that there are no errors. That is why the **-trimpath** parameter is passed in the compilation.