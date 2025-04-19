export interface FormNewCaseManagement {
    tcm: string;
    status: string;
    doa: string;
}

export interface FromNewScmSure {
    plan_name: string;
    plan_id: string;
    auth: boolean;
    auth_date: string;
    auth_unit: number;
    active: boolean;
}

export interface FromEditScmSure {
    id: number;
    plan_name: string;
    plan_id: string;
    auth: boolean;
    deny: boolean;
    auth_date_start: string;
    auth_date_end: string;
    unit: number;
    time_range: number;
    active: boolean;
}

export interface FromSubmitScmSure {
    id: number;
    scm: number;
    plan_name: string;
    plan_id: string;
    auth: boolean;
    deny: boolean;
    auth_date_start: string;
    auth_date_end: string;
    unit: number;
    time_range: number;
    active: boolean;
    // -----
    tcm: number;
    submit: boolean;
    
    supervisor: number;
    supervisor_approbe: boolean;

    qa: number;
    qa_approbe: boolean;

}

export type FormEditMedical = {
    id: number;
    medical_pcp: string;
    medical_pcp_address: string;
    medical_pcp_phone: string;
    medical_psychiatrisy: string;
    medical_psychiatrisy_address: string;
    medical_psychiatrisy_phone: string;
}

export type FormEditMental = {
    id: number;
    mental_primary: string;
    mental_primary_date: string;
    mental_secondary: string;
    mental_secondary_date: string;
}

// export interface FormValuesConnsents {
//     connsentsInitial: string;
//     connsentsClientSign: string;
//     connsentsGuardianSign: string;
//     connsentsWitnessSign: string;
//     connsentsDr: string;
//     connsentsDrPhone: string;
//     connsentsDrFax: string;
//     connsentsPCP: boolean;
//     connsentsAuthorize: string;
//     connsentsGrievanceName: string;
//     connsentsGrievanceDate: string;
//     connsentsGrievanceRelationship: string;
//     connsentsGrievanceOther: string;
//     connsentsGrievancePhone: string;
//     connsentsGrievanceFax: string;
//     connsentsGrievanceNature: string;
//     connsentsTCM: string;
//     connsentsTCM1: string;
//     connsentsapprovedTCM: boolean;
//     connsentsApprovedSupervisor: boolean;
//     connsentsapprovedQa: boolean;
// }

export interface FormValueCertification {
    scm: Number;
    select_1: boolean;
    select_2: boolean;
    select_3: boolean;
    select_4: boolean;
    select_5: boolean;
    select_6: boolean;
    select_7: boolean;
    select_8: boolean;
    select_8a: boolean;
    select_8b: boolean;
    select_8c: boolean;
    select_8d: boolean;
    select_8e: boolean;
    select_9: boolean;

    tcm: number;
    nameTCM: string;
    categoryTCM: string;
    signTcm: string;
    dateTcm: string;

    supervisor: number;
    nameSupervisor: string;
    categorySupervisor: string;
    signSupervisor: string;
    dateSupervisor: string;

    QA: string;
    signQA: string;
}

