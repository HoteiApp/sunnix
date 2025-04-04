package models

type Users struct {
	// gorm.Model
	ID    uint
	Uid   string `json:"uid" gorm:"uniqueIndex:idx_uid,length:255"`     // Username
	Email string `json:"email" gorm:"uniqueIndex:idx_email,length:255"` // Email address
	Nick  string `json:"nick" gorm:"uniqueIndex:idx_nick,length:255"`   // NickName

	ChangePassword bool   `json:"change_password"`                // If the field is true, the user must necessarily change the password
	Status         string `json:"status" gorm:"default:'hiring'"` // Status (active|inactive |hiring)

	SecurityCode bool `json:"security_code"` // Security Code 2fa
	Global       bool `json:"global"`        // Indicates whether the user is global or not
	Approved     bool `json:"approved"`      // Indicates whether the user has been approved or not
	Active       bool `json:"active"`        // Indicates whether the user is active or not

	ReferrerID uint `json:"referrer_id"` // ID of the user who referred this user (optional)
	// System roles (tmp|TCM|SUPERVISOR|QA|HR|MG)
	Roll                string `json:"roll"`
	Credentials         string `json:"credentials"`          // Credentials in case you are a TCM or Supervisor
	TemporarySupervisor bool   `json:"temporary_supervisor"` // If the supervisor does not have credentials, this field indicates that the documents must be signed by the manager.
	// Signature and authorizations to be signed by the user
	Signature         string `json:"-"`                   // Siganture
	HrCanSign         bool   `json:"hr_can_sign"`         // Authorization for the HR to sign by the user
	QaCanSign         bool   `json:"qa_can_sign"`         // Authorization for the QA to sign by the user
	SupervisorCanSign bool   `json:"supervisor_can_sign"` // Authorization for the Supervisor to sign by the user
	// Worker record associated with the user"
	Record uint `json:"record"`
	// If it is tcm, specify the supervisor id
	Supervisor     string  `json:"supervisor"`
	SupervisorName string  `json:"supervisor_name"`
	FixedPay       bool    `json:"fixed_pay"`
	PaymentByUnits float64 `json:"payment_by_units" gorm:"default:7.28"`
	Rent           float64 `json:"rent" gorm:"default:0"`
	Business       string  `json:"business"`
}
