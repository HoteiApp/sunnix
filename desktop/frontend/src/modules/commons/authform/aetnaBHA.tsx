import { useState, useRef } from "react";
import { ServiceCM } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";
const AetnaBHA = ({ scm, onContentChange }: Props) => {
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";

  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
  // Función para convertir la fecha
  const convertDateFormat = (dateString) => {
    const [month, day, year] = dateString.split('/');
    // const shortYear = year.slice(-2); // Obtener los últimos dos dígitos del año
    return `${month}${day}${year}`;
  };
  const dob = scm?.Demografic.dob || '';
  const formattedDate = convertDateFormat(dob);
  return (
    <div style={{ height: "80vh", overflow: "auto" }}>
      <ContentObserver onContentChange={onContentChange}>
        <div id="content-to-pdf" ref={contentRef} className="p-5">
          <div className="w-full text-center">
            <b style={{ fontSize: "18px" }}>
              BEHAVIORAL HEALTH PRIOR AUTHORIZATION REQUEST
            </b>
          </div>
          {/* ----------- */}
          <div className="w-full flex mt-5">
            <div className="w-1/3 mb-5">
              <b>
                Aetna Better Health of Florida
                <br />
                261 N. University Drive
                <br />
                Plantation, FL 33324
                <br />
                Telephone Number:
                <br />
                Fax Number (Medicaid): 833-365-2474
                <br />
                Fax Number (FHK): 833-365-2493
                <br />
                TTY: 711
              </b>
            </div>

            {/* div vacio/ */}
            <div className="w-1/3">
              {/* div vacio */}
            </div>

            <div className="w-1/3">

              {/* imagen */}
              <div className="">
                <img
                  src={`${apiUrlStatic}/static/media/aetna.png`}
                  alt="aetna"
                  className="ml-16"
                />
              </div>

              {/* dateoOfReq + input */}
              <div className="flex mt-12">
                <p className="pr-2"><b>Date of Request:</b></p>
                <input className="w-2/3 bg-slate-300" type="text" />
              </div>

            </div>

          </div>
          {/* ----------- */}
          <div className="w-full flex mt-6">
            <div className="w-1/6">
              <p>SERVICE TYPE:</p>
            </div>
            <div className="w-5/6">

              <div className="flex w-full mb-2">

                <div className="flex w-1/2">
                  <input type="checkbox" />
                  <p className="pl-2">PSYCHOLOGICAL / NEUROPSYCHOLOGICAL</p>
                </div>
                <div className="flex w-1/2">
                  <input type="checkbox" />
                  <p className="pl-2">APPLIED BEHAVIOR ANALYSIS (ABA)</p>
                </div>
              </div>
              <div className="flex w-full mb-2">

                <input type="checkbox" />
                <p className="pl-2">ELECTROCONVULSIVE THERAPY (ECT) / TRANSCRANIAL MAGNETIC STIMULATION (TMS)</p>

              </div>
              <div className="flex w-full">
                <input type="checkbox" defaultChecked />
                <p className="pl-2">OUTPATIENT TREATMENT REQUEST (OTR)</p>
              </div>

            </div>

          </div>

          <div className="w-full flex mt-2">
            <input type="checkbox" />
            <p className="pl-2">
              URGENT – When a non-urgent prior authorization request could seriously jeopardize the life or health of a member. The member’s
              ability to attain, maintain, or regain maximum function or that a delay in treatment would subject the member to severe pain
              that could not be adequately managed without the care/service requested. Urgent requests will be processed within 2 calendar days
              for Medicaid; 72 hours for FHK.
            </p>
          </div>

          <div className="w-full flex mt-2">

            <input type="checkbox" defaultChecked />
            <p className="pl-2">NON - URGENT STANDARD – Routine services processed within 7 calendar days for Medicaid; 14 calendar days for FHK</p>
          </div>

          <div className="w-full mt-4">

            <p className="text-center ml-40 mr-40">

              Visit our ProPAT search tool to determine if a service requested requires PA
              (www.aetnabetterhealth.com/florida/providers/provider-auth). A determination will be communicated
              to the requesting provider.
            </p>
          </div>

          <div className="w-full text-center mt-3"><p><b>COMPLETE SECTIONS 1 -3 IN THEIR ENTIRETY.</b></p></div>

          {/* tabla 1 */}

          <div className="w-full border border-black">

            <div className="w-full text-center">
              <p><b>SECTION 1 - MEMBER INFORMATION</b></p>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-5/12 border-r border-black"><p className="pl-2">1. FIRST NAME</p></div>
              <div className="w-2/12 border-r border-black"><p className="pl-2">2. M.I</p></div>
              <div className="w-5/12"><p className="pl-2">3. LAST NAME</p></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-5/12 border-r border-black pl-2">{scm?.Demografic.first_name}</div>
              <div className="w-2/12 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-5/12 pl-2">{scm?.Demografic.last_name}</div>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/3"><p className="pl-2 border-r border-black">4. MEDICAID ID#</p></div>
              <div className="w-1/3"><p className="pl-2 border-r border-black">5. DATE OF BIRTH (MMDDYYYY)</p></div>
              <div className="w-1/3"><p className="pl-2">6. MEMBER PHONE # (xxx-xxx-xxxx)</p></div>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black pl-2">{scm?.Demografic.medicaid}</div>
              <div className="w-1/3 border-r border-black pl-2">{formattedDate}</div>
              <div className="w-1/3 pl-2">{scm?.Demografic.cell_phone}</div>
            </div>

            <div className="w-full border-t border-black"><p className="pl-2">7. DOES THE MEMBER HAVE OTHER INSURANCE? (Include Policy Number Below)</p></div>
            <div className="w-full border-t border-black"><input className="w-full" type="text" /></div>

            <div className="w-full border-t border-black text-center"><p><b>SECTION 2 - REQUESTING / SERVICING PROVIDER INFORMATION</b></p></div>

            <div className="flex w-full border-t border-black">
              <div className="w-1/3"><p className="pl-2 border-r border-black">8. REQUESTING PROVIDER FIRST NAME</p></div>
              <div className="w-1/3"><p className="pl-2 border-r border-black">9. REQUESTING PROVIDER LAST NAME</p></div>
              <div className="w-1/3"><p className="pl-2">10. CONTACT PERSON (For questions)</p></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-1/3"><input className="w-full border-r border-black text-center" type="text" value="ESEL" /></div>
              <div className="w-1/3"><input className="w-full border-r border-black text-center" type="text" value="AGUILAR" /></div>
              <div className="w-1/3"><input className="w-full text-center" type="text" value="ESEL AGUILAR" /></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-2/3"><p className="pl-2 border-r border-black">11. SERVICING PROVIDER NAME / FACILITY / AGENCY</p></div>
              <div className="w-1/3"><p className="pl-2">12. CONTACT PERSON (For questions)</p></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-2/3"><p className="pl-2 border-r border-black text-center">SOCIAL DIVERSITY LLC</p></div>
              <div className="w-1/3"><p className="pl-2 text-center">ESEL AGUILAR</p></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-1/3"><p className="pl-2 border-r border-black">13. TELEPHONE # (xxx-xxx-xxxx)</p></div>
              <div className="w-1/3"><p className="pl-2 border-r border-black">14. FAX # (xxx-xxx-xxxx)</p></div>
              <div className="w-1/3"><p className="pl-2">15. NPI</p></div>
            </div>

            <div className="flex w-full border-t border-black">
              <div className="w-1/3"><input className="w-full border-r border-black text-center" type="text" value="(786-975-7485)" /></div>
              <div className="w-1/3"><input className="w-full border-r border-black text-center" type="text" value="(954-860-7166)" /></div>
              <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
            </div>

            <div className="w-full text-center border-t border-black">
              <p><b>SECTION 3 – DIAGNOSIS CODES AND SERVICE / HCPCS CODES</b></p>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/2 border-r border-black"><p className="pl-2">16. SERVICE START DATE (MMDDYYYY)</p></div>
              <div className="w-1/2"><p className="pl-2">17. SERVICE END DATE (MMDDYYYY)</p></div>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/2 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-1/2"><input className="w-full" type="text" /></div>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><p className="pl-2">18. ICD 10 / DSM 5 CODE(S)</p></div>
              <div className="w-2/3"><p className="pl-2">19. CODE DESCRIPTION(S) Include description of the service when uncertain of a code.</p></div>
            </div>

            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-full flex border-t border-black">
              <div className="w-1/3 border-r border-black"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>

          </div>

          {/* fin tabla 1 */}


          <div className="w-full flex mt-2">
            <div className="w-1/3 pl-4">
              <div><p></p>www.aetnabetterhealth.com/florida</div>
              <div><p>261 N. University Drive, Plantation, FL 33324</p></div>
            </div>
            <div className="w-2/3 text-end pr-24">
              <div>Behavioral Health Std. PA</div>
              <div>Form 03/01/2022</div>
            </div>
          </div>

          <div className="w-full border-b border-black mt-10 mb-10"></div>
          {/* Fin Pagina 1 */}

          {/* Pagina 2 */}

          <div className="w-full text-center mt-20">
            <b style={{ fontSize: "18px" }}>
              BEHAVIORAL HEALTH PRIOR AUTHORIZATION REQUEST
            </b>
          </div>
          {/* ----------- */}
          <div className="w-full flex mt-5">
            <div className="w-1/3 mb-5">
              <b>
                Aetna Better Health of Florida
                <br />
                261 N. University Drive
                <br />
                Plantation, FL 33324
                <br />
                Telephone Number:
                <br />
                Fax Number (Medicaid): 833-365-2474
                <br />
                Fax Number (FHK): 833-365-2493
                <br />
                TTY: 711
              </b>
            </div>

            {/* div vacio/ */}
            <div className="w-1/3">
              {/* div vacio */}
            </div>

            <div className="w-1/3">

              {/* imagen */}
              <div className="">
                <img
                  src="https://api.sunissup.com/static/media/aetna.png"
                  alt="aetna"
                  className="ml-16"
                />
              </div>

              {/* dateoOfReq + input */}
              <div className="flex mt-12">
                <p className="pr-2"><b>Date of Request:</b></p>
                <input className="w-2/3 bg-slate-300" type="text" />
              </div>

            </div>

          </div>

          <div className="flex w-full border border-black">
            <div className="w-1/3 border-r border-black"><p className="pl-2">20. CPT / HCPCS / REV CODES:</p></div>
            <div className="w-1/3 border-r border-black"><p className="pl-2">21. CODE DESCRIPTION(S):</p></div>
            <div className="w-1/3"><p className="pl-2">22. QUANTITY / UNITS:</p></div>
          </div>

          <div className="flex w-full border-l border-r border-black">
            <div className="w-1/3 border-r border-black"><input className="text-center w-full" type="text" value="T1017" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" value="TARGETED CASE MANAGEMENT" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          <div className="flex w-full border-r border-l border-b border-black">
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3 border-r border-black"><input className="w-full text-center" type="text" /></div>
            <div className="w-1/3"><input className="w-full text-center" type="text" /></div>
          </div>

          {/* fin primera tabla */}

          <div className="w-full mt-2 text-center"><p><b>COMPLETE THE SECTION WHICH CORRESPONDS TO THE SERVICE AUTHORIZATION BEING REQUESTED</b></p></div>
          <div className="w-full mt-2 text-center"><p><b>NOTE: SECTION 8 “ATTESTATION” MUST BE COMPLETED FOR ALL REQUESTS</b></p></div>

          <div className="w-full text-center mt-4 border-black border-t border-l border-r"><p><b>SECTION 4 – ECT / TMS REQUEST</b></p></div>
          <div className="w-full text-center border-black border-b border-l border-r"><p>Complete all fields in their entirety.</p></div>

          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">23. TREATMENT REQUEST FOR:</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Initial</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">Concurrent</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className="border-black border-b"> <p className="pl-2">24. PLACE OF SERVICE (If inpatient, why?):</p></div>
              <div><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">25. PRIOR ECT TREATMENT?</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className=""> <p className="pl-2">26. INFORMATION CONSENT OBTAINED? (If applicable):</p></div>
              <div className="flex">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">27. SUBSTANCE ABUSE HISTORY?</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className=""> <p className="pl-2">28. ATTENDING PYSCHOTHERAPY?</p></div>
              <div className="flex">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-2">Frequency:</p>
                <input className="border-b border-black" type="text" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">29. KNOWN SEIZURE HISTORY / CONTRAINDICATIONS TO ECT?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-4" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">30. KNOWN REACTION TO ANESTHESIA, OR MEDICAL COMPL ICATION TO ECT?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-4" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">31. TARGET SYMPTOMS?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-4" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b pr-2">
            <div><p className="pl-2">32. AREAS OF CONCERN (Select all that apply)</p></div>
            <div className="flex w-full">
              <p className="pl-2 justify-start">Presence of cognitive disorder</p>
              <input type="checkbox" />
              <p className="pl-2 justify-start">Presence of significant personality disorder</p>
              <input type="checkbox" />
              <p className="pl-2 pr-6">Lack of housing or family/social support  for transition from IP ECT to OP ECT</p>
              <input type="checkbox" />
            </div>
          </div>

          <div className="w-full flex mt-2">

            <div className="w-1/3 pl-4">
              <div><p></p>www.aetnabetterhealth.com/florida</div>
              <div><p>261 N. University Drive, Plantation, FL 33324</p></div>
            </div>

            <div className="w-2/3 text-end pr-24">
              <div>Behavioral Health Std. PA</div>
              <div>Form 03/01/2022</div>
            </div>

          </div>

          <div className="w-full border-b border-black mt-10 mb-10"></div>

          {/* Fin pagina 2 */}

          {/* Pagina 3 */}


          <div className="w-full flex mt-20">
            <div className="w-1/3 mb-5">
              <b>
                Aetna Better Health of Florida
                <br />
                261 N. University Drive
                <br />
                Plantation, FL 33324
                <br />
                Telephone Number:
                <br />
                Fax Number (Medicaid): 833-365-2474
                <br />
                Fax Number (FHK): 833-365-2493
                <br />
                TTY: 711
              </b>
            </div>

            {/* div vacio/ */}
            <div className="w-1/3">
              {/* div vacio */}
            </div>

            <div className="w-1/3">
              {/* imagen */}
              <div className="">
                <img
                  src="https://api.sunissup.com/static/media/aetna.png"
                  alt="aetna"
                  className="ml-16"
                />
              </div>
              {/* dateoOfReq + input */}
              <div className="flex mt-12">
                <p className="pr-2"><b>Date of Request:</b></p>
                <input className="w-2/3 bg-slate-300" type="text" />
              </div>
            </div>
          </div>

          <div className="w-full border-black border pb-6">
            <p className="pl-2 mb-5"><b>Include the following clinical documentation with the ECT/TMS Prior Authorization Request:</b></p>
            <p className="pl-10">• Recent comprehensive Psychiatric Evaluation</p>
            <p className="pl-10">• History of Psychiatric Treatment to date (include all levels of care)</p>
            <p className="pl-20">o Include onset, course, and severity of illness</p>
            <p className="pl-20">o Response to treatment</p>
            <p className="pl-20">o Describe Patient’s overall treatment compliance</p>
            <p className="pl-10">• For prior ECT treatment, include dates, location, number of treatments, results and known contraindications to ECT</p>
            <p className="pl-10">• Substance abuse history and current status</p>
            <p className="pl-10">• Any labs/diagnostic tests available to the prescribing clinician</p>
          </div>

          <div className="w-full border-black border-l border-r border-b">
            <p className="text-center"><b>SECTION 5 – PSYCHOLOGICAL / NEUROPSYCHOLOGICAL TESTING REQUEST</b></p>
            <p className="text-center">Complete all fields in their entirety.</p>
          </div>

          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">33. SERVICE TYPE REQUESTED</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Psychological</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">Neuropsychological</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className=""> <p className="pl-2">34. PRIOR TESTING? (If yes, include date)</p></div>
              <div className="flex">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-2">DATE(MMDDYY):</p>
                <input type="text" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">35. CURRENT BH OUTPATIENT SERVICES?</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className=""> <p className="pl-2">36. PSYCHIATRIC DIAGNOSTIC EVAL UATION?</p></div>
              <div className="flex">
                <p className="pl-4 pr-2">Yes</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">No</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">37. WHAT IS THE CLINICAL QUESTION TO BE ANSWERED BY TESTING?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-2 mb-2" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">38. HOW WILL TESTING AFFECT MEMBER’S TREATMENT?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-2 mb-2" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">39. DETAILED CLINICAL SUMMARY FROM TREATING PSYCHIATRIC PROVIDER FOR 6 MONTHS:</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full mt-2 mb-2" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b pb-4">
            <p className="pl-2"><b>Include the following documentation with the Ps yc hological/Neurops ychological Prior Authorization Request:</b></p>
            <p className="pl-10">• Detailed clinical summary (Physical & Behavioral Health)</p>
            <p className="pl-10">• BHMP Evaluation & progress notes that detail assessment of clinical concern</p>
            <p className="pl-10">• Any supporting rating scales</p>
            <p className="pl-10">• Neurological assessment reviewed by BHMP (if request is for a Neuropsychological Evaluation)</p>
            <p className="pl-10">• Any prior testing completed</p>
          </div>

          <div className="w-full border-black border-l border-r border-b">
            <p className="text-center"><b>SECTION 6 – APPLIED BEHAVIORAL ANALYSIS (ABA)</b></p>
            <p className="text-center">Complete all fields in their entirety.</p>
          </div>

          <div className="flex w-full border-black border-b border-l border-r">
            <div className="w-1/3 border-black border-r">
              <div><p className="pl-2">40. REQUEST TYPE?</p></div>
              <div className="flex"><p className="pl-2 pr-2">Initial</p><input type="checkbox" /><p className="pl-2 pr-2">Concurrent</p><input type="checkbox" /></div>
              <div><p className="pl-2">If concurrent, how long has member been receiving services?</p></div>
            </div>
            <div className="w-2/3">
              <div><p className="pl-2">41. TREATMENT SETTING?</p></div>
              <div><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="w-full border-black border-b border-l border-r">
            <p className="pl-2">42. CLINICAL SYMPTOMS OR SOCIAL BARRIERS?</p>
          </div>
          <div className="w-full border-black border-b border-l border-r"><input className="w-full pt-2 pb-2" type="text" /></div>

          <div className="w-full border-black border-b border-l border-r">
            <p className="pl-2">43. DISCHARGE PLAN (Anticipated date to transition to lower level of care)</p>
          </div>
          <div className="w-full border-black border-b border-l border-r"><input className="w-full pt-2 pb-2" type="text" /></div>

          <div className="w-full flex mt-2">
            <div className="w-1/3 pl-4">
              <div><p></p>www.aetnabetterhealth.com/florida</div>
              <div><p>261 N. University Drive, Plantation, FL 33324</p></div>
            </div>
            <div className="w-2/3 text-end pr-24">
              <div>Behavioral Health Std. PA</div>
              <div>Form 03/01/2022</div>
            </div>
          </div>

          <div className="w-full border-b border-black mt-10 mb-10"></div>
          {/* Fin Pagina 3 */}


          {/* Inicio pagina 4 */}

          <div className="w-full flex mt-20">
            <div className="w-1/3 mb-5">
              <b>
                Aetna Better Health of Florida
                <br />
                261 N. University Drive
                <br />
                Plantation, FL 33324
                <br />
                Telephone Number:
                <br />
                Fax Number (Medicaid): 833-365-2474
                <br />
                Fax Number (FHK): 833-365-2493
                <br />
                TTY: 711
              </b>
            </div>

            {/* div vacio/ */}
            <div className="w-1/3">
              {/* div vacio */}
            </div>

            <div className="w-1/3">
              {/* imagen */}
              <div className="">
                <img
                  src="https://api.sunissup.com/static/media/aetna.png"
                  alt="aetna"
                  className="ml-16"
                />
              </div>
              {/* dateoOfReq + input */}
              <div className="flex mt-12">
                <p className="pr-2"><b>Date of Request:</b></p>
                <input className="w-2/3 bg-slate-300" type="text" />
              </div>
            </div>
          </div>

          <div className="w-full border-black border-l border-r border-t mt-5">
            <p className="text-center"><b>SECTION 7 – OUTPATIENT TREATMENT REQUEST (OTR) REQUEST</b></p>
            <p className="text-center">Complete all fields in their entirety.</p>
          </div>

          <div className="flex w-full border border-black">
            <div className="w-1/3 border-r border-black">
              <div className="w-full"><p className="pl-2">44. REQUEST TYPE?</p></div>
              <div className="flex w-full">
                <p className="pl-4 pr-2">Initial</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">Concurrent</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="w-2/3">
              <div className=""> <p className="pl-2">45. SERVICE TYPE?</p></div>
              <div className="flex">
                <p className="pl-4 pr-2">Substance Use Order</p>
                <input type="checkbox" />
                <p className="pl-4 pr-2">Mental Health</p>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">46. Clinical Symptoms or Social Barriers?</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full pt-3 pb-3 text-left" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">47. Discharge Plan (Anticipated date to transition to lower level of care):</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full pt-3 pb-3 text-left" type="text" /></div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">48. Substance Abuse and/or Mental Health History – History and Current Status:</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full pt-3 pb-3 text-left" type="text" /></div>

          <div className="flex w-full border-black border-l border-r">
            <p className="pl-2 pr-2">49. Criteria/Level of Care Utilized in Past 12 Months:</p>
            <input type="text" />
          </div>

          <div className="flex w-full border-black border">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3">
                <div><p className="text-center pl-2 border-black border-r">Criteria/Level of</p></div>
                <div><p className="text-center border-black border-r">Care</p></div>
              </div>
              <div className="w-2/3"><p className="text-center pt-5">Name of Provider</p></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><p className="text-center pt-5">Duration</p></div>
              <div className="w-2/3"><p className="text-center">Approximate Dates (MMDDYYYY - MMDDYYYY)</p></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><p className="text-center pt-5">Outcome</p></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r">
                <input className="w-full" type="text" />
              </div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r">
                <input className="w-full" type="text" />
              </div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r">
                <input className="w-full" type="text" />
              </div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r">
                <input className="w-full" type="text" />
              </div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r">
                <input className="w-full" type="text" />
              </div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="flex w-1/3 border-black border-r">
              <div className="w-1/3 border-black border-r"><input className="w-full" type="text" /></div>
              <div className="w-2/3"><input className="w-full" type="text" /></div>
            </div>
            <div className="w-1/3">
              <div className="w-full"><input className="w-full" type="text" /></div>
            </div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="w-1/2"><p className="pl-2">50. OPTIONAL SPACE FOR ADDITIONAL DOCUMENTATION:</p></div>
            <div className="w-1/2">
              <p>1- Client requires to continue with PCP follow up to keep medical conditions under control.</p>
              <p>2- Client will receive Individual Psychotherapies to improve mental health symptoms.</p>
              <p>3- Client will apply to become US Citizen to keep government benefits active.</p>
              <p>4- Client will apply for affordable housing and STS services to reach providers.</p>
            </div>
          </div>

          <div className="w-full border-black border-l border-r border-b pr-2">
            <p className="pl-2"><b>Include the following documentation with the ABA Request or OTR Prior Authorization Request:</b></p>
            <p className="pl-10 pt-2">• Clinical data (Psycho/Social/Behavioral history, mental status, current specific maladaptive behaviors and/or skill deficits,  cooccurring disorders, and medical condition(s)</p>
            <p className="pl-10">• Progress reducing target behaviors/skill deficits or lack of, and plan to address . For initial ABA requests, include progress or lackof, with any previous treatment interventions</p>
            <p className="pl-10">• Compliance with treatment and treatment recommendations, include plan to address non -compliance</p>
            <p className="pl-10 pb-2">• For ABA Requests, include treatment plan</p>
          </div>

          <div className="w-full border-black border-l border-r border-b">
            <p className="text-center"><b>SECTION 8 – ATTESTATION</b></p>
            <p className="text-center">Complete all fields in their entirety.</p>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="w-2/3 border-black border-r"><p className="pl-2">51. Printed Name of Provider/Clinician:</p></div>
            <div className="w-1/3"><p className="pl-2">52. Date (MMDDYYYY):</p></div>
          </div>

          <div className="flex w-full border-black border-l border-r border-b">
            <div className="w-2/3 border-black border-r"><input className="w-full pt-2 pb-2" type="text" /></div>
            <div className="w-1/3"><input className="w-full pt-2 pb-2" type="text" /></div>
          </div>

          <div className="w-full border-black border-l border-r border-b"><p className="pl-2">53. Signature of Provider/Clinician:</p></div>
          <div className="w-full border-black border-l border-r border-b"><input className="w-full pt-2 pb-2" type="text" /></div>

          <div className="pl-10 pr-10">
            <p className="text-center mt-2"><b>NOTE:</b> This form must be completed in its entirety in order to receive a determination. Incomplete forms may lead to delays in
              processing or lack of authorization.</p>
          </div>

          <div className="w-full mt-5 mb-5">
            <p><b>AUTHORIZATION DOES NOT GUARANTEE PAYMENT. ALL AUTHORIZATIONS ARE SUBJECT TO MEMBER ELIGIBILITY ON THE
              DATE OF SERVICE. TO ENSURE PROPER PAYMENT FOR SERVICES RENEDERED; PROVIDER/FACILITY MUST VERIFY
              ELIGIBILITY ON THE DATE OF SERVICE.</b></p>
          </div>

          <div className="w-full flex mt-2">
            <div className="w-1/3 pl-4">
              <div><p></p>www.aetnabetterhealth.com/florida</div>
              <div><p>261 N. University Drive, Plantation, FL 33324</p></div>
            </div>
            <div className="w-2/3 text-end pr-24">
              <div>Behavioral Health Std. PA</div>
              <div>Form 03/01/2022</div>
            </div>
          </div>

          <div className="text-end"><p><b>1121V1</b></p></div>



        </div>
      </ContentObserver>
    </div>
  );
};
type Props = {
  scm: ServiceCM | undefined;
  onContentChange: (content: string) => void;
};
export { AetnaBHA };
