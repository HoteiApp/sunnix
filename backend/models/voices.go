package models

type S3DeleteObj struct {
	Key  string `json:"key"`
	Name string `json:"name"`
}

type S3VoicesURL struct {
	Mode         string `json:"mode"`
	From         string `json:"from"`
	To           string `json:"to"`
	Module       string `json:"module"`
	Component    string `json:"component"`
	Id_component string `json:"id_component"`
}

type ExtractIdentities struct {
	From string `json:"from"`
	To   string `json:"to"`
	Key  string `json:"Key"`
	URL  string `json:"URL"`
}
