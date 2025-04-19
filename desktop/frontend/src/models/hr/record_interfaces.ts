// HIRING Personal information ------------------------------------------------------------------
export interface FormValuesPersonalInformation {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    homePhone: string;
    cellPhone: string;
    socialSecurity: string;
    dob: string;
    application_date: string;
    applying_as: string;
    position_applied: string;
    available_start_date: string;
    available_for: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    question7: string;
    question8: string;
    question9: string;
    question10: string;
    details_questions_in_yes: string;
    signature: string;
    question11: string;
    question12: string;
    languages_list: string;
    special_skills: string;
}

export interface ButtonVisibilityPersonalInformation {
    fullName: false;
    email: false;
    address: false;
    city: false;
    state: false;
    zipCode: false;
    county: false;
    homePhone: false;
    cellPhone: false;
    socialSecurity: false;
    dob: false;
    application_date: false;
    applying_as: false;
    position_applied: false;
    available_start_date: false;
    available_for: false;
    question1: false;
    question2: false;
    question3: false;
    question4: false;
    question5: false;
    question6: false;
    question7: false;
    question8: false;
    question9: false;
    question10: false;
    details_questions_in_yes: false;
    signature: false;
    question11: false;
    question12: false;
    languages_list: false;
    special_skills: false;
}

// EDUCATIONS
export interface FormValuesEducation {
    institution: string;
    course: string;
    started: string;
    completed: string;
    second_institution: string;
    second_course: string;
    second_started: string;
    second_completed: string;
    third_institution: string;
    third_course: string;
    third_started: string;
    third_completed: string;
}
export interface ButtonVisibilityEducation {
    institution: false;
    course: false;
    started: false;
    completed: false;
    second_institution: false;
    second_course: false;
    second_started: false;
    second_completed: false;
    third_institution: false;
    third_course: false;
    third_started: false;
    third_completed: false;
}

// EMPLOYMENT HISTORY
export interface FormValuesEmploymentHistory {
    employer: string;
    address: string;
    supervisor: string;
    phone: string;
    period: string;
    position: string;
    reason: string;
    second_employer: string;
    second_address: string;
    second_supervisor: string;
    second_phone: string;
    second_period: string;
    second_position: string;
    second_reason: string;
}
export interface ButtonVisibilityEmploymentHistory {
    employer: false;
    address: false;
    supervisor: false;
    phone: false;
    period: false;
    position: false;
    reason: false;
    second_employer: false;
    second_address: false;
    second_supervisor: false;
    second_phone: false;
    second_period: false;
    second_position: false;
    second_reason: false;
}

// PERSONAL REFERENCES
export interface FormValuesPersonalReferences {
    name: string;
    phone: string;
    relationship: string;
    second_name: string;
    second_phone: string;
    second_relationship: string;
}

export interface ButtonVisisbilityPersonalRefereces {
    name: false;
    phone: false;
    relationship: false;
    second_name: false;
    second_phone: false;
    second_relationship: false;
}

// EMERGENCY MEDICAL
export interface FormValuesEmergencyMedical {
    name: string;
    relationship: string;
    home_phone: string;
    cell_phone: string;
    employer: string;
    employer_phone: string;
    known_allergies: string;
    health_condition: string;
    medications: string;
    physicians_name: string;
    physicians_phone: string;
    preferred_hospital: string;
    medical_insurance: string;
    policy: string;
}

export interface ButtonVisisbilityEmergencyMedical {
    name: false;
    relationship: false;
    home_phone: false;
    cell_phone: false;
    employer: false;
    employer_phone: false;
    known_allergies: false;
    health_condition: false;
    medications: false;
    physicians_name: false;
    physicians_phone: false;
    preferred_hospital: false;
    medical_insurance: false;
    policy: false;
}

// NECESARY DOCUMENTS
export interface FormValuesNecesaryDocuments {
    resume: boolean;
    diploma_transcripts: boolean;
    licenses_certifications: boolean;
    course_fcb: boolean;
    service_trainer_provider: boolean;
    service_cpr_aed: boolean;
    service_osha: boolean;
    service_infection_control: boolean;
    service_hiv_aids: boolean;
    service_domestic_violence: boolean;
    service_hippa: boolean;
    service_security_awareness: boolean;
    service_access_civil_rights: boolean;
    service_deaf_hard: boolean;
    service_fars_cfars: boolean;
    other_medicaid_certification: boolean;
    other_medicaid_provider: boolean;
    other_drivers_license: boolean;
    other_social_security_card: boolean;
    other_proof_legal_status: boolean;
    other_employee_id_badge: boolean;
    other_vehicle_registration: boolean;
    other_proof_insurance: boolean;
    form_i9: boolean;
    form_w9: boolean;
    form_w4: boolean;
}

// Direct Deposit
export interface FormValuesDirectDeposit {
    financial_institution: string;
    routing_number: string;
    account_number: string;
    options: string;
}

export interface ButtonVisisbilityDirectDeposit {
    financial_institution: false;
    routing_number: false;
    account_number: false;
    options: false;
}
