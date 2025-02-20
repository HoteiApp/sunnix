package models

import "gorm.io/gorm"

type Clients struct {
	gorm.Model
	ReferrerID      uint   `json:"referrer_id"` // ID of the user who referred this user (optional)
	ReferringAgency string `json:"referring_agency"`
	ReferringPerson string `json:"referring_person"`
	CellPhone       string `json:"cell_phone"`
	Fax             string `json:"fax"`
	Email           string `json:"email"`
	Date            string `json:"date"`

	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	// TODO: Monitorizar si funciona
	// SS       string `json:"ss" gorm:"uniqueIndex:idx_ss,length:255"`
	SS string `json:"ss" gorm:"type:varchar(255);uniqueIndex:idx_ss"`

	DOB  string `json:"dob"`
	Sexo string `json:"sexo"`
	Race string `json:"race"`

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

	// Medicaid       string `json:"medicaid" gorm:"type:longtext;uniqueIndex:idx_medicaid,length:255"`
	Medicaid       string `json:"medicaid" gorm:"type:varchar(255);uniqueIndex:idx_medicaid"`
	GoldCardNumber string `json:"gold_card_number"`
	Medicare       string `json:"medicare" gorm:"type:varchar(255);uniqueIndex:idx_medicare"`
	// Medicare       string `json:"medicare" gorm:"type:longtext;uniqueIndex:idx_medicare,length:255"`
}

type ClientServiceCaseManagement struct {
	gorm.Model
	Client      uint   `json:"client_id"` // ID of the client
	TCM         int    `json:"tcm"`
	Status      string `json:"status"`
	Doa         string `json:"doa"`
	ClosingDate string `json:"closing_date"`
}

type ClienteSCMTcm struct {
	gorm.Model
	Client      uint   `json:"client_id"` // ID of the client
	Scm         uint   `json:"scm"`
	FullName    string `json:"full_name"`
	Categorytcm string `json:"categoryTCM"`
	Signature   string `json:"signature"`
	Active      bool   `json:"active"`
}

type ClientSCMDemografic struct {
	gorm.Model
	Client          uint   `json:"client_id"` // ID of the client
	Scm             uint   `json:"scm"`
	ReferringAgency string `json:"referring_agency"`
	ReferringPerson string `json:"referring_person"`
	CellPhone       string `json:"cell_phone"`
	Fax             string `json:"fax"`
	Email           string `json:"email"`
	Date            string `json:"date"`

	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	SS        string `json:"ss" gorm:"type:varchar(255);uniqueIndex:idx_ss"`
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

	Medicaid       string `json:"medicaid" gorm:"type:varchar(255);uniqueIndex:idx_medicaid"`
	GoldCardNumber string `json:"gold_card_number"`
	Medicare       string `json:"medicare" gorm:"type:varchar(255);uniqueIndex:idx_medicare"`
}

type ClientSCMSure struct {
	gorm.Model
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
	Active bool `json:"active"`
	// -- Approbe
	Tcm               int  `json:"tcm"`
	Submit            bool `json:"submit"`
	Supervisor        int  `json:"supervisor"`
	SupervisorAprobbe bool `json:"supervisor_approbe"`
	Qa                int  `json:"qa"`
	QaAprobbe         bool `json:"qa_approbe"`
}
type ClientSCMSureFilesInCloud struct {
	gorm.Model
	Scm           uint `json:"scm"`
	Sure          uint `json:"sure"`
	Auth          bool `json:"auth"`
	Certification bool `json:"certification"`
	Assessment    bool `json:"assessment"`
	Sp            bool `json:"sp"`
	Evaluation    bool `json:"evaluation"`
}
type ClientSCMMedical struct {
	gorm.Model
	Client uint `json:"client_id"` // ID of the client
	Scm    uint `json:"scm"`

	MedicalPcp        string `json:"medical_pcp"`
	MedicalPcpAddress string `json:"medical_pcp_address"`
	MedicalPcpPhone   string `json:"medical_pcp_phone"`

	MedicalPsychiatrisy        string `json:"medical_psychiatrisy"`
	MedicalPsychiatrisyAddress string `json:"medical_psychiatrisy_address"`
	MedicalPsychiatrisyPhone   string `json:"medical_psychiatrisy_phone"`
}

type ClientSCMMental struct {
	gorm.Model
	Client              uint   `json:"client_id"` // ID of the client
	Scm                 uint   `json:"scm"`
	MentalPrimary       string `json:"mental_primary"`
	MentalPrimaryDate   string `json:"mental_primary_date"`
	MentalSecondary     string `json:"mental_secondary"`
	MentalSecondaryDate string `json:"mental_secondary_date"`
}

type ClientSCMCertification struct {
	gorm.Model
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
	Signtcm     string `json:"-"`
	Datetcm     string `json:"dateTcm"`
	// -- TCMS
	Supervisor         int    `json:"supervisor"`
	NameSupervisor     string `json:"nameSupervisor"`
	Categorysupervisor string `json:"categorySupervisor"`
	Signsupervisor     string `json:"-"`
	Datesupervisor     string `json:"dateSupervisor"`
	// -- QA
	Qa     string `json:"QA"`
	Signqa string `json:"-"`
}

type SourceInformationLdrsi struct {
	gorm.Model
	ClientSCMAssessmentID uint   `json:"client_scm_assessment_id"`
	Value                 string `json:"value" gorm:"type:text"`
}

type ClientSCMAssessment struct {
	gorm.Model
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
	Signaturetcm     string `json:"-"`
	Signaturetcmdate string `json:"signatureTcmDate"`

	Supervisor              int    `json:"supervisor"`
	NameSupervisor          string `json:"nameSupervisor"`
	CategorySupervisor      string `json:"categorySupervisor"`
	Signaturesupervisor     string `json:"-"`
	Signaturesupervisordate string `json:"signatureSupervisorDate"`

	Qa              int    `json:"qa"`
	Signatureqa     string `json:"-"`
	Signatureqadate string `json:"signatureQaDate"`
}

type SpGoal1 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal1A1            bool   `json:"goal1a1"`
	Goal1A1Type        string `json:"goal1a1Type"`
	Goal1A1Long        string `json:"goal1a1Long"`
	Goal1A1Responsible string `json:"goal1a1Responsible"`
	Goal1A1Startdate   string `json:"goal1a1StartDate"`
	Goal1A1Targetdate  string `json:"goal1a1TargetDate"`
	Goal1A1Met         bool   `json:"goal1a1Met"`
	Goal1A1NotMet      bool   `json:"goal1a1NotMet"`
	Goal1A1Ongoing     bool   `json:"goal1a1Ongoing"`

	Goal1A2            bool   `json:"goal1a2"`
	Goal1A2Type        string `json:"goal1a2Type"`
	Goal1A2Long        string `json:"goal1a2Long"`
	Goal1A2Responsible string `json:"goal1a2Responsible"`
	Goal1A2Startdate   string `json:"goal1a2StartDate"`
	Goal1A2Targetdate  string `json:"goal1a2TargetDate"`
	Goal1A2Met         bool   `json:"goal1a2Met"`
	Goal1A2NotMet      bool   `json:"goal1a2NotMet"`
	Goal1A2Ongoing     bool   `json:"goal1a2Ongoing"`

	Goal1B            bool   `json:"goal1b"`
	Goal1Btype        string `json:"goal1bType"`
	Goal1Blong        string `json:"goal1bLong"`
	Goal1Bresponsible string `json:"goal1bResponsible"`
	Goal1Bstartdate   string `json:"goal1bStartDate"`
	Goal1Btargetdate  string `json:"goal1bTargetDate"`
	Goal1BtMet        bool   `json:"goal1bTMet"`
	Goal1BtMNotMet    bool   `json:"goal1bTNotMet"`
	Goal1BtMOngoing   bool   `json:"goal1bTOngoing"`

	Goal1C            bool   `json:"goal1c"`
	Goal1Ctype        string `json:"goal1cType"`
	Goal1Clong        string `json:"goal1cLong"`
	Goal1Cresponsible string `json:"goal1cResponsible"`
	Goal1Cstartdate   string `json:"goal1cStartDate"`
	Goal1Ctargetdate  string `json:"goal1cTargetDate"`
	Goal1CtMet        bool   `json:"goal1cTMet"`
	Goal1CtMNotMet    bool   `json:"goal1cTNotMet"`
	Goal1CtMOngoing   bool   `json:"goal1cTOngoing"`

	Goal1D            bool   `json:"goal1d"`
	Goal1Dtype        string `json:"goal1dType"`
	Goal1Dlong        string `json:"goal1dLong"`
	Goal1Dresponsible string `json:"goal1dResponsible"`
	Goal1Dstartdate   string `json:"goal1dStartDate"`
	Goal1Dtargetdate  string `json:"goal1dTargetDate"`
	Goal1DtMet        bool   `json:"goal1dTMet"`
	Goal1DtMNotMet    bool   `json:"goal1dTNotMet"`
	Goal1DtMOngoing   bool   `json:"goal1dTOngoing"`

	Goal1E            bool   `json:"goal1e"`
	Goal1Etype        string `json:"goal1eType"`
	Goal1Elong        string `json:"goal1eLong"`
	Goal1Eresponsible string `json:"goal1eResponsible"`
	Goal1Estartdate   string `json:"goal1eStartDate"`
	Goal1Etargetdate  string `json:"goal1eTargetDate"`
	Goal1EtMet        bool   `json:"goal1eTMet"`
	Goal1EtMNotMet    bool   `json:"goal1eTNotMet"`
	Goal1EtMOngoing   bool   `json:"goal1eTOngoing"`

	Goal1F1            bool   `json:"goal1f1"`
	Goal1F1Type        string `json:"goal1f1Type"`
	Goal1F1Long        string `json:"goal1f1Long"`
	Goal1F1Responsible string `json:"goal1f1Responsible"`
	Goal1F1Startdate   string `json:"goal1f1StartDate"`
	Goal1F1Targetdate  string `json:"goal1f1TargetDate"`
	Goal1F1Met         bool   `json:"goal1f1Met"`
	Goal1F1NotMet      bool   `json:"goal1f1NotMet"`
	Goal1F1Ongoing     bool   `json:"goal1f1Ongoing"`

	Goal1F2            bool   `json:"goal1f2"`
	Goal1F2Type        string `json:"goal1f2Type"`
	Goal1F2Text        string `json:"goal1f2Text"`
	Goal1F2Long        string `json:"goal1f2Long"`
	Goal1F2Responsible string `json:"goal1f2Responsible"`
	Goal1F2Startdate   string `json:"goal1f2StartDate"`
	Goal1F2Targetdate  string `json:"goal1f2TargetDate"`
	Goal1F2Met         bool   `json:"goal1f2Met"`
	Goal1F2NotMet      bool   `json:"goal1f2NotMet"`
	Goal1F2Ongoing     bool   `json:"goal1f2Ongoing"`
}

