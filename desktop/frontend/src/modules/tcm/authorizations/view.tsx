import { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

// AUTH FORM
import { SunshineA } from "../../commons/authform/sunshineA";
import { CignaA } from "../../commons/authform/cignaA";
import { Molina } from "../../commons/authform/molina";
import { AetnaBHA } from "../../commons/authform/aetnaBHA";
import { AetnaDA } from "../../commons/authform/aetnaDA";

import { WellcareA } from "../../commons/authform/wellcareA";
import { Carelon } from "../../commons/authform/carelon";
import { FCC } from "../../commons/authform/fcc";
// Certification
import { Certification } from "../../commons/certification/certification";
// Assessment
import { Assessment } from "../../commons/assessment/assessment";
// Sp
import { Sp } from "../../commons/sp/sp";
// PdfViewer

import { Active, Client, ServiceCM, Sure, FromSubmitScmSure } from "../../../models";
import { useUploadS3Pdf, useDeleteS3Object, useUploadFilesS3, useDownloadS3Zip, useDownloadS3PDF, useCoreRequestSubmitSCMSure } from "../../profile/hooks";


import { GetUrl } from "../../commons/renderPDF"
// --------------------------
// --------------------------
export const Edit = ({ active, scm, sure, relad, client }: Props) => {
    const { submitEditSure, isUpdatingRSubmitSure } = useCoreRequestSubmitSCMSure(relad);
    const { uploadS3PDF, isUpdatingUploadS3PDF } = useUploadS3Pdf(relad);
    const { downloadS3Zip, isUpdatingDownloadS3Zip } = useDownloadS3Zip(relad);
    const { downloadS3PDF, isUpdatingDownloadS3PDF } = useDownloadS3PDF(relad);
    const { deleteS3object, isUpdatingDeleteS3object } = useDeleteS3Object(relad);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [insuance, setInsuance] = useState<string>("Sunshine Health");
    const [content, setContent] = useState<string>('');
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };
    const [fileSelect, setFileSelect] = useState<string>("auth");
    // --------------
    const [requestSubmitSure, setRequestSubmitSure] =
        useState<FromSubmitScmSure>({
            id: 0,
            scm: 0,
            plan_name: "",
            plan_id: "",
            auth: false,
            deny: false,
            auth_date_start: "",
            auth_date_end: "",
            unit: 0,
            time_range: 0,
            active: false,
            // -----
            tcm: 0,
            submit: false,

            supervisor: 0,
            supervisor_approbe: false,

            qa: 0,
            qa_approbe: false,
        });
    const handleSubmitSure = <
        T extends string | number | boolean
    >(
        name: keyof FromSubmitScmSure,
        value: T
    ) => {
        setRequestSubmitSure((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        return requestSubmitSure;
    };
    // --------------
    const toast = useRef<Toast>(null);
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'The operation has been cancelled', life: 3000 });
    };

    const confirm = (position, onaccept, text, text1, ico) => {
        confirmDialog({
            header: text,
            message: <div style={{ whiteSpace: 'pre-wrap' }}>{text1.split('\n').map((line) => (
                <div>
                    {line}
                    <br />
                </div>
            ))}</div>,
            icon: ico,
            position,
            accept: () => {
            onaccept();
            },
            reject
        });
    };
    const { uploadFilesS3, isUploadFilesS3 } = useUploadFilesS3(relad);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, path: string) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file: File) => {
                formData.append(path, file);
            });
            // console.log(path);
            uploadFilesS3({ files: formData, path: path });
            // ChangeFormValuesNecesaryDocuments("resume", true);
        }
    };


    // --------------
    const itemRenderer = (item: MenuItem, select: boolean, setSelect: React.Dispatch<React.SetStateAction<boolean>>, file: string) => {
        return (
            <div className={classNames(
                'p-menuitem-content hover:bg-gray-200',
                fileSelect === file ? 'bg-orange-200' : 'bg-white'
            )}>
                <div className="w-full flex p-2">
                    <div
                        className="flex w-2/4 items-center pl-2 hover:cursor-pointer"
                        onClick={(e) => item.command && item.command({ originalEvent: e, item })}
                    >
                        <i className={item.icon} />
                        <p className="pl-2">
                            {item.label}
                        </p>
                    </div>
                    <div className="w-2/4 text-right">

                        {scm?.files.map((files) => {
                            const allFiles = {
                                auth: files.auth,
                                certification: files.certification,
                                assessment: files.assessment,
                                sp: files.sp,
                                evaluation: files.evaluation,
                            };
                            const fileObject = allFiles[file];

                            if (sure?.ID === files.sure && fileObject !== undefined) {
                                return (
                                    <div>
                                        {!fileObject ? (
                                            fileSelect === file && <>
                                                <Tooltip target={`.${file}`} />
                                                <Tooltip target={`.upload${file}`} />

                                                <label htmlFor={`file-upload${file}`}>
                                                    <i
                                                        className={classNames(
                                                            "pi pi-cloud-upload",
                                                            `hover:text-secondary mr-2 upload${file}`
                                                        )}
                                                        data-pr-tooltip={`Upload file. You can provide a PDF, the Authorization Form will not be considered.`}
                                                        data-pr-position="top"
                                                    />
                                                    <input
                                                        id={`file-upload${file}`}
                                                        type="file"
                                                        className="hidden"
                                                        accept="application/pdf"
                                                        onChange={(e) => {
                                                            handleFileChange(
                                                                e,
                                                                `clients-${client?.id.toString()}-${scm.id.toString()}-insurance-${sure.ID.toString()}-${item.label || "tmp"}`
                                                            )
                                                        }}
                                                    />
                                                </label>
                                                {file !== "evaluation" &&
                                                    <i
                                                        className={classNames(
                                                            isUpdatingUploadS3PDF ? "pi pi-spin pi-spinner" : "pi pi-file-pdf animate-bounce hover:animate-none",
                                                            `hover:text-secondary ${file}`
                                                        )}
                                                        data-pr-tooltip={`Generate PDF and upload to the system`}
                                                        data-pr-position="top"
                                                        onClick={() => {
                                                            confirm(
                                                                'top-left',
                                                                () => {
                                                                    uploadS3PDF({
                                                                        name: item.label || "tmp.pdf",
                                                                        folder: `clients/${client?.id.toString()}/${scm.id.toString()}/insurance/${sure.ID}/`,
                                                                        htmlDiv: content,
                                                                        pageSize: item.label === "Assessment" ? "" : "a4"
                                                                    });
                                                                },
                                                                "PDF",
                                                                "Generate and save PDF with the information \n you have filled out in the Authorization Form.",
                                                                "pi pi-exclamation-triangle",
                                                            )
                                                        }}
                                                    />
                                                }
                                            </>
                                        ) : (
                                            <div>
                                                {fileSelect === file && <>
                                                    {sure?.active && <>
                                                        <Tooltip target={`.update${file}`} />
                                                        <Tooltip target={`.remplace${file}`} />
                                                        <i
                                                            className={classNames(
                                                                isUpdatingDeleteS3object ? "pi pi-spin pi-spinner" : "pi pi-undo",
                                                                `hover:text-secondary mr-2 update${file}`
                                                            )}
                                                            data-pr-tooltip={`Refill the file`}
                                                            data-pr-position="top"
                                                            onClick={() => {
                                                                confirm(
                                                                    'top-left',
                                                                    () => {
                                                                        deleteS3object({ // Aquí pasamos una función anónima que ejecuta deleteS3object
                                                                            key: `clients/${client?.id.toString()}/${scm.id.toString()}/insurance/${sure.ID}/${item.label}.pdf`,
                                                                        });
                                                                    },
                                                                    "Refill file",
                                                                    "This function will delete the previous form, and a new blank form will be created.",
                                                                    "pi pi-exclamation-triangle",
                                                                )
                                                            }}
                                                        />
                                                        <label htmlFor={`file-remplace${file}`}>
                                                            <i
                                                                className={classNames(
                                                                    "pi pi-file-arrow-up",
                                                                    `hover:text-secondary mr-2 remplace${file}`
                                                                )}
                                                                data-pr-tooltip={`Replace with another document.`}
                                                                data-pr-position="top"
                                                            />
                                                            <input
                                                                id={`file-remplace${file}`}
                                                                type="file"
                                                                className="hidden"
                                                                accept="application/pdf"
                                                                onChange={(e) => {
                                                                    handleFileChange(
                                                                        e,
                                                                        `clients-${client?.id.toString()}-${scm.id.toString()}-insurance-${sure.ID.toString()}-${item.label || "tmp"}`
                                                                    )
                                                                }}
                                                            />
                                                        </label>
                                                    </>}
                                                </>}

                                                <Checkbox
                                                    variant="filled"
                                                    value={item.label}
                                                    onChange={() => {
                                                        setSelect(!select)
                                                    }}
                                                    checked={select}
                                                    pt={{
                                                        root: {
                                                            className: classNames("m-1")
                                                        },
                                                        box: {
                                                            className: classNames(
                                                                "border",
                                                                select && "border-secondary bg-secondary",
                                                                "border-blue-300 hover:border-secondary"
                                                            )
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        );
    };
    const itemRendererOptSelect = (item: MenuItem, select: boolean, setSelect: React.Dispatch<React.SetStateAction<boolean>>, file: string) => {
        return (
            <div className={classNames(
                'p-menuitem-content hover:cursor-pointer hover:bg-gray-200',
                'bg-white'
            )}>
                <div className="w-full flex p-2">
                    <div
                        className="flex w-2/4 items-center pl-2"
                        onClick={(e) => item.command && item.command({ originalEvent: e, item })}
                    >
                        <i className={item.icon} />
                        <p className="pl-2">
                            {item.label}
                        </p>
                    </div>
                    <div className="w-2/4 text-right">
                        <b style={{ fontSize: "10px" }}>Select all</b>
                        <Checkbox
                            variant="filled"
                            onChange={() => {
                                // setSelect(!select);
                                setSelectAll(!selectAll);
                            }}
                            checked={selectAll}
                            pt={{
                                root: {
                                    className: classNames("ml-2 mr-1")
                                },
                                box: {
                                    className: classNames(
                                        "border-2",
                                        selectAll && "border-secondary bg-secondary",
                                        "border-blue-300 hover:border-secondary"
                                    )
                                }
                            }}
                        />


                    </div>
                </div>
            </div>
        );
    };

    const items: MenuItem[] = [
        {
            label: 'Documents',
            items: [
                {
                    label: 'Auth Request',
                    icon: 'pi pi-file',
                    command: () => {
                        setFileSelect("auth");
                    },
                    template: (item) => itemRenderer(item, selectAuth, setSelectAuth, "auth")
                },
                {
                    label: 'Certification',
                    icon: 'pi pi-file',
                    command: () => {
                        setFileSelect("certification");
                    },
                    template: (item) => itemRenderer(item, selectCert, setSelectCert, "certification")
                },
                {
                    label: 'Assessment',
                    icon: 'pi pi-file',
                    command: () => {
                        setFileSelect("assessment");
                    },
                    template: (item) => itemRenderer(item, selectAssessment, setSelectAssessment, "assessment")
                },
                {
                    label: 'Service Plan',
                    icon: 'pi pi-file',
                    command: () => {
                        setFileSelect("sp");
                    },
                    template: (item) => itemRenderer(item, selectSp, setSelectSp, "sp")
                },
                {
                    label: 'Evaluation',
                    icon: 'pi pi-file',
                    command: () => {
                        setFileSelect("evaluation");
                    },
                    template: (item) => itemRenderer(item, selectEvaluation, setSelectEvaluation, "evaluation")
                },
                {
                    label: '',
                    icon: '',
                    command: () => {
                        // setFileSelect("evaluation");
                    },
                    template: (item) => itemRendererOptSelect(item, selectAll, setSelectAll, "selectall")
                }
            ],

        },
        {
            label: 'Options',
            items: [
                {
                    template: (item, options) => {
                        const basePath = `clients/${client?.id}/${scm?.id}/insurance/${sure?.ID}`;
                        // const basePath = `api/module/tcm/pdf/`;
                        return (
                            <div>
                                <div className="w-full">
                                    <div className="w-full p-2">
                                        <Button
                                            label="Download in Zip"
                                            disabled={!(selectAuth || selectCert || selectAssessment || selectSp || selectEvaluation)}
                                            icon={isUpdatingDownloadS3Zip ? "pi pi-spin pi-spinner" : "pi pi-download"}
                                            className="w-full"
                                            onClick={() => handleDownload(basePath)}
                                        />
                                    </div>

                                    <div className="w-full p-2">
                                        <Button
                                            label="Download in a single pdf"
                                            disabled={!(selectAuth || selectCert || selectAssessment || selectSp || selectEvaluation)}
                                            icon={isUpdatingDownloadS3PDF ? "pi pi-spin pi-spinner" : "pi pi-file-pdf"}
                                            className="w-full"
                                            onClick={() => handleDownloadPdf(basePath)}
                                        />
                                    </div>

                                    {sure?.active && <div className="w-full p-2">
                                        <Button
                                            label={active?.activeUser?.User?.roll === "TCM" ? "Submit to TCMS" : active?.activeUser?.User?.roll === "TCMS" ? "Submit to QA" : "Approbe"}
                                            icon="pi pi-send"
                                            className="w-full"
                                            disabled={
                                                (!saveAuth && !saveCert && !saveAssessment && !saveSp) ||
                                                (active?.activeUser?.User?.roll === "TCM" && sure?.submit) ||
                                                (active?.activeUser?.User?.roll === "TCMS" && sure?.supervisor_approbe) ||
                                                (active?.activeUser?.User?.roll === "QA" && sure?.qa_approbe)
                                            }
                                            onClick={() => {
                                                confirm(
                                                    'top-left',
                                                    () => {
                                                        // if (active?.activeUser?.User?.roll === "TCM") {
                                                        //     handleSubmitSure("submit", true);
                                                        // }
                                                        // if (active?.activeUser?.User?.roll === "TCMS") {
                                                        //     handleSubmitSure("supervisor_approbe", true);
                                                        // }
                                                        // if (active?.activeUser?.User?.roll === "QA") {
                                                        //     handleSubmitSure("qa_approbe", true);
                                                        // }
                                                        submitEditSure({
                                                            requestSubmitScmSure: requestSubmitSure
                                                        })
                                                    },
                                                    "Insurance Authorization",
                                                    "Are you sure to submit the authorization?",
                                                    "pi pi-exclamation-triangle",
                                                )
                                            }}
                                        />
                                    </div>
                                    }

                                </div>
                            </div>
                        );
                    }
                }
            ],

        }
    ];

    // -- Select doc
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectAuth, setSelectAuth] = useState<boolean>(false);
    const [selectCert, setSelectCert] = useState<boolean>(false);
    const [selectAssessment, setSelectAssessment] = useState<boolean>(false);
    const [selectSp, setSelectSp] = useState<boolean>(false);
    const [selectEvaluation, setSelectEvaluation] = useState<boolean>(false);
    // ------------------------
    const handleDownload = (basePath: string) => {
        const selected: string[] = [];
        // const basePath = `clients/${client?.id}/${scm?.id}/${sure.ID}`;
        if (selectAuth) selected.push(`${basePath}/Auth Request.pdf`);
        if (selectCert) selected.push(`${basePath}/Certification.pdf`);
        if (selectAssessment) selected.push(`${basePath}/Assessment.pdf`);
        if (selectSp) selected.push(`${basePath}/Service Plan.pdf`);
        if (selectEvaluation) selected.push(`${basePath}/Evaluation.pdf`);
        // Download files selected in zip
        downloadS3Zip({ fileNames: selected })
    };
    const handleDownloadPdf = (basePath: string) => {
        const selected: string[] = [];
        // const basePath = `clients/${client?.id}/${scm?.id}/${sure.ID}`;
        if (selectAuth) selected.push(`${basePath}/Auth Request.pdf`);
        if (selectCert) selected.push(`${basePath}/Certification.pdf`);
        if (selectAssessment) selected.push(`${basePath}/Assessment.pdf`);
        if (selectSp) selected.push(`${basePath}/Service Plan.pdf`);
        if (selectEvaluation) selected.push(`${basePath}/Evaluation.pdf`);
        // Download files selected in zip
        downloadS3PDF({ fileNames: selected })
    };
    // ------------------------
    // Save
    const [saveAuth, setSaveAuth] = useState<boolean>(false);
    const [saveCert, setSaveCert] = useState<boolean>(false);
    const [saveAssessment, setSaveAssessment] = useState<boolean>(false);
    const [saveSp, setSaveSp] = useState<boolean>(false);

    const [saveEvaluation, setSaveEvaluation] = useState<boolean>(false);

    // ---------------------
    const renderPdfOrForm = (fileAvailable: boolean, filePath: string, formComponent: JSX.Element) => {
        return fileAvailable ? (
            <GetUrl fileAvailable={fileAvailable} filePath={filePath} />
        ) : (
            formComponent
        );
    };

    const insuranceForms: { [key: string]: JSX.Element } = {
        "Sunshine Health": <SunshineA scm={scm} sure={sure} onContentChange={handleContentChange} />,
        "Cigna": <CignaA scm={scm} sure={sure} onContentChange={handleContentChange} />,
        "Molina Healthcare": <Molina scm={scm} onContentChange={handleContentChange} />,
        "Aetna Better Health": <AetnaBHA scm={scm} onContentChange={handleContentChange} />,
        "Aetna Health Plan": <AetnaDA scm={scm} onContentChange={handleContentChange} />,
        "Wellcare Health Plan": <WellcareA scm={scm} onContentChange={handleContentChange} />,
        "Simply Healthcare": <Carelon scm={scm} onContentChange={handleContentChange} />,
        "Humana": <Carelon scm={scm} onContentChange={handleContentChange} />,
        "HealthSun Health Plan": <Carelon scm={scm} onContentChange={handleContentChange} />,
        "CarePlus Health Plan": <Carelon scm={scm} onContentChange={handleContentChange} />,
        "Free Medicaid": <FCC scm={scm} onContentChange={handleContentChange} />,
    };

    const renderInsuranceForm = () => insuranceForms[insuance];
    // ---------
    const Update = () =>{
        handleSubmitSure("id", sure?.ID ?? 0);
        handleSubmitSure("scm", scm?.id ?? 0);
        handleSubmitSure("plan_name", sure?.plan_name ?? "");
        handleSubmitSure("plan_id", sure?.plan_id ?? "");
        handleSubmitSure("auth", sure?.auth ?? false);
        handleSubmitSure("deny", sure?.deny ?? false);
        handleSubmitSure("auth_date_start", sure?.auth_date_start ?? "");
        handleSubmitSure("auth_date_end", sure?.auth_date_end ?? "");
        handleSubmitSure("unit", sure?.unit ?? 0);
        handleSubmitSure("time_range", sure?.time_range ?? 0);
        handleSubmitSure("active", sure?.active ?? false);
        
        if (active?.activeUser?.User?.roll === "TCM") {
            handleSubmitSure("tcm", active?.activeUser?.User?.ID ?? 0);
            handleSubmitSure("submit", true);
        } else {
            handleSubmitSure("tcm", sure?.tcm ?? 0);
            handleSubmitSure("submit", sure?.submit ?? false);
        }

        if (active?.activeUser?.User?.roll === "TCMS") {
            handleSubmitSure("supervisor", active?.activeUser?.User?.ID ?? 0);
            handleSubmitSure("supervisor_approbe", true);
        } else {
            handleSubmitSure("supervisor", sure?.supervisor ?? 0);
            handleSubmitSure("supervisor_approbe", sure?.supervisor_approbe ?? false);
        }
        if (active?.activeUser?.User?.roll === "QA") {
            handleSubmitSure("qa", active?.activeUser?.User?.ID ?? 0);
            handleSubmitSure("qa_approbe", true);
        } else {
            handleSubmitSure("qa", sure?.qa ?? 0);
            handleSubmitSure("qa_approbe", sure?.qa_approbe ?? false);
        }
    }
    useEffect(() => {
        Update();
    }, [relad]);

    // ---------
    useEffect(() => {
        Update();
        // eslint-disable-next-line array-callback-return
        scm?.files.map((file) => {
            if (file.sure === sure?.ID) {
                setSaveAuth(file.auth);
                setSaveCert(file.certification);
                setSaveAssessment(file.assessment);
                setSaveSp(file.sp);
                setSaveEvaluation(file.evaluation);
            }
        });
        scm?.sure.map((insurance) => {
            if (insurance.active) {
                setInsuance(insurance.plan_name);
            }
        });
    }, [scm]);

    useEffect(() => {
        if (selectAll) {
            setSelectAuth(true);
            setSelectCert(true);
            setSelectAssessment(true);
            setSelectSp(true);
            setSelectEvaluation(true);
        } else {
            setSelectAuth(false);
            setSelectCert(false);
            setSelectAssessment(false);
            setSelectSp(false);
            setSelectEvaluation(false);
        }
    }, [selectAll]);

    return (
        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="w-1/5">

                <Menu model={items} className="w-full" />
            </div>
            <div id="content-to-pdf" className="w-4/5 border-l-2 border-dashed surface-border border-round surface-ground p-5">
                {scm?.files.map((file) => {
                    
                    if (file.sure !== sure?.ID) return null;
                    const basePath = `clients/${client?.id}/${scm?.id}/insurance/${sure.ID}`;
                    
                    return (
                        <div key={file.ID}>
                            {fileSelect === "auth" &&
                                renderPdfOrForm(
                                    // "auth",
                                    file.auth,
                                    `${basePath}/Auth Request.pdf`,
                                    renderInsuranceForm(),
                                )}
                            {fileSelect === "certification" &&
                                renderPdfOrForm(
                                    // "certification",
                                    file.certification,
                                    `${basePath}/Certification.pdf`,
                                    <Certification active={active} relad={relad} scm={scm} onContentChange={handleContentChange} />
                                )}
                            {fileSelect === "assessment" &&
                                renderPdfOrForm(
                                    // "assessment",
                                    file.assessment,
                                    `${basePath}/Assessment.pdf`,
                                    <Assessment active={active} relad={relad} scm={scm} onContentChange={handleContentChange} />
                                )}
                            {fileSelect === "sp" &&
                                renderPdfOrForm(
                                    // "sp",
                                    file.sp,
                                    `${basePath}/Service Plan.pdf`,
                                    <Sp active={active} relad={relad} scm={scm} view={"View"} onContentChange={handleContentChange} />
                                )}
                            {fileSelect === "evaluation" &&
                                renderPdfOrForm(
                                    // "evaluation",
                                    file.evaluation,
                                    `${basePath}/Evaluation.pdf`,
                                    <span>
                                        <Message text="Upload the Evaluacion on PDF file." />
                                    </span>
                                )}
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
type Props = {
    active?: Active;
    scm: ServiceCM | undefined;
    sure?: Sure;
    relad(): void;
    client?: Client;
};