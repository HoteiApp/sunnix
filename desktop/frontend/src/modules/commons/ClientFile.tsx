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
import { Badge } from 'primereact/badge';
// -- COMMONs
import { useCreatePdf } from "../profile/hooks/core/coreCreatePDF";
import { useLoadDocsS3 } from "../profile/hooks";
import { CalculateAge, CalculateDateFormat } from "../commons";

import { Block } from './component/block';
import { Evaluations } from './evaluations/evaluations';
import { Miscellaneous } from './miscellaneous/miscellaneous';

import {
  useCoreRequestEditSCMClient,
  useCoreClientSCM,
} from "../profile/hooks";
// -- Types


import {
  ServiceCMActive,
  FormRequestEditClient,
  // FromEditScmSure,
  FormEditMedical,
  FormEditMental,
  Client,
  Active,
  UrlDocsS3
} from "../../models";
// -- DOCs
// Connsents
import { InformedConnsent } from "./connsents/informed";
import { ProtectedHealth } from "./connsents/protectedHealth";
import { ClientRights } from "./connsents/clientRights";
import { MedicalInformation } from "./connsents/medicalInformation";
import { TmpConsent } from "./connsents/tmpConsent";
// Certification
import { Certification } from "./certification/certification";
// Assessment
import { Assessment } from "./assessment/assessment";
// Assessment
import { ListNotes } from "../tcm/notes/listNotes";
// Authorizations
import { Authorizations } from "../tcm/authorizations/authorizations";
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

// Docs S3
import { ViewDocsS3 } from "./docsS3/ViewDocsS3";

// import { Addendums } from "./sp/addendoms";
// -- Other Modules
import SignatureCanvas, { SignatureCanvasRef } from "react-signature-canvas";
// -- New Struct
import { VoiceRecorder } from "../commons"
import { classNames } from "primereact/utils";