type SpGoal2 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal2A1            bool   `json:"goal2a1"`
	Goal2A1Type        string `json:"goal2a1Type"`
	Goal2A1Long        string `json:"goal2a1Long"`
	Goal2A1Responsible string `json:"goal2a1Responsible"`
	Goal2A1Startdate   string `json:"goal2a1StartDate"`
	Goal2A1Targetdate  string `json:"goal2a1TargetDate"`
	Goal2A1Met         bool   `json:"goal2a1Met"`
	Goal2A1NotMet      bool   `json:"goal2a1NotMet"`
	Goal2A1Ongoing     bool   `json:"goal2a1Ongoing"`

	Goal2A2            bool   `json:"goal2a2"`
	Goal2A2Type        string `json:"goal2a2Type"`
	Goal2A2Text        string `json:"goal2a2Text"`
	Goal2A2Long        string `json:"goal2a2Long"`
	Goal2A2Responsible string `json:"goal2a2Responsible"`
	Goal2A2Startdate   string `json:"goal2a2StartDate"`
	Goal2A2Targetdate  string `json:"goal2a2TargetDate"`
	Goal2A2Met         bool   `json:"goal2a2Met"`
	Goal2A2NotMet      bool   `json:"goal2a2NotMet"`
	Goal2A2Ongoing     bool   `json:"goal2a2Ongoing"`

	Goal2B            bool   `json:"goal2b"`
	Goal2Btype        string `json:"goal2bType"`
	Goal2Blong        string `json:"goal2bLong"`
	Goal2Bresponsible string `json:"goal2bResponsible"`
	Goal2Bstartdate   string `json:"goal2bStartDate"`
	Goal2Btargetdate  string `json:"goal2bTargetDate"`
	Goal2BtMet        bool   `json:"goal2bMet"`
	Goal2BNottMet     bool   `json:"goal2bNotMet"`
	Goal2BOngoingt    bool   `json:"goal2bOngoing"`

	Goal2C            bool   `json:"goal2c"`
	Goal2Ctype        string `json:"goal2cType"`
	Goal2Clong        string `json:"goal2cLong"`
	Goal2Cresponsible string `json:"goal2cResponsible"`
	Goal2Cstartdate   string `json:"goal2cStartDate"`
	Goal2Ctargetdate  string `json:"goal2cTargetDate"`
	Goal2CtMet        bool   `json:"goal2cMet"`
	Goal2CNottMet     bool   `json:"goal2cNotMet"`
	Goal2COngoingt    bool   `json:"goal2cOngoing"`

	Goal2D1            bool   `json:"goal2d1"`
	Goal2D1Type        string `json:"goal2d1Type"`
	Goal2D1Long        string `json:"goal2d1Long"`
	Goal2D1Responsible string `json:"goal2d1Responsible"`
	Goal2D1Startdate   string `json:"goal2d1StartDate"`
	Goal2D1Targetdate  string `json:"goal2d1TargetDate"`
	Goal2D1Met         bool   `json:"goal2d1Met"`
	Goal2D1NotMet      bool   `json:"goal2d1NotMet"`
	Goal2D1Ongoing     bool   `json:"goal2d1Ongoing"`

	Goal2D2            bool   `json:"goal2d2"`
	Goal2D2Type        string `json:"goal2d2Type"`
	Goal2D2Text        string `json:"goal2d2Text"`
	Goal2D2Long        string `json:"goal2d2Long"`
	Goal2D2Responsible string `json:"goal2d2Responsible"`
	Goal2D2Startdate   string `json:"goal2d2StartDate"`
	Goal2D2Targetdate  string `json:"goal2d2TargetDate"`
	Goal2D2Met         bool   `json:"goal2d2Met"`
	Goal2D2NotMet      bool   `json:"goal2d2NotMet"`
	Goal2D2Ongoing     bool   `json:"goal2d2Ongoing"`

	Goal2D3            bool   `json:"goal2d3"`
	Goal2D3Type        string `json:"goal2d3Type"`
	Goal2D3Text        string `json:"goal2d3Text"`
	Goal2D3Long        string `json:"goal2d3Long"`
	Goal2D3Responsible string `json:"goal2d3Responsible"`
	Goal2D3Startdate   string `json:"goal2d3StartDate"`
	Goal2D3Targetdate  string `json:"goal2d3TargetDate"`
	Goal2D3Met         bool   `json:"goal2d3Met"`
	Goal2D3NotMet      bool   `json:"goal2d3NotMet"`
	Goal2D3Ongoing     bool   `json:"goal2d3Ongoing"`

	Goal2D4            bool   `json:"goal2d4"`
	Goal2D4Type        string `json:"goal2d4Type"`
	Goal2D4Text        string `json:"goal2d4Text"`
	Goal2D4Long        string `json:"goal2d4Long"`
	Goal2D4Responsible string `json:"goal2d4Responsible"`
	Goal2D4Startdate   string `json:"goal2d4StartDate"`
	Goal2D4Targetdate  string `json:"goal2d4TargetDate"`
	Goal2D4Met         bool   `json:"goal2d4Met"`
	Goal2D4NotMet      bool   `json:"goal2d4NotMet"`
	Goal2D4Ongoing     bool   `json:"goal2d4Ongoing"`

	Goal2D5            bool   `json:"goal2d5"`
	Goal2D5Type        string `json:"goal2d5Type"`
	Goal2D5Text        string `json:"goal2d5Text"`
	Goal2D5Long        string `json:"goal2d5Long"`
	Goal2D5Responsible string `json:"goal2d5Responsible"`
	Goal2D5Startdate   string `json:"goal2d5StartDate"`
	Goal2D5Targetdate  string `json:"goal2d5TargetDate"`
	Goal2D5Met         bool   `json:"goal2d5Met"`
	Goal2D5NotMet      bool   `json:"goal2d5NotMet"`
	Goal2D5Ongoing     bool   `json:"goal2d5Ongoing"`

	Goal2D6            bool   `json:"goal2d6"`
	Goal2D6Type        string `json:"goal2d6Type"`
	Goal2D6Text        string `json:"goal2d6Text"`
	Goal2D6Long        string `json:"goal2d6Long"`
	Goal2D6Responsible string `json:"goal2d6Responsible"`
	Goal2D6Startdate   string `json:"goal2d6StartDate"`
	Goal2D6Targetdate  string `json:"goal2d6TargetDate"`
	Goal2D6Met         bool   `json:"goal2d6Met"`
	Goal2D6NotMet      bool   `json:"goal2d6NotMet"`
	Goal2D6Ongoing     bool   `json:"goal2d6Ongoing"`

	Goal2D7            bool   `json:"goal2d7"`
	Goal2D7Type        string `json:"goal2d7Type"`
	Goal2D7Text        string `json:"goal2d7Text"`
	Goal2D7Long        string `json:"goal2d7Long"`
	Goal2D7Responsible string `json:"goal2d7Responsible"`
	Goal2D7Startdate   string `json:"goal2d7StartDate"`
	Goal2D7Targetdate  string `json:"goal2d7TargetDate"`
	Goal2D7Met         bool   `json:"goal2d7Met"`
	Goal2D7NotMet      bool   `json:"goal2d7NotMet"`
	Goal2D7Ongoing     bool   `json:"goal2d7Ongoing"`

	Goal2D8            bool   `json:"goal2d8"`
	Goal2D8Type        string `json:"goal2d8Type"`
	Goal2D8Text        string `json:"goal2d8Text"`
	Goal2D8Long        string `json:"goal2d8Long"`
	Goal2D8Responsible string `json:"goal2d8Responsible"`
	Goal2D8Startdate   string `json:"goal2d8StartDate"`
	Goal2D8Targetdate  string `json:"goal2d8TargetDate"`
	Goal2D8Met         bool   `json:"goal2d8Met"`
	Goal2D8NotMet      bool   `json:"goal2d8NotMet"`
	Goal2D8Ongoing     bool   `json:"goal2d8Ongoing"`

	Goal2D9            bool   `json:"goal2d9"`
	Goal2D9Type        string `json:"goal2d9Type"`
	Goal2D9Text        string `json:"goal2d9Text"`
	Goal2D9Long        string `json:"goal2d9Long"`
	Goal2D9Responsible string `json:"goal2d9Responsible"`
	Goal2D9Startdate   string `json:"goal2d9StartDate"`
	Goal2D9Targetdate  string `json:"goal2d9TargetDate"`
	Goal2D9Met         bool   `json:"goal2d9Met"`
	Goal2D9NotMet      bool   `json:"goal2d9NotMet"`
	Goal2D9Ongoing     bool   `json:"goal2d9Ongoing"`

	Goal2D10            bool   `json:"goal2d10"`
	Goal2D10Type        string `json:"goal2d10Type"`
	Goal2D10Text        string `json:"goal2d10Text"`
	Goal2D10Long        string `json:"goal2d10Long"`
	Goal2D10Responsible string `json:"goal2d10Responsible"`
	Goal2D10Startdate   string `json:"goal2d10StartDate"`
	Goal2D10Targetdate  string `json:"goal2d10TargetDate"`
	Goal2D10Met         bool   `json:"goal2d10Met"`
	Goal2D10Notet       bool   `json:"goal2d10NotMet"`
	Goal2D10Ongoing     bool   `json:"goal2d10Ongoing"`

	Goal2D11            bool   `json:"goal2d11"`
	Goal2D11Type        string `json:"goal2d11Type"`
	Goal2D11Text        string `json:"goal2d11Text"`
	Goal2D11Long        string `json:"goal2d11Long"`
	Goal2D11Responsible string `json:"goal2d11Responsible"`
	Goal2D11Startdate   string `json:"goal2d11StartDate"`
	Goal2D11Targetdate  string `json:"goal2d11TargetDate"`
	Goal2D11Mete        bool   `json:"goal2d11Met"`
	Goal2D11MNotete     bool   `json:"goal2d11NotMet"`
	Goal2D11MOngoing    bool   `json:"goal2d11Ongoing"`

	Goal2D12            bool   `json:"goal2d12"`
	Goal2D12Type        string `json:"goal2d12Type"`
	Goal2D12Text        string `json:"goal2d12Text"`
	Goal2D12Long        string `json:"goal2d12Long"`
	Goal2D12Responsible string `json:"goal2d12Responsible"`
	Goal2D12Startdate   string `json:"goal2d12StartDate"`
	Goal2D12Targetdate  string `json:"goal2d12TargetDate"`
	Goal2D12Mete        bool   `json:"goal2d12Met"`
	Goal2D12MNotete     bool   `json:"goal2d12NotMet"`
	Goal2D12MOngoing    bool   `json:"goal2d12Ongoing"`

	Goal2D13            bool   `json:"goal2d13"`
	Goal2D13Type        string `json:"goal2d13Type"`
	Goal2D13Text        string `json:"goal2d13Text"`
	Goal2D13Long        string `json:"goal2d13Long"`
	Goal2D13Responsible string `json:"goal2d13Responsible"`
	Goal2D13Startdate   string `json:"goal2d13StartDate"`
	Goal2D13Targetdate  string `json:"goal2d13TargetDate"`
	Goal2D13Mete        bool   `json:"goal2d13Met"`
	Goal2D13MNotete     bool   `json:"goal2d13NotMet"`
	Goal2D13MOngoing    bool   `json:"goal2d13Ongoing"`

	Goal2E1            bool   `json:"goal2e1"`
	Goal2E1Type        string `json:"goal2e1Type"`
	Goal2E1Long        string `json:"goal2e1Long"`
	Goal2E1Responsible string `json:"goal2e1Responsible"`
	Goal2E1Startdate   string `json:"goal2e1StartDate"`
	Goal2E1Targetdate  string `json:"goal2e1TargetDate"`
	Goal2E1Met         bool   `json:"goal2e1Met"`
	Goal2E1NotMet      bool   `json:"goal2e1NotMet"`
	Goal2E1Ongoing     bool   `json:"goal2e1Ongoing"`

	Goal2E2            bool   `json:"goal2e2"`
	Goal2E2Type        string `json:"goal2e2Type"`
	Goal2E2Long        string `json:"goal2e2Long"`
	Goal2E2Responsible string `json:"goal2e2Responsible"`
	Goal2E2Startdate   string `json:"goal2e2StartDate"`
	Goal2E2Targetdate  string `json:"goal2e2TargetDate"`
	Goal2E2Met         bool   `json:"goal2e2Met"`
	Goal2E2NotMet      bool   `json:"goal2e2NotMet"`
	Goal2E2Ongoing     bool   `json:"goal2e2Ongoing"`

	Goal2E3            bool   `json:"goal2e3"`
	Goal2E3Type        string `json:"goal2e3Type"`
	Goal2E3Long        string `json:"goal2e3Long"`
	Goal2E3Responsible string `json:"goal2e3Responsible"`
	Goal2E3Startdate   string `json:"goal2e3StartDate"`
	Goal2E3Targetdate  string `json:"goal2e3TargetDate"`
	Goal2E3Met         bool   `json:"goal2e3Met"`
	Goal2E3NotMet      bool   `json:"goal2e3NotMet"`
	Goal2E3Ongoing     bool   `json:"goal2e3Ongoing"`

	Goal2E4            bool   `json:"goal2e4"`
	Goal2E4Type        string `json:"goal2e4Type"`
	Goal2E4Long        string `json:"goal2e4Long"`
	Goal2E4Responsible string `json:"goal2e4Responsible"`
	Goal2E4Startdate   string `json:"goal2e4StartDate"`
	Goal2E4Targetdate  string `json:"goal2e4TargetDate"`
	Goal2E4Met         bool   `json:"goal2e4Met"`
	Goal2E4NotMet      bool   `json:"goal2e4NotMet"`
	Goal2E4Ongoing     bool   `json:"goal2e4Ongoing"`

	Goal2E5            bool   `json:"goal2e5"`
	Goal2E5Type        string `json:"goal2e5Type"`
	Goal2E5Text        string `json:"goal2e5Text"`
	Goal2E5Long        string `json:"goal2e5Long"`
	Goal2E5Responsible string `json:"goal2e5Responsible"`
	Goal2E5Startdate   string `json:"goal2e5StartDate"`
	Goal2E5Targetdate  string `json:"goal2e5TargetDate"`
	Goal2E5Met         bool   `json:"goal2e5Met"`
	Goal2E5NotMet      bool   `json:"goal2e5NotMet"`
	Goal2E5Ongoing     bool   `json:"goal2e5Ongoing"`
}

