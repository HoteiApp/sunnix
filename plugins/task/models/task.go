package models

import (
	"database/sql/driver"
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	UserId       string
	Description  string
	DueDate      time.Time
	Module       string
	FunctionName string
	Periodicity  time.Duration
	IsEnabled    bool
	Status       StatusEnum `gorm:"default:'PENDING'"`
	Error        string
}

type StatusEnum string

const (
	StatusPending StatusEnum = "PENDING"
	StatusRunning StatusEnum = "RUNNING"
	StatusError   StatusEnum = "ERROR"
	StatusSuccess StatusEnum = "SUCCESS"
)

func (s *StatusEnum) Scan(value string) error {
	*s = StatusEnum(value)
	return nil
}

func (s StatusEnum) Value() (driver.Value, error) {
	return string(s), nil
}
