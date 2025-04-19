import React, { useState } from 'react';
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import { ScrollTop } from 'primereact/scrolltop';

import { InputText } from 'primereact/inputtext';
import {
    useChangePersonalInformation,
    useChangeEducation,
    useChangeEmploymentHistory,
    useChangePersonalReferences,
    useChangeEmergencyMedical,
    useChangeDirectDeposit,
    useUploadFiles
} from "../../hooks";
import { get } from "../../../../hooks/api";
import { displayNotificationSuccess } from "../../../../utils";
import {
    FormValuesPersonalInformation,
    FormValuesEmploymentHistory,
    FormValuesPersonalReferences,
    FormValuesEmergencyMedical,
    FormValuesEducation,
    FormValuesDirectDeposit,
    FormValuesNecesaryDocuments,
    Active,
} from '../../../../models';

const Section1 = ({ active, relad }: Props) => {

    const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState(false);
    const [pdfContent, setPdfContent] = useState("");

    const handleOpenModal = (file?: string) => {
        setIsOpen(true);
        let url = file ? `hiring/download/${file}` : 'hiring/download/resume';
        // Realizar una petición a la API de Go para descargar el PDF
        get(`${url}`)
            .then(response => response.blob())
            .then(blob => {
                // Convertir el contenido del PDF a una URL
                const url = URL.createObjectURL(blob);

                // Almacenar la URL en el estado
                setPdfContent(url);
            })
            .catch(error => {
                console.error(error);
            });
    };
    // Position Availability --------------------------------------------------------------------
    const AvailableForOptions = ['Full Time', 'Part Time', 'Temporary'];
    const QuestionOptions = ['Yes', 'No'];

    // --------------------- PERSONAL INFORMATION - POSITION / AVAILABILITY -2--------------------------------------------
    const [savePersonalInformation, setSavePersonalInformation] = useState<boolean>(false);
    const [personalInformation, setPersonalInformation] = useState<FormValuesPersonalInformation>({
        fullName: active?.activeUser?.Record?.fullname ?? "",
        email: active?.activeUser?.User?.email ?? "",
        address: active?.activeUser?.Record?.address ?? "",
        city: active?.activeUser?.Record?.city ?? "",
        state: active?.activeUser?.Record?.state ?? "",
        zipCode: active?.activeUser?.Record?.zip_code ?? "",
        county: active?.activeUser?.Record?.county ?? "",
        homePhone: active?.activeUser?.Record?.home_phone ?? "",
        cellPhone: active?.activeUser?.Record?.cell_phone ?? "",
        socialSecurity: active?.activeUser?.Record?.social_security ?? "",
        dob: active?.activeUser?.Record?.dob ?? "",
        // POSITION / AVAILABILITY
        application_date: active?.activeUser?.Record?.application_date ?? "",
        applying_as: active?.activeUser?.Record?.applying_as ?? "Employee",
        position_applied: active?.activeUser?.Record?.position_applied ?? "TCM",
        available_start_date: active?.activeUser?.Record?.available_start_date ?? "",
        available_for: active?.activeUser?.Record?.available_for ?? "",
        // Are you currently employed?
        question1: active?.activeUser?.Record?.question1 ?? "",
        // Do you have a valid driver’s license?
        question2: active?.activeUser?.Record?.question2 ?? "",
        // If you are currently employed can we contact other employers?
        question3: active?.activeUser?.Record?.question3 ?? "",
        // Do you have a reliable, insured mean of transportation?
        question4: active?.activeUser?.Record?.question4 ?? "",
        // Are you willing to travel (locally)in the performing of your duties?
        question5: active?.activeUser?.Record?.question5 ?? "",
        // Have you pleaded guilty to a crime within the last 7 years?
        question6: active?.activeUser?.Record?.question6 ?? "",
        // Have you been convicted of a crime within the last 7 years?
        question7: active?.activeUser?.Record?.question7 ?? "",
        // Have you been on probation within the last 7 years?
        question8: active?.activeUser?.Record?.question8 ?? "",
        // Are you 18 years of age or older?
        question9: active?.activeUser?.Record?.question9 ?? "",
        // Have you ever been accused of or investigatedfor child abuse/neglect?
        question10: active?.activeUser?.Record?.question10 ?? "",
        // details questions in yes
        details_questions_in_yes: active?.activeUser?.Record?.details_questions_in_yes ?? "",
        // signature
        signature: active?.activeUser?.Record?.signature ?? "",
        // Do you speak any language other than English?
        question11: active?.activeUser?.Record?.question11 ?? "",
        // Do you know sign language?
        question12: active?.activeUser?.Record?.question12 ?? "",
        languages_list: active?.activeUser?.Record?.language_list ?? "",
        special_skills: active?.activeUser?.Record?.skills_list ?? "",
    });

    // FIXME when a question is saved, the updated personalinformation is not being sent, but the previous one
    const handleChangeFormValues = <T extends string | boolean>(name: keyof FormValuesPersonalInformation, value: T) => {
        setPersonalInformation(prevState => ({
            ...prevState,
            [name]: value
        }));

        setVisibleBtnSave(true);
        setSavePersonalInformation(true);

        return personalInformation
    };
    const { changeData, isUpdating } = useChangePersonalInformation(relad);

    // ---------------------EDUCATION--------------------------------------------
    const [saveEducation, setSaveEducation] = useState<boolean>(false);
    const [education, setEducation] = useState<FormValuesEducation>({
        institution: active?.activeUser?.Record?.education.institution ?? "",
        course: active?.activeUser?.Record?.education.course ?? "",
        started: active?.activeUser?.Record?.education.started ?? "",
        completed: active?.activeUser?.Record?.education.completed ?? "",
        second_institution: active?.activeUser?.Record?.education.second_institution ?? "",
        second_course: active?.activeUser?.Record?.education.second_course ?? "",
        second_started: active?.activeUser?.Record?.education.second_started ?? "",
        second_completed: active?.activeUser?.Record?.education.second_completed ?? "",
        third_institution: active?.activeUser?.Record?.education.third_institution ?? "",
        third_course: active?.activeUser?.Record?.education.third_course ?? "",
        third_started: active?.activeUser?.Record?.education.third_started ?? "",
        third_completed: active?.activeUser?.Record?.education.third_completed ?? "",
    });
    const ChangeFormValuesEducation = (name: keyof FormValuesEducation, value: string) => {
        setEducation(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveEducation(true);
        return education
    };
    const { changeDataEducation } = useChangeEducation(relad);
    // ---------------------EMPLOYMENT HISTORY--------------------------------------------
    const [saveEmploymentHistory, setSaveEmploymentHistory] = useState<boolean>(false);
    const [employmentHistory, setEmploymentHistory] = useState<FormValuesEmploymentHistory>({
        employer: active?.activeUser?.Record?.employment_history.employer ?? "",
        address: active?.activeUser?.Record?.employment_history.address ?? "",
        supervisor: active?.activeUser?.Record?.employment_history.supervisor ?? "",
        phone: active?.activeUser?.Record?.employment_history.phone ?? "",
        period: active?.activeUser?.Record?.employment_history.period ?? "",
        position: active?.activeUser?.Record?.employment_history.position ?? "",
        reason: active?.activeUser?.Record?.employment_history.reason ?? "",
        second_employer: active?.activeUser?.Record?.employment_history.second_employer ?? "",
        second_address: active?.activeUser?.Record?.employment_history.second_address ?? "",
        second_supervisor: active?.activeUser?.Record?.employment_history.second_supervisor ?? "",
        second_phone: active?.activeUser?.Record?.employment_history.second_phone ?? "",
        second_period: active?.activeUser?.Record?.employment_history.second_period ?? "",
        second_position: active?.activeUser?.Record?.employment_history.second_position ?? "",
        second_reason: active?.activeUser?.Record?.employment_history.second_reason ?? "",
    });
    const ChangeFormValuesEmploymentHistoy = (name: keyof FormValuesEmploymentHistory, value: string) => {
        setEmploymentHistory(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveEmploymentHistory(true);
        return personalInformation
    };
    const { changeDataEmploumentHistory } = useChangeEmploymentHistory(relad);

    const employmentHistoryNA = () => {
        setEmploymentHistory({
            employer: "N/A",
            address: "N/A",
            supervisor: "N/A",
            phone: "(000) 000-0000",
            period: "(00/00/0000) - (00/00/0000)",
            position: "N/A",
            reason: "N/A",
            second_employer: "N/A",
            second_address: "N/A",
            second_supervisor: "N/A",
            second_phone: "(000) 000-0000",
            second_period: "(00/00/0000) - (00/00/0000)",
            second_position: "N/A",
            second_reason: "N/A",
        });
    }
    // ---------------------PERSONAL REFERENCES--------------------------------------------
    const [savePersonalReference, setSavePersonalReference] = useState<boolean>(false);
    const [personalReferences, setPersonalReferences] = useState<FormValuesPersonalReferences>({
        name: active?.activeUser?.Record?.personal_references.name ?? "",
        phone: active?.activeUser?.Record?.personal_references.phone ?? "",
        relationship: active?.activeUser?.Record?.personal_references.relationship ?? "",
        second_name: active?.activeUser?.Record?.personal_references.second_name ?? "",
        second_phone: active?.activeUser?.Record?.personal_references.second_phone ?? "",
        second_relationship: active?.activeUser?.Record?.personal_references.second_relationship ?? "",
    });
    const ChangeFormValuesPersonalReferences = (name: keyof FormValuesPersonalReferences, value: string) => {
        setPersonalReferences(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSavePersonalReference(true);
        return personalReferences
    };
    const { changeDataPersonalReferences } = useChangePersonalReferences(relad);
    // ---------------------EMERGENCY MEDICAL--------------------------------------------
    const [saveEmergencyMedical, setSaveEmergencyMedical] = useState<boolean>(false);
    const [emergencyMedical, setEmergencyMedical] = useState<FormValuesEmergencyMedical>({
        name: active?.activeUser?.Record?.emergency_medical.name ?? "",
        relationship: active?.activeUser?.Record?.emergency_medical.relationship ?? "",
        home_phone: active?.activeUser?.Record?.emergency_medical.home_phone ?? "",
        cell_phone: active?.activeUser?.Record?.emergency_medical.cell_phone ?? "",
        employer: active?.activeUser?.Record?.emergency_medical.employer ?? "",
        employer_phone: active?.activeUser?.Record?.emergency_medical.employer_phone ?? "",
        known_allergies: active?.activeUser?.Record?.emergency_medical.known_allergies ?? "",
        health_condition: active?.activeUser?.Record?.emergency_medical.health_condition ?? "",
        medications: active?.activeUser?.Record?.emergency_medical.medications ?? "",
        physicians_name: active?.activeUser?.Record?.emergency_medical.physicians_name ?? "",
        physicians_phone: active?.activeUser?.Record?.emergency_medical.physicians_phone ?? "",
        preferred_hospital: active?.activeUser?.Record?.emergency_medical.preferred_hospital ?? "",
        medical_insurance: active?.activeUser?.Record?.emergency_medical.medical_insurance ?? "",
        policy: active?.activeUser?.Record?.emergency_medical.policy ?? "",
    });
    const ChangeFormValuesEmergencyMedical = (name: keyof FormValuesEmergencyMedical, value: string) => {
        setEmergencyMedical(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveEmergencyMedical(true);
        return personalReferences
    };
    const { changeDataEmergencyMedical } = useChangeEmergencyMedical(relad);

    // HACK This function is to know if one of the questions is marked as YES
    const checkQuestionsInYes = () => {
        const questions = [
            personalInformation.question1,
            personalInformation.question2,
            personalInformation.question3,
            personalInformation.question4,
            personalInformation.question5,
            personalInformation.question6,
            personalInformation.question7,
            personalInformation.question8,
            personalInformation.question9,
            personalInformation.question10
        ];

        for (let i = 0; i < questions.length; i++) {
            if (questions[i] !== QuestionOptions[1]) {
                return true;
            }
        }

        return false;
    };
    const shouldShowDiv = checkQuestionsInYes();
    // ---------------------NECESARY DOCUMENTS--------------------------------------------
    const [necesaryDocuments, setNecesaryDocuments] = useState<FormValuesNecesaryDocuments>({
        resume: active?.activeUser?.Record?.necessary_documents.resume ?? false,
        diploma_transcripts: active?.activeUser?.Record?.necessary_documents.diploma_transcripts ?? false,
        licenses_certifications: active?.activeUser?.Record?.necessary_documents.licenses_certifications ?? false,
        course_fcb: active?.activeUser?.Record?.necessary_documents.course_fcb ?? false,
        service_trainer_provider: active?.activeUser?.Record?.necessary_documents.service_trainer_provider ?? false,
        service_cpr_aed: active?.activeUser?.Record?.necessary_documents.service_cpr_aed ?? false,
        service_osha: active?.activeUser?.Record?.necessary_documents.service_osha ?? false,
        service_infection_control: active?.activeUser?.Record?.necessary_documents.service_infection_control ?? false,
        service_hiv_aids: active?.activeUser?.Record?.necessary_documents.service_hiv_aids ?? false,
        service_domestic_violence: active?.activeUser?.Record?.necessary_documents.service_domestic_violence ?? false,
        service_hippa: active?.activeUser?.Record?.necessary_documents.service_hippa ?? false,
        service_security_awareness: active?.activeUser?.Record?.necessary_documents.service_security_awareness ?? false,
        service_access_civil_rights: active?.activeUser?.Record?.necessary_documents.service_access_civil_rights ?? false,
        service_deaf_hard: active?.activeUser?.Record?.necessary_documents.service_deaf_hard ?? false,
        service_fars_cfars: active?.activeUser?.Record?.necessary_documents.service_fars_cfars ?? false,
        other_medicaid_certification: active?.activeUser?.Record?.necessary_documents.other_medicaid_certification ?? false,
        other_medicaid_provider: active?.activeUser?.Record?.necessary_documents.other_medicaid_provider ?? false,
        other_drivers_license: active?.activeUser?.Record?.necessary_documents.other_drivers_license ?? false,
        other_social_security_card: active?.activeUser?.Record?.necessary_documents.other_social_security_card ?? false,
        other_proof_legal_status: active?.activeUser?.Record?.necessary_documents.other_proof_legal_status ?? false,
        other_employee_id_badge: active?.activeUser?.Record?.necessary_documents.other_employee_id_badge ?? false,
        other_vehicle_registration: active?.activeUser?.Record?.necessary_documents.other_vehicle_registration ?? false,
        other_proof_insurance: active?.activeUser?.Record?.necessary_documents.other_proof_insurance ?? false,
        form_i9: active?.activeUser?.Record?.necessary_documents.form_i9 ?? false,
        form_w9: active?.activeUser?.Record?.necessary_documents.form_w9 ?? false,
        form_w4: active?.activeUser?.Record?.necessary_documents.form_w4 ?? false,
    });

    // Necesary Documents
    const ChangeFormValuesNecesaryDocuments = <T extends string | boolean>(name: keyof FormValuesNecesaryDocuments, value: T) => {
        setNecesaryDocuments(prevState => ({
            ...prevState,
            [name]: value
        }));
        return necesaryDocuments
    };

    // ---------------------DIRECT DEPOSIT--------------------------------------------
    const [saveDirectDeposit, setSaveDirectDeposit] = useState<boolean>(false);
    const options = ['Checking', 'Savings'];
    const [directDeposit, setDirectDeposit] = useState<FormValuesDirectDeposit>({
        financial_institution: active?.activeUser?.Record?.direct_deposit.financial_institution ?? "",
        routing_number: active?.activeUser?.Record?.direct_deposit.routing_number ?? "",
        account_number: active?.activeUser?.Record?.direct_deposit.account_number ?? "",
        options: active?.activeUser?.Record?.direct_deposit.options ?? options[0],
    });
    const ChangeFormValuesDirectDeposit = (name: keyof FormValuesDirectDeposit, value: string) => {
        setDirectDeposit(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveDirectDeposit(true);
        return directDeposit
    };
    const { changeDataDirectDeposit } = useChangeDirectDeposit(relad);


    // ------- UPLOAD FILES -------------------------------------------------------------------
    const { uploadFiles, isUploadFiles } = useUploadFiles(relad);
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        let folder = `records/${active?.activeUser?.User?.uid}/resume`;
        if (files && files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file: File) => {
                formData.append(folder, file);
            });
            uploadFiles({ files: formData, tipeFile: "resume" });
            ChangeFormValuesNecesaryDocuments("resume", true);
        }
    };
    // --------------------------------------------------------------------------------------
    const handleButtonClick = () => {
        if (savePersonalInformation) { changeData({ personalInformation }); setSavePersonalInformation(false); }
        if (saveEducation) { changeDataEducation({ education }); setSaveEducation(false); }
        if (saveEmploymentHistory) { changeDataEmploumentHistory({ employmentHistory }); setSaveEmploymentHistory(false); }
        if (savePersonalReference) { changeDataPersonalReferences({ personalReferences }); setSavePersonalReference(false); }
        if (saveEmergencyMedical) { changeDataEmergencyMedical({ emergencyMedical }); setSaveEmergencyMedical(false); }
        if (saveDirectDeposit) { changeDataDirectDeposit({ directDeposit }); setSaveDirectDeposit(false); }
        
        displayNotificationSuccess("Saved information");
        setVisibleBtnSave(false);
    };


    return (
        <div className="w-full p-0 border-2 border-primary" >

            {visibleBtnSave && <Button
                icon="pi pi-save"
                rounded
                tooltip="Keep the information on file until you complete the hiring form"
                tooltipOptions={{ position: 'top' }}
                style={{ position: "fixed", left: 10, bottom: "40%", zIndex: 99999 }}
                className="p-button-warning"
                onClick={() => handleButtonClick()}
            />}
            {/* APPLICATION FOR EMPLOYMENT */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Application for Employment</div>
            </div>
            <div className='p-4 bg-gray-100'>
                Please answer all questions. If one does not apply, write N/A. <i className="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style={{ fontSize: '2rem' }}></i>
            </div>

            {/* PERSONAL INFORMATION */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Personal Information</div>
            </div>
            <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Full Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder="Type Applicant’s Full Name"
                                        value={personalInformation.fullName}
                                        onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    E-Mail Address:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            disabled
                                            placeholder="Type Applicant’s Full Name"
                                            value={personalInformation.email}
                                            onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Home Address:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='address'
                                        placeholder="Type Applicant’s Full Name"
                                        value={personalInformation.address}
                                        onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *City:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='city'
                                                placeholder="Type City"
                                                value={personalInformation.city}
                                                onChange={(e) => handleChangeFormValues("city", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            *State:
                                        </div>
                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='state'
                                                    placeholder="Type State"
                                                    value={personalInformation.state}
                                                    onChange={(e) => handleChangeFormValues("state", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">

                                    <div className="grid w-2/4 pl-4">
                                        *Zip Code:
                                    </div>

                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="phone"
                                                value={personalInformation.zipCode}
                                                onChange={(e: InputMaskChangeEvent) => handleChangeFormValues("zipCode", e.target.value ?? "")}
                                                mask="99999"
                                                placeholder="Type code"
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">

                                        <div className="grid w-2/5">
                                            *County:
                                        </div>
                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='state'
                                                    placeholder="Type County"
                                                    value={personalInformation.county}
                                                    onChange={(e) => handleChangeFormValues("county", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 3 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *Home Phone:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="HomePhone"
                                                mask="(999) 999-9999"
                                                placeholder="Type Number"
                                                value={personalInformation.homePhone}
                                                onChange={(e) => handleChangeFormValues("homePhone", e.target.value ?? "")}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            *Cell Phone:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="CellPhone"
                                                    mask="(999) 999-9999"
                                                    placeholder="Type Number"
                                                    value={personalInformation.cellPhone}
                                                    onChange={(e) => handleChangeFormValues("cellPhone", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *Social Security:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="socialSecurity"
                                                mask="999-99-9999"
                                                placeholder="Type Number"
                                                value={personalInformation.socialSecurity}
                                                onChange={(e) => handleChangeFormValues("socialSecurity", e.target.value ?? "")}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            *DOB:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="Dob"
                                                    mask="99/99/9999"
                                                    placeholder="Type Number"
                                                    value={personalInformation.dob}
                                                    onChange={(e) => handleChangeFormValues("dob", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* POSITION / AVAILABILITY */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Position / Availability</div>
            </div>
            <div className="m-0 p-0 w-full">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *Application Date:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="applicationDate"
                                                mask="99/99/9999"
                                                placeholder="Type Date"
                                                value={personalInformation.application_date}
                                                onChange={(e) => handleChangeFormValues("application_date", e.target.value ?? "")}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Applying as:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <select
                                                    value={personalInformation.applying_as}
                                                    onChange={(e) => {
                                                        handleChangeFormValues("applying_as", e.target.value ?? "");
                                                        // handleButtonClick();
                                                    }}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                >
                                                    <option value="Employee" selected>Employee</option>
                                                    <option value="Contractor">Contractor</option>
                                                    <option value="Volunteer">Volunteer</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Position applied:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <select
                                                value={personalInformation.position_applied}
                                                onChange={(e) => {
                                                    handleChangeFormValues("position_applied", e.target.value ?? "");
                                                    // handleButtonClick();
                                                }}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            >
                                                <option value="Accounting Assistant">Accounting Assistant</option>
                                                <option value="APRN">APRN</option>
                                                <option value="Billing Agent">Billing Agent</option>
                                                <option value="HR Assistant">HR Assistant</option>

                                                <option value="Psychiatrist MD">Psychiatrist MD</option>

                                                <option value="TCM QA">TCM QA</option>
                                                <option value="TCM Supervisor">TCM Supervisor</option>
                                                <option value="TCM">TCM</option>

                                                <option value="Therapist QA">Therapist QA</option>
                                                <option value="Therapist Supervisor">Therapist Supervisor</option>
                                                <option value="Therapist">Therapist</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            *Available Start Date:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="99/99/9999"
                                                    placeholder="Type date"
                                                    value={personalInformation.available_start_date}
                                                    onChange={(e) => handleChangeFormValues("available_start_date", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-4">
                                Available For:
                            </div>
                            <div className="grid md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0 m-0 text-right">
                                <SelectButton
                                    value={personalInformation.available_for}
                                    onChange={(e) => {
                                        handleChangeFormValues("available_for", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={AvailableForOptions}
                                    className="input input-ghost w-full text-right"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Resume:
                            </div>
                            <div className="grid w-2/4 p-1 pl-0 text-right">
                                <div>
                                    {necesaryDocuments.resume ? (<div>
                                        <Button icon="pi pi-paperclip" label="Resume.pdf" severity="warning" rounded onClick={() => { handleOpenModal() }} />
                                        <Dialog
                                            header="Resume"
                                            visible={isOpen}
                                            maximizable
                                            style={{ width: '50vw' }}
                                            breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                                            onHide={() => setIsOpen(false)}
                                        >
                                            <p className="m-0">
                                                <div className='w-full'>
                                                    <iframe src={pdfContent} title="PDF" className='w-full h-screen' />
                                                </div>
                                            </p>
                                        </Dialog>

                                    </div>
                                    ) : (
                                        <label htmlFor="file-upload" className='btn btn-warning btn-wide rounded-full'>
                                            <i className="pi pi-upload"></i> &nbsp;&nbsp; Upload
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                accept="application/pdf"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 3 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Are you currently employed?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question1}
                                    onChange={(e) => {
                                        handleChangeFormValues("question1", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Do you have a valid driver’s license?
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question2}
                                    onChange={(e) => {
                                        handleChangeFormValues("question2", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                {/* row 4 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *If you are currently employed can we contact other employers?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question3}
                                    onChange={(e) => {
                                        handleChangeFormValues("question3", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Do you have a reliable, insured mean of transportation?
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question4}
                                    onChange={(e) => {
                                        handleChangeFormValues("question4", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                {/* row 5 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Are you willing to travel (locally)in the performing of your duties?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question5}
                                    onChange={(e) => {
                                        handleChangeFormValues("question5", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Have you pleaded guilty to a crime within the last 7 years?
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question6}
                                    onChange={(e) => {
                                        handleChangeFormValues("question6", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 6 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Have you been convicted of a crime within the last 7 years?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question7}
                                    onChange={(e) => {
                                        handleChangeFormValues("question7", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Have you been on probation within the last 7 years?
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question8}
                                    onChange={(e) => {
                                        handleChangeFormValues("question8", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 7 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Are you 18 years of age or older?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question9}
                                    onChange={(e) => {
                                        handleChangeFormValues("question9", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Have you ever been accused of or investigatedfor child abuse/neglect?
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question10}
                                    onChange={(e) => {
                                        handleChangeFormValues("question10", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 8 */}
                {shouldShowDiv && <div className="md:flex lg:flex w-full">
                    <div className="w-full border-b-2 border-primary">
                        <div className="w-full place-items-center">
                            <div className="w-full pl-4">
                                <p className="m-0 text-justify">
                                    A plea of guilty or a conviction will not necessarily prevent you from being employed.
                                    Factors such as age at time of the offense, seriousness and nature of the offense, and
                                    rehabilitation efforts will be taken into account.
                                </p>
                            </div>
                        </div>
                        <div className="w-full place-items-center">
                            <div className="grid w-full p-1 pl-2">
                                <div className="p-inputgroup flex-1">
                                    <InputTextarea
                                        value={personalInformation.details_questions_in_yes}
                                        onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                        rows={2}
                                        cols={30}
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full place-items-center">
                            <div className="w-full pl-4">
                                <p className="m-0 mb-4 text-justify">
                                    If the answer to any of these questions is Yes, please give as many details as you can
                                </p>
                            </div>
                        </div>
                    </div>
                </div>}
                {/* row 9 */}
                <div className='p-3 border-b-2 border-primary'>
                    <b>Please tell us about any skills that apply to you</b>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Do you speak any language other than English?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question11}
                                    onChange={(e) => {
                                        handleChangeFormValues("question11", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">

                        <div className="flex w-full place-items-center">
                            <div className="grid w-2/4 pl-4">
                                *Do you know sign language?
                            </div>
                            <div className="grid w-2/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0">
                                <SelectButton
                                    value={personalInformation.question12}
                                    onChange={(e) => {
                                        handleChangeFormValues("question12", e.target.value ?? "");
                                        // handleButtonClick();
                                    }}
                                    options={QuestionOptions}
                                    className="input input-ghost w-full text-right p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 border-primary'>
                    <div className="flex w-full place-items-center">
                        <div className="grid w-1/6 flex-grow pl-4">
                            *List any languages that you speak:
                        </div>
                        <div className="grid w-5/6 p-1 pl-0">
                            <div className="card p-fluid">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type the languages separated by commas"
                                        value={personalInformation.languages_list}
                                        onChange={(e) => handleChangeFormValues("languages_list", e.target.value ?? "")}
                                        className="input input-ghost w-full"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 10 */}
                <div className='p-3'>
                    <b>*Please list your areas of highest proficiency, special skills or other items that may contribute to your abilities in performing the above mentioned position:</b>
                </div>
                <div className='p-3'>
                    <div className="card p-fluid">
                        <div className="p-inputgroup flex-1">
                            <input
                                type="text"
                                placeholder="Type list"
                                value={personalInformation.special_skills}
                                onChange={(e) => handleChangeFormValues("special_skills", e.target.value ?? "")}
                                className="input input-ghost w-full"
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* EDUCATION */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Education</div>
            </div>
            <div className="m-0 p-0 w-full">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Institution / School:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name Institution or School"
                                        value={education.institution}
                                        onChange={(e) => ChangeFormValuesEducation("institution", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Course of Study:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Course od Study"
                                        value={education.course}
                                        onChange={(e) => ChangeFormValuesEducation("course", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *Date Started:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="phone"
                                                mask="99/99/9999"
                                                value={education.started}
                                                onChange={(e) => ChangeFormValuesEducation("started", e.target.value ?? "")}
                                                placeholder="Type date"
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/4 pl-4">
                                            * Date Completed:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="99/99/9999"
                                                    value={education.completed}
                                                    onChange={(e) => ChangeFormValuesEducation("completed", e.target.value ?? "")}
                                                    placeholder="Type date"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Institution / School:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name Institution or School"
                                        value={education.second_institution}
                                        onChange={(e) => ChangeFormValuesEducation("second_institution", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Course of Study:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Course od Study"
                                        value={education.second_course}
                                        onChange={(e) => ChangeFormValuesEducation("second_course", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Date Started:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="phone"
                                                mask="99/99/9999"
                                                value={education.second_started}
                                                onChange={(e) => ChangeFormValuesEducation("second_started", e.target.value ?? "")}
                                                placeholder="Type date"
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/4 pl-4">
                                            Date Completed:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="99/99/9999"
                                                    value={education.second_completed}
                                                    onChange={(e) => ChangeFormValuesEducation("second_completed", e.target.value ?? "")}
                                                    placeholder="Type date"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 3 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Institution / School:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name Institution or School"
                                        value={education.third_institution}
                                        onChange={(e) => ChangeFormValuesEducation("third_institution", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Course of Study:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Course od Study"
                                        value={education.third_course}
                                        onChange={(e) => ChangeFormValuesEducation("third_course", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Date Started:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="phone"
                                                mask="99/99/9999"
                                                value={education.third_started}
                                                onChange={(e) => ChangeFormValuesEducation("third_started", e.target.value ?? "")}
                                                placeholder="Type date"
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/4 pl-4">
                                            Date Completed:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="99/99/9999"
                                                    value={education.third_completed}
                                                    onChange={(e) => ChangeFormValuesEducation("third_completed", e.target.value ?? "")}
                                                    placeholder="Type date"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* EMPLOYMENT HISTORY */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Employment History</div>
            </div>
            <div className='p-3 border-b-2 border-primary text-sm'>
                List past two employment record, starting with your most current employer (including military service).If not applicable,
                <Badge
                    value="click here"
                    severity="warning"
                    style={{ cursor: "pointer" }}
                    onClick={employmentHistoryNA}
                />
            </div>
            <div className="m-0 p-0 w-full">
                {/* EMPLOYMENT HISTORY 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Employer:
                            </div>
                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name Employer"
                                        value={employmentHistory.employer}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("employer", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Address:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Address"
                                        value={employmentHistory.address}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("address", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Supervisor or contact person:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Supervisor or contact person"
                                        value={employmentHistory.supervisor}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("supervisor", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Phone Number:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="phone"
                                        mask="(999) 999-9999"
                                        placeholder="Type Number"
                                        value={employmentHistory.phone}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("phone", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Period you worked:
                            </div>
                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="period"
                                        mask="(99/9999) - (99/9999)"
                                        placeholder="(MM/YYYY - MM/YYYY)"
                                        value={employmentHistory.period}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("period", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Position Held:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Position"
                                        value={employmentHistory.position}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("position", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full place-items-center">
                    <div className="grid w-full p-1 pl-0">
                        <div className="w-full">
                            <div className="w-full place-items-center">
                                <div className="w-full pl-4">
                                    <p className="m-0 text-justify">
                                        *Reason for leaving:
                                    </p>
                                </div>
                            </div>
                            <div className="w-full place-items-center">
                                <div className="grid w-full p-1 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        <InputTextarea
                                            value={employmentHistory.reason}
                                            onChange={(e) => ChangeFormValuesEmploymentHistoy("reason", e.target.value ?? "")}
                                            rows={2}
                                            cols={30}
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* EMPLOYMENT HISTORY 2 */}
                <div className="md:flex lg:flex w-full border-t-2 border-primary">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Employer:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name Employer"
                                        value={employmentHistory.second_employer}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_employer", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Address:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Address"
                                        value={employmentHistory.second_address}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_address", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Supervisor or contact person:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Supervisor or contact person"
                                        value={employmentHistory.second_supervisor}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_supervisor", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Phone Number:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="phone"
                                        mask="(999) 999-9999"
                                        placeholder="Type Number"
                                        value={employmentHistory.second_phone}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_phone", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Period you worked:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="period_second"
                                        mask="(99/9999) - (99/9999)"
                                        placeholder="(MM/YYYY - MM/YYYY)"
                                        value={employmentHistory.second_period}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_period", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Position Held:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Position"
                                        value={employmentHistory.second_position}
                                        onChange={(e) => ChangeFormValuesEmploymentHistoy("second_position", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full place-items-center">
                    <div className="grid w-full p-1 pl-0">
                        <div className="w-full">
                            <div className="w-full place-items-center">
                                <div className="w-full pl-4">
                                    <p className="m-0 text-justify">
                                        Reason for leaving:
                                    </p>
                                </div>
                            </div>
                            <div className="w-full place-items-center">
                                <div className="grid w-full p-1 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        <InputTextarea
                                            value={employmentHistory.second_reason}
                                            onChange={(e) => ChangeFormValuesEmploymentHistoy("second_reason", e.target.value ?? "")}
                                            rows={2}
                                            cols={30}
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* PERSONAL REFERENCES */}
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Personal References</div>
            </div>
            <div className='p-3 border-b-2 border-primary text-sm'>
                Specify the data of <b>two people</b> who can give references to their performance at work
            </div>
            <div className="m-0 p-0 w-full">
                {/* PERSONAL REFERENCES 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-1/3 lg:w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name"
                                        value={personalReferences.name}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("name", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/3 pl-5">
                                *Phone Number:
                            </div>
                            <div className="grid border-r-2 border-primary w-2/3 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="phone"
                                        mask="(999) 999-9999"
                                        placeholder="Type Number"
                                        value={personalReferences.phone}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("phone", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/3 pl-5">
                                *Relationship:
                            </div>
                            <div className="grid  w-2/3 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Relationship"
                                        value={personalReferences.relationship}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("relationship", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* PERSONAL REFERENCES 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-1/3 lg:w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name"
                                        value={personalReferences.second_name}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("second_name", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/3 pl-5">
                                *Phone Number:
                            </div>
                            <div className="grid border-r-2 border-primary w-2/3 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="phone"
                                        mask="(999) 999-9999"
                                        placeholder="Type Number"
                                        value={personalReferences.second_phone}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("second_phone", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/3 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/3 pl-5">
                                *Relationship:
                            </div>
                            <div className="grid  w-2/3 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Relationship"
                                        value={personalReferences.second_relationship}
                                        onChange={(e) => ChangeFormValuesPersonalReferences("second_relationship", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>Emergency Medical Information</div>
            <div className='p-3 border-b-2 border-primary'>
                <p className='text-justify text-sm'>
                    In case of a medical emergency the following key information would be of great value to
                    attending medical personnel in helping to diagnose and treat a medical problem. Kindly
                    complete this CONFIDENTIAL form which will be kept in your personnel file to be used ONLY in the
                    case of a medical emergency. It is extremely important that all questions be answered to
                    assure prompt and appropriate medical treatment during a medical emergency.
                </p>
            </div>
            <div className="m-0 p-0">
                {/* row 3 */}
                <div className="w-full border-b-2 border-primary">
                    <p className='p-4 text-justify'>
                        In case of a medical emergency, I authorize
                        &nbsp;&nbsp; <b>Social Diversity LLC</b>&nbsp;&nbsp;
                        contact the following person:
                    </p>

                </div>
                {/* row 4 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center md:border-r-2 lg:border-r-2 border-primary">
                            <div className="grid flex-grow w-1/4 pl-4">
                                *Name:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name"
                                        value={emergencyMedical.name}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("name", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Relationship:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Relationshio"
                                        value={emergencyMedical.relationship}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("relationship", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* row 5 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center md:border-r-2 lg:border-r-2 border-primary">
                            <div className="flex grid  w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        *Cell Phone:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="phone"
                                                mask="(999) 999-9999"
                                                placeholder="Type number"
                                                value={emergencyMedical.cell_phone}
                                                onChange={(e) => ChangeFormValuesEmergencyMedical("cell_phone", e.target.value ?? "")}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid  w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Home Phone:
                                        </div>
                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="(999) 999-9999"
                                                    placeholder="Type number"
                                                    value={emergencyMedical.home_phone}
                                                    onChange={(e) => ChangeFormValuesEmergencyMedical("home_phone", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Employer:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            <input
                                                type="text"
                                                placeholder="Type Employer"
                                                value={emergencyMedical.employer}
                                                onChange={(e) => ChangeFormValuesEmergencyMedical("employer", e.target.value ?? "")}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Phone Number:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="(999) 999-9999"
                                                    placeholder="Type number"
                                                    value={emergencyMedical.employer_phone}
                                                    onChange={(e) => ChangeFormValuesEmergencyMedical("employer_phone", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* row 6 */}
                <div className="md:flex lg:flex w-full border-b-2 border-primary">
                    <div className="w-full ">
                        <div className="flex w-full place-items-center pt-4 pb-4 pl-5">
                            Please indicate below any information you would like us to disclose to medical personnel in a medical emergency:
                        </div>
                    </div>
                </div>
                {/* row 7 */}
                <div className='border-b-2 border-primary p-1'>
                    <div className="w-full place-items-center">
                        <div className="grid flex-grow w-full pl-4">
                            Known Allergies:
                        </div>
                        <div className="grid w-full p-1 pl-0">
                            <div className="card p-fluid">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type List"
                                        value={emergencyMedical.known_allergies}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("known_allergies", e.target.value ?? "")}
                                        className="input input-ghost w-full"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* row 8 */}
                <div className="w-full place-items-center border-b-2 border-primary">
                    <div className="grid w-full p-1 pl-0">
                        <div className="w-full">
                            <div className="w-full place-items-center">
                                <div className="w-full pl-4">
                                    <p className="m-0 text-justify">
                                        Any Special Health Condition or Medical Information That Medical Personnel Should Know:
                                    </p>
                                </div>
                            </div>
                            <div className="w-full place-items-center">
                                <div className="grid w-full p-1 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        <InputTextarea
                                            value={emergencyMedical.health_condition}
                                            onChange={(e) => ChangeFormValuesEmergencyMedical("health_condition", e.target.value ?? "")}
                                            rows={2}
                                            cols={30}
                                            style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* row 9 */}
                <div className='border-b-2 border-primary'>
                    <div className="w-full place-items-center">
                        <div className="grid flex-grow w-full pl-4">
                            Medications:
                        </div>
                        <div className="grid w-full p-1 pl-2">
                            <div className="card p-fluid">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type list"
                                        value={emergencyMedical.medications}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("medications", e.target.value ?? "")}
                                        className="input input-ghost w-full"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 10 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center md:border-r-2 lg:border-r-2 border-primary">
                            <div className="flex grid  w-3/5 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/5 pl-4">
                                        *Physician's Name:
                                    </div>
                                    <div className="grid w-3/5">
                                        <div className="p-inputgroup flex-1">
                                            <input
                                                type="text"
                                                placeholder="Type Name"
                                                value={emergencyMedical.physicians_name}
                                                onChange={(e) => ChangeFormValuesEmergencyMedical("physicians_name", e.target.value ?? "")}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex grid  w-2/5 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            *Cell Phone:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="phone"
                                                    mask="(999) 999-9999"
                                                    placeholder="Type number"
                                                    value={emergencyMedical.physicians_phone}
                                                    onChange={(e) => ChangeFormValuesEmergencyMedical("physicians_phone", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Preferred Hospital:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Hospital Name"
                                        value={emergencyMedical.preferred_hospital}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("preferred_hospital", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 11 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center md:border-r-2 lg:border-r-2 border-primary">
                            <div className="grid flex-grow w-1/4 pl-4">
                                *Medical Insurance Provider:
                            </div>
                            <div className="grid  w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name"
                                        value={emergencyMedical.medical_insurance}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("medical_insurance", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Policy Number:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Policy"
                                        value={emergencyMedical.policy}
                                        onChange={(e) => ChangeFormValuesEmergencyMedical("policy", e.target.value ?? "")}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Direct Deposit Authorization Form</div>
            </div>
            <div className="m-0 p-0  border-primary">
                <div className="flex w-full">
                    <div className="flex w-full border-b-2 border-primary">
                        <div className="flex w-2/6 border-b- border-primary place-items-center">
                            <div className="grid flex-grow w-3/5 pl-2">
                                *Name of Financial Institution:
                            </div>
                            <div className="grid border-r-2 border-primary w-2/5 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <input
                                        type="text"
                                        placeholder="Type Name"
                                        value={directDeposit.financial_institution}
                                        onChange={(e) => ChangeFormValuesDirectDeposit("financial_institution", e.target.value ?? "")}
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-4/6 flex'>

                            <div className="w-2/5 border-primary border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        *Routing Number:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <input
                                                type="text"
                                                placeholder="Type Number"
                                                value={directDeposit.routing_number}
                                                onChange={(e) => ChangeFormValuesDirectDeposit("routing_number", e.target.value ?? "")}
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 lg:w-auto place-items-center">
                                <div className="grid flex-grow w-2/4 pl-5">
                                    *Account Number:
                                </div>
                                <div className="grid md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <input
                                            type="text"
                                            placeholder="Type Number"
                                            value={directDeposit.account_number}
                                            onChange={(e) => ChangeFormValuesDirectDeposit("account_number", e.target.value ?? "")}
                                            className="input input-ghost border-0 w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/5 place-items-center pt-2 pr-2">
                                <div className="flex w-full place-content-center">
                                    <SelectButton
                                        value={directDeposit.options}
                                        onChange={(e) => {
                                            ChangeFormValuesDirectDeposit("options", e.target.value ?? "")
                                        }}
                                        options={options}
                                        className="input input-ghost p-0"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <br />
            <br />
            <br />
            <ScrollTop style={{ backgroundColor: "#FBC02D" }} />
        </div>
    );
};
type Props = {
    active?: Active;
    relad(): void;
};

export { Section1 };
