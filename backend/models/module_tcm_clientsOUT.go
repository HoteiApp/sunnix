package models

type OutSCMTcm struct {
	ID        int    `json:"id"`
	FullName  string `json:"full_name"`
	Signature string `json:"signature"`
	Active    bool   `json:"active"`
}
type OutSCMMedical struct {
	ID int `json:"id"`

	MedicalPcp        string `json:"medical_pcp"`
	MedicalPcpAddress string `json:"medical_pcp_address"`
	MedicalPcpPhone   string `json:"medical_pcp_phone"`

	MedicalPsychiatrisy        string `json:"medical_psychiatrisy"`
	MedicalPsychiatrisyAddress string `json:"medical_psychiatrisy_address"`
	MedicalPsychiatrisyPhone   string `json:"medical_psychiatrisy_phone"`
}

type OutSCMMental struct {
	ID                  int    `json:"id"`
	Client              uint   `json:"client_id"` // ID of the client
	Scm                 uint   `json:"scm"`
	MentalPrimary       string `json:"mental_primary"`
	MentalPrimaryDate   string `json:"mental_primary_date"`
	MentalSecondary     string `json:"mental_secondary"`
	MentalSecondaryDate string `json:"mental_secondary_date"`
}

type OutSCMSure struct {
	ID       int    `json:"id"`
	Scm      uint   `json:"scm"`
	PlanName string `json:"plan_name"`
	PlanID   string `json:"plan_id"`
	Auth     bool   `json:"auth"`
	AuthDate string `json:"auth_date"`
	Unit     int64  `json:"unit"`
	Active   bool   `json:"active"`
}

type OutClientSCMSp struct {
	ID                  int     `json:"id"`
	Client              int     `json:"client_id"` // ID of the client
	Scm                 uint    `json:"scm"`
	Developmentdate     string  `json:"developmentDate"`
	Axiscode            string  `json:"axisCode"`
	Axiscodedescription string  `json:"axisCodeDescription"`
	Tcm                 int     `json:"tcm"`
	Goal1               SpGoal1 `json:"goal1"`
	Goal2               SpGoal2 `json:"goal2"`
	Goal3               SpGoal3 `json:"goal3"`
	Goal4               SpGoal4 `json:"goal4"`
	Goal5               SpGoal5 `json:"goal5"`
	Goal6               SpGoal6 `json:"goal6"`
	Goal7               SpGoal7 `json:"goal7"`
	Goal8               SpGoal8 `json:"goal8"`
	Nametcm             string  `json:"nameTCM"`
	Categorytcm         string  `json:"categoryTCM"`
	Signaturetcm        string  `json:"signatureTcm"`
	Signaturetcmdate    string  `json:"signatureTcmDate"`

	Supervisor              int    `json:"supervisor"`
	NameSupervisor          string `json:"nameSupervisor"`
	CategorySupervisor      string `json:"categorySupervisor"`
	Signaturesupervisor     string `json:"signatureSupervisor"`
	Signaturesupervisordate string `json:"signatureSupervisorDate"`

	Qa              int    `json:"qa"`
	Signatureqa     string `json:"signatureQa"`
	Signatureqadate string `json:"signatureQaDate"`
}

type OutClientSCM struct {
	ID          int    `json:"id"`
	Status      string `json:"status"`
	Doa         string `json:"doa"`
	ClosingDate string `json:"closing_date"`
	Tcm         int    `json:"tcm"`
}

type OutSCMCertification struct {
	ID int `json:"id"`

	Client uint `json:"client_id"` // ID of the client
	Scm    uint `json:"scm"`

	Select1  bool `json:"select_1"`
	Select2  bool `json:"select_2"`
	Select3  bool `json:"select_3"`
	Select4  bool `json:"select_4"`
	Select5  bool `json:"select_5"`
	Select6  bool `json:"select_6"`
	Select7  bool `json:"select_7"`
	Select8  bool `json:"select_8"`
	Select8a bool `json:"select_8a"`
	Select8b bool `json:"select_8b"`
	Select8c bool `json:"select_8c"`
	Select8d bool `json:"select_8d"`
	Select8e bool `json:"select_8e"`
	Select9  bool `json:"select_9"`
	// -- TCM
	Tcm         int    `json:"tcm"`
	Nametcm     string `json:"nameTCM"`
	Categorytcm string `json:"categoryTCM"`
	Signtcm     string `json:"signtcm"`
	Datetcm     string `json:"dateTcm"`
	// -- TCMS
	Supervisor         int    `json:"supervisor"`
	NameSupervisor     string `json:"nameSupervisor"`
	Categorysupervisor string `json:"categorySupervisor"`
	Signsupervisor     string `json:"signsupervisor"`
	Datesupervisor     string `json:"dateSupervisor"`
	// -- QA
	Qa     string `json:"QA"`
	Signqa string `json:"signqa"`
}

