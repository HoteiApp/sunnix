package models

type BillingOUT struct {
	Id      int     `json:"id"`
	Week    int     `json:"week"`
	Date    string  `json:"date"`
	Units   int     `json:"units"`
	PayRate float64 `json:"pay_rate"`
	Hours   float64 `json:"hours"`
	WeekPay float64 `json:"week_pay"`
	// -- Dates TCM
	Tcm              int    `json:"tcm"`
	TcmFullName      string `json:"tcm_full_name"`
	TcmCredentials   string `json:"tcm_credentials"`
	SignatureTcm     string `json:"tcm_signature"`
	SignatureTcmDate string `json:"signatureTcmDate"`
	// -- Dates TCMS
	Tcms              int    `json:"tcms"`
	TcmsFullName      string `json:"tcms_full_name"`
	SignatureTcms     string `json:"tcms_signature"`
	SignatureTcmsdate string `json:"signatureTCMSDate"`
	// -- Dates Biller
	Biller               int    `json:"biller"`
	BillerFullName       string `json:"biller_full_name"`
	SignatureBILLER      string `json:"biller_signature"`
	SignatureBillerdate  string `json:"signatureBillerDate"`
	Biller2              int    `json:"biller2"`
	Biller2FullName      string `json:"biller2_full_name"`
	SignatureBILLER2     string `json:"biller2_signature"`
	SignatureBiller2date string `json:"signatureBiller2Date"`
	Biller3              int    `json:"biller3"`
	Biller3FullName      string `json:"biller3_full_name"`
	SignatureBILLER3     string `json:"biller3_signature"`
	SignatureBiller3date string `json:"signatureBiller3Date"`

	// -- Dates Finance
	Finance               int    `json:"finance"`
	FinanceFullName       string `json:"finance_full_name"`
	SignatureFinance      string `json:"finance_signature"`
	SignatureFinancedate  string `json:"signatureFinanceDate"`
	Finance2              int    `json:"finance2"`
	Finance2FullName      string `json:"finance2_full_name"`
	SignatureFinance2     string `json:"finance2_signature"`
	SignatureFinance2date string `json:"signatureFinance2Date"`
	Finance3              int    `json:"finance3"`
	Finance3FullName      string `json:"finance3_full_name"`
	SignatureFinance3     string `json:"finance3_signature"`
	SignatureFinance3date string `json:"signatureFinance3Date"`
}

type BillingDataOUT struct {
	Week        Week                        `json:"week"`
	Clients     []OutClientsNotesWeekActive `json:"clients"`
	Billing     BillingOUT                  `json:"billing"`
	Notes       []NotesOut                  `json:"notes"`
	AmountNotes int                         `json:"amount_notes"`
	Units       int                         `json:"units"`
	Hours       float64                     `json:"hours"`
	PayRate     float64                     `json:"pay_rate"`
	WeekPay     float64                     `json:"week_pay"`
}
