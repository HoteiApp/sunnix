import React, { useEffect, useState, useRef } from "react";
// -- Component
import { Dialog } from "primereact/dialog";
import { ScrollTop } from "primereact/scrolltop";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";

import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
// -- COMMONs
import { CalculateAge } from ".";

import {
  useCoreRequestEditSCMClient,
  useCoreClientSCM,
} from "../profile/hooks";

// -- DOCs
// Connsents
import { InformedConnsent } from "./connsents/informed";
import { ProtectedHealth } from "./connsents/protectedHealth";
import { ClientRights } from "./connsents/clientRights";
import { MedicalInformation } from "./connsents/medicalInformation";
// Certification
import { Certification } from "./certification/certification";
// Assessment
import { Assessment } from "./assessment/assessment";
// Assessment
import { ListNotes } from "../tcm/notes/listNotes";
// Sp
import { Sp } from "./sp/sp";
import { Addendums } from "./sp/addendoms";
import { Review } from "./sp/review";
import { AddendumsReview } from "./sp/addendomsReview";
import { Closing } from "./sp/closing";

// INSURANCE
import { InsuranceInformation } from "./clienteFile/Insurance";
import { MedicalInformations } from "./clienteFile/medical";
import { MentalInformations } from "./clienteFile/mental";
// import { Addendums } from "./sp/addendoms";
// -- New Struct
import {
  Active, ServiceCMActive,
  FormRequestEditClient,
  FromEditScmSure,
  FormEditMedical,
  FormEditMental,
} from "../../models";
// -- Other Modules
import SignatureCanvas, { SignatureCanvasRef } from "react-signature-canvas";

