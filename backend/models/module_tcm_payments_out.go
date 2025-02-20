package models

type ModuleTcmPaymentsOut struct {
	Id        int     `json:"id"`
	Fortnight int     `json:"fortnight"`
	Date      string  `json:"date"`
	Rate      float64 `json:"rate"`
	Rent      float64 `json:"rent"`

	UnitsPaid    int                          `json:"units_paid"`
	HoursPaid    float64                      `json:"hours_paid"`
	Paid         float64                      `json:"paid"`
	Profit       float64                      `json:"profit"`
	Vacation     float64                      `json:"vacation"`
	PaidBillings float64                      `json:"paid_billings"`
	Range        []ModuleTcmPaymentsRateRange `json:"range"`
	Visible      bool                         `json:"visible"`
	Approved     bool                         `json:"approved"`
	Tcm          []ModuleTcmPaymentsTcmOut
}

type ModuleTcmPaymentsTcmOut struct {
	Id       int    `json:"id"`
	Payment  int    `json:"payment"`
	Tcm      uint   `json:"tcm"`
	Business string `json:"business"`

	TcmName   string    `json:"tcm_name"`
	Fortnight Fortnight `json:"fortnight"`
	Date      string    `json:"date"`

	FixedPay bool `json:"fixed_pay"`

	Rate          float64 `json:"rate"`
	RemainingRate float64 `json:"remaining_rate"`

	Rent float64 `json:"rent"`

	Units            int `json:"units"`
	UnitsRetroactive int `json:"units_retroactive"`

	UnitsPaid    int     `json:"units_paid"`
	HoursPaid    float64 `json:"hours_paid"`
	UnitsPending int     `json:"units_pending"`

	Paid     float64 `json:"paid"`
	Profit   float64 `json:"profit"`
	Vacation float64 `json:"vacation"`

	Range []ModuleTcmPaymentsRateRange `json:"range"`

	Visible   bool                      `json:"visible"`
	Approved  bool                      `json:"approved"`
	Collected bool                      `json:"collected"`
	Tcms      []ModuleTcmPaymentsTcmOut // Add this line
}

type ModuleTcmNotesPaymentsout struct {
	Id         int `json:"id"`
	PaymentTcm int `json:"payment_tcm"`

	Note int `json:"note"`

	Sure     string `json:"sure"`
	SureName string `json:"sure_name"`

	Client      string  `json:"client"`
	Retroactive bool    `json:"retroactive"`
	Rate        float64 `json:"rate"`

	Date         string `json:"date"`
	Units        int    `json:"units"`
	UnitsPaid    int    `json:"units_paid"`
	UnitsPending int    `json:"units_pending"`
	Paid         string `json:"paid"`
	PaidDate     string `json:"paid_date"`

	UnitsPaid2    int    `json:"units_paid2"`
	UnitsPending2 int    `json:"units_pending2"`
	Paid2         string `json:"paid2"`
	PaidDate2     string `json:"paid_date2"`

	UnitsPaid3    int    `json:"units_paid3"`
	UnitsPending3 int    `json:"units_pending3"`
	Paid3         string `json:"paid3"`
	PaidDate3     string `json:"paid_date3"`
}
