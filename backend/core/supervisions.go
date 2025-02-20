package core

import (
	"fmt"
	"time"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"gorm.io/gorm"
)

func SupervisionsUpdat(user int, initalDate string) bool {
	var supervisions_topic []models.SupervisionsTopics
	// Search Active Topic
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Find(&supervisions_topic)
	})
	date, err := time.Parse("01/02/2006", initalDate)
	if err != nil {
		fmt.Println("Error:", err)
		return false
	}
	for _, topic := range supervisions_topic {
		var supervisions models.SupervisionsUser
		result, _ := database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("`user` = ? and topic = ?", user, topic.ID).Order("id").Find(&supervisions)
		})
		// Si no se encuentra una entrada en la base de datos, crear una nueva
		if result.(*gorm.DB).RowsAffected == 0 {
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				supervisions.Date = date.Format("1/2/2006")
				supervisions.Topic = int(topic.ID)
				supervisions.User = user
				supervisions.SignatureTcm = ""
				supervisions.SignatureTcms = ""
				supervisions.Completed = false
				return db.Create(&supervisions)
			})
		} else {
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				supervisions.Date = date.Format("01/02/2006")
				supervisions.Topic = int(topic.ID)
				supervisions.User = user
				supervisions.SignatureTcm = ""
				supervisions.SignatureTcms = ""
				supervisions.Completed = false
				return db.Save(&supervisions)
			})
		}
		date = date.AddDate(0, 0, 7)
	}
	return true
}
func SupervisionsEdit(id int, initalDate string) bool {
	var supervisions models.SupervisionsUser
	// Search Active Topic
	_, err := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("id = ?", id).Find(&supervisions)
	})
	if err != nil {
		return false
	}
	date, err := time.Parse("01/02/2006", initalDate)
	if err != nil {
		fmt.Println("Error:", err)
		return false
	}
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		supervisions.Date = date.Format("01/02/2006")
		return db.Save(&supervisions)
	})
	return true
}
