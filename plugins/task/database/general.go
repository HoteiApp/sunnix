package database

import (
	"fmt"

	"github.com/HoteiApp/sunnix/plugins/task/models"
	"github.com/HoteiApp/sunnix/plugins/task/system"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(mysql.Open(system.MysqlCredentials), &gorm.Config{})
	if err != nil {
		fmt.Println("Could not connect to the database", err)
	}
	DB = db
	DB.AutoMigrate(&models.Task{})
}
