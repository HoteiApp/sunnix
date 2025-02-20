package main

import (
	"fmt"         // Importa el paquete de formateo de cadenas
	_ "image/png" // Importa la biblioteca de imágenes PNG

	"strings" // Importa el paquete de manipulación de cadenas

	"github.com/HoteiApp/sunnix/plugins/ldap/system" // Importar paquetes internos del plugin
	"github.com/go-ldap/ldap/v3"                     // Importa la biblioteca LDAP de Go
)

// // -- Función init que se ejecuta al inicio del programa
// func init() {
// 	var err error
// 	// Establece la conexión con el servidor LDAP
// 	system.Conn, err = ldap.DialURL("ldap://" + system.LdapServer)
// 	// Si hay un error durante la conexión, registra el error y Mostar mensaje
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	// Autentica el usuario administrador en el servidor LDAP
// 	err = system.Conn.Bind(system.LdapUserAdmin, system.LdapPassword)
// 	if err != nil {
// 		// Si hay un error durante la autenticación, registra el error y Mostar mensaje
// 		fmt.Println(err)
// 	}
// }

// -- CheckUser verifica si un usuario existe en el servidor LDAP utilizando el identificador de usuario proporcionado.
// -- Retorna un valor booleano que indica si el usuario existe en el servidor LDAP y un puntero al resultado de la búsqueda.
func CheckUser(uid string) (bool, *ldap.SearchResult) {
	// Realiza una búsqueda en el servidor LDAP utilizando el identificador de usuario proporcionado.
	searchResult := Search("(&(uid=" + uid + "))")

	// Verifica si se encontró al menos una entrada que cumpla con el filtro de búsqueda.
	exists := len(searchResult.(*ldap.SearchResult).Entries) > 0

	// Retorna el resultado de la búsqueda y si el usuario existe o no.
	return exists, searchResult.(*ldap.SearchResult)
}

// -----------------------------------------------------------------------------------------------------------------
// -- GetPermissions devuelve una lista de permisos como una matriz de cadenas.
func GetPermissions() []string {
	// Retorna la matriz de permisos predefinida.
	return system.Permissions
}

// --   Search realiza una búsqueda en el servidor LDAP utilizando los argumentos proporcionados.
// --   Retorna el resultado de la búsqueda como un objeto de tipo interface{}.
// --	How to use this function in AGA
// --	system.ExtractFunctionsPlugins("ldap","Search","(&(uid=user))")
func Search(arg ...interface{}) interface{} {
	// Crea una nueva solicitud de búsqueda con los parámetros proporcionados.
	searchRequest := ldap.NewSearchRequest(
		system.LdapBaseDn, // El DN base para realizar la búsqueda
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		arg[0].(string), // El filtro a aplicar
		[]string{"*"},   // Una lista de atributos para recuperar
		nil,
	)
	defer system.Connect().Close()
	// Realiza la búsqueda en el servidor LDAP utilizando la conexión establecida.
	sr, _ := system.Connect().Search(searchRequest)

	// Retorna el resultado de la búsqueda como un objeto de tipo interface{}.
	return sr
}

// -- Login intenta autenticar al usuario utilizando el nombre de usuario y la contraseña proporcionados.
// -- Retorna un valor booleano que indica si la autenticación fue exitosa o no.
// -- Login -- How to use this function
// -- system.ExtractFunctionsPlugins("ldap","Login","user", "password")
func Login(arg ...interface{}) interface{} {
	if len(arg) < 2 {
		return false
	}
	// Cierra la conexión al servidor LDAP al final de la función.
	defer system.Connect().Close()
	// Verifica si el usuario existe en el servidor LDAP.
	if success, username := CheckUser(arg[0].(string)); success {
		// Intenta autenticar al usuario utilizando la contraseña proporcionada.
		if err := system.Connect().Bind(username.Entries[0].DN, arg[1].(string)); err != nil {
			return false
		}
		return true
	}
	return false
}

// -- ListAll recupera todos los objetos del servidor LDAP.
// -- Retorna el resultado de la búsqueda como un objeto de tipo interface{}.
// -- How to use this function in AGA
// -- system.ExtractFunctionsPlugins("ldap","ListAll",nil)
func ListAll(arg ...interface{}) interface{} {
	// Cierra la conexión al servidor LDAP al final de la función.
	defer system.Connect().Close()

	// Realiza una búsqueda en el servidor LDAP para recuperar todos los objetos.
	result, _ := system.Connect().Search(ldap.NewSearchRequest(
		system.LdapBaseDn,
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		"(objectClass=*)",
		[]string{"*"},
		nil,
	))

	// Retorna el resultado de la búsqueda como un objeto de tipo interface{}.
	return result
}

