import React, { useState, useEffect, useRef } from 'react';

import { faFileCircleCheck, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import SignatureCanvas, { SignatureCanvasRef } from 'react-signature-canvas';
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";

import { HiringProcess, Countdown } from "../../modules/commons";

import { ProgressSpinner } from "primereact/progressspinner";
import { Tooltip as ReactTooltip } from 'react-tooltip';

import logo from "../../../src/images/LogoSunnix.png";
import myFLF from '../../../src/images/myFLF.png'
import 'react-tooltip/dist/react-tooltip.css';

import { useSignature, useUserActivity } from "../../modules/profile/hooks";
// -- New Struct
import { Active, FormValuesPersonalInformation } from "../../models";

const Banner = ({ active, relad }: Props) => {
  const signatureRef = useRef<SignatureCanvasRef>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [imageData, setImageData] = useState("");

  const saveSignature = (signature) => {
    setImageData(signature);
  }

  const [hiring, setHiring] = useState(0);


  // ---------------------PERSONAL INFORMATION - POSITION / AVAILABILITY--------------------------------------------
  const [personalInformation] = useState<FormValuesPersonalInformation>({
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
  // const handleChangeFormValues = <T extends string | boolean>(name: keyof FormValuesPersonalInformation, value: T) => {
  //   setPersonalInformation(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));

  //   return personalInformation
  // };
  const { sign } = useSignature(relad);

  const { userActivity, isLoading } = useUserActivity();

  const footerContent = (
    <div>
      {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
      {/* <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" /> */}
      <Button
        label="Submit"
        icon="pi pi-check"
        className='p-button-warning'
        onClick={() => {
          sign({ signature: imageData });
        }}
        autoFocus
      />
    </div>
  );

  const explicitTheme: ThemeInput = {
    light: ['#d7dae0', '#efd086', '#FAB710', '#5688c9', '#1c60bf'],
    dark: ['#d7dae0', '#efd086', '#FAB710', '#5688c9', '#1c60bf'],
    // light: ['#d7dae0', '#B9B9B9', '#898989', '#5C5C5C', '#333333'],
    // dark: ['#d7dae0', '#B9B9B9', '#898989', '#5C5C5C', '#333333'],
  };


  useEffect(() => {
    let num = 0
    const record = active?.activeUser?.Record;
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
    setHiring(num);
  }, [active?.activeUser?.Record]);

  return (
    <div className="flex mt-12 items-center justify-center flex-col md:flex-row lg:mx-26 bg-gray-200 overflow-y-auto">
      <div className="stats bg-gray-200 w-full items-center">
        <div className="stat">
          <div className="stat text-primary text-left justify-center">

            <div className="stat-value">
              {active?.activeUser?.User?.roll === "tmp" && "Hiring Zone"}
              {active?.activeUser?.User?.roll === "DEVOPS" && "DEVOPS PORTFOLIO"}
              {active?.activeUser?.User?.roll === "HR" && "HR PORTFOLIO"}
              {active?.activeUser?.User?.roll === "FINANCE" && "FINANCE PORTFOLIO"}
              {active?.activeUser?.User?.roll === "BILLER" && "BILLING PORTFOLIO"}
              {active?.activeUser?.User?.roll === "QA" && "QA PORTFOLIO"}
              {active?.activeUser?.User?.roll === "TCMS" && "SUPERVISOR PORTFOLIO"}
              {active?.activeUser?.User?.roll === "TCM" && "TCM PORTFOLIO"}
            </div>
            <div className="stat-title">
              12001 SW 128 CT SUITE 101 MIAMI FL 33186 <br />
              Phone/Fax: (786)975-7485/(954)860-7166
            </div>
          </div>
        </div>

        {active?.activeUser?.User?.roll !== "tmp" &&
          <div className="stat">
            <div className="stat-value">
              {/* {hiring}% */}
              Activity Register
            </div>
            <div className="stat-title"></div>
            {isLoading ? (
              <ProgressSpinner
                animationDuration="2s"
                className="h-24 w-24"
                strokeWidth="5"
                fill="var(--surface-ground)"
              />
            ) : (
              <ActivityCalendar
                data={userActivity || []}
                labels={{
                  legend: {
                    less: "-",
                    more: "+",
                  },
                  // totalCount: "{{count}} activities in {{year}}",
                  totalCount: "{{count}} activities",
                  weekdays: ["S", "M", "T", "W", "T", "F", "S"],
                }}
                eventHandlers={{
                  onClick: (event) => (activity) => {
                    alert(JSON.stringify(activity));
                  },
                }}
                showWeekdayLabels
                blockSize={15}
                blockRadius={5}
                blockMargin={2}
                fontSize={10}
                colorScheme='dark'
                renderBlock={(block, activity) =>
                  React.cloneElement(block, {
                    'data-tooltip-id': 'react-tooltip',
                    'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
                  })
                }
                theme={explicitTheme}
              />
            )}
            <ReactTooltip id="react-tooltip" />
            <div className="stat-desc text-primary">
              <span>
                {/* Fill in all the fields to complete your hiring */}
              </span>
            </div>

          </div>
        }
        {active?.activeUser?.User?.roll === "tmp" &&
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar">
                <div className="w-24">
                  <FontAwesomeIcon
                    icon={faFileCircleCheck}
                    className="text-gray-400 w-24 h-24"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">
              {/* {hiring}% */}
              Fill Status
            </div>
            {/* <div className="stat-title">Recruitment completed</div> */}
            <HiringProcess uid={active?.activeUser?.User?.uid ?? ""} relad={relad} />
            <div className="stat-desc text-primary">
              <span>
                Fill in all the fields to complete your hiring
              </span>
            </div>

          </div>
        }
        {active?.activeUser?.User?.roll === "tmp" &&
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar">
                <div className="w-24">
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    className="text-gray-400 w-24 h-24"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">
              {/* {hiring}% */}
              Time to Apply
            </div>
            {/* <div className="stat-title">Recruitment completed</div> */}
            <Countdown date='2023-09-20' hour={0} minutes={0} seconds={0} summ={0} size='48px' />
            <div className="stat-desc text-primary">
              <span>
                Remaining time to complete the filling of the forms and apply
              </span>
            </div>

          </div>
        }
        

      </div>

      {hiring === 100 && active?.activeUser?.User?.status === "hiring" &&
        <Dialog
          header="Create my electronic signature"
          visible={visible}
          maximizable
          style={{ width: '80vw' }}
          breakpoints={{ '960px': '70vw', '641px': '90vw' }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >

          <p className="m-0" style={{ overflow: 'auto' }}>
            "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
            <br /><br />
            By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
            <br /><br />
            If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
            <br /><br />
            Please try to make the signature as legible as possible:
            <div className='w-full' >
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                }}
                minWidth={2}
                maxWidth={3}
                onEnd={() =>
                  setImageData(signatureRef.current.getTrimmedCanvas().toDataURL("image/png"))
                }
              />
            </div>
            <button onClick={() => {
              signatureRef.current.clear();
              saveSignature(null);
            }}> Clear </button>
            <div className="divider"> </div>

            <div className='page'>
              <div className='flex p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                Acknowledgment of Receipt of {active?.activeUser?.Record?.applying_as} HANDBOOK
              </div>

              <p className='p-5 text-justify'>
                I hereby acknowledge receipt of &nbsp;&nbsp; <b>Social Diversity LLC</b>&nbsp;&nbsp; {personalInformation.applying_as} Handbook on the date listed below.
                <br />
                <br />

                The Employee Handbook contains important information about the agency,
                and I should consult my Supervisor or Human Resources Department regarding
                any questions not answered in the handbook.

                <br />
                <br />

                Since the information, policies, and benefits described herein are subject to
                change at any time, I acknowledge that revisions to the handbook may occur.
                All such changes will be communicated through official notices. I understand that
                revised information may supersede, modify, or eliminate existing policies and if I
                remain with the agency following any modifications to the handbook, I thereby accept
                and agree to such changes.

                <br />
                <br />

                Furthermore, I understand that this Employee Handbook is neither a contract of employment
                nor a legally-binding agreement and I understand and agree that nothing in the handbook creates,
                or is intended to create, a promise or representation of continued employment.

                <br />
                <br />

                I have had an opportunity to read the handbook and I accept its terms and conditions.
                I understand that itis my responsibility to complywith the policies contained in this handbook,
                and any revisions made to it. I also under standand acknowledge that failure to comply with any
                of the rules, policies or procedures that govern my employment whet her contained in the handbook
                or otherwise, may lead to disciplinary actions including termination of my employment.
              </p>

              {/* Bloque firma 1*/}
              <div className='w-full flex'>

                <div className='w-1/3 content-end'>
                  <div className='text-center'>
                    {active?.activeUser?.Record?.fullname}
                  </div>
                  <div className='border-t border-primary mr-5 ml-5'></div>
                  <div className='text-center w-full'>
                    {active?.activeUser?.Record?.applying_as} Name
                  </div>
                </div>

                <div className='w-1/3 content-end'>
                  <div className='text-center'>
                    {imageData !== "" ? (
                      <img src={imageData} width={100} className="mx-auto" alt='sign' />
                    ) : (
                      "Sign"
                    )}
                  </div>
                  <div className='border-t border-primary mr-5 ml-5'></div>
                  <div className='text-center w-full'>
                    {personalInformation.applying_as} Signature
                  </div>
                </div>

                <div className='w-1/3 content-end'>
                  <div className="text-center pt-5">
                    {active?.activeUser?.Record?.application_date}
                  </div>
                  <div className='border-t border-primary mr-5 ml-5'></div>
                  <div className="text-center w-full">
                    Date
                  </div>
                </div>
              </div>
              {/* End bloque firmas 1 */}

            </div>

            <div className="divider"> </div>

            <div className='page'>

              <div className="m-0 p-0">
                <div className="m-0 p-0">
                  {/* row 1 */}
                  <div className="md:flex lg:flex w-full">
                    <div className="flex w-full">
                      <div className="flex justify-center items-center w-1/5">
                        <div className="w-full text-center">
                          <img src={myFLF} width={150} className="mx-auto" alt='sign' />
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-3/5">
                        <h1 className='w-full text-center text-4xl font-bold tracking-tight text-gray-900'>AFFIDAVIT OF GOOD MORAL CHARACTER</h1>
                      </div>
                      <div className="flex justify-center items-center w-1/5">
                        <div className="w-full text-center">
                          <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" alt='logosunissup' />
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* row 2 */}
                  <div className="flex w-full mt-10">
                    <div className="w-2/4 ">
                      <div className="flex w-full place-items-center pl-5">
                        State: Florida
                      </div>
                    </div>
                    <div className="w-2/4">
                      <div className="flex w-full place-items-center">
                        <div className="w-full pr-5 text-right">
                          County: MAMI - DADE
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='p-4 text-justify'>
                    Before me this day personally appeared <b className='border-b-2 border-primary'>{active?.activeUser?.Record?.fullname}</b> who, being duly sworn, deposes and says:
                    <br />
                    <br />
                    As an applicant for employment with, an employee of, a volunteer for, or an applicant to volunteer
                    with <b>Social Diversity LLC</b>, I affirm and attest under penalty of perjury that I meet
                    the moral character requirements for employment, as required by Chapter 435 Florida Statutes in that:
                    <br />
                    <br />
                    I have not been arrested with disposition pending or found guilty of, regardless of adjudication,
                    or entered a plea of nolo contendere or guilty to, or have been adjudicated delinquent and the record
                    has not been sealed or expunged for, any offense prohibited under any of the following provisions of the
                    Florida Statutes or under any similar statute of another jurisdiction for any of the offenses listed below:


                  </div>
                  {/* Sections */}
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 393.135
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual misconduct with certain developmentally disabled clients and reporting of such sexual misconduct
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 394.4593
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual misconduct with certain mental health patients and reporting of such sexual misconduct
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section  415.111
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          adult abuse, neglect, or exploitation of aged persons or disabled adults or failure to report of such abuse
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section  741.28
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          criminal offenses that constitute domestic violence, whether committed in Florida or another jurisdiction
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 782.04
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          murder
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 782.07
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          manslaughter, aggravated manslaughter of an elderly person or disabled adult, or aggravated manslaughter of a child
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 782.071
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          vehicular homicide
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 782.09
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          killing an unborn quick child by injury to the mother
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 784
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          assault, battery, and culpable negligence, if the offense was a felony
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 784.011
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          assault, if the victim of offense was a minor
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 784.03
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          battery, if the victim of offense was a minor
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 787.01
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          kidnapping
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 787.02
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          false imprisonment
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 787.025
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          luring or enticing a child
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 787.04(2)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          taking, enticing, or removing a child beyond the state limits with criminal intent pending custody proceeding
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section  787.04(3)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          carrying a child beyond the state lines with criminal intent to avoid producing a child at a custody hearing or delivering the child to the designated person
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 790.115(1)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          exhibiting firearms or weapons within 1,000 feet of a school
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 790.115(2) (b)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          possessing an electric weapon or device, destructive device, or other weapon on school property
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 794.011
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual battery
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Former Section 794.04
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          prohibited acts of persons in familial or custodial authority
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 794.05
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          unlawful sexual activity with certain minors
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 796
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          prostitution
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 798.02
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          lewd and lascivious behavior
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 800
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          lewdness and indecent exposure
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 806.01
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          arson
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 810.02
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          burglary
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 810.14
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          voyeurism, if the offense is a felony
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 810.145
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          video voyeurism, if the offense is a felony
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 812
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          theft and/or robbery and related crimes, if a felony offense
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 817.563
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          fraudulent sale of controlled substances, if the offense was a felony
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 825.102
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          abuse, aggravated abuse, or neglect of an elderly person or disabled adult
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 825.1025
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 825.103
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          exploitation of disabled adults or elderly persons, if the offense was a felony
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 826.04
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          incest
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 827.03
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          child abuse, aggravated child abuse, or neglect of a child
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 827.04
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          contributing to the delinquency or dependency of a child
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Former Section 827.05
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          negligent treatment of children
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 827.071
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual performance by a child
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 843.01
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          resisting arrest with violence
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 843.025
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          depriving a law enforcement, correctional, or correctional probation officer means of protection or communication
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 843.12
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          aiding in an escape
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 843.13
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          aiding in the escape of juvenile inmates in correctional institution
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 847
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          obscene literature
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 874.05(1)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          eging or recruiting another to join a criminal gang
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Chapter 893
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          drug abuse prevention and control only if the offense was a felony or if any other person involved in the offense was a minor
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 916.1075
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual misconduct with certain forensic clients and reporting of such sexual conduct
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 944.35(3)
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          inflicting cruel or inhuman treatment on an inmate resulting in great bodily harm
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 944.40
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          escape
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 944.46
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          harboring, concealing, or aiding an escaped prisoner
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 944.47
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          introduction of contraband into a correctional facility
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 985.701
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          sexual misconduct in juvenile justice programs
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex lg:flex w-full pl-5">
                    <div className="flex w-full">
                      <div className="flex w-1/5">
                        <div className="w-full">
                          Section 985.711
                        </div>
                      </div>
                      <div className="flex  w-4/5">
                        <div className="w-full">
                          contraband introduced into detention facilities
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className='p-4 text-justify'>
                    I understand that I must acknowledge the existence of any applicable criminal record relating to the above lists
                    of offenses, including those under any similar statute of another jurisdiction, regardless of whether or not those
                    records have been sealed or expunged. Furthermore, I understand that while employed or volunteering at <b>Social
                      Diversity LLC</b> in any position that requires background screening as a condition of employment, I must
                    immediately notify my supervisor/employer of any arrest and any changes in my criminal record involving any of the
                    above-listed provisions of the Florida Statutes or similar statutes of another jurisdiction, whether a misdemeanor
                    or felony. This notice must be made within one business day of such arrest or charge. Failure to do so could be
                    grounds for termination.
                    <br />
                    <br />
                    I attest that I have read the above carefully and state that my attestation here is true and correct, and that my
                    record does not contain any of the above-listed offenses. I understand, under penalty of perjury, that all employees
                    in such positions of trust or responsibility shall attest to meeting the requirements for qualifying for employment
                    and agree to inform the employer immediately if arrested for any of the disqualifying offenses. I also understand
                    that it is my responsibility to obtain clarification on anything contained in this affidavit which I do not understand
                    prior to signing. I am aware that any omissions, falsifications, misstatements, or misrepresentations may disqualify me
                    from employment consideration and, if I am hired, may be grounds for termination or denial of an exemption at a later date.
                    <br />
                    <br />
                    <div className="flex w-full">
                      <div className="flex w-full place-items-center">
                        <div className="">
                          SIGNATURE OF AFFIANT:&nbsp;&nbsp;
                        </div>
                        <div className='w-1/6'>
                          {imageData !== "" ? (

                            <div className="place-items-center">
                              <img src={imageData} width={150} className='border-b-2 border-primary' alt='sign' />
                            </div>

                          ) : (
                            "Sign"
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                    To the best of my knowledge and belief, my record does not contain any of the applicable disqualifying acts
                    or offenses listed above. I have reviewed the offenses listed and confirm that none of them are present in my record.
                    (If you have previously been granted an exemption for any disqualifying offense, please attach a copy of the letter
                    granting such exemption.) (Please circle the number which corresponds to the offense(s) contained in your
                    record.)
                    <br />
                    <br />
                    <div className="w-full">
                      <div className="flex w-full">
                        <div className="content-end">
                          <p className='pr-0'>SIGNATURE OF AFFIANT:</p>
                        </div>
                        <div className="w-1/6 border-b-2 border-primary">
                        </div>
                      </div>
                      <br />
                      <div className='w-full'>
                        <p>Sworn to and subscribed before me this ___ day of __________, 20___.</p>
                      </div>
                    </div>
                    <div>
                    </div>
                    <br />
                  </div>

                  <div className='w-full flex mt-16'>

                    <div className='w-1/2'>
                      {/* div para firma, ahora vacio */}
                      <div className='text-center justify-center'></div>
                      {/* div para raya*/}
                      <div className='border-t border-primary mr-5 ml-5'></div>
                      {/* texto */}
                      <div className='text-center'><p>SIGNATURE OF NOTARY PUBLIC, STATE OF FLORIDA</p></div>
                    </div>

                    <div className='w-1/2'>
                      {/* div para firma, ahora vacio */}
                      <div className='text-center justify-center'></div>
                      {/* div para raya*/}
                      <div className='border-t border-primary mr-5 ml-5'></div>
                      {/* texto */}
                      <div className='text-center'><p>Print, Type, or Stamp Commissioned Name of Notary Public</p></div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            <div className="divider"> </div>
            {/* CONSENT */}
            <div className='page'>
              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" alt='sign' />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        CONSENT <br />
                        Employment Reference and Background Check
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  I, FullName, understand that any offer of employment made to me by SUNISS UP (hereinafter the "Agency")
                  is conditional upon reference and background checks. I also understand that the Agency and/or its designated
                  representatives will conduct pre-employment reference and background checks thoroughly and within the confines
                  of all applicable state and federal laws. I further understand that a reference and background check is being
                  performed as part of the process to evaluate me prior to any offer of employment and is not conducted for any
                  other purpose. I acknowledge that any information obtained during the process will be kept under the strictest
                  confidentiality by the Human Resources Department. I authorize the Agency or its designated representative to
                  present this consent or a photocopy thereof to obtain the following records and information in connection with
                  my application for employment with the Agency, insofar as the records and information are relevant to the
                  position for which I am applying:
                  <br />
                  <br />
                  <div className='pl-5'>
                    <li>Criminal History and Convictions</li>
                    <li>Motor Vehicle Operation</li>
                    <li>Certification and Licensing</li>
                    <li>Educational History and Credentials</li>
                    <li>Employment Eligibility</li>
                    <li>Prior Employment Information</li>
                    <li>Personal or Professional References</li>
                  </div>
                  <br />
                  <br />
                  I authorize all persons who are the custodians of these records or who may have information relevant to my application for
                  employment to provide records or disclose such information to the Agency and/or its designated representatives.
                  <br />
                  <br />
                  I release the Agency, its employees, designated representatives, agents, officers, and personnel, as well as all persons
                  or entities who provide records or disclose information, from any and all claims of liability or damage due to either the
                  procurement or disclosure of such records or information.

                  <br />
                  <br />

                </div>

                {/* EMPLOYEE */}
                <div className="flex w-full pl-5 pr-5">
                  <div className="w-1/3 md:w-1/6 lg:w-1/6">
                    <div className="flex w-full place-items-center">
                      <div className='text-center w-full'>
                        <b>{active?.activeUser?.Record?.applying_as}:</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque firma 2 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 2 */}

              </div>
            </div>
            <div className="divider"> </div>
            {/* CONSENT */}
            <div className='page'>
              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" alt='logo' />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        CONSENT<br />
                        Drug Free Workplace Drug/Alcohol Testing
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  I hereby consent to submit to required tests for the purposes of detecting illegal drugs, alcohol, or substance abuse.
                  I agree that a state-approved clinic or laboratory may collect and test any specimens I provide. I further authorize
                  the release of these test results to a Medical Review Officer, <b>Social Diversity LLC</b> (hereinafter the "Agency"),
                  Human Resources Representative, and other management personnel on a need-to-know basis. However, I understand that
                  any information obtained from these test results will be kept confidential between the laboratory, the Agency,
                  its Human Resources Representative, and a Medical Review Officer, except as otherwise provided by law or if I bring
                  up the test or its results as part of any administrative, legal, or other action.
                  <br />
                  <br />
                  I also agree to release and hold the Agency, its agents, employees, and assigns, including the laboratory collecting and
                  conducting these tests, harmless from any liability arising, in whole or in part, out of the collection or testing of the
                  specimens I provide or from the use of the information obtained by these tests in consideration of my employment.
                  <br />
                  <br />
                  I have read and understood this Consent and Release Form completely. I understand that signing this form is a condition
                  of my employment with the Agency, and I acknowledge that my refusal to sign may result in termination. I am signing this
                  form voluntarily and without any coercion from any person.
                  <br />
                  <br />

                </div>

                <br />
                <br />

                {/* Bloque firma 3 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 3 */}

              </div>
            </div>
            <div className="divider"> </div>
            {/* TUBERCULOSIS  */}
            <div className='page'>
              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" alt='logo' />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Tuberculosis Declaration Form
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  Employee Health Release for denial of T.B. signs and symptoms for persons who have had BCG or a Positive TB test in the past.
                  <br />
                  <br />
                  The early signs and symptoms of Tuberculosis are as follows:
                  <br />
                  <div className='pl-5'>
                    <li>Cough</li>
                    <li>Night Sweats</li>
                    <li>Loss of Weight</li>
                    <li>Loss of Appetite</li>
                    <li>Coughing of Blood</li>
                  </div>

                  <br />
                  <br />
                  I have read the above information and I do not currently have these symptoms. If any symptoms develop, I will contact my
                  supervisor immediately for further follow-up..
                  <br />
                  <br />
                </div>

                {/* Bloque firma 4 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 4 */}

              </div>
            </div>
            <div className="divider"> </div>
            {/* HEPATITIS  */}
            <div className='page'>
              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Hepatitis B Declaration Form
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  I understand that as part of my duties with SUNISS UP, I may be at risk of acquiring Hepatitis B Virus (HBV) infection due
                  to my occupational exposure to blood or other potentially infectious materials. I have been provided with the opportunity
                  to receive the Hepatitis B vaccine, and I acknowledge that there will be no cost to me for this vaccination.
                  <br />
                  <br />
                  I understand that by choosing to decline the Hepatitis B vaccine, I am acknowledging the serious risk of acquiring Hepatitis B,
                  a potentially serious disease. If in the future I continue to have occupational exposure to blood or other potentially infectious
                  materials and decide that I want to receive the Hepatitis B vaccine, I am aware that I can still receive the vaccination series at
                  no cost to me.

                </div>

                {/* Bloque firma 5 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} style={{ margin: '0 auto' }} />
                      ) : (
                        <Button label="Sign" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 5 */}

              </div>
            </div>

            <div className="divider"> </div>

            <div className='page'>

              {active?.activeUser?.Record?.applying_as === "Employee" ? (
                <div className="m-0 p-0">
                  <div className="md:flex lg:flex w-full">
                    <div className="flex w-full">
                      <div className="flex justify-center items-center w-1/5">
                        <div className="w-full text-center">
                          <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                        </div>
                      </div>
                      <div className="w-4/5 md:w-3/5 lg:w-3/5">
                        <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                          Employment Agreement
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className='p-4 text-justify'>
                    This Agreement is made 2/02/2023, by and between
                    SUNISS UP (herein after referred to as the “Employer”), having its principal address at:
                    12001 SW 128 CT Ste 101 Miami FL 33186 and
                    {active?.activeUser?.Record?.fullname}, (herein after referred to as the “Employee”).
                    <br />
                    <br />
                    1. The relationship between the Employer and Employee shall be regarded as an
                    Employment at Will relationship. Employment shall continue until such time as either of
                    the parties gives notice to the other to terminate the employment relationship, which may
                    be given at any time, with or without cause.
                    <br />
                    <br />
                    2. During the term of employment, the Employee agrees to devote working time and best
                    efforts to the business of that Employer. The Employee agrees to cooperate and abide
                    with the management procedures and directives.
                    <br />
                    <br />
                    3. Employee agrees that all information below is confidential information and shall be treated
                    as such, both during and after employment.
                    <div className='pl-5'>
                      <li>
                        Information regarding Employer’s clients, volunteers and donors, including but not
                        limited to: research, computer programs and files, software, electronic codes and
                        passwords, client data, donors and donor lists, marketing and strategic plans,
                        investments and financial information, employee personnel files, and compensation
                        information.
                      </li>
                      <li>
                        Employee will not, directly or indirectly, make use of above information or any other
                        confidential information for his or her own benefit, nor divulge such information to any
                        other parties not entitled to it, nor retain or create any lists of the employer’s
                        clients/donors/volunteers for his or her own personal use and agree not to disseminate
                        this information to anyone outside the agency and/or to other agency employees other
                        than as part of employee’s assigned duties.
                      </li>
                    </div>

                    <br />
                    <br />
                    4. Upon termination of employment, for any reason, Employee shall return to Employer the
                    ID badge, security cards, keys, beepers, cell phones, computers and electronically stored
                    information pertaining to employer’s business. Employee shall not take any items from the
                    employer’s place of business which are deemed to be property of the agency.

                  </div>

                  {/* EMPLOYEE */}
                  <div className="flex w-full pl-5 pr-5">
                    <div className="w-1/3 md:w-1/6 lg:w-1/6">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>
                          <b>{active?.activeUser?.Record?.applying_as}:</b>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bloque firma 6 */}
                  <div className='w-full flex'>

                    <div className='w-1/3 content-end'>
                      <div className='text-center'>
                        {active?.activeUser?.Record?.fullname}
                      </div>
                      <div className='border-t border-primary mr-5 ml-5'></div>
                      <div className='text-center w-full'>
                        {/* {active?.activeUser?.Record?.applying_as} Name */}
                        <p>Employee’s Name</p>
                      </div>
                    </div>

                    <div className='w-1/3 content-end'>
                      <div className='text-center'>
                        {imageData !== "" ? (
                          <img src={imageData} width={100} className="mx-auto" alt='sign' />
                        ) : (
                          "Sign"
                        )}
                      </div>
                      <div className='border-t border-primary mr-5 ml-5'></div>
                      <div className='text-center w-full'>
                        {/* {personalInformation.applying_as} Signature */}
                        <p>Employee’s Signature</p>
                      </div>
                    </div>

                    <div className='w-1/3 content-end'>
                      <div className="text-center pt-5">
                        {active?.activeUser?.Record?.application_date}
                      </div>
                      <div className='border-t border-primary mr-5 ml-5'></div>
                      <div className="text-center w-full">
                        Date
                      </div>
                    </div>
                  </div>
                  {/* End bloque firmas 6 */}
                </div>
              ) : (
                <div className="m-0 p-0">
                  {/* CONTRACTOR AGREEMENT */}
                  {/* row 1 */}
                  < div className="md:flex lg:flex w-full" >
                    <div className="flex w-full">
                      <div className="flex justify-center items-center w-1/5">
                        <div className="w-full text-center">
                          <img src={logo} width={150} className="mx-auto" />
                        </div>
                      </div>
                      <div className="w-4/5 md:w-3/5 lg:w-3/5">
                        <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                          Independent Contractor Agreement
                        </h1>
                      </div>
                    </div>
                  </div >
                  <div className='p-4 text-justify'>
                    This Agreement is made {active?.activeUser?.Record?.application_date}; by and
                    between <b>SUNISS UP, a Florida Corporation</b>, referred hereafter as ("<b>SU</b>")
                    and <i className='border-b-2 border-primary'>{active?.activeUser?.Record?.fullname}</i>, referred hereafter as (<b>"Contractor"</b>).
                    <br />
                    <br />
                    WHEREAS, <b>SU</b> desires to retain the services of <b>Contractor</b> to perform work in
                    accordance with the terms of this Agreement: _______________________________;
                    and to compensate contractor for the services provided based on:
                    _______________________________________, herein provided:
                    <br />
                    <br />
                    WHEREAS, <b>Contractor</b> is willing to perform services in accordance with the terms hereinafter,
                    set forth,
                    <br />
                    <br />
                    NOW THEREFORE in consideration of the mutual covenants and agreements herein contained, it
                    is hereby agreed as follows:
                    <br />
                    <br />
                    <b>PARAGRAPH 1. SU</b> shall pay <b>Contractor</b> in accordance to specifications set above, and
                    incorporated by reference herein. Said amounts shall be due and payable with in 30 to 60 days after
                    contractor completes the actions described in said Exhibit.
                    <br />
                    <br />
                    <b>PARAGRAPH II. SU</b> shall not be liable for any withholding tax, social security taxes,
                    workmen's compensation, unemployment benefits or other expense or liability attributable to an
                    employer/employee relationship.
                    <br />
                    <br />
                    <b>PARAGRAPH III.</b> Relationship between Parties: <b>Contractor</b> is retained by <b>SU</b> only for
                    the purposes and to the extent set forth in this agreement, and his relation to SU and any
                    subsidiary companies, shall, during the period or periods of the services hereunder be that of an
                    independent practitioner. <b>Contractor</b> shall be free to dispose of such portion of his entire time,
                    energy and skill during regular business hours as he is not obligated to devote hereunder to SU
                    and its subsidiaries in such manner as he sees fit and to such persons, firms, or corporations
                    as he deems advisable. <b>Contractor</b> shall not be considered as hiring as employee status or as
                    being entitled to participate in any plans, arrangements, or distributions by <b>SU</b> or its
                    subsidiary companies pertaining to or in connection with any pension, stock, bonus, profit-
                    sharing, or similar benefits for their regular employees.
                    <br />
                    <br />
                    <b>PARAGRAPH IV. Professional Responsibility.</b> Nothing in this Agreement shall be
                    construed to interfere with or otherwise affect the rendering of services by <b>Contractor</b> in
                    accordance with his independent and professional judgment. This Agreement shall be subject
                    to the rules and regulations of any and all professional organizations or associations to which <b>Contractor</b> may from time to time belong and the laws and
                    regulations governing said practice in this State.
                    <br />
                    <br />
                    <b>IN WITNESS WHEREOF, SU</b>, has caused this Agreement to be executed in its corporate name by
                    its corporate officers, and <b>Contractor</b>, has set his hand and seal as of the day and year first above
                    written.
                    <br />
                    <br />
                  </div>

                  <div className="flex w-full pl-5 pr-5">
                    <div className="w-1/3">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>
                          <b>Attest:</b>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">
                      <div className="flex w-full place-items-center">
                        <div className="grid w-full flex-grow w-1/4 pl-5 text-center">
                          <b></b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full pl-5 pr-5 mt-10">
                    <div className="w-1/3 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className=' w-full'>
                          By:
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 items-center justify-end h-full">
                      <div className="flex w-full h-full place-items-center">
                        <div className="w-full ">
                          By:
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full pl-5 pr-5">
                    <div className="w-1/3">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>

                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">
                      <div className="flex w-full border-t-2 border-primary place-items-center">
                        <div className="grid w-full flex-grow w-1/4 pl-5 text-center">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full pl-5 pr-5 mt-10">
                    <div className="w-1/3 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>

                        </div>
                      </div>
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 items-center justify-end h-full">
                      <div className="flex w-full h-full place-items-center">
                        <div className="text-center w-full ">

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full pl-5 pr-5">
                    <div className="w-1/3">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>
                          SU President or Representative
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">
                      <div className="flex w-full border-t-2 border-primary place-items-center">
                        <div className="grid w-full flex-grow w-1/4 pl-5 text-center">
                          Contractor
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full pl-5 pr-5 mt-10">
                    <div className="w-1/3 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>
                          {active?.activeUser?.Record?.application_date}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3"></div>
                    <div className="w-1/3 items-center justify-end h-full">
                      <div className="flex w-full h-full place-items-center">
                        <div className="text-center w-full ">

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full pl-5 pr-5">
                    <div className="w-1/3">
                      <div className="flex w-full place-items-center">
                        <div className='text-center w-full'>
                          Date
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">

                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="divider"> </div>
            {/* AMERICANS */}
            <div className='page'>

              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Americans with Disabilities ACT Compliance
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  SUNISS UP is committed to complying fully with the Americans with
                  Disabilities Act (ADA) and ensuring equal opportunity in employment for
                  qualified persons with disabilities.
                  <br />
                  <br />
                  All employment practices and activities are conducted on a non-discriminatory basis. Our
                  hiring procedures have been reviewed and provide persons with disabilities meaningful
                  employment opportunities. When requested, we will make job applications available in
                  alternative, accessible formats, as well as provide assistance in completing the
                  application. Pre-employment inquiries are made only regarding an applicant's ability to
                  perform the duties of the position.
                  <br />
                  <br />
                  Reasonable accommodation is available to an employee with a disability if the disability
                  affects the performance of job functions. We make all employment decisions based on
                  the merits of the situation in accordance with defined criteria, not the disability of the
                  individual.
                  <br />
                  <br />
                  Qualified individuals with disabilities are entitled to equal pay and other forms
                  of compensation (or changes in compensation) as well as job assignments,
                  classifications, organizational structures, position descriptions, lines of progression,
                  and seniority lists. We make leaves of all types available to all employees on an equal
                  basis.
                  <br />
                  <br />
                  SUNISS UP is also committed to not discriminating against any qualified
                  employee or applicant because the person is related to or associated
                  with a person with a disability. SUNISS UP will follow any state or local law that provides
                  individuals with disabilities greater protection than the ADA.
                  <br />
                  <br />
                  This policy is neither exhaustive nor exclusive. SUNISS UP is committed
                  to taking all other actions necessary to ensure equal
                  employment opportunity for persons with disabilities in accordance with the
                  ADA and all other applicable federal, state, and local laws.

                </div>

                {/* Bloque firma 7 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 7 */}
              </div>
            </div>

            <div className="divider"> </div>
            {/* CONFIDENTIALITY AGREEMENT */}
            <div className='page'>

              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Confidentiality Agreement
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  I, {active?.activeUser?.Record?.fullname} understand that as an employee,
                  volunteer, intern, trainee, tutor, temporary help or contracted vendor performing
                  work for SUNISS UP (herein after the “Agency”) I am bound by Federal State laws
                  regarding confidentiality and of the Agency, clients, employees, volunteers and
                  officers, directors, agents, (collectivity called “representatives”), including but not
                  limited to:
                  <br />
                  <br />
                  <div className='pl-10 pr-10'>
                    Client data and protected health information, employee personnel files, research
                    materials, computer programs and files, software, electronic codes, usernames
                    and passwords, corporate documents, donors and donor lists, marketing
                    strategies, plans and projections, investments and financial information, video
                    presentations and compensation information.
                  </div>
                  <br />
                  <br />
                  I will not, directly or indirectly, make use of the above information or any other confidential
                  information for my own benefit, nor divulge such information to any other parties not
                  entitled to it, nor retain or create any lists of the agency clients, employees, volunteers,
                  donors and representatives for my own personal use. I agree not to disseminate this
                  information to anyone outside the agency and/or to other agency employees other than
                  as part of the Agency assigned duties.
                  <br />
                  <br />
                  I agree that all information above is confidential information and shall be treated as such,
                  both during and after employment.

                </div>

                {/* EMPLOYEE */}
                <div className="flex w-full pl-5 pr-5">
                  <div className="w-1/3 md:w-1/6 lg:w-1/6">
                    <div className="flex w-full place-items-center">
                      <div className='text-center w-full'>
                        <b>{active?.activeUser?.Record?.applying_as}:</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque firma 8 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 8 */}
              </div>
            </div>

            <div className="divider"> </div>
            {/* CHILD ABUSE */}
            <div className='page'>

              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        CHILD ABUSE AND NEGLECT <br />
                        Statement of Acknowledgment
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  Chapter 39, Part II, Florida Statutes, protects children from abuse, abandonment or
                  neglect. Section 39.201 provides for a central abuse hotline (1-800-96-ABUSE) in the
                  Department of Children and Families to receive reports of abuse, abandonment or
                  neglect and defines who must report abuse.
                  <br />
                  <br />
                  I hereby acknowledge that I have received a copy of the Florida Department of
                  Children and Families Professionals Guide to Child Abuse and Neglect in Florida.
                  I agree to comply with the Florida Statute related to child abuse and neglect.
                  <br />
                  <br />
                  The Department of Children and Families relies on citizens to report child abuse
                  abandonment and neglect. Professional persons are especially able to provide this
                  information and are both legally and ethically obligated to do so.
                  <br />
                  <br />
                  I understand that it is the responsibility of all citizens of the state of Florida hence
                  the employees of SUNISS UP., to protect our children. If
                  you have knowledge of or reasonable cause to suspect abuse or neglect of a
                  child, call 1-800-96-ABUSE (1-800-962-2873) in accordance with Florida Statute
                  39.201, and SUNISS UP policies and procedures.
                  <br />
                  <br />
                  I am aware that a copy of this information is readily and permanently posted in the
                  facility for my use.
                </div>

                {/* EMPLOYEE */}
                <div className="flex w-full pl-5 pr-5">
                  <div className="w-1/3 md:w-1/6 lg:w-1/6">
                    <div className="flex w-full place-items-center">
                      <div className='text-center w-full'>
                        <b>{active?.activeUser?.Record?.applying_as}:</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque firma 9 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 9 */}
              </div>
            </div>

            <div className="divider"> </div>
            {/* PAYROLL AGREEMENT */}
            <div className='page'>

              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Payroll Agreement
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='p-4 text-justify'>
                  I, {active?.activeUser?.Record?.fullname} understand that, at SUNISS UP
                  all employees are paid bi-weekly to an annual schedule prepared by the payroll
                  department at the beginning of each year. A bi-weekly pay cycle consists of ten
                  (10) working days or two (2) weeks starting on Mondays. Employees or &nbsp;
                  <b>C o n t r a c t o r s</b> will receive pay every two (2) weeks, on every other Friday.
                  Actual pay dates will vary from month to month, most months will have 2 paydays
                  but some will have 3 paydays. I also understand that, all type of pays, including salary,
                  wages and earnings for time worked and when applicable, overtime, reimbursements, and
                  any other ancillary pay will be made on the same schedule as above. In the event that the
                  pay date falls on a holiday, pay will be made a business day prior to the holiday.
                  Please refer to your Employee/Contractor Handbook for the complete schedule
                  which is revised annually and for the list of holidays observed by the agency. I further
                  understand that, any change in the schedule will be communicated to all employees via
                  official notice at least two (2) weeks prior to the effective date.
                  <br />
                  <br />
                  My signature below indicates that I agree to the payroll schedule as described above.
                </div>

                {/* EMPLOYEE */}
                <div className="flex w-full pl-5 pr-5">
                  <div className="w-1/3 md:w-1/6 lg:w-1/6">
                    <div className="flex w-full place-items-center">
                      <div className='text-center w-full'>
                        <b>{active?.activeUser?.Record?.applying_as}:</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque firma 10 */}
                <div className='w-full flex'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {active?.activeUser?.Record?.fullname}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Employee’s Name</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} className="mx-auto" alt='sign' />
                      ) : (
                        "Sign"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {personalInformation.applying_as} Signature */}
                      <p>Employee’s Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>
                </div>
                {/* End bloque firmas 10 */}

              </div>
            </div>
            <div className="divider"> </div>


            {/* DIRECT DEPOSIT AUTHORIZATION FORM */}
            <div className='page'>
              <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                  <div className="flex w-full">
                    <div className="flex justify-center items-center w-1/5">
                      <div className="w-full text-center">
                        <img src="https://api.sunissup.com/static/media/logo.png" width={150} className="mx-auto" />
                      </div>
                    </div>
                    <div className="w-4/5 md:w-3/5 lg:w-3/5">
                      <h1 className='w-full text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900 text-center'>
                        Direct Deposit <br />
                        Authorization Form
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex w-full pl-4">
                  <b>Authorization Agreement</b>
                </div>
                <div className='p-4 text-justify'>
                  I {active?.activeUser?.Record?.fullname} hereby authorize SUNISS UP
                  to initiate automatic deposits to my account at the financial institution named below. I also
                  authorize SUNISS UP to make withdrawals from this account in the event that a credit entry is
                  made in error.
                  <br />
                  <br />
                  Further, I agree not to hold SUNISS UP responsible for any delay or loss of funds due to
                  incorrect or incomplete information supplied by me or by my financial institution or due to an
                  error on the part of my financial institution in depositing funds to my account. This agreement
                  will remain in effect until SUNISS UP receives a written notice of cancellation from me or
                  my financial institution, or until I submit a new direct deposit form to the Payroll Department.
                </div>


                <div className='p-4 pb-0 text-xl tracking-tight place-items-center'>Account Information</div>

                <div className="m-0 p-4">
                  <div className="w-full">


                    <div className="md:flex lg:md:flex w-full">
                      <div className='w-2/6'><b>Name of Financial Institution</b>  <br /> {active?.activeUser?.Record?.direct_deposit.financial_institution}</div>
                      <div className='w-2/6'><b>Routing Number</b><br /> {active?.activeUser?.Record?.direct_deposit.routing_number}</div>
                      <div className='w-1/6'><b>Account Number</b><br />  {active?.activeUser?.Record?.direct_deposit.account_number}</div>
                      <div className='w-1/6'>{active?.activeUser?.Record?.direct_deposit.options}</div>
                    </div>


                  </div>

                </div>

                {/* Bloque firma 11 */}
                <div className='w-full flex mt-14'>

                  <div className='w-1/3 content-end'>
                    <div className='text-center'>
                      {imageData !== "" ? (
                        <img src={imageData} width={100} style={{ margin: '0 auto' }} />
                      ) : (
                        "Sign above"
                      )}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className='text-center w-full'>
                      {/* {active?.activeUser?.Record?.applying_as} Name */}
                      <p>Authorized Signature</p>
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    <div className="text-center pt-5">
                      {active?.activeUser?.Record?.application_date}
                    </div>
                    <div className='border-t border-primary mr-5 ml-5'></div>
                    <div className="text-center w-full">
                      Date
                    </div>
                  </div>

                  <div className='w-1/3 content-end'>
                    {/* empty */}
                  </div>

                </div>
                {/* End bloque firmas 11 */}

              </div>
            </div>

          </p>
        </Dialog>
      }

      {
        hiring === 100 && visible !== true && active?.activeUser?.User?.status === "hiring" && <Button
          tooltip="Click to open the documents"
          tooltipOptions={{ position: 'top' }}
          label="Read and sign the documents to submit your application"
          icon="pi pi-check" size="large"
          style={{ position: "fixed", left: 10, bottom: 10, zIndex: 2 }}
          className="p-button-warning p-3"
          onClick={() => setVisible(true)}
        />
      }
    </div >
  );
};
type Props = {
  active?: Active;
  relad(): void;
};
export { Banner };
