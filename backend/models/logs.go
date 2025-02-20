package models

import "gorm.io/gorm"

type Logs struct {
	gorm.Model
	App         string `json:"app"`         // Application name
	Action      string `json:"action"`      // Action performed
	LoggedIn    string `json:"logged_in"`   // Timestamp when the user logged in
	Username    string `json:"username"`    // Username of the user who performed the action
	Client      int    `json:"client"`      // Client information
	Description string `json:"description"` // Additional description of the action performed
}
type Activities struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
	Level int    `json:"level"`
}
