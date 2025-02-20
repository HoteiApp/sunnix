package system

import (
	// Importa la biblioteca de base64 para codificación y decodificación de cadenas
	_ "image/png" // Importa la biblioteca de imágenes PNG
)

// Variables globales
var (
	// -- LDAP
	LdapHost      = configEnv("sunissUp.ldap.Host")       // Obtiene el host del servidor LDAP desde las variables de entorno
	LdapPort      = configEnv("sunissUp.ldap.Port")       // Obtiene el puerto del servidor LDAP desde las variables de entorno
	LdapServer    = LdapHost + ":" + LdapPort             // Concatena el host y el puerto para formar la dirección del servidor LDAP
	LdapUserAdmin = configEnv("sunissUp.ldap.User")       // Obtiene el usuario administrador del servidor LDAP desde las variables de entorno
	LdapPassword  = configEnv("sunissUp.ldap.Password")   // Convierte la contraseña decodificada en una cadena
	LdapBaseDn    = configEnv("sunissUp.ldap.BaseDn")     // Obtiene el DN base del servidor LDAP desde las variables de entorno
	Permissions   = []string{"search", "write", "delete"} // Define una lista de permisos
	// Conn          *ldap.Conn                              // Declara una conexión LDAP
)