type SpGoal3 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal3A            bool   `json:"goal3a"`
	Goal3Atype        string `json:"goal3aType"`
	Goal3Along        string `json:"goal3aLong"`
	Goal3Aresponsible string `json:"goal3aResponsible"`
	Goal3Astartdate   string `json:"goal3aStartDate"`
	Goal3Atargetdate  string `json:"goal3aTargetDate"`
	Goal3AMet         bool   `json:"goal3aMet"`
	Goal3ANotMet      bool   `json:"goal3aNotMet"`
	Goal3AOngoing     bool   `json:"goal3aOngoing"`

	Goal3A1            bool   `json:"goal3a1"`
	Goal3A1Type        string `json:"goal3a1Type"`
	Goal3A1Long        string `json:"goal3a1Long"`
	Goal3A1Responsible string `json:"goal3a1Responsible"`
	Goal3A1Startdate   string `json:"goal3a1StartDate"`
	Goal3A1Targetdate  string `json:"goal3a1TargetDate"`
	Goal3A1Met         bool   `json:"goal3a1Met"`
	Goal3A1NotMet      bool   `json:"goal3a1NotMet"`
	Goal3A1Ongoing     bool   `json:"goal3a1Ongoing"`

	Goal3A2            bool   `json:"goal3a2"`
	Goal3A2Type        string `json:"goal3a2Type"`
	Goal3A2Long        string `json:"goal3a2Long"`
	Goal3A2Responsible string `json:"goal3a2Responsible"`
	Goal3A2Startdate   string `json:"goal3a2StartDate"`
	Goal3A2Targetdate  string `json:"goal3a2TargetDate"`
	Goal3A2Met         bool   `json:"goal3a2Met"`
	Goal3A2NotMet      bool   `json:"goal3a2NotMet"`
	Goal3A2Ongoing     bool   `json:"goal3a2Ongoing"`

	Goal3A3            bool   `json:"goal3a3"`
	Goal3A3Type        string `json:"goal3a3Type"`
	Goal3A3Long        string `json:"goal3a3Long"`
	Goal3A3Responsible string `json:"goal3a3Responsible"`
	Goal3A3Startdate   string `json:"goal3a3StartDate"`
	Goal3A3Targetdate  string `json:"goal3a3TargetDate"`
	Goal3A3Met         bool   `json:"goal3a3Met"`
	Goal3A3NotMet      bool   `json:"goal3a3NotMet"`
	Goal3A3Ongoing     bool   `json:"goal3a3Ongoing"`

	Goal3A4            bool   `json:"goal3a4"`
	Goal3A4Type        string `json:"goal3a4Type"`
	Goal3A4Long        string `json:"goal3a4Long"`
	Goal3A4Responsible string `json:"goal3a4Responsible"`
	Goal3A4Startdate   string `json:"goal3a4StartDate"`
	Goal3A4Targetdate  string `json:"goal3a4TargetDate"`
	Goal3A4Met         bool   `json:"goal3a4Met"`
	Goal3A4NotMet      bool   `json:"goal3a4NotMet"`
	Goal3A4Ongoing     bool   `json:"goal3a4Ongoing"`

	Goal3A5            bool   `json:"goal3a5"`
	Goal3A5Type        string `json:"goal3a5Type"`
	Goal3A5Long        string `json:"goal3a5Long"`
	Goal3A5Responsible string `json:"goal3a5Responsible"`
	Goal3A5Startdate   string `json:"goal3a5StartDate"`
	Goal3A5Targetdate  string `json:"goal3a5TargetDate"`
	Goal3A5Met         bool   `json:"goal3a5Met"`
	Goal3A5NotMet      bool   `json:"goal3a5NotMet"`
	Goal3A5Ongoing     bool   `json:"goal3a5Ongoing"`

	Goal3A6            bool   `json:"goal3a6"`
	Goal3A6Type        string `json:"goal3a6Type"`
	Goal3A6Long        string `json:"goal3a6Long"`
	Goal3A6Responsible string `json:"goal3a6Responsible"`
	Goal3A6Startdate   string `json:"goal3a6StartDate"`
	Goal3A6Targetdate  string `json:"goal3a6TargetDate"`
	Goal3A6Met         bool   `json:"goal3a6Met"`
	Goal3A6NotMet      bool   `json:"goal3a6NotMet"`
	Goal3A6Ongoing     bool   `json:"goal3a6Ongoing"`

	Goal3A7            bool   `json:"goal3a7"`
	Goal3A7Type        string `json:"goal3a7Type"`
	Goal3A7Long        string `json:"goal3a7Long"`
	Goal3A7Responsible string `json:"goal3a7Responsible"`
	Goal3A7Startdate   string `json:"goal3a7StartDate"`
	Goal3A7Targetdate  string `json:"goal3a7TargetDate"`
	Goal3A7Met         bool   `json:"goal3a7Met"`
	Goal3A7NotMet      bool   `json:"goal3a7NotMet"`
	Goal3A7Ongoing     bool   `json:"goal3a7Ongoing"`

	Goal3A8            bool   `json:"goal3a8"`
	Goal3A8Type        string `json:"goal3a8Type"`
	Goal3A8Long        string `json:"goal3a8Long"`
	Goal3A8Text        string `json:"goal3a8Text"`
	Goal3A8Responsible string `json:"goal3a8Responsible"`
	Goal3A8Startdate   string `json:"goal3a8StartDate"`
	Goal3A8Targetdate  string `json:"goal3a8TargetDate"`
	Goal3A8Met         bool   `json:"goal3a8Met"`
	Goal3A8NotMet      bool   `json:"goal3a8NotMet"`
	Goal3A8Ongoing     bool   `json:"goal3a8Ongoing"`

	Goal3B1            bool   `json:"goal3b1"`
	Goal3B1Type        string `json:"goal3b1Type"`
	Goal3B1Long        string `json:"goal3b1Long"`
	Goal3B1Responsible string `json:"goal3b1Responsible"`
	Goal3B1Startdate   string `json:"goal3b1StartDate"`
	Goal3B1Targetdate  string `json:"goal3b1TargetDate"`
	Goal3B1Met         bool   `json:"goal3b1Met"`
	Goal3B1NotMet      bool   `json:"goal3b1NotMet"`
	Goal3B1Ongoing     bool   `json:"goal3b1Ongoing"`

	Goal3B2            bool   `json:"goal3b2"`
	Goal3B2Type        string `json:"goal3b2Type"`
	Goal3B2Long        string `json:"goal3b2Long"`
	Goal3B2Responsible string `json:"goal3b2Responsible"`
	Goal3B2Startdate   string `json:"goal3b2StartDate"`
	Goal3B2Targetdate  string `json:"goal3b2TargetDate"`
	Goal3B2Met         bool   `json:"goal3b2Met"`
	Goal3B2NotMet      bool   `json:"goal3b2NotMet"`
	Goal3B2Ongoing     bool   `json:"goal3b2Ongoing"`

	Goal3B3            bool   `json:"goal3b3"`
	Goal3B3Type        string `json:"goal3b3Type"`
	Goal3B3Long        string `json:"goal3b3Long"`
	Goal3B3Responsible string `json:"goal3b3Responsible"`
	Goal3B3Startdate   string `json:"goal3b3StartDate"`
	Goal3B3Targetdate  string `json:"goal3b3TargetDate"`
	Goal3B3Met         bool   `json:"goal3b3Met"`
	Goal3B3NotMet      bool   `json:"goal3b3NotMet"`
	Goal3B3Ongoing     bool   `json:"goal3b3Ongoing"`

	Goal3B4            bool   `json:"goal3b4"`
	Goal3B4Type        string `json:"goal3b4Type"`
	Goal3B4Long        string `json:"goal3b4Long"`
	Goal3B4Responsible string `json:"goal3b4Responsible"`
	Goal3B4Startdate   string `json:"goal3b4StartDate"`
	Goal3B4Targetdate  string `json:"goal3b4TargetDate"`
	Goal3B4Met         bool   `json:"goal3b4Met"`
	Goal3B4NotMet      bool   `json:"goal3b4NotMet"`
	Goal3B4Ongoing     bool   `json:"goal3b4Ongoing"`

	Goal3B5            bool   `json:"goal3b5"`
	Goal3B5Type        string `json:"goal3b5Type"`
	Goal3B5Long        string `json:"goal3b5Long"`
	Goal3B5Responsible string `json:"goal3b5Responsible"`
	Goal3B5Startdate   string `json:"goal3b5StartDate"`
	Goal3B5Targetdate  string `json:"goal3b5TargetDate"`
	Goal3B5Met         bool   `json:"goal3b5Met"`
	Goal3B5NotMet      bool   `json:"goal3b5NotMet"`
	Goal3B5Ongoing     bool   `json:"goal3b5Ongoing"`

	Goal3B6            bool   `json:"goal3b6"`
	Goal3B6Type        string `json:"goal3b6Type"`
	Goal3B6Long        string `json:"goal3b6Long"`
	Goal3B6Responsible string `json:"goal3b6Responsible"`
	Goal3B6Startdate   string `json:"goal3b6StartDate"`
	Goal3B6Targetdate  string `json:"goal3b6TargetDate"`
	Goal3B6Met         bool   `json:"goal3b6Met"`
	Goal3B6NotMet      bool   `json:"goal3b6NotMet"`
	Goal3B6Ongoing     bool   `json:"goal3b6Ongoing"`

	Goal3B7            bool   `json:"goal3b7"`
	Goal3B7Type        string `json:"goal3b7Type"`
	Goal3B7Long        string `json:"goal3b7Long"`
	Goal3B7Responsible string `json:"goal3b7Responsible"`
	Goal3B7Startdate   string `json:"goal3b7StartDate"`
	Goal3B7Targetdate  string `json:"goal3b7TargetDate"`
	Goal3B7Met         bool   `json:"goal3b7Met"`
	Goal3B7NotMet      bool   `json:"goal3b7NotMet"`
	Goal3B7Ongoing     bool   `json:"goal3b7Ongoing"`

	Goal3B8            bool   `json:"goal3b8"`
	Goal3B8Type        string `json:"goal3b8Type"`
	Goal3B8Long        string `json:"goal3b8Long"`
	Goal3B8Responsible string `json:"goal3b8Responsible"`
	Goal3B8Startdate   string `json:"goal3b8StartDate"`
	Goal3B8Targetdate  string `json:"goal3b8TargetDate"`
	Goal3B8Met         bool   `json:"goal3b8Met"`
	Goal3B8NotMet      bool   `json:"goal3b8NotMet"`
	Goal3B8Ongoing     bool   `json:"goal3b8Ongoing"`

	Goal3C1            bool   `json:"goal3c1"`
	Goal3C1Type        string `json:"goal3c1Type"`
	Goal3C1Long        string `json:"goal3c1Long"`
	Goal3C1Responsible string `json:"goal3c1Responsible"`
	Goal3C1Startdate   string `json:"goal3c1StartDate"`
	Goal3C1Targetdate  string `json:"goal3c1TargetDate"`
	Goal3C1Met         bool   `json:"goal3c1Met"`
	Goal3C1NotMet      bool   `json:"goal3c1NotMet"`
	Goal3C1Ongoing     bool   `json:"goal3c1Ongoing"`

	Goal3C2            bool   `json:"goal3c2"`
	Goal3C2Type        string `json:"goal3c2Type"`
	Goal3C2Long        string `json:"goal3c2Long"`
	Goal3C2Responsible string `json:"goal3c2Responsible"`
	Goal3C2Startdate   string `json:"goal3c2StartDate"`
	Goal3C2Targetdate  string `json:"goal3c2TargetDate"`
	Goal3C2Met         bool   `json:"goal3c2Met"`
	Goal3C2NotMet      bool   `json:"goal3c2NotMet"`
	Goal3C2Ongoing     bool   `json:"goal3c2Ongoing"`

	Goal3C3            bool   `json:"goal3c3"`
	Goal3C3Type        string `json:"goal3c3Type"`
	Goal3C3Long        string `json:"goal3c3Long"`
	Goal3C3Responsible string `json:"goal3c3Responsible"`
	Goal3C3Startdate   string `json:"goal3c3StartDate"`
	Goal3C3Targetdate  string `json:"goal3c3TargetDate"`
	Goal3C3Met         bool   `json:"goal3c3Met"`
	Goal3C3NotMet      bool   `json:"goal3c3NotMet"`
	Goal3C3Ongoing     bool   `json:"goal3c3Ongoing"`

	Goal3C4            bool   `json:"goal3c4"`
	Goal3C4Type        string `json:"goal3c4Type"`
	Goal3C4Long        string `json:"goal3c4Long"`
	Goal3C4Responsible string `json:"goal3c4Responsible"`
	Goal3C4Startdate   string `json:"goal3c4StartDate"`
	Goal3C4Targetdate  string `json:"goal3c4TargetDate"`
	Goal3C4Met         bool   `json:"goal3c4Met"`
	Goal3C4NotMet      bool   `json:"goal3c4NotMet"`
	Goal3C4Ongoing     bool   `json:"goal3c4Ongoing"`

	Goal3C5            bool   `json:"goal3c5"`
	Goal3C5Type        string `json:"goal3c5Type"`
	Goal3C5Long        string `json:"goal3c5Long"`
	Goal3C5Responsible string `json:"goal3c5Responsible"`
	Goal3C5Startdate   string `json:"goal3c5StartDate"`
	Goal3C5Targetdate  string `json:"goal3c5TargetDate"`
	Goal3C5Met         bool   `json:"goal3c5Met"`
	Goal3C5NotMet      bool   `json:"goal3c5NotMet"`
	Goal3C5Ongoing     bool   `json:"goal3c5Ongoing"`

	Goal3C6            bool   `json:"goal3c6"`
	Goal3C6Type        string `json:"goal3c6Type"`
	Goal3C6Long        string `json:"goal3c6Long"`
	Goal3C6Responsible string `json:"goal3c6Responsible"`
	Goal3C6Startdate   string `json:"goal3c6StartDate"`
	Goal3C6Targetdate  string `json:"goal3c6TargetDate"`
	Goal3C6Met         bool   `json:"goal3c6Met"`
	Goal3C6NotMet      bool   `json:"goal3c6NotMet"`
	Goal3C6Ongoing     bool   `json:"goal3c6Ongoing"`

	Goal3D1            bool   `json:"goal3d1"`
	Goal3D1Type        string `json:"goal3d1Type"`
	Goal3D1Long        string `json:"goal3d1Long"`
	Goal3D1Responsible string `json:"goal3d1Responsible"`
	Goal3D1Startdate   string `json:"goal3d1StartDate"`
	Goal3D1Targetdate  string `json:"goal3d1TargetDate"`
	Goal3D1Met         bool   `json:"goal3d1Met"`
	Goal3D1NotMet      bool   `json:"goal3d1NotMet"`
	Goal3D1Ongoing     bool   `json:"goal3d1Ongoing"`

	Goal3D2            bool   `json:"goal3d2"`
	Goal3D2Type        string `json:"goal3d2Type"`
	Goal3D2Long        string `json:"goal3d2Long"`
	Goal3D2Responsible string `json:"goal3d2Responsible"`
	Goal3D2Startdate   string `json:"goal3d2StartDate"`
	Goal3D2Targetdate  string `json:"goal3d2TargetDate"`
	Goal3D2Met         bool   `json:"goal3d2Met"`
	Goal3D2NotMet      bool   `json:"goal3d2NotMet"`
	Goal3D2Ongoing     bool   `json:"goal3d2Ongoing"`

	Goal3D3            bool   `json:"goal3d3"`
	Goal3D3Type        string `json:"goal3d3Type"`
	Goal3D3Long        string `json:"goal3d3Long"`
	Goal3D3Responsible string `json:"goal3d3Responsible"`
	Goal3D3Startdate   string `json:"goal3d3StartDate"`
	Goal3D3Targetdate  string `json:"goal3d3TargetDate"`
	Goal3D3Met         bool   `json:"goal3d3Met"`
	Goal3D3NotMet      bool   `json:"goal3d3NotMet"`
	Goal3D3Ongoing     bool   `json:"goal3d3Ongoing"`

	Goal3D4            bool   `json:"goal3d4"`
	Goal3D4Type        string `json:"goal3d4Type"`
	Goal3D4Long        string `json:"goal3d4Long"`
	Goal3D4Responsible string `json:"goal3d4Responsible"`
	Goal3D4Startdate   string `json:"goal3d4StartDate"`
	Goal3D4Targetdate  string `json:"goal3d4TargetDate"`
	Goal3D4Met         bool   `json:"goal3d4Met"`
	Goal3D4NotMet      bool   `json:"goal3d4NotMet"`
	Goal3D4Ongoing     bool   `json:"goal3d4Ongoing"`

	Goal3D5            bool   `json:"goal3d5"`
	Goal3D5Type        string `json:"goal3d5Type"`
	Goal3D5Long        string `json:"goal3d5Long"`
	Goal3D5Responsible string `json:"goal3d5Responsible"`
	Goal3D5Startdate   string `json:"goal3d5StartDate"`
	Goal3D5Targetdate  string `json:"goal3d5TargetDate"`
	Goal3D5Met         bool   `json:"goal3d5Met"`
	Goal3D5NotMet      bool   `json:"goal3d5NotMet"`
	Goal3D5Ongoing     bool   `json:"goal3d5Ongoing"`

	Goal3D6            bool   `json:"goal3d6"`
	Goal3D6Type        string `json:"goal3d6Type"`
	Goal3D6Long        string `json:"goal3d6Long"`
	Goal3D6Responsible string `json:"goal3d6Responsible"`
	Goal3D6Startdate   string `json:"goal3d6StartDate"`
	Goal3D6Targetdate  string `json:"goal3d6TargetDate"`
	Goal3D6Met         bool   `json:"goal3d6Met"`
	Goal3D6NotMet      bool   `json:"goal3d6NotMet"`
	Goal3D6Ongoing     bool   `json:"goal3d6Ongoing"`

	Goal3D7            bool   `json:"goal3d7"`
	Goal3D7Type        string `json:"goal3d7Type"`
	Goal3D7Text        string `json:"goal3d7Text"`
	Goal3D7Long        string `json:"goal3d7Long"`
	Goal3D7Responsible string `json:"goal3d7Responsible"`
	Goal3D7Startdate   string `json:"goal3d7StartDate"`
	Goal3D7Met         bool   `json:"goal3d7Met"`
	Goal3D7NotMet      bool   `json:"goal3d7NotMet"`
	Goal3D7Ongoing     bool   `json:"goal3d7Ongoing"`
	Goal3D7Targetdate  string `json:"goal3d7TargetDate"`

	Goal3E            bool   `json:"goal3e"`
	Goal3Etype        string `json:"goal3eType"`
	Goal3Elong        string `json:"goal3eLong"`
	Goal3Eresponsible string `json:"goal3eResponsible"`
	Goal3Estartdate   string `json:"goal3eStartDate"`
	Goal3Etargetdate  string `json:"goal3eTargetDate"`
	Goal3EMet         bool   `json:"goal3eMet"`
	Goal3ENotMet      bool   `json:"goal3eNotMet"`
	Goal3EOngoing     bool   `json:"goal3eOngoing"`

	Goal3F            bool   `json:"goal3f"`
	Goal3FType        string `json:"goal3fType"`
	Goal3FLong        string `json:"goal3fLong"`
	Goal3FResponsible string `json:"goal3fResponsible"`
	Goal3FStartdate   string `json:"goal3fStartDate"`
	Goal3FTargetdate  string `json:"goal3fTargetDate"`
	Goal3FMet         bool   `json:"goal3fMet"`
	Goal3FNotMet      bool   `json:"goal3fNotMet"`
	Goal3FOngoing     bool   `json:"goal3fOngoing"`
}

