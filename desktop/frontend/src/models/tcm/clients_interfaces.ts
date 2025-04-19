// Request New Client
export interface FormRequestNewClient {
    client_id: number;
    referring_agency: string;
    referring_person: string;
    cell_phone: string;
    fax: string;
    email: string;
    date: string;

    last_name: string;
    first_name: string;
    ss: string;
    dob: string;
    sexo: string;
    race: string;

    address: string;
    state: string;
    zip_code: string;

    phone: string;
    school: string;
    lenguage: string;

    legal_guardian: string;
    relationship: string;
    cell_phone_guardian: string;

    medicalid: string;
    gold_card_number: string;
    medicare: string;
    plan_name: string;
    plan_id: string;

    reason: string;
    evaluation: boolean;
    // TODO: add in back
    mental_primary: string;
    mental_primary_date: string;
    mental_secondary: string;
    mental_secondary_date: string;

    case_management: boolean;
    individual_therapy: boolean;
    family_therapy: boolean;
    adult_psr: boolean;
    psychiatrist: boolean;
    other: boolean;
}
// New Client
export interface FormNewClient {
    client_id: string;
    mr: number;
    referring_agency: string;
    referring_person: string;
    cell_phone: string;
    fax: string;
    email: string;
    date: string;

    last_name: string;
    first_name: string;
    ss: string;
    dob: string;
    sexo: string;
    race: string;

    address: string;
    state: string;
    zip_code: string;

    phone: string;
    school: string;
    lenguage: string;

    legal_guardian: string;
    relationship: string;
    cell_phone_guardian: string;

    medicalid: string;
    gold_card_number: string;
    medicare: string;

    reason: string;
    evaluation: boolean;

    // TODO: add in back
    mental_primary: string;
    mental_primary_date: string;
    mental_secondary: string;
    mental_secondary_date: string;

    case_management: boolean;
    individual_therapy: boolean;
    family_therapy: boolean;
    adult_psr: boolean;
    psychiatrist: boolean;
    other: boolean;
}

export interface FormRequestEditClient {
    id: number;
    referring_agency: string;
    referring_person: string;
    cell_phone: string;
    fax: string;
    email: string;
    date: string;

    last_name: string;
    first_name: string;
    ss: string;
    dob: string;
    sexo: string;
    race: string;

    address: string;
    state: string;
    zip_code: string;

    phone: string;
    school: string;
    lenguage: string;
    sign_client: string;

    legal_guardian: string;
    relationship: string;
    cell_phone_guardian: string;
    sign_guardian: string;

    medicalid: string;
    gold_card_number: string;
    medicare: string;

    reason: string;
    evaluation: boolean;
}

export interface FormValuesConnsents {
    connsentsInitial: string;
    connsentsClientSign: string;
    connsentsGuardianSign: string;
    connsentsWitnessSign: string;
    connsentsDr: string;
    connsentsDrPhone: string;
    connsentsDrFax: string;
    connsentsPCP: boolean;
    connsentsAuthorize: string;
    connsentsGrievanceName: string;
    connsentsGrievanceDate: string;
    connsentsGrievanceRelationship: string;
    connsentsGrievanceOther: string;
    connsentsGrievancePhone: string;
    connsentsGrievanceFax: string;
    connsentsGrievanceNature: string;
    connsentsTCM: string;
    connsentsTCM1: string;
    connsentsapprovedTCM: boolean;
    connsentsApprovedSupervisor: boolean;
    connsentsapprovedQa: boolean;
}