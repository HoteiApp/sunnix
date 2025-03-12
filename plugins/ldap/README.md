# Plugin LDAP

Este repositorio contiene un conjunto de funciones en Go que permiten interactuar con un servidor LDAP. Personalizadas para el uso de AGA

## Autor

[@akosej](https://github.com/akosej) Edgar Javier Peña Hernández

## Compilación

Para compilar el plugin, se debe ejecutar el siguiente comando en la línea de comandos:

```sh
go build -buildmode=plugin -trimpath -o ldap.plugin ./main.go
```

Una vez compilado, los plugins se pueden copiar en el directorio `pathAGA/plugins/` para poder usarlos en AGA.

## Funciones Exportadas

El plugin exporta las siguientes funciones que se pueden utilizar para interactuar con el servidor LDAP:

- `Login`: Esta función se utiliza para autenticar un usuario en el servidor LDAP. Se espera que se le pase como argumentos el nombre de usuario y la contraseña.
- `ListAll`: Esta función se utiliza para listar todos los usuarios en el servidor LDAP.
- `Search`: Esta función se utiliza para buscar usuarios en el servidor LDAP. Se espera que se le pase como argumento una cadena de búsqueda válida de LDAP.
- `AddAccount`: Esta función se utiliza para agregar una cuenta de usuario al servidor LDAP. Se espera que se le pase como argumentos varios pares de valores de atributo-valor para la nueva cuenta de usuario.
- `MoveAccount`: Esta función se utiliza para mover una cuenta de usuario en el servidor LDAP. Se espera que se le pase como argumentos el nombre de usuario, un booleano que indica si se debe eliminar la cuenta original después de la transferencia, y el nuevo destino de la cuenta.
- `DeleteAccount`: Esta función se utiliza para eliminar una cuenta de usuario del servidor LDAP. Se espera que se le pase como argumento el nombre de usuario.
- `ModifyAccount`: Esta función se utiliza para modificar una cuenta de usuario en el servidor LDAP. Se espera que se le pase como argumentos el nombre de usuario y uno o más pares de valores de atributo-valor que se deben modificar.
- `ChangePasswordAccount`: Esta función se utiliza para cambiar la contraseña de una cuenta de usuario en el servidor LDAP. Se espera que se le pase como argumentos el nombre de usuario y la nueva contraseña en texto plano.

## Uso en AGA

Para utilizar estas funciones en el código de AGA, se debe llamar a `ExtractFunctionsPlugins` y proporcionar el nombre del plugin LDAP y el nombre de la función que se desea utilizar, junto con los parámetros necesarios para dicha función. Los resultados de las funciones se devuelven en un formato que se espera que el usuario final analice y procese según sea necesario.

A continuación, se muestran ejemplos de cómo se pueden utilizar las funciones en AGA:

```go
// Autenticación de usuario
result := core.ExtractFunctionsPlugins("ldap", "Login", "user", "password")
fmt.Println(result.(bool))

// Listar todos los usuarios
result := core.ExtractFunctionsPlugins("ldap", "ListAll", nil)
bytes, _ := json.Marshal(&result)
var entries []ldap.Entry
_ = json.Unmarshal(bytes, &entries)

// Buscar usuarios
result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid=user))")
bytes, _ := json.Marshal(&result)
var entries ldap.SearchResult
_ = json.Unmarshal(bytes, &entries)

// Agregar cuenta de usuario
result := core.ExtractFunctionsPlugins("ldap", "AddAccount",
    "uid-->user",
    "ou-->(workers|students|visitors|corporatives|trash)",
    "dni-->dni",
    "uidNumber-->dni",
    "mail-->mail",
    "givenName-->first name",
    "sn-->surnames",
    "cn-->full name",
    "homeDirectory-->/home/aga",
    "description-->description",
    "businessCategory-->(user|admin)",
    "accountState-->(TRUE|FALSE)",
    "initials-->user_not_used",
    "userType-->(trabajador|estudiante|temporal|institucional)",
    ...
    )
fmt.Println(res) // Output: true | false

// Mover cuenta de usuario
result := core.ExtractFunctionsPlugins("ldap", "MoveAccount", "uid", (false|true), "(workers|students|visitors|corporatives|trash)")
fmt.Println(result) // Output: true | false

// Eliminar cuenta de usuario
result := core.ExtractFunctionsPlugins("ldap", "DeleteAccount", "uid")
fmt.Println(result) // Output: true | false

// Modificar cuenta de usuario
result := core.ExtractFunctionsPlugins("ldap", "ModifyAccount", "uid", "Attribute-->value", ...)

// Cambiar contraseña de un usuario 
result := core.ExtractFunctionsPlugins("ldap", "ChangePasswordAccount", "uid", "plain_text_password")
fmt.Println(result) // Output: true | false
```