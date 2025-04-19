import { useRef, useState } from 'react';
import { ServiceCM } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";
const Molina = ({ scm, onContentChange }: Props) => {
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const [lineBMedicalId, setLineBMedicalId] = useState<boolean>(true)
  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
  return (
    <div style={{ height: "80vh", overflow: "auto" }}>
      <ContentObserver onContentChange={onContentChange}>
        <div id="content-to-pdf" ref={contentRef}>
          <div className="w-full pl-10 pr-10">
            <img
              src={`${apiUrlStatic}/static/media/molina.png`}
              alt="aetna"
              className="rounded-xl"
              width={150}
            />
            <div className="flex justify-center">
              <b style={{ fontSize: "20px" }}>
                Molina® Healthcare, Inc. - BH Prior Authorization Service Request
                Form
              </b>
            </div>

            <div
              className="flex justify-center pt-1 pb-1 text-white items-center border-b border-t border-black"
              style={{ backgroundColor: "#30859B", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                M
              </p>
              EMBER{" "}
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                I
              </p>
              NFORMATION
            </div>

            {/* row 1 */}
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/5 border-r border-black">
                <div className="flex w-full pt-1 justify-end">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Line of Business:
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="flex w-full items-center">
                  <div className=" w-auto pl-2 pr-2 place-items-center border-r border-black">
                    <input type="checkbox" id="medicaid" checked={lineBMedicalId} onClick={() => { setLineBMedicalId(!lineBMedicalId) }}></input>
                    <b className="ml-2" style={{ fontSize: "12px" }}>
                      Medicaid
                    </b>
                  </div>
                  {/* -- */}
                  <div className=" w-auto pl-2 place-items-center border-r border-black">
                    <input
                      type="checkbox"
                      id="marketplace"
                      disabled
                      value="marketplace"
                    ></input>
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      Marketplace
                    </b>
                  </div>
                  {/* -- */}
                  <div className=" w-auto pl-2 pr-2 place-items-center border-r border-black">
                    <input type="checkbox" id="medicare" checked={!lineBMedicalId} onClick={() => { setLineBMedicalId(!lineBMedicalId) }} value="medicare"></input>
                    <b className="ml-2" style={{ fontSize: "12px" }}>
                      Medicare
                    </b>
                  </div>
                  {/* -- */}
                  <div className="w-auto pl-2 pr-2 place-items-center flex">
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      Date of Request:
                    </b>
                    <p style={{ fontSize: "12px" }}>{lineBMedicalId ? scm?.Demografic.medicaid : scm?.Demografic.medicare}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="flex w-full border-b border-black">
              <div className="w-1/5 border-r border-black">
                <div className="flex w-full justify-end">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    State/Health Plan (i.e. FL):
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="flex w-full items-center"></div>
              </div>
            </div>

            {/* row 3 */}
            <div className="flex w-full border-b border-black">
              <div className="w-1/5 border-r border-black">
                <div className="flex w-full justify-end">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Member Name:
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="flex w-full items-center place-items-center">
                  <div className="w-1/2 border-r border-black pl-2">
                    <p style={{ fontSize: "12px" }}>{scm?.Demografic.first_name} {scm?.Demografic.last_name}</p>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      DOB (MM/DD/YYYY):
                    </b>
                    <p style={{ fontSize: "12px" }}>{scm?.Demografic.dob}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* row 4 */}
            <div className="flex w-full border-b border-black">
              <div className="w-1/5 border-r border-black">
                <div className="flex w-full justify-end">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Member Id#:
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="flex w-full items-center">
                  <div className="w-1/2 border-r border-black pl-2">
                    <input type="text" id="MN"></input>
                  </div>
                  <div className="w-1/2 flex">
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      Menber Phone:
                    </b>
                    <p style={{ fontSize: "12px" }}> {scm?.Demografic.cell_phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* row 5 */}
            <div className="flex w-full border-b border-black">
              <div className="w-1/5 border-r border-black">
                <div className="flex w-full justify-end">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Service Type:
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="w-full items-center pl-2">
                  <input type="checkbox" id="row5-1"></input>
                  <b className="ml-2" style={{ fontSize: "12px" }}>
                    Non-Urgent/Routine/Elective
                  </b>
                  <br />
                  <input type="checkbox" id="row5-2"></input>
                  <b className="ml-2" style={{ fontSize: "12px" }}>
                    Urgent/Expedited – Clinical Reason for Urgency Required:
                  </b>
                  <input type="text" id="row5"></input>
                  <br />
                  <input type="checkbox" id="row5-3"></input>
                  <b className="ml-2" style={{ fontSize: "12px" }}>
                    Emergent Inpatient Admission
                  </b>
                </div>
              </div>
            </div>

            {/* --------------------------- */}
            <div
              className="flex justify-center pt-1 pb-1 text-white items-center border-b border-black"
              style={{ backgroundColor: "#30859B", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                R
              </p>
              EFERRAL/
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                S
              </p>
              ERVICE{" "}
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                T
              </p>
              YPE{" "}
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                R
              </p>
              EQUESTED
            </div>
            {/* --------------------------- */}
            {/* row */}
            <div className="flex w-full border-b border-t border-black">
              <div className="w-auto border-r border-black">
                <div className="flex w-full pl-2 pt-1 items-center">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Request Type:
                  </b>{" "}
                </div>
              </div>
              <div className="w-4/5 flex">
                <div className="flex w-full items-center">
                  <div className=" w-auto pl-2 pr-2 place-items-center border-r border-black">
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    <b className="ml-2" style={{ fontSize: "12px" }}>
                      Initial Request
                    </b>
                  </div>
                  {/* -- */}
                  <div className=" w-auto pl-2 place-items-center border-r border-black">
                    <input
                      type="checkbox"
                      id="marketplace"
                      value="marketplace"
                    ></input>
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      {" "}
                      Extension/ Renewal / Amendment{" "}
                    </b>
                  </div>

                  {/* -- */}
                  <div className="w-auto pl-2 pr-2 place-items-center">
                    <b className="ml-2 mr-2" style={{ fontSize: "12px" }}>
                      Previous Auth#:
                    </b>
                    <input
                      type="text"
                      id="DOR"
                      style={{ fontSize: "12px" }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            {/* row */}
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/3 border-r border-black">
                <div className="flex w-full pl-2 pt-1 items-center">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Inpatient Services:
                  </b>{" "}
                </div>
              </div>
              <div className="w-2/3 flex">
                <div className="flex w-full pl-2 pt-1 items-center">
                  <b className="mr-1" style={{ fontSize: "12px" }}>
                    Outpatient Services:
                  </b>{" "}
                </div>
              </div>
            </div>
            {/* row */}
            <div className="flex w-full border-b border-t border-black">
              <div
                className="w-1/3 border-r border-black pl-2"
                style={{ fontSize: "12px" }}
              >
                <div>
                  <input type="checkbox" id="row5-1"></input> Inpatient
                  Psychiatric
                </div>
                <div className="pl-5 mb-4">
                  <input type="checkbox" id="row5-1"></input>Involuntary{" "}
                  <input type="checkbox" id="row5-1"></input>Voluntary
                </div>
                <div>
                  <input type="checkbox" id="row5-1"></input> Inpatient
                  Detoxification
                </div>
                <div className="pl-5 mb-4">
                  <input type="checkbox" id="row5-1"></input>Involuntary{" "}
                  <input type="checkbox" id="row5-1"></input>Voluntary
                </div>
                <div>If Involuntary, Court Date: __________</div>
              </div>
              <div
                className="w-1/3 border-r border-black pl-2"
                style={{ fontSize: "12px" }}
              >
                <input type="checkbox" id="row5-1"></input> Residential Treatment
                <br />
                <input type="checkbox" id="row5-1"></input> Partial
                Hospitalization Program
                <br />
                <input type="checkbox" id="row5-1"></input> Intensive Outpatient
                Program
                <br />
                <input type="checkbox" id="row5-1"></input> Day Treatment
                <br />
                <input type="checkbox" id="row5-1"></input> Assertive Community
                Treatment Program
                <br />
                <input type="checkbox" id="row5-1"></input> Targeted Case
                Management
              </div>
              <div className="w-1/3 pl-2" style={{ fontSize: "12px" }}>
                <input type="checkbox" id="row5-1"></input> Electroconvulsive
                Therapy
                <br />
                <input type="checkbox" id="row5-1"></input>{" "}
                Psychological/Neuropsychological Testing
                <br />
                <input type="checkbox" id="row5-1"></input> Applied Behavioral
                Analysis
                <br />
                <input type="checkbox" id="row5-1"></input> Non-PAR Outpatient
                Services
                <br />
                <input type="checkbox" id="row5-1"></input> Other:
              </div>
            </div>

            {/* --------------------------- */}
            <div
              className="flex justify-center pt-1 pb-1 text-white items-center border-b border-black"
              style={{ backgroundColor: "#30859B", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                P
              </p>
              LEASE SEND CLINICAL NOTES AND ANY SUPPORTING DOCUMENTATION
            </div>
            {/* --------------------------- */}
            <div className="flex w-full border-b border-black">
              <div className="w-1/2 pl-2">
                <b className="mr-1" style={{ fontSize: "12px" }}>
                  Primary ICD-10 Code for Treatment:
                </b>{" "}
              </div>
              <div className="w-1/2 flex">
                <b className="mr-1" style={{ fontSize: "12px" }}>
                  Description:
                </b>{" "}
              </div>
            </div>
            {/* --------------------------- */}
            {/* TODO: Aqui va la tabla. */}

            {/* row-t-1 */}

            <div
              className="flex w-full  text-white border-black"
              style={{ backgroundColor: "#30859B", fontSize: "12px" }}
            >
              <div className="flex w-1/6  text-white justify-center border-r border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  D
                </p>
                ATES OF{" "}
                <p
                  className="pl-2"
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  S
                </p>
                ERVICE
              </div>
              <div className="flex w-1/6  text-white justify-center border-r border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  P
                </p>
                ROCEDURE/
              </div>
              <div className="flex w-1/6  text-white justify-center border-r border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  D
                </p>
                IAGNOSIS
              </div>
              <div className="flex w-2/6  text-white justify-center border-r border-black"></div>
              <div className="flex w-1/6  text-white justify-center border-r border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  R
                </p>
                EQUESTED
              </div>
            </div>

            {/* row-t-2 */}
            <div
              className="flex w-full  text-white items-center  border-black"
              style={{ backgroundColor: "#30859B", fontSize: "12px" }}
            >
              <div className="flex w-1/6  text-white justify-center border-r border-b border-black">
                <div className="flex w-1/2  text-white justify-center  border-black">
                  <p
                    style={{
                      position: "relative",
                      top: "-6px",
                      fontSize: "18px",
                    }}
                  >
                    S
                  </p>
                  TART
                </div>
                <div className="flex w-1/2  text-white justify-center  border-black">
                  <p
                    style={{
                      position: "relative",
                      top: "-6px",
                      fontSize: "18px",
                    }}
                  >
                    S
                  </p>
                  TOP
                </div>
              </div>
              <div className="flex w-1/6  text-white justify-center border-r border-b border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  S
                </p>
                ERVICE{" "}
                <p
                  className="pl-2"
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  C
                </p>
                ODES
              </div>
              <div className="flex w-1/6  text-white justify-center border-r border-b border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  C
                </p>
                ODE
              </div>
              <div className="flex w-2/6  text-white justify-start pl-2 border-r border-b border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  R
                </p>
                EQUESTED{" "}
                <p
                  className="pl-2"
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  S
                </p>
                ERVICE
              </div>
              <div className="flex w-1/6  text-white justify-center border-r border-b border-black">
                <p
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  U
                </p>
                NITS /{" "}
                <p
                  className="pl-2"
                  style={{ position: "relative", top: "-6px", fontSize: "18px" }}
                >
                  V
                </p>
                ISITS
              </div>
            </div>

            {/* row-t-3-text-area */}

            <div
              className="flex w-full items-center  border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "12px" }}
            >
              <div className="flex w-1/6  border-r border-b border-black">
                <div className="flex w-1/2 border-r border-black">
                  <input type="text" id="MN1" className="w-full text-center"></input>

                </div>

                <div className="flex w-1/2 justify-center border-black">
                  <input type="text" id="MN2" className="w-full text-center"></input>

                </div>
              </div>

              <div className="flex w-1/6 border-b border-r border-collapse justify-center border-black">
                <input type="text" id="MN1" value="T1017" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6 justify-center border-b border-r  border-black">
                <input type="text" id="MN4" className="w-full text-center" ></input>

              </div>

              <div className="flex w-2/6 justify-start border-b border-r  border-black">
                <input type="text" id="MN5" value="Targeted Case Management" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6 justify-center border-b border-r border-black">
                <input type="text" id="MN6" className="w-full text-center"></input>

              </div>
            </div>

            {/* row-t-4-text-area */}

            <div
              className="flex w-full items-center  border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "12px" }}
            >
              <div className="flex w-1/6  border-r border-b border-black">
                <div className="flex w-1/2 justify-center border-r border-black">
                  <input type="text" id="MN1" className="w-full text-center"></input>

                </div>

                <div className="flex w-1/2 justify-center border-black">
                  <input type="text" id="MN2" className="w-full text-center"></input>

                </div>
              </div>

              <div className="flex w-1/6 justify-center border-b border-r  border-black">
                <input type="text" id="MN3" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6 justify-center border-b border-r  border-black">
                <input type="text" id="MN4" className="w-full text-center"></input>

              </div>

              <div className="flex w-2/6 justify-start border-b border-r  border-black">
                <input type="text" id="MN5" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6 justify-center border-b border-r border-black">
                <input type="text" id="MN6" className="w-full text-center"></input>

              </div>
            </div>

            {/* row-t-5-text-area */}

            <div
              className="flex w-full items-center  border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "12px" }}
            >
              <div className="flex w-1/6  border-r border-b border-black">
                <div className="flex w-1/2 justify-center border-r border-black">
                  <input type="text" id="MN1" className="w-full text-center"></input>

                </div>

                <div className="flex w-1/2  justify-center border-black">
                  <input type="text" id="MN2" className="w-full text-center"></input>

                </div>
              </div>

              <div className="flex w-1/6   justify-center border-b border-r  border-black">
                <input type="text" id="MN3" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6   justify-center border-b border-r  border-black">
                <input type="text" id="MN4" className="w-full text-center"></input>

              </div>

              <div className="flex w-2/6   justify-start border-b border-r  border-black">
                <input type="text" id="MN5" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6   justify-center border-b border-r border-black">
                <input type="text" id="MN6" className="w-full text-center"></input>

              </div>
            </div>

            {/* row-t-6-text-area */}

            <div
              className="flex w-full  items-center  border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "12px" }}
            >
              <div className="flex w-1/6   border-r border-b border-black">
                <div className="flex w-1/2 justify-center border-r border-black">
                  <input type="text" id="MN1" className="w-full text-center"></input>
                </div>

                <div className="flex w-1/2  justify-center border-black">
                  <input type="text" id="MN2" className="w-full text-center"></input>

                </div>
              </div>

              <div className="flex w-1/6   justify-center border-b border-r  border-black">
                <input type="text" id="MN3" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6   justify-center border-b border-r  border-black">
                <input type="text" id="MN4" className="w-full text-center"></input>

              </div>

              <div className="flex w-2/6   justify-start border-b border-r  border-black">
                <input type="text" id="MN5" className="w-full text-center"></input>

              </div>

              <div className="flex w-1/6   justify-center border-b border-r border-black">
                <input type="text" id="MN6" className="w-full text-center"></input>

              </div>
            </div>

            {/* --------------------------- */}
            <div
              className="flex justify-center pt-1 pb-1 text-white items-center border-b border-black"
              style={{ backgroundColor: "#30859B", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                P
              </p>
              ROVIDER{" "}
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                I
              </p>
              NFORMATION
            </div>

            {/* --------------------------- */}
            <div
              className="flex pt-1 pb-1 pl-2 text-black items-center border-b border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                R
              </p>
              EQUESTING
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                P
              </p>
              ROVIDER /
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                F
              </p>
              ACILITY
            </div>
            {/* --------------------------- */}
            {/* TODO: data */}


            {/* row-RPF-1 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <div className="w-1/3"><p className="pl-2"><b>Provider Name:</b></p></div>
                <div className="w-2/3"><input className="w-full" type="text" id="rpf1" value="Social Diversity LLC"></input></div>
              </div>

              <div className="flex w-1/2 text-black items-center border-black" style={{ fontSize: "14px" }}>

                <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>NPI#:</b></p>
                  1245863448
                </div>

                <div className="flex w-1/2 text-black items-center border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>TIN#:</b></p>
                  <input className="w-full pl-2" type="text" id="rpf1" value="832260545"></input>
                </div>

              </div>

            </div>

            {/* row-RPF-2 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-1/3 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Phone:</b></p>
                <input className="w-full pl-2" type="text" id="rpf1" value="786-975-7485"></input>
              </div>

              <div className="flex w-1/3 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>FAX:</b></p>
                <input className="w-full pl-2" type="text" id="rpf1" value="954-860-7166"></input>
              </div>

              <div className="flex w-1/3 text-black items-center border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Email:</b></p>
                <input className="w-full pl-2" type="text" id="rpf1" value="sunissupbm@gmail.com"></input>
              </div>

            </div>

            {/* row-RPF-3 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Address:</b></p>
                <input className="w-full pl-2" type="text" id="rpf1" value="12001 SW 128 CT Ste 101"></input>
              </div>

              <div className="flex w-1/2 text-black items-center border-black" style={{ fontSize: "14px" }}>

                <div className="flex w-2/3 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>City:</b></p>
                  <input className="w-full pl-2" type="text" id="rpf1" value="Miami"></input>
                </div>

                <div className="flex w-1/3 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>State:</b></p>
                  <input className="w-full pl-2" type="text" id="rpf1" value="FL"></input>
                </div>

                <div className="flex w-1/3 text-black items-center border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>Zip:</b></p>
                  <input className="w-full pl-2" type="text" id="rpf1" value="33186"></input>
                </div>

              </div>

            </div>

            {/* row-RPF-4 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-3/5 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>PCP Name:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="n/a"></input>
              </div>

              <div className="flex w-2/5 text-black items-center border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>PCP Phone:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="n/a"></input>
              </div>

            </div>

            {/* row-RPF-5 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-3/5 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Office Contact Name:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="Esel Aguilar"></input>
              </div>

              <div className="flex w-2/5 text-black items-center  border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Office Contact Phone:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="786-975-7485"></input>
              </div>

            </div>


            {/* --------------------------- */}
            <div
              className="flex pt-1 pb-1 pl-2 text-black items-center border-b border-black"
              style={{ backgroundColor: "#B6DDE8", fontSize: "18px" }}
            >
              <p style={{ position: "relative", top: "-2px", fontSize: "22px" }}>
                S
              </p>
              ERVICING
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                P
              </p>
              ROVIDER /
              <p
                className="pl-2"
                style={{ position: "relative", top: "-2px", fontSize: "22px" }}
              >
                F
              </p>
              ACILITY
            </div>
            {/* --------------------------- */}
            {/* --------------------------- */}
            {/* TODO: data */}

            {/* row-SPF-1 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-full text-black items-center border-black" style={{ fontSize: "14px" }}>
                <p className="pl-2"><b>Provider/Facility Name (Required):</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="Esel Aguilar"></input>
              </div>

            </div>


            {/* row-SPF-2 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>


              <div className="flex w-1/3">

                <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>NPI#:</b></p>
                  <input className="w-full pl-2" type="text" id="spf11" value="1174760458"></input>
                </div>

                <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                  <p className="pl-2"><b>TIN#:</b></p>
                  <input className="w-2/6 pl-2" type="text" id="spf12" value="n/a"></input>
                </div>

              </div>

              <div className="flex w-2/3">
                <div className="w-full flex">

                  <div className="flex w-2/3 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                    <p className="pl-2"><b>Medicaid ID# (If Non-Par):</b></p>
                    <input className="w-1/6 pl-2" type="text" id="spf1" value="n/a"></input>
                  </div>


                  <div className="w-1/3">
                    <div className="w-full flex">
                      <div className="flex w-1/2 text-black items-center border-black" style={{ fontSize: "14px" }}>
                        <input className="w-1/3" type="checkbox" id="spf2" value="33186"></input>
                        <p><b>Non-Par</b></p>
                      </div>

                      <div className="flex w-1/2 text-black items-center border-black" style={{ fontSize: "14px" }}>
                        <input className="mr-2" type="checkbox" id="spf3" value="33186"></input>
                        <p><b>COC</b></p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>


            {/* row-SPF-3 */}
            <div className="flex w-full text-black items-center border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-1/3 items-center border-b border-r border-black">
                <p className="pl-2"><b>Phone:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="786-975-7485"></input>

              </div>

              <div className="flex w-1/3 items-center border-b border-r border-black">
                <p className="pl-2"><b>FAX:</b></p>
                <input className="w-1/2 pl-2" type="text" id="rpf1" value="954-860-7166"></input>
              </div>

              <div className="flex w-1/3 items-center border-b border-black">
                <p className="pl-2"><b>Email:</b></p>
                <input className="w-full pl-2" type="text" id="rpf1" value="sunissupbm@gmail.com"></input>
              </div>
            </div>



            {/* row-SPF-4 */}

            <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>


              <div className="flex w-1/2 border-r border-black">

                {/* <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}> */}
                <p className="pl-2"><b>Address:</b></p>
                <input className="w-full pl-2" type="text" id="spf11" value="12001 SW 128 CT Ste 101"></input>
                {/* </div>                            */}

              </div>

              <div className="flex w-1/2">
                <div className="w-full flex">

                  <div className="flex w-1/2 text-black items-center border-r border-black" style={{ fontSize: "14px" }}>
                    <p className="pl-2"><b>City:</b></p>
                    <input className="w-full pl-2" type="text" id="spf14" value="Miami"></input>
                  </div>


                  <div className="w-1/2">
                    <div className="w-full flex">
                      <div className="flex w-1/2 text-black items-center border-r pl-2 border-black" style={{ fontSize: "14px" }}>
                        <p><b>State:</b></p>
                        <input className="w-1/3 pl-2" type="text" id="spf23" value="FL"></input>
                      </div>

                      <div className="flex w-1/2 text-black items-center pl-2 border-black" style={{ fontSize: "14px" }}>
                        <p><b>Zip:</b></p>
                        <input className="pl-2" type="text" id="spf3" value="33186"></input>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>

            {/* row-SPF-5 */}

            <div className="flex w-full text-black items-center border-r border-l border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-full text-black items-center  border-black" style={{ fontSize: "14px" }}>

                <div className="w-1/5">
                  <p className="pl-2 "><b>For Molina Use Only:</b></p>
                  {/* <input className="w-4/5 pl-2" type="text" id="rpf121" ></input> */}
                </div>
                <div className="w-4/5">
                  {/* <p className="pl-2 "><b>For Molina Use Only:</b></p> */}
                  <input className="w-full pl-2" type="text" id="rpf121" ></input>
                </div>

              </div>

            </div>

            <div className="flex w-full text-black items-center border-r border-l border-black" style={{ fontSize: "14px" }}>

              <div className="flex w-full text-black items-center border-b border-black" style={{ fontSize: "14px" }}>
                {/* <p className="pl-2 "><b>For Molina Use Only:</b></p> */}
                <input className="w-full pl-2" type="text" id="rpf122" ></input>
              </div>

            </div>

            <div className="flex w-full text-black items-center" style={{ fontSize: "12px" }}>


              <p className="text-center">
                Obtaining authorization does not guarantee payment. The plan retains the right to review benefit limitations and exclusions, beneficiary eligibility on the date of the
                service, correct coding, billing practices and whether the service was provided in the most appropriate and cost-effective setting of care.
              </p>

            </div>


            <div className="flex w-full pt-10">

              <div className="w-1/2 text-black"><p>Molina Healthcare, Inc.</p></div>

              <div className="w-1/2 text-right text-black">

                <div><p>2022 Medicaid PA Guide/Request Form</p></div>
                <div><p>Effective 6.1..2022</p></div>
              </div>


            </div>


            {/* --------------------------- */}
          </div>
        </div>
      </ContentObserver>
    </div>
  );
};
type Props = {
  scm: ServiceCM | undefined;
  onContentChange: (content: string) => void;
};
export { Molina };
