import { useRef } from 'react';
import { ContentObserver } from "../../commons/ContentObserver";
import { ServiceCM } from "../../../models";



const WellcareA = ({ scm, onContentChange }: Props) => {
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
  return (
    <div style={{ height: '80vh', 'overflow': 'auto' }}>
      <ContentObserver onContentChange={onContentChange}>
        <div id="content-to-pdf" ref={contentRef}>
          {/* Header */}
          <div className="w-full flex items-center">
            <div className="w-5/6 items-center">
              <b className="border-4 border-black p-2" style={{ fontSize: "18px" }}>Want faster service? Use our Provider Portal @ Provider.Wellcare.com</b>
            </div>
            <div className="w-1/6">
              <img
                src={`${apiUrlStatic}/static/media/wellcare-black.png`}
                alt="wellcare"
                className="rounded-xl" />
            </div>
          </div>
          {/* row 1 */}
          <div className="w-full items-center" style={{ position: "relative", top: "-40px" }}>
            <div className="w-full text-center">
              <b style={{ fontSize: "20px" }}>Outpatient Authorization Request Form</b>
              <br />
              <b style={{ fontSize: "18px" }}>*Indicates a required field</b>
            </div>
            <div className="w-full" style={{ fontSize: "18px" }}>
              <b>Requirements: </b>
              <i>Clinical information and supportive documentation should consist of current physician orders, notes
                and recent diagnostics. <b> Notification is required for any date-of-service change.</b></i>
              <br />
              <br />
              <b><i className="border-b border-black">Expedited Requests: </i></b>
              If the standard time for making a determination could seriously jeopardize the life and/or
              health of the member or the member's ability to regain maximum function, please call <b>1-855-538-0454</b>.
              <br />
              <br />
              <b>Please fax completed form to appropriate number at bottom of form.</b>
            </div>
          </div>
          {/* Row 2 */}
          <div className="w-full flex items-center">
            <div className="w-1/3">
              <b>Requestor</b>
            </div>
            <div className="w-1/3">
              <b>Fax*#:</b>
            </div>
            <div className="w-1/3">
              <b>Phone*#:</b>
            </div>
          </div>
          {/* Row 2 */}
          <div className="w-full flex items-center">
            <div className="w-1/3 flex pr-5">
              <b>Name:</b>
              <div className="w-full border-b border-black pr-2 text-center">SOCIAL DIVERSITY LLC</div>
            </div>
            <div className="w-1/3 pr-5">
              <div className="border-b border-black pr-2 text-center">(954)860-7166</div>
            </div>
            <div className="w-1/3">
              <div className="border-b border-black text-center">(786)975-7485</div>
            </div>
          </div>
          {/* Table */}
          <div className="w-full border border-black mt-2 items-center text-center text-white bg-black">
            <b>MEMBER INFO (Please Print)</b>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Wellcare ID*:</b>
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>Medicaid/Medicare ID: </b>{scm?.Demografic.medicaid} / {scm?.Demografic.medicare}
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/3 flex pl-2">
              <b>Last Name*: </b>{scm?.Demografic.last_name}
            </div>
            <div className="w-1/3 pr-5">
              <div className="border-l border-black pl-2">
                <b>First Name, MI*: </b>{scm?.Demografic.first_name}
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-l border-black pl-2">
                <b>Date of Birth*: </b>{scm?.Demografic.dob}
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>REQUESTING PROVIDER (Please Print)</b>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Wellcare ID: </b>N3077110
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>NPI/Tax ID*: </b>1245863448 / 832260545
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Provider Name*: </b>SOCIAL DIVERSITY LLC
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>Address: </b>12001 SW 128 CT SUITE 101
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/3 flex pl-2">
              <b>City, State, ZIP: </b>MIAMI FL,33186
            </div>
            <div className="w-1/3 pr-5">
              <div className="border-l border-black pl-2">
                <b>Fax*: </b>(954)860-7166
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-l border-black pl-2">
                <b>Phone: </b>(786)975-7485
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>SERVICING PROVIDER OR FACILITY (Please Print) </b>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Wellcare ID: </b>N3077110
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>NPI/Tax ID*: </b>1245863448 / 832260545
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Provider/Facility Name*: </b>SOCIAL DIVERSITY LLC
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>Address: </b>12001 SW 128 CT SUITE 101
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/3 flex pl-2">
              <b>City, State, ZIP: </b>MIAMI FL,33186
            </div>
            <div className="w-1/3 pr-5">
              <div className="border-l border-black pl-2">
                <b>Fax*: </b>(954)860-7166
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-l border-black pl-2">
                <b>Phone: </b>(786)975-7485
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>TREATING PROVIDER (Please Print) </b>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Wellcare ID: </b>N2819776
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>NPI/Tax ID*: </b>1174760458
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/2 flex pr-5">
              <div className="w-full pl-2">
                <b>Provider/Facility Name*: </b>ESEL AGUILAR
              </div>
            </div>
            <div className="w-1/2 pr-5">
              <div className="border-l border-black pl-2 ">
                <b>Address: </b>12001 SW 128 CT SUITE 101
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/3 flex pl-2">
              <b>City, State, ZIP: </b>MIAMI FL,33186
            </div>
            <div className="w-1/3 pr-5">
              <div className="border-l border-black pl-2">
                <b>Fax*:</b> (954)860-7166
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-l border-black pl-2">
                <b>Phone: </b>(786)975-7485
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>DIAGNOSIS CODES*</b>
          </div>
          {/* --- */}
          <div className="w-full flex items-center border border-t-0 border-black">
            <div className="w-1/4 flex pl-2">
              <b>ICD-10:</b>
            </div>
            <div className="w-1/4 pr-5">
              <div className="border-l border-black pl-2">
                <b>ICD-10:</b>
              </div>
            </div>
            <div className="w-1/4">
              <div className="border-l border-black pl-2">
                <b>ICD-10:</b>
              </div>
            </div>
            <div className="w-1/4">
              <div className="border-l border-black pl-2">
                <b>ICD-10:</b>
              </div>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>REQUESTED SERVICES</b>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center p-2">
            <div className="w-full flex">
              <div className="items-center align-middle">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Dialysis</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Office Visit/Procedure</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Radiation Therapy</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>MRI</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Sleep Study</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>X-Rays</b>
              </div>
              <div className="items-center align-middle ml-4">
                <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>CT Scan</b>
              </div>
            </div>
            <div className="w-full">
              <div className="items-center align-middle flex">
                <input type="checkbox" checked className="checkbox checkbox-xs mr-2" /><b>Other (please specify): </b>
                <div className="w-4/5 border-b border-black">Targeted case management services</div>
              </div>
            </div>
          </div>
          <div className="w-full border border-black p-2">
            <div className="w-full flex">
              <div className="w-1/4"><b>Place of Service (check one):</b></div>
              <div className="w-1/4">
                <div className="items-center align-middle flex">
                  <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Telehealth (02)</b>
                </div>
              </div>
              <div className="w-1/4">
                <div className="items-center align-middle flex">
                  <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Office (11)</b>
                </div>
              </div>
              <div className="w-1/4">
                <div className="items-center align-middle flex">
                  <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Outpatient Hospital (22)</b>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-1/4"></div>
              <div className="w-1/4">
                <div className="items-center align-middle flex">
                  <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Dialysis Center (65)</b>
                </div>
              </div>
              <div className="w-1/4">
                <div className="items-center align-middle flex">
                  <input type="checkbox" className="checkbox checkbox-xs mr-2" /><b>Lab (81)</b>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full border border-black p-2">
            <div className="w-full flex">
              <div><b>Anticipated Service Date*:</b></div>
              ____ / ____ / _____
            </div>
          </div>
          {/* ---- */}
          <div className="w-full border flex border-black items-center text-center text-white bg-black">
            <div className="w-1/4"><b>PROCEDURE CODE(S)*</b></div>
            <div className="w-1/4"><b>Description</b></div>
            <div className="w-1/4"><b>PROCEDURE CODE(S)*</b></div>
            <div className="w-1/4"><b>Description</b></div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/4 pl-2"><b>CPT Code:</b> T1017</div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
            <div className="w-1/4 pl-2 border-l border-black"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/4 pl-2"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
            <div className="w-1/4 pl-2 border-l border-black"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/4 pl-2"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
            <div className="w-1/4 pl-2 border-l border-black"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/4 pl-2"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
            <div className="w-1/4 pl-2 border-l border-black"><b>CPT Code:</b></div>
            <div className="w-1/4 pl-2 border-l border-black">&nbsp;</div>
          </div>

          {/* <div className="h-80"></div>
        <div className="h-80"></div> */}

          <div className="w-full flex mt-16">
            <div className="w-1/2">PRO_84650E Internal Approved 04082021<br />©Wellcare 2021</div>
            <div className="w-1/2 text-right">NA1PROFRM84650E_0000</div>
          </div>

          <br />


          {/* -------------------------- */}
          {/* Header */}
          <div className="w-full flex items-center">
            <div className="w-5/6 items-center">

            </div>
            <div className="w-1/6">
              <img
                src="https://api.sunissup.com/static/media/wellcare-black.png"
                alt="wellcare"
                className="rounded-xl" />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full" style={{ fontSize: "18px" }}>
              <b>Fax completed form to: </b>
            </div>
          </div>
          {/* --- */}
          <div className="w-full border border-black items-center text-center text-white bg-black">
            <b>Medicare Fax Lines </b>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/3 pl-2">Arizona Value (HMO) 855-754-8483</div>
            <div className="w-1/3 pl-2 border-l border-black">Arizona Patriot (PPO) 866-246-9832</div>
            <div className="w-1/3 pl-2 border-l border-black">Connecticut 866-455-6529</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/3 pl-2">Florida Medicare Only 877-892-8216</div>
            <div className="w-1/3 pl-2 border-l border-black">Georgia Medicare Only 877-892-8213</div>
            <div className="w-1/3 pl-2 border-l border-black">Florida/Georgia Dual 877-277-1820</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/3 pl-2">Illinois 877-899-2044</div>
            <div className="w-1/3 pl-2 border-l border-black">Kentucky 888-361-5684</div>
            <div className="w-1/3 pl-2 border-l border-black">New Jersey 877-892-8221</div>
          </div>
          {/* --- */}
          <div className="w-full border flex border-black items-center">
            <div className="w-1/3 pl-2">New York 877-892-8214</div>
            <div className="w-1/3 pl-2 border-l border-black">Texas 877-894-2034</div>
            <div className="w-1/3 pl-2 border-l border-black">All others 888-361-5684</div>
          </div>
          <div className="h-80"></div>
          <div className="h-80"></div>
          <div className="h-80"></div>

          <div className="w-full flex mt-10">
            <div className="w-1/2">PRO_84650E Internal Approved 04082021<br />©Wellcare 2021</div>
            <div className="w-1/2 text-right">NA1PROFRM84650E_0000</div>
          </div>
        </div>
      </ContentObserver>
    </div>
  );
}
type Props = {
  scm: ServiceCM | undefined;
  onContentChange: (content: string) => void;
}
export { WellcareA };