const ClientFileReview = ({ active, show, scm, num, relad, closed }: Props) => {
  // -- Get SCM Client
  const { scmInfo, reloadInfoSCM } = useCoreClientSCM({
    id: scm?.id.toString(),
  });

  const { addRequestEditClient, isUpdatingRequestEditClient } =
    useCoreRequestEditSCMClient(relad);
  // -- Info general
  // const [visible, setVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  // const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
  const [saveInformationClient, setSaveInformationClient] =
    useState<boolean>(false);

  // Función de validación personalizada para el campo de fecha.
  const isValidDate = (value) => {
    // Utilizamos una expresión regular para verificar si el formato es válido.
    const datePattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (!datePattern.test(value)) {
      return false; // Formato inválido.
    }

    // Parseamos los componentes de la fecha.
    const [month, day, year] = value.split("/").map(Number);

    // Validamos que el mes esté en el rango de 1 a 12 y el día en el rango adecuado.
    return month >= 1 && month <= 12 && day >= 1 && day <= 31;
  };
  // ------------------------
  const [visibleConnsentInformed, setVisibleConnsentInformed] =
    useState<boolean>(false);
  const [visibleConnsentProtectedHealth, setVisibleConnsentProtectedHealth] =
    useState<boolean>(false);
  const [visibleConnsentClientRights, setVisibleConnsentClientRights] =
    useState<boolean>(false);
  const [
    visibleConnsentMedicalInformation,
    setVisibleConnsentMedicalInformation,
  ] = useState<boolean>(false);
  //  -- Certification
  const [visibleCertification, setVisibleCertification] =
    useState<boolean>(false);
  //  -- Assessment
  const [visibleAssessment, setVisibleAssessment] = useState<boolean>(false);
  //  -- Notes
  const [visibleNotes, setVisibleNotes] = useState<boolean>(false);
  //  -- Service Plan
  const ViewOptions = ["Edit", "PreView"];
  const [view, setView] = useState<string>("Edit");
  const [visibleSp, setVisibleSp] = useState<boolean>(false);
  const [visibleAddesdums, setVisibleAddesdums] = useState<boolean>(false);
  const [visibleReview, setVisibleReview] = useState<boolean>(false);
  const [visibleAddReview, setVisibleAddReview] = useState<boolean>(false);
  const [visibleClosing, setVisibleClosing] = useState<boolean>(false);

  const headerServicePlan = (
    <SelectButton
      value={view}
      onChange={(e) => {
        setView(e.target.value);
      }}
      options={ViewOptions}
      className="input input-ghost w-full p-0"
    />
  );

  const checkFields = () => {
    setIsValid(false);
    const { last_name, first_name, sexo, dob, medicalid, gold_card_number } =
      requestEditClient;

    if (last_name !== "" && first_name !== "" && sexo !== "" && dob !== "") {
      if (medicalid !== "" || gold_card_number !== "") {
        // Los campos requeridos tienen valores y al menos uno de los campos adicionales está en true
        setIsValid(true);
      }
    }
  };
  // -----------------------
  const [requestEditClient, setRequestEditClient] =
    useState<FormRequestEditClient>({
      id: scmInfo?.scm.Demografic.ID ?? 0,
      referring_agency: scmInfo?.scm.Demografic.referring_agency ?? "",
      referring_person: scmInfo?.scm.Demografic.referring_person ?? "",
      cell_phone: scmInfo?.scm.Demografic.cell_phone ?? "",
      fax: scmInfo?.scm.Demografic.fax ?? "",
      email: scmInfo?.scm.Demografic.email ?? "",
      date: scmInfo?.scm.Demografic.date ?? "",

      last_name: scmInfo?.scm.Demografic.last_name ?? "",
      first_name: scmInfo?.scm.Demografic.first_name ?? "",

      ss: scmInfo?.scm.Demografic.ss ?? "",
      dob: scmInfo?.scm.Demografic.dob ?? "",
      sexo: scmInfo?.scm.Demografic.sexo ?? "",
      race: scmInfo?.scm.Demografic.race ?? "",

      address: scmInfo?.scm.Demografic.address ?? "",
      state: scmInfo?.scm.Demografic.state ?? "",
      zip_code: scmInfo?.scm.Demografic.zip_code ?? "",

      phone: scmInfo?.scm.Demografic.phone ?? "",
      school: scmInfo?.scm.Demografic.school ?? "",
      lenguage: scmInfo?.scm.Demografic.lenguage ?? "",
      sign_client: scmInfo?.scm.Demografic.sign_client ?? "",

      legal_guardian: scmInfo?.scm.Demografic.legal_guardian ?? "",
      relationship: scmInfo?.scm.Demografic.relationship ?? "",
      cell_phone_guardian: scmInfo?.scm.Demografic.cell_phone_guardian ?? "",
      sign_guardian: scmInfo?.scm.Demografic.sign_guardian ?? "",

      medicalid: scmInfo?.scm.Demografic.medicaid ?? "",
      gold_card_number: scmInfo?.scm.Demografic.gold_card_number ?? "",
      medicare: scmInfo?.scm.Demografic.medicare ?? "",

      reason: "",
      evaluation: false,
    });

  const handleChangeFormrequestEditClient = <
    T extends string | number | boolean
  >(
    name: keyof FormRequestEditClient,
    value: T
  ) => {
    // Verificamos si el nuevo valor de la fecha es válido.
    if (name === "date" && !isValidDate(value)) {
      return;
    }

    setRequestEditClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setVisibleBtnSave(true);
    setSaveInformationClient(true);
    return requestEditClient;
  };
  // -- Funcion para calcular la edad
  const age = CalculateAge({ dob: requestEditClient.dob ?? "00/00/0000" });
  // -----------------------
  // const [requestEditSure, setRequestEditSure] = useState<FromEditScmSure>({
  //   id: scmInfo?.scm.sure.ID ?? 0,
  //   plan_name: scmInfo?.scm.sure.plan_name ?? "",
  //   plan_id: scmInfo?.scm.sure.plan_id ?? "",
  //   auth: scmInfo?.scm.sure.auth ?? false,
  //   auth_date_start: scmInfo?.scm.sure.auth_date_start ?? "",
  //   auth_date_end: scmInfo?.scm.sure.auth_date_end ?? "",
  //   unit: scmInfo?.scm.sure.unit ?? 0,
  //   time_range: scmInfo?.scm.sure.time_range ?? 0,
  //   active: scmInfo?.scm.sure.active ?? true,
  // });

  // const handleChangeFormrequestEditSure = <T extends string | number | boolean>(
  //   name: keyof FromEditScmSure,
  //   value: T
  // ) => {
  //   setRequestEditSure((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   setVisibleBtnSave(true);
  //   setSaveInformationClient(true);
  //   return requestEditSure;
  // };
  // -----------------------
  const [requestEditMedical, setRequestEditMedical] = useState<FormEditMedical>(
    {
      id: scmInfo?.scm.medical.ID ?? 0,
      medical_pcp: scmInfo?.scm.medical?.medical_pcp ?? "",
      medical_pcp_address: scmInfo?.scm.medical?.medical_pcp_address ?? "",
      medical_pcp_phone: scmInfo?.scm.medical?.medical_pcp_phone ?? "",

      medical_psychiatrisy: scmInfo?.scm.medical?.medical_psychiatrisy ?? "",
      medical_psychiatrisy_address:
        scmInfo?.scm.medical?.medical_psychiatrisy_address ?? "",
      medical_psychiatrisy_phone:
        scmInfo?.scm.medical?.medical_psychiatrisy_phone ?? "",
    }
  );

  const handleChangeFormrequestEditMedical = <
    T extends string | number | boolean
  >(
    name: keyof FormEditMedical,
    value: T
  ) => {
    setRequestEditMedical((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setVisibleBtnSave(true);
    setSaveInformationClient(true);
    return requestEditMedical;
  };
  // -----------------------
  const [requestEditMental, setRequestEditMental] = useState<FormEditMental>({
    id: scmInfo?.scm.Mental?.ID ?? 0,
    mental_primary: scmInfo?.scm.Mental.mental_primary ?? "",
    mental_primary_date: scmInfo?.scm.Mental.mental_primary_date ?? "",

    mental_secondary: scmInfo?.scm.Mental.mental_secondary ?? "",
    mental_secondary_date: scmInfo?.scm.Mental.mental_secondary_date ?? "",
  });

  const handleChangeFormrequestEditMental = <
    T extends string | number | boolean
  >(
    name: keyof FormEditMental,
    value: T
  ) => {
    setRequestEditMental((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setVisibleBtnSave(true);
    setSaveInformationClient(true);
    return requestEditMental;
  };
  // -----------------------

  // ---------------------------------------------------------------------
  const handleButtonClick = () => {
    if (saveInformationClient) {
      addRequestEditClient({
        requestEditClient: requestEditClient,
        // requestEditScmSure: requestEditSure,
        requestEditScmMedical: requestEditMedical,
        requestEditScmMental: requestEditMental,
      });
      setSaveInformationClient(false);
    }
    relad();
    setVisibleBtnSave(false);
  };
  // ------------------
  const menuLeft = useRef<Menu>(null);
  const menuRight = useRef<Menu>(null);
  const menuSp = useRef<Menu>(null);

  const toast = useRef<Toast>(null);

  const items: MenuItem[] = [
    {
      label: "Consents",
      items: [
        {
          label: "Informed Consent",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConnsentInformed(true);
          },
        },
        {
          label: "PHI",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConnsentProtectedHealth(true);
          },
        },
        {
          label: "Client’s Rights",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConnsentClientRights(true);
          },
        },
        {
          label: "Medical Information Use",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConnsentMedicalInformation(true);
          },
        },
      ],
    },
  ];

  const itemsCertification: MenuItem[] = [
    {
      label: "Certification",
      items: [
        {
          label: "Initial Certification",
          icon: "pi pi-file-edit",
          command: () => {
            setVisibleCertification(true);
          },
        },
        {
          label: "6 Month Certification",
          disabled: true,
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            if (toast.current) {
              toast.current.show({
                severity: "warn",
                summary: "Alert",
                detail:
                  "Until you have the Initial Service Plan Authorization you cannot add addendums",
                life: 3000,
              });
            }
          },
        },
        {
          label: "Recertification",
          disabled: true,
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            if (toast.current) {
              toast.current.show({
                severity: "warn",
                summary: "Delete",
                detail: "Data Deleted",
                life: 3000,
              });
            }
          },
        },
      ],
    },
  ];

  const itemsSp: MenuItem[] = [
    {
      label: "Service Plan",
      items: [
        {
          label: "Initial SP",
          icon: "pi pi-file-edit",
          command: () => {
            setVisibleSp(true);
          },
        },
        {
          label: "Add SP",
          // disabled: true,
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            scm?.status !== "Pending" && setVisibleAddesdums(true);

            // if (toast.current) {
            //     toast.current.show({ severity: 'warn', summary: 'Alert', detail: 'Until you have the Initial Service Plan Authorization you cannot add addendums', life: 3000 });
            // }
          },
        },
        {
          label: "SP Review",
          disabled: false,
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            scm?.status !== "Pending" && setVisibleReview(true);
            // if (toast.current) {
            //     toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            // }
          },
        },
        {
          label: "Add SP Review",
          disabled: false,
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            scm?.status !== "Pending" && setVisibleAddReview(true);
            // if (toast.current) {
            //     toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            // }
          },
        },
        {
          label: "Closing",
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            scm?.status !== "Pending" && setVisibleClosing(true);
          },
        },
        {
          label: "PreView",
          icon: "pi pi-eye",
          command: () => {
            if (toast.current) {
              toast.current.show({
                severity: "warn",
                summary: "PreView",
                detail: "Impemented",
                life: 3000,
              });
            }
          },
        },
      ],
    },
  ];

  // -----------------------------------------------FOOTER here
  const footerContent = (
    <div className="container">
      <div className="row">
        <div className="flex col-sm-12 col-md-3 col-lg-4">
          <Toast ref={toast}></Toast>
          {/* <Dicta extractCommand={extractCommand} /> */}
          {scmInfo?.scm.status !== "Pending" && (
            <>
              <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
              <Button
                label="CONSENTS"
                className="mr-2"
                tooltip={
                  requestEditClient?.sign_client === ""
                    ? "Request the client's signature"
                    : "All consents are signed by the client"
                }
                tooltipOptions={{
                  position: "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                icon={
                  requestEditClient?.sign_client === ""
                    ? "pi pi-file-edit"
                    : "pi pi-verified"
                }
                onClick={(event) => {
                  if (menuLeft.current) {
                    menuLeft.current.toggle(event);
                  }
                }}
                aria-controls="popup_menu_left"
                aria-haspopup
              />
              <Menu
                model={itemsCertification}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
              />
              <Button
                label="CERTIFICATION"
                className="mr-2"
                onClick={(event) => {
                  if (menuRight.current) {
                    menuRight.current.toggle(event);
                  }
                }}
                aria-controls="popup_menu_right"
                aria-haspopup
              />
              {/* <Button
                        label="CERTIFICATION"
                        tooltip={scmInfo?.scm.certification.signTcm !== "" ? scmInfo?.scm.certification.signSupervisor !== "" ? scmInfo?.scm.certification.signQA !== "" ? "The document is approved" : "Awaiting QA review" : "Awaiting supervisor review" : "The TCM must sign the document"}
                        tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
                        icon={scmInfo?.scm.certification.signTcm !== "" ? scmInfo?.scm.certification.signSupervisor !== "" ? scmInfo?.scm.certification.signQA !== "" ? "pi pi-verified" : "pi pi-hourglass" : "pi pi-hourglass" : "pi pi-file-edit"}
                        className="mr-2"
                        onClick={() => { setVisibleCertification(true) }}
                    /> */}
            </>
          )}

          <Button
            label="ASSESSMENT"
            icon={
              scmInfo?.scm.assessment.signatureTcm !== ""
                ? scmInfo?.scm.assessment.signatureSupervisor !== ""
                  ? scmInfo?.scm.assessment.signatureQa !== ""
                    ? "pi pi-verified"
                    : "pi pi-hourglass"
                  : "pi pi-hourglass"
                : "pi pi-file-edit"
            }
            tooltip={
              scmInfo?.scm.assessment.signatureTcm !== ""
                ? scmInfo?.scm.assessment.signatureSupervisor !== ""
                  ? scmInfo?.scm.assessment.signatureQa !== ""
                    ? "The document is approved"
                    : "Awaiting QA review"
                  : "Awaiting supervisor review"
                : "The TCM must sign the document"
            }
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            className="mr-2"
            onClick={() => setVisibleAssessment(true)}
          />
          <Menu model={itemsSp} popup ref={menuSp} id="popup_menu_sp" />
          <Button
            label="SP"
            className="mr-2"
            onClick={(event) => {
              if (menuSp.current) {
                menuSp.current.toggle(event);
              }
            }}
            aria-controls="popup_menu_sp"
            aria-haspopup
          />
          {/* <Button label="ADDENDUMS" className="mr-2" onClick={(event) => { if (menuRight.current) { menuRight.current.toggle(event) } }} aria-controls="popup_menu_right" aria-haspopup /> */}
          <Button label="EVALUATIONS" className="mr-2" />
          {/* TODO Se debe de controlar el btn authorization si algunos de los seguros que ha utilizado necesita auth */}
          {scm?.status === "Pending" && (
            <Button
              label="AUTHORIZATIONS"
              className="mr-2"
              onClick={() => setVisibleAssessment(true)}
            />
          )}
          <Button
            label="COMUNICATION LOGS"
            className="mr-2"
            onClick={() => setVisibleAssessment(true)}
          />
          <Button
            label="Notes"
            className="mr-2"
            onClick={() => setVisibleNotes(true)}
          />
          {visibleBtnSave && (
            <Button
              label="SAVE"
              icon="pi pi-save"
              pt={{
                root: { className: "bg-orange-400" },
              }}
              onClick={() => handleButtonClick()}
            />
          )}
        </div>
      </div>
    </div>
  );
  const footerSign = (
    <div className="m-0 pt-1 w-full">
      <div className="flex overflow-y-auto">
        <Toast ref={toast}></Toast>
        {/* <Dicta extractCommand={extractCommand} /> */}

        {visibleBtnSave && (
          <Button
            label="SAVE"
            icon="pi pi-save"
            disabled={requestEditClient.sign_client === "" ? true : false}
            pt={{
              root: { className: "bg-orange-400" },
            }}
            onClick={() => handleButtonClick()}
          />
        )}
      </div>
    </div>
  );
  const LangOptions = ["English", "Spanish"];
  const [lang, setLang] = useState<string>("English");

  const headerConnsent = (
    <SelectButton
      value={lang}
      onChange={(e) => {
        setLang(e.target.value);
      }}
      options={LangOptions}
      className="input input-ghost w-full p-0"
    />
  );

  const BillNotesOpt = ["Billable", "Not Billable"];
  const [billNote, setBillNote] = useState<string>("Billable");
  const [minutes, setMinutes] = useState<number>(0);
  const [minutes_2, setMinutes_2] = useState<number>(0);
  const [minutes_3, setMinutes_3] = useState<number>(0);
  const [minutes_Total, setMinutes_Total] = useState<number>(0);
  const [unit, setUnit] = useState<number>(32);
  const [unit_2, setUnit_2] = useState<number>(32);
  const [unit_3, setUnit_3] = useState<number>(32);
  const [units_Total, setUnits_Total] = useState<number>(0);

  const headerNotes = (
    <div className="flex w-full place-items-center">
      <div className="flex w-1/3">
        <div className="pl-2 pr-2">
          <b>Notes List</b>
        </div>
      </div>
      <div className="w-1/3">
        {/* <SelectButton
                    value={billNote}
                    onChange={(e) => {
                        setBillNote(e.target.value);
                    }}
                    options={BillNotesOpt}
                    className="input input-ghost text-center"
                /> */}
      </div>
    </div>
  );

  const footerNotes = (
    <div className="m-0 pt-1 w-full">
      {billNote === "Billable" && (
        <div className="flex overflow-y-auto">
          <div className="w-1/3">
            <b>Minutes:</b> {minutes_Total}{" "}
          </div>
          <div className="w-1/3">
            <b>Units:</b> {units_Total}
          </div>
          <div className="w-1/3">
            <b>Collect</b> ${units_Total * 7.28}
          </div>
        </div>
      )}
    </div>
  );
  // signClient
  const [signClient, setSignClient] = useState<boolean>(false);
  const signatureClientRef = useRef<SignatureCanvasRef>(null);
  const [imageSignClient, setImageSignClient] = useState("");

  // signLegalGuardian
  const [signLegalGuardian, setSignLegalGuardian] = useState<boolean>(false);
  const signatureLegalGuardianRef = useRef<SignatureCanvasRef>(null);
  const [imageSignLegalGuardian, setImageSignLegalGuardian] = useState("");

  const signClientWindows = () => {
    setSignClient(true);
  };
  const signGuardianWindows = () => {
    setSignLegalGuardian(true);
  };
  useEffect(() => {
    reloadInfoSCM();
  }, [relad]);

  useEffect(() => {
    setRequestEditClient({
      id: scmInfo?.scm.Demografic.ID ?? 0,
      referring_agency: scmInfo?.scm.Demografic.referring_agency ?? "",
      referring_person: scmInfo?.scm.Demografic.referring_person ?? "",
      cell_phone: scmInfo?.scm.Demografic.cell_phone ?? "",
      fax: scmInfo?.scm.Demografic.fax ?? "",
      email: scmInfo?.scm.Demografic.email ?? "",
      date: scmInfo?.scm.Demografic.date ?? "",

      last_name: scmInfo?.scm.Demografic.last_name ?? "",
      first_name: scmInfo?.scm.Demografic.first_name ?? "",

      ss: scmInfo?.scm.Demografic.ss ?? "",
      dob: scmInfo?.scm.Demografic.dob ?? "",
      sexo: scmInfo?.scm.Demografic.sexo ?? "",
      race: scmInfo?.scm.Demografic.race ?? "",

      address: scmInfo?.scm.Demografic.address ?? "",
      state: scmInfo?.scm.Demografic.state ?? "",
      zip_code: scmInfo?.scm.Demografic.zip_code ?? "",

      phone: scmInfo?.scm.Demografic.phone ?? "",
      school: scmInfo?.scm.Demografic.school ?? "",
      lenguage: scmInfo?.scm.Demografic.lenguage ?? "",
      sign_client: scmInfo?.scm.Demografic.sign_client ?? "",

      legal_guardian: scmInfo?.scm.Demografic.legal_guardian ?? "",
      relationship: scmInfo?.scm.Demografic.relationship ?? "",
      cell_phone_guardian: scmInfo?.scm.Demografic.cell_phone_guardian ?? "",
      sign_guardian: scmInfo?.scm.Demografic.sign_guardian ?? "",

      medicalid: scmInfo?.scm.Demografic.medicaid ?? "",
      gold_card_number: scmInfo?.scm.Demografic.gold_card_number ?? "",
      medicare: scmInfo?.scm.Demografic.medicare ?? "",
      reason: "",
      evaluation: false,
    });
    // -------------------
    // setRequestEditSure({
    //   id: scmInfo?.scm.sure.ID ?? 0,
    //   plan_name: scmInfo?.scm.sure.plan_name ?? "",
    //   plan_id: scmInfo?.scm.sure.plan_id ?? "",
    //   auth: scmInfo?.scm.sure.auth ?? false,
    //   auth_date_start: scmInfo?.scm.sure.auth_date_start ?? "",
    //   auth_date_end: scmInfo?.scm.sure.auth_date_end ?? "",
    //   unit: scmInfo?.scm.sure.unit ?? 0,
    //   time_range: scmInfo?.scm.sure.time_range ?? 0,
    //   active: scmInfo?.scm.sure.active ?? true,
    // });
    // -------------------
    setRequestEditMedical({
      id: scmInfo?.scm.medical.ID ?? 0,
      medical_pcp: scmInfo?.scm.medical?.medical_pcp ?? "",
      medical_pcp_address: scmInfo?.scm.medical?.medical_pcp_address ?? "",
      medical_pcp_phone: scmInfo?.scm.medical?.medical_pcp_phone ?? "",
      medical_psychiatrisy: scmInfo?.scm.medical?.medical_psychiatrisy ?? "",
      medical_psychiatrisy_address:
        scmInfo?.scm.medical?.medical_psychiatrisy_address ?? "",
      medical_psychiatrisy_phone:
        scmInfo?.scm.medical?.medical_psychiatrisy_phone ?? "",
    });
    // -----------------------------------
    setRequestEditMental({
      id: scmInfo?.scm.Mental?.ID ?? 0,
      mental_primary: scmInfo?.scm.Mental.mental_primary ?? "",
      mental_primary_date: scmInfo?.scm.Mental.mental_primary_date ?? "",

      mental_secondary: scmInfo?.scm.Mental.mental_secondary ?? "",
      mental_secondary_date: scmInfo?.scm.Mental.mental_secondary_date ?? "",
    });
  }, [scmInfo]);

  return (
    // <Dialog
    //     header={`Electronic Health Record - Admission ${num}`}
    //     visible={true}
    //     maximizable
    //     resizable
    //     style={{ width: '80vw' }}
    //     onHide={() => closed()}
    //     footer={footerContent}
    // >
    //     {/* <Dialog
    //         header="Create my electronic signature"
    //         visible={signClient}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setSignClient(false)}
    //         footer={footerSign}
    //     >
    //         <p className="m-0" style={{ overflow: 'auto' }}>
    //             "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
    //             <br /><br />
    //             By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
    //             <br /><br />
    //             If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
    //             <br /><br />
    //             Please try to make the signature as legible as possible:
    //             <div className='w-full' >
    //                 <SignatureCanvas
    //                     ref={signatureClientRef}
    //                     canvasProps={{
    //                         style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
    //                     }}
    //                     minWidth={2}
    //                     maxWidth={3}
    //                     onEnd={() => {
    //                         handleChangeFormrequestEditClient("sign_client", signatureClientRef.current.getTrimmedCanvas().toDataURL("image/png"));
    //                         setImageSignClient(signatureClientRef.current.getTrimmedCanvas().toDataURL("image/png"));
    //                     }}
    //                 />
    //             </div>
    //             <button onClick={() => {
    //                 signatureClientRef.current.clear();
    //                 handleChangeFormrequestEditClient("sign_client", "")
    //                 setImageSignClient("");
    //             }}> Clear </button>
    //         </p>
    //     </Dialog> */}
    //     {/* Connsents */}
    //     {/* <Dialog
    //         header={headerConnsent}
    //         visible={visibleConnsentInformed}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleConnsentInformed(false)}
    //     >
    //         <InformedConnsent data={scmInfo?.scm} lang={lang} setSignClient={signClientWindows} setSignLegalGuardian={signGuardianWindows} />
    //     </Dialog> */}

    //     {/* <Dialog
    //         header={headerConnsent}
    //         visible={visibleConnsentProtectedHealth}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleConnsentProtectedHealth(false)}
    //     >
    //         <ProtectedHealth data={scmInfo?.scm} lang={lang} setSignClient={signClientWindows} setSignLegalGuardian={signGuardianWindows} />
    //     </Dialog>

    //     <Dialog
    //         header={headerConnsent}
    //         visible={visibleConnsentClientRights}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleConnsentClientRights(false)}
    //     >
    //         <ClientRights data={scmInfo?.scm} lang={lang} setSignClient={signClientWindows} setSignLegalGuardian={signGuardianWindows} />
    //     </Dialog>

    //     <Dialog
    //         header={headerConnsent}
    //         visible={visibleConnsentMedicalInformation}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleConnsentMedicalInformation(false)}
    //     // position="bottom"
    //     >
    //         <MedicalInformation data={scmInfo?.scm} lang={lang} setSignClient={signClientWindows} setSignLegalGuardian={signGuardianWindows} />
    //     </Dialog> */}

    //     {/* Certification */}
    //     <Dialog
    //         // header="Assessment"
    //         visible={visibleCertification}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleCertification(false)}
    //     // position="bottom"
    //     >
    //         <Certification active={active} relad={relad} scm={scmInfo?.scm} />
    //     </Dialog>

    //     {/* Assessment */}
    //     {/* <Dialog
    //         visible={visibleAssessment}
    //         // maximizable
    //         resizable
    //         modal={false}
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleAssessment(false)}
    //     // position="bottom"
    //     >
    //         <Assessment relad={relad} scm={scmInfo?.scm} />
    //     </Dialog> */}
    //     {/* Notes */}
    //     <Dialog
    //         header={headerNotes}
    //         visible={visibleNotes}
    //         // maximizable
    //         resizable
    //         modal={false}
    //         style={{
    //             width: '99vw',
    //         }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleNotes(false)}
    //     // position="bottom"
    //     // footer={footerNotes}
    //     >
    //         <ListNotes scm={scmInfo?.scm} relad={relad} active={active} />
    //         {/* <Notes
    //             scm={scmInfo?.scm}
    //             minutes={minutes}
    //             setMinutes={setMinutes}
    //             minutes_2={minutes_2}
    //             setMinutes_2={setMinutes_2}
    //             minutes_3={minutes_3}
    //             setMinutes_3={setMinutes_3}
    //             unit={unit}
    //             setUnit={setUnit}
    //             unit_2={unit_2}
    //             setUnit_2={setUnit_2}
    //             unit_3={unit_3}
    //             setUnit_3={setUnit_3}

    //         /> */}
    //     </Dialog>

    //     {/* Service Plan */}
    //     {/* <Dialog
    //         // header={""}
    //         visible={visibleSp}
    //         // maximizable
    //         resizable
    //         modal={false}
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleSp(false)}
    //     // position="bottom"
    //     >
    //         <Sp relad={relad} scm={scmInfo?.scm} view={view} />
    //     </Dialog> */}

    //     {/* <Dialog
    //         header={""}
    //         visible={visibleAddesdums}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleAddesdums(false)}
    //     // position="bottom"
    //     >
    //         <Addendums relad={relad} scm={scmInfo?.scm} view={view} />
    //     </Dialog>

    //     <Dialog
    //         header={""}
    //         visible={visibleReview}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleReview(false)}
    //     // position="bottom"
    //     >
    //         <Review relad={relad} scm={scmInfo?.scm} view={view} />
    //     </Dialog>

    //     <Dialog
    //         header={""}
    //         visible={visibleAddReview}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleAddReview(false)}
    //     // position="bottom"
    //     >
    //         <AddendumsReview relad={relad} scm={scmInfo?.scm} view={view} />
    //     </Dialog>

    //     <Dialog
    //         header={""}
    //         visible={visibleClosing}
    //         maximizable
    //         style={{ width: '80vw' }}
    //         breakpoints={{ '960px': '70vw', '641px': '90vw' }}
    //         onHide={() => setVisibleClosing(false)}
    //     // position="bottom"
    //     >
    //         <Closing relad={relad} scm={scmInfo?.scm} view={view} />
    //     </Dialog> */}

    //     <div className="m-0 border-2 border-primary">
    //         <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
    //             <div className='text-2xl tracking-tight place-items-center'>Referral Source</div>
    //         </div>
    //         <div className="m-0 p-0">
    //             {/* row 1 */}
    //             <div className="md:flex lg:flex w-full">
    //                 <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
    //                         <div className="grid flex-grow w-2/4 pl-5">
    //                             Referring Agency:
    //                         </div>
    //                         <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
    //                             <div className="flex p-inputgroup flex-1">
    //                                 <InputText
    //                                     type="text"
    //                                     name='referringAgency'
    //                                     placeholder="Type Referring Agency"
    //                                     value={requestEditClient.referring_agency}
    //                                     onChange={(e) => handleChangeFormrequestEditClient("referring_agency", e.target.value)}
    //                                     className="input input-ghost w-full text-center"
    //                                     style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                     onFocus={(e) => e.currentTarget.select()}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
    //                         <div className="grid flex-grow w-2/4 pl-5">
    //                             Referring Person:
    //                         </div>
    //                         <div className="grid border-primary w-3/4 p-1 pl-0">
    //                             <div className="p-inputgroup flex-1">
    //                                 <InputText
    //                                     type="text"
    //                                     name='referringPerson'
    //                                     placeholder="Type Referring Person"
    //                                     value={requestEditClient.referring_person}
    //                                     onChange={(e) => handleChangeFormrequestEditClient("referring_person", e.target.value)}
    //                                     className="input input-ghost w-full text-center"
    //                                     style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                     onFocus={(e) => e.currentTarget.select()}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             {/* row 2 */}
    //             <div className="md:flex lg:flex w-full">
    //                 <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center p-0 m-0">

    //                                     <div className="grid w-2/4 pl-4">
    //                                         Cell/Phone:
    //                                     </div>

    //                                     <div className="grid w-2/4">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <InputMask
    //                                                 id="phone"
    //                                                 value={requestEditClient.cell_phone}
    //                                                 onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("cell_phone", e.target.value ?? "")}
    //                                                 mask="(999) 999-9999"
    //                                                 placeholder="Type number"
    //                                                 className="input input-ghost border-0 w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="flex grid md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center">
    //                                     <div className="flex w-full place-items-center">

    //                                         <div className="grid w-2/5">
    //                                             Fax:
    //                                         </div>
    //                                         <div className="grid w-3/5">
    //                                             <div className="p-inputgroup flex-1">
    //                                                 <InputMask
    //                                                     id="fax"
    //                                                     value={requestEditClient.fax}
    //                                                     onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("fax", e.target.value ?? "")}
    //                                                     mask="(999) 999-9999"
    //                                                     placeholder="Type number"
    //                                                     className="input input-ghost border-0 w-full text-center"
    //                                                     style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                                 />
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center p-0 m-0">

    //                                     <div className="grid w-2/4 pl-4">
    //                                         Email:
    //                                     </div>

    //                                     <div className="grid w-2/4">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <InputText
    //                                                 type="text"
    //                                                 name='email'
    //                                                 placeholder="Type Email"
    //                                                 value={requestEditClient.email}
    //                                                 onChange={(e) => handleChangeFormrequestEditClient("email", e.target.value ?? "")}
    //                                                 className="input input-ghost w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                                 onFocus={(e) => e.currentTarget.select()}
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="flex grid w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center">
    //                                     <div className="flex w-full place-items-center">

    //                                         <div className="grid w-2/5">
    //                                             Date:
    //                                         </div>
    //                                         <div className="grid w-3/5">
    //                                             <div className="p-inputgroup flex-1">
    //                                                 <InputMask
    //                                                     id="date"
    //                                                     value={requestEditClient.date}
    //                                                     onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("date", e.target.value ?? "")}
    //                                                     mask="99/99/9999"
    //                                                     placeholder="Type number"
    //                                                     className="input input-ghost border-0 w-full text-center"
    //                                                     style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                                 />
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
    //             <div className='text-2xl tracking-tight place-items-center'>Demographic</div>
    //         </div>
    //         <div className="m-0 p-0">
    //             {/* row 1 */}
    //             {/* <div className="md:flex lg:flex w-full">
    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary place-items-center">

    //                     <div className="grid flex-grow w-1/4 pl-5">
    //                         *Last Name:
    //                     </div>
    //                     <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
    //                         <div className="p-inputgroup flex-1">
    //                             <InputText
    //                                 type="text"
    //                                 name='lastname'
    //                                 placeholder="Type Last Name"
    //                                 value={requestEditClient.last_name}
    //                                 onChange={(e) => handleChangeFormrequestEditClient("last_name", e.target.value)}
    //                                 className="input input-ghost w-full text-center"
    //                                 style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                 onFocus={(e) => e.currentTarget.select()}
    //                             />
    //                         </div>
    //                     </div>

    //                 </div>
    //                 <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
    //                     <div className="flex w-full place-items-center">
    //                         <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                             <div className="flex w-full place-items-center p-0 m-0">

    //                                 <div className="grid w-2/4 pl-4">
    //                                     *First Name:
    //                                 </div>

    //                                 <div className="grid w-2/4">
    //                                     <div className="p-inputgroup flex-1">
    //                                         <InputText
    //                                             type="text"
    //                                             name='firstname'
    //                                             placeholder="Type First Name"
    //                                             value={requestEditClient.first_name}
    //                                             onChange={(e) => handleChangeFormrequestEditClient("first_name", e.target.value)}
    //                                             className="input input-ghost w-full text-center"
    //                                             style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                             onFocus={(e) => e.currentTarget.select()}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="flex grid w-2/4 p-1">
    //                             <div className="flex w-full place-items-center">
    //                                 <div className="flex w-full place-items-center">

    //                                     <div className="grid w-2/5">
    //                                         *DOB:
    //                                     </div>
    //                                     <div className="grid w-3/5">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <InputMask
    //                                                 id="Dob"
    //                                                 mask="99/99/9999"
    //                                                 placeholder="Type Number"
    //                                                 value={requestEditClient.dob}
    //                                                 onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("dob", e.target.value ?? "")}
    //                                                 className="input input-ghost border-0 w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}
    //             {/* row 2 */}
    //             {/* <div className="md:flex lg:flex w-full">
    //                 <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center p-0 m-0">
    //                                     <div className="grid w-2/4 pl-4">
    //                                         *Age:
    //                                     </div>
    //                                     <div className="grid w-2/4">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <InputText
    //                                                 tooltip="Age is calculated by the system from the date of birth"
    //                                                 tooltipOptions={{ position: 'top' }}
    //                                                 type="text"
    //                                                 name='firstname'
    //                                                 placeholder="Type First Name"
    //                                                 value={age.toString()}
    //                                                 className="input input-ghost w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                             />

    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center">
    //                                     <div className="flex w-full place-items-center">
    //                                         <div className="grid w-2/4 pl-1">
    //                                             SS #:
    //                                         </div>
    //                                         <div className="grid w-3/4">
    //                                             <InputMask
    //                                                 id="ss"
    //                                                 mask="999-99-9999"
    //                                                 placeholder="Type Number"
    //                                                 value={requestEditClient.ss}
    //                                                 onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("ss", e.target.value ?? "")}
    //                                                 className="input input-ghost border-0 w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
    //                                             >
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center p-0 m-0">
    //                                     <div className="grid w-2/4 pl-4">
    //                                         *Sex:
    //                                     </div>
    //                                     <div className="grid w-2/4">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <select
    //                                                 value={requestEditClient.sexo ?? "Female"}
    //                                                 onChange={(e) => handleChangeFormrequestEditClient("sexo", e.target.value ?? "Female")}
    //                                                 className="input input-ghost border-0 w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                             >
    //                                                 <option value="Female" selected>Female</option>
    //                                                 <option value="Male">Male</option>
    //                                             </select>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="flex grid w-2/4 p-1">
    //                                 <div className="flex w-full place-items-center">
    //                                     <div className="flex w-full place-items-center">

    //                                         <div className="grid w-2/5">
    //                                             Race:
    //                                         </div>
    //                                         <div className="grid w-3/5">
    //                                             <div className="p-inputgroup flex-1">
    //                                                 <select
    //                                                     value={requestEditClient.race ?? "white"}
    //                                                     onChange={(e) => handleChangeFormrequestEditClient("race", e.target.value ?? "white")}
    //                                                     className="input input-ghost border-0 w-full text-center"
    //                                                     style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                                 >
    //                                                     <option value="White" selected>White</option>
    //                                                     <option value="Hispanic and Latino">Hispanic and Latino</option>
    //                                                     <option value="Black">Back</option>
    //                                                     <option value="Asian">Asian</option>
    //                                                     <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
    //                                                     <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
    //                                                 </select>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}
    //             {/* row 3 */}
    //             {/* <div className="md:flex lg:flex w-full">
    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary place-items-center">

    //                     <div className="grid flex-grow w-2/4 pl-5">
    //                         *Address:
    //                     </div>
    //                     <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-full p-1 pl-0">
    //                         <div className="p-inputgroup flex-1">
    //                             <InputText
    //                                 type="text"
    //                                 name='Address'
    //                                 placeholder="Type Address"
    //                                 value={requestEditClient.address}
    //                                 onChange={(e) => handleChangeFormrequestEditClient("address", e.target.value)}
    //                                 className="input input-ghost w-full text-center"
    //                                 style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                 onFocus={(e) => e.currentTarget.select()}
    //                             />
    //                         </div>
    //                     </div>

    //                 </div>
    //                 <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
    //                     <div className="flex w-full place-items-center">
    //                         <div className="flex grid border-r-2 border-primary w-2/4 p-1">
    //                             <div className="flex w-full place-items-center p-0 m-0">

    //                                 <div className="grid w-2/4 pl-4">
    //                                     City/State:
    //                                 </div>

    //                                 <div className="grid w-2/4">
    //                                     <div className="p-inputgroup flex-1">
    //                                         <InputText
    //                                             type="text"
    //                                             name='state'
    //                                             placeholder="Type State"
    //                                             value={requestEditClient.state}
    //                                             onChange={(e) => handleChangeFormrequestEditClient("state", e.target.value)}
    //                                             className="input input-ghost w-full text-center"
    //                                             style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="flex grid w-2/4 p-1">
    //                             <div className="flex w-full place-items-center">
    //                                 <div className="flex w-full place-items-center">

    //                                     <div className="grid w-2/5">
    //                                         Zip Code:
    //                                     </div>
    //                                     <div className="grid w-3/5">
    //                                         <div className="p-inputgroup flex-1">
    //                                             <InputMask
    //                                                 id="zip"
    //                                                 value={requestEditClient.zip_code}
    //                                                 onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditClient("zip_code", e.target.value ?? "")}
    //                                                 mask="99999"
    //                                                 placeholder="Type code"
    //                                                 className="input input-ghost border-0 w-full text-center"
    //                                                 style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}

    //             {/* row 4 */}
    //             {/* <div className="flex w-full"> */}

    //             {/* <div className="flex w-full border-b-2 border-primary"> */}

    //             {/* <div className="md:flex lg:flex w-full border-b-1 border-primary place-items-center">

    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 place-items-center lg:border-r-1 md:border-r-2 border-primary p-1">
    //                     <div className="flex w-full place-items-center p-0 m-0">
    //                         <div className="flex w-2/4 pl-4 ">
    //                             Phone:
    //                         </div>
    //                         <div className="flex w-4/5">
    //                             <div className="p-inputgroup flex-1">
    //                                 <InputMask
    //                                     id="phone"
    //                                     mask="(999) 999-9999"
    //                                     placeholder="Type Number"
    //                                     value={requestEditClient.phone}
    //                                     onChange={(e) => handleChangeFormrequestEditClient("phone", e.target.value ?? "")}
    //                                     className="input input-ghost border-0 w-full text-center"
    //                                     style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 place-items-center lg:border-r-1 md:border-r-2 border-primary p-1">
    //                     <div className="flex w-full place-items-center p-0 m-0">
    //                         <div className="grid w-2/4 pl-4">
    //                             *School/Work:
    //                         </div>
    //                         <div className="grid w-4/5">
    //                             <div className="p-inputgroup flex-1">
    //                                 <InputText
    //                                     type="text"
    //                                     placeholder="Type Name School"
    //                                     value={requestEditClient.school}
    //                                     onChange={(e) => handleChangeFormrequestEditClient("school", e.target.value ?? "")}
    //                                     className="input input-ghost border-0 w-full text-center"
    //                                     style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
    //                                 >
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 place-items-center border-r-1 border-primary p-1">
    //                     <div className="flex w-full place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="grid w-2/5 pl-4">
    //                                 Language:
    //                             </div>

    //                             <div className="grid w-3/5">
    //                                 <div className="p-inputgroup flex-1">
    //                                     <InputText
    //                                         type="text"
    //                                         name='language'
    //                                         placeholder="Type Language"
    //                                         value={requestEditClient.lenguage}
    //                                         onChange={(e) => handleChangeFormrequestEditClient("lenguage", e.target.value)}
    //                                         className="input input-ghost w-full text-center"
    //                                         style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                         onFocus={(e) => e.currentTarget.select()}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}
    //             {/* </div> */}
    //             {/* </div> */}

    //             {/* row 5 */}
    //             <div className="md:flex lg:flex w-full border-b-1 border-primary place-items-center">
    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 lg:border-r-2 md:border-r-2 place-items-center border-r-1 border-primary p-1">
    //                     <div className="flex w-full place-items-center">
    //                         {/* <div className="flex w-2/4 p-1"> */}
    //                         <div className="flex w-full place-items-center m-0 border-primary">
    //                             <div className="flex w-2/5 pl-4">
    //                                 Legal Guardian:
    //                             </div>
    //                             <div className="grid w-3/5">
    //                                 <div className="p-inputgroup flex-1">
    //                                     <InputText
    //                                         type="text"
    //                                         name='legal_guardian'
    //                                         placeholder="Type Name"
    //                                         value={requestEditClient.legal_guardian}
    //                                         onChange={(e) => handleChangeFormrequestEditClient("legal_guardian", e.target.value)}
    //                                         className="input input-ghost w-full text-center"
    //                                         style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                         onFocus={(e) => e.currentTarget.select()}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         {/* </div> */}

    //                     </div>
    //                 </div>
    //                 {/* <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary"> */}
    //                 {/* <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center"> */}
    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 lg:border-r-2 md:border-r-2 place-items-center border-r-1 border-primary p-1">
    //                     <div className="flex w-full place-items-center p-0 m-0">
    //                         <div className="grid w-2/4 pl-4">
    //                             Relationship:
    //                         </div>
    //                         <div className="grid w-3/4">
    //                             <div className="p-inputgroup flex-1">
    //                                 <InputText
    //                                     type="text"
    //                                     name='fullname'
    //                                     placeholder="Type Relation"
    //                                     value={requestEditClient.relationship}
    //                                     onChange={(e) => handleChangeFormrequestEditClient("relationship", e.target.value)}
    //                                     className="input input-ghost w-full text-center"
    //                                     style={{ backgroundColor: "#e5ecfc", border: 0 }}
    //                                     onFocus={(e) => e.currentTarget.select()}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 place-items-center border-r-1 border-primary p-1">
    //                     <div className="flex w-full place-items-center">
    //                         <div className="flex w-full place-items-center">
    //                             <div className="grid w-2/5 pl-4">
    //                                 Phone:
    //                             </div>

    //                             <div className="grid w-3/5">
    //                                 <div className="p-inputgroup flex-1">
    //                                     <InputMask
    //                                         id="Dob"
    //                                         mask="(999) 999-9999"
    //                                         placeholder="Type Number"
    //                                         value={requestEditClient.cell_phone_guardian}
    //                                         onChange={(e) => handleChangeFormrequestEditClient("cell_phone_guardian", e.target.value ?? "")}
    //                                         className="input input-ghost border-0 w-full text-center"
    //                                         style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
    //                                     >
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 {/* </div> */}
    //                 {/* </div> */}
    //             </div>
    //         </div>
    //         {/* TODO INSURANCE */}
    //         <InsuranceInformation
    //             onChangeFormRequestEditSure={handleChangeFormrequestEditSure}
    //             onChangeFormrequestEditClient={handleChangeFormrequestEditClient}
    //             scm={scmInfo?.scm}
    //         />
    //         {/* Section Medical */}
    //         <MedicalInformations
    //             onChangeFormRequestEditMedical={handleChangeFormrequestEditMedical}
    //             scm={scmInfo?.scm}
    //             data={requestEditMedical}
    //         />
    //         {/* Section mental */}
    //         <MentalInformations
    //             onChangeFormscmMental={handleChangeFormrequestEditMental}
    //             scm={scmInfo?.scm}
    //             data={requestEditMental}
    //         />

    //     </div>

    //     <ScrollTop
    //         target="parent"
    //         pt={{
    //             root: { className: 'bg-orange-400' }
    //         }}
    //     />
    // </Dialog>

    <Dialog
      // header={`Electronic Health Record - Admission ${num}`}
      header={"CERTIFICATION REVIEW"}
      visible={true}
      maximizable
      resizable
      style={{ width: "80vw" }}
      onHide={() => closed()}
    // footer={footerContent}
    >
      {/* <Certification active={active} relad={relad} scm={scmInfo?.scm} /> */}
    </Dialog>
  );
};

type Props = {
  active?: Active;
  show?: boolean;
  scm?: ServiceCMActive;
  num?: number;
  relad(): void;
  closed(): void;
};
export { ClientFileReview };
