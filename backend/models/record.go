package models

import "gorm.io/gorm"

type EmploymentVerification struct {
	gorm.Model
	WorkerRecordID                uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	QualityWork                   string `json:"quality_work"`
	KnowledgeWork                 string `json:"knowledge_work"`
	AbilityWorkMinimalSupervision string `json:"ability_work_minimal_supervision"`
	Initiative                    string `json:"initiative"`
	TeamworkRelationships         string `json:"teamwork_relationships"`
	Leadership                    string `json:"leadership"`
	ReliabilityDependability      string `json:"reliability_dependability"`
	OralWrittenCommunication      string `json:"oral_written_communication"`
	TimeManagement                string `json:"time_management"`
	Judgment                      string `json:"judgment"`
	AttendancePunctuality         string `json:"attendance_punctuality"`
	WorkplaceConductEthic         string `json:"workplace_conduct_ethic"`
	SupervisorySkills             string `json:"supervisory_skills"`
	Comments                      string `json:"comments"`
	AditionalInformations         string `json:"aditional_informations"`
	WouldYouRehire                string `json:"would_you_rehire"`
	InterviewMode                 string `json:"interview_mode"`
	Interviewer                   string `json:"interviewer"`
	Signature                     string `json:"signature"`
	Date                          string `json:"date"`

	SecondQualityWork                   string `json:"second_quality_work"`
	SecondKnowledgeWork                 string `json:"second_knowledge_work"`
	SecondAbilityWorkMinimalSupervision string `json:"second_ability_work_minimal_supervision"`
	SecondInitiative                    string `json:"second_initiative"`
	SecondTeamworkRelationships         string `json:"second_teamwork_relationships"`
	SecondLeadership                    string `json:"second_leadership"`
	SecondReliabilityDependability      string `json:"second_reliability_dependability"`
	SecondOralWrittenCommunication      string `json:"second_oral_written_communication"`
	SecondTimeManagement                string `json:"second_time_management"`
	SecondJudgment                      string `json:"second_judgment"`
	SecondAttendancePunctuality         string `json:"second_attendance_punctuality"`
	SecondWorkplaceConductEthic         string `json:"second_workplace_conduct_ethic"`
	SecondSupervisorySkills             string `json:"second_supervisory_skills"`
	SecondComments                      string `json:"second_comments"`
	SecondAditionalInformations         string `json:"second_aditional_informations"`
	SecondWouldYouRehire                string `json:"second_would_you_rehire"`
	SecondInterviewMode                 string `json:"second_interview_mode"`
	SecondInterviewer                   string `json:"second_interviewer"`
	SecondSignature                     string `json:"second_signature"`
	SecondDate                          string `json:"second_date"`
}
type Educations struct {
	gorm.Model
	WorkerRecordID    uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	Institution       string `json:"institution"`
	Course            string `json:"course"`
	Started           string `json:"started"`
	Completed         string `json:"completed"`
	SecondInstitution string `json:"second_institution"`
	SecondCourse      string `json:"second_course"`
	SecondStarted     string `json:"second_started"`
	SecondCompleted   string `json:"second_completed"`
	ThirdInstitution  string `json:"third_institution"`
	ThirdCourse       string `json:"third_course"`
	ThirdStarted      string `json:"third_started"`
	ThirdCompleted    string `json:"third_completed"`
}
type EmploymentHistory struct {
	gorm.Model
	WorkerRecordID   uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	Employer         string `json:"employer"`
	Address          string `json:"address"`
	Supervisor       string `json:"supervisor"`
	Phone            string `json:"phone"`
	Period           string `json:"period"`
	Position         string `json:"position"`
	Reason           string `json:"reason"`
	SecondEmployer   string `json:"second_employer"`
	SecondAddress    string `json:"second_address"`
	SecondSupervisor string `json:"second_supervisor"`
	SecondPhone      string `json:"second_phone"`
	SecondPeriod     string `json:"second_period"`
	SecondPosition   string `json:"second_position"`
	SecondReason     string `json:"second_reason"`
}
type PersonalReferences struct {
	gorm.Model
	WorkerRecordID     uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	Name               string `json:"name"`
	Phone              string `json:"phone"`
	Relationship       string `json:"relationship"`
	SecondName         string `json:"second_name"`
	SecondPhone        string `json:"second_phone"`
	SecondRelationship string `json:"second_relationship"`
}
type EmergencyMedical struct {
	gorm.Model
	WorkerRecordID    uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	Name              string `json:"name"`
	Relationship      string `json:"relationship"`
	HomePhone         string `json:"home_phone"`
	CellPhone         string `json:"cell_phone"`
	Employer          string `json:"employer"`
	EmployerPhone     string `json:"employer_phone"`
	KnownAllergies    string `json:"known_allergies"`
	HealthCondition   string `json:"health_condition"`
	Medications       string `json:"medications"`
	PhysiciansName    string `json:"physicians_name"`
	PhysiciansPhone   string `json:"physicians_phone"`
	PreferredHospital string `json:"preferred_hospital"`
	MedicalInsurance  string `json:"medical_insurance"`
	Policy            string `json:"policy"`
}
type NecessaryDocuments struct {
	gorm.Model
	WorkerRecordID              uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	Resume                      bool   `json:"resume" default:"false"`
	DiplomaTranscripts          bool   `json:"diploma_transcripts" default:"false"`
	LicensesCertifications      bool   `json:"licenses_certifications" default:"false"`
	CourseFcb                   bool   `json:"course_fcb" default:"false"`
	ServiceTrainerProvider      bool   `json:"service_trainer_provider" default:"false"`
	ServiceTrainerProviderDate  string `json:"service_trainer_provider_date" default:"00/00/0000"`
	ServiceCprAed               bool   `json:"service_cpr_aed" default:"false"`
	ServiceCprAedDate           string `json:"service_cpr_aed_date" default:"00/00/0000"`
	ServiceOSHA                 bool   `json:"service_osha" default:"false"`
	ServiceOSHADate             string `json:"service_osha_date" default:"00/00/0000"`
	ServiceInfectionControl     bool   `json:"service_infection_control" default:"false"`
	ServiceInfectionControlDate string `json:"service_infection_control_date" default:"00/00/0000"`
	ServiceHivAids              bool   `json:"service_hiv_aids" default:"false"`
	ServiceDomesticViolence     bool   `json:"service_domestic_violence" default:"false"`
	ServiceHIPPA                bool   `json:"service_hippa" default:"false"`
	ServiceSecurityAwarenes     bool   `json:"service_security_awareness" default:"false"`
	ServicAccessCivilRights     bool   `json:"service_access_civil_rights" default:"false"`
	ServiceDeafHard             bool   `json:"service_deaf_hard" default:"false"`
	ServiceFarsCfars            bool   `json:"service_fars_cfars" default:"false"`
	OtherMedicaidCertification  bool   `json:"other_medicaid_certification" default:"false"`
	OtherMedicaidProvider       bool   `json:"other_medicaid_provider" default:"false"`
	OtherDriversLicense         bool   `json:"other_drivers_license" default:"false"`
	OtherSocialSecurityCard     bool   `json:"other_social_security_card" default:"false"`
	OtherProofLegalStatus       bool   `json:"other_proof_legal_status" default:"false"`
	OtherEmployeeIDBadge        bool   `json:"other_employee_id_badge" default:"false"`
	OtherVehicleRegistration    bool   `json:"other_vehicle_registration" default:"false"`
	OtherProofInsurance         bool   `json:"other_proof_insurance" default:"false"`
	FormI9                      bool   `json:"form_i9" default:"false"`
	Formw9                      bool   `json:"form_w9" default:"false"`
	Formw4                      bool   `json:"form_w4" default:"false"`
}
type DirectDeposit struct {
	gorm.Model
	WorkerRecordID       uint   `json:"worker_record_id" gorm:"uniqueIndex"` // ID of the user associated with the worker record
	FinancialInstitution string `json:"financial_institution"`
	RoutingNumber        string `json:"routing_number"`
	AccountNumber        string `json:"account_number"`
	Options              string `json:"options" gorm:"default:'Checking'"`
}
type WorkerRecord struct {
	gorm.Model
	// Personal information ------------------------------------------------------------------
	Uid            string `json:"uid" gorm:"uniqueIndex:idx_uid,length:255"`
	FullName       string `json:"fullname"`
	Email          string `json:"email"`
	Address        string `json:"address"`
	City           string `json:"city"`
	State          string `json:"state"`
	ZipCode        string `json:"zip_code"`
	County         string `json:"county"`
	HomePhone      string `json:"home_phone"`
	CellPhone      string `json:"cell_phone"`
	SocialSecurity string `json:"social_security"`
	Dob            string `json:"dob"`
	// Position Availability ------------------------------------------------------------------
	ApplicationDate       string `json:"application_date"`
	ApplyingAs            string `json:"applying_as" gorm:"default:'Employee'"`
	PositionApplied       string `json:"position_applied" gorm:"default:'TCM'"`
	AvailableStartDate    string `json:"available_start_date"`
	AvailableFor          string `json:"available_for"`
	Question1             string `json:"question1"` // Are you 18 years of age or older?
	Question2             string `json:"question2"` // Are you currently employed?
	Question3             string `json:"question3"` // Do you have a valid driver’s license?
	Question4             string `json:"question4"` // If you are currently employed can we contact other employers?
	Question5             string `json:"question5"` // Do you have a reliable, insured mean of transportation?
	Question6             string `json:"question6"` // Are you willing to travel (locally)in the performing of your duties?
	Question7             string `json:"question7"` // Have you pleaded guilty to a crime within the last 7 years?
	Question8             string `json:"question8"` // Have you been convicted of a crime within the last 7 years?
	Question9             string `json:"question9"` // Have you been on probation within the last 7 years?
	DetailsQuestionsInYES string `json:"details_questions_in_yes"`
	Question10            string `json:"question10"` // Have you ever been accused of or investigatedfor child abuse/neglect?
	ChargedExplain        string `json:"charged_explain"`
	// NOTE check resume
	Question11   string `json:"question11"` // Do you speak any language other than English?
	Question12   string `json:"question12"` // Do you know sign language?
	LanguageList string `json:"language_list"`
	SkillsList   string `json:"skills_list"`
	// Education ------------------------------------------------------------------
	Education Educations `json:"education"`
	// Employment History ---------------------------------------------------------
	EmploymentHistory EmploymentHistory `json:"employment_history"`
	// Personal References ---------------------------------------------------------
	PersonalReferences PersonalReferences `json:"personal_references"`
	// Emergency Medical Information ----------------------------------------------
	EmergencyMedical EmergencyMedical `json:"emergency_medical"`
	// Necessary Documents ----------------------------------------------
	NecessaryDocuments NecessaryDocuments `json:"necessary_documents"`
	// Direct Deposit ----------------------------------------------
	DirectDeposit DirectDeposit `json:"direct_deposit"`
	// Employment Verification------------------------------------------------
	EmploymentVerification EmploymentVerification `json:"employment_verification"`
}
