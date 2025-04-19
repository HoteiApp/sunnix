import { useRef, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent } from 'primereact/fileupload';
import { useGetHiringUrls3 } from "../../profile/hooks";
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { PdfViewer } from "..";
import user from "../../../images/user.png";
import { Countdown } from "../";
import { PersonalInformation } from "../component/profile/PersonalInformation";
import { SignatureDialog } from "../SingnatureDialog";

import { SignatureCanvasRef } from 'react-signature-canvas';
import { useMySignature, useUploadAvatarS3 } from "../../profile/hooks";

// -- Components
import { PasswordView } from "./access/password";

// -- Models
import { Active } from "../../../models";



const Settings = ({ active, relad }: Props) => {
  const { uploadAvatarS3, isUploadAvatarS3 } = useUploadAvatarS3(relad);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const fileUploadRef = useRef<FileUpload>(null);

  // ---------------------------------
  const headerTemplate = () => {
    const headerTemplateService2 = (options: FileUploadHeaderTemplateOptions) => {
      const { className, chooseButton, cancelButton, uploadButton
      } = options;
      return (
        <div className={className} style={{ visibility: "hidden", backgroundColor: "#3f5b9e", color: "#ffffff", display: 'flex', alignItems: 'center', padding: 5, margin: 0 }}>
          <div className="md:flex lg:flex w-full">
            <div className="w-full md:w-2/4 lg:w-2/4">
              <div className="w-full place-items-center">
                <div className="grid flex-grow w-full pr-5">
                  <div className='flex'>
                    {/* <div className='w-auto text-xl tracking-tight place-items-center pt-1 pl-5 pr-5'>Photo</div> */}
                    <div className="w-1/2 pt-1">

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4">


              <div className="w-full grid text-right">
                <div className='hidden'>{chooseButton}</div>
                <div className='flex justify-end'>
                  {/* {uploadButton} */}
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    };

    return (options) => headerTemplateService2(options);
  };

  const emptyTemplate = () => {
    return (

      <div className="text-center align-items-center flex-column"
        style={{ background: 'repeating-linear-gradient(45deg, #f3f3f3, #f3f3f3 10px, #ffffff 10px, #ffffff 20px)', padding: '100px', border: '2px dashed #ccc' }}>
        <span style={{ color: 'var(--text-color-secondary)' }} className="text-sm">
          Drag and Drop Image Here
        </span>
        <div className="p-mt-2">
          <button className="p-button p-component p-button-text p-button-plain" onClick={() => fileUploadRef.current?.getInput().click()}>
            <span className="p-button-icon p-c pi pi-fw pi-folder-open"></span>
            <span className="p-button-label p-c">Select Image</span>
          </button>
        </div>
      </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-upload', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-warning' };
  const uploadOptions = { icon: 'pi pi-fw pi-save', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-warning  bg-secondary rounded-full p-2' };
  // ---------------------------------
  const onUpload = () => {
    if (fileUploadRef.current) {
      const files = fileUploadRef.current.getFiles();
      const file = files.length > 0 ? files[0] : null;

      if (file) {
        // const formatDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getFullYear()}`;
        const path = `records-${active?.activeUser?.User?.uid?.toString()}-avatar`;


        const formData = new FormData();
        Array.from(files).forEach((file: File) => {
          formData.append(path, file);
        });

        uploadAvatarS3({ files: formData, path: path });
        fileUploadRef.current.clear();
        relad();
      } else {
        console.error('Please select a file, date, and category');
      }
    }
  };
  // ---------------------------------
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const { urlDoc } = useGetHiringUrls3();
  const [newNickname, setNewNickname] = useState(
    active?.activeUser?.Record?.fullname || ""
  );

  const handleSaveNickname = () => {
    console.log("Saving new nickname:", newNickname);
    setIsEditingNickname(false);
  };

  // -----------------
  const [showModalSignature, setShowModalSignature] = useState(false);
  const [showConfirmChangeSignature, setShowConfirmChangeSignature] = useState(false);
  // -----------------
  const [pdfContent, setPdfContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [selectOption, setSelectOption] = useState<string>("Personal information");


  // -----------------
  const items: MenuItem[] = [
    {
      label: 'Employment information',
      items: [
        {
          label: 'Personal information',
          icon: 'pi pi-user',
          className: classNames(
            selectOption === "Personal information" && "bg-gray-300",
          ),
          command: () => {
            setSelectOption("Personal information");
          }
        },
        {
          label: 'Services',
          icon: 'pi pi-list',
          className: classNames(
            selectOption === "Services" && "bg-gray-300",
          ),
          command: () => {
            setSelectOption("Services");
          }
        },
        {
          label: 'Personal documents',
          icon: 'pi pi-file',
          className: classNames(
            selectOption === "Personal documents" && "bg-gray-300",
          ),
          command: () => {
            setSelectOption("Personal documents");
          }
        }
      ]
    },
    {
      label: 'Access',
      items: [
        {
          label: 'Email',
          disabled: true,
          icon: 'pi pi-envelope',


        }, {
          label: 'Password',
          icon: 'pi pi-shield',
          className: classNames(
            selectOption === "Password" && "bg-gray-300",
          ),
          command: () => {
            setSelectOption("Password");
          }
        },
        {
          label: 'Two-factor authentication',
          disabled: true,
          icon: 'pi pi-key'
        }
      ]
    },
    {
      label: 'System',
      items: [
        {
          label: 'User Logs',
          disabled: true,
          icon: 'pi pi-history'
        },
        {
          label: 'Notification',
          disabled: true,
          icon: 'pi pi-bell'
        }
      ]
    }
  ];
  // -----------------
  const handleOpenModal = (file?: string) => {
    if (file !== "") {
      let url = `records/${active?.activeUser?.User?.uid}/${file}.pdf`;
      // Realizar una petición a la API de Go para descargar el PDF
      const fetchUrl = async () => {
        const result = await urlDoc({ key: url, duration: "1m" });
        if (result && result.url) {
          setPdfContent(result.url);
          setFileName(file ?? "");
          setIsOpen(true);
          // setDate("");
          if (file === "service_trainer_provider") {
            setDate(
              active?.activeUser?.Record?.necessary_documents
                .service_trainer_provider_date ?? ""
            );
          }
          if (file === "service_infection_control") {
            setDate(
              active?.activeUser?.Record?.necessary_documents
                .service_infection_control_date ?? ""
            );
          }
          if (file === "service_cpr_aed") {
            setDate(
              active?.activeUser?.Record?.necessary_documents
                .service_cpr_aed_date ?? ""
            );
          }
          if (file === "service_osha") {
            setDate(
              active?.activeUser?.Record?.necessary_documents
                .service_osha_date ?? ""
            );
          }
        }
      };
      fetchUrl();
    }
  };


  const [singSupervisor, setSingSupervisor] = useState<boolean>(false);
  const [singQa, setSingQa] = useState<boolean>(false);

  useEffect(() => {
    if (
      active?.activeUser?.Signature === "" &&
      active.activeUser.User?.roll !== "tmp"
    ) {
      setShowModalSignature(true);
    }
    setImageSign(active?.activeUser?.Signature ?? "");
    setSingQa(active?.activeUser?.User?.qa_can_sign ?? false)
    setSingSupervisor(active?.activeUser?.User?.supervisor_can_sign ?? false)
  }, [active]);

  const signatureRef = useRef<SignatureCanvasRef>(null);
  const [imageSign, setImageSign] = useState("");
  const { addSign, isUpdatingSign } = useMySignature(relad);


  return (
    <div className="card bg-white p-6">
      <Dialog
        header={fileName}
        visible={isOpen}
        maximizable
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setIsOpen(false)}
      >
        <p className="m-0">
          <div className="w-full">
            {pdfContent !== "" && isOpen && <PdfViewer fileUrl={pdfContent} />}
          </div>
        </p>
      </Dialog>


      {active?.activeUser?.User?.roll !== "tmp" && (
        <SignatureDialog
          showModal={showModalSignature}
          setShowModal={setShowModalSignature}
          active={active}
          relad={relad}
        />
      )}

      <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="w-2/3 flex">
          <div className="relative">
            <img
              src={active?.activeUser?.Avatar === "" ? user : active?.activeUser?.Avatar}
              alt={active?.activeUser?.User?.nick || "Profile"}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="absolute -bottom-2 right-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded bg-opacity-30 pl-4"
                tooltip="Change photo"
                onClick={() => setShowUploadPhoto(true)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">

              {isEditingNickname ? (
                <div className="flex items-center gap-2">
                  <InputText
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    className="text-xl font-semibold p-1 h-8"
                    autoFocus
                  />
                  <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-text text-green-500 flex items-center justify-center w-8 h-8 min-w-[2rem]"
                    onClick={handleSaveNickname}
                    tooltip="Save"
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-text text-red-500 flex items-center justify-center w-8 h-8 min-w-[2rem]"
                    onClick={() => setIsEditingNickname(false)}
                    tooltip="Cancel"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {active?.activeUser?.Record?.fullname}
                  </h2>
                  {/* <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text text-gray-500 flex items-center justify-center w-8 h-8 min-w-[2rem]"
                    tooltip="Edit nickname"
                    tooltipOptions={{ position: "top" }}
                    onClick={() => setIsEditingNickname(true)}
                  /> */}
                </>
              )}
            </div>
            <p className="text-gray-500 flex items-center gap-2">
              <i className="pi pi-at"></i>
              {active?.activeUser?.User?.uid}
            </p>
            <p className="text-gray-500 flex items-center gap-2">
              <i className="pi pi-envelope"></i>
              {active?.activeUser?.User?.email}
            </p>
          </div>
        </div>

        <div>
          <div className='w-full'>
            {/* TODO Esto es lo que no permite copiar de la pantalla */}
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-secondary" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  <div className="w-32">
                    <img
                      src={imageSign}
                      alt='sign'
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ width: '150px', height: '50px' }}
                    />
                  </div>
                </div>
                <div className="stat-value avatar online text-xl">Digital Signature</div>
                {/* <div className="stat-title pt-2">Signature done</div> */}
                {/* <div className="stat-desc text-secondary pt-2">View signature history</div> */}
                <div className="stat-desc text-secondary pt-2">
                  {active?.activeUser?.Signature === "" ? (
                    <Button
                      label="Create Signature"
                      icon="pi pi-key"
                      className='p-button-warning p-2'
                      onClick={() => setShowModalSignature(true)}
                    />
                  ) : (
                    <Button
                      label="Change"
                      icon="pi pi-undo"
                      className='p-button-warning p-2'
                      loading={isUpdatingSign}
                      disabled={imageSign === "" ? true : false}
                      onClick={() => {
                        setShowConfirmChangeSignature(true);
                        // addSign({ signature: "", singSupervisor: singSupervisor, singQa: singQa });
                      }}
                    />
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="w-full flex">
        <div className="w-1/4">
          <Menu model={items} className="w-full" />
        </div>
        <div className="w-3/4 border-l pl-2">
          {selectOption === "Personal information" &&
            <div>
              <b className="text-xl">Personal information</b>
              <hr className="mb-2" />
              <PersonalInformation active={active} />
            </div>
          }
          {selectOption === "Services" &&
            <div className="grid grid-cols-1 md:grid-cols-1">
              <b className="text-xl">Services</b>
              <hr className="mb-2" />
              <div className="space-y-6">
                <div
                  className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenModal("service_trainer_provider");
                  }}
                >
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_trainer_provider
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_trainer_provider
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>10 Hours from FCB</b>
                  </div>
                  <div className="stat-title">
                    <i>Accredited Trainer Provider</i>
                  </div>
                  <div className="stat-desc text-secondary flex">
                    Every Year
                    {active?.activeUser?.Record?.necessary_documents
                      .service_trainer_provider_date !== "" && (
                        <div className="flex">
                          -{" "}
                          <i>
                            Date obtained:{" "}
                            {
                              active?.activeUser?.Record?.necessary_documents
                                .service_trainer_provider_date
                            }
                          </i>
                          &nbsp;expires in: &nbsp;{" "}
                          <Countdown
                            date={
                              active?.activeUser?.Record?.necessary_documents.service_trainer_provider_date
                                .split("/")
                                .join("-") ?? "01-01-2024"
                            }
                            hour={0}
                            minutes={0}
                            seconds={0}
                            summ={1}
                            size="12px"
                          />
                        </div>
                      )}
                  </div>
                </div>

                <div
                  className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenModal("service_infection_control");
                  }}
                >
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_infection_control
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_infection_control
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>Infection Control</b>
                  </div>
                  <div className="stat-title">
                    <i>(Trainflorida)</i>
                  </div>
                  <div className="stat-desc text-secondary">
                    Every 3 Years
                    {active?.activeUser?.Record?.necessary_documents
                      .service_infection_control_date !== "" && (
                        <div className="flex">
                          -{" "}
                          <i>
                            Date obtained:{" "}
                            {
                              active?.activeUser?.Record?.necessary_documents
                                .service_infection_control_date
                            }
                          </i>
                          &nbsp;expires in: &nbsp;{" "}
                          <Countdown
                            date={
                              active?.activeUser?.Record?.necessary_documents.service_infection_control_date
                                .split("/")
                                .join("-") ?? "01-01-2024"
                            }
                            hour={0}
                            minutes={0}
                            seconds={0}
                            summ={1}
                            size="12px"
                          />
                        </div>
                      )}
                  </div>
                </div>

                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_hiv_aids
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_hiv_aids
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>HIV / AIDS</b>
                  </div>
                  <div className="stat-title">
                    <i>Trainflorida</i>
                  </div>
                  <div className="stat-desc text-secondary">Only 1 Time</div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_fars_cfars
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_fars_cfars
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>FARS / CFARS</b>
                  </div>
                  <div className="stat-desc text-secondary">Only 1 Time</div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_access_civil_rights
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_access_civil_rights
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>Access Civil Rights</b>
                  </div>
                  <div className="stat-desc text-secondary">Only 1 Time</div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_security_awareness
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_security_awareness
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>Security Awarenes</b>
                  </div>

                  <div className="stat-desc text-secondary">Only 1 Time</div>
                </div>
              </div>
              <div className="space-y-6 mt-6">
                <div
                  className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenModal("service_cpr_aed");
                  }}
                >
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_cpr_aed
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_cpr_aed
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title ">
                    <b>CPR / AED &nbsp;</b>
                  </div>
                  <div className="stat-desc text-secondary">
                    Every 2 Years
                    {active?.activeUser?.Record?.necessary_documents
                      .service_cpr_aed_date !== "" && (
                        <div className="flex">
                          -{" "}
                          <i>
                            Date obtained:{" "}
                            {
                              active?.activeUser?.Record?.necessary_documents
                                .service_cpr_aed_date
                            }
                          </i>
                          &nbsp;expires in: &nbsp;{" "}
                          <Countdown
                            date={
                              active?.activeUser?.Record?.necessary_documents.service_cpr_aed_date
                                .split("/")
                                .join("-") ?? "01-01-2024"
                            }
                            hour={0}
                            minutes={0}
                            seconds={0}
                            summ={1}
                            size="12px"
                          />
                        </div>
                      )}
                  </div>
                </div>
                <div
                  className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpenModal("service_osha");
                  }}
                >
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_osha
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_osha
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>OSHA</b>
                  </div>
                  <div className="stat-title">
                    <i>
                      (Occupational Exposure to <br /> Blood Borne Pathogens)
                    </i>
                  </div>
                  <div className="stat-desc text-secondary">
                    Every 3 Years
                    {active?.activeUser?.Record?.necessary_documents
                      .service_osha_date !== "" && (
                        <div className="flex">
                          -{" "}
                          <i>
                            Date obtained:{" "}
                            {
                              active?.activeUser?.Record?.necessary_documents
                                .service_osha_date
                            }
                          </i>
                          &nbsp;expires in: &nbsp;{" "}
                          <Countdown
                            date={
                              active?.activeUser?.Record?.necessary_documents.service_osha_date
                                .split("/")
                                .join("-") ?? "01-01-2024"
                            }
                            hour={0}
                            minutes={0}
                            seconds={0}
                            summ={1}
                            size="12px"
                          />
                        </div>
                      )}
                  </div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_domestic_violence
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_domestic_violence
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title ">
                    <b>Domestic Violence, Substance Abuse</b>
                  </div>
                  <div className="stat-title ">
                    <i>Mental Health Disorder and Child Abuse</i>
                  </div>
                  <div className="stat-desc text-secondary">only 1 Time</div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_hippa
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_hippa
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title">
                    <b>HIPPA</b>
                  </div>
                  <div className="stat-desc text-secondary">Only 1 Time</div>
                </div>
                <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                  <div className="stat-figure text-secondary">
                    <div
                      className={classNames(
                        "avatar",
                        active?.activeUser?.Record?.necessary_documents
                          .service_deaf_hard
                          ? "online"
                          : "offline"
                      )}
                    >
                      <div className="w-16">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className={classNames(
                            "w-16 h-16",
                            active?.activeUser?.Record?.necessary_documents
                              .service_deaf_hard
                              ? "text-warning"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="stat-value"></div>
                  <div className="stat-title ">
                    <b>Service Delivery</b>
                  </div>
                  <div className="stat-title ">
                    <i>for the Deaf or Hard-of-Hearing</i>
                  </div>
                  <div className="stat-desc text-secondary">only 1 Time</div>
                </div>
              </div>
            </div>}
          {selectOption === "Personal documents" && <div className="grid grid-cols-1 md:grid-cols-1">
            <b className="text-xl">Services</b>
            <hr className="mb-2" />
            <div className="space-y-6">
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents.resume
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents.resume
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Resume</b>
                </div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .diploma_transcripts
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .diploma_transcripts
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title ">
                  <b>Diploma / Transcripts</b>
                </div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .licenses_certifications
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .licenses_certifications
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Licenses / Certifications</b>
                </div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents.course_fcb
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .course_fcb
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Course FCB</b>
                </div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_medicaid_certification
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_medicaid_certification
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Medicaid Certification</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_medicaid_provider
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_medicaid_provider
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Medicaid Provider and NPI Number</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_drivers_license
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_drivers_license
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Driver's License or Valid Picture ID</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_social_security_card
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_social_security_card
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Social Security Card</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_proof_legal_status
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_proof_legal_status
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Proof of Legal Status</b>
                </div>
                <div className="stat-title">
                  <i>
                    US Passport, Resident Card,Employment Authorization, etc.
                  </i>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_employee_id_badge
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_employee_id_badge
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Employee ID Badge</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_vehicle_registration
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_vehicle_registration
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Vehicle Registration</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md">
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      active?.activeUser?.Record?.necessary_documents
                        .other_proof_insurance
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          active?.activeUser?.Record?.necessary_documents
                            .other_proof_insurance
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Proof of Insurance</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
            </div>
          </div>
          }
          {selectOption === "Password" && <div className="w-full">
            <b className="text-xl">
              <i className="pi pi-lock mr-2" style={{ fontSize: '1.5rem' }} />
              Change password
            </b>
            <hr className="mb-2" />
            {/* Cambio de password */}
            <PasswordView active={active} relad={relad} />
          </div>}
        </div>
      </div>
      <Dialog
        header="Change Photo"
        visible={showUploadPhoto}
        style={{ width: '350px' }}
        footer={
          <div className='flex justify-content-end'>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowUploadPhoto(false)}
              className="p-button bg-gray-400 mr-2"
            />
            <Button
              label="Salve"
              icon="pi pi-save"
              loading={isUploadAvatarS3}
              onClick={() => {
                onUpload();
                setShowUploadPhoto(false);
              }}
              className="p-button-success"
            />
          </div>
        }
        onHide={() => setShowUploadPhoto(false)}
      >
        <p>
          <FileUpload
            ref={fileUploadRef}
            accept="image/*"
            // auto
            emptyTemplate={emptyTemplate}
            headerTemplate={headerTemplate()}
            chooseLabel="Upload"
            chooseOptions={chooseOptions}
            uploadLabel='Save'
            uploadOptions={uploadOptions}
            pt={{
              content: { className: 'p-0' }
            }}
            customUpload
            uploadHandler={onUpload}
          />
        </p>
      </Dialog>
      {/* Confirm */}
      <Dialog
        header="Warning: Signature Change"
        visible={showConfirmChangeSignature}
        style={{ width: '350px' }}
        footer={
          <div className='flex justify-content-end'>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setShowConfirmChangeSignature(false)}
              className="p-button-text mr-2"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => {
                addSign({ signature: "", singSupervisor: singSupervisor, singQa: singQa });
                setShowConfirmChangeSignature(false);
              }}
              className="p-button-success"
            />
          </div>
        }
        onHide={() => setShowConfirmChangeSignature(false)}
      >
        <p>
          When changing your digital signature:
          <br />
          - The new signature will be applied to future documents.
          <br />
          - Already signed documents will not be affected.
          <br />
          <br />
          <b>Are you sure you want to continue?</b>
        </p>
      </Dialog>
    </div>
  );
};

type Props = {
  active?: Active;
  relad(): void;
};

export { Settings };