type OutSCMAssessment struct {
	ID     int  `json:"id"`
	Client uint `json:"client_id"` // ID of the client
	Scm    uint `json:"scm"`

	Sourceinforemationclient               string `json:"sourceInforemationClient"`
	Sourceinforemationdfc                  string `json:"sourceInforemationDfc"`
	Sourceinforemationbff                  string `json:"sourceInforemationBFF"`
	Sourceinforemationbffisyes             string `json:"sourceInforemationBFFisYes"`
	Sourceinforemationcpa                  string `json:"sourceInforemationCpa"`
	Sourceinforemationsdp                  string `json:"sourceInforemationSdp"`
	Sourceinforemationpp                   string `json:"sourceInforemationPp"`
	Sourceinforemationppisyes              string `json:"sourceInforemationPpisYes"`
	Sourceinforemationff                   string `json:"sourceInforemationFf"`
	Sourceinforemationldrsi1               bool   `json:"sourceInforemationLdrsi1"`
	Sourceinforemationldrsi2               bool   `json:"sourceInforemationLdrsi2"`
	Sourceinforemationldrsi3               bool   `json:"sourceInforemationLdrsi3"`
	Sourceinforemationldrsi4               bool   `json:"sourceInforemationLdrsi4"`
	Sourceinforemationldrsi5               bool   `json:"sourceInforemationLdrsi5"`
	Sourceinforemationldrsi6               bool   `json:"sourceInforemationLdrsi6"`
	Sourceinforemationldrsi7               bool   `json:"sourceInforemationLdrsi7"`
	Sourceinforemationldrsi8               bool   `json:"sourceInforemationLdrsi8"`
	SourceinforemationldrsiOther           string `json:"sourceInforemationLdrsiOther"`
	Presentproblems                        string `json:"presentProblems"`
	Clientlegalrepresentative              string `json:"clientLegalRepresentative"`
	Listrecipientstrengths                 string `json:"listRecipientStrengths"`
	Listrecipientstrengths1                string `json:"listRecipientStrengths1"`
	Listrecipientstrengths2                string `json:"listRecipientStrengths2"`
	Listrecipientstrengths3                string `json:"listRecipientStrengths3"`
	Listrecipientstrengths4                string `json:"listRecipientStrengths4"`
	Listrecipientweakness                  string `json:"listRecipientweakness"`
	Listrecipientweakness1                 string `json:"listRecipientweakness1"`
	Listrecipientweakness2                 string `json:"listRecipientweakness2"`
	Listrecipientweakness3                 string `json:"listRecipientweakness3"`
	Listrecipientweakness4                 string `json:"listRecipientweakness4"`
	Listresources                          string `json:"listResources"`
	Psyfamily1A                            string `json:"psyFamily1A"`
	Psyfamily1Aroom                        string `json:"psyFamily1Aroom"`
	Psyfamily1Abath                        string `json:"psyFamily1Abath"`
	Psyfamily1B                            string `json:"psyFamily1B"`
	Psyfamily1C                            string `json:"psyFamily1C"`
	Psyfamily1Cmpsr                        string `json:"psyFamily1Cmpsr"`
	Psyfamily1D                            string `json:"psyFamily1D"`
	Psyfamily1Dmpsb                        string `json:"psyFamily1Dmpsb"`
	Psyfamily1E                            string `json:"psyFamily1E"`
	Psyfamily1Eifyes                       string `json:"psyFamily1EifYes"`
	Psyfamily2A                            string `json:"psyFamily2A"`
	Psyfamily2B                            string `json:"psyFamily2B"`
	Psyfamily3                             string `json:"psyFamily3"`
	Psyfamily3Ifyes                        string `json:"psyFamily3ifYes"`
	Psyfamily4                             string `json:"psyFamily4"`
	Psyfamily51                            bool   `json:"psyFamily5_1"`
	Psyfamily52                            bool   `json:"psyFamily5_2"`
	Psyfamily53                            bool   `json:"psyFamily5_3"`
	Psyfamily54                            bool   `json:"psyFamily5_4"`
	Psyfamily55                            bool   `json:"psyFamily5_5"`
	Psyfamily56                            bool   `json:"psyFamily5_6"`
	Psyfamily57                            bool   `json:"psyFamily5_7"`
	Psyfamily58                            bool   `json:"psyFamily5_8"`
	Psyfamily59                            bool   `json:"psyFamily5_9"`
	Psyfamily510                           bool   `json:"psyFamily5_10"`
	Psyfamily511                           bool   `json:"psyFamily5_11"`
	Psyfamily512                           bool   `json:"psyFamily5_12"`
	Psyfamily513                           bool   `json:"psyFamily5_13"`
	Psyfamily514                           bool   `json:"psyFamily5_14"`
	Psyfamily515                           bool   `json:"psyFamily5_15"`
	Psyfamily516                           bool   `json:"psyFamily5_16"`
	Psymedicalhistorycountryp              string `json:"psyMedicalHistoryCountryP"`
	Psymedicalhistoryusap                  string `json:"psyMedicalHistoryUsaP"`
	Psymedicalhistorycountry1              string `json:"psyMedicalHistoryCountry_1"`
	Psymedicalhistorycountry1Ifyes         string `json:"psyMedicalHistoryCountry_1ifYes"`
	Psymedicalhistoryusa1                  string `json:"psyMedicalHistoryUsa_1"`
	Psymedicalhistoryusa1Ifyes             string `json:"psyMedicalHistoryUsa_1ifYes"`
	Psymedicalhistorycountry2              string `json:"psyMedicalHistoryCountry_2"`
	Psymedicalhistoryusa2                  string `json:"psyMedicalHistoryUsa_2"`
	Psymedicalhistorycountry3              string `json:"psyMedicalHistoryCountry_3"`
	Psymedicalhistoryusa3                  string `json:"psyMedicalHistoryUsa_3"`
	Psymedicalhistorycountry4              string `json:"psyMedicalHistoryCountry_4"`
	Psymedicalhistoryusa4                  string `json:"psyMedicalHistoryUsa_4"`
	Psymedicalhistorycountry5              string `json:"psyMedicalHistoryCountry_5"`
	Psymedicalhistorycountry5Ifyes         string `json:"psyMedicalHistoryCountry_5ifYes"`
	Psymedicalhistoryusa5                  string `json:"psyMedicalHistoryUsa_5"`
	Psymedicalhistoryusa5Ifyes             string `json:"psyMedicalHistoryUsa_5ifYes"`
	Psymedicalhistorycountry6              string `json:"psyMedicalHistoryCountry_6"`
	Psymedicalhistorycountry6Ifyes         string `json:"psyMedicalHistoryCountry_6ifYes"`
	Psymedicalhistoryusa6                  string `json:"psyMedicalHistoryUsa_6"`
	Psymedicalhistoryusa6Ifyes             string `json:"psyMedicalHistoryUsa_6ifYes"`
	Psymedicalhistorycountry7              string `json:"psyMedicalHistoryCountry_7"`
	Psymedicalhistoryusa7                  string `json:"psyMedicalHistoryUsa_7"`
	Psymedicalhistorycountry8              string `json:"psyMedicalHistoryCountry_8"`
	Psymedicalhistoryusa8                  string `json:"psyMedicalHistoryUsa_8"`
	Psymedicalhistorycountry9              string `json:"psyMedicalHistoryCountry_9"`
	Psymedicalhistoryusa9                  string `json:"psyMedicalHistoryUsa_9"`
	Psymedicalhistorycountry10             string `json:"psyMedicalHistoryCountry_10"`
	Psymedicalhistorycountry10Ifyes        string `json:"psyMedicalHistoryCountry_10ifYes"`
	Psymedicalhistoryusa10                 string `json:"psyMedicalHistoryUsa_10"`
	Psymedicalhistoryusa10Ifyes            string `json:"psyMedicalHistoryUsa_10ifYes"`
	PsymedicalhistoryfamilyMotherMental    string `json:"psyMedicalHistoryFamily_Mother_Mental"`
	PsymedicalhistoryfamilyMotherMedical   string `json:"psyMedicalHistoryFamily_Mother_Medical"`
	PsymedicalhistoryfamilyFatherMental    string `json:"psyMedicalHistoryFamily_Father_Mental"`
	PsymedicalhistoryfamilyFatherMedical   string `json:"psyMedicalHistoryFamily_Father_Medical"`
	PsymedicalhistoryfamilySiblingsMental  string `json:"psyMedicalHistoryFamily_Siblings_Mental"`
	PsymedicalhistoryfamilySiblingsMedical string `json:"psyMedicalHistoryFamily_Siblings_Medical"`
	PsymedicalhistoryfamilyOtherMental     string `json:"psyMedicalHistoryFamily_Other_Mental"`
	PsymedicalhistoryfamilyOtherMedical    string `json:"psyMedicalHistoryFamily_Other_Medical"`
	Currentmedication1                     string `json:"currentMedication1"`
	Dosage1                                string `json:"dosage1"`
	Prescribing1                           string `json:"prescribing1"`
	Currentmedication2                     string `json:"currentMedication2"`
	Dosage2                                string `json:"dosage2"`
	Prescribing2                           string `json:"prescribing2"`
	Currentmedication3                     string `json:"currentMedication3"`
	Dosage3                                string `json:"dosage3"`
	Prescribing3                           string `json:"prescribing3"`
	Currentmedication4                     string `json:"currentMedication4"`
	Dosage4                                string `json:"dosage4"`
	Prescribing4                           string `json:"prescribing4"`
	Currentmedication5                     string `json:"currentMedication5"`
	Dosage5                                string `json:"dosage5"`
	Prescribing5                           string `json:"prescribing5"`
	Currentmedication6                     string `json:"currentMedication6"`
	Dosage6                                string `json:"dosage6"`
	Prescribing6                           string `json:"prescribing6"`
	Currentmedication7                     string `json:"currentMedication7"`
	Dosage7                                string `json:"dosage7"`
	Prescribing7                           string `json:"prescribing7"`
	Currentmedication8                     string `json:"currentMedication8"`
	Dosage8                                string `json:"dosage8"`
	Prescribing8                           string `json:"prescribing8"`
	Currentmedication9                     string `json:"currentMedication9"`
	Dosage9                                string `json:"dosage9"`
	Prescribing9                           string `json:"prescribing9"`
	Currentmedication10                    string `json:"currentMedication10"`
	Dosage10                               string `json:"dosage10"`
	Prescribing10                          string `json:"prescribing10"`
	SubstanceAlcohol                       string `json:"substance_Alcohol"`
	SubstanceMethadone                     string `json:"substance_Methadone"`
	SubstanceStimulants                    string `json:"substance_Stimulants"`
	SubstanceHallucinogens                 string `json:"substance_Hallucinogens"`
	SubstanceNarcotics                     string `json:"substance_Narcotics"`
	SubstanceTranquilizers                 string `json:"substance_Tranquilizers"`
	SubstanceInhalants                     string `json:"substance_Inhalants"`
	SubstancePain                          string `json:"substance_Pain"`
	SubstanceOther                         string `json:"substance_Other"`
	SubstanceMarijuana                     string `json:"substance_Marijuana"`
	SubstanceSleeping                      string `json:"substance_Sleeping"`
	SubstanceOther1                        string `json:"substance_Other1"`
	SubstanceFamily                        string `json:"substance_Family"`
	EducationPrimaryleng                   string `json:"education_PrimaryLeng"`
	EducationOtherlengs                    string `json:"education_OtherLengs"`
	EducationCurrentSchool                 string `json:"education_Current_School"`
	EducationGradeLevel                    string `json:"education_Grade_Level"`
	EducationSpecialEd                     string `json:"education_Special_Ed"`
	EducationListGrades1                   string `json:"education_List_Grades1"`
	EducationListGrades2                   string `json:"education_List_Grades2"`
	EducationListGrades3                   string `json:"education_List_Grades3"`
	WorkCurrent                            string `json:"work_Current"`
	WorkPosition                           string `json:"work_Position"`
	WorkTime                               string `json:"work_Time"`
	WorkHistory1                           string `json:"work_History1"`
	WorkHistory2                           string `json:"work_History2"`
	WorkHistory3                           string `json:"work_History3"`
	ServicesBeing1                         bool   `json:"servicesBeing1"`
	ServicesBeing2                         bool   `json:"servicesBeing2"`
	ServicesBeing3                         bool   `json:"servicesBeing3"`
	ServicesBeing4                         bool   `json:"servicesBeing4"`
	ServicesBeing5                         bool   `json:"servicesBeing5"`
	ServicesBeing6                         bool   `json:"servicesBeing6"`
	ServicesBeing7                         bool   `json:"servicesBeing7"`
	ServicesBeing8                         bool   `json:"servicesBeing8"`
	ServicesBeing9                         bool   `json:"servicesBeing9"`
	ServicesBeing10                        bool   `json:"servicesBeing10"`
	Servicesbeingother                     string `json:"servicesBeingOther"`
	Describeclientdoes                     string `json:"describeClientDoes"`
	Describeclientconsidered               string `json:"describeClientConsidered"`
	Describeclientpeers                    string `json:"describeClientPeers"`
	Describeclientinvolvement              string `json:"describeClientInvolvement"`
	Describeclientinvolvementifyes         string `json:"describeClientInvolvementifYes"`
	Describeclientassociates               string `json:"describeClientAssociates"`
	Describeclientrelationship             string `json:"describeClientrelationship"`
	Describeclientrelationshipmany         string `json:"describeClientrelationshipMany"`
	Describeclientdescribe                 string `json:"describeClientDescribe"`
	Recipent1                              string `json:"recipent1"`
	Recipent2                              string `json:"recipent2"` // tests
	Recipent3                              string `json:"recipent3"`
	Recipent4                              string `json:"recipent4"`
	Recipent5                              string `json:"recipent5"`
	Recipent6                              string `json:"recipent6"`
	Recipent7                              string `json:"recipent7"`
	Recipent8                              string `json:"recipent8"`
	Discussion                             string `json:"discussion"`
	Describeservicepsychiatrist            string `json:"describeServicePsychiatrist"`
	Describeservicepcp                     string `json:"describeServicePCP"`
	Describeservicepsr                     string `json:"describeServicePSR"`
	Describeserviceother                   string `json:"describeServiceOther"`
	Signatureopt                           string `json:"signatureOpt"`

	Tcm              int    `json:"tcm"`
	Nametcm          string `json:"nameTCM"`
	Categorytcm      string `json:"categoryTCM"`
	Signaturetcm     string `json:"signatureTcm"`
	Signaturetcmdate string `json:"signatureTcmDate"`

	Supervisor              int    `json:"supervisor"`
	NameSupervisor          string `json:"nameSupervisor"`
	CategorySupervisor      string `json:"categorySupervisor"`
	Signaturesupervisor     string `json:"signatureSupervisor"`
	Signaturesupervisordate string `json:"signatureSupervisorDate"`

	Qa              int    `json:"qa"`
	Signatureqa     string `json:"signatureQa"`
	Signatureqadate string `json:"signatureQaDate"`
}
type OutClientSCMSure struct {
	ID       int    `json:"id"`
	Client   uint   `json:"client_id"` // ID of the client
	Scm      uint   `json:"scm"`
	PlanName string `json:"plan_name"`
	PlanID   string `json:"plan_id"`
	// --Posibilities
	Auth bool `json:"auth"`
	Deny bool `json:"deny"`
	// -- Dates
	AuthDateStart string `json:"auth_date_start"`
	AuthDateEnd   string `json:"auth_date_end"`

	Unit      int64 `json:"unit"`
	TimeRange int64 `json:"time_range"`
	// -- Status
	Active bool                      `json:"active"`
	Files  ClientSCMSureFilesInCloud `json:"files"`
}
type OutClientSCMActive struct {
	ID              int           `json:"id"`
	Status          string        `json:"status"`
	Doa             string        `json:"doa"`
	ClosingDate     string        `json:"closing_date"`
	TcmID           int           `json:"tcm_id"`
	TCM             ClienteSCMTcm `json:"tcm"`
	Demografic      ClientSCMDemografic
	SureActive      ClientSCMSure               `json:"sure_active"`
	NotesSureActive []Notes                     `json:"notes_sure_active"`
	UnitsConsumed   int64                       `json:"units_consumed"`
	Sure            []ClientSCMSure             `json:"sure"`
	Files           []ClientSCMSureFilesInCloud `json:"files"`
	Medical         ClientSCMMedical            `json:"medical"`
	Mental          ClientSCMMental             `json:"Mental"`
	// Documents
	Certification OutSCMCertification `json:"certification"`
	Assessment    OutSCMAssessment    `json:"assessment"`
	Sp            OutClientSCMSp      `json:"sp"`
}