type SpGoal4 struct {
	gorm.Model
	Sp                uint   `json:"sp"`
	Goal4A            bool   `json:"goal4a"`
	Goal4Atype        string `json:"goal4aType"`
	Goal4Along        string `json:"goal4aLong"`
	Goal4Aresponsible string `json:"goal4aResponsible"`
	Goal4Astartdate   string `json:"goal4aStartDate"`
	Goal4Atargetdate  string `json:"goal4aTargetDate"`
	Goal4AMet         bool   `json:"goal4aMet"`
	Goal4ANotMet      bool   `json:"goal4aNotMet"`
	Goal4AOngoing     bool   `json:"goal4aOngoing"`

	Goal4B            bool   `json:"goal4b"`
	Goal4Btype        string `json:"goal4bType"`
	Goal4Blong        string `json:"goal4bLong"`
	Goal4Bresponsible string `json:"goal4bResponsible"`
	Goal4Bstartdate   string `json:"goal4bStartDate"`
	Goal4Btargetdate  string `json:"goal4bTargetDate"`
	Goal4BMet         bool   `json:"goal4bMet"`
	Goal4BNotMet      bool   `json:"goal4bNotMet"`
	Goal4BOngoing     bool   `json:"goal4b8Ongoing"`

	Goal4C            bool   `json:"goal4c"`
	Goal4Ctype        string `json:"goal4cType"`
	Goal4Clong        string `json:"goal4cLong"`
	Goal4Cresponsible string `json:"goal4cResponsible"`
	Goal4Cstartdate   string `json:"goal4cStartDate"`
	Goal4Ctargetdate  string `json:"goal4cTargetDate"`
	Goal4CMet         bool   `json:"goal4cMet"`
	Goal4CNotMet      bool   `json:"goal4cNotMet"`
	Goal4COngoing     bool   `json:"goal4cOngoing"`

	Goal4D            bool   `json:"goal4d"`
	Goal4Dtype        string `json:"goal4dType"`
	Goal4Dlong        string `json:"goal4dLong"`
	Goal4Dresponsible string `json:"goal4dResponsible"`
	Goal4Dstartdate   string `json:"goal4dStartDate"`
	Goal4Dtargetdate  string `json:"goal4dTargetDate"`
	Goal4DMet         bool   `json:"goal4dMet"`
	Goal4DNotMet      bool   `json:"goal4dNotMet"`
	Goal4DOngoling    bool   `json:"goal4dOngoing"`

	Goal4E            bool   `json:"goal4e"`
	Goal4Etype        string `json:"goal4eType"`
	Goal4Elong        string `json:"goal4eLong"`
	Goal4Eresponsible string `json:"goal4eResponsible"`
	Goal4Estartdate   string `json:"goal4eStartDate"`
	Goal4Etargetdate  string `json:"goal4eTargetDate"`
	Goal4EMet         bool   `json:"goal4eMet"`
	Goal4ENotMet      bool   `json:"goal4eNotMet"`
	Goal4EOngoing     bool   `json:"goal4eOngoing"`

	Goal4F            bool   `json:"goal4f"`
	Goal4Ftype        string `json:"goal4fType"`
	Goal4Flong        string `json:"goal4fLong"`
	Goal4Fresponsible string `json:"goal4fResponsible"`
	Goal4Fstartdate   string `json:"goal4fStartDate"`
	Goal4Ftargetdate  string `json:"goal4fTargetDate"`
	Goal4FMet         bool   `json:"goal4fMet"`
	Goal4FNotMet      bool   `json:"goal4fNotMet"`
	Goal4FOngoing     bool   `json:"goal4fOngoing"`
}

