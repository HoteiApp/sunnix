import { useRef } from 'react';
import { ServiceCM, DiagnosticTable } from "../../../models";
import { ContentObserver } from "../../commons/ContentObserver";
const Carelon = ({ scm, onContentChange }: Props) => {
    const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
    const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia

    return (
        <div style={{ height: "80vh", overflow: "auto" }}>
            <ContentObserver onContentChange={onContentChange}>
                <div id="content-to-pdf" ref={contentRef}>
                    <div className="pl-16 pr-16">
                        <div className="w-full flex">
                            <div className="w-1/3 text-right pl-16">
                                <img
                                    src={`${apiUrlStatic}/static/media/logo.png`}
                                    alt="sunissup"
                                    className="rounded-xl w-2/3 text-right"
                                />
                            </div>
                            <div className="w-2/3 text-center">
                                <div className="w-full pr-10">
                                    <p className="text-blue-950"><b style={{ fontSize: "24px" }}>SUNISS UP</b></p>
                                    <p className="pt-1">Outpatient Department</p>
                                    <p>12001 SW 128 CT STE 101 MIAMI FL 386 </p>
                                    <p>Phone: 786-348-2496 Fax: 954-860-7166 </p>
                                    <p className="pt-6"><b style={{ fontSize: "24px" }}><i>CARELON INTERNAL AUTH FORM</i></b></p>
                                </div>
                            </div>
                        </div>
                        {/* ------------------- */}
                        <div className="w-full border border-black">
                            <div className="w-full flex">
                                <div className="w-1/2 flex">
                                    <div className="w-1/2 border-r border-black text-center">{scm?.Demografic.first_name} {scm?.Demografic.last_name}</div>
                                    <div className="w-1/2 border-r border-black text-center">{scm?.Demografic.medicaid}</div>
                                </div>
                                <div className="w-1/2 flex">
                                    <div className="w-1/3 text-center border-r border-black">{scm?.Demografic.dob}</div>
                                    <div className="w-1/3 text-center border-r border-black flex pl-2">
                                        1 <input type="checkbox" className="mr-2 ml-1" />
                                        2 <input type="checkbox" className="mr-2 ml-1" />
                                        3 <input type="checkbox" className="mr-2 ml-1" />
                                    </div>
                                    <div className="w-1/3 text-center">{scm?.doa}</div>
                                </div>
                            </div>
                            {/* ------------ */}
                            <div className="w-full flex bg-blue-300 border-t border-black">
                                <div className="w-1/2 flex">
                                    <div className="w-1/2 border-r border-black text-center">
                                        Client’s Name and Last
                                    </div>
                                    <div className="w-1/2 border-r border-black text-center">
                                        Medicaid # or Medicaid Card
                                    </div>
                                </div>
                                <div className="w-1/2 flex">
                                    <div className="w-1/3 text-center border-r border-black">
                                        DOB
                                    </div>
                                    <div className="w-1/3 text-center border-r border-black">
                                        AUTH #
                                    </div>
                                    <div className="w-1/3 text-center">
                                        Date
                                    </div>
                                </div>
                            </div>
                            {/* ------------ */}
                            <div className="w-full flex border-t border-black">
                                <div className="w-2/5 border-r border-black text-center">
                                    {scm?.medical.medical_pcp}
                                </div>
                                <div className="w-3/5 text-center">
                                    {DiagnosticTable[scm?.Mental.mental_primary ?? "N/A"]}
                                </div>
                            </div>
                            {/* ------------ */}
                            <div className="w-full flex bg-blue-300 border-t border-black">
                                <div className="w-2/5 border-r border-black text-center">
                                    Dr. Psych or PCP
                                </div>
                                <div className="w-3/5 text-center">
                                    Mental Diagnosis
                                </div>
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black p-3 bg-orange-200">

                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black pl-2 bg-blue-300">
                                Medical Diagnosis: Only if you have the codes
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t flex border-black pl-2">
                                1- <input className="w-full pl-2" type="text" />
                            </div>
                            <div className="w-full flex border-t border-black pl-2">
                                2- <input className="w-full pl-2" type="text" />
                            </div>
                            <div className="w-full flex border-t border-black pl-2">
                                3- <input className="w-full pl-2" type="text" />
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black pl-2 bg-blue-300">
                                Current psychotropic medications: (Only psychotropic meds. Doses and frequency)
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t flex border-black">
                                <textarea className="w-full pl-2" rows={3} />
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black pl-2 bg-blue-300">
                                Presenting problems
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t flex border-black">
                                {/* <textarea className="w-full pl-2" rows={10} placeholder="Clinical description to focus........." value={scm?.assessment.presentProblems} /> */}
                                <textarea className="w-full pl-2" rows={10} placeholder="Clinical description to focus........." />
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black pl-2 bg-blue-300">
                                Goals: (based on at least 5-6 needs, you can add more if required. Add goal progress if requesting additional units)
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t flex border-black">
                                <textarea className="w-full pl-2" rows={10} />
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t border-black pl-2 bg-blue-300">
                                Assessment Risk: (Client’s barriers, limitations, needs)
                            </div>
                            {/* ------------ */}
                            <div className="w-full border-t flex border-black">
                                <textarea className="w-full pl-2" rows={10} />
                            </div>
                            {/* ------------ */}


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
export { Carelon };