package system

import (
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

// -- Función init que se ejecuta al inicio del programa
func Connect() *ldap.Conn {
	var err error
	// Establece la conexión con el servidor LDAP
	conn, err := ldap.DialURL("ldap://" + LdapServer)
	// Si hay un error durante la conexión, registra el error y Mostar mensaje
	if err != nil {
		fmt.Println(err)
	}
	// Autentica el usuario administrador en el servidor LDAP
	err = conn.Bind(LdapUserAdmin, LdapPassword)
	if err != nil {
		// Si hay un error durante la autenticación, registra el error y Mostar mensaje
		fmt.Println(err)
	}
	return conn
}

// -- Función para agregar una entrada LDAP
func AddInLdap(addRequest *ldap.AddRequest, l *ldap.Conn) bool {
	// Cierra la conexión LDAP al final de la función
	defer l.Close()
	// Agrega la entrada LDAP
	err := l.Add(addRequest)
	// Si hay un error al agregar la entrada, muestra un mensaje de error
	if err != nil {
		fmt.Println("Entry NOT done", err)
		// Retorna falso para indicar que la operación falló
		return false
	}
	return true // Retorna verdadero para indicar que la operación tuvo éxito
}

// -- Función para modificar una entrada LDAP
func ModifyInLdap(modifyRequest *ldap.ModifyRequest, l *ldap.Conn) bool {
	// Cierra la conexión LDAP al final de la función
	defer l.Close()
	// Modifica la entrada LDAP
	if err := l.Modify(modifyRequest); err != nil {
		// Si hay un error al modificar la entrada, muestra un mensaje de error
		fmt.Println("Failed to modify user", err)
		// Retorna falso para indicar que la operación falló
		return false
	}
	// Retorna verdadero para indicar que la operación tuvo éxito
	return true
}