// AddAccount agrega una nueva cuenta de usuario al servidor LDAP.
// Retorna un valor booleano que indica si la operación fue exitosa o no.
// -- system.ExtractFunctionsPlugins("ldap","AddAccount","uid", "nameAttr-->value" ...)
func AddAccount(arg ...interface{}) interface{} {
	// Extrae el nombre de usuario y la OU de los argumentos.
	if len(arg) < 2 {
		return false
	}
	uid := strings.Split(arg[0].(string), "-->")[1]
	ou := strings.Split(arg[1].(string), "-->")[1]

	// Verifica si el usuario ya existe en el servidor LDAP.
	if success, _ := CheckUser(uid); success {
		return false
	}

	// Crea una nueva solicitud de agregado para la cuenta de usuario.
	addRequest := ldap.NewAddRequest("uid="+uid+",ou="+ou+","+system.LdapBaseDn, []ldap.Control{})
	addRequest.Attribute("objectClass", []string{"inetOrgPerson", "top", "person", "organizationalPerson", "shadowAccount", "servicesAccount"})

	// Agrega los atributos adicionales proporcionados como argumentos.
	for i := 0; i < len(arg[2:]); i++ {
		attributes := strings.Split(arg[i].(string), "-->")
		if attributes[1] != "" {
			addRequest.Attribute(attributes[0], []string{attributes[1]})
		}
	}

	// Agrega la cuenta de usuario en el servidor LDAP y retorna el resultado.
	return system.AddInLdap(addRequest, system.Connect())
}

// -- MoveAccount mueve una cuenta de usuario a una nueva OU en el servidor LDAP.
// -- Retorna un valor booleano que indica si la operación fue exitosa o no.
// -- system.ExtractFunctionsPlugins("ldap","MoveAccount", "uid",(false|true), "(workers|students|visitors|corporatives|trash)")
func MoveAccount(arg ...interface{}) interface{} {
	// Verifica si el usuario existe en el servidor LDAP.
	if success, username := CheckUser(arg[0].(string)); success {
		// Crea una nueva solicitud para mover la cuenta de usuario a la nueva OU.
		req := ldap.NewModifyDNRequest(
			username.Entries[0].DN, "uid="+arg[0].(string), arg[1].(bool), "ou="+arg[2].(string)+","+system.LdapBaseDn)

		// Ejecuta la solicitud para mover la cuenta de usuario y verifica si la operación fue exitosa.
		if err := system.Connect().ModifyDN(req); err != nil {
			fmt.Printf("Failed to modify DN: %s\n", err)
			return false
		}
		return true
	}
	return false
}

// -- Retorna un valor booleano que indica si la operación fue exitosa o no.
// -- system.ExtractFunctionsPlugins("ldap","DeleteAccount","uid")
func DeleteAccount(arg ...interface{}) interface{} {
	// Verifica si el usuario existe en el servidor LDAP.
	if success, username := CheckUser(arg[0].(string)); success {
		// Crea una nueva solicitud de eliminación para la cuenta de usuario.
		reqResult := ldap.NewDelRequest(username.Entries[0].DN, nil)

		// Ejecuta la solicitud para eliminar la cuenta de usuario y verifica si la operación fue exitosa.
		if err := system.Connect().Del(reqResult); err != nil {
			fmt.Printf("Failed to delete DN: %s\n", err)
			return false
		}
		return true
	}
	return false
}

// -- ModifyAccount modifica una cuenta de usuario en el servidor LDAP.
// -- Retorna un valor booleano que indica si la operación fue exitosa o no.
// -- system.ExtractFunctionsPlugins("ldap","ModifyAccount","uid", "nameAttr-->value" ...)
func ModifyAccount(arg ...interface{}) interface{} {
	// Verifica si el usuario existe en el servidor LDAP.
	if success, username := CheckUser(arg[0].(string)); success {
		// Crea una nueva solicitud de modificación para la cuenta de usuario.
		modify := ldap.NewModifyRequest(username.Entries[0].DN, nil)

		// Agrega los atributos proporcionados como argumentos a la solicitud de modificación.
		// modify.Replace("modifyData", []string{system.CurrentTime()})
		for i := 1; i < len(arg); i++ {
			attributes := strings.Split(arg[i].(string), "-->")
			if attributes[1] != "" {
				if len(username.Entries[0].GetAttributeValue(attributes[0])) > 0 {
					modify.Replace(attributes[0], []string{attributes[1]})
				} else {
					modify.Add(attributes[0], []string{attributes[1]})
				}
			}
		}

		// Ejecuta la solicitud para modificar la cuenta de usuario y verifica si la operación fue exitosa.
		return system.ModifyInLdap(modify, system.Connect())
	}
	return false
}

// -- ChangePasswordAccount cambia la contraseña de una cuenta de usuario en el servidor LDAP.
// -- Retorna un valor booleano que indica si la operación fue exitosa o no.
// -- system.ExtractFunctionsPlugins("ldap", "ChangePasswordAccount", "uid", "plain_text_password")
func ChangePasswordAccount(arg ...interface{}) interface{} {
	// Verifica si el usuario existe en el servidor LDAP.
	if success, username := CheckUser(arg[0].(string)); success {
		// Crea una nueva solicitud de modificación para la cuenta de usuario.
		modify := ldap.NewModifyRequest(username.Entries[0].DN, nil)

		// Agrega la nueva contraseña y la fecha de cambio a la solicitud de modificación.
		// modify.Add("userPasswordLast", []string{system.MD5Hash(arg[1].(string))})
		modify.Replace("userPassword", []string{system.MD5Hash(arg[1].(string))})
		modify.Replace("userPasswordSet", []string{system.CurrentTime()})

		// Elimina la contraseña más antigua de la lista si se han almacenado tres contraseñas.
		// passwords := username.Entries[0].GetAttributeValues("userPasswordLast")
		// if len(passwords) == 3 {
		// 	modify.Delete("userPasswordLast", []string{passwords[0]})
		// }

		// Ejecuta la solicitud para cambiar la contraseña de la cuenta de usuario y verifica si la operación fue exitosa.
		return system.ModifyInLdap(modify, system.Connect())
	}
	return false
}
