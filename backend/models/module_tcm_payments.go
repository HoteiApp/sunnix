package models

import "gorm.io/gorm"

type ModuleTcmRateRange struct {
	gorm.Model
	From   float64 `json:"from"`
	To     float64 `json:"to"`
	Rate   float64 `json:"rate"`
	Active bool    `json:"active"`
}

type ModuleTcmPayments struct {
	gorm.Model
	Fortnight int    `json:"fortnight"`
	Date      string `json:"date"`

	Rent float64 `json:"rent" gorm:"default:100"`
	Rate float64 `json:"rate" gorm:"default:12.07"`

	UnitsPaid int     `json:"units_paid"`
	HoursPaid float64 `json:"hours_paid"`

	UnitsPaidRetroactive int     `json:"units_paid_retroactive"`
	HoursPaidRetroactive float64 `json:"hours_paid_retroactive"`

	Paid   float64 `json:"paid"`
	Profit float64 `json:"profit"`

	Vacation float64 `json:"vacation"`
	// Para el biliador
	PercentageBillings float64 `json:"percentage_billings" gorm:"default:0.03"`
	PaidBillings       float64 `json:"paid_billings"`

	Visible  bool `json:"visible"`
	Approved bool `json:"approved"`
}

type ModuleTcmPaymentsRateRange struct {
	gorm.Model
	Payment int     `json:"payment"`
	Range   int     `json:"range"`
	From    float64 `json:"from"`
	To      float64 `json:"to"`
	Rate    float64 `json:"rate"`
}

type ModuleTcmPaymentsTcm struct {
	gorm.Model
	Payment  int    `json:"payment"`
	Tcm      uint   `json:"tcm"`
	Business string `json:"business"`
	FixedPay bool   `json:"fixed_pay"`

	Rate          float64 `json:"rate" gorm:"default:7.28"`
	RemainingRate float64 `json:"remaining_rate" gorm:"default:4.79"`
	// TODO El campo rent es para los tcms que no son fijos
	Rent float64 `json:"rent" gorm:"default:0"`

	Units            int `json:"units"`
	UnitsRetroactive int `json:"units_retroactive"`

	UnitsPaid int     `json:"units_paid"`
	HoursPaid float64 `json:"hours_paid"`

	// UnitsPending int     `json:"units_pending"`

	Paid     float64 `json:"paid"`
	Profit   float64 `json:"profit"`
	Vacation float64 `json:"vacation"`

	Visible   bool `json:"visible"`
	Approved  bool `json:"approved"`
	Collected bool `json:"collected"`
}

type ModuleTcmNotesPayments struct {
	gorm.Model
	PaymentTcm int `json:"payment_tcm"`
	Note       int `json:"note"`

	Rate float64 `json:"rate"`

	Retroactive bool `json:"retroactive"`

	Units int `json:"units"`

	UnitsPaid    int    `json:"units_paid"`
	UnitsPending int    `json:"units_pending"`
	Paid         string `json:"paid"`
	PaymentDate  string `json:"payment_date"`

	UnitsPaid2    int    `json:"units_paid2"`
	UnitsPending2 int    `json:"units_pending2"`
	Paid2         string `json:"paid2"`
	PaymentDate2  string `json:"payment_date2"`

	UnitsPaid3    int    `json:"units_paid3"`
	UnitsPending3 int    `json:"units_pending3"`
	Paid3         string `json:"paid3"`
	PaymentDate3  string `json:"payment_date3"`
}