type OutClients struct {
	ID              uint   `json:"id"`          // ID of the user who referred this user (optional)
	Mr              int    `json:"mr"`          // Medical Record Number
	ReferrerID      uint   `json:"referrer_id"` // ID of the user who referred this user (optional)
	ReferringAgency string `json:"referring_agency"`
	ReferringPerson string `json:"referring_person"`
	CellPhone       string `json:"cell_phone"`
	Fax             string `json:"fax"`
	Email           string `json:"email"`
	Date            string `json:"date"`

	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	SS        string `json:"ss"`
	DOB       string `json:"dob"`
	Sexo      string `json:"sexo"`
	Race      string `json:"race"`

	Address string `json:"address"`
	State   string `json:"state"`
	ZipCode string `json:"zip_code"`

	Phone    string `json:"phone"`
	School   string `json:"school"`
	Lenguage string `json:"lenguage"`

	SingClient string `json:"sign_client"`

	LegalGuardian     string `json:"legal_guardian"`
	Relationship      string `json:"relationship"`
	CellPhoneGuardian string `json:"cell_phone_guardian"`
	SingGuardian      string `json:"sign_guardian"`

	Medicaid       string `json:"medicaid"`
	GoldCardNumber string `json:"gold_card_number"`
	Medicare       string `json:"medicare"`

	Scm []OutClientSCM `json:"scm"`
}
type OutClientsSupervise struct {
	ID uint `json:"id"` // ID of the user who referred this user (optional)

	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	SS        string `json:"ss"`
	DOB       string `json:"dob"`
	Sexo      string `json:"sexo"`
	Race      string `json:"race"`

	Address string `json:"address"`
	State   string `json:"state"`
	ZipCode string `json:"zip_code"`

	Phone    string `json:"phone"`
	School   string `json:"school"`
	Lenguage string `json:"lenguage"`

	SingClient string `json:"sign_client"`

	LegalGuardian     string `json:"legal_guardian"`
	Relationship      string `json:"relationship"`
	CellPhoneGuardian string `json:"cell_phone_guardian"`
	SingGuardian      string `json:"sign_guardian"`

	Medicaid       string `json:"medicaid"`
	GoldCardNumber string `json:"gold_card_number"`
	Medicare       string `json:"medicare"`

	// --
	Certification bool `json:"certification"`
	Assessment    bool `json:"assessment"`
	Sp            bool `json:"sp"`
	Notes         bool `json:"notes"`

	// --
	Scm []OutClientSCM `json:"scm"`
}

type OutClientsNotesWeekActive struct {
	ID uint `json:"id"`

	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	SS        string `json:"ss"`
	DOB       string `json:"dob"`

	Medicaid       string             `json:"medicaid"`
	GoldCardNumber string             `json:"gold_card_number"`
	Medicare       string             `json:"medicare"`
	Sure           string             `json:"sure"`
	Notes          []NotesOut         `json:"notes"`
	Scm            OutClientSCMActive `json:"scm"`
}
