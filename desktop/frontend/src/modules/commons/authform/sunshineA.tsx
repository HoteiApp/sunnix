import { useState, useRef } from 'react';

// import { DownloadPDFButton } from "../CreatePDFtoDiv";
import { ServiceCM, Sure } from "../../../models";
import { CustomInput } from '../CustomInput';
import { CustomCheckbox } from '../CustomCheckbox';
import { ContentObserver } from "../../commons/ContentObserver";
const SunshineA = ({ scm, sure, onContentChange }: Props) => {
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia

  // Inputs
  const [inputValue, setInputValue] = useState<string | number>('');
  const [inputValue1, setInputValue1] = useState<string | number>('');
  const [inputValue2, setInputValue2] = useState<string | number>(sure?.unit || 400);
  const [inputValue3, setInputValue3] = useState<string | number>('512');
  const [inputValue4, setInputValue4] = useState<string | number>('');

  const [check, setChecked] = useState<boolean>(false);
  const [check1, setChecked1] = useState<boolean>(true);
  const [check2, setChecked2] = useState<boolean>(false);
  const lastName = scm?.Demografic.last_name || '';
  const firstName = scm?.Demografic.first_name || '';
  // Dividir el apellido en palabras y tomar la primera
  const firstLastName = lastName.split(' ')[0];


  // ---------
  const dob = scm?.Demografic.dob || ''; // Asegúrate de que la variable no sea undefined

  // Función para convertir la fecha
  const convertDateFormat = (dateString) => {
    const [month, day, year] = dateString.split('/');
    // const shortYear = year.slice(-2); // Obtener los últimos dos dígitos del año
    return `${month}${day}${year}`;
  };

  const formattedDate = convertDateFormat(dob);
  // ---------
  const fullName = `${firstLastName}, ${firstName}`;

  return (
    <div style={{ height: '80vh', 'overflow': 'auto' }}>
      <ContentObserver onContentChange={onContentChange}>
        <div id="content-to-pdf" ref={contentRef} style={{ fontSize: "12px" }}>
          {/* Header */}
          <div className="w-full flex mt-2">
            <div className="w-1/3 items-center text-center">
              <img
                src={`${apiUrlStatic}/static/media/sunshine-logo.png`}
                alt="sunshine-logo"
                className="rounded-xl ml-5" />
            </div>
            <div className="w-1/3 text-center">
              <b style={{ fontSize: "18px" }}>OUTPATIENT <br />AUTHORIZATION FORM</b>
              <br />
              (FLORIDA)
            </div>
            <div className="w-1/3 text-right" style={{ fontSize: "12px" }}>
              Complete and <b>Fax</b> to: 866-796-0526<br />
              Buy & Bill Drug Requests <b>Fax</b> to: 833-823-0001<br />
              Transplant Request <b>Fax</b> to: 833-550-1338<br />
              DME/HH (LTC only) <b>Fax</b> to: 855-266-5275 <br />
              DME <b>Fax</b> to: 833-741-0943 <br />
              HH <b>Fax</b> to: 866-534-5978 <br />
              BH: <b>Fax</b> 844-208-9113<br />
            </div>
          </div>
          {/* ----------- */}
          <div style={{ position: "relative", top: "-35px" }}>
            <div className="w-5/6 flex" style={{ fontSize: "11px" }}>
              <CustomCheckbox value={check} onChange={setChecked} />
              <div className="">Request for additional units.</div>
              <div className='ml-10 mr-1'>Existing Authorization</div>
              <CustomInput length={12} type="string" value={inputValue1} onChange={setInputValue1} />

              <div className='ml-10 mr-1' style={{ fontSize: "12px" }}>Units</div>
              <CustomInput length={4} type="string" value={inputValue2} onChange={setInputValue2} />

            </div>
            {/* ----------- */}
            <div className="w-full flex mt-1">
              <CustomCheckbox value={check1} onChange={setChecked1} />
              <div style={{ fontSize: "12px" }}><b>Standard requests</b> - Determination within 7 calendar days of receipt of request. </div>
            </div>
            {/* ----------- */}
            <div className="w-full flex items-center">
              <CustomCheckbox value={check2} onChange={setChecked2} />
              <div className='mt-4' style={{ fontSize: "12px" }}>
                <b>Urgent requests </b> - Please call 1-844-477-8313. *Urgent requests are made when the member or his/her physician believes that waiting for a
                <br />decision under the standard timeframe could place the enrollee’s life, health, or ability to regain maximum function in serious jeopardy.</div>
            </div>
            {/* ----------- */}
            <div className="w-full flex">
              <div className='w-full'>
                <div className='w-full mt-4 flex'>
                  <div className='w-2/6' style={{ fontSize: "11px" }}><b>* INDICATES REQUIRED FIELD</b></div>
                  <div className='w-4/6 border-b-2 border-black' style={{ position: "relative", left: "-50px" }}></div>
                </div>
                <div className='w-full mt-4 flex items-center'>
                  <div className='w-1/2 items-center'><b style={{ fontSize: "14px" }}>MEMBER INFORMATION</b></div>
                  <div className='w-1/2 items-center'>
                    <div className='w-full flex'>
                      <div className='w-1/2'></div>
                      <div className='w-1/2'>
                        <div style={{ fontSize: "12px" }}>*Date of Birth</div>
                        <CustomInput length={8} type="string" value={formattedDate} onChange={setInputValue} />
                        <div style={{ fontSize: "8px" }}>(MMDDYYYY)</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- */}
                <div className='w-full mt-4 flex items-center'>
                  <div className='w-1/2 items-center'>
                    <div style={{ fontSize: "12px" }}>*Medicalid/Member ID</div>
                    <CustomInput length={16} type="string" value={scm?.Demografic.medicaid ?? ""} onChange={setInputValue} />
                  </div>
                  <div className='w-1/2 text-right'>
                    <div className='w-full flex'>
                      <div className='w-4/5 text-left'>
                        <div style={{ fontSize: "12px" }}>*Last Name. First</div>
                        <CustomInput length={16} type="string" value={fullName} onChange={setInputValue} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ----- */}
                <div className='w-full mt-4 flex'>
                  <div><b style={{ fontSize: "14px" }}>REQUESTING PROVIDER INFORMATION</b></div>
                </div>
              </div>
              {/* CODE BAR */}
              <div className='w-auto text-right'>
                <img
                  src="https://api.sunissup.com/static/media/codebar-sunshine.png"
                  alt="codebar"
                  className="inline-block h-60"
                />
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-1/4 items-center'>
                <div style={{ fontSize: "12px" }}>*Requesting NPI</div>
                <CustomInput length={10} type="number" value={1245863448} onChange={setInputValue} />
              </div>
              <div className='w-1/4 text-right'>
                <div className='w-full flex'>
                  <div className='w-1/5'></div>
                  <div className='w-4/5 text-left'>
                    <div style={{ fontSize: "12px" }}>*Requesting TIN</div>
                    <CustomInput length={9} type="number" value={832260545} onChange={setInputValue} />
                  </div>
                </div>
              </div>
              <div className='w-1/6'></div>
              <div className='w-2/4 text-right'>
                <div className='text-left'>
                  <div style={{ fontSize: "12px" }}>Requesting Provider Contact Name</div>
                  <CustomInput length={16} type="string" value={"ESEL  AGUILAR"} onChange={setInputValue} />
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-2/4 items-center'>
                <div style={{ fontSize: "12px" }}>Requesting Provider Name</div>
                <CustomInput length={16} type="string" value={"SOCIAL DIVERSITY"} onChange={setInputValue} />
              </div>
              <div className='w-1/4 text-right'>
                <div className='w-full flex'>
                  <div className='w-1/5'></div>
                  <div className='w-4/5 text-left'>
                    <div style={{ fontSize: "12px" }}>Phone</div>
                    <CustomInput length={10} type="number" value={7869757485} onChange={setInputValue} />
                  </div>
                </div>
              </div>
              <div className='w-2/6'></div>
              <div className='w-2/4 text-right'>
                <div className='text-left'>
                  <div style={{ fontSize: "12px" }}>*Fax</div>
                  <CustomInput length={10} type="number" value={9548607166} onChange={setInputValue} />
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full mt-4'>
              <div><b style={{ fontSize: "14px" }}>SERVICING PROVIDER / FACILITY INFORMATION </b></div>
              <div className="w-full flex mt-1">
                <i className='pi pi-reply' style={{ transform: "scaleY(-1)" }}></i>
                <CustomCheckbox value={true} onChange={setChecked} />
                <div style={{ fontSize: "12px" }}>Same as Requesting Provider</div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-1/4 items-center'>
                <div>*Servicing NPI</div>
                <CustomInput length={10} type="number" value={1245863448} onChange={setInputValue} />
              </div>
              <div className='w-1/4 text-right'>
                <div className='w-full flex'>
                  <div className='w-1/5'></div>
                  <div className='w-4/5 text-left'>
                    <div >*Servicing TIN</div>
                    <CustomInput length={9} type="number" value={832260545} onChange={setInputValue} />
                  </div>
                </div>
              </div>
              <div className='w-1/6'></div>
              <div className='w-2/4 text-right'>
                <div className='text-left'>
                  <div>Servicing Provider Contact Name</div>
                  <CustomInput length={16} type="string" value={"ESEL  AGUILAR"} onChange={setInputValue} />
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-2/4 items-center'>
                <div>Servicing Provider/ Facility Name</div>
                <CustomInput length={16} type="string" value={"SOCIAL DIVERSITY"} onChange={setInputValue} />
              </div>
              <div className='w-1/4 text-right'>
                <div className='w-full flex'>
                  <div className='w-1/5'></div>
                  <div className='w-4/5 text-left'>
                    <div >Phone</div>
                    <CustomInput length={10} type="number" value={7869757485} onChange={setInputValue} />
                  </div>
                </div>
              </div>
              <div className='w-2/6'></div>
              <div className='w-2/4 text-right'>
                <div className='text-left'>
                  <div>Fax</div>
                  <CustomInput length={10} type="number" value={9548607166} onChange={setInputValue} />
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full mt-4'>
              <div><b style={{ fontSize: "14px" }}>AUTHORIZATION REQUEST</b></div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-1/4 items-center'>
                <div style={{ fontSize: "12px" }}><b>*Primary</b> Procedure Code</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={5} type="string" value={"T1017"} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(CPT/HCPCS)</p>
                  </div>
                  <div className='pl-4'>
                    <CustomInput length={2} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(Modifier)</p>
                  </div>
                </div>

              </div>
              <div className='w-1/4 titems-center'>
                <div style={{ fontSize: "12px" }}><b>Additional</b> Procedure Code</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={5} type="string" value={"T1017"} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(CPT/HCPCS)</p>
                  </div>
                  <div className='pl-4'>
                    <CustomInput length={2} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(Modifier)</p>
                  </div>
                </div>
              </div>
              <div className='w-1/4 items-center'>
                <div style={{ fontSize: "12px" }}><b>*Start Data OR</b> Admission Date</div>
                <CustomInput length={8} type="string" value={formattedDate} onChange={setInputValue} />
                <div style={{ fontSize: "8px" }}>(MMDDYYYY)</div>
              </div>
              <div className='w-1/4 titems-center'>
                <div style={{ fontSize: "12px" }}>*Diagnosis Code</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={3} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>ICD-10)</p>
                  </div>
                  <div className='items-ends' style={{ fontSize: "24px" }}>.</div>
                  <div>
                    <CustomInput length={3} type="string" value={""} onChange={setInputValue} />
                  </div>
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full flex items-center mt-4'>
              <div className='w-1/4 items-center'>
                <div style={{ fontSize: "12px" }}><b>Additional</b> Procedure Code</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={5} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(CPT/HCPCS)</p>
                  </div>
                  <div className='pl-4'>
                    <CustomInput length={2} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(Modifier)</p>
                  </div>
                </div>

              </div>
              <div className='w-1/4 titems-center'>
                <div style={{ fontSize: "12px" }}><b>Additional</b> Procedure Code</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={5} type="string" value={"T1017"} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(CPT/HCPCS)</p>
                  </div>
                  <div className='pl-4'>
                    <CustomInput length={2} type="string" value={""} onChange={setInputValue} />
                    <p style={{ fontSize: "8px" }}>(Modifier)</p>
                  </div>
                </div>
              </div>
              <div className='w-1/4 items-center'>
                <div style={{ fontSize: "12px" }}><b>End Data OR</b> Discharge Date</div>
                <CustomInput length={8} type="string" value={formattedDate} onChange={setInputValue} />
                <div style={{ fontSize: "8px" }}>(MMDDYYYY)</div>
              </div>
              <div className='w-1/4 titems-center'>
                <div style={{ fontSize: "12px" }}>Total Units/Visits/Days</div>
                <div className='flex'>
                  <div>
                    <CustomInput length={4} type="string" value={""} onChange={setInputValue} />
                  </div>
                </div>
              </div>
            </div>
            {/* ----------- */}
            <div className='w-full border-2 border-black mt-4'>
              <div className='w-full flex items-center p-2'>

                <div className='w-1/3 titems-center'>
                  <div><b style={{ fontSize: "14px" }}>*OUTPATIENT SERVICE TYPE</b></div>
                </div>
                <div className='w-1/3 items-center'>
                  <div>(Enter the Service type number in the boxes)</div>
                </div>
                <div className='w-1/3 titems-center'>
                  <CustomInput length={3} type="number" value={inputValue3} onChange={setInputValue3} />
                </div>
              </div>
              {/* ---- */}
              <div className='w-full flex mt-4' style={{ fontSize: "12px" }}>
                <div className='w-1/4 pl-2'>
                  292 Cardiac Rehab<br />
                  299 Drug Testing<br />
                  205 Genetic Testing & Counseling<br />
                  249 Home Health<br />
                  225 Home Meals<br />
                  390 Hospice Services<br />
                  112 Nutritional Supplements<br />
                  331 Rehab (PPEC)<br />
                  <br />
                  <br />
                  332 Expressive Therapy <b>(Art, Music, Pet, Equine)</b>
                </div>
                <div className='w-1/4'>
                  997 Office Visit/Consult<br />
                  794 Outpatient Services<br />
                  171 Outpatient Surgery<br />
                  202 Pain Management<br />
                  427 Rehab <b>(PT, OT, ST)</b><br />
                  201 Sleep Study<br />
                  993 Transplant Evaluation<br />
                  209 Transplant Surgery<br />
                  724 Transportation
                </div>
                <div className='w-1/4'>
                  <b>DME</b> <br />
                  <div className='flex w-full'>
                    <div className='w-1/2'>
                      417 DME - Rental <br />
                      120 DME - Purchase <br />
                    </div>
                    <div className='w-1/2'>
                      <input
                        value={inputValue4}
                        onChange={(e) => { setInputValue4(e.target.value) }}
                        style={{
                          border: '2px solid gray',
                          width: "80px",
                        }}
                      />
                      <p style={{ fontSize: "8px" }}>(Purchase Price)</p>
                    </div>
                  </div>
                  <br /><br />
                  <b className='mt-24'>Drugs</b> <br />

                  422 Biopharmacy Buy & Bill Drugs <br />
                  (Fax Buy & Bill Drug Requests to <b>1-833-823-0001</b>)  <br />
                </div>
                <div className='w-1/4'>
                  <b>Behavioral Health</b><br />
                  510 BH Medical Management<br />
                  512 BH Community Based Services<br />
                  513 BH Crisis Psychotherapy <br />
                  514 BH Day Treatment<br />
                  515 BH Electroconvulsive Therapy<br />
                  516 BH Intensive Outpatient Therapy<br />
                  519 BH Outpatient Therapy<br />
                  520 BH Professional Fees<br />
                  521 BH Psychological Testing<br />
                  522 BH Psychiatric Evaluation<br />
                  530 BH Partial Hospitalization Program<br />
                  533 BH Applied Behavioral Analysis<br />
                </div>
              </div>
              <div className='bg-black text-white text-center mt-4' style={{ fontSize: "10px" }}>
                ALL REQUIRED FIELDS MUST BE FILLED IN AS INCOMPLETE FORMS WILL BE REJECTED. <br />
                COPIES OF ALL SUPPORTING CLINICAL INFORMATION ARE REQUIRED. LACK OF CLINICAL INFORMATION MAY RESULT IN DELAYED DETERMINATION.
              </div>
            </div>
            <div className='w-full flex' style={{ fontSize: "8px" }}>
              <div className='w-5/6'>
                Disclaimer: An authorization is not a guarantee of payment. Member must be eligible at the time services are rendered. Services must be a covered Health Plan Beneft and medically necessary with prior
                <br />
                authorization as per Plan policy and procedures.
                <br />
                Confdentiality: The information contained in this transmission is confdential and may be protected under the Health Insurance Portability and Accountability Act of 1996. If you are not the<br />
                intended recipient any use, distribution, or copying is strictly prohibited. If you have received this facsimile in error, please notify us immediately and destroy this document.
              </div>
              <div className='w-1/6 flex text-right items-end align-bottom justify-end' style={{ fontSize: "10px" }}>
                <b>
                  Rev. 09 07 2023
                  <br />
                  FL-PAF-0675
                </b>
              </div>
            </div>
          </div>
        </div>
      </ContentObserver>
    </div>






  );
}

type Props = {
  scm: ServiceCM | undefined;
  sure?: Sure;
  onContentChange: (content: string) => void;
}

export { SunshineA };