const ClientFile = ({ active, show, client, scm, num, relad, closed }: Props) => {
  const { createPDF, isUpdatingNewClient } = useCreatePdf();
  const { loadDocs } = useLoadDocsS3();
  // -- Get SCM Client
  const { scmInfo, reloadInfoSCM } = useCoreClientSCM({
    id: scm?.id.toString(),
  });

  const { addRequestEditClient } = useCoreRequestEditSCMClient(relad);
  // -- Info general
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
  const [visibleConsent, setVisibleConsent] = useState<boolean>(false);
  const [consent, setConsent] = useState<string>("Informed");

  //  -- Certification
  const [visibleCertification, setVisibleCertification] =
    useState<boolean>(false);
  //  -- Assessment
  const [visibleAssessment, setVisibleAssessment] = useState<boolean>(false);
  //  -- Authorizations
  const [visibleAuthorizations, setVisibleAuthorizations] = useState<boolean>(false);
  //  -- Notes
  const [visibleNotes, setVisibleNotes] = useState<boolean>(false);
  //  -- Service Plan
  // const ViewOptions = ["Edit", "PreView"];
  const [view, setView] = useState<string>("Edit");
  const [visibleSp, setVisibleSp] = useState<boolean>(false);
  const [visibleAddesdums, setVisibleAddesdums] = useState<boolean>(false);
  const [visibleReview, setVisibleReview] = useState<boolean>(false);
  const [visibleAddReview, setVisibleAddReview] = useState<boolean>(false);
  const [visibleClosing, setVisibleClosing] = useState<boolean>(false);
  // -- File Eval
  const [visibleFileEval, setVisibleFileEval] = useState<boolean>(false);
  const [fileEval, setFileEval] = useState<string>("");

  // --File Miscellaneous
  const [visibleFileMisc, setVisibleFileMisc] = useState<boolean>(false);
  const [fileMisc, setFileMisc] = useState<string>("");
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
  const [visibleViewDocsS3, setVisibleViewDocsS3] = useState<boolean>(false);
  const [headerViewDocsS3, setHeaderViewDocsS3] = useState<string>("");
  const [listUrl, setListUrl] = useState<UrlDocsS3[]>([]);

  // ------------------
  const [numEvalPsych, setNumEvalPsych] = useState<number>(0);
  const [urlEvalPsych, setUrlEvalPsych] = useState<UrlDocsS3[]>([]);

  const [numEvalPCP, setNumEvalPCP] = useState<number>(0);
  const [urlEvalPCP, setUrlEvalPCP] = useState<UrlDocsS3[]>([]);

  const [numEvalBIO, setNumEvalBIO] = useState<number>(0);
  const [urlEvalBIO, setUrlEvalBIO] = useState<UrlDocsS3[]>([]);

  const [numEvalPN, setNumEvalPN] = useState<number>(0);
  const [urlEvalPN, setUrlEvalPN] = useState<UrlDocsS3[]>([]);

  const [numEvalOther, setNumEvalOther] = useState<number>(0);
  const [urlEvalOther, setUrlEvalOther] = useState<UrlDocsS3[]>([]);

  // ------------------
  const [numMiscClientID, setNumMiscClientID] = useState<number>(0);
  const [urlMiscClientID, setUrlMiscClientID] = useState<UrlDocsS3[]>([]);

  const [numMiscMedicaID, setNumMiscMedicaID] = useState<number>(0);
  const [urlMiscMedicaID, setUrlMiscMedicaID] = useState<UrlDocsS3[]>([]);

  const [numMiscMedicare, setNumMiscMedicare] = useState<number>(0);
  const [urlMiscMedicare, setUrlMiscMedicare] = useState<UrlDocsS3[]>([]);

  const [numMiscInsurance, setNumMiscInsurance] = useState<number>(0);
  const [urlMiscInsurance, setUrlMiscInsurance] = useState<UrlDocsS3[]>([]);

  const [numMiscPNPsych, setNumMiscPNPsych] = useState<number>(0);
  const [urlMiscPNPsych, setUrlMiscPNPsych] = useState<UrlDocsS3[]>([]);

  const [numMiscPNPCP, setNumMiscPNPCP] = useState<number>(0);
  const [urlMiscPNPCP, setUrlMiscPNPCP] = useState<UrlDocsS3[]>([]);

  const [numMiscOther, setNumMiscOther] = useState<number>(0);
  const [urlMiscOther, setUrlMiscOther] = useState<UrlDocsS3[]>([]);

  // ------------------
  const menuLeft = useRef<Menu>(null);
  const menuRight = useRef<Menu>(null);
  const menuSp = useRef<Menu>(null);
  const menuEval = useRef<Menu>(null);
  const menuMisc = useRef<Menu>(null);

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
            setVisibleConsent(true);
            setConsent("Informed");
          },
        },
        {
          label: "PHI",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConsent(true);
            setConsent("PHI");
          },
        },
        {
          label: "Client's Rights",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConsent(true);
            setConsent("CR");
          },
        },
        {
          label: "Medical Information Use",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConsent(true);
            setConsent("MIU");
          },
        },
        {
          label: "Consent",
          icon:
            requestEditClient?.sign_client === ""
              ? "pi pi-file-edit"
              : "pi pi-verified",
          command: () => {
            setVisibleConsent(true);
            setConsent("TMP");
          },
        }
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
          // TODO: Aqui ahi que controlar la fecha porque a los 6 meses ahi que activar esta opcion
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
          disabled: scm?.status === "Pending",
          icon: "pi pi-file-edit",
          command: () => {
            setVisibleSp(true);
          },
        },
        {
          label: "Add SP",
          disabled: scmInfo?.scm.sp.signatureSupervisor === "data:image/png;base64,",
          icon: scm?.status === "Pending" ? "pi pi-lock" : "pi pi-file-edit",
          command: () => {
            scm?.status !== "Pending" && setVisibleAddesdums(true);

            // if (toast.current) {
            //     toast.current.show({ severity: 'warn', summary: 'Alert', detail: 'Until you have the Initial Service Plan Authorization you cannot add addendums', life: 3000 });
            // }
          },
        },
        {
          // label: scmInfo?.scm.sp.reviewDate,
          // label: CalculateDateFormat({ date: scmInfo?.scm.sp.developmentDate ?? "", monthsLater: 6 }),
          label: "SP Review",
          disabled: scmInfo?.scm.sp.signatureSupervisor === "data:image/png;base64," || new Date(CalculateDateFormat({ date: scmInfo?.scm.sp.developmentDate ?? "", monthsLater: 6 })) < new Date(),
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
          disabled: scmInfo?.scm.sp.signatureSupervisor === "data:image/png;base64,",
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
        // {
        //   label: "PreView",
        //   icon: "pi pi-eye",
        //   command: () => {
        //     if (toast.current) {
        //       toast.current.show({
        //         severity: "warn",
        //         summary: "PreView",
        //         detail: "Impemented",
        //         life: 3000,
        //       });
        //     }
        //   },
        // },
      ],
    },
  ];


  const itemRenderer = (item) => (
    <div
      className='p-menuitem-content'
      onClick={
        !item.disabled ? item.command : undefined
      }
      style={{ cursor: item.disabled ? 'not-allowed' : 'pointer', opacity: item.disabled ? 0.5 : 1 }}>
      <a className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge > 0 && <Badge className="ml-auto" value={item.badge} />}
        {/* {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>} */}
      </a>
    </div>
  );


  // ---------------
  const itemsEval = [
    {
      label: "Evaluations",
      items: [
        {
          label: 'Psych Eval',
          icon: 'pi pi-folder',
          disabled: numEvalPsych === 0,
          badge: numEvalPsych,
          template: itemRenderer,
          command: () => {
            setListUrl(urlEvalPsych);
            setHeaderViewDocsS3("Psych Evaluations");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "PCP Eval",
          icon: 'pi pi-folder',
          disabled: numEvalPCP === 0,
          badge: numEvalPCP,
          template: itemRenderer,
          command: () => {
            setListUrl(urlEvalPCP);
            setHeaderViewDocsS3("PCP Evaluations");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "BIO Eval",
          icon: 'pi pi-folder',
          disabled: numEvalBIO === 0,
          badge: numEvalBIO,
          template: itemRenderer,
          command: () => {
            setListUrl(urlEvalBIO);
            setHeaderViewDocsS3("BIO Evaluations");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "PN Eval",
          icon: 'pi pi-folder',
          disabled: numEvalPN === 0,
          badge: numEvalPN,
          template: itemRenderer,
          command: () => {
            setListUrl(urlEvalPN);
            setHeaderViewDocsS3("PN Evaluations");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Other Eval",
          icon: 'pi pi-folder',
          disabled: numEvalOther === 0,
          badge: numEvalOther,
          template: itemRenderer,
          command: () => {
            setListUrl(urlEvalOther);
            setHeaderViewDocsS3("Other Evaluations");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Upload files",
          icon: "pi pi-upload",
          command: () => {
            setFileEval("Upload Files");
            setVisibleFileEval(true);
          },
        },
      ],
    },
  ];
  // Miscellaneous
  const itemsMisc = [
    {
      label: "Miscellaneous",
      items: [
        {
          label: "Client's ID",
          icon: 'pi pi-folder',
          disabled: numMiscClientID === 0,
          badge: numMiscClientID,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscClientID);
            setHeaderViewDocsS3("Client's ID");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Medicaid Card",
          icon: 'pi pi-folder',
          disabled: numMiscMedicaID === 0,
          badge: numMiscMedicaID,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscMedicaID);
            setHeaderViewDocsS3("Medicaid Card");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Medicare Card",
          icon: 'pi pi-folder',
          disabled: numMiscMedicare === 0,
          badge: numMiscMedicare,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscMedicare);
            setHeaderViewDocsS3("Medicare Card");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Insurance Card",
          icon: 'pi pi-folder',
          disabled: numMiscInsurance === 0,
          badge: numMiscInsurance,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscInsurance);
            setHeaderViewDocsS3("Insurance Card");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "PN Psych",
          icon: 'pi pi-folder',
          disabled: numMiscPNPsych === 0,
          badge: numMiscPNPsych,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscPNPsych);
            setHeaderViewDocsS3("PN Psych");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "PN PCP",
          icon: 'pi pi-folder',
          disabled: numMiscPNPCP === 0,
          badge: numMiscPNPCP,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscPNPCP);
            setHeaderViewDocsS3("PN PCP");
            setVisibleViewDocsS3(true);
          },
        },

        {
          label: "Other Docs",
          icon: 'pi pi-folder',
          disabled: numMiscOther === 0,
          badge: numMiscOther,
          template: itemRenderer,
          command: () => {
            setListUrl(urlMiscOther);
            setHeaderViewDocsS3("Other Docs");
            setVisibleViewDocsS3(true);
          },
        },
        {
          label: "Upload files",
          icon: "pi pi-upload",
          command: () => {
            setFileMisc("Upload Files");
            setVisibleFileMisc(true);
          },
        },
      ],
    },
  ];


  // -----------------------------------------------FOOTER here
  const footerContent = (
    <div className="container">
      <div className="row mt-5">
        <div className="flex col-sm-12 col-md-3 col-lg-4">
          <Toast ref={toast}></Toast>
          <>
            {/* <Dicta /> */}
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button
              label="AUTH"
              className={classNames(
                "mr-2",
                scm?.status === "Pending" && "animate-bounce hover:animate-none bg-secondary hover:bg-blue-400"
              )}
              onClick={() => setVisibleAuthorizations(true)}
            />
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
            {/* <Button
                        label="CERTIFICATION"
                        tooltip={scmInfo?.scm.certification.signTcm !== "" ? scmInfo?.scm.certification.signSupervisor !== "" ? scmInfo?.scm.certification.signQA !== "" ? "The document is approved" : "Awaiting QA review" : "Awaiting supervisor review" : "The TCM must sign the document"}
                        tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
                        icon={scmInfo?.scm.certification.signTcm !== "" ? scmInfo?.scm.certification.signSupervisor !== "" ? scmInfo?.scm.certification.signQA !== "" ? "pi pi-verified" : "pi pi-hourglass" : "pi pi-hourglass" : "pi pi-file-edit"}
                        className="mr-2"
                        onClick={() => { setVisibleCertification(true) }}
                    /> */}
          </>

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
            disabled={scm?.status === "Pending"}
            icon={
              scmInfo?.scm.certification.signtcm !== "data:image/png;base64,"
                ? scmInfo?.scm.certification.signsupervisor !== "data:image/png;base64,"
                  ? "pi pi-verified"
                  : "pi pi-hourglass"
                : "pi pi-file-edit"
            }
            onClick={(event) => {
              if (menuRight.current) {
                menuRight.current.toggle(event);
              }
            }}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
          <Button
            label="ASSESSMENT"
            disabled={scm?.status === "Pending" || scmInfo?.scm.certification.signsupervisor === "data:image/png;base64,"}
            icon={
              scmInfo?.scm.assessment.signatureTcm !== "data:image/png;base64,"
                ? scmInfo?.scm.assessment.signatureSupervisor !== "data:image/png;base64,"
                  ? "pi pi-verified"
                  : "pi pi-hourglass"
                : "pi pi-file-edit"
            }
            tooltip={
              scmInfo?.scm.assessment.signatureTcm !== "data:image/png;base64,"
                ? scmInfo?.scm.assessment.signatureSupervisor !== "data:image/png;base64,"
                  ? scmInfo?.scm.assessment.signatureQa !== "data:image/png;base64,"
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
            disabled={scm?.status === "Pending" || scmInfo?.scm.assessment.signatureSupervisor === "data:image/png;base64,"}
            tooltip={
              scmInfo?.scm.assessment.signatureSupervisor !== "data:image/png;base64,"
                ? "Service Plan"
                : "The assessment must be passed"
            }
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            className="mr-2"
            onClick={(event) => {
              if (menuSp.current) {
                menuSp.current.toggle(event);
              }
            }}
            aria-controls="popup_menu_sp"
            aria-haspopup
          />



          {/* <Button
            label="COMUNICATION LOGS"
            disabled={scm?.status === "Pending"}
            className="mr-2"
            onClick={() => setVisibleAssessment(true)}
          /> */}
          {scm?.status !== "Pending" && (
            <Button
              label="NOTES"
              className="mr-2"
              onClick={() => setVisibleNotes(true)}
            />)}


          <Menu model={itemsEval} popup ref={menuEval} id="popup_menu_eval" />
          <Button
            label="EVAL"
            // disabled={scm?.status === "Pending" || scmInfo?.scm.assessment.signatureSupervisor === "data:image/png;base64,"}
            tooltip={"Evaluations"}
            tooltipOptions={{
              position: "bottom",
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            className="mr-2"
            onClick={(event) => {
              if (menuEval.current) {
                menuEval.current.toggle(event);
              }
            }}
            aria-controls="popup_menu_eval"
            aria-haspopup
          />
          <Menu model={itemsMisc} popup ref={menuMisc} id="popup_menu_misc" />
          <Button
            label="MISC"
            className="mr-2"
            onClick={(event) => {
              if (menuMisc.current) {
                menuMisc.current.toggle(event);
              }
            }}
            aria-controls="popup_menu_misc"
            aria-haspopup
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

          {/* Voices Note */}
          <VoiceRecorder
            relad={relad}
            active={active}
            to={scmInfo?.scm.tcm_id.toString() || "0"}
            module="tcm"
            component="admission"
            id_component={scm?.id.toString() || "0"}
            mode='private'
          />
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

  const headerDialogDetails = (showConsent: boolean, orientation?: string) => {
    const renderIcons = () => (
      <div className="w-full text-right place-items-top">
        <i
          className="pi pi-file-pdf hover:text-orange-500 cursor-pointer mr-2"
          onClick={() => {
            createPDF({
              htmlDiv: content,
              page_size: "A4",
              orientation: orientation === undefined ? "vertical" : orientation
            });
          }}
        />
      </div>
    );
    const langSelect = (
      <SelectButton
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
        }}
        options={LangOptions}
        className="input input-ghost w-full p-0"
      />
    );
    return (
      <div className="w-full flex place-items-top justify-center">
        {showConsent && langSelect}
        {renderIcons()}
      </div>
    );
  };

  const [noteHelp, setNoteHelp] = useState<boolean>(false);

  const headerNotes = (
    <div className="flex w-full place-items-center">
      <div className="flex w-1/3">
        <div className="pl-2 pr-2">
          <b>Notes List</b>
        </div>
      </div>
      <div className="w-2/3 text-right">
        <i
          className="pi pi-question-circle animate-blink cursor-pointer"
          onClick={() => {
            setNoteHelp(true);
          }}
        />
      </div>
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



  // -------------------------------------------------------------
  const [content, setContent] = useState<string>('');
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // -------------------------------------------------------------




  const headerClientFile = () => {
    return (
      <div className="w-full flex">
        <div className="w-1/3">
          Electronic Health Record
          <div className="w-full flex" style={{ fontSize: "14px" }}>
            <div className="flex mr-2">
              MR: {client?.mr}
            </div>
            <div>
              {scmInfo?.scm.Demografic.first_name} {scmInfo?.scm.Demografic.last_name}
            </div>
          </div>
        </div>
        <div className="w-1/3 flex" style={{ fontSize: "14px" }}>
          Admission: {num} - {scm?.status}
        </div>
        <div className="w-1/3 flex" style={{ fontSize: "14px" }}>
          {scm?.status === "Open" && <div className="w-full" style={{ fontSize: "12px" }}>
            Remaining Units
            <div className="w-full flex items-center">
              {(scmInfo?.scm.sure_active.unit ?? 0) - (scmInfo?.scm.units_consumed ?? 0)}
              <progress
                className="progress progress-info w-4/5 ml-2 mr-2"
                value={(scmInfo?.scm.sure_active.unit ?? 0) - (scmInfo?.scm.units_consumed ?? 0)}
                max={scmInfo?.scm.sure_active.unit}></progress>
              of {scmInfo?.scm.sure_active.unit}
            </div>

          </div>}
        </div>

      </div>
    )
  }

  const signClientWindows = () => {
    setSignClient(true);
  };
  const signGuardianWindows = () => {
    setSignLegalGuardian(true);
  };


  // TODO: ----Acomodar Code-------------------

  // ------------------------
  const LoadDocs = async (folder, category: string) => {
    try {
      const data = await loadDocs({
        paht: `clients/${scmInfo?.scm.Demografic.client_id.toString()}/${scm?.id.toString()}/${folder}/${category}`,
      });
      return data;
    } catch (error) {
      console.error('Error loading voice data:', error);
      return null;
    }
  }
  // ------------------------
  // ------------------------
  // TODO: Esta funsion es para cargar por carpeta los documentos del s3
  const loadFilesS3 = () => {
    // Load Evaluations Files
    let dataEvalPsych = LoadDocs("eval", "Psychiatrist");
    dataEvalPsych.then((data) => {
      setNumEvalPsych(data?.total ?? 0);
      setUrlEvalPsych(data?.urls ?? []);
    });

    // -----------------------
    let dataEvalPCP = LoadDocs("eval", "PCP");
    dataEvalPCP.then((data) => {
      setNumEvalPCP(data?.total ?? 0);
      setUrlEvalPCP(data?.urls ?? []);
    });
    // -----------------------
    let dataEvalBIO = LoadDocs("eval", "BIO");
    dataEvalBIO.then((data) => {
      setNumEvalBIO(data?.total ?? 0);
      setUrlEvalBIO(data?.urls ?? []);
    });
    // -----------------------
    let dataEvalPN = LoadDocs("eval", "PN");
    dataEvalPN.then((data) => {
      setNumEvalPN(data?.total ?? 0);
      setUrlEvalPN(data?.urls ?? []);
    });
    // -----------------------
    let dataEvalOther = LoadDocs("eval", "Other");
    dataEvalOther.then((data) => {
      setNumEvalOther(data?.total ?? 0);
      setUrlEvalOther(data?.urls ?? []);
    });

    // -----------------------
    // --MIsc ---------------------
    // -----------------------
    let dataMiscClientId = LoadDocs("misc", "ClientsID");
    dataMiscClientId.then((data) => {
      setNumMiscClientID(data?.total ?? 0);
      setUrlMiscClientID(data?.urls ?? []);
    });

    let dataMiscMedicaid = LoadDocs("misc", "Medicaid Card");
    dataMiscMedicaid.then((data) => {
      setNumMiscMedicaID(data?.total ?? 0);
      setUrlMiscMedicaID(data?.urls ?? []);
    });

    let dataMiscMedicare = LoadDocs("misc", "Medicare Card");
    dataMiscMedicare.then((data) => {
      setNumMiscMedicare(data?.total ?? 0);
      setUrlMiscMedicare(data?.urls ?? []);
    });

    let dataMiscInsurance = LoadDocs("misc", "Insurance Card");
    dataMiscInsurance.then((data) => {
      setNumMiscInsurance(data?.total ?? 0);
      setUrlMiscInsurance(data?.urls ?? []);
    });

    let dataMiscPNPsych = LoadDocs("misc", "PN Psych");
    dataMiscPNPsych.then((data) => {
      setNumMiscPNPsych(data?.total ?? 0);
      setUrlMiscPNPsych(data?.urls ?? []);
    });

    let dataMiscPNPCP = LoadDocs("misc", "PN PCP");
    dataMiscPNPCP.then((data) => {
      setNumMiscPNPCP(data?.total ?? 0);
      setUrlMiscPNPCP(data?.urls ?? []);
    });

    let dataMiscOther = LoadDocs("misc", "Other");
    dataMiscOther.then((data) => {
      setNumMiscOther(data?.total ?? 0);
      setUrlMiscOther(data?.urls ?? []);
    });
  }


  useEffect(() => {
    reloadInfoSCM();
    loadFilesS3();
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

    // ------------------- Data S3
    loadFilesS3();

  }, [scmInfo]);

  return (
    <Dialog
      header={headerClientFile}
      visible={true}
      maximizable
      resizable
      style={{ width: "80vw" }}
      onHide={() => closed()}
      footer={footerContent}
    >
      <Block
        active={scm?.status === "Close" || active?.activeUser?.User?.roll === "TCM"}
        copy
      >
        <Dialog
          header="Create my electronic signature"
          visible={signClient}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setSignClient(false)}
          footer={footerSign}
        >
          <p className="m-0" style={{ overflow: "auto" }}>
            "By clicking the "Submit" button, you are giving your consent to
            electronically sign the documents generated by our system. The
            electronic signature has the same legal validity as a paper signature
            and is recognized as such by applicable laws and regulations .
            <br />
            <br />
            By electronically signing these documents, you agree that these
            documents are valid and legally binding on all parties involved. You
            further acknowledge that you have read and understood the terms and
            conditions set forth in these documents.
            <br />
            <br />
            If you have any questions about the electronic signature process or
            the documents you are asked to sign, please contact our support team.
            <br />
            <br />
            Please try to make the signature as legible as possible:
            <div className="w-full">
              <SignatureCanvas
                ref={signatureClientRef}
                canvasProps={{
                  style: {
                    width: "100%",
                    height: 200,
                    backgroundColor: "#e5ecfc",
                    borderColor: "#fff",
                  },
                }}
                minWidth={2}
                maxWidth={3}
                onEnd={() => {
                  handleChangeFormrequestEditClient(
                    "sign_client",
                    signatureClientRef.current
                      .getTrimmedCanvas()
                      .toDataURL("image/png")
                  );
                  setImageSignClient(
                    signatureClientRef.current
                      .getTrimmedCanvas()
                      .toDataURL("image/png")
                  );
                }}
              />
            </div>
            <button
              onClick={() => {
                signatureClientRef.current.clear();
                handleChangeFormrequestEditClient("sign_client", "");
                setImageSignClient("");
              }}
            >
              {" "}
              Clear{" "}
            </button>
          </p>
        </Dialog>
        
        {/* Authorizations */}
        <Dialog
          header="AUTHORIZATIONS"
          visible={visibleAuthorizations}
          maximizable
          draggable={false}
          modal={true}
          style={{ width: "95vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleAuthorizations(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="authorizationsList"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Authorizations
            scm={scmInfo?.scm ?? undefined}
            relad={relad}
            active={active}
            client={client}
          />
        </Dialog>
        {/* Connsents */}
        <Dialog
          header={headerDialogDetails(true)}
          visible={visibleConsent}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleConsent(false)}
        >
          {/* -------------------- */}
          {consent === "Informed" && <InformedConnsent
            data={scmInfo?.scm}
            mr={client?.mr || 0}
            lang={lang}
            setSignClient={signClientWindows}
            setSignLegalGuardian={signGuardianWindows}
            onContentChange={handleContentChange}
          />}

          {/* -------------------- */}
          {consent === "PHI" && <ProtectedHealth
            data={scmInfo?.scm}
            mr={client?.mr || 0}
            lang={lang}
            setSignClient={signClientWindows}
            setSignLegalGuardian={signGuardianWindows}
            onContentChange={handleContentChange}
          />}
          {/* -------------------- */}
          {consent === "CR" && <ClientRights
            data={scmInfo?.scm}
            mr={client?.mr || 0}
            lang={lang}
            setSignClient={signClientWindows}
            setSignLegalGuardian={signGuardianWindows}
            onContentChange={handleContentChange}

          />}
          {/* -------------------- */}
          {consent === "MIU" && <MedicalInformation
            data={scmInfo?.scm}
            mr={client?.mr || 0}
            lang={lang}
            setSignClient={signClientWindows}
            setSignLegalGuardian={signGuardianWindows}
            onContentChange={handleContentChange}

          />}
          {/* -------------------- */}
          {consent === "TMP" && <TmpConsent
            mr={client?.mr || 0}
            scm={scmInfo?.scm}
            relad={relad}
            onContentChange={handleContentChange}
          />}
        </Dialog>

        {/* Certification */}
        <Dialog
          header={headerDialogDetails(false)}
          visible={visibleCertification}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleCertification(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="Certification"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Certification mr={client?.mr} active={active} relad={relad} scm={scmInfo?.scm} onContentChange={handleContentChange} />
        </Dialog>

        {/* Assessment */}
        <Dialog
          visible={visibleAssessment}
          resizable
          modal={false}
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleAssessment(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="Assessment"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Assessment relad={relad} mr={client?.mr} active={active} scm={scmInfo?.scm} />
        </Dialog>

        {/* Service Plan */}
        <Dialog
          visible={visibleSp}
          resizable
          modal={false}
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleSp(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="sp"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Sp active={active} mr={client?.mr} relad={relad} scm={scmInfo?.scm} view={view} />
        </Dialog>

        <Dialog
          header={""}
          visible={visibleAddesdums}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleAddesdums(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="Addendums"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Addendums relad={relad} mr={client?.mr} scm={scmInfo?.scm} view={view} />
        </Dialog>

        <Dialog
          header={""}
          visible={visibleReview}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleReview(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="Review"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Review relad={relad} mr={client?.mr} scm={scmInfo?.scm} view={view} />
        </Dialog>

        <Dialog
          header={""}
          visible={visibleAddReview}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleAddReview(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="AddendumsReview"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <AddendumsReview relad={relad} mr={client?.mr} scm={scmInfo?.scm} view={view} />
        </Dialog>

        <Dialog
          header={""}
          visible={visibleClosing}
          maximizable
          style={{ width: "80vw" }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleClosing(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="Closing"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <Closing relad={relad} mr={client?.mr} scm={scmInfo?.scm} view={view} />
        </Dialog>

        {/* Notes */}
        <Dialog
          header={headerNotes}
          visible={visibleNotes}
          resizable
          modal={false}
          style={{
            width: "99vw",
          }}
          breakpoints={{ "960px": "70vw", "641px": "90vw" }}
          onHide={() => setVisibleNotes(false)}
          footer={
            <VoiceRecorder
              relad={relad}
              active={active}
              to={scmInfo?.scm.tcm_id.toString() || "0"}
              module="tcm"
              component="notesList"
              id_component={scm?.id.toString() || "0"}
              mode='private'
            />
          }
        >
          <ListNotes
            scm={scmInfo?.scm ?? undefined}
            relad={relad}
            active={active}
            noteHelp={noteHelp}
            setNoteHelp={setNoteHelp}
          />
        </Dialog>


        {/* Evaluation */}
        <Dialog
          header={`${fileEval} Evaluations`}
          visible={visibleFileEval}
          resizable
          modal={false}
          style={{
            width: "60vw",
          }}
          breakpoints={{ "960px": "70vw", "641px": "70vw" }}
          onHide={() => setVisibleFileEval(false)}
        >
          <Evaluations active={active} relad={relad} scm={scmInfo?.scm} />
        </Dialog>



        {/* Miscellaneous */}
        <Dialog
          header={`${fileMisc} Miscellaneous`}
          visible={visibleFileMisc}
          resizable
          modal={false}
          style={{
            width: "60vw",
          }}
          breakpoints={{ "960px": "60vw", "641px": "60vw" }}
          onHide={() => setVisibleFileMisc(false)}
        // footer={
        //   <VoiceRecorder
        //     relad={relad}
        //     active={active}
        //     to={scmInfo?.scm.tcm_id.toString() || "0"}
        //     module="tcm"
        //     component="filesMisc"
        //     id_component={scm?.id.toString() || "0"}
        //     mode='private'
        //   />
        // }
        >
          <Miscellaneous active={active} relad={relad} scm={scmInfo?.scm} />
        </Dialog>

        {/* Visializar List Docs S3 */}
        <ViewDocsS3
          relad={relad}
          active={active}
          visible={visibleViewDocsS3}
          setVisible={setVisibleViewDocsS3}
          header={headerViewDocsS3}
          listDocsS3={listUrl}
        />

        <div className="m-0 border-2 border-primary">
          <div
            className="p-3"
            style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
          >
            <div className="text-2xl tracking-tight place-items-center">
              Referral Source
            </div>
          </div>
          <div className="m-0 p-0">
            {/* row 1 */}
            <div className="md:flex lg:flex w-full">
              <div className="md:flex lg:md:flex w-full border-b border-primary">
                <div className="flex w-full md:w-2/4 lg:w-2/4 border-b border-primary md:border-b-0 lg:border-b-0 place-items-center">
                  <div className="grid flex-grow w-2/4 pl-5">
                    Referring Agency:
                  </div>
                  <div className="grid  md:border-r lg:border-r border-primary w-3/4 p-1 pl-0">
                    <div className="flex p-inputgroup flex-1">
                      <InputText
                        type="text"
                        name="referringAgency"
                        placeholder="Type Referring Agency"
                        value={requestEditClient.referring_agency}
                        onChange={(e) =>
                          handleChangeFormrequestEditClient(
                            "referring_agency",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                  <div className="grid flex-grow w-2/4 pl-5">
                    Referring Person:
                  </div>
                  <div className="grid border-primary w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                      <InputText
                        type="text"
                        name="referringPerson"
                        placeholder="Type Referring Person"
                        value={requestEditClient.referring_person}
                        onChange={(e) =>
                          handleChangeFormrequestEditClient(
                            "referring_person",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="md:flex lg:flex w-full">
              <div className="md:flex lg:md:flex w-full border-b border-primary">
                <div className="flex w-full md:w-2/4 lg:w-2/4 border-b  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Cell/Phone:</div>

                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            <InputMask
                              id="phone"
                              value={requestEditClient.cell_phone}
                              onChange={(e: InputMaskChangeEvent) =>
                                handleChangeFormrequestEditClient(
                                  "cell_phone",
                                  e.target.value ?? ""
                                )
                              }
                              mask="(999) 999-9999"
                              placeholder="Type number"
                              className="input input-ghost border-0 w-full text-center"
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
                    <div className="flex md:border-r lg:border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5">Fax:</div>
                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              <InputMask
                                id="fax"
                                value={requestEditClient.fax}
                                onChange={(e: InputMaskChangeEvent) =>
                                  handleChangeFormrequestEditClient(
                                    "fax",
                                    e.target.value ?? ""
                                  )
                                }
                                mask="(999) 999-9999"
                                placeholder="Type number"
                                className="input input-ghost border-0 w-full text-center"
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
                    </div>
                  </div>
                </div>

                <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Email:</div>

                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            <InputText
                              type="text"
                              name="email"
                              placeholder="Type Email"
                              value={requestEditClient.email}
                              onChange={(e) =>
                                handleChangeFormrequestEditClient(
                                  "email",
                                  e.target.value ?? ""
                                )
                              }
                              className="input input-ghost w-full text-center"
                              style={{ backgroundColor: "#e5ecfc", border: 0 }}
                              onFocus={(e) => e.currentTarget.select()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5">Date:</div>
                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              <InputMask
                                id="date"
                                value={requestEditClient.date}
                                onChange={(e: InputMaskChangeEvent) =>
                                  handleChangeFormrequestEditClient(
                                    "date",
                                    e.target.value ?? ""
                                  )
                                }
                                mask="99/99/9999"
                                placeholder="Type number"
                                className="input input-ghost border-0 w-full text-center"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-3"
            style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
          >
            <div className="text-2xl tracking-tight place-items-center">
              Demographic
            </div>
          </div>
          <div className="m-0 p-0">
            {/* row 1 */}
            <div className="md:flex lg:flex w-full">
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b border-primary place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">*Last Name:</div>
                <div className="grid  md:border-r lg:border-r border-primary w-3/4 p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    <InputText
                      type="text"
                      name="lastname"
                      placeholder="Type Last Name"
                      value={requestEditClient.last_name}
                      onChange={(e) =>
                        handleChangeFormrequestEditClient(
                          "last_name",
                          e.target.value
                        )
                      }
                      className="input input-ghost w-full text-center"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/4 lg:w-2/4 border-b border-primary">
                <div className="flex w-full place-items-center">
                  <div className="flex border-r border-primary w-2/4 p-1">
                    <div className="flex w-full place-items-center p-0 m-0">
                      <div className="grid w-2/4 pl-4">*First Name:</div>

                      <div className="grid w-2/4">
                        <div className="p-inputgroup flex-1">
                          <InputText
                            type="text"
                            name="firstname"
                            placeholder="Type First Name"
                            value={requestEditClient.first_name}
                            onChange={(e) =>
                              handleChangeFormrequestEditClient(
                                "first_name",
                                e.target.value
                              )
                            }
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/4 p-1">
                    <div className="flex w-full place-items-center">
                      <div className="flex w-full place-items-center">
                        <div className="grid w-2/5">*DOB:</div>
                        <div className="grid w-3/5">
                          <div className="p-inputgroup flex-1">
                            <InputMask
                              id="Dob"
                              mask="99/99/9999"
                              placeholder="Type Number"
                              value={requestEditClient.dob}
                              onChange={(e: InputMaskChangeEvent) =>
                                handleChangeFormrequestEditClient(
                                  "dob",
                                  e.target.value ?? ""
                                )
                              }
                              className="input input-ghost border-0 w-full text-center"
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
                  </div>
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="md:flex lg:flex w-full">
              <div className="md:flex lg:md:flex w-full border-b border-primary">
                <div className="flex w-full md:w-2/4 lg:w-2/4 border-b  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">*Age:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            <InputText
                              tooltip="Age is calculated by the system from the date of birth"
                              tooltipOptions={{ position: "top" }}
                              type="text"
                              name="firstname"
                              placeholder="Type First Name"
                              value={age.toString()}
                              className="input input-ghost w-full text-center"
                              style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:border-r lg:border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/4 pl-1">SS #:</div>
                          <div className="grid w-3/4">
                            <InputMask
                              id="ss"
                              mask="999-99-9999"
                              placeholder="Type Number"
                              value={requestEditClient.ss}
                              onChange={(e: InputMaskChangeEvent) =>
                                handleChangeFormrequestEditClient(
                                  "ss",
                                  e.target.value ?? ""
                                )
                              }
                              className="input input-ghost border-0 w-full text-center"
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
                  </div>
                </div>

                <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">*Sex:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            <select
                              value={requestEditClient.sexo ?? "Female"}
                              onChange={(e) =>
                                handleChangeFormrequestEditClient(
                                  "sexo",
                                  e.target.value ?? "Female"
                                )
                              }
                              className="input input-ghost border-0 w-full text-center"
                              style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            >
                              <option value="Female" selected>
                                Female
                              </option>
                              <option value="Male">Male</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5">Race:</div>
                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              <select
                                value={requestEditClient.race ?? "white"}
                                onChange={(e) =>
                                  handleChangeFormrequestEditClient(
                                    "race",
                                    e.target.value ?? "white"
                                  )
                                }
                                className="input input-ghost border-0 w-full text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                              >
                                <option value="White" selected>
                                  White
                                </option>
                                <option value="Hispanic and Latino">
                                  Hispanic and Latino
                                </option>
                                <option value="Black">Back</option>
                                <option value="Asian">Asian</option>
                                <option value="American Indian or Alaska Native">
                                  American Indian or Alaska Native
                                </option>
                                <option value="Native Hawaiian or Other Pacific Islander">
                                  Native Hawaiian or Other Pacific Islander
                                </option>
                              </select>
                            </div>
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
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b border-primary place-items-center">
                <div className="grid flex-grow w-2/4 pl-5">*Address:</div>
                <div className="grid  md:border-r lg:border-r border-primary w-full p-1 pl-0">
                  <div className="p-inputgroup flex-1">
                    <InputText
                      type="text"
                      name="Address"
                      placeholder="Type Address"
                      value={requestEditClient.address}
                      onChange={(e) =>
                        handleChangeFormrequestEditClient(
                          "address",
                          e.target.value
                        )
                      }
                      className="input input-ghost w-full text-center"
                      style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/4 lg:w-2/4 border-b border-primary">
                <div className="flex w-full place-items-center">
                  <div className="flex border-r border-primary w-2/4 p-1">
                    <div className="flex w-full place-items-center p-0 m-0">
                      <div className="grid w-2/4 pl-4">City/State:</div>

                      <div className="grid w-2/4">
                        <div className="p-inputgroup flex-1">
                          <InputText
                            type="text"
                            name="state"
                            placeholder="Type State"
                            value={requestEditClient.state}
                            onChange={(e) =>
                              handleChangeFormrequestEditClient(
                                "state",
                                e.target.value
                              )
                            }
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-2/4 p-1">
                    <div className="flex w-full place-items-center">
                      <div className="flex w-full place-items-center">
                        <div className="grid w-2/5">Zip Code:</div>
                        <div className="grid w-3/5">
                          <div className="p-inputgroup flex-1">
                            <InputMask
                              id="zip"
                              value={requestEditClient.zip_code}
                              onChange={(e: InputMaskChangeEvent) =>
                                handleChangeFormrequestEditClient(
                                  "zip_code",
                                  e.target.value ?? ""
                                )
                              }
                              mask="99999"
                              placeholder="Type code"
                              className="input input-ghost border-0 w-full text-center"
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
                  </div>
                </div>
              </div>
            </div>

            {/* row 4 */}

            <div className="md:flex lg:flex w-full border-b-1 border-primary place-items-center">
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center lg:border-r md:border-r border-primary p-1">
                <div className="flex w-full place-items-center p-0 m-0">
                  <div className="flex w-2/4 pl-4 ">Phone:</div>
                  <div className="flex w-4/5">
                    <div className="p-inputgroup flex-1">
                      <InputMask
                        id="phone"
                        mask="(999) 999-9999"
                        placeholder="Type Number"
                        value={requestEditClient.phone}
                        onChange={(e) =>
                          handleChangeFormrequestEditClient(
                            "phone",
                            e.target.value ?? ""
                          )
                        }
                        className="input input-ghost border-0 w-full text-center"
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

              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center lg:border-r md:border-r border-primary p-1">
                <div className="flex w-full place-items-center p-0 m-0">
                  <div className="grid w-2/4 pl-4">*School/Work:</div>
                  <div className="grid w-4/5">
                    <div className="p-inputgroup flex-1">
                      <InputText
                        type="text"
                        placeholder="Type Name School"
                        value={requestEditClient.school}
                        onChange={(e) =>
                          handleChangeFormrequestEditClient(
                            "school",
                            e.target.value ?? ""
                          )
                        }
                        className="input input-ghost border-0 w-full text-center"
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

              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center border-primary p-1">
                <div className="flex w-full place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-2/5 pl-4">Language:</div>

                    <div className="grid w-3/5">
                      <div className="p-inputgroup flex-1">
                        <InputText
                          type="text"
                          name="language"
                          placeholder="Type Language"
                          value={requestEditClient.lenguage}
                          onChange={(e) =>
                            handleChangeFormrequestEditClient(
                              "lenguage",
                              e.target.value
                            )
                          }
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          onFocus={(e) => e.currentTarget.select()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* row 5 */}
            <div className="md:flex lg:flex w-full border-b border-primary place-items-center">
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b lg:border-r md:border-r place-items-center border-primary p-1">
                <div className="flex w-full place-items-center">
                  <div className="flex w-full place-items-center m-0 border-primary">
                    <div className="flex w-2/5 pl-4">Legal Guardian:</div>
                    <div className="grid w-3/5">
                      <div className="p-inputgroup flex-1">
                        <InputText
                          type="text"
                          name="legal_guardian"
                          placeholder="Type Name"
                          value={requestEditClient.legal_guardian}
                          onChange={(e) =>
                            handleChangeFormrequestEditClient(
                              "legal_guardian",
                              e.target.value
                            )
                          }
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          onFocus={(e) => e.currentTarget.select()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b lg:border-r md:border-r place-items-center border-r border-primary p-1">
                <div className="flex w-full place-items-center p-0 m-0">
                  <div className="grid w-2/4 pl-4">Relationship:</div>
                  <div className="grid w-3/4">
                    <div className="p-inputgroup flex-1">
                      <InputText
                        type="text"
                        name="fullname"
                        placeholder="Type Relation"
                        value={requestEditClient.relationship}
                        onChange={(e) =>
                          handleChangeFormrequestEditClient(
                            "relationship",
                            e.target.value
                          )
                        }
                        className="input input-ghost w-full text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center border-primary p-1">
                <div className="flex w-full place-items-center">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-2/5 pl-4">Phone:</div>

                    <div className="grid w-3/5">
                      <div className="p-inputgroup flex-1">
                        <InputMask
                          id="Dob"
                          mask="(999) 999-9999"
                          placeholder="Type Number"
                          value={requestEditClient.cell_phone_guardian}
                          onChange={(e) =>
                            handleChangeFormrequestEditClient(
                              "cell_phone_guardian",
                              e.target.value ?? ""
                            )
                          }
                          className="input input-ghost border-0 w-full text-center"
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
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          {/* TODO INSURANCE */}
          <InsuranceInformation
            // onChangeFormRequestEditSure={handleChangeFormrequestEditSure}
            onChangeFormrequestEditClient={handleChangeFormrequestEditClient}
            scm={scmInfo?.scm}
          />
          {/* Section Medical */}
          <MedicalInformations
            onChangeFormRequestEditMedical={handleChangeFormrequestEditMedical}
            scm={scmInfo?.scm}
            data={requestEditMedical}
          />
          {/* Section mental */}
          <MentalInformations
            onChangeFormscmMental={handleChangeFormrequestEditMental}
            scm={scmInfo?.scm}
            data={requestEditMental}
          />
          <ScrollTop
            target="parent"
            pt={{
              root: { className: "bg-orange-400" },
            }} />
        </div>
      </Block >
    </Dialog >
  );
};
type Props = {
  active?: Active;
  show?: boolean;
  client?: Client;
  scm?: ServiceCMActive;
  num?: number;
  relad(): void;
  closed(): void;
};
export { ClientFile };
