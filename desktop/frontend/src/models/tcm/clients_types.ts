import { ServiceCM, Notes, Weeks } from "../index"

export type RequestNewClient = {
    ID: string;
    CreatedAt: string;
    ReferrerID: number;  // ID of the user who referred this user (optional)
    ReferringAgency: string;
    ReferringPerson: string;
    CellPhone: string;
    Fax: string;
    Email: string;
    Date: string;

    LastName: string;
    FirstName: string;

    DOB: string;
    Sexo: string;

    Medicaid: string;
    GoldCardNumber: string;
    Medicare: string;
    City: string;
    State: string;
    ZipCode: string;
    HomePhoneClient: string;
    CellPhoneClient: string;
    SocialSecurity: string;
    Lenguage: string;
    LegalGuardian: string;
    Relationship: string;
    ContactInformation: string;
    CellPhoneGuardian: string;
    Reason: string;

    Evaluation: boolean;
    CaseManagement: boolean;
    IndividualTherapy: boolean;
    FamilyTherapy: boolean;
    AdultPsr: boolean;
    Psychiatrist: boolean;
    Other: boolean;
}

export type Requests = {
    request?: RequestNewClient[];
};

export type Client = {
    id: string;
    CreatedAt: string;
    mr: number; // MR number
    ReferrerID: number;  // ID of the user who referred this user (optional)

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

    medicaid: string;
    gold_card_number: string;
    medicare: string;
    tcm_active: string;
    tcm_photo: string;
    tcms_active: string;
    tcms_photo: string;

    reason: string;
    evaluation: boolean;

    scm: ServiceCM[];
}

export type Paginate = {
    limit: number,
    page: number,
    sort: string,
    totalItems: number,
    totalPages: number,
    hasPrev: boolean,
    hasNext: boolean,
    items: [],
    prevURL: string,
    nextURL: string,
}

export type Clients = {
    clients?: Client[];
};

export type ClientSupervise = {
    id: string;
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
    certification: boolean;
    assessment: boolean;
    sp: boolean
    scm: ServiceCM;
}

export type ClientR = {
    id: string;
    CreatedAt: string;
    ReferrerID: number;  // ID of the user who referred this user (optional)
    last_name: string;
    first_name: string;
    Sexo: string;
    dob: string;
    Medicaid: string;
    GoldCardNumber: string;
    Medicare: string;
    City: string;
    State: string;
    ZipCode: string;
    HomePhoneClient: string;
    CellPhoneClient: string;
    SocialSecurity: string;
    Lenguage: string;
    legal_guardian: string;
    Relationship: string;
    ContactInformation: string;
    CellPhoneGuardian: string;
    Reason: string;
    Evaluation: boolean;
}

export type ClientInfo = {
    client?: ClientR;
};

export type ClientsSupervise = {
    clients?: ClientSupervise[];
};

export type ClientNotes = {
    week?: Weeks;
    all_notes?: Notes[];
    day_notes?: Notes[];
    notes_week_active?: Notes[];
    current_week?: Notes[];
};

export type ClientsBill = {
    id: string;
    last_name: string;
    first_name: string;
    ss: string;
    dob: string;
    medicaid: string;
    gold_card_number: string;
    medicare: string;
    sure: string;
    notes: Notes[];
    scm: ServiceCM;
}

export type Billing = {
    id: number,
    week: number,
    date: string,
    units: number,
    pay_rate: number,
    hours: number,
    week_pay: number,
    // TCM
    tcm: number,
    tcm_full_name: string,
    tcm_credentials: string,
    tcm_signature: string,
    signatureTcmDate: string,
    // TCMS
    tcms: number,
    tcms_full_name: string,
    tcms_signature: string,
    signatureTCMSDate: string,
    // Biller
    biller: number,
    biller_full_name: string,
    biller_signature: string,
    signatureBillerDate: string,
    biller2: number,
    biller2_full_name: string,
    biller2_signature: string,
    signatureBiller2Date: string,
    biller3: number,
    biller3_full_name: string,
    biller3_signature: string,
    signatureBiller3Date: string,

    // Finance
    finance: number,
    finance_full_name: string,
    finance_signature: string,
    signaturefinanceDate: string,
    finance2: number,
    finance2_full_name: string,
    finance2_signature: string,
    signaturefinance2Date: string,
    finance3: number,
    finance3_full_name: string,
    finance3_signature: string,
    signaturefinance3Date: string,

}

export type TcmNotesBill = {
    week?: Weeks;
    clients?: ClientsBill[];
    billing?: Billing;
    amount_notes?: number,
    units?: number,
    pay_rate?: number,
    hours?: number,
    week_pay?: number,
};

export type TcmsNotesBill = {
    week?: Weeks;
    clients?: ClientsBill[];
    billing?: Billing;
    notes?: Notes[];
    amount_notes?: number,
    units?: number,
    pay_rate?: number,
    hours?: number,
    week_pay?: number,
};

type DateType = string;

export type Month = {
    month: string;
    date: DateType[];
}

export type Year = {
    year: string;
    month: Month[];
}

export type Billingg = {
    year: Year[];
}

export type Billings = {
    billing: Billingg;
}