type SpGoal5 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal5A            bool   `json:"goal5a"`
	Goal5Atype        string `json:"goal5aType"`
	Goal5Along        string `json:"goal5aLong"`
	Goal5Aresponsible string `json:"goal5aResponsible"`
	Goal5Astartdate   string `json:"goal5aStartDate"`
	Goal5Atargetdate  string `json:"goal5aTargetDate"`

	Goal5B            bool   `json:"goal5b"`
	Goal5Btype        string `json:"goal5bType"`
	Goal5Blong        string `json:"goal5bLong"`
	Goal5Bresponsible string `json:"goal5bResponsible"`
	Goal5Bstartdate   string `json:"goal5bStartDate"`
	Goal5Btargetdate  string `json:"goal5bTargetDate"`
	Goal5BMet         bool   `json:"goal5bMet"`
	Goal5BNotMet      bool   `json:"goal5bNotMet"`
	Goal5BOngoing     bool   `json:"goal5bOngoing"`

	Goal5C            bool   `json:"goal5c"`
	Goal5Ctype        string `json:"goal5cType"`
	Goal5Clong        string `json:"goal5cLong"`
	Goal5Cresponsible string `json:"goal5cResponsible"`
	Goal5Cstartdate   string `json:"goal5cStartDate"`
	Goal5Ctargetdate  string `json:"goal5cTargetDate"`
	Goal5CMet         bool   `json:"goal5cMet"`
	Goal5CNotMet      bool   `json:"goal5cNotMet"`
	Goal5COngoing     bool   `json:"goal5cOngoing"`

	Goal5D            bool   `json:"goal5d"`
	Goal5Dtype        string `json:"goal5dType"`
	Goal5Dlong        string `json:"goal5dLong"`
	Goal5Dresponsible string `json:"goal5dResponsible"`
	Goal5Dstartdate   string `json:"goal5dStartDate"`
	Goal5Dtargetdate  string `json:"goal5dTargetDate"`
	Goal5DMet         bool   `json:"goal5dMet"`
	Goal5DNotMet      bool   `json:"goal5dNotMet"`
	Goal5DOngoing     bool   `json:"goal5dOngoing"`

	Goal5E            bool   `json:"goal5e"`
	Goal5Etype        string `json:"goal5eType"`
	Goal5Elong        string `json:"goal5eLong"`
	Goal5Eresponsible string `json:"goal5eResponsible"`
	Goal5Estartdate   string `json:"goal5eStartDate"`
	Goal5Etargetdate  string `json:"goal5eTargetDate"`
	Goal5EMet         bool   `json:"goal5eMet"`
	Goal5ENotMet      bool   `json:"goal5eNotMet"`
	Goal5EOngoing     bool   `json:"goal5eOngoing"`
}

