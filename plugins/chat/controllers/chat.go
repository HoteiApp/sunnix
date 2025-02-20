package controllers

import (
	"github.com/HoteiApp/sunnix/plugins/chat/database"
	"github.com/HoteiApp/sunnix/plugins/chat/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// func CreateConversation(c *fiber.Ctx) error {
// 	var requestData models.FromAddEvent
// 	if err := c.BodyParser(&requestData); err != nil {
// 		return err
// 	}

// 	// Asegúrate de que UserOne sea siempre el ID de usuario más pequeño
// 	if userOne > userTwo {
// 		userOne, userTwo = userTwo, userOne
// 	}

// 	conversation := models.Conversation{
// 		UserOne: userOne,
// 		UserTwo: userTwo,
// 	}
// 	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
// 		return db.Create(&conversation)
// 	})

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"msgs": result,
// 	})

// }

// Definimos la función ChatUsers que toma un contexto de Fiber como argumento y devuelve un error
func ChatUsers(c *fiber.Ctx) error {
	// Obtenemos las reclamaciones del token JWT del usuario
	claims, _ := GetClaims(c)

	// Definimos una estructura anidada UserMessage para almacenar el remitente y el contenido de cada mensaje
	type UserMessage struct {
		CFrom   string // El remitente del mensaje
		Content string // El contenido del mensaje
	}

	// Inicializamos un slice para almacenar los mensajes del usuario
	var userMessages []UserMessage

	// Creamos un mapa para rastrear los remitentes únicos
	userSet := make(map[string]bool)

	// Realizamos una consulta a la base de datos
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Seleccionamos la tabla 'messages'
		db.Table("messages").
			// Seleccionamos las columnas 'c_from' y 'content'
			Select("c_from, content").
			// Filtramos los mensajes donde el destinatario es el usuario autenticado
			Where("c_to = ?", claims["ID"].(float64)).
			// Excluimos los mensajes donde el remitente es el usuario autenticado
			Where("c_from != ?", claims["ID"].(float64)).
			// O donde el remitente es el usuario autenticado
			Or("c_from = ?", claims["ID"].(float64)).
			// Pero el destinatario no es el usuario autenticado
			Where("c_to != ?", claims["ID"].(float64)).
			// Y el remitente no es el usuario autenticado
			Where("c_from != ?", claims["ID"].(float64)).
			// Ordenamos los mensajes por 'id' en orden descendente
			Order("id DESC").
			// Buscamos los mensajes que cumplen con los criterios anteriores y los almacenamos en 'userMessages'
			Find(&userMessages)
		return nil
	})

	// Inicializamos un slice para almacenar los mensajes únicos del usuario
	var uniqueUserMessages []UserMessage

	// Iteramos sobre cada mensaje del usuario
	for _, userMessage := range userMessages {
		// Si el remitente del mensaje no está en 'userSet'
		if _, exists := userSet[userMessage.CFrom]; !exists {
			// Lo añadimos a 'userSet'
			userSet[userMessage.CFrom] = true
			// Y añadimos el mensaje a 'uniqueUserMessages'
			uniqueUserMessages = append(uniqueUserMessages, userMessage)
		}
	}

	// Devolvemos un estado 200 OK y los mensajes únicos del usuario en formato JSON
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"userMessages": uniqueUserMessages,
	})
}

func ChatConversations(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)

	var conversations []models.Conversation

	database.DB.Where("user_one = ? or user_two = ?", claims["ID"].(float64), claims["ID"].(float64)).
		Find(&conversations)
	// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 	return db.Where("user_one = ? or user_two = ?", claims["ID"].(float64), claims["ID"].(float64)).
	// 		Find(&conversations)
	// })

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"conversations": conversations,
	})
}

func ChatMsgConversations(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	conversation := c.Params("conversation")

	var msgs []models.Message
	database.DB.Where("conversation = ? and (c_from = ? or c_to = ?)", conversation, claims["ID"].(float64), claims["ID"].(float64)).Find(&msgs)
	// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 	return db.Where("conversation = ? and (c_from = ? or c_to = ?)", conversation, claims["ID"].(float64), claims["ID"].(float64)).Find(&msgs)
	// })

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"msgs": msgs,
	})
}

func ChatMessages(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	user := c.Params("user")

	var messages []models.Message

	database.DB.Where("(c_from = ? and c_to = ?) OR (c_from = ? and c_to = ?)", user, claims["ID"].(float64), claims["ID"].(float64), user).Find(&messages)
	// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 	return db.Where("(c_from = ? and c_to = ?) OR (c_from = ? and c_to = ?)", user, claims["ID"].(float64), claims["ID"].(float64), user).Find(&messages)
	// })

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"msgs": messages,
	})

}
