import { Notes, SPInitialAddendums } from "../index"

export type SCM = {
    serviceCMactive?: ServiceCMactive;
};

export type Demografic = {
    ID: number;
    CreatedAt: string;
    client_id: number;
    scm: number;

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

    medicaid: string;
    gold_card_number: string;
    medicare: string;

    reason: string;
    evaluation: boolean;

}

export type TCM = {
    ID: number;
    full_name: string;
    categoryTCM: string;
    signature: string;
}

export type Sure = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    client_id: number;
    scm: number;
    plan_name: string;
    plan_id: string;
    auth: boolean;
    auth_date_start: string;
    auth_date_end: string;
    deny: boolean,
    unit: number;
    time_range: number;
    active: boolean;

    tcm: number;
    submit: boolean;
    supervisor: number;
    supervisor_approbe: boolean;
    qa: number;
    qa_approbe: boolean;
}

export type SureFiles = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    client_id: number;
    scm: number;
    sure: number;
    auth: boolean;
    certification: boolean;
    assessment: boolean,
    sp: boolean;
    evaluation: boolean;
}

export type Medical = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    client_id: number;
    scm: number;
    medical_pcp: string;
    medical_pcp_address: string;
    medical_pcp_phone: string;
    medical_psychiatrisy: string;
    medical_psychiatrisy_address: string;
    medical_psychiatrisy_phone: string;
}

export type Mental = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    client_id: number;
    scm: number;
    mental_primary: string;
    mental_primary_date: string;
    mental_secondary: string;
    mental_secondary_date: string;
}

export type Certification = {
    CreatedAt: string;
    UpdatedAt: string;
    ID: number;
    client_id: number;
    scm: number;

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
    signtcm: string;
    dateTcm: string;

    supervisor: number;
    nameSupervisor: string;
    categorySupervisor: string;
    signsupervisor: string;
    dateSupervisor: string;

    QA: string;
    signqa: string;
}