type SpGoal6 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal6A1            bool   `json:"goal6a1"`
	Goal6A1Type        string `json:"goal6a1Type"`
	Goal6A1Long        string `json:"goal6a1Long"`
	Goal6A1Responsible string `json:"goal6a1Responsible"`
	Goal6A1Startdate   string `json:"goal6a1StartDate"`
	Goal6A1Targetdate  string `json:"goal6a1TargetDate"`

	Goal6A2            bool   `json:"goal6a2"`
	Goal6A2Type        string `json:"goal6a2Type"`
	Goal6A2Long        string `json:"goal6a2Long"`
	Goal6A2Responsible string `json:"goal6a2Responsible"`
	Goal6A2Startdate   string `json:"goal6a2StartDate"`
	Goal6A2Targetdate  string `json:"goal6a2TargetDate"`
	Goal6A2Met         bool   `json:"goal6a2Met"`
	Goal6A2NotMet      bool   `json:"goal6a2NotMet"`
	Goal6A2Ongoing     bool   `json:"goal6a2Ongoing"`

	Goal6A3            bool   `json:"goal6a3"`
	Goal6A3Type        string `json:"goal6a3Type"`
	Goal6A3Long        string `json:"goal6a3Long"`
	Goal6A3Responsible string `json:"goal6a3Responsible"`
	Goal6A3Startdate   string `json:"goal6a3StartDate"`
	Goal6A3Targetdate  string `json:"goal6a3TargetDate"`
	Goal6A3Met         bool   `json:"goal6a3Met"`
	Goal6A3NotMet      bool   `json:"goal6a3NotMet"`
	Goal6A3Ongoing     bool   `json:"goal6a3Ongoing"`

	Goal6A4            bool   `json:"goal6a4"`
	Goal6A4Type        string `json:"goal6a4Type"`
	Goal6A4Long        string `json:"goal6a4Long"`
	Goal6A4Responsible string `json:"goal6a4Responsible"`
	Goal6A4Startdate   string `json:"goal6a4StartDate"`
	Goal6A4Targetdate  string `json:"goal6a4TargetDate"`
	Goal6A4Met         bool   `json:"goal6a4Met"`
	Goal6A4NotMet      bool   `json:"goal6a4NotMet"`
	Goal6A4Ongoing     bool   `json:"goal6a4Ongoing"`

	Goal6A5            bool   `json:"goal6a5"`
	Goal6A5Type        string `json:"goal6a5Type"`
	Goal6A5Long        string `json:"goal6a5Long"`
	Goal6A5Responsible string `json:"goal6a5Responsible"`
	Goal6A5Startdate   string `json:"goal6a5StartDate"`
	Goal6A5Targetdate  string `json:"goal6a5TargetDate"`
	Goal6A5Met         bool   `json:"goal6a5Met"`
	Goal6A5NotMet      bool   `json:"goal6a5NotMet"`
	Goal6A5Ongoing     bool   `json:"goal6a5Ongoing"`

	Goal6B            bool   `json:"goal6b"`
	Goal6Btype        string `json:"goal6bType"`
	Goal6Blong        string `json:"goal6bLong"`
	Goal6Bresponsible string `json:"goal6bResponsible"`
	Goal6Bstartdate   string `json:"goal6bStartDate"`
	Goal6Btargetdate  string `json:"goal6bTargetDate"`
	Goal6BMet         bool   `json:"goal6bMet"`
	Goal6BNotMet      bool   `json:"goal6bNotMet"`
	Goal6BOngoing     bool   `json:"goal6bOngoing"`

	Goal6C            bool   `json:"goal6c"`
	Goal6Ctype        string `json:"goal6cType"`
	Goal6Clong        string `json:"goal6cLong"`
	Goal6Cresponsible string `json:"goal6cResponsible"`
	Goal6Cstartdate   string `json:"goal6cStartDate"`
	Goal6Ctargetdate  string `json:"goal6cTargetDate"`
	Goal6CMet         bool   `json:"goal6cMet"`
	Goal6CNotMet      bool   `json:"goal6cNotMet"`
	Goal6COngoing     bool   `json:"goal6cOngoing"`

	Goal6D            bool   `json:"goal6d"`
	Goal6Dtype        string `json:"goal6dType"`
	Goal6Dlong        string `json:"goal6dLong"`
	Goal6Dresponsible string `json:"goal6dResponsible"`
	Goal6Dstartdate   string `json:"goal6dStartDate"`
	Goal6Dtargetdate  string `json:"goal6dTargetDate"`
	Goal6DMet         bool   `json:"goal6dMet"`
	Goal6DNotMet      bool   `json:"goal6dNotMet"`
	Goal6DOngoing     bool   `json:"goal6dOngoing"`

	Goal6E            bool   `json:"goal6e"`
	Goal6Etype        string `json:"goal6eType"`
	Goal6Elong        string `json:"goal6eLong"`
	Goal6Eresponsible string `json:"goal6eResponsible"`
	Goal6Estartdate   string `json:"goal6eStartDate"`
	Goal6Etargetdate  string `json:"goal6eTargetDate"`
	Goal6EMet         bool   `json:"goal6eMet"`
	Goal6ENotMet      bool   `json:"goal6eNotMet"`
	Goal6EOngoing     bool   `json:"goal6eOngoing"`

	Goal6F            bool   `json:"goal6f"`
	Goal6Ftype        string `json:"goal6fType"`
	Goal6Flong        string `json:"goal6fLong"`
	Goal6Fresponsible string `json:"goal6fResponsible"`
	Goal6Fstartdate   string `json:"goal6fStartDate"`
	Goal6Ftargetdate  string `json:"goal6fTargetDate"`
	Goal6FMet         bool   `json:"goal6fMet"`
	Goal6FNotMet      bool   `json:"goal6fNotMet"`
	Goal6FOngoing     bool   `json:"goal6fOngoing"`
}

