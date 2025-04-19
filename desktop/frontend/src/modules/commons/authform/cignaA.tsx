import { useRef } from 'react';
import { ServiceCM, Sure } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";

const CignaA = ({ scm, sure, onContentChange }: Props) => {
    console.log(sure);
    const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
    const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
    return (
        <ContentObserver onContentChange={onContentChange}>
            <div className="items-start" id="content-to-pdf" ref={contentRef}>
                {/* <div>
                    <button
                        type="button"
                        className="inline-block rounded-full bg-white px-12 text-sm font-bold uppercase border border-green-600">
                        CLEAR FORM
                    </button>
                </div> */}

                <div className="w-full pb-2 mt-10">
                    <img
                        src={`${apiUrlStatic}/static/media/cigna.png`}
                        alt="cigna"
                        className="rounded-xl mx-auto"
                        width={200}
                    />
                </div>

                <div className="w-full bg-blue-900">

                    <div className="text-white pl-2" style={{ fontSize: "35px" }}>
                        <p><b>Medicare Advantage</b></p>
                    </div>
                    <div className="text-white pl-2" style={{ fontSize: "35px" }}>
                        <p><b>Outpatient Treatment Request</b></p>
                    </div>

                </div>

                <div className="w-full pt-1">
                    <p><b>Fax completed form to: 866-949-4846</b> Fill out completely to avoid delays</p>
                </div>
                <div className="flex w-full pt-1" style={{ fontSize: "22px" }}>
                    <p className="pr-2"><b>Request Submission Date:</b></p>
                    <div className="border-b border-black"><input className="w-full" type="text" id="input1" value={sure?.auth_date_start} /></div>
                </div>
                <div className="flex pb-2">
                    <p className="pr-2"><b>Request Type </b>(Check one):</p>
                    <input type="checkbox" defaultChecked />
                    <p className="pl-2 pr-2"><b>Standard</b></p>
                    <input type="checkbox" />
                    <p className="pl-2"><b>Expedited (additional information required below):</b></p>
                </div>
                <div className="border-black border">
                    <div className="text-center" style={{ color: "#e35205", fontSize: "20px" }}><p><b>Provider Attestation (Expedited Requests Only)</b></p></div>
                    <div className="pl-2"><p><b>Clinical justification for expedited review:</b></p></div>
                    <div className="w-full  border-black pl-2 pr-2"><input className="w-full border-b border-black" type="text" /></div>
                    <div className="pl-2 pr-2 w-full"><p>By signing below, I certify that applying the standard review timeframe for this service request may seriously jeopardize the life or
                        health of the patient or the patient's ability to regain maximum function.</p></div>

                    <div className="flex w-full mt-5">

                        <div className="flex w-1/2 pl-2">
                            <p className="pr-2"><b>Physician/clinician name:</b></p>
                            <input className="w-3/6 border-b border-black" type="text" />
                        </div>

                        <div className="flex w-1/2 pl-2 pr-2">
                            <p className="pr-2"><b>Signature:</b></p>
                            <input className="w-full border-b border-black" type="text" />

                        </div>

                    </div>

                </div>

                <div className="w-full bg-blue-500 text-white text-center mt-2"><p style={{ fontSize: "22px" }}><b>Identifyig Data</b></p></div>


                <div className="flex w-full mt-2">
                    <div className="flex w-1/2">
                        <div className="flex w-2/3">
                            <p className="pr-2"><b>First: </b></p>
                            <p className="w-full border-b border-black pl-2 text-center">{scm?.Demografic.first_name}</p>
                        </div>
                        <div className="flex w-1/3">
                            <p className="pl-2 pr-2"><b>MI: </b></p>
                            <input className="w-full border-b border-black" type="text" />
                        </div>
                    </div>
                    <div className="flex w-1/2">
                        <p className="pl-2 pr-2"><b>Last: </b></p>
                        <p className="pl-2 w-full border-b border-black text-center">{scm?.Demografic.last_name}</p>
                    </div>
                </div>

                <div className="flex w-full pt-2">

                    <div className="flex w-1/3">
                        <p className='w-2/5'><b>Customer ID:</b></p>
                        <input className="w-3/5 border-b border-black" type="text" />
                    </div>

                    <div className="flex w-1/3">
                        <p className="w-2/5 "><b>Date of Birth:</b></p>
                        <p className="w-3/5 border-b border-black text-center">{scm?.Demografic.dob}</p>
                    </div>

                    <div className="flex w-1/3">
                        <div className="w-1/3"><p><b>Gender:</b></p></div>
                        <div className="flex w-1/3">
                            <input type="checkbox" checked={scm?.Demografic.sexo === "Male" && true} />
                            <p className='pl-2'>Male</p>
                        </div>
                        <div className="flex w-1/3">
                            <input type="checkbox" checked={scm?.Demografic.sexo !== "Male" && true} />
                            <p className='pl-2'>Female</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full pt-2">
                    <p className="pr-2"><b>Address:</b></p>
                    <p className="w-full border-b border-black">{scm?.Demografic.address}</p>
                </div>
                <div className="flex w-full pt-2">
                    <div className="flex w-2/3">
                        <p className="pr-2"><b>City:</b></p>
                        <p className="w-full border-b border-black">{scm?.Demografic.state}</p>
                    </div>
                    <div className="flex w-1/3">
                        <div className="flex w-1/2"><p className="pr-2 pl-2">
                            <b>State:</b></p>
                            <p className="w-full border-b border-black">{scm?.Demografic.state}</p>
                        </div>
                        <div className="flex w-1/2"><p className="pr-2 pl-2">
                            <b>Zip:</b></p>
                            <p className="w-full border-b border-black">{scm?.Demografic.zip_code}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-blue-500 text-white text-center mt-2"><p style={{ fontSize: "22px" }}><b>Request Authorizations</b></p></div>

                <div className="flex w-full border border-black mt-2" style={{ backgroundColor: "#f0b434" }}>
                    <div className="w-1/3 border-r border-black"><p className="text-center mt-3"><b>Service</b></p></div>
                    <div className="flex w-2/3">
                        <div className="w-1/4 border-r border-black"><p className="text-center mt-3"><b>Code</b></p></div>
                        <div className="w-1/4 border-r border-black"><p className="text-center"><b># Units/Days requested</b></p></div>
                        <div className="w-1/4 border-r border-black"><p className="text-center mt-3"><b>Service Start Date</b></p></div>
                        <div className="w-1/4"><p className="text-center mt-3"><b>Service End Date</b></p></div>
                    </div>
                </div>
                <div className="flex w-full">

                    <div className="flex w-1/3 border-r border-l border-b border-black">
                        <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}><p className="pl-2 pt-2 pb-2 border-r border-black"><b>1.</b></p></div>
                        <div className="w-5/6"><input className="w-full" type="text" /></div>
                    </div>
                    <div className="flex w-2/3">
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/3 border-r border-l border-b border-black">
                        <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}><p className="pl-2 pt-2 pb-2 border-r border-black"><b>2.</b></p></div>
                        <div className="w-5/6"><input className="w-full" type="text" /></div>
                    </div>
                    <div className="flex w-2/3">
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/3 border-r border-l border-b border-black">
                        <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}><p className="pl-2 pt-2 pb-2 border-r border-black"><b>3.</b></p></div>
                        <div className="w-5/6"><input className="w-full" type="text" /></div>
                    </div>
                    <div className="flex w-2/3">
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/3 border-r border-l border-b border-black">
                        <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}><p className="pl-2 pt-2 pb-2 border-r border-black"><b>4.</b></p></div>
                        <div className="w-5/6"><input className="w-full" type="text" /></div>
                    </div>
                    <div className="flex w-2/3">
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                        <div className="w-1/4 border-black border-b border-r"><p><input className="w-full" type="text" /></p></div>
                    </div>

                </div>


                <div className="w-full h-52"></div>
                <div className="w-full">
                    <p className="text-left mt-10" style={{ fontSize: "18px" }}>

                        {/* <b> */}

                        All Cigna products and services are provided exclusively by or through operating subsidiaries of Cigna Corporation, including Cigna Health and Life Insurance Company, Cigna
                        HealthCare of South Carolina, Inc., Cigna HealthCare of North Carolina, Inc., Cigna HealthCare of Georgia, Inc., Cigna HealthCare of Arizona, Inc., Cigna HealthCare of St. Louis,
                        Inc., HealthSpring Life & Health Insurance Company, Inc., HealthSpring of Florida, Inc., Bravo Health Mid-Atlantic, Inc., and Bravo Health Pennsylvania, Inc. The Cigna name,
                        logos, and other Cigna marks are owned by Cigna Intellectual Property, Inc.

                        {/* </b> */}


                    </p>
                </div>

                <div className="w-full">
                    <p className="text-left mt-2"><b>© 2020 Cigna. Some content may be provided under license.</b></p>
                </div>
                <div className="w-full">
                    <p className="text-left mt-2" style={{ fontSize: "18px" }}><b>933152 04/2020 INT_20_85391_C</b></p>
                </div>


                {/* pagina 2 */}


                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-20 p-1"><p style={{ fontSize: "22px" }}><b>Provider Information</b></p></div>

                <div className="flex w-full mt-2">

                    <div className="flex w-6/12">
                        <div className="w-2/5"><p><b>Name</b> (program, facility or provider):</p></div>
                        <div className="w-6/12 border-b border-black"><p className="text-blue-500">SOCIAL DIVERSITY LLC</p></div>
                    </div>
                    <div className="flex w-1/3">
                        <div className="w-auto"><p className="pl-2 pr-2"><b>NPI #:</b></p></div>
                        <div className="w-auto"><input className="text-blue-500" type="text" value="1245863448" /></div>
                    </div>

                </div>

                <div className="flex w-full mt-2">

                    <div className="flex w-1/4">
                        <p className="pr-2"><b>Phone:</b></p>
                        <input className="w-full border-b border-black text-blue-500" type="text" value="( 786 ) 975-7485" />
                    </div>
                    <div className="flex w-1/4"></div>

                    <div className="flex w-1/4">
                        <p className="pr-2"><b>Fax:</b></p>
                        <input className="w-full border-b border-black text-blue-500" type="text" value="( 954 ) 860-7166" />
                    </div>
                    <div className="flex w-1/4"></div>

                </div>

                <div className="flex w-full mt-2">

                    <div className="w-auto pr-2">
                        <p><b>To whom should the authorization determination be sent? Name:</b></p>
                    </div>

                    <div className="w-auto">
                        <input className="border-b border-black text-blue-500" type="text" value="SOCIAL DIVERSITY LLC" />
                    </div>

                </div>

                <div className="flex w-full mt-2">

                    <div className="flex w-1/4">
                        <p className="pr-2"><b>Phone:</b></p>
                        <input className="w-full border-b border-black text-blue-500" type="text" value="( 786 ) 975-7485" />
                    </div>
                    <div className="flex w-1/4"></div>

                    <div className="flex w-1/4">
                        <p className="pr-2"><b>Fax:</b></p>
                        <input className="w-full border-b border-black text-blue-500" type="text" value="( 954 ) 860-7166" />
                    </div>
                    <div className="flex w-1/4"></div>

                </div>

                <div className="flex w-full mt-2 border-b border-black pb-2">

                    <div className="w-auto pr-2"><p><b>Other BH Provider(s):</b></p></div>
                    <div className="w-5/6"><input className="w-full border-b border-black" type="text" name="" id="" /></div>

                </div>

                <div className="pt-2"><p><b>Check One:</b></p></div>

                <div className="flex w-full">
                    <input type="checkbox" defaultChecked />
                    <p className="pl-2">Member agreed to release of information to their PCP and/or other treating providers dated</p>
                    <input className="border-b border-black" type="text" />
                </div>

                <div className="flex w-full">
                    <input type="checkbox" />
                    <p className="pl-2">Member has been informed for release of information and has declined</p>
                </div>

                <div className="w-full bg-blue-500 text-white text-center mt-2"><p style={{ fontSize: "22px" }}><b>Diagnosis ICD 10 Codes</b></p></div>

                <div className="flex w-full mt-2">
                    <div className="w-1/2 border-t border-l border-black"><input className="w-full p-4" type="text" /></div>
                    <div className="w-1/2 border-t border-l border-r border-black"><input className="w-full p-4" type="text" /></div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/2 border-t border-l border-black"><input className="w-full p-4" type="text" /></div>
                    <div className="w-1/2 border-black border-l border-t border-r"><input className="w-full p-4" type="text" /></div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/2 border-t border-b border-l border-black"><input className="w-full p-4" type="text" /></div>
                    <div className="w-1/2 border border-black"><input className="w-full p-4" type="text" /></div>
                </div>

                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-2 p-1"><p style={{ fontSize: "22px" }}><b>Psychotropic Medications</b></p></div>

                <div className="flex w-full mt-2 border-t border-b border-black">

                    <div className="w-1/3 p-4 border-l border-black" style={{ backgroundColor: "#f0b434" }}>
                        <p className="text-center pt-3"><b>Medication</b></p>
                    </div>

                    <div className="flex w-2/3" style={{ backgroundColor: "#f0b434" }}>

                        <div className="w-1/5"> <p className="text-center p-5 border-l border-black"><b>Previous or current?</b></p></div>
                        <div className="w-1/5"> <p className="text-center p-2 border-r border-l border-black"><b>Changed since last report?</b></p></div>
                        <div className="w-1/5"> <p className="text-center p-8 border-r border-black"><b>Dosage</b></p></div>
                        <div className="w-1/5"> <p className="text-center p-8 border-r border-black"><b>Frequency</b></p></div>
                        <div className="w-1/5"> <p className="text-center p-8 border-r border-black"><b>Adherent?</b></p></div>

                    </div>

                </div>

                <div className="flex w-full border-l border-b border-black">

                    <div className="w-1/3 border-r border-black">
                        <input className="w-full p-3" type="text" />
                    </div>

                    <div className="flex w-2/3">

                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>

                    </div>

                </div>


                <div className="flex w-full border-l border-b border-black">

                    <div className="w-1/3 border-r border-black">
                        <input className="w-full p-3" type="text" />
                    </div>

                    <div className="flex w-2/3">

                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>

                    </div>

                </div>


                <div className="flex w-full border-l border-b border-black">

                    <div className="w-1/3 border-r border-black">
                        <input className="w-full p-3" type="text" />
                    </div>

                    <div className="flex w-2/3">

                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>

                    </div>

                </div>


                <div className="flex w-full border-l border-b border-black">

                    <div className="w-1/3 border-r border-black">
                        <input className="w-full p-3" type="text" />
                    </div>

                    <div className="flex w-2/3">

                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>
                        <div className="w-1/5 border-r border-black"><input className="w-full p-3" type="text" /></div>

                    </div>

                </div>

                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-2 p-1"><p style={{ fontSize: "22px" }}><b>Clinical Narrative</b></p></div>

                <div className="w-full text-center pt-2 pb-2"><p>Provide information to support this request: symptoms, risk factors, social history, substance use history, etc.</p></div>

                <div className="w-full border border-black"><input className="w-full p-40" type="text" /></div>

                <div className="pt-2"><p><b>933152 04/2020</b></p></div>


                {/* pagina 3 */}

                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-20 p-1 mb-2"><p style={{ fontSize: "22px" }}><b>Co-occurring Medical Conditions</b></p></div>

                <div className="w-full border border-black"><input className="w-full p-20" type="text" /></div>

                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-5 p-1 mb-2"><p style={{ fontSize: "22px" }}><b>Treatment History</b></p></div>

                <div className="text-center pb-2"><p>All levels of care</p></div>

                <div className="flex w-full">

                    <div className="flex w-1/2" style={{ backgroundColor: "#f0b434" }}>

                        <div className="w-1/3 text-center border border-black content-center"><p><b>Level of Care</b></p></div>
                        <div className="w-1/3 text-center border-r border-t border-b border-black content-center">
                            <p><b># of distinct</b></p>
                            <p><b>episodes/sessions</b></p>
                        </div>
                        <div className="flex w-1/3 text-center border-t border-b border-black">
                            <div className="w-5/6 content-center border-black border-r"><p><b>Date of last treatment.</b></p></div>
                            <div className="w-1/6"></div>
                        </div>
                    </div>

                    <div className="flex w-1/2" style={{ backgroundColor: "#f0b434" }}>

                        <div className="w-1/3 text-center border border-black content-center"><p><b>Level of Care</b></p></div>
                        <div className="w-1/3 text-center border-r border-t border-b border-black content-center">
                            <p><b># of distinct</b></p>
                            <p><b>episodes/sessions</b></p>
                        </div>
                        <div className="w-1/3 text-center border-r border-t border-b border-black">
                            <p className="content-center border-black"><b>Date of last treatment</b></p>
                        </div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-5"><b>Impatient psychiatric</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black"></div>
                        <div className="flex w-1/3 text-center border-b border-black">
                            <div className="w-5/6 border-r border-black"></div>
                            <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}></div>
                        </div>
                    </div>

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-3"><b>Inpatient Outpatient (IOP)</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black p-2"></div>
                        <div className="w-1/3 text-center border-r border-b border-black">

                        </div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-5"><b>Inpatient Substance Use Disorder</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black"></div>
                        <div className="flex w-1/3 text-center border-b border-black">
                            <div className="w-5/6 border-r border-black"></div>
                            <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}></div>
                        </div>
                    </div>

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-3"><b>Outpatient psych (individual or group)</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black p-2"></div>
                        <div className="w-1/3 text-center border-r border-b border-black">

                        </div>
                    </div>

                </div>

                <div className="flex w-full">

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-5"><b>Partial Hospitalization (PHP)</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black"></div>
                        <div className="flex w-1/3 text-center border-b border-black">
                            <div className="w-5/6 border-r border-black"></div>
                            <div className="w-1/6" style={{ backgroundColor: "#f0b434" }}></div>
                        </div>
                    </div>

                    <div className="flex w-1/2">

                        <div className="w-1/3 text-center border-b border-l border-r border-black"><p className="p-3"><b>Outpatient substance use (individual or group)</b></p></div>
                        <div className="w-1/3 text-center border-r border-b border-black p-2"></div>
                        <div className="w-1/3 text-center border-r border-b border-black">

                        </div>
                    </div>

                </div>

                {/* header azul */}
                <div className="w-full bg-blue-500 text-white text-center mt-5 p-1 mb-2"><p style={{ fontSize: "22px" }}><b>Treatment Goals and Outcomes</b></p></div>
                <div className="text-center pb-2"><p>Complete fields below and/or attach current treatment plan</p></div>

                {/* tabla */}
                <div className="w-full border border-black pl-2" style={{ backgroundColor: "#f0b434" }}><p><b>Treatment Goals</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-4 pl-2"><p><b>1.</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-4 pl-2"><p><b>2.</b></p></div>
                <div className="w-full border-l border-r border-black pb-4 pl-2"><p><b>3.</b></p></div>
                <div className="w-full border border-black pl-2" style={{ backgroundColor: "#f0b434" }}><p><b>Objective outcome criteria by which goal will be measured:</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-4 pl-2"><p><b>1.</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-4 pl-2"><p><b>2.</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-4 pl-2"><p><b>3.</b></p></div>


                <div className="mt-40"><p><b>933152 04/2020</b></p></div>

                {/* pagina 4 */}

                <div className="w-full border border-black pl-2 pt-3 pb-3 mt-40" style={{ backgroundColor: "#f0b434" }}><p><b>Expected Outcome and Prognosis (check all that apply)</b></p></div>
                <div className="flex w-full border-l border-r border-b border-black pb-4 pl-2"><input className="mt-2" type="checkbox" defaultChecked /><p className="pl-2 mt-1">Return to normal functioning</p></div>
                <div className="flex w-full border-l border-r border-b border-black pb-4 pl-2"><input className="mt-2" type="checkbox" /><p className="pl-2 mt-1">Expected improvement, anticipated less than baseline functioning</p></div>
                <div className="flex w-full border-l border-r border-black pb-4 pl-2"><input className="mt-2" type="checkbox" defaultChecked /><p className="pl-2 mt-1">Relieve acute symptoms, return to baseline functioning</p></div>
                <div className="w-full border border-black pl-2 pt-2 pb-2" style={{ backgroundColor: "#f0b434" }}><p><b>Discharge/Termination Plan (include estimated discharge date)</b></p></div>
                <div className="w-full border-l border-r border-b border-black pb-5 pt-5 pl-2"><input className="w-full pt-10 pb-10" type="text" /></div>


                <div className="text-center mt-5"><p><b>Fax completed form to: 866-949-4846</b></p></div>
                <div className="text-center"><p>Fill out completely to avoid delays</p></div>

                <div className="mt-40"><p>933152 04/2020</p></div>




            </div>
        </ContentObserver>
    );
}
type Props = {
    scm: ServiceCM | undefined;
    sure?: Sure;
    onContentChange: (content: string) => void;
}
export { CignaA };