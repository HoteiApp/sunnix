package models

type FormRegister struct {
	Requestregister struct {
		Username string `json:"username"`
		Password string `json:"password"`
	} `json:"requestRegister"`
}
