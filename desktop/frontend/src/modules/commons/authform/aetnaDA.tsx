import { useRef } from 'react';
import { ServiceCM } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";
const AetnaDA = ({ scm, onContentChange }: Props) => {
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
  return (
    <div style={{ height: "75vh", overflow: "auto" }} className="container">
      <ContentObserver onContentChange={onContentChange}>
        <div id="content-to-pdf" ref={contentRef} className="p-5">
          <div className="w-full flex p-5">
            <div className="w-72">
              <img
                src={`${apiUrlStatic}/static/media/aetnada.png`}
                alt="aetna"
                className="rounded-xl"
              />
            </div>
            <div className="w-2/3 items-center pl-8  ml-[64px] mt-4">
              <b style={{ fontSize: "22px" }}>
                Florida D-SNP — Community Behavioral Health and Targeted Case
                Management (Medicaid Primary Services)
              </b>
            </div>
          </div>
          <div className="mt-4 px-8">
            <p style={{ fontSize: "16px" }}>
              <b>This form should not be used to initiate a new precert.</b>{" "}
              Please call the number on the member’s ID card or use Availity. If
              you use Availity, you can upload/attach this form and any supporting
              documents.
            </p>
            <p style={{ fontSize: "16px" }} className="mt-4">
              Once you have a pending reference number, you can fax this form and
              supporting documents to <b>959-282-8799.</b> Attn: Medicare
              Behavioral Health Precert, FL D-SNP
            </p>
          </div>
          <div className="mt-8 px-8">
            <b style={{ fontSize: "18px" }}>
              Section 1: Member and servicing provider information
            </b>
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/2 border-l border-black pl-1">Member name:</div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>Member telephone number:</p>
              </div>
            </div>
            <div className="w-full border-b border-l border-r border-black">
              <p className="pl-1">
                Does member have full Medicaid coverage (if no, please complete
                section 1 and 2 only):
              </p>
              <div className="pl-1 text-2xl">
                <input type="checkbox" id="medicaid" value="medicaid"></input>
                <input type="checkbox" id="medicaid" value="medicaid"></input>
              </div>
            </div>
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/2 border-l border-black pl-1">Member ID:</div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>Member DOB:</p>
              </div>
            </div>
            <div className="flex w-full border-b border-l border-r border-black">
              <p className="pl-1">Servicing provider group name, NPI and TIN:</p>
              <p>
                <b>SOCIAL DIVERSITY LLC - NPI: 1245863448 - TIN: 832260545</b>
              </p>
            </div>
            <div className="flex w-full border-b border-l border-r border-black">
              <p className="pl-1">Servicing provider group address:</p>
              <p>
                <b>12001 SW 128 CT STE 101 MIAMI FL 33186</b>
              </p>
            </div>
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/2 border-l border-black pl-1">
                <p>Servicing provider telephone number:</p>
                <p>
                  <b>786-975-7485</b>
                </p>
              </div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>Contact person name:</p>
                <p>
                  <b>ESEL AGUILAR</b>
                </p>
              </div>
            </div>
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/2 border-l border-black pl-1">
                <p>Servicing provider fax number:</p>
                <p>
                  <b>954-860-7166</b>
                </p>
              </div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>Servicing provider status:</p>
                <div className="flex w-full">
                  <div className="w-1/2">
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                  </div>
                  <div className="w-1/2">
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full border-b border-l border-t border-black">
              <div className="w-1/2 pl-1 mb-20">
                <p>
                  If provider group is not participating with Aetna®, list names
                  of participating provider(s) you attempted to place member with:
                </p>
                <p>
                  <b>N/A</b>
                </p>
              </div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>
                  Treating/supervising provider name(s), role in agency and
                  credentials:
                </p>
                <p>
                  <b>ESEL AGUILAR-CBHCMS</b>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 px-8">
            <b style={{ fontSize: "18px" }}>
              Section 2: Ordering provider information
            </b>
            <div className="flex w-full border-b border-t border-black">
              <div className="w-1/2 border-l border-black pl-1">
                <p>Ordering/referring provider name:</p>
                <p>
                  <b>Social Diversity LLC</b>
                </p>
              </div>
              <div className="w-1/2 border-l border-r border-black pl-1 pb-4">
                <p>Ordering/referring provider phone number:</p>
                <p>
                  <b>786-975-7485</b>
                </p>
              </div>
            </div>
            <div className="flex w-full border border-black">
              <p>Ordering/referring provider NPI:</p>
              <p>
                <b>1245863448</b>
              </p>
            </div>
            <div className="flex w-full">
              <div className="w-1/3">
                <p>GR-69706 (3-24)</p>
              </div>
              <div className="w-1/3">
                <p>Page 1 of 3</p>
              </div>
              <div className="w-1/3">
                <p>R-POD</p>
              </div>
            </div>
          </div>
          <div className="mt-8 px-8">
            <b style={{ fontSize: "18px" }}>Section 3: Services requested</b>
            <div className="w-full border border-black pl-2">
              <p>What type of review are you requesting?</p>
              <div className="flex w-full">
                <div className="w-2/2">
                  <input type="checkbox" id="medicaid" value="medicaid"></input>
                </div>
                <div className="w-2/2 pl-2">
                  <p>
                    Initial 1-month assessment for services/member has not been
                    seen yet.
                  </p>
                </div>
              </div>
              <ul className="pl-6 list-disc">
                <li>
                  Please fill out requested units below, sign Section 5 and submit
                  form.<b>Section 4 is not required.</b>
                </li>
              </ul>
              <div className="flex w-full">
                <div className="w-2/2">
                  <input type="checkbox" id="medicaid" value="medicaid"></input>
                </div>
                <div className="w-2/2 pl-2">
                  <p>
                    Initial 3-month course of treatment. Please fill out complete
                    form and attach the following information:
                  </p>
                </div>
              </div>
              <ul className="pl-6 list-disc">
                <li>
                  For TCM, please attach the Adult Certification, Adult Mental
                  Health Targeted Case Management form
                </li>
                <li>
                  Treatment plan with specific targeted behaviors with measurable
                  goals and discharge planning
                </li>
                <li>Copy of assessment</li>
              </ul>
              <div className="flex w-full">
                <div className="w-2/2">
                  <input type="checkbox" id="medicaid" value="medicaid"></input>
                </div>
                <div className="w-2/2 pl-2">
                  <p>
                    Request for additional service after 3-month course of
                    treatment. Please fill out the complete form and attach the
                    following information:
                  </p>
                </div>
              </div>
              <ul className="pl-6 list-disc">
                <li>Progress notes demonstrating progress toward goals</li>
                <li>
                  Treatment plan with specific targeted behaviors with measurable
                  goals and discharge planning
                </li>
              </ul>
              <b>
                NOTE: IF YOU ARE REQUESTING A CONTINUATION OF CARE FOR SERVICES
                OTHER THAN THE CODES LISTED BELOW, PLEASE LIST THEM HERE. SECTION
                4 IS NOT REQUIRED.
              </b>
            </div>
            <div className="flex w-full border border-black pl-2">
              <div className="w-1/2">
                <p>Service start date:</p>
              </div>
              <div className="w-1/2 border-l border-black pl-1">
                <p className="mb-4">Projected service end date:</p>
              </div>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <p className="mb-4">When was assessment completed?</p>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <p>Requested codes and quantity/number of units:</p>
              <div className="flex w-full">
                <div className="w-1/3">
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    H2017
                  </div>
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    H2019 (HO)
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    T1017
                  </div>
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    H2019 (HM)
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    H2030
                  </div>
                  <div>
                    <input type="checkbox" id="medicaid" value="medicaid"></input>
                    H2019 (HN)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 px-8">
            <b style={{ fontSize: "18px" }}>Section 4: Clinical information</b>
            <div className="flex w-full border-x border-t  border-black pl-1">
              <b style={{ fontSize: "16px" }}>Member’s current diagnosis(es)</b>
            </div>
            <div className="flex w-full border border-black">
              <div className="w-2/5 pl-1">
                <p>Diagnosis code/name:</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>Date given:</p>
              </div>
              <div className="w-2/5 border-l border-black pl-1">
                <p>Diagnosis made by:</p>
              </div>
            </div>

            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="w-full pl-1 border-x border-b border-black">
              <b style={{ fontSize: "16px" }}>Current medications</b>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1">
                <p>Name of medication:</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>Dose:</p>
              </div>
              <div className="w-2/5 border-l border-black pl-1">
                <p>Start date:</p>
              </div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="flex w-full border-x border-b border-black">
              <div className="w-2/5 pl-1 mt-2"></div>
              <div className="w-1/4 border-l border-black pl-1"></div>
              <div className="w-2/5 h-6 border-l border-black pl-1"></div>
            </div>
            <div className="w-full pl-1 border-x border-b border-black">
              <div>
                <p className="pl-1">
                  Is member currently a resident/patient at a residential
                  treatment facility, group home or shelter?
                </p>
              </div>
              <div className="gap-2">
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                Yes
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                No
              </div>
              <div className="mb-6 pl-1">
                <p>If yes, note the name and projected discharge date:</p>
              </div>
            </div>
            <div className="flex w-full border-x border-b border-black pl-1">
              <div>
                <p>
                  Is member currently receiving services via Florida Assertive
                  Community Treatment (FACT)?
                </p>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                Yes
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                No
              </div>
            </div>
            <div>
              <p className="text-end">Continued</p>
            </div>
            <div className="flex w-full mt-10">
              <div className="w-1/3">
                <p>GR-69706 (3-24)</p>
              </div>
              <div className="w-1/3">
                <p>Page 2 of 3</p>
              </div>
            </div>
          </div>
          <div className="mt-8 px-8">
            <p style={{ fontSize: "18px" }}>
              <b>Section 4: Clinical information</b> (continued)
            </p>
            <div className="w-full border border-black pl-1">
              <p>Other services used in last 12 months:</p>
            </div>
            <div className="flex w-full h-6 border-x border-b border-black pl-1">
              <div className="w-1/4">
                <p>Level of care</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>Name of provider</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>Start date</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>End date</p>
              </div>
              <div className="w-1/4 border-l border-black pl-1">
                <p>Outcome</p>
              </div>
            </div>
            <div className="flex w-full h-8 border-x border-b border-black pl-1">
              <div className="w-1/4">
                <b>N/A</b>
              </div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
            </div>
            <div className="flex w-full h-8 border-x border-b border-black pl-1">
              <div className="w-1/4"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
            </div>
            <div className="flex w-full h-8 border-x border-b border-black pl-1">
              <div className="w-1/4"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
            </div>
            <div className="flex w-full h-8 border-x border-b border-black pl-1">
              <div className="w-1/4"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
              <div className="w-1/4 border-l border-black"></div>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <div>
                <p>
                  For TCM only: What is the size of the case manager’s caseload?
                </p>
              </div>
              <div>
                <b>TOTAL OF AETNA CASES ONLY</b>
              </div>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <div>
                <p>
                  For Psychosocial Rehabilitation only: What are the size of the
                  group sessions?
                </p>
              </div>
              <div>
                <b>N/A</b>
              </div>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <div>
                <p>
                  For Clubhouse Services only: What is the number of participants
                  per staff member?
                </p>
              </div>
              <div>
                <b>N/A</b>
              </div>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <p>
                Based on current assessment, is member able to adequately
                participate and respond to proposed <br /> treatment?
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                Yes
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                No
              </p>
            </div>
            <div className="w-full border-x border-b border-black pl-1">
              <p>
                Based on current assessment, is the member an imminent danger to
                self or others?
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                Yes
                <input
                  type="checkbox"
                  id="medicaid"
                  value="medicaid"
                  className="mx-2"
                ></input>
                No
              </p>
            </div>
          </div>
          <div className="mt-4 px-8">
            <b style={{ fontSize: "18px" }}>Section 5: Attestation</b>
            <div className="flex w-full h-16 border border-black pl-1">
              <div className="w-3/5">
                <p>Printed name of provider/clinician:</p>
                <b>ESEL AGUILAR</b>
              </div>
              <div className="w-2/5 border-l border-black pl-1">
                <p>Date:</p>
              </div>
            </div>
            <div className="w-full h-16 border-b border-l border-r border-black pl-1">
              <p>Signature of provider/clinician:</p>
            </div>
          </div>
          <div className="mt-4 px-8">
            <p>
              See Evidence of Coverage for a complete description of plan
              benefits, exclusions, limitations and conditions of coverage. Plan
              features and availability may vary by service area.
            </p>
            <p className="mt-4">
              Participating health care providers are independent contractors and
              are neither agents nor employees of Aetna. The availability of any
              particular provider cannot be guaranteed, and provider network
              composition is subject to change
            </p>
            <p className="mt-4">
              Out-of-network/non-contracted providers are under no obligation to
              treat plan members, except in emergency situations. Please call our
              customer service number or see your Evidence of Coverage for more
              information, including the cost-sharing that applies to
              out-of-network services.
            </p>
            <p className="mt-4 text-base">
              This material is for informational purposes only and is not medical
              advice. Health information programs provide general health
              information and are not a substitute for diagnosis or treatment by a
              physician or other health care professional. Contact a health care
              professional with any questions or concerns about specific health
              care needs. Providers are independent contractors and are not agents
              of Aetna. Provider participation may change without notice. Aetna is
              not a provider of health care services and, therefore, cannot
              guarantee any results or outcomes. The availability of any
              particular provider cannot be guaranteed and is subject to change.
              Information is believed to be accurate as of the production date;
              however, it is subject to change. For more information about Aetna
              plans, refer to our website.
            </p>
            <p className="mt-4 text-md">Y0001_NR_4051_2024_C</p>
            <div className="flex w-full mt-10">
              <div className="w-1/3">
                <p>GR-69706 (3-24)</p>
              </div>
              <div className="w-1/3">
                <p>Page 3 of 3</p>
              </div>
            </div>
          </div>
        </div>
      </ContentObserver>
    </div>
  );
};
type Props = {
  scm: ServiceCM | undefined;
  onContentChange: (content: string) => void;
}
export { AetnaDA };
