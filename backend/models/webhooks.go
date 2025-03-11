package models

// Estructura para parsear el webhook de GitHub
type GitHubWebhook struct {
	Action     string `json:"action"`
	Message    string `json:"message"`
	Repository struct {
		FullName string `json:"full_name"`
	} `json:"repository"`
	Sender struct {
		Login string `json:"login"`
	} `json:"sender"`
}

// Estructura para parsear el webhook de Alert
type AlertWebhook struct {
	Action  string `json:"action"`
	Message string `json:"message"`
	User    string `json:"user"`
	Service string `json:"service"`
}
