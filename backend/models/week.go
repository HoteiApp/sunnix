package models

import "gorm.io/gorm"

type Fortnight struct {
	gorm.Model
	Start       string `json:"start"`
	End         string `json:"end"`
	StartSecond string `json:"start_second"`
	EndSecond   string `json:"end_second"`

	PayDate string `json:"pay_date"`
	Active  bool   `json:"acive"`
	Paid    bool   `json:"paid"`
}
type Week struct {
	gorm.Model
	Start  string `json:"start"`
	End    string `json:"end"`
	Active bool   `json:"acive"`
}
