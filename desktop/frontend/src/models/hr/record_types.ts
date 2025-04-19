export type Record = {
    ID: string;
    fullname?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    county?: string;
    home_phone?: string;
    cell_phone?: string;
    social_security?: string;
    dob?: string;
    application_date?: string;
    applying_as?: string;
    position_applied?: string;
    available_start_date?: string;
    available_for?: string;
    question1?: string;
    question2?: string;
    question3?: string;
    question4?: string;
    question5?: string;
    question6?: string;
    question7?: string;
    question8?: string;
    question9?: string;
    details_questions_in_yes?: string;
    question10?: string;
    charged_explain?: string;
    signature?: string;
    question11?: string;
    question12?: string;
    language_list?: string;
    skills_list?: string;
    education: Education;
    employment_history: EmploymentHistory;
    personal_references: PersonalReferences;
    emergency_medical: EmergencyMedical;
    necessary_documents: NecesaryDocument;
    direct_deposit: DirectDeposit;
};

export type Education = {
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

export type EmploymentHistory = {
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
};

export type PersonalReferences = {
    name: string;
    phone: string;
    relationship: string;
    second_name: string;
    second_phone: string;
    second_relationship: string;
};

export type EmergencyMedical = {
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
};

export type NecesaryDocument = {
    resume: boolean;
    diploma_transcripts: boolean;
    licenses_certifications: boolean;
    course_fcb: boolean;
    service_trainer_provider: boolean;
    service_trainer_provider_date: string;
    service_cpr_aed: boolean;
    service_cpr_aed_date: string;
    service_osha: boolean;
    service_osha_date: string;
    service_infection_control: boolean;
    service_infection_control_date: string;
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
};

// Direct Deposit
export interface DirectDeposit {
    financial_institution: string;
    routing_number: string;
    account_number: string;
    options: string;
}