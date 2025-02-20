package models

import "gorm.io/gorm"

type Billing struct {
	gorm.Model
	Week           int     `json:"week"`
	Date           string  `json:"date"`
	PaymentByUnits float64 `json:"payment_by_units" gorm:"default:7.28"`
	// -- Dates TCM
	Tcm              int    `json:"tcm"`
	TcmFullName      string `json:"tcm_full_name"`
	TcmCredentials   string `json:"tcm_credentials"`
	SignatureTcm     string `json:"-"`
	SignatureTcmDate string `json:"signatureTcmDate"`
	// -- Dates TCMS
	Tcms              int    `json:"tcms"`
	TcmsFullName      string `json:"tcms_full_name"`
	SignatureTcms     string `json:"-"`
	SignatureTcmsdate string `json:"signatureTCMSDate"`
	// -- Dates Biller
	Biller               int    `json:"biller"`
	BillerFullName       string `json:"biller_full_name"`
	SignatureBILLER      string `json:"-"`
	SignatureBillerdate  string `json:"signatureBillerDate"`
	Biller2              int    `json:"biller2"`
	Biller2FullName      string `json:"biller2_full_name"`
	SignatureBILLER2     string `json:"-"`
	SignatureBiller2date string `json:"signatureBiller2Date"`
	Biller3              int    `json:"biller3"`
	Biller3FullName      string `json:"biller3_full_name"`
	SignatureBILLER3     string `json:"-"`
	SignatureBiller3date string `json:"signatureBiller3Date"`

	// -- Dates Biller
	Finance               int    `json:"finance"`
	FinanceFullName       string `json:"finance_full_name"`
	SignatureFinance      string `json:"-"`
	SignatureFinancedate  string `json:"signatureFinanceDate"`
	Finance2              int    `json:"finance2"`
	Finance2FullName      string `json:"finance2_full_name"`
	SignatureFinance2     string `json:"-"`
	SignatureFinance2date string `json:"signatureFinance2Date"`
	Finance3              int    `json:"finance3"`
	Finance3FullName      string `json:"finance3_full_name"`
	SignatureFinance3     string `json:"-"`
	SignatureFinance3date string `json:"signatureFinance3Date"`
	// -- Dates Business
	Business int `json:"business" gorm:"default:1"`
}

type NotesBilling struct {
	gorm.Model
	Billing int `json:"billing" gorm:"uniqueIndex:idx_billing_note"`
	Note    int `json:"note" gorm:"uniqueIndex:idx_billing_note"`
}
