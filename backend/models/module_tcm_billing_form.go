package models

type FormRequestBill struct {
	ID     int    `json:"id"`
	Number string `json:"number"`
}

type FormRequestInvoicedBill struct {
	ID       int    `json:"id"`
	Invoiced bool   `json:"invoiced"`
	Invoice  string `json:"invoice"`
}

type FormRequestpaidBill struct {
	ID     int    `json:"id"`
	Paid   string `json:"paid"`
	Number string `json:"number"`
}
type FormRequestpaidUnitsBill struct {
	ID        int    `json:"id"`
	PaidUnits int64  `json:"paidUnits"`
	Number    string `json:"number"`
}

type FormRequestPeriodBill struct {
	ID     int      `json:"id"`
	Period []string `json:"period"`
}

type FormRequestBusinessConfig struct {
	ID       int     `json:"id"`
	Rent     float64 `json:"rent"`
	Business string  `json:"business"`
}

type FormRequestViewBill struct {
	Tcm  int    `json:"tcm"`
	Date string `json:"date"`
}
