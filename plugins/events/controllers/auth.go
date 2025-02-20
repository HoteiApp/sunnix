package controllers

import (
	"errors"

	"github.com/HoteiApp/sunnix/plugins/events/system"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GetClaims(c *fiber.Ctx) (jwt.MapClaims, error) {
	cookie := c.Cookies(system.KeySunissUp)
	// Verificar el token JWT
	token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		// Verificar el método de firma
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Invalid signature method")
		}
		// Devolver la clave secreta
		return []byte(system.SecretKey), nil
	})
	if err != nil {
		return nil, err // Devuelve el error
	}

	// Obtener los datos del usuario del token JWT
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("Could not get user data from JWT token")
	}
	return claims, nil
}
