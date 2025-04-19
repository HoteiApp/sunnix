import { Block } from '../component/block';
import { Active, Client, ServiceCM, Sure } from "../../../models";
import { confirmDialog } from "primereact/confirmdialog";
import { ContentObserver } from "../../commons/ContentObserver";

type Props = {
  scm: ServiceCM | undefined;
  mr: number;
  relad(): void;
  client?: Client;
  active?: Active;
  sure?: Sure;
  onContentChange: (content: string) => void;
};


const TmpConsent = ({ scm, onContentChange }: Props) => {

  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";

  return (
    <Block active={false}>
      <ContentObserver onContentChange={onContentChange}>
        <div className="w-full" id="pdfContent">

          <div className="flex w-full p-0">
            <div className="w-2/5 flex justify-end items-center">
              <img
                src={`${apiUrlStatic}/static/media/logo.png`}
                alt="logo"
                className="rounded-xl"
                width={150}
              />
            </div>
            <div className="w-2/5 text-center">
              <p>
                <b className="border-b border-black" style={{ fontSize: "22px", fontWeight: "bold" }}>OUTPATIENT DEPARTMENT</b>
              </p>
              <p>12001 SW 128 CT SUITE 101 MIAMI FL 33186</p>
              <p>Phone/Fax: (786)975-7485/(954)860-7166</p>
            </div>
          </div>

          <div className="text-center mt-5">
            <p>
              <b className="border-b border-black" style={{ fontSize: "18px", fontWeight: "bold" }}>
                CLIENT CONSENT FOR RELEASE OF CONFIDENTIAL INFORMATION
              </b>
            </p>
          </div>

          <div className="flex w-full border border-black mt-2">
            <div className="w-5/12 border-r border-black text-center">{scm?.Demografic.first_name} {scm?.Demografic.last_name}</div>
            <div className="w-2/12 border-r border-black text-center">{scm?.Demografic.dob}</div>
            <div className="w-3/12 border-r border-black text-center">{scm?.Demografic.ss}</div>
            <div className="w-2/12 text-center">{scm?.Demografic.client_id}</div>
          </div>
          <div className="flex w-full border-l border-r border-b border-black">
            <div className="w-5/12 border-r border-black"><p className="text-center" style={{ background: "#bebebe" }}><b>Client’s Name</b></p></div>
            <div className="w-2/12 border-r border-black"><p className="text-center" style={{ background: "#bebebe" }}><b>DOB</b></p></div>
            <div className="w-3/12 border-r border-black"><p className="text-center" style={{ background: "#bebebe" }}><b>Social Security #</b></p></div>
            <div className="w-2/12"><p className="text-center" style={{ background: "#bebebe" }}><b>MR.#</b></p></div>
          </div>

          <div className="w-full mt-2">
            <p>
              I understand that my records are protected under the federal regulations contained in the Health Insurance
              Portability and Accountability Act of 1996 (HIPAA), Public Law 104-191. Florida law requires that information
              contained in medical/mental health records be held in strict confidence and not be released without my written
              authorization. I understand that I will not be denied services based on refusal to allow for confidential
              information to be released.
            </p>
          </div>

          <div className="w-full mt-3">
            <div className="w-full">
              I, <b className="ml-2 mr-2 border-b border-black">{scm?.Demografic.first_name} {scm?.Demografic.last_name}</b>
              do hereby authorize SUNISS UP located at 12001 SW 128 CT S-101 Miami,
              <br />
              <div className="w-full flex">
                FL 33186 to:

                <input className="mr-2" type="checkbox" defaultChecked /><p className="mr-2">Request</p>
                <input className="mr-2" type="checkbox" defaultChecked />
                <p className="mr-1">Release</p>
                <p>information from any program via fax, mail, electronically or personally as required while providing services on my behalf:</p>
              </div>
            </div>
          </div>

          <div className="flex w-full mt-3">
            <div className="w-1/4 border border-black text-center" style={{ background: "#c4bc96" }}><p><b>Program/Provider</b></p></div>
            <div className="w-1/4 border-t border-b border-r border-black text-center" style={{ background: "#c4bc96" }}><p><b>Select</b></p></div>
            <div className="flex w-1/4 border-t border-b border-r border-black" style={{ background: "#c4bc96" }}>
              <div className="w-2/12"></div>
              <div className="w-10/12 border-l border-black text-center" ><p><b>Program/Provider</b></p></div>
            </div>
            <div className="w-1/4 border-t border-b border-r border-black text-center" style={{ background: "#c4bc96" }}><p><b>Select</b></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Psychiatrist Services</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Housing Programs</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Psychotherapist Services</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Legal Services</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">DCF</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">School System</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">LIHEAP</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">AHCA</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Transportation</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Medical Insurance</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Food/Clothes/Toys</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Phone Services</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">PCP</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Donations Programs</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Social Security Administration</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Emergency Contact:</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Other Medical Specialists/Dentist</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Other:</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r"><p className="pl-2">Law Enforcement/Police</p></div>
            <div className="w-1/4 border-b border-r border-black text-center"><input className="w-full text-center" type="text" /></div>
            <div className="flex w-1/4 border-b border-r border-black">
              <div className="w-2/12" style={{ background: "#c4bc96" }}></div>
              <div className="w-10/12 border-l border-black" ><p className="pl-2">Other:</p></div>
            </div>
            <div className="w-1/4 border-b border-r border-black text-center"><p><input className="w-full text-center" type="text" /></p></div>
          </div>

          <div className="flex w-full mt-3">
            <p className="pr-2"><b>For the purpose(s) of:</b></p>
            <p>FOLLOW UP AND MANAGEMENT OF THE CASE AS REQUIRED BY CLIENT/FAMILY.</p>
          </div>

          <div className="w-full mt-3">
            <p><b>Signatures:</b></p>
          </div>

          <div className="flex w-full mt-1">
            <div className="w-1/4 border-black border text-center"><p><b>PERSON</b></p></div>
            <div className="w-1/4 border-black border-b border-r border-t text-center"><p><b>PERSON'S NAME</b></p></div>
            <div className="w-1/4 border-black border-b border-r border-t text-center"><p><b>SIGNATURE</b></p></div>
            <div className="w-1/4 border-black border-b border-r border-t text-center"><p><b>DATE</b></p></div>
          </div>
          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r text-center place-items-center">
              <div className="flex items-end justify-center ">
                <div className='text-center flex flex-col justify-end'>
                  Client
                </div>
              </div>
            </div>
            <div className="w-1/4 border-black border-b border-r text-center place-items-center">
              <div className="flex items-end justify-center">
                <div className='text-center flex flex-col justify-end'>
                  {scm?.Demografic.first_name} {scm?.Demografic.last_name}
                </div>
              </div>
            </div>
            <div className="w-1/4 border-black border-b border-r text-center">
              {scm?.Demografic.sign_client !== "" &&
                <div className="flex items-center justify-center">
                  <div className='text-center' style={{ position: "relative", rotate: "-5deg" }}>
                    <img src={scm?.Demografic.sign_client} width={70} alt='sing' />
                  </div>
                </div>
              }
            </div>
            <div className="w-1/4 border-black border-b border-r text-center">
              <div className="flex items-end justify-center ">
                <div className='text-center flex flex-col justify-end'>
                  {scm?.doa}
                </div>
              </div>
            </div>
          </div>
          {scm?.Demografic.legal_guardian !== "" &&
            < div className="flex w-full">
              <div className="w-1/4 border-black border-l border-b border-r text-center">
                <p>
                  Legal Guardian/Relationship
                  <br />
                  (if applicable)
                </p>
              </div>
              <div className="w-1/4 border-black border-b border-r text-center">
                {scm?.Demografic.legal_guardian}
              </div>
              <div className="w-1/4 border-black border-b border-r text-center">
                {scm?.Demografic.sign_guardian !== "" &&
                  <div className="w-full flex text-center">
                    <img src={scm?.Demografic.sign_guardian} width={150} alt='sing' style={{ position: "relative", rotate: "-5deg" }} />
                  </div>
                }
              </div>
              <div className="w-1/4 border-black border-b border-r text-center"><input className="w-full text-center" type="text" /></div>
            </div>
          }
          <div className="flex w-full">
            <div className="w-1/4 border-black border-l border-b border-r place-items-center">
              <div className="flex items-end justify-center">
                <div className='text-center flex flex-col justify-end'>
                  <p>Witness</p>
                </div>
              </div>
            </div>
            <div className="w-1/4 border-black border-b border-r place-items-center">
              <div className="flex items-end justify-center">
                <div className='text-center flex flex-col justify-end'>
                  <p>Esel Aguilar</p>
                </div>
              </div>
            </div>

            <div className="w-1/4 border-black border-b border-r text-center">
              {/* firma aqui */}
              {/* <img src={scm?.Demografic.sign_client} width={150} alt='sing' /> */}
            </div>
            <div className="w-1/4 border-black border-b border-r place-items-center">
              <div className="flex items-end justify-center">
                <div className='text-center flex flex-col justify-end'>
                  {scm?.doa}
                </div>
              </div>
            </div>
          </div>

          {/* linea negra */}
          <div className="w-full mt-8 pt-1 bg-black"></div>

          <div className="flex w-full mt-2 place-items-center">
            <div className="flex items-center justify-center">
              <div className="mr-2"><p>THIS CONSENT WILL TERMINATE UPON 6 MONTHS FROM AUTHORIZATION DATE:</p></div>
              <div className='text-center border p-2 border-black flex flex-col justify-center'>
                {scm?.doa}
              </div>
            </div>
          </div>

          <div className="w-full border-black border-t mt-10">
            <p style={{ fontSize: "12px" }} className="text-justify">
              The information has been disclosed to you from records protected by federal confidentiality rules (42 CFR PART 2). The federal rules prohibit you from making any further disclosure of this information
              unless is expressly permitted by the written consent of the person to whom it pertains or as otherwise permitted by 42 CFR part 2. A general authorization for the release of medical or other information is
              NOT enough for this purpose. The Federal rules restrict any use of the information to criminally investigate or prosecute any alcohol or drug abuse patient.
            </p>
          </div>

          <div className="flex w-full mt-16">
            <div className="w-1/3 text-start"><p>SUNISS UP</p></div>
            <div className="w-1/3 text-center"><p>Release/Consent Form</p></div>
            <div className="w-1/3 text-end"><p>Revised 10/2024</p></div>
          </div>

        </div>
      </ContentObserver>
    </Block >
  )
}


export { TmpConsent };
