package models

type ActiveUser struct {
	User            Users
	Record          WorkerRecord
	Signature       string
	WeekActive      Week
	FortnightActive Fortnight
	Events          []Event
	Conversation    []OutConversations
}

type Statistics struct {
	TotalUsers       int `json:"total_users"`
	UsersHiring      int
	UsersApplication int
	UsersContracted  int
	UsersInactive    int
}