type SpGoal7 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal7A            bool   `json:"goal7a"`
	Goal7Atype        string `json:"goal7aType"`
	Goal7Along        string `json:"goal7aLong"`
	Goal7Aresponsible string `json:"goal7aResponsible"`
	Goal7Astartdate   string `json:"goal7aStartDate"`
	Goal7Atargetdate  string `json:"goal7aTargetDate"`

	Goal7B1            bool   `json:"goal7b1"`
	Goal7B1Type        string `json:"goal7b1Type"`
	Goal7B1Long        string `json:"goal7b1Long"`
	Goal7B1Responsible string `json:"goal7b1Responsible"`
	Goal7B1Startdate   string `json:"goal7b1StartDate"`
	Goal7B1Targetdate  string `json:"goal7b1TargetDate"`
	Goal7B1Met         bool   `json:"goal7b1Met"`
	Goal7B1NotMet      bool   `json:"goal7b1NotMet"`
	Goal7B1Ongoing     bool   `json:"goal7b1Ongoing"`

	Goal7B2            bool   `json:"goal7b2"`
	Goal7B2Type        string `json:"goal7b2Type"`
	Goal7B2Long        string `json:"goal7b2Long"`
	Goal7B2Responsible string `json:"goal7b2Responsible"`
	Goal7B2Startdate   string `json:"goal7b2StartDate"`
	Goal7B2Targetdate  string `json:"goal7b2TargetDate"`
	Goal7B2Met         bool   `json:"goal7b2Met"`
	Goal7B2NotMet      bool   `json:"goal7b2NotMet"`
	Goal7B2Ongoing     bool   `json:"goal7b2Ongoing"`

	Goal7B3            bool   `json:"goal7b3"`
	Goal7B3Type        string `json:"goal7b3Type"`
	Goal7B3Long        string `json:"goal7b3Long"`
	Goal7B3Responsible string `json:"goal7b3Responsible"`
	Goal7B3Startdate   string `json:"goal7b3StartDate"`
	Goal7B3Targetdate  string `json:"goal7b3TargetDate"`
	Goal7B3Met         bool   `json:"goal7b3Met"`
	Goal7B3NotMet      bool   `json:"goal7b3NotMet"`
	Goal7B3Ongoing     bool   `json:"goal7b3Ongoing"`

	Goal7B4            bool   `json:"goal7b4"`
	Goal7B4Type        string `json:"goal7b4Type"`
	Goal7B4Long        string `json:"goal7b4Long"`
	Goal7B4Responsible string `json:"goal7b4Responsible"`
	Goal7B4Startdate   string `json:"goal7b4StartDate"`
	Goal7B4Targetdate  string `json:"goal7b4TargetDate"`
	Goal7B4Met         bool   `json:"goal7b4Met"`
	Goal7B4NotMet      bool   `json:"goal7b4NotMet"`
	Goal7B4Ongoing     bool   `json:"goal7b4Ongoing"`

	Goal7C            bool   `json:"goal7c"`
	Goal7Ctype        string `json:"goal7cType"`
	Goal7Clong        string `json:"goal7cLong"`
	Goal7Cresponsible string `json:"goal7cResponsible"`
	Goal7Cstartdate   string `json:"goal7cStartDate"`
	Goal7Ctargetdate  string `json:"goal7cTargetDate"`
	Goal7CMet         bool   `json:"goal7cMet"`
	Goal7CNotMet      bool   `json:"goal7cNotMet"`
	Goal7COngoing     bool   `json:"goal7cOngoing"`

	Goal7D            bool   `json:"goal7d"`
	Goal7Dtype        string `json:"goal7dType"`
	Goal7Dlong        string `json:"goal7dLong"`
	Goal7Dresponsible string `json:"goal7dResponsible"`
	Goal7Dstartdate   string `json:"goal7dStartDate"`
	Goal7Dtargetdate  string `json:"goal7dTargetDate"`
	Goal7DMet         bool   `json:"goal7dMet"`
	Goal7DNotMet      bool   `json:"goal7dNotMet"`
	Goal7DOngoing     bool   `json:"goal7dOngoing"`

	Goal7E1            bool   `json:"goal7e1"`
	Goal7E1Type        string `json:"goal7e1Type"`
	Goal7E1Long        string `json:"goal7e1Long"`
	Goal7E1Responsible string `json:"goal7e1Responsible"`
	Goal7E1Startdate   string `json:"goal7e1StartDate"`
	Goal7E1Targetdate  string `json:"goal7e1TargetDate"`
	Goal7E1Met         bool   `json:"goal7e1Met"`
	Goal7E1NotMet      bool   `json:"goal7e1NotMet"`
	Goal7E1Ongoing     bool   `json:"goal7e1Ongoing"`

	Goal7E2            bool   `json:"goal7e2"`
	Goal7E2Type        string `json:"goal7e2Type"`
	Goal7E2Long        string `json:"goal7e2Long"`
	Goal7E2Responsible string `json:"goal7e2Responsible"`
	Goal7E2Startdate   string `json:"goal7e2StartDate"`
	Goal7E2Targetdate  string `json:"goal7e2TargetDate"`
	Goal7E2Met         bool   `json:"goal7e2Met"`
	Goal7E2NotMet      bool   `json:"goal7e2NotMet"`
	Goal7E2Ongoing     bool   `json:"goal7e2Ongoing"`

	Goal7E3            bool   `json:"goal7e3"`
	Goal7E3Type        string `json:"goal7e3Type"`
	Goal7E3Long        string `json:"goal7e3Long"`
	Goal7E3Responsible string `json:"goal7e3Responsible"`
	Goal7E3Startdate   string `json:"goal7e3StartDate"`
	Goal7E3Targetdate  string `json:"goal7e3TargetDate"`
	Goal7E3Met         bool   `json:"goal7e3Met"`
	Goal7E3NotMet      bool   `json:"goal7e3NotMet"`
	Goal7E3Ongoing     bool   `json:"goal7e3Ongoing"`

	Goal7E4            bool   `json:"goal7e4"`
	Goal7E4Type        string `json:"goal7e4Type"`
	Goal7E4Long        string `json:"goal7e4Long"`
	Goal7E4Responsible string `json:"goal7e4Responsible"`
	Goal7E4Startdate   string `json:"goal7e4StartDate"`
	Goal7E4Targetdate  string `json:"goal7e4TargetDate"`
	Goal7E4Met         bool   `json:"goal7e4Met"`
	Goal7E4NotMet      bool   `json:"goal7e4NotMet"`
	Goal7E4Ongoing     bool   `json:"goal7e4Ongoing"`

	Goal7E5            bool   `json:"goal7e5"`
	Goal7E5Type        string `json:"goal7e5Type"`
	Goal7E5Long        string `json:"goal7e5Long"`
	Goal7E5Responsible string `json:"goal7e5Responsible"`
	Goal7E5Startdate   string `json:"goal7e5StartDate"`
	Goal7E5Targetdate  string `json:"goal7e5TargetDate"`
	Goal7E5Met         bool   `json:"goal7e5Met"`
	Goal7E5NotMet      bool   `json:"goal7e5NotMet"`
	Goal7E5Ongoing     bool   `json:"goal7e5Ongoing"`

	Goal7E6            bool   `json:"goal7e6"`
	Goal7E6Type        string `json:"goal7e6Type"`
	Goal7E6Long        string `json:"goal7e6Long"`
	Goal7E6Responsible string `json:"goal7e6Responsible"`
	Goal7E6Startdate   string `json:"goal7e6StartDate"`
	Goal7E6Targetdate  string `json:"goal7e6TargetDate"`
	Goal7E6Met         bool   `json:"goal7e6Met"`
	Goal7E6NotMet      bool   `json:"goal7e6NotMet"`
	Goal7E6Ongoing     bool   `json:"goal7e6Ongoing"`

	Goal7E7            bool   `json:"goal7e7"`
	Goal7E7Type        string `json:"goal7e7Type"`
	Goal7E7Text        string `json:"goal7e7Text"`
	Goal7E7Long        string `json:"goal7e7Long"`
	Goal7E7Responsible string `json:"goal7e7Responsible"`
	Goal7E7Startdate   string `json:"goal7e7StartDate"`
	Goal7E7Met         bool   `json:"goal7e7Met"`
	Goal7E7NotMet      bool   `json:"goal7e7NotMet"`
	Goal7E7Ongoing     bool   `json:"goal7e7Ongoing"`
	Goal7E7Targetdate  string `json:"goal7e7TargetDate"`
}

