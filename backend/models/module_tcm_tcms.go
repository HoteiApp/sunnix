package models

type OutTCM struct {
	ID       int            `json:"id"`
	Info     WorkerRecord   `json:"info"`
	User     Users          `json:"user"`
	Clients  []OutClients   `json:"clients"`
	BillData BillingDataOUT `json:"bill"`
}

type OutTCMS struct {
	ID      int          `json:"id"`
	User    Users        `json:"user"`
	Info    WorkerRecord `json:"info"`
	ListTcm []OutTCM     `json:"list_tcm"`
}

type OutListTCMS struct {
	ID       int          `json:"id"`
	User     Users        `json:"user"`
	Info     WorkerRecord `json:"info"`
	TotlaTcm int          `json:"total_tcm"`
}