export interface FormValueAssessment {
    scm: Number;
    sourceInforemationClient: string;
    sourceInforemationDfc: string;
    sourceInforemationBFF: string;
    sourceInforemationBFFisYes: string;
    sourceInforemationCpa: string;
    sourceInforemationSdp: string;
    sourceInforemationPp: string;
    sourceInforemationPpisYes: string;
    sourceInforemationFf: string;
    sourceInforemationLdrsi1: boolean;
    sourceInforemationLdrsi2: boolean;
    sourceInforemationLdrsi3: boolean;
    sourceInforemationLdrsi4: boolean;
    sourceInforemationLdrsi5: boolean;
    sourceInforemationLdrsi6: boolean;
    sourceInforemationLdrsi7: boolean;
    sourceInforemationLdrsi8: boolean;
    sourceInforemationLdrsiOther: string;
    // -------------------
    presentProblems: string;
    clientLegalRepresentative: string;
    // -------------------
    listRecipientStrengths: string;
    listRecipientStrengths1: string;
    listRecipientStrengths2: string;
    listRecipientStrengths3: string;
    listRecipientStrengths4: string;
    listRecipientweakness: string;
    listRecipientweakness1: string;
    listRecipientweakness2: string;
    listRecipientweakness3: string;
    listRecipientweakness4: string;
    // Page 2
    listResources: string;
    // PSYCHOSOCIAL/FAMILY HISTORY:
    psyFamily1A: string;
    psyFamily1Aroom: string;
    psyFamily1Abath: string;
    psyFamily1B: string;
    psyFamily1C: string;
    psyFamily1Cmpsr: string;
    psyFamily1D: string;
    psyFamily1Dmpsb: string;
    psyFamily1E: string;
    psyFamily1EifYes: string;
    // --
    psyFamily2A: string;
    psyFamily2B: string;
    psyFamily3: string;
    psyFamily3ifYes: string;
    psyFamily4: string;
    psyFamily5_1: boolean;
    psyFamily5_2: boolean;
    psyFamily5_3: boolean;
    psyFamily5_4: boolean;
    psyFamily5_5: boolean;
    psyFamily5_6: boolean;
    psyFamily5_7: boolean;
    psyFamily5_8: boolean;
    psyFamily5_9: boolean;
    psyFamily5_10: boolean;
    psyFamily5_11: boolean;
    psyFamily5_12: boolean;
    psyFamily5_13: boolean;
    psyFamily5_14: boolean;
    psyFamily5_15: boolean;
    psyFamily5_16: boolean;
    // PSYCHIATRIC/MEDICAL HISTORY
    psyMedicalHistoryCountryP: string;
    psyMedicalHistoryUsaP: string;
    psyMedicalHistoryCountry_1: string;
    psyMedicalHistoryCountry_1ifYes: string;
    psyMedicalHistoryUsa_1: string;
    psyMedicalHistoryUsa_1ifYes: string;
    psyMedicalHistoryCountry_2: string;
    psyMedicalHistoryUsa_2: string;
    psyMedicalHistoryCountry_3: string;
    psyMedicalHistoryUsa_3: string;
    psyMedicalHistoryCountry_4: string;
    psyMedicalHistoryUsa_4: string;
    psyMedicalHistoryCountry_5: string;
    psyMedicalHistoryCountry_5ifYes: string;
    psyMedicalHistoryUsa_5: string;
    psyMedicalHistoryUsa_5ifYes: string;
    psyMedicalHistoryCountry_6: string;
    psyMedicalHistoryCountry_6ifYes: string;
    psyMedicalHistoryUsa_6: string;
    psyMedicalHistoryUsa_6ifYes: string;
    psyMedicalHistoryCountry_7: string;
    psyMedicalHistoryUsa_7: string;
    psyMedicalHistoryCountry_8: string;
    psyMedicalHistoryUsa_8: string;
    psyMedicalHistoryCountry_9: string;
    psyMedicalHistoryUsa_9: string;
    psyMedicalHistoryCountry_10: string;
    psyMedicalHistoryCountry_10ifYes: string;
    psyMedicalHistoryUsa_10: string;
    psyMedicalHistoryUsa_10ifYes: string;
    // family
    psyMedicalHistoryFamily_Mother_Mental: string;
    psyMedicalHistoryFamily_Mother_Medical: string;
    psyMedicalHistoryFamily_Father_Mental: string;
    psyMedicalHistoryFamily_Father_Medical: string;
    psyMedicalHistoryFamily_Siblings_Mental: string;
    psyMedicalHistoryFamily_Siblings_Medical: string;
    psyMedicalHistoryFamily_Other_Mental: string;
    psyMedicalHistoryFamily_Other_Medical: string;
    // Page 3
    currentMedication1: string;
    dosage1: string;
    prescribing1: string;
    currentMedication2: string;
    dosage2: string;
    prescribing2: string;
    currentMedication3: string;
    dosage3: string;
    prescribing3: string;
    currentMedication4: string;
    dosage4: string;
    prescribing4: string;
    currentMedication5: string;
    dosage5: string;
    prescribing5: string;
    currentMedication6: string;
    dosage6: string;
    prescribing6: string;
    currentMedication7: string;
    dosage7: string;
    prescribing7: string;
    currentMedication8: string;
    dosage8: string;
    prescribing8: string;
    currentMedication9: string;
    dosage9: string;
    prescribing9: string;
    currentMedication10: string;
    dosage10: string;
    prescribing10: string;
    // Substance
    substance_Alcohol: string;
    substance_Methadone: string;
    substance_Stimulants: string;
    substance_Hallucinogens: string;
    substance_Narcotics: string;
    substance_Tranquilizers: string;
    substance_Inhalants: string;
    substance_Pain: string;
    substance_Other: string;
    substance_OtherSpecify: string;
    substance_Marijuana: string;
    substance_Sleeping: string;
    substance_Other1: string;
    substance_Other1Specify: string;
    substance_Family: string;
    // EDUCATIONAL ASSESSMENT
    education_PrimaryLeng: string;
    education_OtherLengs: string;
    education_Current_School: string;
    education_Grade_Level: string;
    education_Special_Ed: string;
    education_List_Grades1: string;
    education_List_Grades2: string;
    education_List_Grades3: string;
    // WORK 
    work_Current: string;
    work_Position: string;
    work_Time: string;
    work_History1: string;
    work_History2: string;
    work_History3: string;
    // Services being
    servicesBeing1: boolean;
    servicesBeing2: boolean;
    servicesBeing3: boolean;
    servicesBeing4: boolean;
    servicesBeing5: boolean;
    servicesBeing6: boolean;
    servicesBeing7: boolean;
    servicesBeing8: boolean;
    servicesBeing9: boolean;
    servicesBeing10: boolean;

    servicesBeingOther: string;
    // DESCRIBE CLIENT’S
    describeClientDoes: string;
    describeClientConsidered: string;
    describeClientPeers: string;
    describeClientInvolvement: string;
    describeClientInvolvementifYes: string;
    describeClientAssociates: string;
    describeClientrelationship: string;
    describeClientrelationshipMany: string;
    describeClientDescribe: string;
    // RECIPIENT
    recipent1: string;
    recipent2: string;
    recipent3: string;
    recipent4: string;
    recipent5: string;
    recipent6: string;
    recipent7: string;
    recipent8: string;
    // Discussion 
    discussion: string;
    // Describe the services
    describeServicePsychiatrist: string;
    describeServicePCP: string;
    describeServicePSR: string;
    describeServiceOther: string;
    // Signature option
    signatureOpt: string;
    // --
    tcm: number;
    nameTCM: string;
    categoryTCM: string;
    signatureTcm: string;
    signatureTcmDate: string;
    
    supervisor: number;
    nameSupervisor: string;
    categorySupervisor: string;
    signatureSupervisor: string;
    signatureSupervisorDate: string;

    qa: number;
    signatureQa: string;
    signatureQaDate: string;
}