export type Assessment = {
    CreatedAt: string;
    UpdatedAt: string;
    ID: number;
    client_id: number;
    scm: number;
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
    // servicesBeing: string;
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
    // recipent_Therapy: string;
    // recipent_TherapyType: string;
    // recipent_Psychotropic: string;
    // recipent_Substance: string;
    // recipent_Family: string;
    // recipent_Medical: string;
    // recipent_Housing: string;
    // recipent_Educational: string;
    // recipent_Legal: string;
    // recipent_Development: string;
    // recipent_Assistance: string;
    // recipent_Permanency: string;
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

// ---------------

export type ServiceCMActive = {
    id: number;
    doa: string;
    status: string;
    closing_date: string;
}

export type ServiceSCM = {
    scm: ServiceCM;
}

export type ServiceCM = {
    id: number;
    doa: string;
    status: string;
    closing_date: string;
    tcm_id: number;
    Demografic: Demografic;
    tcm: TCM;
    sure_active: Sure;
    notes_sure_active: Notes[];
    units_consumed: number;
    sure: Sure[];
    files: SureFiles[];
    medical: Medical;
    Mental: Mental;
    certification: Certification;
    assessment: Assessment;
    // TODO Desglozar los goal
    sp: SPInitialAddendums;
}

export type ServiceCMactive = {
    ID: string;
    CreatedAt: string;
    tcm: string;
    doa: string;
}

export const DiagnosticTable = {
    'N/A': 'N/A',
    F064: 'Anxiety disorder due to known physiological condition',
    F068: 'Other specified mental disorders due to known physiological condition',
    F070: 'Neurological System - Head and Neck',
    F0789: 'Other personality and behavioral disorders due to known physiological condition',
    F09: 'Unspecified mental disorder due to known physiological condition',
    F200: 'Paranoid schizophrenia',
    F201: 'Disorganized schizophrenia',
    F202: 'Catatonic schizophrenia',
    F203: 'Undifferentiated schizophrenia',
    F205: 'Residual schizophrenia',
    F2081: 'Schizophreniform disorder',
    F2089: 'Other schizophrenia',
    F209: 'Schizophrenia, unspecified',
    F21: 'Schizotypal disorder',
    F22: 'Delusional disorders',
    F23: 'Brief psychotic disorder',
    F24: 'Shared psychotic disorder',
    F250: 'Schizoaffective disorder, bipolar type',
    F251: 'Schizoaffective disorder, depressive type',
    F258: 'Other schizoaffective disorders',
    F259: 'Schizoaffective disorder, unspecified',
    F28: 'Other psychotic disorder not due to a substance or known physiological condition',
    F29: 'Unspecified psychosis not due to a substance or known physiological condition',
    F3010: 'Manic episode without psychotic symptoms, unspecified',
    F3011: 'Manic episode without psychotic symptoms, mild',
    F3012: 'Manic episode without psychotic symptoms, moderate',
    F3013: 'Manic episode, severe, without psychotic symptoms',
    F302: 'Manic episode, severe with psychotic symptoms',
    F303: 'Manic episode in partial remission',
    F304: 'Manic episode in full remission',
    F309: 'Manic episode, unspecified',
    F310: 'Bipolar disorder, current episode hypomanic',
    F3110: 'Bipolar disorder, current episode manic without psychotic features, unspecified',
    F3111: 'Bipolar disorder, current episode manic without psychotic features, mild',
    F3112: 'Bipolar disorder, current episode manic without psychotic features, moderate',
    F3113: 'Bipolar disorder, current episode manic without psychotic features, severe',
    F312: 'Bipolar disorder, current episode manic severe with psychotic features',
    F3130: 'Bipolar disorder, current episode depressed, mild or moderate severity, unspecified',
    F3131: 'Bipolar disorder, current episode depressed, mild',
    F3132: 'Bipolar disorder, current episode depressed, moderate',
    F314: 'Bipolar disorder, current episode depressed, severe, without psychotic features',
    F315: 'Bipolar disorder, current episode depressed, severe, with psychotic features',
    F3160: 'Bipolar disorder, current episode mixed, unspecified',
    F3161: 'Bipolar disorder, current episode mixed, mild',
    F3162: 'Bipolar disorder, current episode mixed, moderate',
    F3163: 'Bipolar disorder, current episode mixed, severe, without psychotic features',
    F3164: 'Bipolar disorder, current episode mixed, severe, with psychotic features',
    F3170: 'Bipolar disorder, currently in remission, most recent episode unspecified',
    F3171: 'Bipolar disorder, in partial remission, most recent episode hypomanic',
    F3172: 'Bipolar disorder, in full remission, most recent episode hypomanic',
    F3173: 'Bipolar disorder, in partial remission, most recent episode manic',
    F3174: 'Bipolar disorder, in full remission, most recent episode manic',
    F3175: 'Bipolar disorder, in partial remission, most recent episode depressed',
    F3176: 'Bipolar disorder, in full remission, most recent episode depressed',
    F3177: 'Bipolar disorder, in partial remission, most recent episode mixed',
    F3178: 'Bipolar disorder, in full remission, most recent episode mixed',
    F3181: 'Bipolar II disorder',
    F3189: 'Other bipolar disorder',
    F319: 'Bipolar disorder, unspecified',
    F320: 'Major depressive disorder, single episode, mild',
    F321: 'Major depressive disorder, single episode, moderate',
    F322: 'Major depressive disorder, single episode, severe without psychotic features',
    F323: 'Major depressive disorder, single episode, severe with psychotic features',
    F324: 'Major depressive disorder, single episode, in partial remission',
    F325: 'Major depressive disorder, single episode, in full remission',
    F3281: 'Premenstrual dysphoric disorder',
    F3289: 'Other specified depressive episodes',
    F329: 'Major depressive disorder, single episode, unspecified',
    F32A: 'Depression, unspecified',
    F330: 'Major depressive disorder, recurrent, mild',
    F331: 'Major depressive disorder, recurrent, moderate',
    F332: 'Major depressive disorder, recurrent severe without psychotic features',
    F333: 'Major depressive disorder, recurrent, severe with psychotic symptoms',
    F3340: 'Major depressive disorder, recurrent, in remission, unspecified',
    F3341: 'Major depressive disorder, recurrent, in partial remission',
    F3342: 'Major depressive disorder, recurrent, in full remission',
    F338: 'Other recurrent depressive disorders',
    F339: 'Major depressive disorder, recurrent, unspecified',
    F340: 'Cyclothymic disorder',
    F341: 'Dysthymic disorder',
    F3481: 'Disruptive mood dysregulation disorder',
    F3489: 'Other specified persistent mood disorders',
    F349: 'Persistent mood [affective] disorder, unspecified',
    F39: 'Unspecified mood [affective] disorder',
    F4000: 'Agoraphobia, unspecified',
    F4001: 'Agoraphobia with panic disorder',
    F4002: 'Agoraphobia without panic disorder',
    F4010: 'Social phobia, unspecified',
    F4011: 'Social phobia, generalized',
    F40210: 'Arachnophobia',
    F40218: 'Other animal type phobia',
    F40220: 'Fear of thunderstorms',
    F40228: 'Other natural environment type phobia',
    F40230: 'Fear of blood',
    F40231: 'Fear of injections and transfusions',
    F40232: 'Fear of other medical care',
    F40233: 'Fear of injury',
    F40240: 'Claustrophobia',
    F40241: 'Acrophobia',
    F40242: 'Fear of bridges',
    F40243: 'Fear of flying',
    F40248: 'Other situational type phobia',
    F40290: 'Androphobia',
    F40291: 'Gynephobia',
    F40298: 'Other specified phobia',
    F408: 'Other phobic anxiety disorders',
    F409: 'Phobic anxiety disorder, unspecified',
    F410: 'Panic disorder [episodic paroxysmal anxiety]',
    F411: 'Generalized anxiety disorder',
    F413: 'Other mixed anxiety disorders',
    F418: 'Other specified anxiety disorders',
    F419: 'Anxiety disorder, unspecified',
    F422: 'Mixed obsessional thoughts and acts',
    F423: 'Hoarding disorder',
    F424: 'Excoriation (skin-picking) disorder',
    F428: 'Other obsessive-compulsive disorder',
    F429: 'Obsessive-compulsive disorder, unspecified',
    F430: 'Acute stress reaction',
    F4310: 'Post-traumatic stress disorder, unspecified',
    F4311: 'Post-traumatic stress disorder, acute',
    F4312: 'Post-traumatic stress disorder, chronic',
    F4320: 'Adjustment disorder, unspecified',
    F4321: 'Adjustment disorder with depressed mood',
    F4322: 'Adjustment disorder with anxiety',
    F4323: 'Adjustment disorder with mixed anxiety and depressed mood',
    F4324: 'Adjustment disorder with disturbance of conduct',
    F4325: 'Adjustment disorder with mixed disturbance of emotions and conduct',
    F4329: 'Adjustment disorder with other symptoms',
    F438: 'Other reactions to severe stress',
    F439: 'Reaction to severe stress, unspecified',
    F440: 'Dissociative amnesia',
    F441: 'Dissociative fugue',
    F442: 'Dissociative stupor',
    F444: 'Conversion disorder with motor symptom or deficit',
    F445: 'Conversion disorder with seizures or convulsions',
    F446: 'Conversion disorder with sensory symptom or deficit',
    F447: 'Conversion disorder with mixed symptom presentation',
    F4481: 'Dissociative identity disorder',
    F4489: 'Other dissociative and conversion disorders',
    F449: 'Dissociative and conversion disorder, unspecified',
    F450: 'Somatization disorder',
    F451: 'Undifferentiated somatoform disorder',
    F4520: 'Hypochondriacal disorder, unspecified',
    F4521: 'Hypochondriasis',
    F4522: 'Body dysmorphic disorder',
    F4529: 'Other hypochondriacal disorders',
    F4541: 'Pain disorder exclusively related to psychological factors',
    F4542: 'Pain disorder with related psychological factors',
    F458: 'Other somatoform disorders',
    F459: 'Somatoform disorder, unspecified',
    F481: 'Depersonalization-derealization syndrome',
    F482: 'Pseudobulbar affect',
    F488: 'Other specified nonpsychotic mental disorders',
    F489: 'Nonpsychotic mental disorder, unspecified',
    F5000: 'Anorexia nervosa, unspecified',
    F5001: 'Anorexia nervosa, restricting type',
    F5002: 'Anorexia nervosa, binge eating/purging type',
    F502: 'Bulimia nervosa',
    F5081: 'Binge eating disorder',
    F5082: 'Avoidant/restrictive food intake disorder',
    F5089: 'Other specified eating disorder',
    F509: 'Eating disorder, unspecified',
    F5101: 'Primary insomnia',
    F5102: 'Adjustment insomnia',
    F5103: 'Paradoxical insomnia',
    F5104: 'Psychophysiologic insomnia',
    F5105: 'Insomnia due to other mental disorder',
    F5109: 'Other insomnia not due to a substance or known physiological condition',
    F5111: 'Primary hypersomnia',
    F5112: 'Insufficient sleep syndrome',
    F5113: 'Hypersomnia due to other mental disorder',
    F5119: 'Other hypersomnia not due to a substance or known physiological condition',
    F513: 'Sleepwalking [somnambulism]',
    F514: 'Sleep terrors [night terrors]',
    F515: 'Nightmare disorder',
    F518: 'Other sleep disorders not due to a substance or known physiological condition',
    F519: 'Sleep disorder not due to a substance or known physiological condition, unspecified',
    F530: 'Postpartum depression',
    F531: 'Puerperal psychosis',
    F54: 'Psychological and behavioral factors associated with disorders or diseases classified elsewhere',
    F600: 'Paranoid personality disorder',
    F601: 'Schizoid personality disorder',
    F602: 'Antisocial personality disorder',
    F603: 'Borderline personality disorder',
    F604: 'Histrionic personality disorder',
    F605: 'Obsessive-compulsive personality disorder',
    F606: 'Avoidant personality disorder',
    F607: 'Dependent personality disorder',
    F6081: 'Narcissistic personality disorder',
    F6089: 'Other specific personality disorders',
    F609: 'Personality disorder, unspecified',
    F630: 'Pathological gambling',
    F631: 'Pyromania',
    F632: 'Kleptomania',
    F633: 'Trichotillomania',
    F6381: 'Intermittent explosive disorder',
    F6389: 'Other impulse disorders',
    F639: 'Impulse disorder, unspecified',
    F640: 'Transsexualism',
    F641: 'Dual role transvestism',
    F642: 'Gender identity disorder of childhood',
    F648: 'Other gender identity disorders',
    F649: 'Gender identity disorder, unspecified',
    F6810: 'Factitious disorder imposed on self, unspecified',
    F6811: 'Factitious disorder imposed on self, with predominantly psychological signs and symptoms',
    F6812: 'Factitious disorder imposed on self, with predominantly physical signs and symptoms',
    F6813: 'Factitious disorder imposed on self, with combined psychological and physical signs and symptoms',
    F68A: 'Factitious disorder imposed on another',
    F69: 'Unspecified disorder of adult personality and behavior',
    F8082: 'Social pragmatic communication disorder',
    F900: 'Attention-deficit hyperactivity disorder, predominantly inattentive type',
    F901: 'Attention-deficit hyperactivity disorder, predominantly hyperactive type',
    F902: 'Attention-deficit hyperactivity disorder, combined type',
    F908: 'Attention-deficit hyperactivity disorder, other type',
    F909: 'Attention-deficit hyperactivity disorder, unspecified type',
    F910: 'Conduct disorder confined to family context',
    F911: 'Conduct disorder, childhood-onset type',
    F912: 'Conduct disorder, adolescent-onset type',
    F913: 'Oppositional defiant disorder',
    F918: 'Other conduct disorders',
    F919: 'Conduct disorder, unspecified',
    F930: 'Separation anxiety disorder of childhood',
    F938: 'Other childhood emotional disorders',
    F939: 'Childhood emotional disorder, unspecified',
    F940: 'Selective mutism',
    F941: 'Reactive attachment disorder of childhood',
    F942: 'Disinhibited attachment disorder of childhood',
    F948: 'Other childhood disorders of social functioning',
    F949: 'Childhood disorder of social functioning, unspecified',
    F980: 'Enuresis not due to a substance or known physiological condition',
    F981: 'Encopresis not due to a substance or known physiological condition',
    F9821: 'Rumination disorder of infancy',
    F9829: 'Other feeding disorders of infancy and early childhood',
    F983: 'Pica of infancy and childhood',
    F984: 'Stereotyped movement disorders',
    F985: 'Adult onset fluency disorder',
    F988: 'Other specified behavioral and emotional disorders with onset usually occurring in childhood and adolescence',
    F989: 'Unspecified behavioral and emotional disorders with onset usually occurring in childhood and adolescence',
    F99: 'Mental disorder, not otherwise specified',
    O906: 'Postpartum mood disturbance',
    T7402xa: 'Child neglect or abandonment, confirmed, initial encounter',
    T7402XD: 'Child neglect or abandonment, confirmed, subsequent encounter',
    T7402XS: 'Child neglect or abandonment, confirmed, sequela',
    T7412XA: 'Child physical abuse, confirmed, initial encounter',
    T7412XD: 'Child physical abuse, confirmed, subsequent encounter',
    T7412XS: 'Child physical abuse, confirmed, sequela',
    T7422XA: 'Child sexual abuse, confirmed, initial encounter',
    T7422XD: 'Child sexual abuse, confirmed, subsequent encounter',
    T7422xs: 'Child sexual abuse, confirmed, sequela',
    T7452XA: 'Child sexual exploitation, confirmed, initial encounter',
    T7452XD: 'Child sexual exploitation, confirmed, subsequent encounter',
    T7452XS: 'Child sexual exploitation, confirmed, sequela',
    T7462XA: 'Child forced labor exploitation, confirmed, initial encounter',
    T7462XD: 'Child forced labor exploitation, confirmed, subsequent encounter',
    T7462XS: 'Child forced labor exploitation, confirmed, sequela',
    T7602XA: 'Child neglect or abandonment, suspected, initial encounter',
    T7602xd: 'Child neglect or abandonment, suspected, subsequent encounter',
    T7602XS: 'Child neglect or abandonment, suspected, sequela',
    T7612XA: 'Child physical abuse, suspected, initial encounter',
    T7612XD: 'Child physical abuse, suspected, subsequent encounter',
    T7612XS: 'Child physical abuse, suspected, sequela',
    T7622XA: 'Child sexual abuse, suspected, initial encounter',
    T7622XD: 'Child sexual abuse, suspected, subsequent encounter',
    T7622XS: 'Child sexual abuse, suspected, sequela',
    T7652xd: 'Child sexual exploitation, suspected, subsequent encounter',
    T7652XS: 'Child sexual exploitation, suspected, sequela',
    T7662XA: 'Child forced labor exploitation, suspected, initial encounter',
    T7662XD: 'Child forced labor exploitation, suspected, subsequent encounter',
    T7662XS: 'Child forced labor exploitation, suspected, sequela'
};