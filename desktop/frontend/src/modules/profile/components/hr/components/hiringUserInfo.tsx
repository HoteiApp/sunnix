import React, { useEffect, useState } from 'react';
// import { Tag } from 'primereact/tag';
import { classNames } from "primereact/utils";
import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { ScrollTop } from 'primereact/scrolltop';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
// import { Dialog } from "primereact/dialog";

import { PdfViewer } from "../../../../commons";
// Hooks
import { useCoreUserInfo, useGetHiringUrls3 } from "../../../../profile/hooks";

const HiringUserinfo = ({ uid }: Props) => {
    const { urlDoc } = useGetHiringUrls3();
    const [numm, setNumm] = useState(0);
    const { userInfo, reloadUserInfo } = useCoreUserInfo({ uid });
    // useEffect(() => {
    //     reloadUserInfo();
    // }, [reloadUserInfo]);
    const [isOpen, setIsOpen] = useState(false);
    const [pdfContent, setPdfContent] = useState("");

    const handleOpenModal = (file: string) => {
        if (file !== "") {
            let url = `records/${uid}/${file}.pdf`;
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

    useEffect(() => {
        const record = userInfo?.userInfo?.Record;
        let num = 0;
        if (record) {
            if (record.fullname !== "") { num++; }
            if (record.email !== "") { num++; }
            if (record.address !== "") { num++; }
            if (record.city !== "") { num++; }
            if (record.state !== "") { num++; }
            if (record.zip_code !== "") { num++; }
            if (record.county !== "") { num++; }
            if (record.home_phone !== "") { num++; }
            if (record.cell_phone !== "") { num++; }
            if (record.social_security !== "") { num++; }
            if (record.dob !== "") { num++; }
            // --------- 11
            if (record.available_for !== "") { num++; }
            if (record.application_date !== "") { num++; }
            if (record.available_start_date !== "") { num++; }
            // --------- QUESTION 14
            if (record.question1 !== "") { num++; }
            if (record.question2 !== "") { num++; }
            if (record.question3 !== "") { num++; }
            if (record.question4 !== "") { num++; }
            if (record.question5 !== "") { num++; }
            if (record.question6 !== "") { num++; }
            if (record.question7 !== "") { num++; }
            if (record.question8 !== "") { num++; }
            if (record.question9 !== "") { num++; }
            if (record.question10 !== "") { num++; }
            if (record.question11 !== "") { num++; }
            if (record.question12 !== "") { num++; }
            // --------- 26
            if (record.language_list !== "") { num++; }
            if (record.skills_list !== "") { num++; }
            // --------- EDUCATION 28
            if (record.education.institution !== "") { num++; }
            if (record.education.course !== "") { num++; }
            if (record.education.started !== "") { num++; }
            if (record.education.completed !== "") { num++; }
            // --------- Employment History 32
            if (record.employment_history.employer !== "") { num++; }
            if (record.employment_history.address !== "") { num++; }
            if (record.employment_history.supervisor !== "") { num++; }
            if (record.employment_history.phone !== "") { num++; }
            if (record.employment_history.period !== "") { num++; }
            if (record.employment_history.position !== "") { num++; }
            if (record.employment_history.reason !== "") { num++; }
            // --------- Personal References 39
            if (record.personal_references.name !== "") { num++; }
            if (record.personal_references.phone !== "") { num++; }
            if (record.personal_references.relationship !== "") { num++; }
            if (record.personal_references.second_name !== "") { num++; }
            if (record.personal_references.second_phone !== "") { num++; }
            if (record.personal_references.second_relationship !== "") { num++; }
            // --------- Emergency Medical Information 45
            if (record.emergency_medical.name !== "") { num++; }
            if (record.emergency_medical.relationship !== "") { num++; }
            if (record.emergency_medical.cell_phone !== "") { num++; }

            if (record.emergency_medical.physicians_name !== "") { num++; }
            if (record.emergency_medical.physicians_phone !== "") { num++; }
            if (record.emergency_medical.preferred_hospital !== "") { num++; }
            if (record.emergency_medical.medical_insurance !== "") { num++; }
            if (record.emergency_medical.policy !== "") { num++; }
            // --------- Necesary Documents 57
            if (record.necessary_documents.resume) { num += 3; }
            if (record.necessary_documents.diploma_transcripts) { num += 2; }
            if (record.necessary_documents.licenses_certifications) { num += 2; }
            if (record.necessary_documents.course_fcb) { num += 2; }
            if (record.necessary_documents.service_trainer_provider) { num += 2; }
            if (record.necessary_documents.service_cpr_aed) { num += 2; }
            if (record.necessary_documents.service_infection_control) { num += 2; }
            if (record.necessary_documents.service_hiv_aids) { num += 2; }
            if (record.necessary_documents.service_domestic_violence) { num += 2; }
            if (record.necessary_documents.service_hippa) { num += 2; }
            if (record.necessary_documents.service_security_awareness) { num += 2; }
            if (record.necessary_documents.service_access_civil_rights) { num += 2; }
            if (record.necessary_documents.service_deaf_hard) { num += 2; }
            if (record.necessary_documents.service_fars_cfars) { num += 2; }
            // ---
            if (record.necessary_documents.other_drivers_license) { num += 2; }
            if (record.necessary_documents.other_social_security_card) { num += 2; }
            if (record.necessary_documents.other_proof_legal_status) { num += 2; }
            if (record.necessary_documents.other_employee_id_badge) { num += 2; }
            if (record.necessary_documents.form_i9) { num += 2; }
            if (record.necessary_documents.form_w9) { num += 2; }
            if (record.necessary_documents.form_w4) { num += 2; }
            // --------- Direct Deposit
            if (record.direct_deposit.financial_institution) { num++; }
            if (record.direct_deposit.account_number) { num++; }
            if (record.direct_deposit.routing_number) { num++; }
            if (record.direct_deposit.options) { num++; }
        }
        setNumm(num);
    }, [userInfo]);

    // const [visible, setVisible] = useState(false);

    return (
        <div className="card">
            {/* Test vista en Dialog */}
            <div className="card flex justify-content-center">
                <TabView>
                    <TabPanel header="Application">
                        <div className="w-full p-0 border-2 border-primary" style={{ height: '70vh', 'overflow': 'auto' }}>
                            <div className='p-3 bg-gray-200'>
                                <div className='text-2xl tracking-tight place-items-center'>Personal Information</div>
                            </div >
                            <div className="m-0 p-0 border-t-2 border-primary">
                                {/* row 1 */}
                                <div className="flex w-full">
                                    <div className="flex w-full border-b-2 border-primary">
                                        <div className="flex w-1/3 border-primary place-items-center">
                                            <div className="flex-grow w-1/4 pl-5">
                                                Full Name:
                                            </div>
                                            <div className="border-r-2 border-primary w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.fullname === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.fullname}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-primary border-b-0">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-2/4 pl-5">
                                                    E-Mail Address:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.email === "" ? (
                                                            <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                        ) : (
                                                            <div>{userInfo?.userInfo?.Record?.email}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/3 place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-5">
                                                Home Address:
                                            </div>
                                            <div className="grid w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.address}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* row 2 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        City:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.city}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/5">
                                                            State:
                                                        </div>
                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.state}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">

                                                    <div className="grid w-2/4 pl-4">
                                                        Zip Code:
                                                    </div>

                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.zip_code}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">

                                                        <div className="grid w-2/5">
                                                            County:
                                                        </div>
                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.county}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 3 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Home Phone:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.home_phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/5">
                                                            Cell Phone:
                                                        </div>

                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.cell_phone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Social Security:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.social_security}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/5">
                                                            DOB:
                                                        </div>

                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.dob}
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
                            <div className='p-3 bg-gray-200'>
                                <div className='text-2xl tracking-tight place-items-center'>Position / Availability</div>
                            </div>
                            <div className="m-0 p-0 w-full border-t-2 border-primary">
                                {/* row 1 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Application Date:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.application_date}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/5">
                                                            Applying as:
                                                        </div>

                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.applying_as}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Position applied:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.position_applied}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-full">
                                                            Available Start Date:
                                                        </div>
                                                        <div className="grid w-3/5">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.available_start_date === "" ? (
                                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                                ) : (
                                                                    <div>{userInfo?.userInfo?.Record?.available_start_date}</div>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 2 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-4">
                                                Available For:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0 m-0 text-right">
                                                {userInfo?.userInfo?.Record?.available_for === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.available_for}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-4">
                                                Resume:
                                            </div>
                                            <div className="grid w-2/4 p-1 pl-0 text-right">
                                                <div>
                                                    {/* vacio??? */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 3 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-3/4 pl-4">
                                                Are you currently employed?
                                            </div>
                                            <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question1 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question1}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-3/4 pl-4">
                                                Do you have a valid driver's license?
                                            </div>
                                            <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question2 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question2}</div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* row 4 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-full pl-4">
                                                If you are currently employed can we contact other employers?
                                            </div>
                                            <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question3 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question3}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">

                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-3/4 pl-4">
                                                Do you have a reliable, insured mean of transportation?
                                            </div>
                                            <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question4 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question4}</div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* row 5 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-full pl-4">
                                                Are you willing to travel (locally)in the performing of your duties?
                                            </div>
                                            <div className="grid w-2/12 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question5 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question5}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">

                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-3/4 pl-4">
                                                Have you pleaded guilty to a crime within the last 7 years?
                                            </div>
                                            <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question6 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question6}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 6 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-3/4 pl-4">
                                                Have you been convicted of a crime within the last 7 years?
                                            </div>
                                            <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question7 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question7}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-full pl-4">
                                                Have you been on probation within the last 7 years?
                                            </div>
                                            <div className="grid w-2/4 p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question8 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question8}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 7 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-3/4 pl-4">
                                                Are you 18 years of age or older?
                                            </div>
                                            <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question9 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question9}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-full pl-4">
                                                Have you ever been accused of or investigatedfor child abuse/neglect?
                                            </div>
                                            <div className="grid w-1/12 p-1 pl-0 pr-5 text-right">
                                                {userInfo?.userInfo?.Record?.question10 === "" ? (
                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                ) : (
                                                    <div>{userInfo?.userInfo?.Record?.question10}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 8 */}
                                {userInfo?.userInfo?.Record?.details_questions_in_yes !== "" && <div className="flex w-full">
                                    <div className="w-full border-b-2 border-primary">
                                        <div className="w-full place-items-center">
                                            <div className="w-full pl-4">
                                                <p className="m-0 text-justify pr-5">
                                                    A plea of guilty or a conviction will not necessarily prevent you from being employed.
                                                    Factors such as age at time of the offense, seriousness and nature of the offense, and
                                                    rehabilitation efforts will be taken into account.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full place-items-center">
                                            <div className="grid w-full p-1 pl-5">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.details_questions_in_yes}
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
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-full pl-4">
                                                Do you speak any language other than English?
                                            </div>
                                            <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                                                {/* {userInfo?.userInfo?.Record?.question11} */}
                                                YES
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">

                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-3/4 pl-4">
                                                Do you know sign language?
                                            </div>
                                            <div className="grid w-1/4 border-primary p-1 pl-0 pr-5 text-right">
                                                {/* {userInfo?.userInfo?.Record?.question12} */}
                                                YES
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b-2 border-primary'>
                                    <div className="flex w-full place-items-center">
                                        <div className="grid flex-grow w-1/4 pl-4">
                                            List any languages that you speak:
                                        </div>
                                        <div className="grid w-3/4 p-1 pl-0">
                                            <div className="card p-fluid">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.language_list}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 10 */}
                                <div className='p-3'>
                                    <b>Please list your areas of highest proficiency, special skills or other items that may contribute to your abilities in performing the above mentioned position:</b>
                                </div>
                                <div className='p-3'>
                                    <div className="card p-fluid">
                                        <div className="p-inputgroup flex-1">
                                            {userInfo?.userInfo?.Record?.skills_list}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* EDUCATION */}
                            <div className='p-3 bg-gray-200 border-t-2 border-primary'>
                                <div className='text-2xl tracking-tight place-items-center'>Education</div>
                            </div>
                            <div className="m-0 p-0 w-full border-t-2 border-primary">
                                {/* row 1 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Institution:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.education.institution === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.education.institution}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-5">
                                                Course of Study:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-2/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.education.course === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.education.course}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Started:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.education.started === "" ? (
                                                                <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                            ) : (
                                                                <div>{userInfo?.userInfo?.Record?.education.started}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/4 pl-4">
                                                            Completed:
                                                        </div>

                                                        <div className="grid w-2/4">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.education.completed === "" ? (
                                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                                ) : (
                                                                    <div>{userInfo?.userInfo?.Record?.education.completed}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 2 */}
                                {userInfo?.userInfo?.Record?.education.second_institution !== "" &&
                                    <div className="flex w-full">
                                        <div className="w-2/4 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/4 pl-5">
                                                    Institution:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.education.second_institution === "" ? (
                                                            <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                        ) : (
                                                            <div>{userInfo?.userInfo?.Record?.education.second_institution}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-2/4 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-2/4 pl-5">
                                                    Course of Study:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-2/4 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.education.second_course === "" ? (
                                                            <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                        ) : (
                                                            <div>{userInfo?.userInfo?.Record?.education.second_course}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-2/4 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                    <div className="flex w-full place-items-center p-0 m-0">
                                                        <div className="grid w-2/4 pl-4">
                                                            Started:
                                                        </div>
                                                        <div className="grid w-2/4">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.education.second_started === "" ? (
                                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                                ) : (
                                                                    <div>{userInfo?.userInfo?.Record?.education.second_started}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex w-2/4 p-1">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="flex w-full place-items-center">
                                                            <div className="grid w-2/4 pl-4">
                                                                Completed:
                                                            </div>

                                                            <div className="grid w-2/4">
                                                                <div className="p-inputgroup flex-1">
                                                                    {userInfo?.userInfo?.Record?.education.second_completed === "" ? (
                                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                                    ) : (
                                                                        <div>{userInfo?.userInfo?.Record?.education.second_completed}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* row 3 */}
                                {userInfo?.userInfo?.Record?.education.third_institution !== "" && <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Institution:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.education.third_institution === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.education.third_institution}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-5">
                                                Course of Study:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-2/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.education.third_course === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.education.third_course}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex border-r-2 border-primary w-2/4 p-1">
                                                <div className="flex w-full place-items-center p-0 m-0">
                                                    <div className="grid w-2/4 pl-4">
                                                        Started:
                                                    </div>
                                                    <div className="grid w-2/4">
                                                        <div className="p-inputgroup flex-1">
                                                            {userInfo?.userInfo?.Record?.education.third_started === "" ? (
                                                                <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                            ) : (
                                                                <div>{userInfo?.userInfo?.Record?.education.third_started}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-2/4 p-1">
                                                <div className="flex w-full place-items-center">
                                                    <div className="flex w-full place-items-center">
                                                        <div className="grid w-2/4 pl-4">
                                                            Completed:
                                                        </div>
                                                        <div className="grid w-2/4">
                                                            <div className="p-inputgroup flex-1">
                                                                {userInfo?.userInfo?.Record?.education.third_completed === "" ? (
                                                                    <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                                ) : (
                                                                    <div>{userInfo?.userInfo?.Record?.education.third_completed}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            {/* EMPLOYMENT HISTORY */}
                            <div className='p-3 bg-gray-200'>
                                <div className='text-2xl tracking-tight place-items-center'>Employment History</div>
                            </div>
                            <div className="m-0 p-0 w-full border-t-2 border-primary">
                                {/* EMPLOYMENT HISTORY 1 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Employer:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.employer === "" ? "N/A" : userInfo?.userInfo?.Record?.employment_history.employer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Address:
                                            </div>
                                            <div className="grid  w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.address === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.address}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 2 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-5">
                                                Supervisor or contact person:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-2/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.supervisor === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.supervisor}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Phone Number:
                                            </div>
                                            <div className="grid w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.phone === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.phone}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center border-r-2 border-primary">
                                            <div className="flex-grow w-2/5 pl-5">
                                                Period you worked:
                                            </div>
                                            <div className="border-primary w-3/5 p-1 pl-5">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.period === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.period}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Position Held:
                                            </div>
                                            <div className="grid  w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.position === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.position}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full place-items-center">
                                    <div className="w-full p-1 pl-0">
                                        <div className="flex w-full">
                                            <div className="w-1/6 place-items-center">
                                                <div className="w-full pl-5">
                                                    <p className="m-0 text-justify">
                                                        Reason for leaving:
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-5/6 place-items-center">
                                                <div className="grid w-full pl-5">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.employment_history.reason === "" ? (
                                                            <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                        ) : (
                                                            <div>{userInfo?.userInfo?.Record?.employment_history.reason}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* EMPLOYMENT HISTORY 2 */}
                                <div className="flex w-full border-t-2 border-primary">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Employer:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_employer === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_employer}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Address:
                                            </div>
                                            <div className="grid w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_address === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_address}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* row 2 */}
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-2/4 pl-5">
                                                Supervisor or contact person:
                                            </div>
                                            <div className="grid border-r-2 border-primary w-2/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_supervisor === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_supervisor}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Phone Number:
                                            </div>
                                            <div className="grid w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_phone === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_phone}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex-grow w-2/5 pl-5">
                                                Period you worked:
                                            </div>
                                            <div className="border-r-2 border-primary w-3/5 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_period === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_period}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4 border-b-2 border-primary">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid flex-grow w-1/4 pl-5">
                                                Position Held:
                                            </div>
                                            <div className="grid w-3/4 p-1 pl-0">
                                                <div className="p-inputgroup flex-1">
                                                    {userInfo?.userInfo?.Record?.employment_history.second_position === "" ? (
                                                        <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                    ) : (
                                                        <div>{userInfo?.userInfo?.Record?.employment_history.second_position}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full place-items-center">
                                    <div className="grid w-full p-1 pl-0">
                                        <div className="w-full">
                                            <div className="w-full place-items-center">
                                                <div className="w-full pl-5">
                                                    <p className="m-0 text-justify">
                                                        Reason for leaving:
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full place-items-center">
                                                <div className="grid w-full p-1 pl-5">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.employment_history.second_reason === "" ? (
                                                            <div className="w-full"><input className="w-full" type="text" value="" /></div>
                                                        ) : (
                                                            <div>{userInfo?.userInfo?.Record?.employment_history.second_reason}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* continuacion */}
                                {/* PERSONAL REFERENCES */}
                                <div className='p-3 bg-gray-200 border-t-2 border-black'>
                                    <div className='text-2xl tracking-tight place-items-center'>Personal References</div>
                                </div>
                                <div className="m-0 p-0 w-full border-t-2 border-primary">
                                    {/* Personal ref. row 1 */}
                                    <div className="flex w-full">
                                        <div className="w-1/3 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Name:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-b-2 border-r-2 content-center border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Phone Number:
                                                </div>
                                                <div className="grid w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-b-2 border-primary content-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Relationship:
                                                </div>
                                                <div className="grid  w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.relationship}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Personal ref. row 2 */}
                                    <div className="flex w-full">
                                        <div className="w-1/3 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Name:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.second_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-b-2 border-r-2 border-primary content-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Phone Number:
                                                </div>
                                                <div className="grid  w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.second_phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-b-2 border-primary content-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Relationship:
                                                </div>
                                                <div className="grid  w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.personal_references?.second_relationship}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* EMERGENCY MEDICAL INFORMATION */}
                                <div className='p-3 bg-gray-200 border-black'>
                                    <div className='text-2xl tracking-tight place-items-center'>Emergency Medical Information</div>
                                </div>
                                <div className="m-0 p-0 w-full border-t-2 border-primary">
                                    <div className="flex w-full border-b-2 p-4 border-primary">
                                        <p>In case of a medical emergency, I authorice</p><p className="pl-2 pr-2"><b>Social Diversity LLC</b></p><p>contact the following person:</p>
                                    </div>
                                    {/* ROW 1 */}
                                    <div className="flex w-full">
                                        <div className="w-1/2 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Name:
                                                </div>
                                                <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/2 border-b-2 border-primary">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Relationship:
                                                </div>
                                                <div className="grid w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.relationship}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ROW 2 */}
                                    <div className="flex w-full">
                                        <div className="flex w-1/2 border-b-2 border-r-2 border-primary">
                                            <div className="flex w-1/2 border-r-2 border-primary place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Cell Phone:
                                                </div>
                                                <div className="grid border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.cell_phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/2 place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Home Phone:
                                                </div>
                                                <div className="grid border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.home_phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 border-b-2 border-primary">
                                            <div className="flex w-1/2 border-r-2 border-primary place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Employer:
                                                </div>
                                                <div className="grid border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.employer}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-1/2 place-items-center">
                                                <div className="grid flex-grow w-1/2 pl-5">
                                                    Phone Number:
                                                </div>
                                                <div className="grid border-primary w-1/2 p-1 pl-0">
                                                    <div className="p-inputgroup flex-1">
                                                        {userInfo?.userInfo?.Record?.emergency_medical?.employer_phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full pl-4 pt-2 pb-2 border-t-0 border-r-0 border-primary">
                                    <p>Known Allergies:</p>
                                    <input className="pl-4" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.known_allergies} />
                                </div>
                                <div className="w-full pl-4 pt-2 border-t-2 border-r-0 border-primary">
                                    <p>Any Special Health Condition or Medical Information That Medical Personnel Should Know:</p>
                                    <input className="pl-4 pt-2" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.known_allergies} />
                                </div>
                                <div className="w-full pl-4 pt-2 pb-2 border-t-2 border-r-0 border-primary">
                                    <p>Medication:</p>
                                    <input className="pl-4 pt-2" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.medications} />
                                </div>
                                <div className="flex w-full border-t-2 border-r-0 border-primary">
                                    <div className="flex w-1/2 border-r-2 border-b-2 border-primary">
                                        <div className="flex w-1/2 border-r-2 border-primary">
                                            <div className="w-1/2 pl-4 border-primary content-center">
                                                <div><p>Physician's Name:</p></div>
                                            </div>
                                            <div className="w-1/2 content-center">
                                                <input className="w-full pl-4" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.physicians_name} />
                                            </div>
                                        </div>
                                        <div className="flex w-1/2">
                                            <div className="w-1/2 pl-4 border-primary content-center">
                                                <div><p>Cell Phone:</p></div>
                                            </div>
                                            <div className="w-1/2 content-center">
                                                <input className="w-full pl-4" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.physicians_phone} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2 border-b-2 border-primary">
                                        <div className="flex w-full">
                                            <div className="w-1/2 pl-4 border-primary content-center">
                                                <div><p>Preferred Hospital:</p></div>
                                            </div>
                                            <div className="w-1/2 content-center">
                                                <input className="w-full pl-4" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.preferred_hospital} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full border-b-2 border-primary">
                                    <div className="flex w-1/2 pl-4 border-r-2 border-primary">
                                        <div className="w-1/3"><p>Medical Insurance Provider:</p></div>
                                        <div className="w-2/3"><input className="w-full" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.medical_insurance} /></div>
                                    </div>
                                    <div className="flex w-1/2">
                                        <div className="w-1/3 pl-4"><p>Policy Number:</p></div>
                                        <div className="w-2/3"><input className="w-full" type="text" value={userInfo?.userInfo?.Record?.emergency_medical?.policy} /></div>
                                    </div>
                                </div>
                                {/* DIRECT DEPOSIT AUTHORIZATION FORM */}
                                <div className='p-3 bg-gray-200 border-b-2 border-black'>
                                    <div className='text-2xl tracking-tight place-items-center'>Direct Deposit Authorization Form</div>
                                </div>
                                <div className="flex w-full border-b-2 border-primary ">
                                    <div className="flex w-1/2 border-r-2 border-primary">
                                        <div className="flex w-1/2 border-r-2 border-primary">
                                            <div className="w-2/3 pl-4">
                                                <p>Name of Financial Institution:</p>
                                            </div>
                                            <div className="w-1/3">
                                                <input className="w-full" type="text" value={userInfo?.userInfo?.Record?.direct_deposit?.financial_institution} />
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 pl-4">
                                            <div className="w-1/2">
                                                <p>Routing Number:</p>
                                            </div>
                                            <div className="w-1/2">
                                                <input type="text" value={userInfo?.userInfo?.Record?.direct_deposit?.routing_number} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2">
                                        <div className="flex w-2/5 pl-4 border-r-2 border-primary">
                                            <div className="w-1/2">
                                                <p>Account Number:</p>
                                            </div>
                                            <div className="w-1/2">
                                                <input className="w-full" type="text" value={userInfo?.userInfo?.Record?.direct_deposit?.account_number} />
                                            </div>
                                        </div>
                                        <div className="flex w-2/5 border-r-2 border-primary pl-4">
                                            <div className="w-1/2">
                                                <p>Routing Number:</p>
                                            </div>
                                            <div className="w-1/2">
                                                <input className="w-full" type="text" value={userInfo?.userInfo?.Record?.direct_deposit?.routing_number} />
                                            </div>
                                        </div>
                                        <div className="w-1/5 pl-4">{userInfo?.userInfo?.Record?.direct_deposit?.options}</div>
                                    </div>
                                </div>
                                {/* fin continuacion. */}
                            </div>
                            <ScrollTop className="bg-secondary" target="parent" />
                        </div>
                    </TabPanel>
                    <TabPanel header="Services">
                        <div className="w-full p-0" style={{ height: '60vh', 'overflow': 'auto' }}>

                            <div className="w-full flex">
                                <div className='w-1/3 pr-2'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_trainer_provider) { handleOpenModal("service_trainer_provider"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_trainer_provider ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_trainer_provider ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>10 Hours from FCB</b></div>
                                        <div className="stat-title"><i>Accredited Trainer Provider</i></div>
                                        <div className="stat-desc text-secondary">Every  Year</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed) { handleOpenModal("service_cpr_aed"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title "><b>CPR / AED &nbsp;</b></div>
                                        <div className="stat-desc text-secondary">Every 2 Years</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_osha) { handleOpenModal("service_osha"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_osha ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_osha ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>OSHA</b></div>
                                        <div className="stat-title"><i>(Occupational Exposure to <br /> Blood Borne Pathogens)</i></div>
                                        <div className="stat-desc text-secondary">Every 3 Years</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_infection_control) { handleOpenModal("service_infection_control"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_infection_control ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_infection_control ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Infection Control</b></div>
                                        <div className="stat-title"><i>(Trainflorida)</i></div>
                                        <div className="stat-desc text-secondary">Every 3 Years</div>
                                    </div>
                                </div>
                                <div className='w-1/3 pr-2'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_hiv_aids) { handleOpenModal("service_hiv_aids"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_hiv_aids ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_hiv_aids ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>HIV / AIDS</b></div>
                                        <div className="stat-title"><i>Trainflorida</i></div>
                                        <div className="stat-desc text-secondary">Only 1 Time</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_domestic_violence) { handleOpenModal("service_domestic_violence"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_domestic_violence ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_domestic_violence ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title "><b>Domestic Violence, Substance Abuse</b></div>
                                        <div className="stat-title "><i>Mental Health Disorder and Child Abuse</i></div>
                                        <div className="stat-desc text-secondary">only 1 Time</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_fars_cfars) { handleOpenModal("service_fars_cfars"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_fars_cfars ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_fars_cfars ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>FARS / CFARS</b></div>
                                        <div className="stat-desc text-secondary">Only 1 Time</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_hippa) { handleOpenModal("service_hippa"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_hippa ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_hippa ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>HIPPA</b></div>
                                        <div className="stat-desc text-secondary">Only 1 Time</div>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_access_civil_rights) { handleOpenModal("service_access_civil_rights"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_access_civil_rights ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_access_civil_rights ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Access Civil Rights</b></div>
                                        <div className="stat-desc text-secondary">Only 1 Time</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_deaf_hard) { handleOpenModal("service_deaf_hard"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_deaf_hard ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_deaf_hard ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title "><b>Service Delivery</b></div>
                                        <div className="stat-title "><i>for the Deaf or Hard-of-Hearing</i></div>
                                        <div className="stat-desc text-secondary">only 1 Time</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.service_security_awareness) { handleOpenModal("service_security_awareness"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.service_security_awareness ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.service_security_awareness ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Security Awarenes</b></div>

                                        <div className="stat-desc text-secondary">Only 1 Time</div>
                                    </div>
                                </div>


                            </div>

                            <ScrollTop className="bg-secondary" target="parent" />
                        </div>
                    </TabPanel>
                    <TabPanel header="Personal documents and other information">

                        <div className="w-full p-0" style={{ height: '60vh', 'overflow': 'auto' }}>
                            <div className="w-full flex">
                                <div className='w-1/3 pr-2'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.resume) { handleOpenModal("resume"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.resume ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.resume ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Resume</b></div>
                                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.diploma_transcripts) { handleOpenModal("diploma_transcripts"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.diploma_transcripts ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.diploma_transcripts ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title "><b>Diploma / Transcripts</b></div>
                                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.licenses_certifications) { handleOpenModal("licenses_certifications"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.licenses_certifications ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.licenses_certifications ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Licenses / Certifications</b></div>
                                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.course_fcb) { handleOpenModal("course_fcb"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.course_fcb ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.course_fcb ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Course FCB</b></div>
                                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                                    </div>
                                </div>
                                <div className='w-1/3 pr-2'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_certification) { handleOpenModal("other_medicaid_certification"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_certification ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_certification ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Medicaid Certification</b></div>
                                        <div className="stat-desc text-secondary">If applicable</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_provider) { handleOpenModal("other_medicaid_provider"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_provider ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_medicaid_provider ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Medicaid Provider and NPI Number</b></div>
                                        <div className="stat-desc text-secondary">If applicable</div>
                                    </div>
                                    &nbsp;
                                    <div className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_drivers_license) { handleOpenModal("other_drivers_license"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_drivers_license ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_drivers_license ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Driver’s License or Valid Picture ID</b></div>
                                        <div className="stat-desc text-secondary"></div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_social_security_card) { handleOpenModal("other_social_security_card"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_social_security_card ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_social_security_card ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Social Security Card</b></div>
                                        <div className="stat-desc text-secondary"></div>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_proof_legal_status) { handleOpenModal("other_proof_legal_status"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_proof_legal_status ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_proof_legal_status ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Proof of Legal Status</b></div>
                                        <i style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                            US Passport, Resident Card, Employment Authorization, etc.
                                        </i>
                                        <div className="stat-desc text-secondary"></div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => {
                                            if (userInfo?.userInfo?.Record?.necessary_documents.other_employee_id_badge) {
                                                handleOpenModal("other_employee_id_badge");
                                            }
                                        }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_employee_id_badge ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_employee_id_badge ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Employee ID Badge</b></div>
                                        <div className="stat-desc text-secondary"></div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_vehicle_registration) { handleOpenModal("other_vehicle_registration"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_vehicle_registration ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_vehicle_registration ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Vehicle Registration</b></div>
                                        <div className="stat-desc text-secondary">If applicable</div>
                                    </div>
                                    &nbsp;
                                    <div
                                        className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => { if (userInfo?.userInfo?.Record?.necessary_documents.other_proof_insurance) { handleOpenModal("other_proof_insurance"); } }}
                                    >
                                        <div className="stat-figure text-secondary">
                                            <div className={classNames(
                                                "avatar",
                                                userInfo?.userInfo?.Record?.necessary_documents.other_proof_insurance ? "online" : "offline",
                                            )}>
                                                <div className="w-16">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        className={classNames(
                                                            "w-16 h-16",
                                                            userInfo?.userInfo?.Record?.necessary_documents.other_proof_insurance ? "text-warning" : "text-gray-400",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stat-value"></div>
                                        <div className="stat-title"><b>Proof of Insurance</b></div>
                                        <div className="stat-desc text-secondary">If applicable</div>
                                    </div>
                                </div>
                            </div>
                            <ScrollTop className="bg-secondary" target="parent" />
                        </div>

                    </TabPanel>
                </TabView>
            </div>


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
        </div>
    );
};
type Props = { uid: string }
export { HiringUserinfo };