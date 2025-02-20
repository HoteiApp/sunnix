package models

type FormNewSupervisions struct {
	NewSupervision struct {
		User int    `json:"user"`
		Date string `json:"date"`
	} `json:"newSupervisons"`
}

type FormSupervisionsEdit struct {
	ID   int    `json:"id"`
	Date string `json:"date"`
}

type FormSupervisionsActivate struct {
	ID string `json:"id"`
}