type SpGoal8 struct {
	gorm.Model
	Sp uint `json:"sp"`

	Goal8A            bool   `json:"goal8a"`
	Goal8Atype        string `json:"goal8aType"`
	Goal8Along        string `json:"goal8aLong"`
	Goal8Aresponsible string `json:"goal8aResponsible"`
	Goal8Astartdate   string `json:"goal8aStartDate"`
	Goal8Atargetdate  string `json:"goal8aTargetDate"`

	Goal8B            bool   `json:"goal8b"`
	Goal8Btype        string `json:"goal8bType"`
	Goal8Blong        string `json:"goal8bLong"`
	Goal8Bresponsible string `json:"goal8bResponsible"`
	Goal8Bstartdate   string `json:"goal8bStartDate"`
	Goal8Btargetdate  string `json:"goal8bTargetDate"`
	Goal8BMet         bool   `json:"goal8bMet"`
	Goal8BNotMet      bool   `json:"goal8bNotMet"`
	Goal8BOngoing     bool   `json:"goal8bOngoing"`

	Goal8C            bool   `json:"goal8c"`
	Goal8Ctype        string `json:"goal8cType"`
	Goal8Clong        string `json:"goal8cLong"`
	Goal8Cresponsible string `json:"goal8cResponsible"`
	Goal8Cstartdate   string `json:"goal8cStartDate"`
	Goal8Ctargetdate  string `json:"goal8cTargetDate"`
	Goal8CMet         bool   `json:"goal8cMet"`
	Goal8CNotMet      bool   `json:"goal8cNotMet"`
	Goal8COngoing     bool   `json:"goal8cOngoing"`

	Goal8D            bool   `json:"goal8d"`
	Goal8Dtype        string `json:"goal8dType"`
	Goal8Dlong        string `json:"goal8dLong"`
	Goal8Dresponsible string `json:"goal8dResponsible"`
	Goal8Dstartdate   string `json:"goal8dStartDate"`
	Goal8Dtargetdate  string `json:"goal8dTargetDate"`
	Goal8DMet         bool   `json:"goal8dMet"`
	Goal8DNotMet      bool   `json:"goal8dNotMet"`
	Goal8DOngoing     bool   `json:"goal8dOngoing"`

	Goal8E            bool   `json:"goal8e"`
	Goal8Etype        string `json:"goal8eType"`
	Goal8Etext        string `json:"goal8eText"`
	Goal8Elong        string `json:"goal8eLong"`
	Goal8Eresponsible string `json:"goal8eResponsible"`
	Goal8Estartdate   string `json:"goal8eStartDate"`
	Goal8EMet         bool   `json:"goal8eMet"`
	Goal8ENotMet      bool   `json:"goal8eNotMet"`
	Goal8EOngoing     bool   `json:"goal8eOngoing"`
	Goal8Etargetdate  string `json:"goal8eTargetDate"`
}

type ClientSCMSp struct {
	gorm.Model
	Client              uint   `json:"client_id"` // ID of the client
	Scm                 uint   `json:"scm"`
	Developmentdate     string `json:"developmentDate"`
	Axiscode            string `json:"axisCode"`
	Axiscodedescription string `json:"axisCodeDescription"`
	Tcm                 int    `json:"tcm"`
	Nametcm             string `json:"nameTCM"`
	Categorytcm         string `json:"categoryTCM"`
	Signaturetcm        string `json:"-"`
	Signaturetcmdate    string `json:"signatureTcmDate"`

	Supervisor              int    `json:"supervisor"`
	NameSupervisor          string `json:"nameSupervisor"`
	CategorySupervisor      string `json:"categorySupervisor"`
	Signaturesupervisor     string `json:"-"`
	Signaturesupervisordate string `json:"signatureSupervisorDate"`

	Qa              int    `json:"qa"`
	Signatureqa     string `json:"-"`
	Signatureqadate string `json:"signatureQaDate"`
}

// --------------------------------------------
type RequestNewClient struct {
	gorm.Model
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
	Address   string `json:"address"`
	State     string `json:"state"`
	ZipCode   string `json:"zip_code"`
	Phone     string `json:"phone"`
	School    string `json:"school"`
	Lenguage  string `json:"lenguage"`

	LegalGuardian     string `json:"legal_guardian"`
	Relationship      string `json:"relationship"`
	CellPhoneGuardian string `json:"cell_phone_guardian"`

	Medicaid       string `json:"medicalid"`
	GoldCardNumber string `json:"gold_card_number"`
	Medicare       string `json:"medicare"`
	PlanName       string `json:"plan_name"`
	PlanID         string `json:"plan_id"`

	Evaluation bool `json:"evaluation"`

	MentalPrimary       string `json:"mental_primary"`
	MentalPrimaryDate   string `json:"mental_primary_date"`
	MentalSecondary     string `json:"mental_secondary"`
	MentalSecondaryDate string `json:"mental_secondary_date"`

	CaseManagement    bool `json:"case_management"`
	IndividualTherapy bool `json:"individual_therapy"`
	FamilyTherapy     bool `json:"family_therapy"`
	AdultPsr          bool `json:"adult_psr"`
	Psychiatrist      bool `json:"psychiatrist"`
	Other             bool `json:"other"`
}
