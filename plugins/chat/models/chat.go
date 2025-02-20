package models

import "gorm.io/gorm"

type Conversation struct {
	gorm.Model
	UserOne float64 `gorm:"uniqueIndex:idx_users"`
	UserTwo float64 `gorm:"uniqueIndex:idx_users"`
}

type Message struct {
	gorm.Model
	Conversation float64
	CFrom        float64
	CTo          float64
	Content      string
}

type OutConversations struct {
	Id          float64
	User        float64
	Online      bool
	Nick        string
	LastMessage string
}
