package core

import (
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"gorm.io/gorm"
)

func SendLogs(app, action, loggedIn, username, description string, client int) {
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		db.Create(&models.Logs{
			App:         app,
			Action:      action,
			LoggedIn:    loggedIn,
			Username:    username,
			Client:      client,
			Description: description,
		})
		return nil
	})
}
