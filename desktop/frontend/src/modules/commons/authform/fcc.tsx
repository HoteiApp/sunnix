import { useRef } from 'react';
import { ServiceCM, DiagnosticTable } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";
const FCC = ({ scm, onContentChange }: Props) => {
    const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
    const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia

    return (

        <div style={{ height: "80vh", overflow: "auto" }}>
            <ContentObserver onContentChange={onContentChange}>
                <div id="content-to-pdf" ref={contentRef}>
                    <div className="pl-16 pr-16">
                        <div className="w-full flex border-b-2 pb-2 border-yellow-300">
                            <div className="w-1/2">
                                <img
                                    src={`${apiUrlStatic}/static/media/fcc.png`}
                                    alt="aetna"
                                    className="rounded-xl w-1/2"
                                />
                            </div>
                            <div className="w-1/2 text-right">
                                <b className="text-blue-400">Florida Community Care LLC</b>
                                <p>P.O. Box 261060</p>
                                <p>Miami, Florida 33126</p>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full text-center pt-5">
                            <b>Florida Community Care Prior Authorization Form</b>
                            <p>(FAX to 305-675-6138)</p>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full flex pt-2">
                            <input type="checkbox" className="mr-2 w-10" />
                            <p>Standard</p>
                        </div>
                        <div className="w-full pt-4">
                            <div className="flex w-full">
                                <input type="checkbox" className="w-10" />
                                <p className="text-justify">Expedited* (By checking this option, I certify that applying the standard 72 hrs. review time frame</p>
                            </div>

                            <p>may seriously jeopardize the life of health of the patient or the patient`s ability to regain maximum function.)</p>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-5">
                            Please complete <b>all sections</b> legibly.
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-5 flex">
                            <p>Date of Request:</p>
                            <div className="w-1/5 border-b border-black"></div>
                        </div>
                        {/* --------------------- */}
                        <div className="mt-2">
                            <b>MEMBER INFORMATION</b>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Name:</p>
                                <div className="w-full mr-16 border-b border-black pl-2">{scm?.Demografic.first_name} {scm?.Demografic.last_name}</div>
                            </div>
                            <div className="w-1/2 flex">
                                <div className="flex"><p className="pr-2">ID</p><p>Number:</p></div>
                                <div className="w-full border-b border-black"></div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p className="mr-2">Date of Birth:</p>
                                <div className="border-b border-black">{scm?.Demografic.dob}</div>
                            </div>
                            <div className="w-1/2 flex">
                                <p className="flex"><p className="pr-2">PCP</p><p>Name:</p></p>
                                <div className="w-full border-b border-black">{scm?.medical.medical_pcp}</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <div className="flex">
                                    <p className="pr-2">Other</p>
                                    <p>Insurance:</p>
                                </div>
                                <div className="w-full mr-16 border-b border-black pl-2"></div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Gender:</p>
                                <div className="pl-2 border-b border-black">{scm?.Demografic.sexo}</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="mt-5">
                            <b>REFERRING PHYSICIAN OR PROVIDER INFORMATION</b>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Referring Provider/Requesting Provider</p>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Performing Provider/Facility</p>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Name:</p>
                                <div className="w-full mr-16 border-b border-black pl-2">N/A</div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Name:</p>
                                <div className="pl-2 border-b border-black w-full">SOCIAL DIVERSITY LLC</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Address:</p>
                                <div className="border-b border-black pl-2 w-full mr-16"></div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Address:</p>
                                <div className="pl-2 border-b border-black w-full">12001 SW 128 CT</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <div className="w-full border-b border-black pl-2 mr-16"></div>
                            </div>
                            <div className="w-1/2">
                                <div className="w-full border-b border-black pl-2">STE 101 MIAMI FL 33186</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Phone:</p>
                                <div className="border-b border-black pl-2 w-full mr-16"></div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Phone:</p>
                                <div className="pl-2 border-b border-black w-full">786-975-7485</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <p>Fax:</p>
                                <div className="border-b border-black pl-2 w-full mr-16"></div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Fax:</p>
                                <div className="pl-2 border-b border-black w-full">954-860-7166</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full mt-3 flex">
                            <div className="w-1/2 flex">
                                <div className="flex">
                                    <p className="pr-2">Contact</p>
                                    <p>Person:</p>
                                </div>
                                <div className="w-full mr-16 border-b border-black pl-2"></div>
                            </div>
                            <div className="w-1/2 flex">
                                <p>Specialty:</p>
                                <div className="pl-2 border-b border-black">BEHAVIORAL HEALTH</div>
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-4 flex">
                            <p>Signature of Requesting Physician:</p>
                            <div className="w-2/5 border-b border-black"></div>
                        </div>
                        {/* --------------------- */}
                        <div className="mt-5">
                            <b>REFERRAL/AUTHORIZATION INFORMATION</b>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-4 flex">
                            <div className="flex">
                                <p className="pr-1">Diagnosis</p>
                                <p className="pr-1">Code</p>
                                <p className="pr-1">&</p>
                                <p>Description:</p>
                            </div>
                            <div className="w-full border-b pl-2 border-black">
                                {scm?.Mental.mental_primary} - {DiagnosticTable[scm?.Mental.mental_primary ?? "N/A"]}
                            </div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-3 flex">
                            <div className="flex">
                                <p>CPT/</p>
                                <p className="pr-1">HCPCS</p>
                                <p className="pr-1">Code</p>
                                <p className="pr-1">&</p>
                                <p>Description:</p>
                            </div>
                            <div className="w-full border-b border-black">T1017</div>
                        </div>
                        {/* --------------------- */}
                        <div className="w-full pt-3 flex">
                            <div className="w-1/3 flex">
                                <div className="flex">
                                    <p className="pr-1">Date</p>
                                    <p className="pr-1">of</p>
                                    <p>Service:</p>
                                </div>
                                <div className="w-full border-b border-black"></div>
                            </div>
                            <div className="w-1/3 flex pl-2">
                                <div className="flex">
                                    <p className="pr-1">Number</p>
                                    <p className="pr-1">of</p>
                                    <p className="pr-1">Visits</p>
                                    <p>Requested:</p>
                                </div>
                                <div className="w-full border-b border-black"></div>
                            </div>
                            <div className="w-1/3 flex">
                                <div className="flex">
                                    <p className="pr-1">Type</p>
                                    <p className="pr-1">of</p>
                                    <p>Procedure:</p>
                                </div>
                                <div className="w-full border-b border-black pl-4">
                                    Outpatier
                                </div>
                            </div>
                        </div>
                        {/* ----------------- */}
                        <div className="w-full pt-3 flex">
                            <div className="w-3/5">
                                Other Clinical Information (Include clinical notes, labs, radiology reports, etc.):
                            </div>
                            <div className="w-2/5 border-b border-black"></div>
                        </div>
                        {/* ----------------- */}
                        <div className="w-full border-b border-black pt-8"></div>
                        {/* ----------------- */}
                        <div className="w-full border-b border-black pt-8"></div>
                        {/* ----------------- */}
                        <div className="w-full border-b border-black pt-8"></div>
                        {/* ----------------- */}
                        <div className="w-full border-b border-black pt-8"></div>
                        {/* ----------------- */}
                        <div className="w-full pt-10">
                            <b className="text-justify" >
                                If this is a request for reauthorization of a previously approved requested, please provide recent clinical
                                documentation. Please Note: Failure to include correct procedure codes or diagnosis codes may result in a
                                delay in processing the service authorization request.
                            </b>
                        </div>
                        {/* ----------------- */}
                        <div className="text-right pt-10">
                            Last Updated: 11/13/2018
                        </div>
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
export { FCC };