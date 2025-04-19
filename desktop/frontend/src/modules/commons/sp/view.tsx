import React, { useEffect, useState, useRef } from 'react';

import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
import { BlockUI } from 'primereact/blockui';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { Checkbox } from 'antd';
import html2pdf from 'html2pdf.js';
import SignatureCanvas, { SignatureCanvasRef } from 'react-signature-canvas';
import { useCoreRequestEditSCMAssessment } from "../../profile/hooks";
import { CalculateAge } from '..';
import { Goals } from './utils/goals';

import { ServiceCM, FormValueAssessment } from '../../../models';


const ViewSp = ({ scm, relad, view }: Props) => {
    const { requestEditAssessment, isUpdatingRequestAssessment } = useCoreRequestEditSCMAssessment(relad);
    const [signTCM, setSignTCM] = useState<boolean>(false);
    const signatureTCM = useRef<SignatureCanvasRef>(null);
    const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
    const handleDownloadPDF = () => {
        // const modalContent = document.getElementById('pdf-HANDBOOK'); // Reemplaza 'modal-content' con el ID del elemento que contiene el contenido del modal
        const pages = document.querySelectorAll('.page'); // Selecciona todas las capas
        const combinedContent = document.createElement('div');

        Array.from(pages).forEach((page) => {
            combinedContent.appendChild(page.cloneNode(true)); // Clona el contenido de cada capa y lo agrega al elemento combinado
        });

        html2pdf().from(combinedContent).toPdf().save('document.pdf');
    };

    const HeaderPage = (
        <div>
            {/* row 1 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-primary">
                    <div className="flex w-2/4 border-b-2 border-r-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5 pr-5">
                            <b className='mr-5'>Client’s Name:</b> {scm?.Demografic.first_name} {scm?.Demografic.last_name}
                        </div>
                    </div>
                    <div className="border-b-2 border-r-2 border-primary md:border-b-0 lg:border-b-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>MR #:</b> {scm?.Demografic.client_id} &nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                    <div className="flex w-1/4 place-items-center">
                        <div className="flex w-full pl-5">
                            <b className='mr-5'>Date of Admission:</b> {scm?.doa}
                        </div>
                    </div>
                </div>
            </div>
            {/* row 2 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-2/4 border-b-2 border-r-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5">
                            <b className='mr-5'>TCM:</b> {scm?.tcm.full_name}
                        </div>
                    </div>
                    <div className="w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>Initial SP Development Date:</b>{scm?.Demografic.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // const footerContent = (
    //     <div className="m-0 pt-5 w-full">
    //         <div className='flex overflow-y-auto'>
    //             {visibleBtnSave && <Button label="SAVE" icon="pi pi-save" className="mr-2 p-button-warning" onClick={() => handleButtonClick()} />}
    //         </div>
    //     </div>
    // );


    const [saveAssessment, setSaveAssessment] = useState<boolean>(false);
    const [assessment, setAssessment] = useState<FormValueAssessment>({
        scm: scm?.id ?? 0,
        sourceInforemationClient: scm?.assessment.sourceInforemationClient ?? "",
        sourceInforemationDfc: scm?.assessment.sourceInforemationDfc ?? "",
        sourceInforemationBFF: scm?.assessment.sourceInforemationBFF ?? "",
        sourceInforemationBFFisYes: scm?.assessment.sourceInforemationBFFisYes ?? "",
        sourceInforemationCpa: scm?.assessment.sourceInforemationCpa ?? "",
        sourceInforemationSdp: scm?.assessment.sourceInforemationSdp ?? "",
        sourceInforemationPp: scm?.assessment.sourceInforemationPp ?? "",
        sourceInforemationPpisYes: scm?.assessment.sourceInforemationPpisYes ?? "",
        sourceInforemationFf: scm?.assessment.sourceInforemationFf ?? "",
        sourceInforemationLdrsi1: scm?.assessment.sourceInforemationLdrsi1 ?? false,
        sourceInforemationLdrsi2: scm?.assessment.sourceInforemationLdrsi2 ?? false,
        sourceInforemationLdrsi3: scm?.assessment.sourceInforemationLdrsi3 ?? false,
        sourceInforemationLdrsi4: scm?.assessment.sourceInforemationLdrsi4 ?? false,
        sourceInforemationLdrsi5: scm?.assessment.sourceInforemationLdrsi5 ?? false,
        sourceInforemationLdrsi6: scm?.assessment.sourceInforemationLdrsi6 ?? false,
        sourceInforemationLdrsi7: scm?.assessment.sourceInforemationLdrsi7 ?? false,
        sourceInforemationLdrsi8: scm?.assessment.sourceInforemationLdrsi8 ?? false,
        sourceInforemationLdrsiOther: scm?.assessment.sourceInforemationLdrsiOther ?? "",
        // -------------------
        presentProblems: scm?.assessment.presentProblems ?? "",
        clientLegalRepresentative: scm?.assessment.clientLegalRepresentative ?? "",
        // -------------------
        listRecipientStrengths: scm?.assessment.listRecipientStrengths === "" ? "1- " : scm?.assessment.listRecipientStrengths ?? "1- ",
        listRecipientStrengths1: scm?.assessment.listRecipientStrengths1 === "" ? "2- " : scm?.assessment.listRecipientStrengths1 ?? "2- ",
        listRecipientStrengths2: scm?.assessment.listRecipientStrengths2 === "" ? "3- " : scm?.assessment.listRecipientStrengths2 ?? "3- ",
        listRecipientStrengths3: scm?.assessment.listRecipientStrengths3 === "" ? "4- " : scm?.assessment.listRecipientStrengths3 ?? "4- ",
        listRecipientStrengths4: scm?.assessment.listRecipientStrengths4 === "" ? "5- " : scm?.assessment.listRecipientStrengths4 ?? "5- ",
        listRecipientweakness: scm?.assessment.listRecipientweakness === "" ? "1- " : scm?.assessment.listRecipientweakness ?? "1- ",
        listRecipientweakness1: scm?.assessment.listRecipientweakness1 === "" ? "2- " : scm?.assessment.listRecipientweakness1 ?? "2- ",
        listRecipientweakness2: scm?.assessment.listRecipientweakness2 === "" ? "3- " : scm?.assessment.listRecipientweakness2 ?? "3- ",
        listRecipientweakness3: scm?.assessment.listRecipientweakness3 === "" ? "4- " : scm?.assessment.listRecipientweakness3 ?? "4- ",
        listRecipientweakness4: scm?.assessment.listRecipientweakness4 === "" ? "5- " : scm?.assessment.listRecipientweakness4 ?? "5- ",
        // Page 2
        listResources: scm?.assessment.listResources ?? "",
        // PSYCHOSOCIAL/FAMILY HISTORY:
        psyFamily1A: scm?.assessment.psyFamily1A ?? "",
        psyFamily1Aroom: scm?.assessment.psyFamily1Aroom ?? "",
        psyFamily1Abath: scm?.assessment.psyFamily1Abath ?? "",
        psyFamily1B: scm?.assessment.psyFamily1B ?? "",
        psyFamily1C: scm?.assessment.psyFamily1C ?? "",
        psyFamily1Cmpsr: scm?.assessment.psyFamily1Cmpsr ?? "",
        psyFamily1D: scm?.assessment.psyFamily1D ?? "",
        psyFamily1Dmpsb: scm?.assessment.psyFamily1Dmpsb ?? "",
        psyFamily1E: scm?.assessment.psyFamily1E ?? "",
        psyFamily1EifYes: scm?.assessment.psyFamily1EifYes ?? "",
        // --
        psyFamily2A: scm?.assessment.psyFamily2A ?? "",
        psyFamily2B: scm?.assessment.psyFamily2B ?? "",
        psyFamily3: scm?.assessment.psyFamily3 ?? "",
        psyFamily3ifYes: scm?.assessment.psyFamily3ifYes ?? "",
        psyFamily4: scm?.assessment.psyFamily4 ?? "",
        psyFamily5_1: scm?.assessment.psyFamily5_1 ?? false,
        psyFamily5_2: scm?.assessment.psyFamily5_2 ?? false,
        psyFamily5_3: scm?.assessment.psyFamily5_3 ?? false,
        psyFamily5_4: scm?.assessment.psyFamily5_4 ?? false,
        psyFamily5_5: scm?.assessment.psyFamily5_5 ?? false,
        psyFamily5_6: scm?.assessment.psyFamily5_6 ?? false,
        psyFamily5_7: scm?.assessment.psyFamily5_7 ?? false,
        psyFamily5_8: scm?.assessment.psyFamily5_8 ?? false,
        psyFamily5_9: scm?.assessment.psyFamily5_9 ?? false,
        psyFamily5_10: scm?.assessment.psyFamily5_10 ?? false,
        psyFamily5_11: scm?.assessment.psyFamily5_11 ?? false,
        psyFamily5_12: scm?.assessment.psyFamily5_12 ?? false,
        psyFamily5_13: scm?.assessment.psyFamily5_13 ?? false,
        psyFamily5_14: scm?.assessment.psyFamily5_14 ?? false,
        psyFamily5_15: scm?.assessment.psyFamily5_15 ?? false,
        psyFamily5_16: scm?.assessment.psyFamily5_16 ?? false,
        // PSYCHIATRIC/MEDICAL HISTORY
        psyMedicalHistoryCountryP: scm?.assessment.psyMedicalHistoryCountryP ?? "",
        psyMedicalHistoryUsaP: scm?.assessment.psyMedicalHistoryUsaP ?? "",
        psyMedicalHistoryCountry_1: scm?.assessment.psyMedicalHistoryCountry_1 ?? "",
        psyMedicalHistoryCountry_1ifYes: scm?.assessment.psyMedicalHistoryCountry_1ifYes ?? "",
        psyMedicalHistoryUsa_1: scm?.assessment.psyMedicalHistoryUsa_1 ?? "",
        psyMedicalHistoryUsa_1ifYes: scm?.assessment.psyMedicalHistoryUsa_1ifYes ?? "",
        psyMedicalHistoryCountry_2: scm?.assessment.psyMedicalHistoryCountry_2 ?? "",
        psyMedicalHistoryUsa_2: scm?.assessment.psyMedicalHistoryUsa_2 ?? "",
        psyMedicalHistoryCountry_3: scm?.assessment.psyMedicalHistoryCountry_3 ?? "",
        psyMedicalHistoryUsa_3: scm?.assessment.psyMedicalHistoryUsa_3 ?? "",
        psyMedicalHistoryCountry_4: scm?.assessment.psyMedicalHistoryCountry_4 ?? "",
        psyMedicalHistoryUsa_4: scm?.assessment.psyMedicalHistoryUsa_4 ?? "",
        psyMedicalHistoryCountry_5: scm?.assessment.psyMedicalHistoryCountry_5 ?? "",
        psyMedicalHistoryCountry_5ifYes: scm?.assessment.psyMedicalHistoryCountry_5ifYes ?? "",
        psyMedicalHistoryUsa_5: scm?.assessment.psyMedicalHistoryUsa_5 ?? "",
        psyMedicalHistoryUsa_5ifYes: scm?.assessment.psyMedicalHistoryUsa_5ifYes ?? "",
        psyMedicalHistoryCountry_6: scm?.assessment.psyMedicalHistoryCountry_6 ?? "",
        psyMedicalHistoryCountry_6ifYes: scm?.assessment.psyMedicalHistoryCountry_6ifYes ?? "",
        psyMedicalHistoryUsa_6: scm?.assessment.psyMedicalHistoryUsa_6 ?? "",
        psyMedicalHistoryUsa_6ifYes: scm?.assessment.psyMedicalHistoryUsa_6ifYes ?? "",
        psyMedicalHistoryCountry_7: scm?.assessment.psyMedicalHistoryCountry_7 ?? "",
        psyMedicalHistoryUsa_7: scm?.assessment.psyMedicalHistoryUsa_7 ?? "",
        psyMedicalHistoryCountry_8: scm?.assessment.psyMedicalHistoryCountry_8 ?? "",
        psyMedicalHistoryUsa_8: scm?.assessment.psyMedicalHistoryUsa_8 ?? "",
        psyMedicalHistoryCountry_9: scm?.assessment.psyMedicalHistoryCountry_9 ?? "",
        psyMedicalHistoryUsa_9: scm?.assessment.psyMedicalHistoryUsa_9 ?? "",
        psyMedicalHistoryCountry_10: scm?.assessment.psyMedicalHistoryCountry_10 ?? "",
        psyMedicalHistoryCountry_10ifYes: scm?.assessment.psyMedicalHistoryCountry_10ifYes ?? "",
        psyMedicalHistoryUsa_10: scm?.assessment.psyMedicalHistoryUsa_10 ?? "",
        psyMedicalHistoryUsa_10ifYes: scm?.assessment.psyMedicalHistoryUsa_10ifYes ?? "",
        // family
        psyMedicalHistoryFamily_Mother_Mental: scm?.assessment.psyMedicalHistoryFamily_Mother_Mental ?? "",
        psyMedicalHistoryFamily_Mother_Medical: scm?.assessment.psyMedicalHistoryFamily_Mother_Medical ?? "",
        psyMedicalHistoryFamily_Father_Mental: scm?.assessment.psyMedicalHistoryFamily_Father_Mental ?? "",
        psyMedicalHistoryFamily_Father_Medical: scm?.assessment.psyMedicalHistoryFamily_Father_Medical ?? "",
        psyMedicalHistoryFamily_Siblings_Mental: scm?.assessment.psyMedicalHistoryFamily_Siblings_Mental ?? "",
        psyMedicalHistoryFamily_Siblings_Medical: scm?.assessment.psyMedicalHistoryFamily_Siblings_Medical ?? "",
        psyMedicalHistoryFamily_Other_Mental: scm?.assessment.psyMedicalHistoryFamily_Other_Mental ?? "",
        psyMedicalHistoryFamily_Other_Medical: scm?.assessment.psyMedicalHistoryFamily_Other_Medical ?? "",
        // Page 3
        currentMedication1: scm?.assessment.currentMedication1 ?? "",
        dosage1: scm?.assessment.dosage1 ?? "",
        prescribing1: scm?.assessment.prescribing1 ?? "",
        currentMedication2: scm?.assessment.currentMedication2 ?? "",
        dosage2: scm?.assessment.dosage2 ?? "",
        prescribing2: scm?.assessment.prescribing2 ?? "",
        currentMedication3: scm?.assessment.currentMedication3 ?? "",
        dosage3: scm?.assessment.dosage3 ?? "",
        prescribing3: scm?.assessment.prescribing3 ?? "",
        currentMedication4: scm?.assessment.currentMedication4 ?? "",
        dosage4: scm?.assessment.dosage4 ?? "",
        prescribing4: scm?.assessment.prescribing4 ?? "",
        currentMedication5: scm?.assessment.currentMedication5 ?? "",
        dosage5: scm?.assessment.dosage5 ?? "",
        prescribing5: scm?.assessment.prescribing5 ?? "",
        currentMedication6: scm?.assessment.currentMedication6 ?? "",
        dosage6: scm?.assessment.dosage6 ?? "",
        prescribing6: scm?.assessment.prescribing6 ?? "",
        currentMedication7: scm?.assessment.currentMedication7 ?? "",
        dosage7: scm?.assessment.dosage7 ?? "",
        prescribing7: scm?.assessment.prescribing7 ?? "",
        currentMedication8: scm?.assessment.currentMedication8 ?? "",
        dosage8: scm?.assessment.dosage8 ?? "",
        prescribing8: scm?.assessment.prescribing8 ?? "",
        currentMedication9: scm?.assessment.currentMedication9 ?? "",
        dosage9: scm?.assessment.dosage9 ?? "",
        prescribing9: scm?.assessment.prescribing9 ?? "",
        currentMedication10: scm?.assessment.currentMedication10 ?? "",
        dosage10: scm?.assessment.dosage10 ?? "",
        prescribing10: scm?.assessment.prescribing10 ?? "",
        // Substance
        substance_Alcohol: scm?.assessment.substance_Alcohol ?? "",
        substance_Methadone: scm?.assessment.substance_Methadone ?? "",
        substance_Stimulants: scm?.assessment.substance_Stimulants ?? "",
        substance_Hallucinogens: scm?.assessment.substance_Hallucinogens ?? "",
        substance_Narcotics: scm?.assessment.substance_Narcotics ?? "",
        substance_Tranquilizers: scm?.assessment.substance_Tranquilizers ?? "",
        substance_Inhalants: scm?.assessment.substance_Inhalants ?? "",
        substance_Pain: scm?.assessment.substance_Pain ?? "",
        substance_Other: scm?.assessment.substance_Other ?? "",
        substance_OtherSpecify: scm?.assessment.substance_OtherSpecify ?? "",
        substance_Marijuana: scm?.assessment.substance_Marijuana ?? "",
        substance_Sleeping: scm?.assessment.substance_Sleeping ?? "",
        substance_Other1: scm?.assessment.substance_Other1 ?? "",
        substance_Other1Specify: scm?.assessment.substance_Other1Specify ?? "",
        substance_Family: scm?.assessment.substance_Family ?? "",
        // EDUCATIONAL ASSESSMENT
        education_PrimaryLeng: scm?.assessment.education_PrimaryLeng ?? "",
        education_OtherLengs: scm?.assessment.education_OtherLengs ?? "",
        education_Current_School: scm?.assessment.education_Current_School ?? "",
        education_Grade_Level: scm?.assessment.education_Grade_Level ?? "",
        education_Special_Ed: scm?.assessment.education_Special_Ed ?? "",
        education_List_Grades1: scm?.assessment.education_List_Grades1 === "" ? "- " : scm?.assessment.education_List_Grades1 ?? "",
        education_List_Grades2: scm?.assessment.education_List_Grades2 === "" ? "- " : scm?.assessment.education_List_Grades2 ?? "",
        education_List_Grades3: scm?.assessment.education_List_Grades3 === "" ? "- " : scm?.assessment.education_List_Grades3 ?? "",
        // WORK 
        work_Current: scm?.assessment.work_Current ?? "",
        work_Position: scm?.assessment.work_Position ?? "",
        work_Time: scm?.assessment.work_Time ?? "",
        work_History1: scm?.assessment.work_History1 === "" ? "- " : scm?.assessment.work_History1 ?? "",
        work_History2: scm?.assessment.work_History2 === "" ? "- " : scm?.assessment.work_History2 ?? "",
        work_History3: scm?.assessment.work_History3 === "" ? "- " : scm?.assessment.work_History3 ?? "",
        // Services being
        servicesBeing1: scm?.assessment.servicesBeing1 ?? false,
        servicesBeing2: scm?.assessment.servicesBeing2 ?? false,
        servicesBeing3: scm?.assessment.servicesBeing3 ?? false,
        servicesBeing4: scm?.assessment.servicesBeing4 ?? false,
        servicesBeing5: scm?.assessment.servicesBeing5 ?? false,
        servicesBeing6: scm?.assessment.servicesBeing6 ?? false,
        servicesBeing7: scm?.assessment.servicesBeing7 ?? false,
        servicesBeing8: scm?.assessment.servicesBeing8 ?? false,
        servicesBeing9: scm?.assessment.servicesBeing9 ?? false,
        servicesBeing10: scm?.assessment.servicesBeing10 ?? false,
        servicesBeingOther: scm?.assessment.servicesBeingOther ?? "",
        // DESCRIBE CLIENT’S
        describeClientDoes: scm?.assessment.describeClientDoes ?? "",
        describeClientConsidered: scm?.assessment.describeClientConsidered ?? "",
        describeClientPeers: scm?.assessment.describeClientPeers ?? "",
        describeClientInvolvement: scm?.assessment.describeClientInvolvement ?? "",
        describeClientInvolvementifYes: scm?.assessment.describeClientInvolvementifYes ?? "",
        describeClientAssociates: scm?.assessment.describeClientAssociates ?? "",
        describeClientrelationship: scm?.assessment.describeClientrelationship ?? "",
        describeClientrelationshipMany: scm?.assessment.describeClientrelationshipMany ?? "",
        describeClientDescribe: scm?.assessment.describeClientDescribe ?? "",
        // RECIPIENT
        recipent1: scm?.assessment.recipent1 ?? "",
        recipent2: scm?.assessment.recipent2 ?? "",
        recipent3: scm?.assessment.recipent3 ?? "",
        recipent4: scm?.assessment.recipent4 ?? "",
        recipent5: scm?.assessment.recipent5 ?? "",
        recipent6: scm?.assessment.recipent6 ?? "",
        recipent7: scm?.assessment.recipent7 ?? "",
        recipent8: scm?.assessment.recipent8 ?? "",
        // recipent_Therapy: scm?.assessment.recipent_Therapy ?? "",
        // recipent_TherapyType: scm?.assessment.recipent_TherapyType ?? "",
        // recipent_Psychotropic: scm?.assessment.recipent_Psychotropic ?? "",
        // recipent_Substance: scm?.assessment.recipent_Substance ?? "",
        // recipent_Family: scm?.assessment.recipent_Family ?? "",
        // recipent_Medical: scm?.assessment.recipent_Medical ?? "",
        // recipent_Housing: scm?.assessment.recipent_Housing ?? "",
        // recipent_Educational: scm?.assessment.recipent_Educational ?? "",
        // recipent_Legal: scm?.assessment.recipent_Legal ?? "",
        // recipent_Development: scm?.assessment.recipent_Development ?? "",
        // recipent_Assistance: scm?.assessment.recipent_Assistance ?? "",
        // recipent_Permanency: scm?.assessment.recipent_Permanency ?? "",
        // Discussion 
        discussion: scm?.assessment.discussion ?? "",
        // Describe the services
        describeServicePsychiatrist: scm?.assessment.describeServicePsychiatrist ?? "",
        describeServicePCP: scm?.assessment.describeServicePCP ?? "",
        describeServicePSR: scm?.assessment.describeServicePSR ?? "",
        describeServiceOther: scm?.assessment.describeServiceOther ?? "",
        // Signature option
        signatureOpt: scm?.assessment.signatureOpt ?? "",
        // --
        tcm: scm?.tcm_id ?? 0,
        nameTCM: scm?.assessment.nameTCM ?? "",
        categoryTCM: scm?.assessment.categoryTCM === "" ? scm?.tcm.categoryTCM : scm?.assessment.categoryTCM ?? "CBHCM",
        signatureTcm: scm?.assessment.signatureTcm ?? "data:image/png;base64,",
        signatureTcmDate: scm?.assessment.signatureTcmDate ?? "",

        supervisor: scm?.assessment.supervisor ?? 0,
        nameSupervisor: scm?.assessment.nameSupervisor ?? "",
        categorySupervisor: scm?.assessment.categorySupervisor ?? "",
        signatureSupervisor: scm?.assessment.signatureSupervisor ?? "data:image/png;base64,",
        signatureSupervisorDate: scm?.assessment.signatureSupervisorDate ?? "",

        qa: scm?.assessment.qa ?? 0,
        signatureQa: scm?.assessment.signatureQa ?? "data:image/png;base64,",
        signatureQaDate: scm?.assessment.signatureQaDate ?? "",
    });
    const changeAssessment = <T extends string | boolean>(name: keyof FormValueAssessment, value: T) => {
        setAssessment(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveAssessment(true);
        return assessment
    };
    const handleButtonClick = () => {
        if (saveAssessment) {
            requestEditAssessment({ requestAssessment: assessment });
            setSaveAssessment(false);
        }
        relad();
        setVisibleBtnSave(false);
    };
    // -------------------
    // const optionsServicesBeing: string[] = ['AA/NA', 'SSA', 'CHARLEE', 'Children’s Home Society', 'DCF', 'Section 8', 'CHURCH', 'Foster Care', 'Juvenile Justice', 'Other'];
    // const optionsLivingArrangement: string[] = ['House', 'Apartment', 'Townhouse', 'Trailer', 'Other'];
    // const optionsMaterialStatus: string[] = ['Single', 'Married', 'Separete', 'Divorced', 'Widowed'];
    // const optionsClientAssosoates: string[] = ['Chronological Age', 'Younger', 'Older'];
    // const optionsYesNoHospitalization: string[] = ['1 T', '2T', '3 T', '4 T', 'No'];
    // const optionsEducationSpecialEd: string[] = ['Yes', 'No', 'Sed', 'Eh', 'L'];
    // const optionsClientConsidered: string[] = ['a leader', 'a follower'];
    // const optionsTherapy: string[] = ['Individual', 'Family', 'Group'];
    // const optionsYesNoNa: string[] = ['Yes', 'No', 'N/A'];
    // const optionsYesNo: string[] = ['Yes', 'No'];

    // ---------------------------
    // 1 - Psychological 
    const [goal1a, setGoal1a] = useState<boolean>(false);
    const [goal1aType, setGoal1aType] = useState<string>("");
    const [goal1a1, setGoal1a1] = useState<boolean>(false);
    const [goal1a1Type, setGoal1a1Type] = useState<string>("");
    const [goal1a2, setGoal1a2] = useState<boolean>(false);
    const [goal1a2Type, setGoal1a2Type] = useState<string>("");

    const [goal1b, setGoal1b] = useState<boolean>(false);
    const [goal1bType, setGoal1bType] = useState<string>("");
    const [goal1c, setGoal1c] = useState<boolean>(false);
    const [goal1cType, setGoal1cType] = useState<string>("");
    const [goal1d, setGoal1d] = useState<boolean>(false);
    const [goal1dType, setGoal1dType] = useState<string>("");
    const [goal1e, setGoal1e] = useState<boolean>(false);
    const [goal1eType, setGoal1eType] = useState<string>("");
    const [goal1f, setGoal1f] = useState<boolean>(false);
    const [goal1fType, setGoal1fType] = useState<string>("");
    const [goal1f1, setGoal1f1] = useState<boolean>(false);
    const [goal1f1Type, setGoal1f1Type] = useState<string>("");
    const [goal1f2, setGoal1f2] = useState<boolean>(false);
    const [goal1f2Type, setGoal1f2Type] = useState<string>("");
    // 2 - Medical/Dental 
    const [goal2a, setGoal2a] = useState<boolean>(false);
    const [goal2aType, setGoal2aType] = useState<string>("");
    const [goal2a1, setGoal2a1] = useState<boolean>(false);
    const [goal2a1Type, setGoal2a1Type] = useState<string>("");
    const [goal2a2, setGoal2a2] = useState<boolean>(false);
    const [goal2a2Type, setGoal2a2Type] = useState<string>("");

    const [goal2b, setGoal2b] = useState<boolean>(false);
    const [goal2bType, setGoal2bType] = useState<string>("");
    const [goal2c, setGoal2c] = useState<boolean>(false);
    const [goal2cType, setGoal2cType] = useState<string>("");
    const [goal2d, setGoal2d] = useState<boolean>(false);
    const [goal2dType, setGoal2dType] = useState<string>("");
    const [goal2d1, setGoal2d1] = useState<boolean>(false);
    const [goal2d1Type, setGoal2d1Type] = useState<string>("");
    const [goal2d2, setGoal2d2] = useState<boolean>(false);
    const [goal2d2Type, setGoal2d2Type] = useState<string>("");

    const [goal2e, setGoal2e] = useState<boolean>(false);
    const [goal2eType, setGoal2eType] = useState<string>("");
    const [goal2e1, setGoal2e1] = useState<boolean>(false);
    const [goal2e1Type, setGoal2e1Type] = useState<string>("");
    const [goal2e2, setGoal2e2] = useState<boolean>(false);
    const [goal2e2Type, setGoal2e2Type] = useState<string>("");
    const [goal2e3, setGoal2e3] = useState<boolean>(false);
    const [goal2e3Type, setGoal2e3Type] = useState<string>("");
    const [goal2e4, setGoal2e4] = useState<boolean>(false);
    const [goal2e4Type, setGoal2e4Type] = useState<string>("");
    const [goal2e5, setGoal2e5] = useState<boolean>(false);
    const [goal2e5Type, setGoal2e5Type] = useState<string>("");

    // 3 - Medical/Dental 
    const [goal3a, setGoal3a] = useState<boolean>(false);
    const [goal3aType, setGoal3aType] = useState<string>("");
    const [goal3b, setGoal3b] = useState<boolean>(false);
    const [goal3bType, setGoal3bType] = useState<string>("");
    const [goal3b1, setGoal3b1] = useState<boolean>(false);
    const [goal3b1Type, setGoal3b1Type] = useState<string>("");
    const [goal3b2, setGoal3b2] = useState<boolean>(false);
    const [goal3b2Type, setGoal3b2Type] = useState<string>("");
    const [goal3b3, setGoal3b3] = useState<boolean>(false);
    const [goal3b3Type, setGoal3b3Type] = useState<string>("");
    const [goal3b4, setGoal3b4] = useState<boolean>(false);
    const [goal3b4Type, setGoal3b4Type] = useState<string>("");
    const [goal3b5, setGoal3b5] = useState<boolean>(false);
    const [goal3b5Type, setGoal3b5Type] = useState<string>("");
    const [goal3b6, setGoal3b6] = useState<boolean>(false);
    const [goal3b6Type, setGoal3b6Type] = useState<string>("");
    const [goal3b7, setGoal3b7] = useState<boolean>(false);
    const [goal3b7Type, setGoal3b7Type] = useState<string>("");
    const [goal3b8, setGoal3b8] = useState<boolean>(false);
    const [goal3b8Type, setGoal3b8Type] = useState<string>("");

    const [goal3c, setGoal3c] = useState<boolean>(false);
    const [goal3cType, setGoal3cType] = useState<string>("");
    const [goal3c1, setGoal3c1] = useState<boolean>(false);
    const [goal3c1Type, setGoal3c1Type] = useState<string>("");
    const [goal3c2, setGoal3c2] = useState<boolean>(false);
    const [goal3c2Type, setGoal3c2Type] = useState<string>("");
    const [goal3c3, setGoal3c3] = useState<boolean>(false);
    const [goal3c3Type, setGoal3c3Type] = useState<string>("");
    const [goal3c4, setGoal3c4] = useState<boolean>(false);
    const [goal3c4Type, setGoal3c4Type] = useState<string>("");
    const [goal3c5, setGoal3c5] = useState<boolean>(false);
    const [goal3c5Type, setGoal3c5Type] = useState<string>("");
    const [goal3c6, setGoal3c6] = useState<boolean>(false);
    const [goal3c6Type, setGoal3c6Type] = useState<string>("");

    const [goal3d, setGoal3d] = useState<boolean>(false);
    const [goal3dType, setGoal3dType] = useState<string>("");
    const [goal3d1, setGoal3d1] = useState<boolean>(false);
    const [goal3d1Type, setGoal3d1Type] = useState<string>("");
    const [goal3d2, setGoal3d2] = useState<boolean>(false);
    const [goal3d2Type, setGoal3d2Type] = useState<string>("");
    const [goal3d3, setGoal3d3] = useState<boolean>(false);
    const [goal3d3Type, setGoal3d3Type] = useState<string>("");
    const [goal3d4, setGoal3d4] = useState<boolean>(false);
    const [goal3d4Type, setGoal3d4Type] = useState<string>("");
    const [goal3d5, setGoal3d5] = useState<boolean>(false);
    const [goal3d5Type, setGoal3d5Type] = useState<string>("");
    const [goal3d6, setGoal3d6] = useState<boolean>(false);
    const [goal3d6Type, setGoal3d6Type] = useState<string>("");
    const [goal3d7, setGoal3d7] = useState<boolean>(false);
    const [goal3d7Type, setGoal3d7Type] = useState<string>("");

    const [goal3e, setGoal3e] = useState<boolean>(false);
    const [goal3eType, setGoal3eType] = useState<string>("");

    const [goal3f, setGoal3f] = useState<boolean>(false);
    const [goal3fType, setGoal3fType] = useState<string>("");
    const [goal3f1, setGoal3f1] = useState<boolean>(false);
    const [goal3f1Type, setGoal3f1Type] = useState<string>("");
    const [goal3f2, setGoal3f2] = useState<boolean>(false);
    const [goal3f2Type, setGoal3f2Type] = useState<string>("");
    const [goal3f3, setGoal3f3] = useState<boolean>(false);
    const [goal3f3Type, setGoal3f3Type] = useState<string>("");

    // 4 - Medical/Dental 
    const [goal4a, setGoal4a] = useState<boolean>(false);
    const [goal4aType, setGoal4aType] = useState<string>("");
    const [goal4b, setGoal4b] = useState<boolean>(false);
    const [goal4bType, setGoal4bType] = useState<string>("");
    const [goal4c, setGoal4c] = useState<boolean>(false);
    const [goal4cType, setGoal4cType] = useState<string>("");
    const [goal4d, setGoal4d] = useState<boolean>(false);
    const [goal4dType, setGoal4dType] = useState<string>("");
    const [goal4e, setGoal4e] = useState<boolean>(false);
    const [goal4eType, setGoal4eType] = useState<string>("");
    const [goal4f, setGoal4f] = useState<boolean>(false);
    const [goal4fType, setGoal4fType] = useState<string>("");
    // 5 - Medical/Dental 
    const [goal5a, setGoal5a] = useState<boolean>(false);
    const [goal5aType, setGoal5aType] = useState<string>("");
    const [goal5b, setGoal5b] = useState<boolean>(false);
    const [goal5bType, setGoal5bType] = useState<string>("");
    const [goal5c, setGoal5c] = useState<boolean>(false);
    const [goal5cType, setGoal5cType] = useState<string>("");
    const [goal5d, setGoal5d] = useState<boolean>(false);
    const [goal5dType, setGoal5dType] = useState<string>("");
    const [goal5e, setGoal5e] = useState<boolean>(false);
    const [goal5eType, setGoal5eType] = useState<string>("");
    // 6 - Medical/Dental 
    const [goal6a, setGoal6a] = useState<boolean>(false);
    const [goal6aType, setGoal6aType] = useState<string>("");
    const [goal6a1, setGoal6a1] = useState<boolean>(false);
    const [goal6a1Type, setGoal6a1Type] = useState<string>("");
    const [goal6a2, setGoal6a2] = useState<boolean>(false);
    const [goal6a2Type, setGoal6a2Type] = useState<string>("");
    const [goal6a3, setGoal6a3] = useState<boolean>(false);
    const [goal6a3Type, setGoal6a3Type] = useState<string>("");
    const [goal6a4, setGoal6a4] = useState<boolean>(false);
    const [goal6a4Type, setGoal6a4Type] = useState<string>("");
    const [goal6a5, setGoal6a5] = useState<boolean>(false);
    const [goal6a5Type, setGoal6a5Type] = useState<string>("");


    const [goal6b, setGoal6b] = useState<boolean>(false);
    const [goal6bType, setGoal6bType] = useState<string>("");
    const [goal6c, setGoal6c] = useState<boolean>(false);
    const [goal6cType, setGoal6cType] = useState<string>("");
    const [goal6d, setGoal6d] = useState<boolean>(false);
    const [goal6dType, setGoal6dType] = useState<string>("");
    const [goal6e, setGoal6e] = useState<boolean>(false);
    const [goal6eType, setGoal6eType] = useState<string>("");
    const [goal6f, setGoal6f] = useState<boolean>(false);
    const [goal6fType, setGoal6fType] = useState<string>("");
    // 7 - Medical/Dental 
    const [goal7a, setGoal7a] = useState<boolean>(false);
    const [goal7aType, setGoal7aType] = useState<string>("");
    const [goal7b, setGoal7b] = useState<boolean>(false);
    const [goal7bType, setGoal7bType] = useState<string>("");
    const [goal7b1, setGoal7b1] = useState<boolean>(false);
    const [goal7b1Type, setGoal7b1Type] = useState<string>("");
    const [goal7b2, setGoal7b2] = useState<boolean>(false);
    const [goal7b2Type, setGoal7b2Type] = useState<string>("");
    const [goal7b3, setGoal7b3] = useState<boolean>(false);
    const [goal7b3Type, setGoal7b3Type] = useState<string>("");

    const [goal7c, setGoal7c] = useState<boolean>(false);
    const [goal7cType, setGoal7cType] = useState<string>("");
    const [goal7d, setGoal7d] = useState<boolean>(false);
    const [goal7dType, setGoal7dType] = useState<string>("");
    const [goal7e, setGoal7e] = useState<boolean>(false);
    const [goal7eType, setGoal7eType] = useState<string>("");
    const [goal7e1, setGoal7e1] = useState<boolean>(false);
    const [goal7e1Type, setGoal7e1Type] = useState<string>("");
    const [goal7e2, setGoal7e2] = useState<boolean>(false);
    const [goal7e2Type, setGoal7e2Type] = useState<string>("");
    const [goal7e3, setGoal7e3] = useState<boolean>(false);
    const [goal7e3Type, setGoal7e3Type] = useState<string>("");
    const [goal7e4, setGoal7e4] = useState<boolean>(false);
    const [goal7e4Type, setGoal7e4Type] = useState<string>("");
    const [goal7e5, setGoal7e5] = useState<boolean>(false);
    const [goal7e5Type, setGoal7e5Type] = useState<string>("");
    const [goal7e6, setGoal7e6] = useState<boolean>(false);
    const [goal7e6Type, setGoal7e6Type] = useState<string>("");
    const [goal7e7, setGoal7e7] = useState<boolean>(false);
    const [goal7e7Type, setGoal7e7Type] = useState<string>("");

    // 8 - Medical/Dental 
    const [goal8a, setGoal8a] = useState<boolean>(false);
    const [goal8aType, setGoal8aType] = useState<string>("");
    const [goal8b, setGoal8b] = useState<boolean>(false);
    const [goal8bType, setGoal8bType] = useState<string>("");
    const [goal8c, setGoal8c] = useState<boolean>(false);
    const [goal8cType, setGoal8cType] = useState<string>("");
    const [goal8d, setGoal8d] = useState<boolean>(false);
    const [goal8dType, setGoal8dType] = useState<string>("");
    const [goal8e, setGoal8e] = useState<boolean>(false);
    const [goal8eType, setGoal8eType] = useState<string>("");

    const [selected, setSelected] = useState<number>(0);

    const handleChange = (fieldName: string) => {
        let countTrue = 0;
        let countTypes: { [key: string]: string } = {};

        // Obtener los nombres de los campos y tipos de campos
        const fieldNames = Object.keys({
            goal1a,
            goal1a1,
            goal1a2,
            goal1b,
            goal1c,
            goal1d,
            goal1e,
            goal1f,
            goal1f1,
            goal1f2,
            goal2a,
            goal2a1,
            goal2a2,
            goal2b,
            goal2c,
            goal2d,
            goal2d1,
            goal2d2,
            goal2e,
            goal2e1,
            goal2e2,
            goal2e3,
            goal2e4,
            goal2e5,
            goal3a,
            goal3b,
            goal3c,
            goal3d,
            goal3e,
            goal3f,
            goal4a,
            goal4b,
            goal4c,
            goal4d,
            goal4e,
            goal4f,
            goal5a,
            goal5b,
            goal5c,
            goal5d,
            goal5e,
            goal6a,
            goal6b,
            goal6c,
            goal6d,
            goal6e,
            goal6f,
            goal7a,
            goal7b,
            goal7c,
            goal7d,
            goal7e,
            goal8a,
            goal8b,
            goal8c,
            goal8d,
            goal8e,
        });
        const fieldTypesNames = Object.keys({
            goal1aType,
            goal1a1Type,
            goal1a2Type,
            goal1bType,
            goal1cType,
            goal1dType,
            goal1eType,
            goal1fType,
            goal1f1Type,
            goal1f2Type,
            goal2aType,
            goal2a1Type,
            goal2a2Type,
            goal2bType,
            goal2cType,
            goal2dType,
            goal2d1Type,
            goal2d2Type,
            goal2eType,
            goal2e1Type,
            goal2e2Type,
            goal2e3Type,
            goal2e4Type,
            goal2e5Type,
            goal3aType,
            goal3bType,
            goal3cType,
            goal3dType,
            goal3eType,
            goal3fType,
            goal4aType,
            goal4bType,
            goal4cType,
            goal4dType,
            goal4eType,
            goal4fType,
            goal5aType,
            goal5bType,
            goal5cType,
            goal5dType,
            goal5eType,
            goal6aType,
            goal6bType,
            goal6cType,
            goal6dType,
            goal6eType,
            goal6fType,
            goal7aType,
            goal7bType,
            goal7cType,
            goal7dType,
            goal7eType,
            goal8aType,
            goal8bType,
            goal8cType,
            goal8dType,
            goal8eType,
        });

        // Comprobar y contar cuántos campos ya están en true
        for (const key of fieldNames) {
            if (key === fieldName) {
                const value = !eval(key);
                eval('set' + key.replace('goal', 'Goal') + '(' + value + ')');
                if (value === true) {
                    countTrue++;
                } else {
                    countTrue--;
                }

            }
            if (eval(key)) {
                countTrue++;
            }
        }
        setSelected(countTrue);
        // Actualizar los tipos según la lógica establecida
        for (const key of fieldTypesNames) {
            const fieldTypeKey = key.replace('Type', '');
            if (fieldTypeKey === fieldName.replace('Type', '')) {
                if (countTrue < 10) {
                    countTypes[key] = countTrue < 10 ? 'initial' : 'addendums';
                } else if (countTrue < 16) {
                    countTypes[key] = countTrue < 16 ? 'addendums' : '';
                }
            }
        }

        // Actualizar los estados de los tipos de campos
        for (const [key, value] of Object.entries(countTypes)) {
            eval('set' + key.replace('goal', 'Goal') + '("' + value + '")');
        }
    };

    // ---------------------------
    const footerSign = (
        <div className="m-0 pt-5 w-full">
            <div className='flex overflow-y-auto'>
                {/* {visibleBtnSave && <Button label="SAVE" icon="pi pi-save" className="mr-2 p-button-warning" onClick={() => handleButtonClick()} />} */}
                {/* {requestCertification.signTcm !== "" && */}
                <Button
                    label="SAVE"
                    icon="pi pi-save"
                    className="mr-2 p-button-warning"
                    onClick={() => {
                        setSignTCM(false);
                        requestEditAssessment({ requestAssessment: assessment });
                    }}
                />
                {/* } */}
            </div>
        </div>

    );

    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>
            {/* <BlockUI blocked={assessment.signatureTcm !== "" ? assessment.signatureSupervisor !== "" ? false : true : false}> */}
            {visibleBtnSave && <Button
                icon="pi pi-save"
                rounded
                tooltip="Keep the information on file until you complete the hiring form"
                tooltipOptions={{ position: 'top' }}
                style={{ position: "fixed", left: 10, bottom: "40%", zIndex: 99999 }}
                className="p-button-warning"
                onClick={() => handleButtonClick()}
            />}
            {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
            <div className='page'>
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    TCM SERVICES
                </div>
                <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                    INITIAL SERVICE PLAN
                </div>

                {HeaderPage}
                {/* row 3 */}


                {/* SECTION I: DIAGNOSIS */}
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION I: DIAGNOSIS</b>
                </div>

                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="flex w-1/6 pl-5">
                                <b className='mr-5'>ICD 10: Axis I Code:</b>
                            </div>
                            <div className="flex w-1/6 pl-5">
                                <InputText
                                    type="text"
                                    name='listRecipientStrengths'
                                    placeholder="-"
                                    value={assessment.listRecipientStrengths3}
                                    onChange={(e) => changeAssessment("listRecipientStrengths3", e.target.value)}
                                    className="input input-ghost w-full border-primary border-2"
                                    style={{ backgroundColor: "#e5ecfc", height: "28px" }}
                                // onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className="flex w-1/6 pl-5">
                                <b className='mr-5 text-right'>Description:</b>
                            </div>
                            <div className="flex w-3/6 pl-5">
                                <InputText
                                    type="text"
                                    name='listRecipientStrengths'
                                    placeholder="-"
                                    value={assessment.listRecipientStrengths3}
                                    onChange={(e) => changeAssessment("listRecipientStrengths3", e.target.value)}
                                    className="input input-ghost w-full border-primary border-2"
                                    style={{ backgroundColor: "#e5ecfc", height: "28px" }}
                                // onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION II: SERVICE AREA NEEDS */}
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION II: SERVICE AREA NEEDS</b>
                </div>
                {view === "Edit" ? (
                    <div>
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-primary" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>1- Psychological</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>2 Medical/Dental</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>3-Financial Resources</b>
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>4-Environmental Supports</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* A */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1a === false ? true : false : false}
                                                checked={goal1a}
                                                // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                onChange={() => {
                                                    handleChange("goal1a");
                                                }}
                                            />
                                            <b>A</b>- Emotional, Behavior
                                        </div>
                                        {goal1a && <div className='flex w-full pl-3'>
                                            <div className="flex mr-2">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal1a1 === false ? true : false : false}
                                                    checked={goal1a1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal1a1");
                                                    }}
                                                />
                                                Psychotherapy
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal1a2 === false ? true : false : false}
                                                    checked={goal1a2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal1a2");
                                                    }}
                                                />
                                                Apa
                                            </div>
                                        </div>}

                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal2a === false ? true : false : false}
                                                checked={goal2a}
                                                // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                onChange={() => handleChange("goal2a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- Medical Needs
                                        </div>
                                        {goal2a && <div className='flex w-full pl-3'>
                                            <div className="flex mr-2">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2a1 === false ? true : false : false}
                                                    checked={goal2a1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2a1");
                                                    }}
                                                />
                                                PCP
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2a2 === false ? true : false : false}
                                                    checked={goal2a2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2a2");
                                                    }}
                                                />
                                                Other
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3a === false ? true : false : false}
                                                checked={goal3a}
                                                // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                onChange={() => handleChange("goal3a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- Housing
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4a === false ? true : false : false}
                                                checked={goal4a}
                                                // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                onChange={() => handleChange("goal4a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- Sports Programs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* B */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1b === false ? true : false : false}
                                                checked={goal1b}
                                                onChange={() => handleChange("goal1b")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>B</b>- Cognitive Difficulties
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal2b === false ? true : false : false}
                                                checked={goal2b}
                                                onChange={() => handleChange("goal2b")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>B</b>- Dental Needs
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3b === false ? true : false : false}
                                                checked={goal3b}
                                                onChange={() => handleChange("goal3b")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>B</b>- Utilities and Expenses
                                        </div>
                                        {goal3b && <div className='w-full pl-3'>
                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b1 === false ? true : false : false}
                                                        checked={goal3b1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b1");
                                                        }}
                                                    />
                                                    Liheap
                                                </div>

                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b2 === false ? true : false : false}
                                                        checked={goal3b2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b2");
                                                        }}
                                                    />
                                                    Free Phone
                                                </div>
                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-3">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b5 === false ? true : false : false}
                                                        checked={goal3b5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b5");
                                                        }}
                                                    />
                                                    Tablet
                                                </div>
                                                <div className="flex mr-6">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b3 === false ? true : false : false}
                                                        checked={goal3b3}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b3");
                                                        }}
                                                    />
                                                    Internet
                                                </div>

                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b4 === false ? true : false : false}
                                                        checked={goal3b4}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b4");
                                                        }}
                                                    />
                                                    Cable
                                                </div>
                                            </div>
                                            <div className="flex w-full">
                                                <div className="flex mr-3">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b8 === false ? true : false : false}
                                                        checked={goal3b8}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b8");
                                                        }}
                                                    />
                                                    Water
                                                </div>
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b6 === false ? true : false : false}
                                                        checked={goal3b6}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b6");
                                                        }}
                                                    />
                                                    Computer
                                                </div>

                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b7 === false ? true : false : false}
                                                        checked={goal3b7}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b7");
                                                        }}
                                                    />
                                                    FPL
                                                </div>

                                            </div>

                                        </div>}
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4b === false ? true : false : false}
                                                checked={goal4b}
                                                onChange={() => handleChange("goal4b")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>B</b>- Afterschool Programs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* C */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1c === false ? true : false : false}
                                                checked={goal1c}
                                                onChange={() => handleChange("goal1c")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>C</b>- Psychiatric Needs
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal2c === false ? true : false : false}
                                                checked={goal2c}
                                                onChange={() => handleChange("goal2c")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>C</b>- Vision Needs
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3c === false ? true : false : false}
                                                checked={goal3c}
                                                onChange={() => handleChange("goal3c")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>C</b>- Economic Assistance
                                        </div>
                                        {goal3c && <div className='w-full pl-3'>
                                            <div className="flex w-full">
                                                <div className="flex mr-3">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b1 === false ? true : false : false}
                                                        checked={goal3b1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b1");
                                                        }}
                                                    />
                                                    DCF
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b5 === false ? true : false : false}
                                                        checked={goal3b5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b5");
                                                        }}
                                                    />
                                                    Funeral Plan
                                                </div>

                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-3">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b2 === false ? true : false : false}
                                                        checked={goal3b2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b2");
                                                        }}
                                                    />
                                                    SSI&nbsp;&nbsp;
                                                </div>

                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b3 === false ? true : false : false}
                                                        checked={goal3b3}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b3");
                                                        }}
                                                    />
                                                    Bank Checking Account
                                                </div>
                                            </div>
                                            <div className="flex w-full">
                                                <div className="flex mr-4">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b2 === false ? true : false : false}
                                                        checked={goal3b2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b2");
                                                        }}
                                                    />
                                                    SSA
                                                </div>

                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b8 === false ? true : false : false}
                                                        checked={goal3b8}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3b8");
                                                        }}
                                                    />
                                                    Bank Credit Account
                                                </div>
                                            </div>


                                        </div>}
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4c === false ? true : false : false}
                                                checked={goal4c}
                                                onChange={() => handleChange("goal4c")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>C</b>- Mentoring
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* D */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1d === false ? true : false : false}
                                                checked={goal1d}
                                                onChange={() => handleChange("goal1d")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>D</b>- Substance Abuse
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal2d === false ? true : false : false}
                                                checked={goal2d}
                                                onChange={() => handleChange("goal2d")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>D</b>- Specialist Needs
                                        </div>
                                        {goal2d && <div className='flex w-full pl-3'>
                                            <div className="flex mr-2">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2d1 === false ? true : false : false}
                                                    checked={goal2d1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2d1");
                                                    }}
                                                />
                                                All Specialist
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2d2 === false ? true : false : false}
                                                    checked={goal2d2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2d2");
                                                    }}
                                                />
                                                Other
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3d === false ? true : false : false}
                                                checked={goal3d}
                                                onChange={() => handleChange("goal3d")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>D</b>- Transportation
                                        </div>

                                        {goal3d && <div className='w-full pl-3'>

                                            <div className="flex w-full">

                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3d4 === false ? true : false : false}
                                                        checked={goal3d4}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d4");
                                                        }}
                                                    />
                                                    Golden Pass
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3b5 === false ? true : false : false}
                                                        checked={goal3d5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d5");
                                                        }}
                                                    />
                                                    Easy Card
                                                </div>

                                            </div>

                                            <div className="flex mr-4">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal3d6 === false ? true : false : false}
                                                    checked={goal3d6}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal3d6");
                                                    }}
                                                />
                                                Disable Parking Permit
                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-3">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3d1 === false ? true : false : false}
                                                        checked={goal3d1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d1");
                                                        }}
                                                    />
                                                    STS
                                                </div>

                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3d2 === false ? true : false : false}
                                                        checked={goal3d2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d5");
                                                        }}
                                                    />
                                                    Papa
                                                </div>
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3d3 === false ? true : false : false}
                                                        checked={goal3d3}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d3");
                                                        }}
                                                    />
                                                    Tops
                                                </div>
                                                <div className="flex mr-4">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal3d7 === false ? true : false : false}
                                                        checked={goal3d7}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal3d7");
                                                        }}
                                                    />
                                                    Other
                                                </div>
                                            </div>

                                        </div>}
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4d === false ? true : false : false}
                                                checked={goal4d}
                                                onChange={() => handleChange("goal4d")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>D</b>- Employment
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* E */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1e === false ? true : false : false}
                                                checked={goal1e}
                                                onChange={() => handleChange("goal1e")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>E</b>- Psycho Sexual
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal2e === false ? true : false : false}
                                                checked={goal2e}
                                                onChange={() => handleChange("goal2e")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>E</b>- Other
                                        </div>
                                        {goal2e && <div className='w-full pl-3'>

                                            <div className="flex mr-2">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2e1 === false ? true : false : false}
                                                    checked={goal2e1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2e1");
                                                    }}
                                                />
                                                Medical Center
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2e2 === false ? true : false : false}
                                                    checked={goal2e2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2e2");
                                                    }}
                                                />
                                                Sneacker Program
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal2e3 === false ? true : false : false}
                                                    checked={goal2e3}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal2e3");
                                                    }}
                                                />
                                                Golden Ticket
                                            </div>
                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal2e4 === false ? true : false : false}
                                                        checked={goal2e4}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal2e4");
                                                        }}
                                                    />
                                                    HHA
                                                </div>


                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal2e5 === false ? true : false : false}
                                                        checked={goal2e5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal2e5");
                                                        }}
                                                    />
                                                    Other
                                                </div>
                                            </div>

                                        </div>}
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3e === false ? true : false : false}
                                                checked={goal3e}
                                                onChange={() => handleChange("goal3e")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>E</b>- Other/Daycare
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4e === false ? true : false : false}
                                                checked={goal4e}
                                                onChange={() => handleChange("goal4e")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>E</b>- Summer Camp
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* F */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal1f === false ? true : false : false}
                                                checked={goal1f}
                                                onChange={() => handleChange("goal1f")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>F</b>- Other
                                        </div>
                                        {goal1f && <div className='flex w-full pl-3'>
                                            <div className="flex mr-2">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal1f1 === false ? true : false : false}
                                                    checked={goal1f1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal1f1");
                                                    }}
                                                />
                                                PSR
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal1f2 === false ? true : false : false}
                                                    checked={goal1f2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal1f2");
                                                    }}
                                                />
                                                Other
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">

                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal3f === false ? true : false : false}
                                                checked={goal3f}
                                                onChange={() => handleChange("goal3f")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>F</b>- Food/Clothing/Other
                                        </div>

                                        {goal3f && <div className='w-full pl-3'>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal3f1 === false ? true : false : false}
                                                    checked={goal3f1}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal3f1");
                                                    }}
                                                />
                                                Food Donation
                                            </div>

                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal3f2 === false ? true : false : false}
                                                    checked={goal3f2}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal3f2");
                                                    }}
                                                />
                                                Furniture Donation
                                            </div>



                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal3f3 === false ? true : false : false}
                                                    checked={goal3f3}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal3f3");
                                                    }}
                                                />
                                                General Donations
                                            </div>



                                        </div>}


                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal4f === false ? true : false : false}
                                                checked={goal4f}
                                                onChange={() => handleChange("goal4f")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>F</b>- Tutoring
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 2 */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-primary" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>5- Permanency</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>6- Educational Vocational</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>7- Legal Assistance</b>
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <b>8- Family Supports</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* A */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal5a === false ? true : false : false}
                                                checked={goal5a}
                                                onChange={() => handleChange("goal5a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- DCF Dependency Legal Services {selected}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6a === false ? true : false : false}
                                                checked={goal6a}
                                                onChange={() => handleChange("goal6a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- General Education
                                        </div>
                                        {goal6a && <div className='w-full pl-3'>
                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal6a1 === false ? true : false : false}
                                                        checked={goal6a1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal6a1");
                                                        }}
                                                    />
                                                    Hurricane Season
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal6a2 === false ? true : false : false}
                                                        checked={goal6a2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal6a2");
                                                        }}
                                                    />
                                                    Library Card
                                                </div>
                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal6a3 === false ? true : false : false}
                                                        checked={goal6a3}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal6a3");
                                                        }}
                                                    />
                                                    English Classes
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal6a5 === false ? true : false : false}
                                                        checked={goal6a5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal6a5");
                                                        }}
                                                    />
                                                    Adult School
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal6a4 === false ? true : false : false}
                                                    checked={goal6a4}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal6a4");
                                                    }}
                                                />
                                                Vocational Rehab
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal7a === false ? true : false : false}
                                                checked={goal7a}
                                                onChange={() => handleChange("goal7a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- Eviction
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal8a === false ? true : false : false}
                                                checked={goal8a}
                                                onChange={() => handleChange("goal8a")}
                                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                            />
                                            <b>A</b>- Psychological and Psychiatric Needs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* B */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal5b === false ? true : false : false}
                                                checked={goal5b}
                                                onChange={() => handleChange("goal5b")}
                                            />
                                            <b>B</b>- Independent Living Needs
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6b === false ? true : false : false}
                                                checked={goal6b}
                                                onChange={() => handleChange("goal6b")}
                                            />
                                            <b>B</b>- Academic Difficulties
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal7b === false ? true : false : false}
                                                checked={goal7b}
                                                onChange={() => handleChange("goal7b")}
                                            />
                                            <b>B</b>- Immigration Issues
                                        </div>
                                        {goal7b && <div className='w-full pl-3'>

                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7b1 === false ? true : false : false}
                                                        checked={goal7b1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7b1");
                                                        }}
                                                    />
                                                    Naturalization
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7b2 === false ? true : false : false}
                                                        checked={goal7b2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7b2");
                                                        }}
                                                    />
                                                    Green Card
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal7b3 === false ? true : false : false}
                                                    checked={goal7b3}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal7b3");
                                                    }}
                                                />
                                                Us Passport
                                            </div>
                                        </div>}
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal8b === false ? true : false : false}
                                                checked={goal8b}
                                                onChange={() => handleChange("goal8b")}
                                            />
                                            <b>B</b>- Employment Needs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* C */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal5c === false ? true : false : false}
                                                checked={goal5c}
                                                onChange={() => handleChange("goal5c")}
                                            />
                                            <b>C</b>- Therapeutic Supervise Family Visitation
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6c === false ? true : false : false}
                                                checked={goal6c}
                                                onChange={() => handleChange("goal6c")}
                                            />
                                            <b>C</b>- School Attendance Difficulties
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal7c === false ? true : false : false}
                                                checked={goal7c}
                                                onChange={() => handleChange("goal7c")}
                                            />
                                            <b>C</b>- Custody
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal8c === false ? true : false : false}
                                                checked={goal8c}
                                                onChange={() => handleChange("goal8c")}
                                            />
                                            <b>C</b>- Vocational Needs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* D */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal5d === false ? true : false : false}
                                                checked={goal5d}
                                                onChange={() => handleChange("goal5d")}
                                            />
                                            <b>D</b>- Supervised Family Visitation and Contact
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6d === false ? true : false : false}
                                                checked={goal6d}
                                                onChange={() => handleChange("goal6d")}
                                            />
                                            <b>D</b>- Peer Difficulties
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal7d === false ? true : false : false}
                                                checked={goal7d}
                                                onChange={() => handleChange("goal7d")}
                                            />
                                            <b>D</b>- Department of Juvenile Justice
                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal8d === false ? true : false : false}
                                                checked={goal8d}
                                                onChange={() => handleChange("goal8d")}
                                            />
                                            <b>D</b>- Literacy Needs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* E */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal5e === false ? true : false : false}
                                                checked={goal5e}
                                                onChange={() => handleChange("goal5e")}
                                            />
                                            <b>E</b>- Other
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6e === false ? true : false : false}
                                                checked={goal6e}
                                                onChange={() => handleChange("goal6e")}
                                            />
                                            <b>E</b>- Vocational Training
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal7e === false ? true : false : false}
                                                checked={goal7e}
                                                onChange={() => handleChange("goal7e")}
                                            />
                                            <b>E</b>- Other
                                        </div>
                                        {goal7e && <div className='w-full pl-3'>

                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e1 === false ? true : false : false}
                                                        checked={goal7e1}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e1");
                                                        }}
                                                    />
                                                    Work Permit
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e2 === false ? true : false : false}
                                                        checked={goal7e2}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e2");
                                                        }}
                                                    />
                                                    Cuban Passport
                                                </div>
                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e3 === false ? true : false : false}
                                                        checked={goal7e3}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e3");
                                                        }}
                                                    />
                                                    Florida ID
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e4 === false ? true : false : false}
                                                        checked={goal7e4}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e4");
                                                        }}
                                                    />
                                                    FL Driver License
                                                </div>
                                            </div>

                                            <div className="flex w-full">
                                                <div className="flex mr-2">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e5 === false ? true : false : false}
                                                        checked={goal7e5}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e5");
                                                        }}
                                                    />
                                                    Jury Duties
                                                </div>
                                                <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 15 ? goal7e6 === false ? true : false : false}
                                                        checked={goal7e6}
                                                        // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                        onChange={() => {
                                                            handleChange("goal7e6");
                                                        }}
                                                    />
                                                    Change Address
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={selected > 15 ? goal7e7 === false ? true : false : false}
                                                    checked={goal7e7}
                                                    // onChange={(e) => changeAssessment("psyFamily5_1", e.target.checked)}
                                                    onChange={() => {
                                                        handleChange("goal7e7");
                                                    }}
                                                />
                                                Other
                                            </div>
                                        </div>}
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal8e === false ? true : false : false}
                                                checked={goal8e}
                                                onChange={() => handleChange("goal8e")}
                                            />
                                            <b>E</b>- Other
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* F */}
                        <div className="flex w-full">
                            <div className="flex w-full border-2 border-t-0 border-primary">
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">

                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={selected > 15 ? goal6f === false ? true : false : false}
                                                checked={goal6f}
                                                onChange={() => handleChange("goal6f")}
                                            />
                                            <b>F</b>- Placement Issues
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 md:border-r-2 lg:border-r-2">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full  pl-3">

                                        </div>
                                    </div>
                                </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                    <div className="w-full place-items-center p-1">
                                        <div className="flex w-full pl-3">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    "select"
                )
                }
            </div>
            <br />
            {/* ----------------------------------------------------------------------------------------------- */}
            {view === "PreView" && <>
                <hr />
                <div className='page'>
                    <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                        INITIAL SERVICE PLAN
                    </div>
                    <div className="m-0 p-0">
                        {HeaderPage}

                        <div className='place-items-center text-center m-5'>
                            <b className='border-b-2 border-primary'>SECTION III: SHORT TERM GOALS-OBJECTIVES</b>

                        </div>
                        <div className="w-full text-justify mb-5" style={{ fontSize: "14px" }}>
                            The following objectives has been developed According with TCM Medicaid Handbook Section 2-15 and 2-17 to comply with Service Plan/Service Plan
                            Review/Addendums documentation polices. SUNISS UP determined that each individualized Long-Term Goal developed on this Service Plan
                            and corresponding Addendums will have implicit each of those Objectives described with corresponding tasks according the nature of
                            each Need and Goal. The Objectives showed wide range of activities which could be developed by TCM with the active participation of the
                            client during follow up process. Objectives described will have the same Start and Target Dates of each Goal from this Service Plan/Addendum.
                        </div>
                        {/* Objective 1 */}
                        <div className="w-full border-2 border-primary ">
                            <div className='w-full flex'>
                                <div className='w-1/5 border-r-2 border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <b style={{ fontSize: "24px" }}>Objective 1</b>
                                    <br />
                                    <b>Task</b> (who will do what)
                                </div>
                                <div className='w-4/5 pl-5'>
                                    <b>Advocating for the acquisition of services and resources necessary to implement the service plan by
                                        representing or defending recipients through direct intervention. (TCM Handbook S-2-17)
                                    </b>
                                </div>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                <b style={{ fontSize: "20px" }}>
                                    TCM will link the client with any services/programs advocated previously by TCM by target date.
                                </b>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                -TCM will update and gather information about specific service/program opened at community and the interventions will be
                                developed by phone calls, program personal visits and/or using online resources and tools.<br />
                                -Client/Legal Guardian will be educated regarding documentation and follow up during services last.<br />
                                -TCM will be able to advocate related services to accomplish the Objective and Goal; ex: DCF/SSA, Police Services, Bank
                                Statements, OTC, pharmacy services, medication management, transportation, lab test, X-Rays, Legal Services, Social Services,
                                and any other service required during follow up.
                            </div>
                        </div>
                        {/* Objective 2 */}
                        <div className="w-full border-2 border-t-0 border-primary">
                            <div className='w-full flex'>
                                <div className='w-1/5 border-r-2 border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <b style={{ fontSize: "24px" }}>Objective 2</b>
                                    <br />
                                    <b>Task</b> (who will do what)
                                </div>
                                <div className='w-4/5 pl-5'>
                                    <b>
                                        Linking and facilitating the recipient with appropriate services and resources identified in the
                                        service plan through referrals to reach desired goals. (TCM Handbook S-2-17)
                                    </b>
                                </div>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                <b style={{ fontSize: "20px" }}>
                                    TCM will link the client with any services/programs advocated previously by TCM by target date.
                                </b>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                - TCM will complete linking process by contacting client/service/programs as required by phone calls, personal visits and
                                using Internet resources.<br />
                                - TCM will be able to link the client with any related services/program advocated previously to accomplish the Objective and
                                Goal; ex: DCF/SSA, Police Services, Bank Statements, OTC, pharmacy services, medication management, transportation, lab
                                test, X-Rays, Legal Services, Social Services, and any other service required during follow up.
                            </div>
                        </div>
                        {/* Objective 3 */}
                        <div className="w-full border-2 border-t-0 border-primary">
                            <div className='w-full flex'>
                                <div className='w-1/5 border-r-2 border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <b style={{ fontSize: "24px" }}>Objective 3</b>
                                    <br />
                                    <b>Task</b> (who will do what)
                                </div>
                                <div className='w-4/5 pl-5'>
                                    <b>
                                        Coordinating the delivery of services as specified in the service plan with the help of the recipient,
                                        the recipient’s family, and the recipient’s natural support system. (TCM Handbook S-2-17)
                                    </b>
                                </div>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                <b style={{ fontSize: "20px" }}>
                                    TCM will coordinate all required services/programs during entire follow up by target date.
                                </b>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                - TCM will be able to coordinate activities on behalf of the client according to the specific nature of each goal through and
                                not limited to coordination of appointments/interviews/applications/recertification/hearings/meetings/follow ups/discharge, etc.,
                                based on contact by phone calls/personal visit and using internet tool developed in conjunction with the client/Legal
                                Gurdian and specific service/program.
                            </div>
                        </div>
                        {/* Objective 4 */}
                        <div className="w-full border-2 border-t-0 border-primary">
                            <div className='w-full flex'>
                                <div className='w-1/5 border-r-2 border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <b style={{ fontSize: "24px" }}>Objective 4</b>
                                    <br />
                                    <b>Task</b> (who will do what)
                                </div>
                                <div className='w-4/5 pl-5'>
                                    <b>
                                        Monitoring service delivery to evaluate the recipient’s progress. (TCM Handbook S-2-17)
                                    </b>
                                </div>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                <b style={{ fontSize: "20px" }}>
                                    TCM will monitor progress, compliance, and ability of the client to be independent to manage each
                                    need by self by target date.
                                </b>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                - TCM will be able to develop monitoring of the progress of the client by contacting Client/Programs as required by phone calls,
                                personal visit or using web portals if necessary.<br />
                                - TCM will complete interviews, staffing, meetings, etc., with Client/Legal Guardian/Programs to assess effectiveness of the
                                services received by client and to evaluate compliance of client with the follow up and ability to be functional and
                                independent using community resources.<br />
                                - TCM will count pills with Client/Legal Guardian during home visits if necessary to monitor compliance with medication
                                management
                            </div>
                        </div>
                        {/* Objective 5 */}
                        <div className="w-full border-2 border-t-0 border-primary">
                            <div className='w-full flex'>
                                <div className='w-1/5 border-r-2 border-primary pl-5' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <b style={{ fontSize: "24px" }}>Objective 5</b>
                                    <br />
                                    <b>Task</b> (who will do what)
                                </div>
                                <div className='w-4/5 pl-5'>
                                    <b>
                                        Documenting mental health targeted case management activities in accordance with the
                                        documentation requirements in this chapter. (TCM Handbook S-2-17)
                                    </b>
                                </div>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                <b style={{ fontSize: "20px" }}>
                                    TCM will complete and save on client’s record all required documentation during follow up by
                                    target date.
                                </b>
                            </div>
                            <div className='w-full border-t-2 border-primary p-2'>
                                - TCM will generate required documentation to comply with follow up and Medicaid Rules by target date.<br />
                                - TCM will be able to develop Assessment/Service Plans/Addendums and Daily Progress Notes to detail the nature of
                                services provided. On Daily Progress Notes TCM will focus on genuine intervention on behalf of the client and related with the
                                goals described on this Service Plan.
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </>}

            <br />

            {/* </BlockUI> */}
            <ScrollTop target="parent" />
        </div >
    );

}
type Props = {
    relad(): void;
    scm?: ServiceCM;
    view: string;
}
export { ViewSp };