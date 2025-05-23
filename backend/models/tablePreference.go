package models

import "gorm.io/gorm"

type TablePreference struct {
	gorm.Model
	UserID   string `gorm:"index"`
	TableKey string `gorm:"index"`
	Filters  string `gorm:"type:text"` // JSON string
	Columns  string `gorm:"type:text"` // JSON string
}
