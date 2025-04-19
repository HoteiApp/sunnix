import React, { useState, useRef } from 'react';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent } from 'primereact/fileupload';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ExternalLinkButton } from '../../../commons'
import { GetUrl } from "../../../commons/renderPDF"
import {
    useUploadFiles
} from "../../hooks";
import { PdfViewer } from "../../../commons";
import { ScrollTop } from 'primereact/scrolltop';
// -- New Struct
import { Active, FormValuesNecesaryDocuments } from '../../../../models';
import { useGetHiringUrls3 } from "../../../profile/hooks";
const Section2 = ({ active, relad }: Props) => {
    // ---------------------------------------
    const { urlDoc } = useGetHiringUrls3();
    const [isOpen, setIsOpen] = useState(false);
    const [pdfContent, setPdfContent] = useState("");
    // FIXME Esto se recarga muchas vecesm y genera muchos pedidos al s3
    const handleOpenModal = (file: string) => {
        
        if (file !== "") {
            let url = `records/${active?.activeUser?.User?.uid}/${file}.pdf`;
            // Realizar una petición a la API de Go para descargar el PDF
            const fetchUrl = async () => {
                const result = await urlDoc({ key: url, duration: '1m' });
                if (result && result.url) {
                    setPdfContent(result.url);
                    setIsOpen(true);
                }
            };
            fetchUrl();
        }

    };
    // ---------------------------------------
    const fileUploadRef = useRef<FileUpload>(null);

    const headerTemplate = (name, time, color, link) => {
        const headerTemplateService2 = (options: FileUploadHeaderTemplateOptions) => {
            const { className, chooseButton } = options;
            return (
                <div className={className} style={{ backgroundColor: "#3f5b9e", color: "#ffffff", display: 'flex', alignItems: 'center', padding: 5, margin: 0 }}>
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full md:w-2/4 lg:w-2/4">
                            <div className="w-full place-items-center">
                                <div className='text-2xl tracking-tight place-items-center pt-1'>
                                    {name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-2/3 pr-5">
                                    {time !== "" && <Badge value={time} severity={color} />}

                                </div>
                                <div className="grid text-center w-1/3">
                                    <div>
                                        {link !== "" && <ExternalLinkButton href={link} />}

                                    </div>
                                </div>
                                <div className="grid text-right">
                                    <div>{chooseButton}</div>
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
            <div className="text-center align-items-center flex-column">
                <span style={{ color: 'var(--text-color-secondary)' }} className="text-sm">
                    Drag and Drop File Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-upload', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-warning' };
    // ---------------------NECESARY DOCUMENTS--------------------------------------------
    const headerNecesaryDocuments = (name, time, color, link, file) => {
        return (
            <div style={{ backgroundColor: "#3f5b9e", color: "#ffffff", display: 'flex', alignItems: 'center', padding: 5, margin: 0, marginTop: 2 }}>
                <Dialog
                    header="Open file"
                    visible={isOpen}
                    maximizable
                    style={{ width: '50vw' }}
                    breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                    onHide={() => setIsOpen(false)}
                >
                    <p className="m-0">
                        <div className='w-full'>
                            {pdfContent !== "" && isOpen && <PdfViewer fileUrl={pdfContent} />}

                            {/* <iframe src={pdfContent} title="PDF" className='w-full h-screen' /> */}
                        </div>
                    </p>
                </Dialog>
                <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4">
                        <div className="w-full place-items-center">
                            <div className='text-2xl tracking-tight place-items-center pt-1'>
                                {name}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4">
                        <div className="flex w-full place-items-center">
                            <div className="grid flex-grow w-2/3 pr-5">
                                {time !== "" && <Badge value={time} severity={color} />}

                            </div>
                            <div className="grid text-center">
                                <div>
                                    {link !== "" && <ExternalLinkButton href={link} />}
                                </div>
                            </div>
                            <div className="grid w-2/3 text-right">
                                <div className='mr-4'>
                                    <Button
                                        icon="pi pi-paperclip"
                                        label={`${file}.pdf`}
                                        severity="warning"
                                        rounded
                                        onClick={() => { handleOpenModal(file) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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

    // ------- UPLOAD FILES -------------------------------------------------------------------
    const { uploadFiles, isUploadFiles } = useUploadFiles(relad);

    const handleFileChange = async (event: FileUploadSelectEvent, typeFile: keyof FormValuesNecesaryDocuments) => {
        const files = event.files;
        let urlfile = `records/${active?.activeUser?.User?.uid}/${typeFile}`;
        if (files && files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file: File) => {
                formData.append(urlfile, file);
            });
            uploadFiles({ files: formData, tipeFile: typeFile });
            ChangeFormValuesNecesaryDocuments(typeFile, true);
        }
    };

    return (
        <div className="w-full p-0 ">
            <div className='p-4 text-justify text-sm mt-5'>
                Please upload the following documents through our web system so that we can verify your information:
                <br />
            </div>
            <div className="card">
                {necesaryDocuments.diploma_transcripts ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Diploma and Transcripts",
                            "",
                            "",
                            "",
                            "diploma_transcripts"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        ref={fileUploadRef}
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "diploma_transcripts")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Diploma and Transcripts",
                                "",
                                "",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <div className="card">
                {necesaryDocuments.licenses_certifications ? (<div>
                    {headerNecesaryDocuments(
                        "Licenses/Certifications",
                        "",
                        "",
                        "",
                        "licenses_certifications"
                    )}
                </div>
                ) : (
                    <FileUpload
                        ref={fileUploadRef}
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "licenses_certifications")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Licenses/Certifications",
                                "",
                                "",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <div className="card">
                {necesaryDocuments.course_fcb ? (<div>
                    {headerNecesaryDocuments(
                        "50 Hours Course from FCB",
                        "",
                        "",
                        "",
                        "course_fcb"
                    )}
                </div>
                ) : (
                    <FileUpload
                        ref={fileUploadRef}
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "course_fcb")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "50 Hours Course from FCB",
                                "All certificates should be uploaded as one pdf document",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <div className="divider">
                <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
                    In-services
                </h1>
            </div>
            {/* Row 1 */}
            <div className="card">
                {necesaryDocuments.service_trainer_provider ? (<div>
                    {
                        headerNecesaryDocuments(
                            "10 Hours from FCB Accredited Trainer Provider",
                            "Every  Year",
                            "warning",
                            "https://www.amalias-training.org",
                            "service_trainer_provider"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_trainer_provider")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "10 Hours from FCB Accredited Trainer Provider",
                                "Every  Year",
                                "warning",
                                "https://www.amalias-training.org"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row2 */}
            <div className="card">
                {necesaryDocuments.service_cpr_aed ? (<div>
                    {
                        headerNecesaryDocuments(
                            "CPR / AED",
                            "Every 2 Years",
                            "warning",
                            "https://aedcpr.com",
                            "service_cpr_aed"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_cpr_aed")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "CPR / AED",
                                "Every 2 Years",
                                "warning",
                                "https://aedcpr.com"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 3 */}
            <div className="card">
                {necesaryDocuments.service_osha ? (<div>
                    {
                        headerNecesaryDocuments(
                            "OSHA (Occupational Exposure to Blood Borne Pathogens)",
                            "Every 3 Years",
                            "warning",
                            "https://fl.train.org/florida/login",
                            "service_osha"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_osha")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "OSHA (Occupational Exposure to Blood Borne Pathogens)",
                                "Every 3 Years",
                                "warning",
                                "https://fl.train.org/florida/login"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 4 */}
            <div className="card">
                {necesaryDocuments.service_infection_control ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Infection Control (Trainflorida)",
                            "Every 3 Years",
                            "warning",
                            "https://fl.train.org/florida/login",
                            "service_infection_control"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_infection_control")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Infection Control (Trainflorida)",
                                "Every 3 Years",
                                "warning",
                                "https://fl.train.org/florida/login"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 5 */}
            <div className="card">
                {necesaryDocuments.service_hiv_aids ? (<div>
                    {
                        headerNecesaryDocuments(
                            "HIV-AIDS (Trainflorida)",
                            "Only 1 time",
                            "success",
                            "https://fl.train.org/florida/login",
                            "service_hiv_aids"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_hiv_aids")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "HIV-AIDS (Trainflorida)",
                                "Only 1 time",
                                "success",
                                "https://fl.train.org/florida/login"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 6 */}
            <div className="card">
                {necesaryDocuments.service_domestic_violence ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Domestic Violence, Substance Abuse, Mental Health Disorder and Child Abuse",
                            "Only 1 time",
                            "success",
                            "https://fl.train.org/florida/login",
                            "service_domestic_violence"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_domestic_violence")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Domestic Violence, Substance Abuse, Mental Health Disorder and Child Abuse",
                                "Only 1 time",
                                "success",
                                "https://fl.train.org/florida/login"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 7 */}
            <div className="card">
                {necesaryDocuments.service_hippa ? (<div>
                    {
                        headerNecesaryDocuments(
                            "HIPPA",
                            "Only 1 time",
                            "success",
                            "https://www.myflfamilies.com/about/dcf-training",
                            "service_hippa"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_hippa")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "HIPPA",
                                "Only 1 time",
                                "success",
                                "https://www.myflfamilies.com/about/dcf-training"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 8 */}
            <div className="card">
                {necesaryDocuments.service_security_awareness ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Security Awarenes",
                            "Only 1 time",
                            "success",
                            "https://fl.train.org/florida/login",
                            "service_security_awareness"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_security_awareness")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Security Awarenes",
                                "Only 1 time",
                                "success",
                                "https://fl.train.org/florida/login"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 9 */}
            <div className="card">
                {necesaryDocuments.service_access_civil_rights ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Access Civil Rights",
                            "Only 1 time",
                            "success",
                            "https://www.myflfamilies.com/about/dcf-training",
                            "service_access_civil_rights"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_access_civil_rights")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Access Civil Rights",
                                "Only 1 time",
                                "success",
                                "https://www.myflfamilies.com/about/dcf-training"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 10 */}
            <div className="card">
                {necesaryDocuments.service_deaf_hard ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Service Delivery for the Deaf or Hard-of-Hearing",
                            "Only 1 time",
                            "success",
                            "https://www.myflfamilies.com/about/dcf-training",
                            "service_deaf_hard"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_deaf_hard")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Service Delivery for the Deaf or Hard-of-Hearing",
                                "Only 1 time",
                                "success",
                                "https://www.myflfamilies.com/about/dcf-training"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 11 */}
            <div className="card">
                {necesaryDocuments.service_fars_cfars ? (<div>
                    {
                        headerNecesaryDocuments(
                            "FARS/CFARS",
                            "Only 1 time",
                            "success",
                            "https://samhweb.myflfamilies.com/FARS/fars/fars_home.aspx",
                            "service_fars_cfars"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "service_fars_cfars")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "FARS/CFARS",
                                "Only 1 time",
                                "success",
                                "https://samhweb.myflfamilies.com/FARS/fars/fars_home.aspx"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <div className="divider">
                <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
                    Other document's
                </h1>
            </div>
            {/* Medicaid Certification */}
            <div className="card">
                {necesaryDocuments.other_medicaid_certification ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Medicaid Certification",
                            "If applicable",
                            "warning",
                            "",
                            "other_medicaid_certification"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_medicaid_certification")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Medicaid Certification",
                                "If applicable",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Medicaid Provider and NPI Number */}
            <div className="card">
                {necesaryDocuments.other_medicaid_provider ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Medicaid Provider and NPI Number",
                            "If applicable",
                            "warning",
                            "",
                            "other_medicaid_provider"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_medicaid_provider")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Medicaid Provider and NPI Number",
                                "If applicable",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <div className="card">
                {necesaryDocuments.other_drivers_license ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Driver’s License or Valid Picture ID",
                            "",
                            "",
                            "",
                            "other_drivers_license"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_drivers_license")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Driver’s License or Valid Picture ID",
                                "",
                                "",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>

            <div className="card">
                {necesaryDocuments.other_social_security_card ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Social Security Card",
                            "",
                            "",
                            "",
                            "other_social_security_card"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_social_security_card")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Social Security Card",
                                "",
                                "",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>

            {/* Row 1 */}
            <div className="card">
                {necesaryDocuments.other_proof_legal_status ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Proof of Legal Status",
                            "US Passport, Resident Card,Employment Authorization, etc.",
                            "warning",
                            "",
                            "other_proof_legal_status"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_proof_legal_status")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Proof of Legal Status",
                                "US Passport, Resident Card,Employment Authorization, etc.",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row2 */}
            <div className="card">
                {necesaryDocuments.other_employee_id_badge ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Employee ID Badge",
                            "",
                            "",
                            "",
                            "other_employee_id_badge"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_employee_id_badge")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Employee ID Badge",
                                "",
                                "",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 3 */}
            <div className="card">
                {necesaryDocuments.other_vehicle_registration ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Vehicle Registration ",
                            "If applicable",
                            "warning",
                            "",
                            "other_vehicle_registration"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_vehicle_registration")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Vehicle Registration ",
                                "If applicable",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Row 4 */}
            <div className="card">
                {necesaryDocuments.other_proof_insurance ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Proof of Insurance",
                            "If applicable",
                            "warning",
                            "",
                            "other_proof_insurance"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "other_proof_insurance")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Proof of Insurance",
                                "If applicable",
                                "warning",
                                ""
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* <div className="divider"> */}
            <h1 className='text-2xl font-bold tracking-tight text-center text-gray-900'>
                Get the forms I-9/W-9/W-4 from the corresponding link, fill it and then up load it signed
            </h1>
            {/* </div> */}
            {/* Form I-9 */}
            <div className="card">
                {necesaryDocuments.form_i9 ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Form I-9",
                            "",
                            "",
                            "https://www.uscis.gov/i-9",
                            "form_i9"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "form_i9")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Form I-9",
                                "",
                                "",
                                "https://www.uscis.gov/i-9"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Form W-9 */}
            <div className="card">
                {necesaryDocuments.form_w9 ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Form W-9",
                            "",
                            "",
                            "https://www.irs.gov/forms-pubs/about-form-w-9",
                            "form_w9"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "form_w9")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Form W-9",
                                "",
                                "",
                                "https://www.irs.gov/forms-pubs/about-form-w-9"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            {/* Form W-4 */}
            <div className="card">
                {necesaryDocuments.form_w4 ? (<div>
                    {
                        headerNecesaryDocuments(
                            "Form W-4",
                            "",
                            "",
                            "https://www.irs.gov/forms-pubs/about-form-w-4",
                            "form_w4"
                        )
                    }
                </div>
                ) : (
                    <FileUpload
                        multiple
                        accept="application/pdf"
                        maxFileSize={1000000}
                        auto
                        onSelect={(e) => handleFileChange(e, "form_w4")}
                        emptyTemplate={emptyTemplate}
                        headerTemplate={
                            headerTemplate(
                                "Form W-4",
                                "",
                                "",
                                "https://www.irs.gov/forms-pubs/about-form-w-4"
                            )}
                        chooseLabel="Upload"
                        chooseOptions={chooseOptions}
                    />
                )}
            </div>
            <ScrollTop style={{ backgroundColor: "#FBC02D" }}/>
        </div>
    );
};
type Props = {
    active?: Active;
    relad(): void;
};
export { Section2 };