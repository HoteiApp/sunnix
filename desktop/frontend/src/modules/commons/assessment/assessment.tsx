import { useState, useRef, useEffect } from "react";

import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { ScrollTop } from "primereact/scrolltop";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { Checkbox } from "antd";
import { convertHtmlPDF } from "./convertHtmlPDF.js"
import { SignatureCanvasRef } from "react-signature-canvas";
import { useCoreRequestEditSCMAssessment } from "../../profile/hooks";
import { CalculateAge, HeaderDoc } from "../../commons";
import { SignatureDialog } from '../SignatureDialog';
// New Struct
import {
  Active,
  ServiceCM,
  FormValueAssessment,
  DiagnosticTable,
} from "../../../models";
import { Block } from "../component/block";
import { classNames } from "primereact/utils";

type Props = {
  active?: Active;
  relad(): void;
  mr?: number;
  scm?: ServiceCM;
  onContentChange?: (content: string) => void;
};

const Assessment = ({ active, mr, scm, relad, onContentChange }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
  // Función para obtener el contenido del div
  const getContent = () => {
    if (contentRef.current && onContentChange) {
      const content = contentRef.current.innerHTML; // O usa textContent para solo texto
      onContentChange(content); // Puedes hacer algo con el contenido aquí
    }
  };
  useEffect(() => {
    getContent(); // Llamar a la función para obtener el contenido
  }, []);

  const { requestEditAssessment } = useCoreRequestEditSCMAssessment(relad);
  const [signTCM, setSignTCM] = useState<boolean>(false);
  const [signTCMs, setSignTCMs] = useState<boolean>(false);
  const signatureTCM = useRef<SignatureCanvasRef>(null);
  const signatureTCMs = useRef<SignatureCanvasRef>(null);
  const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);

  const HeaderPage = (
    <div>
      {/* row 1 */}
      <div className="flex w-full">
        <div className="flex w-full border border-black">
          <div className="flex w-2/4 border-r border-black place-items-center">
            <div className="flex w-full pl-5 pr-5">
              <b className="mr-5">Client's Name:</b>{" "}
              {scm?.Demografic.first_name} {scm?.Demografic.last_name}
            </div>
          </div>
          <div className="border-r border-black">
            <div className="flex w-full place-items-center">
              <div className="flex w-full pl-5">
                <b className="mr-5">MR #:</b> {mr}{" "}
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div className="flex place-items-center">
            <div className="flex w-full pl-5">
              <b className="mr-5">Date of Admission:</b> {scm?.doa}
            </div>
          </div>
        </div>
      </div>
      {/* row 2 */}
      <div className="flex w-full">
        <div className="flex w-full border-black">
          <div className="flex w-2/4 border-b border-r border-l border-black place-items-center">
            <div className="flex w-full pl-5">
              <b className="mr-5">TCM:</b> {scm?.tcm.full_name}
            </div>
          </div>
          <div className="w-2/4 border-b border-r border-black">
            <div className="flex w-full place-items-center">
              <div className="flex w-full pl-5">
                <b className="mr-5">Initial Assessment Development Date:</b>
                {scm?.Demografic.date}
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
    sourceInforemationBFFisYes:
      scm?.assessment.sourceInforemationBFFisYes ?? "",
    sourceInforemationCpa: scm?.assessment.sourceInforemationCpa ?? "",
    sourceInforemationSdp: scm?.assessment.sourceInforemationSdp ?? "",
    sourceInforemationPp: scm?.assessment.sourceInforemationPp ?? "",
    sourceInforemationPpisYes: scm?.assessment.sourceInforemationPpisYes ?? "",
    sourceInforemationFf: scm?.assessment.sourceInforemationFf ?? "",
    sourceInforemationLdrsi1:
      scm?.assessment?.sourceInforemationLdrsi1 ?? false,
    sourceInforemationLdrsi2:
      scm?.assessment?.sourceInforemationLdrsi2 ?? false,
    sourceInforemationLdrsi3:
      scm?.assessment?.sourceInforemationLdrsi3 ?? false,
    sourceInforemationLdrsi4:
      scm?.assessment?.sourceInforemationLdrsi4 ?? false,
    sourceInforemationLdrsi5:
      scm?.assessment?.sourceInforemationLdrsi5 ?? false,
    sourceInforemationLdrsi6:
      scm?.assessment?.sourceInforemationLdrsi6 ?? false,
    sourceInforemationLdrsi7:
      scm?.assessment?.sourceInforemationLdrsi7 ?? false,
    sourceInforemationLdrsi8:
      scm?.assessment?.sourceInforemationLdrsi8 ?? false,
    sourceInforemationLdrsiOther:
      scm?.assessment.sourceInforemationLdrsiOther ?? "",
    // -------------------
    presentProblems: scm?.assessment.presentProblems ?? "",
    clientLegalRepresentative: scm?.assessment.clientLegalRepresentative ?? "",
    // -------------------
    listRecipientStrengths:
      scm?.assessment.listRecipientStrengths === ""
        ? "1- "
        : scm?.assessment.listRecipientStrengths ?? "1- ",
    listRecipientStrengths1:
      scm?.assessment.listRecipientStrengths1 === ""
        ? "2- "
        : scm?.assessment.listRecipientStrengths1 ?? "2- ",
    listRecipientStrengths2:
      scm?.assessment.listRecipientStrengths2 === ""
        ? "3- "
        : scm?.assessment.listRecipientStrengths2 ?? "3- ",
    listRecipientStrengths3:
      scm?.assessment.listRecipientStrengths3 === ""
        ? "4- "
        : scm?.assessment.listRecipientStrengths3 ?? "4- ",
    listRecipientStrengths4:
      scm?.assessment.listRecipientStrengths4 === ""
        ? "5- "
        : scm?.assessment.listRecipientStrengths4 ?? "5- ",
    listRecipientweakness:
      scm?.assessment.listRecipientweakness === ""
        ? "1- "
        : scm?.assessment.listRecipientweakness ?? "1- ",
    listRecipientweakness1:
      scm?.assessment.listRecipientweakness1 === ""
        ? "2- "
        : scm?.assessment.listRecipientweakness1 ?? "2- ",
    listRecipientweakness2:
      scm?.assessment.listRecipientweakness2 === ""
        ? "3- "
        : scm?.assessment.listRecipientweakness2 ?? "3- ",
    listRecipientweakness3:
      scm?.assessment.listRecipientweakness3 === ""
        ? "4- "
        : scm?.assessment.listRecipientweakness3 ?? "4- ",
    listRecipientweakness4:
      scm?.assessment.listRecipientweakness4 === ""
        ? "5- "
        : scm?.assessment.listRecipientweakness4 ?? "5- ",
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

    psyMedicalHistoryCountry_1:
      scm?.assessment.psyMedicalHistoryCountry_1 ?? "",
    psyMedicalHistoryCountry_1ifYes:
      scm?.assessment.psyMedicalHistoryCountry_1ifYes ?? "",
    psyMedicalHistoryUsa_1: scm?.assessment.psyMedicalHistoryUsa_1 ?? "",

    psyMedicalHistoryUsa_1ifYes:
      scm?.assessment.psyMedicalHistoryUsa_1ifYes ?? "",
    psyMedicalHistoryCountry_2:
      scm?.assessment.psyMedicalHistoryCountry_2 ?? "",
    psyMedicalHistoryUsa_2: scm?.assessment.psyMedicalHistoryUsa_2 ?? "",
    psyMedicalHistoryCountry_3:
      scm?.assessment.psyMedicalHistoryCountry_3 ?? "",
    psyMedicalHistoryUsa_3: scm?.assessment.psyMedicalHistoryUsa_3 ?? "",
    psyMedicalHistoryCountry_4:
      scm?.assessment.psyMedicalHistoryCountry_4 ?? "",
    psyMedicalHistoryUsa_4: scm?.assessment.psyMedicalHistoryUsa_4 ?? "",
    psyMedicalHistoryCountry_5:
      scm?.assessment.psyMedicalHistoryCountry_5 ?? "",
    psyMedicalHistoryCountry_5ifYes:
      scm?.assessment.psyMedicalHistoryCountry_5ifYes ?? "",
    psyMedicalHistoryUsa_5: scm?.assessment.psyMedicalHistoryUsa_5 ?? "",
    psyMedicalHistoryUsa_5ifYes:
      scm?.assessment.psyMedicalHistoryUsa_5ifYes ?? "",
    psyMedicalHistoryCountry_6:
      scm?.assessment.psyMedicalHistoryCountry_6 ?? "",
    psyMedicalHistoryCountry_6ifYes:
      scm?.assessment.psyMedicalHistoryCountry_6ifYes ?? "",
    psyMedicalHistoryUsa_6: scm?.assessment.psyMedicalHistoryUsa_6 ?? "",
    psyMedicalHistoryUsa_6ifYes:
      scm?.assessment.psyMedicalHistoryUsa_6ifYes ?? "",

    psyMedicalHistoryCountry_7:
      scm?.assessment.psyMedicalHistoryCountry_7 ?? "",
    psyMedicalHistoryUsa_7: scm?.assessment.psyMedicalHistoryUsa_7 ?? "",
    psyMedicalHistoryCountry_8:
      scm?.assessment.psyMedicalHistoryCountry_8 ?? "",
    psyMedicalHistoryUsa_8: scm?.assessment.psyMedicalHistoryUsa_8 ?? "",
    psyMedicalHistoryCountry_9:
      scm?.assessment.psyMedicalHistoryCountry_9 ?? "",
    psyMedicalHistoryUsa_9: scm?.assessment.psyMedicalHistoryUsa_9 ?? "",
    psyMedicalHistoryCountry_10:
      scm?.assessment.psyMedicalHistoryCountry_10 ?? "",
    psyMedicalHistoryCountry_10ifYes:
      scm?.assessment.psyMedicalHistoryCountry_10ifYes ?? "",
    psyMedicalHistoryUsa_10: scm?.assessment.psyMedicalHistoryUsa_10 ?? "",
    psyMedicalHistoryUsa_10ifYes:
      scm?.assessment.psyMedicalHistoryUsa_10ifYes ?? "",
    // family
    psyMedicalHistoryFamily_Mother_Mental:
      scm?.assessment.psyMedicalHistoryFamily_Mother_Mental ?? "",
    psyMedicalHistoryFamily_Mother_Medical:
      scm?.assessment.psyMedicalHistoryFamily_Mother_Medical ?? "",
    psyMedicalHistoryFamily_Father_Mental:
      scm?.assessment.psyMedicalHistoryFamily_Father_Mental ?? "",
    psyMedicalHistoryFamily_Father_Medical:
      scm?.assessment.psyMedicalHistoryFamily_Father_Medical ?? "",
    psyMedicalHistoryFamily_Siblings_Mental:
      scm?.assessment.psyMedicalHistoryFamily_Siblings_Mental ?? "",
    psyMedicalHistoryFamily_Siblings_Medical:
      scm?.assessment.psyMedicalHistoryFamily_Siblings_Medical ?? "",
    psyMedicalHistoryFamily_Other_Mental:
      scm?.assessment.psyMedicalHistoryFamily_Other_Mental ?? "",
    psyMedicalHistoryFamily_Other_Medical:
      scm?.assessment.psyMedicalHistoryFamily_Other_Medical ?? "",
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
    education_List_Grades1:
      scm?.assessment.education_List_Grades1 === ""
        ? "- "
        : scm?.assessment.education_List_Grades1 ?? "",
    education_List_Grades2:
      scm?.assessment.education_List_Grades2 === ""
        ? "- "
        : scm?.assessment.education_List_Grades2 ?? "",
    education_List_Grades3:
      scm?.assessment.education_List_Grades3 === ""
        ? "- "
        : scm?.assessment.education_List_Grades3 ?? "",
    // WORK
    work_Current: scm?.assessment.work_Current ?? "",
    work_Position: scm?.assessment.work_Position ?? "",
    work_Time: scm?.assessment.work_Time ?? "",
    work_History1:
      scm?.assessment.work_History1 === ""
        ? "- "
        : scm?.assessment.work_History1 ?? "",
    work_History2:
      scm?.assessment.work_History2 === ""
        ? "- "
        : scm?.assessment.work_History2 ?? "",
    work_History3:
      scm?.assessment.work_History3 === ""
        ? "- "
        : scm?.assessment.work_History3 ?? "",
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
    describeClientInvolvementifYes:
      scm?.assessment.describeClientInvolvementifYes ?? "",
    describeClientAssociates: scm?.assessment.describeClientAssociates ?? "",
    describeClientrelationship:
      scm?.assessment.describeClientrelationship ?? "",
    describeClientrelationshipMany:
      scm?.assessment.describeClientrelationshipMany ?? "",
    describeClientDescribe: scm?.assessment.describeClientDescribe ?? "",

    // Discussion
    // TODO Esta eliminado de la vista
    discussion: scm?.assessment.discussion ?? "",
    // Describe the services
    describeServicePsychiatrist:
      scm?.assessment.describeServicePsychiatrist ?? "",
    describeServicePCP: scm?.assessment.describeServicePCP ?? "",
    describeServicePSR: scm?.assessment.describeServicePSR ?? "",
    describeServiceOther: scm?.assessment.describeServiceOther ?? "",
    // RECIPIENT
    recipent1: scm?.assessment.recipent1 ?? "",
    recipent2: scm?.assessment.recipent2 ?? "",
    recipent3: scm?.assessment.recipent3 ?? "",
    recipent4: scm?.assessment.recipent4 ?? "",
    recipent5: scm?.assessment.recipent5 ?? "",
    recipent6: scm?.assessment.recipent6 ?? "",
    recipent7: scm?.assessment.recipent7 ?? "",
    recipent8: scm?.assessment.recipent8 ?? "",
    // Signature option
    signatureOpt: scm?.assessment.signatureOpt ?? "",
    // --
    tcm: scm?.tcm_id ?? 0,
    nameTCM: scm?.assessment.nameTCM === "" ? scm?.tcm.full_name : scm?.assessment.nameTCM ?? "",
    categoryTCM: scm?.assessment.categoryTCM === "" ? scm?.tcm.categoryTCM : scm?.assessment.categoryTCM ?? "CBHCM",
    signatureTcm: scm?.assessment.signatureTcm ?? "data:image/png;base64,",
    signatureTcmDate: scm?.assessment.signatureTcmDate ?? "",

    supervisor: (active?.activeUser?.User?.ID === scm?.tcm_id
      ? active?.activeUser?.User?.supervisor
      : active?.activeUser?.User?.ID) as number || (active?.activeUser?.User?.roll === "TCMS" ? active?.activeUser?.User?.ID : 0) as number,

    nameSupervisor: (active?.activeUser?.User?.ID === scm?.assessment.supervisor
      ? active?.activeUser?.Record?.fullname
      : scm?.assessment.nameSupervisor) as string || scm?.assessment.nameSupervisor || "",

    categorySupervisor: (active?.activeUser?.User?.ID === scm?.assessment.supervisor
      ? active?.activeUser?.User?.credentials
      : scm?.assessment.categorySupervisor) as string || scm?.assessment.categorySupervisor || "CBHCMS",

    signatureSupervisor: scm?.assessment.signatureSupervisor ?? "data:image/png;base64,",
    signatureSupervisorDate: scm?.assessment.signatureSupervisorDate ?? "",

    qa: scm?.assessment.qa ?? 0,
    signatureQa: scm?.assessment.signatureQa ?? "data:image/png;base64,",
    signatureQaDate: scm?.assessment.signatureQaDate ?? "",
  });

  const changeAssessment = <T extends string[] | string | boolean>(
    name: keyof FormValueAssessment,
    value: T
  ) => {
    setAssessment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setVisibleBtnSave(true);
    setSaveAssessment(true);
    return assessment;
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
  const optionsServicesBeing: string[] = [
    "AA/NA",
    "SSA",
    "CHARLEE",
    "Children’s Home Society",
    "DCF",
    "Section 8",
    "CHURCH",
    "Foster Care",
    "Juvenile Justice",
    "Other",
  ];
  const optionsLivingArrangement: string[] = [
    "House",
    "Apartment",
    "Townhouse",
    "Trailer",
    "Other",
  ];
  const optionsMaterialStatus: string[] = [
    "Single",
    "Married",
    "Separete",
    "Divorced",
    "Widowed",
  ];
  const optionsClientAssosoates: string[] = [
    "Chronological Age",
    "Younger",
    "Older",
  ];
  const optionsYesNoHospitalization: string[] = [
    "1 T",
    "2T",
    "3 T",
    "4 T",
    "No",
  ];
  const optionsEducationSpecialEd: string[] = ["Yes", "No", "Sed", "Eh", "L"];
  const optionsClientConsidered: string[] = ["a leader", "a follower"];
  const optionsYesNoNa: string[] = ["Yes", "No", "N/A"];
  const optionsYesNo: string[] = ["Yes", "No"];

  // const footerSign = (
  //   <div className="m-0 pt-5 w-full">
  //     <div className="flex overflow-y-auto">
  //       {/* {visibleBtnSave && <Button label="SAVE" icon="pi pi-save" className="mr-2 p-button-warning" onClick={() => handleButtonClick()} />} */}
  //       {/* {requestCertification.signTcm !== "" && */}
  //       <Button
  //         label="SAVE"
  //         icon="pi pi-save"
  //         className="mr-2 p-button-warning"
  //         onClick={() => {
  //           setSignTCM(false);
  //           requestEditAssessment({ requestAssessment: assessment });
  //         }}
  //       />
  //       {/* } */}
  //     </div>
  //   </div>
  // );
  const footerSign = (val: string) => (
    <div className="m-0 pt-5 w-full">
      <div className="flex overflow-y-auto">
        <Button
          label="SAVE"
          icon="pi pi-save"
          // Habilitar el botón si la firma correspondiente está vacía
          disabled={
            (val === "tcm" && assessment.signatureTcm === "") ||
            (val === "tcms" && assessment.signatureSupervisor === "")
          }
          className="mr-2 p-button-warning"
          onClick={() => {
            requestEditAssessment({ requestAssessment: assessment });
            if (val === "tcm") {
              setSignTCM(false);
            }
            if (val === "tcms") {
              setSignTCMs(false);
            }
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full p-0" style={{ height: "80vh", overflow: "auto" }}>
      {/* Boton SAVE flotante */}
      {visibleBtnSave && (
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            zIndex: 99999,
          }}
        >
          <Button
            icon="pi pi-save"
            rounded
            severity="warning"
            tooltip="Keep the information on file until you complete editing the Assesment"
            tooltipOptions={{ position: "top" }}
            onClick={() => handleButtonClick()}
          />
        </div>
      )}
      {/* <BlockUI
        pt={{
          root: { className: "bg-yellow-100 bg-opacity-50" },
        }}
        blocked={
          assessment.signatureTcm !== "" ? assessment.signatureSupervisor !== "" ? false : true : false
        }
      > */}
      {/* <Button label="DownloadPDF1" icon="pi pi-file-pdf" onClick={generarPDF} className="p-button-text" /> */}
      {/* <Button label="Download" icon="pi pi-file-pdf" onClick={convertHtmlPDF} className="p-button-text" /> */}

      <Block active={
        active?.activeUser?.User?.roll === "TCM" ?
          assessment.signatureTcm !== "data:image/png;base64," ?
            true : false : active?.activeUser?.User?.roll === "TCMS" ?
            assessment.signatureSupervisor !== "data:image/png;base64," ?
              true : false : false
      }>
        {/* Test Checkbox */}
        {/* <Block active={false}> */}

        <div id="content-to-pdf" ref={contentRef}>
          <div className="page">
            <HeaderDoc
              PrimaryText="TCM"
              SecondaryText="INITIAL ASSESSMENT"
              CompanyAddress
            />
            <div className="m-0 p-5">
              {HeaderPage}
              {/* row 3 */}
              <div className="mt-5 mb-5 p-0 border-r border-l border-t border-black">
                <div className="flex w-full">
                  <div className="flex w-full border-b border-black">
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-1/4 pl-5">
                        <b>DOB:</b>
                      </div>
                      <div className="grid border-r border-black w-3/4 pl-5">
                        <div className="p-inputgroup flex">
                          {scm?.Demografic.dob}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-1/4 pl-5">
                        <b>Age:</b>
                      </div>
                      <div className="grid border-r border-black w-3/4 pl-5">
                        <div className="p-inputgroup flex">
                          {CalculateAge({ dob: scm?.Demografic.dob ?? "" })}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-full pl-2">
                        <b className="mr-2">Medicaid #:</b>{" "}
                        {scm?.Demografic.medicaid}
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-full pl-5 border-l border-black">
                        <b className="mr-5">Gender:</b> {scm?.Demografic.sexo}
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-full pl-5 border-l border-black">
                        <b className="mr-5">Race:</b> {scm?.Demografic.race}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  <div className="flex w-full border-b border-black">
                    <div className="flex w-3/5 border-black border-b-0 place-items-center">
                      <div className="flex w-full pl-5">
                        <b className="mr-5">Address:</b> {scm?.Demografic.address}
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex border-l border-black w-full pl-5">
                        <b className="mr-5">City/State:</b>{" "}
                        {scm?.Demografic.state}
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex border-l border-black w-full pl-5">
                        <b className="mr-5">Zip Code:</b>{" "}
                        {scm?.Demografic.zip_code}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  <div className="flex w-full border-b border-black">
                    <div className="flex w-1/5 border-black border-b-0 place-items-center">
                      <div className="flex w-full pl-5">
                        <b className="mr-2">Phone #:</b> {scm?.Demografic.phone}
                      </div>
                    </div>
                    <div className="w-2/5 border-black border-b-0">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full pl-5 border-l border-black">
                          <b className="mr-5">Legal Guardian:</b>{" "}
                          {scm?.Demografic.legal_guardian === ""
                            ? "N/A"
                            : scm?.Demografic.legal_guardian}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-full pl-5  border-l border-black">
                        <b className="mr-5">Phone #:</b>{" "}
                        {scm?.Demografic.cell_phone_guardian === ""
                          ? "N/A"
                          : scm?.Demografic.cell_phone_guardian}
                      </div>
                    </div>
                    <div className="flex w-1/5 place-items-center">
                      <div className="flex w-full pl-5  border-l border-black">
                        <b className="mr-5">Relationship:</b>{" "}
                        {scm?.Demografic.relationship === ""
                          ? "N/A"
                          : scm?.Demografic.relationship}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MENTAL HEALTH DIAGNOSIS */}
              <div className="place-items-center text-center m-5">
                <b className="border-b border-black">
                  MENTAL HEALTH DIAGNOSIS
                </b>
              </div>

              <div className="flex w-full">
                <div className="flex w-full border border-black">
                  <div className="flex w-full border-black border-b-0 place-items-center">

                    <div className="flex w-1/6">
                      <div className="pl-5">
                        <b className="mr-2">Primary:</b>
                      </div>
                      <div className="pl-7">
                        {scm?.Mental.mental_primary}
                      </div>
                    </div>

                    <div className="flex w-3/6">
                      <div className="pl-2">
                        <b className="ml-6 mr-2 text-right">Description:</b>
                      </div>
                      <div className="pl-2 mr-3">
                        {DiagnosticTable[scm?.Mental.mental_primary ?? "NaN"]}
                      </div>
                    </div>

                    <div className="flex w-2/6">
                      <div className="pl-2">
                        <b className="text-right">Date:</b>
                      </div>
                      <div className="pl-2">
                        {scm?.Mental.mental_primary_date}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-b border-r border-l border-black">

                  <div className="flex w-full border-black place-items-center">

                    <div className=" flex w-1/6">
                      <div className="pl-5">
                        <b className="mr-2">Secondary:</b>
                      </div>
                      <div className="pl-2">
                        {scm?.Mental.mental_secondary}
                      </div>
                    </div>

                    <div className="flex w-3/6">
                      <div className="pl-8">
                        <b className="mr-5 text-right">Description:</b>
                      </div>
                      <div className="pl-5">
                        {DiagnosticTable[scm?.Mental.mental_secondary ?? "NaN"]}
                      </div>
                    </div>

                    <div className="flex w-2/6">

                      <div className="pl-2">
                        <b className="text-right">Date:</b>
                      </div>
                      <div className="pl-2">
                        {scm?.Mental.mental_secondary_date}
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/*  SOURCES OF INFORMATION */}
              <div className="place-items-center text-center m-5">
                <b className="border-b-2 border-black">
                  SOURCES OF INFORMATION
                </b>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-l border-t border-b border-black">
                  <div className="w-1/5  border-black border-b-0 border-r">
                    <div className="w-full place-items-center p-1">
                      <div className="grid flex-grow w-1/4 pl-3">
                        <b>Client:</b>
                      </div>
                      <div className="grid w-full pl-3">
                        <SelectButton
                          value={assessment.sourceInforemationClient}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("sourceInforemationClient", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 border-black border-r border-b-0">
                    <div className="w-full place-items-center p-1">
                      <div className="grid flex-grow w-1/4 pl-3">
                        <b>DCF:</b>
                      </div>
                      <div className="grid w-full pl-3">
                        <SelectButton
                          value={assessment.sourceInforemationDfc}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("sourceInforemationDfc", e.value)
                          }
                          options={optionsYesNoNa}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-3/5 border-r border-black place-items-center">
                    <div className="w-full pl-3">
                      <b className="mr-10">
                        Biological Family & Friends (with appropriate consent):
                      </b>
                      <div className="flex w-full">
                        <div className="place-items-center w-1/4">
                          <SelectButton
                            value={assessment.sourceInforemationBFF}
                            onChange={(e: SelectButtonChangeEvent) =>
                              changeAssessment("sourceInforemationBFF", e.value)
                            }
                            options={optionsYesNoNa}
                          />
                        </div>
                        {assessment.sourceInforemationBFF === "Yes" && (
                          <div className="flex place-items-center w-4/5 p-1 pl-2">
                            <b className="mr-2">If yes:</b>
                            <InputText
                              name="b"
                              value={assessment.sourceInforemationBFFisYes}
                              onChange={(e) =>
                                changeAssessment(
                                  "sourceInforemationBFFisYes",
                                  e.target.value
                                )
                              }
                              // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}

                              style={{
                                backgroundColor: "#e5ecfc",
                                border: 0,
                                width: "85%",
                              }}
                              onFocus={(e) => e.currentTarget.select()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-l border-b border-t-0 border-black">
                  <div className="w-1/5 border-black border-b-0 border-r place-items-center">
                    <div className="grid flex-grow w-full pl-4">
                      <b>Current Provider/Agency:</b>
                    </div>
                    <div className="grid w-full pl-4 p-1">
                      <SelectButton
                        value={assessment.sourceInforemationCpa}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("sourceInforemationCpa", e.value)
                        }
                        options={optionsYesNoNa}
                      />
                    </div>
                  </div>
                  <div className="w-1/5  border-black border-b-0 border-r place-items-center">
                    <div className="flex w-full pl-4 ">
                      <b>School District/Personnel:</b>
                    </div>
                    <div className="grid w-full pl-4 p-1">
                      <SelectButton
                        value={assessment.sourceInforemationSdp}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("sourceInforemationSdp", e.value)
                        }
                        options={optionsYesNoNa}
                      />
                    </div>
                  </div>

                  <div className="w-3/5 border-r border-black place-items-center">
                    <div className="w-full pl-3">
                      <b className="mr-10">
                        Previous Providers (inpatient and/or outpatient):
                      </b>
                      <div className="flex w-full">
                        <div className="place-items-center w-1/4">
                          <SelectButton
                            value={assessment.sourceInforemationPp}
                            onChange={(e: SelectButtonChangeEvent) =>
                              changeAssessment("sourceInforemationPp", e.value)
                            }
                            options={optionsYesNoNa}
                          />
                        </div>
                        {assessment.sourceInforemationPp === "Yes" && (
                          <div className="flex place-items-center w-4/5 pl-2 p-1">
                            <b className="mr-2">If yes:</b>
                            <InputText
                              name="b"
                              value={assessment.sourceInforemationPpisYes}
                              onChange={(e) =>
                                changeAssessment(
                                  "sourceInforemationPpisYes",
                                  e.target.value
                                )
                              }
                              style={{
                                backgroundColor: "#e5ecfc",
                                border: 0,
                                width: "85%",
                              }}
                              onFocus={(e) => e.currentTarget.select()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-t-0 border-black">
                  <div className="w-1/5 border-l border-black border-b place-items-center">
                    <div className="w-full pl-4">
                      <b>Foster Family:</b>
                    </div>
                    <div className="w-full pl-4 p-1">
                      <SelectButton
                        value={assessment.sourceInforemationFf}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("sourceInforemationFf", e.value)
                        }
                        options={optionsYesNoNa}
                      />
                    </div>
                  </div>
                  <div className="w-4/5 border-black border-l border-r border-b place-items-center">
                    <div className="grid flex-grow w-full pl-5">
                      <b>
                        List documents/reports used to satisfy informant source:
                      </b>
                    </div>
                    <div className="grid w-full p-1 pl-0">
                      <div className="p-1">
                        <div className="w-full p-1 pl-0">
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi1}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi1",
                                e.target.checked
                              )
                            }
                          />
                          Biopychosocial Evaluation
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi2}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi2",
                                e.target.checked
                              )
                            }
                          />
                          Psychiatric Evaluation
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi3}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi3",
                                e.target.checked
                              )
                            }
                          />
                          PCP Evaluation
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi4}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi4",
                                e.target.checked
                              )
                            }
                          />
                          PCP Progress Note
                          <br />
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi5}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi5",
                                e.target.checked
                              )
                            }
                          />
                          Neurologist Evaluation
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi6}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi6",
                                e.target.checked
                              )
                            }
                          />
                          DCF Benefits Letter
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi7}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi7",
                                e.target.checked
                              )
                            }
                          />
                          SSI Benefits Letter
                          <Checkbox
                            className="pl-2 mr-1"
                            checked={assessment.sourceInforemationLdrsi8}
                            onChange={(e) =>
                              changeAssessment(
                                "sourceInforemationLdrsi8",
                                e.target.checked
                              )
                            }
                          />
                          Other
                        </div>
                        {assessment.sourceInforemationLdrsi8 && (
                          <div className="w-full p-1">
                            <InputTextarea
                              value={assessment.sourceInforemationLdrsiOther}
                              onChange={(e) =>
                                changeAssessment(
                                  "sourceInforemationLdrsiOther",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full"
                              style={{
                                backgroundColor: "#e5ecfc",
                                borderColor: "#fff",
                                border: 0,
                                borderRadius: 0,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presenting problems */}
              <div className="place-items-center text-center m-5">
                <b className="border-b border-black">
                  PRESENTING PROBLEM(S) and history including the Assessment of
                  the recipient’s needs and functioning.
                </b>
              </div>
              <div className="w-full bg-gray-100 border border-black">
                <InputTextarea
                  value={assessment.presentProblems}
                  onChange={(e) =>
                    changeAssessment("presentProblems", e.target.value)
                  }
                  rows={12}
                  placeholder="REMEMBER…. Presenting Problems is to describe PROBLEMS not to describe GOALS. Amount of problems should be the same of Goal’s amount."
                  className="w-full"
                  style={{
                    backgroundColor: "#e5ecfc",
                    borderColor: "#fff",
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>

              <div className="place-items-center text-center m-5">
                <b className="border-b border-black">
                  Client’s, Legal Representative’s and Family’s Assessment of
                  Client’s Situation (with appropriate consent):
                </b>
              </div>
              <div className="w-full bg-gray-100 border border-black">
                <InputTextarea
                  value={assessment.clientLegalRepresentative}
                  onChange={(e) =>
                    changeAssessment("clientLegalRepresentative", e.target.value)
                  }
                  rows={2}
                  className="w-full"
                  style={{
                    backgroundColor: "#e5ecfc",
                    borderColor: "#fff",
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>
              {/* inicio tabla */}
              <div className="flex w-full mt-5">
                <div className="flex w-full">
                  <div className="flex w-3/6 place-items-center">
                    <div className="grid flex-grow w-2/4">
                      <div className="w-full border-t border-l border-r border-black bg-gray-200 pl-5">
                        List recipient's strengths, current and potential:
                      </div>
                      <div className="w-full">

                        <div className="w-full border-l border-r border-t border-black">
                          <InputText
                            type="text"
                            name="listRecipientStrengths"
                            placeholder="-"
                            value={assessment.listRecipientStrengths}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientStrengths",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          />
                        </div>
                        <div className="w-full border-l border-r border-t border-black">
                          <InputText
                            type="text"
                            name="listRecipientStrengths"
                            placeholder="-"
                            value={assessment.listRecipientStrengths1}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientStrengths1",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-t border-l border-r border-black">
                          <InputText
                            type="text"
                            name="listRecipientStrengths"
                            placeholder="-"
                            value={assessment.listRecipientStrengths2}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientStrengths2",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border border-black">
                          <InputText
                            type="text"
                            name="listRecipientStrengths"
                            placeholder="-"
                            value={assessment.listRecipientStrengths3}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientStrengths3",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-l border-r border-b border-black">
                          <InputText
                            type="text"
                            name="listRecipientStrengths"
                            placeholder="-"
                            value={assessment.listRecipientStrengths4}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientStrengths4",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>



                      </div>
                    </div>
                  </div>

                  <div className="flex w-3/6  place-items-center">
                    <div className="grid flex-grow w-1/4">
                      <div className="w-full border-t border-r border-black bg-gray-200 pl-5">
                        List recipient's weakness:
                      </div>
                      <div className="w-full">
                        <div className="w-full border-t border-r border-black">
                          <InputText
                            type="text"
                            name="listRecipientweakness"
                            placeholder="1-"
                            value={assessment.listRecipientweakness}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientweakness",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-t border-r border-b border-black">
                          <InputText
                            type="text"
                            name="listRecipientweakness1"
                            placeholder="-"
                            value={assessment.listRecipientweakness1}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientweakness1",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-b border-r border-black">
                          <InputText
                            type="text"
                            name="listRecipientweakness2"
                            placeholder="-"
                            value={assessment.listRecipientweakness2}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientweakness2",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-b border-r border-black">
                          <InputText
                            type="text"
                            name="listRecipientweakness3"
                            placeholder="-"
                            value={assessment.listRecipientweakness3}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientweakness3",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                        <div className="w-full border-b border-r border-black">
                          <InputText
                            type="text"
                            name="listRecipientweakness4"
                            placeholder="-"
                            value={assessment.listRecipientweakness4}
                            onChange={(e) =>
                              changeAssessment(
                                "listRecipientweakness4",
                                e.target.value
                              )
                            }
                            pt={{
                              root: {
                                className: "input w-full h-7 border-0",
                              },
                            }}
                            style={{ backgroundColor: "#e5ecfc" }}
                          // onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* fin tabla */}


            </div>
          </div>
          <br />
          {/* ----------------------------------------------------------------------------------------------- */}
          <hr />
          <div className="page">
            <div
              className="place-items-center text-center mb-2"
              style={{ fontSize: "24px" }}
            >
              TCM INITIAL ASSESSMENT
            </div>
            <div className="m-0 p-0">
              {HeaderPage}

              <div className="place-items-center text-center m-5">
                <b className="border-b border-black">
                  List resources that are available to recipient through his/her
                  natural support system:
                </b>
                <br />
                (Support comes from family, friends, pets, neighbors, clergy and
                others.)
              </div>
              <div className="w-full bg-gray-100 border border-black">
                <InputTextarea
                  value={assessment.listResources}
                  onChange={(e) =>
                    changeAssessment("listResources", e.target.value)
                  }
                  rows={3}
                  placeholder="REMEMBER…. Describe here why you state that client has LACK of Natural Support"
                  className="w-full"
                  style={{
                    backgroundColor: "#e5ecfc",
                    borderColor: "#fff",
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>
              <div className="place-items-center text-center m-5">
                <b className="border-b border-black">
                  PSYCHOSOCIAL/FAMILY HISTORY:
                </b>
              </div>
              <div className="w-full border border-black p-5">
                <b>1 -Living arrangement:</b>
                <br />
                <div className="pl-10">
                  <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100">
                    <b>A)</b>
                    <SelectButton
                      value={assessment.psyFamily1A}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("psyFamily1A", e.value)
                      }
                      options={optionsLivingArrangement}
                    />
                    <b className="pl-5">Room/Bathroom distribution:</b>
                    <select
                      value={assessment.psyFamily1Aroom ?? "1"}
                      onChange={(e) =>
                        changeAssessment("psyFamily1Aroom", e.target.value)
                      }
                      // onChange={(e) => handleChangeFormrequestEditClient("sexo", e.targe text-center"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                    /
                    <select
                      value={assessment.psyFamily1Abath ?? "1"}
                      onChange={(e) =>
                        changeAssessment("psyFamily1Abath", e.target.value)
                      }
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                  <div className="flex  border-t-2 border-white hover:bg-gray-100">
                    <b>B) </b> How many persons live with client/relationship:
                    <select
                      value={assessment.psyFamily1B ?? "1"}
                      onChange={(e) =>
                        changeAssessment("psyFamily1B", e.target.value)
                      }
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                  <div className="flex  border-t-2 border-white hover:bg-gray-100 place-items-center">
                    <div className="w-1/6">
                      <b>C)</b> Shares room
                    </div>
                    <div className="w-1/6">
                      {/* <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => changeAssessment("",e.value)} checked={radio1 === 'opt1'} /> Yes
                                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => changeAssessment("",e.value)} checked={radio1 === 'opt2'} /> No */}
                      <SelectButton
                        value={assessment.psyFamily1C}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("psyFamily1C", e.value)
                        }
                        options={optionsYesNo}
                      />
                    </div>

                    <b className="pl-5">How many person shares room:</b>
                    <select
                      value={assessment.psyFamily1Cmpsr ?? "1"}
                      onChange={(e) =>
                        changeAssessment("psyFamily1Cmpsr", e.target.value)
                      }
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  <div className="flex  border-t-2 border-white hover:bg-gray-100 place-items-center">
                    <div className="w-1/6">
                      <b>D)</b> Shares bed
                    </div>
                    <div className="w-1/6">
                      <SelectButton
                        value={assessment.psyFamily1D}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("psyFamily1D", e.value)
                        }
                        options={optionsYesNo}
                      />
                      {/* <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => changeAssessment("",e.value)} checked={radio1 === 'opt1'} /> Yes
                                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => changeAssessment("",e.value)} checked={radio1 === 'opt2'} /> No */}
                    </div>

                    <b className="pl-5">How many person shares bed:</b>
                    <select
                      value={assessment.psyFamily1Dmpsb ?? "1"}
                      onChange={(e) =>
                        changeAssessment("psyFamily1Dmpsb", e.target.value)
                      }
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100">
                    <div className="w-1/6">
                      <b>E)</b> Transportation
                    </div>
                    <div className="w-1/6">
                      <SelectButton
                        value={assessment.psyFamily1E}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("psyFamily1E", e.value)
                        }
                        options={optionsYesNo}
                        pt={{
                          root: { className: "h-8" },
                        }}
                      />
                    </div>
                    <div className="w-4/6 flex">
                      {assessment.psyFamily1E === "Yes" && (
                        <>
                          <b className="pl-5 w-48">If yes, type:</b>
                          <InputText
                            type="text"
                            name="b"
                            value={assessment.psyFamily1EifYes}
                            onChange={(e) =>
                              changeAssessment("psyFamily1EifYes", e.target.value)
                            }
                            className="w-full"
                            style={{ backgroundColor: "#e5ecfc" }}
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <b>2- Income:</b>
                <br />
                <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100 pl-10">
                  <div className="w-2/6">
                    <b>A)</b> Main sources of income for client and/or family/how
                    much?
                  </div>

                  <div className="w-4/6 pl-5">
                    <InputText
                      type="text"
                      name="b"
                      value={assessment.psyFamily2A}
                      onChange={(e) =>
                        changeAssessment("psyFamily2A", e.target.value)
                      }
                      className="text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100 pl-10">
                  <div className="w-2/6">
                    <b>B)</b> Are the client and/or family currently having
                    financial difficulties?
                  </div>

                  <div className="w-3/6 pl-5">
                    <SelectButton
                      value={assessment.psyFamily2B}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("psyFamily2B", e.value)
                      }
                      options={optionsYesNo}
                      pt={{
                        root: { className: "h-8" },
                      }}
                    />
                  </div>
                </div>
                <br />
                {/* 3 */}
                <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100">
                  <div className="w-1/6">
                    <b>3- Employed:</b>
                  </div>
                  <div className="w-1/6 pl-10">
                    <SelectButton
                      value={assessment.psyFamily3}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("psyFamily3", e.value)
                      }
                      options={optionsYesNoNa}
                      pt={{
                        root: { className: "h-8" },
                      }}
                    />
                  </div>
                  {assessment.psyFamily3 === "Yes" && (
                    <>
                      <div className="w-4/6 flex place-items-center">
                        <b className="pl-10 w-48"> If yes, describe:</b>

                        <InputText
                          type="text"
                          name="b"
                          value={assessment.psyFamily3ifYes}
                          onChange={(e) =>
                            changeAssessment("psyFamily3ifYes", e.target.value)
                          }
                          className="text-center w-full"
                          style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          onFocus={(e) => e.currentTarget.select()}
                        />
                      </div>
                    </>
                  )}
                </div>
                <br />
                {/* 4 */}
                <div className="flex place-items-center border-t-2 border-white hover:bg-gray-100">
                  <div className="w-1/6">
                    <b>4- Marital Status:</b>
                  </div>
                  <div className="w-5/6 pl-10">
                    <SelectButton
                      value={assessment.psyFamily4}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("psyFamily4", e.value)
                      }
                      options={optionsMaterialStatus}
                      pt={{
                        root: { className: "h-8" },
                      }}
                    />
                  </div>
                </div>

                <br />
                <b>5- Psychological stressors:</b>
                <div className="w-full flex">
                  <div className="w-1/4">
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_1}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_1", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Lack of Family Support
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_2}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_2", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Divorce
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_3}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_3", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Financial Problems
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_4}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_4", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Legal Problems
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_5}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_5", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Homelessness
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_6}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_6", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Marital Conflict
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_7}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_7", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Losses
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_8}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_8", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Sexual Abuse
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_9}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_9", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Traumatic Stress
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_10}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_10", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Domestic Violence
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_11}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_11", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Unemployment
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_12}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_12", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Medical problems
                    </div>
                  </div>
                  <div className="w-1/5">
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_13}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_13", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Housing Issues
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_14}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_14", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Transportation
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_15}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_15", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Grief
                    </div>
                    <div className="flex w-full place-items-center">
                      <Checkbox
                        className="mr-2"
                        checked={assessment.psyFamily5_16}
                        onChange={(e) =>
                          changeAssessment("psyFamily5_16", e.target.checked)
                        }
                      // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                      />
                      Sexuality
                    </div>
                  </div>
                </div>
              </div>
              {/* PSYCHIATRIC/MEDICAL HISTORY */}
              <div className="place-items-center text-center m-5">
                <b className="border-b-2 border-black">
                  PSYCHIATRIC/MEDICAL HISTORY (including Medications and Side
                  Effects):
                </b>
              </div>
              <div className="w-full border-2 border-black p-2">
                <b>Client:</b>
                <div className="w-full border-t border-r border-l border-black">
                  <div className="flex w-full">
                    <div className="w-1/6 border-r-2 border-black place-items-center pl-5">
                      <b>In other country</b>
                    </div>
                    <div className="w-1/6 border-r-2 border-black place-items-center pl-5">
                      <b>Onset of Problem:</b>
                    </div>
                    <div className="w-1/6 place-items-center">
                      <InputMask
                        id="ss"
                        mask="99/9999"
                        placeholder="mm/yyyy"
                        value={assessment.psyMedicalHistoryCountryP}
                        onChange={(e: InputMaskChangeEvent) =>
                          changeAssessment(
                            "psyMedicalHistoryCountryP",
                            e.target.value ?? ""
                          )
                        }
                        // onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("ss", e.target.value ?? "")}
                        className="input input-ghost border-0 w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          borderRadius: 0,
                          height: "12px",
                        }}
                      />
                    </div>
                    <div className="w-1/6 border-l-2 border-r-2 border-black place-items-center pl-5">
                      <b>In USA</b>
                    </div>
                    <div className="w-1/6 border-r-2 border-black place-items-center pl-5">
                      <b>Onset of Problem:</b>
                    </div>
                    <div>
                      <InputMask
                        id="ss"
                        mask="99/9999"
                        placeholder="mm/yyyy"
                        value={assessment.psyMedicalHistoryUsaP}
                        onChange={(e: InputMaskChangeEvent) =>
                          changeAssessment(
                            "psyMedicalHistoryUsaP",
                            e.target.value ?? ""
                          )
                        }
                        className="input input-ghost border-0 w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          borderRadius: 0,
                          height: "12px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r border-black place-items-center">
                      <div className="w-3/4 pl-5">
                        <b>Has had Mental Health Problems:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_1}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_1",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center">
                      <div className="w-3/4 pl-5">
                        <b>Has had Mental health Problems:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_1}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_1", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 border-r-2 border-black">
                      {assessment.psyMedicalHistoryCountry_1 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryCountry_1ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryCountry_1ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className="w-3/6 place-items-center">
                      {assessment.psyMedicalHistoryUsa_1 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryUsa_1ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryUsa_1ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has taken medications:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_2}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_2",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has taken medications:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_2}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_2", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Psychiatric follow up:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_3}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_3",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Psychiatric follow up:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_3}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_3", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-2/4">
                        <b>Has had hospitalization:</b>
                      </div>
                      <div className="w-2/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_4}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_4",
                              e.value
                            )
                          }
                          options={optionsYesNoHospitalization}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-2/4">
                        <b>Has had hospitalization:</b>
                      </div>
                      <div className="w-2/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_4}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_4", e.value)
                          }
                          options={optionsYesNoHospitalization}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had meds side effects:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_5}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_5",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had meds side effects:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_5}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_5", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 border-r-2 border-black">
                      {assessment.psyMedicalHistoryCountry_5 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryCountry_5ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryCountry_5ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className="w-3/6 place-items-center">
                      {assessment.psyMedicalHistoryUsa_5 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryUsa_5ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryUsa_5ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex w-full border-black bg-gray-200 p-3"></div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Medical Problems:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_6}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_6",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Medical Problems:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_6}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_6", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 border-r-2 border-black">
                      {assessment.psyMedicalHistoryCountry_6 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryCountry_6ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryCountry_6ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>

                    <div className="w-3/6 place-items-center ">
                      {assessment.psyMedicalHistoryUsa_6 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryUsa_6ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryUsa_6ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has taken medications:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_7}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_7",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has taken medications:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_7}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_7", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Medical/PCP follow up:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_8}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_8",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had Medical/PCP follow up:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_8}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_8", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had hospitalization:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_9}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_9",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had hospitalization:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_9}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_9", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had meds side effects:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryCountry_10}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment(
                              "psyMedicalHistoryCountry_10",
                              e.value
                            )
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                    <div className="w-3/6 flex place-items-center pl-5">
                      <div className="w-3/4">
                        <b>Has had meds side effects:</b>
                      </div>
                      <div className="w-1/4 text-right">
                        <SelectButton
                          value={assessment.psyMedicalHistoryUsa_10}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("psyMedicalHistoryUsa_10", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-3/6 border-r-2 border-black">
                      {assessment.psyMedicalHistoryCountry_10 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryCountry_10ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryCountry_10ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className="w-3/6 place-items-center">
                      {assessment.psyMedicalHistoryUsa_10 === "Yes" && (
                        <>
                          <b className="pl-5">If yes please describe:</b>
                          <InputTextarea
                            value={assessment.psyMedicalHistoryUsa_10ifYes}
                            onChange={(e) =>
                              changeAssessment(
                                "psyMedicalHistoryUsa_10ifYes",
                                e.target.value
                              )
                            }
                            rows={2}
                            cols={30}
                            className="w-full"
                            style={{
                              backgroundColor: "#e5ecfc",
                              borderColor: "#fff",
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <b>Family:</b>
                <div className="w-full border-2 border-black">
                  <div className="flex w-full">
                    <div className="w-1/5 border-r-2 border-black place-items-center text-center">
                      <b>Family Member</b>
                    </div>
                    <div className="w-2/5 border-r-2 border-black place-items-center text-center">
                      <b>Mental Problems</b>
                    </div>
                    <div className="w-2/5 place-items-center text-center">
                      <b>Medical Problems</b>
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-1/5 border-r-2 border-black place-items-center text-center">
                      Mother:
                    </div>
                    <div className="w-2/5 border-r-2 border-black place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Mother_Mental}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Mother_Mental",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div className="w-2/5 place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Mother_Medical}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Mother_Medical",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-1/5 border-r-2 border-black place-items-center text-center">
                      Father:
                    </div>
                    <div className="w-2/5 border-r-2 border-black place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Father_Mental}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Father_Mental",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div className="w-2/5 place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Father_Medical}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Father_Medical",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-1/5 border-r-2 border-black place-items-center text-center">
                      Siblings:
                    </div>
                    <div className="w-2/5 border-r-2 border-black place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Siblings_Mental}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Siblings_Mental",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div className="w-2/5 place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={
                          assessment.psyMedicalHistoryFamily_Siblings_Medical
                        }
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Siblings_Medical",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-full border-t-2 border-black">
                    <div className="w-1/5 border-r-2 border-black place-items-center text-center">
                      Other Relatives:
                    </div>
                    <div className="w-2/5 border-r-2 border-black place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Other_Mental}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Other_Mental",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div className="w-2/5 place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.psyMedicalHistoryFamily_Other_Medical}
                        onChange={(e) =>
                          changeAssessment(
                            "psyMedicalHistoryFamily_Other_Medical",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "12px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* ----------------------------------------------------------------------------------------------- */}
          <hr />
          <div className="page">
            <div
              className="place-items-center text-center mb-2"
              style={{ fontSize: "24px" }}
            >
              TCM INITIAL ASSESSMENT
            </div>
            <div className="m-0 p-0">
              {HeaderPage}
              <br />
              <br />
              <div className="flex w-full">
                <div className="flex w-full border-2 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                      <b>CURRENT MEDICATION(S):</b>
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                      <b>DOSAGE/FREQUENCY</b>
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                      <b>PRESCRIBING PHYSICIAN:</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication1}
                        onChange={(e) =>
                          changeAssessment("currentMedication1", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage1}
                        onChange={(e) =>
                          changeAssessment("dosage1", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing1}
                        onChange={(e) =>
                          changeAssessment("prescribing1", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication2}
                        onChange={(e) =>
                          changeAssessment("currentMedication2", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage2}
                        onChange={(e) =>
                          changeAssessment("dosage2", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing2}
                        onChange={(e) =>
                          changeAssessment("prescribing2", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication3}
                        onChange={(e) =>
                          changeAssessment("currentMedication3", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage3}
                        onChange={(e) =>
                          changeAssessment("dosage3", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing3}
                        onChange={(e) =>
                          changeAssessment("prescribing3", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication4}
                        onChange={(e) =>
                          changeAssessment("currentMedication4", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage4}
                        onChange={(e) =>
                          changeAssessment("dosage4", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing4}
                        onChange={(e) =>
                          changeAssessment("prescribing4", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication5}
                        onChange={(e) =>
                          changeAssessment("currentMedication5", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage5}
                        onChange={(e) =>
                          changeAssessment("dosage5", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing5}
                        onChange={(e) =>
                          changeAssessment("prescribing5", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication6}
                        onChange={(e) =>
                          changeAssessment("currentMedication6", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage6}
                        onChange={(e) =>
                          changeAssessment("dosage6", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing6}
                        onChange={(e) =>
                          changeAssessment("prescribing6", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication7}
                        onChange={(e) =>
                          changeAssessment("currentMedication7", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage7}
                        onChange={(e) =>
                          changeAssessment("dosage7", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing7}
                        onChange={(e) =>
                          changeAssessment("prescribing7", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication8}
                        onChange={(e) =>
                          changeAssessment("currentMedication8", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage8}
                        onChange={(e) =>
                          changeAssessment("dosage8", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing8}
                        onChange={(e) =>
                          changeAssessment("prescribing8", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication9}
                        onChange={(e) =>
                          changeAssessment("currentMedication9", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage9}
                        onChange={(e) =>
                          changeAssessment("dosage9", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing9}
                        onChange={(e) =>
                          changeAssessment("prescribing9", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.currentMedication10}
                        onChange={(e) =>
                          changeAssessment("currentMedication10", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center border-r-2 border-black">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.dosage10}
                        onChange={(e) =>
                          changeAssessment("dosage10", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.prescribing10}
                        onChange={(e) =>
                          changeAssessment("prescribing10", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "24px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-t-0 border-black">
                SUBSTANCE ABUSE HISTORY:
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black place-items-center text-center">
                  <b className="pl-5">Substance</b>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">
                        Alcohol (Beer, wine, liquors)
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Alcohol}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Alcohol", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Methadone, Heroin</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Methadone}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Methadone", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">
                        Stimulants (Caffeine, Speed)
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Stimulants}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Stimulants", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Hallucinogens (LSD, PCP)</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Hallucinogens}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Hallucinogens", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Narcotics (i.e. Codeine)</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Narcotics}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Narcotics", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">
                        Tranquilizers (i.e. Valium)
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Tranquilizers}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Tranquilizers", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Inhalants (glue, butane)</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Inhalants}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Inhalants", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">
                        Pain Killer Pills (Darvon, Talwin)
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Pain}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Pain", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="w-1/3 pl-5">Other</div>
                      <div className="w-1/3">
                        {assessment.substance_Other === "Yes" && (
                          <InputText
                            type="text"
                            name="specifyOther"
                            placeholder="specify"
                            value={assessment.substance_OtherSpecify}
                            onChange={(e) =>
                              changeAssessment(
                                "substance_OtherSpecify",
                                e.target.value
                              )
                            }
                            className="input input-ghost w-full text-center"
                            style={{
                              backgroundColor: "#e5ecfc",
                              border: 0,
                              height: "30px",
                            }}
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        )}
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Other}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Other", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Marijuana, hashish</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Marijuana}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Marijuana", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center border-r-2 border-black">
                    <div className="flex w-full place-items-center">
                      <div className="w-2/3 pl-5">Sleeping Pills</div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Sleeping}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Sleeping", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/6 place-items-center">
                    <div className="flex w-full place-items-center">
                      <div className="w-1/3 pl-5">Other</div>
                      <div className="w-1/3">
                        {assessment.substance_Other1 === "Yes" && (
                          <InputText
                            type="text"
                            name="specifyOther"
                            placeholder="specify"
                            value={assessment.substance_Other1Specify}
                            onChange={(e) =>
                              changeAssessment(
                                "substance_Other1Specify",
                                e.target.value
                              )
                            }
                            className="input input-ghost w-full text-center"
                            style={{
                              backgroundColor: "#e5ecfc",
                              border: 0,
                              height: "30px",
                            }}
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        )}
                      </div>
                      <div className="w-1/3 text-right">
                        <SelectButton
                          value={assessment.substance_Other1}
                          onChange={(e: SelectButtonChangeEvent) =>
                            changeAssessment("substance_Other1", e.value)
                          }
                          options={optionsYesNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex w-full border-2 border-t-0 border-black">
                  <div className="flex w-1/6 place-items-center">
                    <div className="w-full pl-5">Family:</div>
                  </div>
                  <div className="flex w-5/6 place-items-center">
                    <div className="flex w-full place-items-center text-center">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value={assessment.substance_Family}
                        onChange={(e) =>
                          changeAssessment("substance_Family", e.target.value)
                        }
                        className="input input-ghost w-full text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />
              {/* EDUCATIONAL ASSESSMENT */}
              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-black">
                EDUCATIONAL ASSESSMENT (to include adjustment and progress, if
                applicable):
              </div>
              <div className="flex w-full pl-5 border-2 border-t-0 border-black">
                <div className="border-r-2 border-black w-1/2 flex place-items-center">
                  <div className="w-2/6">Primary Language Spoken:</div>
                  <div className="w-4/6">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.education_PrimaryLeng}
                      onChange={(e) =>
                        changeAssessment("education_PrimaryLeng", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="w-1/2 flex place-items-center">
                  <div className="w-2/6 pl-5">Other Languages Spoken:</div>
                  <div className="w-4/6">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.education_OtherLengs}
                      onChange={(e) =>
                        changeAssessment("education_OtherLengs", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full pl-5 border-2 border-t-0 border-black">
                <div className="border-r-2 border-black w-1/3 flex place-items-center">
                  <div className="w-2/6">Current School:</div>
                  <div className="w-4/6">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.education_Current_School}
                      onChange={(e) =>
                        changeAssessment(
                          "education_Current_School",
                          e.target.value
                        )
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="border-r-2 border-primar w-1/3 flex place-items-center">
                  <div className="w-2/6 pl-5">Grade Level:</div>
                  <div className="w-4/6 border-r-2 border-black">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.education_Grade_Level}
                      onChange={(e) =>
                        changeAssessment("education_Grade_Level", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="w-1/3 flex place-items-center">
                  <div className="w-2/6 pl-5">Special Ed?</div>
                  <div className="w-4/6 text-right">
                    <SelectButton
                      value={assessment.education_Special_Ed}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("education_Special_Ed", e.value)
                      }
                      options={optionsEducationSpecialEd}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-2 border-t-0 border-black">
                <p className="pl-5">
                  List grades repeated, history/dates of suspensions & expulsions
                  (include adjustment and progress, if applicable):
                </p>
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.education_List_Grades1}
                  onChange={(e) =>
                    changeAssessment("education_List_Grades1", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.education_List_Grades2}
                  onChange={(e) =>
                    changeAssessment("education_List_Grades2", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.education_List_Grades3}
                  onChange={(e) =>
                    changeAssessment("education_List_Grades3", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
              </div>
              {/* WORK */}
              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-t-0 border-black">
                WORK ASSESSMENT (to include adjustment and progress, if
                applicable):
              </div>
              <div className="flex w-full pl-5 border-2 border-t-0 border-black">
                <div className="border-r-2 border-black w-1/3 flex place-items-center">
                  <div className="w-2/6">Current Work:</div>
                  <div className="w-4/6">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.work_Current}
                      onChange={(e) =>
                        changeAssessment("work_Current", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="border-r-2 border-primar w-1/3 flex place-items-center">
                  <div className="w-2/6 pl-5">Position:</div>
                  <div className="w-4/6 border-r-2 border-black">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.work_Position}
                      onChange={(e) =>
                        changeAssessment("work_Position", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
                <div className="w-1/3 flex place-items-center">
                  <div className="w-2/6 pl-5">Time on work</div>
                  <div className="w-4/6">
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Type"
                      value={assessment.work_Time}
                      onChange={(e) =>
                        changeAssessment("work_Time", e.target.value)
                      }
                      className="input input-ghost text-center w-full"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-2 border-t-0 border-black">
                <p className="pl-5">
                  List history/dates of job problems or success (include
                  adjustment and progress, if applicable):
                </p>
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.work_History1}
                  onChange={(e) =>
                    changeAssessment("work_History1", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.work_History2}
                  onChange={(e) =>
                    changeAssessment("work_History2", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
                <InputText
                  type="text"
                  name="fullname"
                  placeholder="-"
                  value={assessment.work_History3}
                  onChange={(e) =>
                    changeAssessment("work_History3", e.target.value)
                  }
                  className="input input-ghost w-full"
                  style={{ backgroundColor: "#e5ecfc", height: "30px" }}
                // onFocus={(e) => e.currentTarget.select()}
                />
              </div>
              <br />
              {/* Services being */}
              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-black">
                Services being provided through the following agencies/programs:
              </div>
              <div className="w-full flex border-2 border-t-0 border-black place-items-center pl-2 text-right">
                <div className="w-full">
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing1}
                    onChange={(e) =>
                      changeAssessment("servicesBeing1", e.target.checked)
                    }
                  />
                  AA/NA
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing2}
                    onChange={(e) =>
                      changeAssessment("servicesBeing2", e.target.checked)
                    }
                  />
                  SSA
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing3}
                    onChange={(e) =>
                      changeAssessment("servicesBeing3", e.target.checked)
                    }
                  />
                  CHARLEE
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing4}
                    onChange={(e) =>
                      changeAssessment("servicesBeing4", e.target.checked)
                    }
                  />
                  Children’s Home Society
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing5}
                    onChange={(e) =>
                      changeAssessment("servicesBeing5", e.target.checked)
                    }
                  />
                  DCF
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing6}
                    onChange={(e) =>
                      changeAssessment("servicesBeing6", e.target.checked)
                    }
                  />
                  Section 8
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing7}
                    onChange={(e) =>
                      changeAssessment("servicesBeing7", e.target.checked)
                    }
                  />
                  CHURCH
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing8}
                    onChange={(e) =>
                      changeAssessment("servicesBeing8", e.target.checked)
                    }
                  />
                  Foster Care
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing9}
                    onChange={(e) =>
                      changeAssessment("servicesBeing9", e.target.checked)
                    }
                  />
                  Juvenile Justice
                  <Checkbox
                    className="pl-2 mr-1"
                    checked={assessment.servicesBeing10}
                    onChange={(e) =>
                      changeAssessment("servicesBeing10", e.target.checked)
                    }
                  />
                  Other
                </div>
                <div className="w-1/4 text-right">
                  {assessment.servicesBeing10 && (
                    <InputText
                      type="text"
                      name="fullname"
                      placeholder="Describe"
                      value={assessment.servicesBeingOther}
                      onChange={(e) =>
                        changeAssessment("servicesBeingOther", e.target.value)
                      }
                      className="input input-ghost w-full"
                      style={{
                        backgroundColor: "#e5ecfc",
                        border: 0,
                        height: "30px",
                      }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  )}
                </div>
              </div>
              <br />
              {/* DESCRIBE CLIENT’S */}
              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-black">
                DESCRIBE CLIENT'S RELATIONSHIP WITH FAMILY AND SIGNIFICANT OTHERS
              </div>
              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-3/4">
                    <b>Does client seek friendships with peers/others?</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.describeClientDoes}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("describeClientDoes", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-2/4">
                    <b>Is the client considered:</b>
                  </div>
                  <div className="w-2/4 text-right">
                    <SelectButton
                      value={assessment.describeClientConsidered}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("describeClientConsidered", e.value)
                      }
                      options={optionsClientConsidered}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-3/4">
                    <b>Do peers/others seek client out for friendships?</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.describeClientPeers}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("describeClientPeers", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-2/4">
                    <b>Has client had any gang involvement, past or present?</b>
                  </div>
                  <div className="flex w-2/4 text-right">
                    <div className="w-full place-items-center text-right">
                      <SelectButton
                        value={assessment.describeClientInvolvement}
                        onChange={(e: SelectButtonChangeEvent) =>
                          changeAssessment("describeClientInvolvement", e.value)
                        }
                        options={optionsYesNo}
                      />
                    </div>
                    {assessment.describeClientInvolvement === "Yes" && (
                      <div className="flex place-items-center text-right">
                        <div className="pl-12 pr-2">
                          <b>indicate</b>
                        </div>
                        <select
                          value={
                            assessment.describeClientInvolvementifYes ?? "past"
                          }
                          onChange={(e) =>
                            changeAssessment(
                              "describeClientInvolvementifYes",
                              e.target.value
                            )
                          }
                          // onChange={(e) => handleChangeFormrequestEditClient("sexo", e.targe text-center"
                          style={{
                            backgroundColor: "#e5ecfc",
                            border: 0,
                            height: "30px",
                          }}
                        >
                          <option value="past" selected>
                            PAST
                          </option>
                          <option value="present">PRESENTE</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex border-2 border-t-0 border-black place-items-center">
                <div className="w-3/4 pl-5">
                  <b>
                    Client associates/plays primarily with children/adults that
                    are:
                  </b>
                </div>
                <div className="w-1/4 text-right">
                  <SelectButton
                    value={assessment.describeClientAssociates}
                    onChange={(e: SelectButtonChangeEvent) =>
                      changeAssessment("describeClientAssociates", e.value)
                    }
                    options={optionsClientAssosoates}
                  />
                </div>
              </div>

              <div className="w-full flex border-2 border-t-0 border-black place-items-center">
                <div className="w-2/4 pl-5">
                  <b>
                    Does client have at least one close friendship/relationship?
                  </b>
                </div>
                <div className="flex w-2/4">
                  <div className="flex w-1/4 place-items-center text-right">
                    <SelectButton
                      value={assessment.describeClientrelationship}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("describeClientrelationship", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                  {assessment.describeClientrelationship === "Yes" && (
                    <div className="flex w-3/4 place-items-center text-right">
                      <p className="pl-5 w-48">If so, how many?</p>
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder=""
                        value={assessment.describeClientrelationshipMany}
                        onChange={(e) =>
                          changeAssessment(
                            "describeClientrelationshipMany",
                            e.target.value
                          )
                        }
                        className="input input-ghost text-center w-full"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          height: "30px",
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full border-2 border-t-0 border-black">
                <p className="pl-5">Describe a little about client:</p>
                <InputTextarea
                  value={assessment.describeClientDescribe}
                  onChange={(e) =>
                    changeAssessment("describeClientDescribe", e.target.value)
                  }
                  placeholder="DONT LET THIS SPACE IN BLANC"
                  rows={2}
                  className="w-full"
                  style={{
                    backgroundColor: "#e5ecfc",
                    borderColor: "#fff",
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          {/* ----------------------------------------------------------------------------------------------- */}
          <hr />
          <div className="page">
            <div
              className="place-items-center text-center mb-2"
              style={{ fontSize: "24px" }}
            >
              TCM INITIAL ASSESSMENT
            </div>
            <div className="m-0 p-0">
              {HeaderPage}
              <br />
              <div className="flex w-full bg-gray-300 p-2 pl-5 border border-black">
                Describe the services currently being provided and the
                effectiveness of the services:
              </div>
              <div className="flex w-full border-2 border-t-0 border-black  place-items-center">
                <div className="w-1/6 pl-5 place-items-center">
                  1-Psychiatrist:
                </div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    name="fullname"
                    placeholder="Type"
                    value={assessment.describeServicePsychiatrist}
                    onChange={(e) =>
                      changeAssessment(
                        "describeServicePsychiatrist",
                        e.target.value
                      )
                    }
                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                    className="input input-ghost w-full"
                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black  place-items-center">
                <div className="w-1/6 pl-5 place-items-center">2-PCP:</div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    name="fullname"
                    placeholder="Type"
                    value={assessment.describeServicePCP}
                    onChange={(e) =>
                      changeAssessment("describeServicePCP", e.target.value)
                    }
                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                    className="input input-ghost w-full"
                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black  place-items-center">
                <div className="w-1/6 pl-5 place-items-center">3-PSR/IT/GT:</div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    name="fullname"
                    placeholder="Type"
                    value={assessment.describeServicePSR}
                    onChange={(e) =>
                      changeAssessment("describeServicePSR", e.target.value)
                    }
                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                    className="input input-ghost w-full"
                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black  place-items-center">
                <div className="w-1/6 pl-5 place-items-center">4-Other:</div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    name="fullname"
                    placeholder="Type"
                    value={assessment.describeServiceOther}
                    onChange={(e) =>
                      changeAssessment("describeServiceOther", e.target.value)
                    }
                    className="input input-ghost w-full"
                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
              </div>
              <br />
              {/* RECIPIENT */}
              <div className="flex w-full bg-gray-300 p-2 pl-5 border-2 border-black">
                ASSESSMENT OF THE RECIPIENT’S & FAMILY’S NEEDS FOR SERVICES:
              </div>
              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-2/4 flex place-items-center">
                    <b className="mr-5">1-Psychological</b>
                  </div>
                  <div className="w-2/4 text-right">
                    <SelectButton
                      value={assessment.recipent1}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent1", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-3/4">
                    <b>2-Medical/Dental</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.recipent2}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent2", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-2/4 flex place-items-center">
                    <b className="mr-5">3-Financial Resources</b>
                  </div>
                  <div className="w-2/4 text-right">
                    <SelectButton
                      value={assessment.recipent3}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent3", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-3/4">
                    <b>4-Environmental Supports</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.recipent4}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent4", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-2/4 flex place-items-center">
                    <b className="mr-5">5-Permanency</b>
                  </div>
                  <div className="w-2/4 text-right">
                    <SelectButton
                      value={assessment.recipent5}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent5", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-3/4">
                    <b>6-Educational Vocational</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.recipent6}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent6", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full border-2 border-t-0 border-black">
                <div className="w-3/6 flex border-r-2 border-black place-items-center pl-5">
                  <div className="w-2/4 flex place-items-center">
                    <b className="mr-5">7-Legal Assistance</b>
                  </div>
                  <div className="w-2/4 text-right">
                    <SelectButton
                      value={assessment.recipent7}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent7", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
                <div className="w-3/6 flex place-items-center pl-5">
                  <div className="w-3/4">
                    <b>8-Family Supports</b>
                  </div>
                  <div className="w-1/4 text-right">
                    <SelectButton
                      value={assessment.recipent8}
                      onChange={(e: SelectButtonChangeEvent) =>
                        changeAssessment("recipent8", e.value)
                      }
                      options={optionsYesNo}
                    />
                  </div>
                </div>
              </div>
              <div className="place-items-center text-center m-5">
                <b className="border-b-2 border-black">
                  INITIAL ASSESSMENT SIGNATURES
                </b>
              </div>
              <div className="flex w-full border-2 border-black  place-items-center">

                <div className="place-items-center">
                  {/* <RadioButton
                    className="m-2"
                    inputId="signatures"
                    name="signatures"
                    pt={{
                      root: { className: 'ROOT' },
                      icon: { className: 'ICON' },
                      box:  { className: 'BOX'  }
                      
                    }}
                    value="opt1"
                    onChange={(e) => changeAssessment("signatureOpt", e.value)}
                    checked={assessment.signatureOpt === "opt1"}
                  /> */}

                  <input className="border border-black ml-2 mr-2" type="checkbox" style={{ height: "50px" }} />

                </div>

                <div className="w-full flex place-items-center border-l-2 border-black">
                  <div className="w-full place-items-center">
                    <div className="w-full place-items-center flex">
                      <p className="w-3/4 pl-5">
                        Date of home visit(s) prior to completion of assessment:
                      </p>
                      {/* <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost text-center w-2/4"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        /> */}
                      {/* TODO Revisar si se esta guardando en db */}
                      <InputMask
                        id="date"
                        // value={requestEditClient.cell_phone}
                        // onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("cell_phone", e.target.value ?? "")}
                        mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        className="input input-ghost border-0 w-1/4 text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              OR
              <div className="flex w-full border-2 border-black  place-items-center">
                <div className="place-items-center">
                  {/* <RadioButton
                    className="ml-2 mr-2"
                    inputId="signatures"
                    name="signatures"
                    value="opt2"
                    onChange={(e) => changeAssessment("signatureOpt", e.value)}
                    checked={assessment.signatureOpt === "opt2"}
                  /> */}

                  <input className="border border-black ml-2 mr-2" type="checkbox" style={{ height: "50px" }} />

                </div>
                <div className="w-full flex place-items-center border-l-2 border-black">
                  <div className="w-full place-items-center">
                    <div className="w-full border-b-2 border-black place-items-center flex">
                      <p className="w-2/4 pl-5">
                        Targeted Case Manager was unable to complete home visit
                        due to:
                      </p>
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type"
                        value=""
                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                        className="input input-ghost text-center w-2/4"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div className="w-full flex place-items-center">
                      <p className="w-3/4 pl-5">
                        However, a face to face interview was conducted on:
                      </p>
                      <InputMask
                        id="date"
                        // value={requestEditClient.cell_phone}
                        // onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("cell_phone", e.target.value ?? "")}
                        mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        className="input input-ghost border-0 w-1/4 text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />

              {/* Sign Client */}
              <SignatureDialog
                header="Create TCM electronic signature"
                visible={signTCM}
                onHide={() => setSignTCM(false)}
                footer={footerSign("tcm")}
                signatureRef={signatureTCM}
                onSignEnd={(dataUrl) => changeAssessment("signatureTcm", dataUrl)}
                onClear={() => changeAssessment("signatureTcm", "")}
              />

              <SignatureDialog
                header="Create Supervisor electronic signature"
                visible={signTCMs}
                onHide={() => setSignTCMs(false)}
                footer={footerSign("tcms")}
                signatureRef={signatureTCMs}
                onSignEnd={(dataUrl) => changeAssessment("signatureSupervisor", dataUrl)}
                onClear={() => changeAssessment("signatureSupervisor", "")}
              />

              {/* aqui comienza las firmas */}

              {/* primera linea de firmas */}

              <div className="flex w-ful mt-24">

                <div className="flex w-2/5">
                  <div className="w-full text-center">{scm?.tcm.full_name}</div>
                </div>
                <div className="w-1/5">
                  <div className="w-full text-center">{scm?.tcm.categoryTCM === "" ? "CBHCM" : scm?.tcm.categoryTCM}</div>
                </div>
                <div className="w-1/5">
                  <div className="w-full text-center content-center">
                    {assessment.signatureTcm === "data:image/png;base64," ? (
                      <div >
                        {scm?.tcm_id === active?.activeUser?.User?.ID &&
                          <i className='pi pi-file-edit ' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                            setSignTCM(true);
                          }} />
                        }
                      </div>
                    ) : (
                      <div className="place-items-center justify-center text-center">
                        <img src={assessment.signatureTcm} alt="sign" width={150} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-1/5">
                  <div className="w-full text-center">{scm?.doa}</div>
                </div>
              </div>


              <div className='flex w-full'>
                <div className="w-2/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
              </div>


              <div className='flex w-full'>
                <div className="w-2/5 text-center"><b>Targeted Case Manager</b></div>
                <div className='w-1/5 text-center'><b>Credentials</b></div>
                <div className='w-1/5 text-center'><b>Signature TCM</b></div>
                <div className='w-1/5 text-center'><b>Date</b></div>
              </div>

              <br />

              {/* fin primera linea de firmas */}

              {/* segundo bloque de firmas */}

              <div className="flex w-full">

                <div className="flex w-2/5">
                  <div className="w-full text-center">{assessment.nameSupervisor}</div>
                </div>

                <div className="w-1/5">
                  <div className="w-full text-center">{assessment.categorySupervisor}</div>
                </div>

                <div className="w-1/5">
                  <div className="w-full">
                    {assessment.signatureSupervisor === "data:image/png;base64," ? (
                      <>
                        {scm?.assessment.supervisor === active?.activeUser?.User?.ID &&
                          scm?.assessment.signatureSupervisor === "data:image/png;base64," &&
                          <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                            setSignTCMs(true);
                          }} />
                        }
                      </>

                    ) : (
                      <div className="w-full place-items-center pl-10 flex text-center">
                        <img src={assessment.signatureSupervisor} width={150} alt='sign' />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-1/5">
                  <div className="w-full text-center">{scm?.doa}</div>
                </div>
              </div>


              <div className='flex w-full'>
                <div className="w-2/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
              </div>


              <div className='flex w-full'>
                <div className="w-2/5 text-center"><b>Targeted Case Manager Supervisor</b></div>
                <div className='w-1/5 text-center'><b>Credentials</b></div>
                <div className='w-1/5 text-center'><b>Signature TCMS</b></div>
                <div className='w-1/5 text-center'><b>Date</b></div>
              </div>

              {/* fin segundo bloque de firmas */}

            </div>
          </div>
        </div>
      </Block>
      {/* </BlockUI> */}

      <ScrollTop
        target="parent"
        pt={{
          root: { className: "bg-orange-400" },
        }}
      />
    </div>
  );
};

export { Assessment };
