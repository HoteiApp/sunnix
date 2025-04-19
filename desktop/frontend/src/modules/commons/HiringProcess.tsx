import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { useCoreUserInfo } from "../profile/hooks";

const HiringProcess = ({ uid, relad }: Props) => {
    const [numm, setNumm] = useState(0);
    const { userInfo, reloadUserInfo } = useCoreUserInfo({ uid });
    useEffect(() => {
        reloadUserInfo();
    }, [relad]);

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
    return (
        <div className='text-right'>
            {numm}%
            <ProgressBar
                value={numm}
                pt={{
                    value: { style: { background: 'linear-gradient(to right, #FEC001, #FEC001)' } }
                }}
                showValue={false}
                style={{ height: '5px' }}
            />
        </div>
    );
    // return <progress
    //     className="progress progress-warning"
    //     value={numm}
    //     max={100}
    // ></progress>
};
type Props = { 
    uid: string,
    relad(): void;
 }
export { HiringProcess };