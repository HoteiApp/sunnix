package database

import (
	"fmt"

	"github.com/HoteiApp/sunnix/tasks/weeks/models"
	"github.com/HoteiApp/sunnix/tasks/weeks/system"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	// Open a new connection to the database based on the DbType specified in the system configuration
	var db *gorm.DB
	var err error

	db, err = gorm.Open(mysql.Open(system.MysqlCredentials), &gorm.Config{})

	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %s", err.Error()))
	}
	// Configure the logger so that it does not show log messages in the console
	db.Logger = logger.Default.LogMode(logger.Silent)

	// Auto-migrate the Weeks table
	if err := db.AutoMigrate(&models.Fortnight{}, &models.Week{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}

}

func WithDB(fn func(db *gorm.DB) interface{}) (interface{}, error) {
	var db *gorm.DB
	var err error

	db, err = gorm.Open(mysql.Open(system.MysqlCredentials), &gorm.Config{})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %s", err.Error())
	}
	defer func() {
		sqlDB, err := db.DB()
		if err != nil {
			fmt.Printf("failed to get DB instance: %s\n", err.Error())
			return
		}
		sqlDB.Close()
	}()
	return fn(db), nil
}
