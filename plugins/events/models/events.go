package models

import "gorm.io/gorm"

type Event struct {
	gorm.Model
	User        int    `json:"user"`
	Date        string `json:"date"`
	Title       string `json:"title"`
	Description string `json:"description"`
}
type FromAddEvent struct {
	Eventadd struct {
		User        int    `json:"user"`
		Date        string `json:"date"`
		Title       string `json:"title"`
		Description string `json:"description"`
	} `json:"eventAdd"`
}
