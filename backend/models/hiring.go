package models

type FormPersonalinformation struct {
	Personalinformation struct {
		Fullname       string `json:"fullName"`
		Email          string `json:"email"`
		Address        string `json:"address"`
		City           string `json:"city"`
		State          string `json:"state"`
		Zipcode        string `json:"zipCode"`
		County         string `json:"county"`
		Homephone      string `json:"homePhone"`
		Cellphone      string `json:"cellPhone"`
		SocialSecurity string `json:"socialSecurity"`
		Dob            string `json:"dob"`

		ApplicationDate       string `json:"application_date"`
		ApplyingAs            string `json:"applying_as"`
		PositionApplied       string `json:"position_applied"`
		AvailableStartDate    string `json:"available_start_date"`
		AvailableFor          string `json:"available_for"`
		Question1             string `json:"question1"`
		Question2             string `json:"question2"`
		Question3             string `json:"question3"`
		Question4             string `json:"question4"`
		Question5             string `json:"question5"`
		Question6             string `json:"question6"`
		Question7             string `json:"question7"`
		Question8             string `json:"question8"`
		Question9             string `json:"question9"`
		Question10            string `json:"question10"`
		DetailsQuestionsInYes string `json:"details_questions_in_yes"`
		Question11            string `json:"question11"`
		Question12            string `json:"question12"`
		LanguagesList         string `json:"languages_list"`
		SpecialSkills         string `json:"special_skills"`
	} `json:"personalInformation"`
}
type FormEmploymentHistory struct {
	Employmenthistory struct {
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
	} `json:"employmentHistory"`
}
type FormPersonalreferences struct {
	Personalreferences struct {
		Name               string `json:"name"`
		Phone              string `json:"phone"`
		Relationship       string `json:"relationship"`
		SecondName         string `json:"second_name"`
		SecondPhone        string `json:"second_phone"`
		SecondRelationship string `json:"second_relationship"`
	} `json:"personalReferences"`
}

type FormEmergencyMedical struct {
	Emergencymedical struct {
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
	} `json:"emergencyMedical"`
}

type FormEducation struct {
	Education struct {
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
	} `json:"education"`
}

type FormDirectDeposit struct {
	Directdeposit struct {
		FinancialInstitution string `json:"financial_institution"`
		RoutingNumber        string `json:"routing_number"`
		AccountNumber        string `json:"account_number"`
		Options              string `json:"options"`
	} `json:"directDeposit"`
}
