import { useRef, useState, useEffect } from 'react';

import { ScrollTop } from 'primereact/scrolltop';
import { Button } from 'primereact/button';
import { SignatureCanvasRef } from 'react-signature-canvas';
import { SignatureDialog } from '../SignatureDialog';
import { Checkbox } from 'antd';
import { CalculateAge, HeaderDoc } from '../../commons';
import { ContentObserver } from "../../commons/ContentObserver";
import { useCoreRequestEditSCMCertification } from "../../profile/hooks";

// -- New Struct
import { Active, ServiceCM, FormValueCertification } from '../../../models';

type Props = {
    active?: Active;
    relad(): void;
    mr?: number;
    scm?: ServiceCM;
    onContentChange: (content: string) => void;
}

const Certification = ({ active, mr, scm, relad, onContentChange }: Props) => {
    const { requestEditCertification } = useCoreRequestEditSCMCertification(relad);
    const [signTCM, setSignTCM] = useState<boolean>(false);
    const [signTCMs, setSignTCMs] = useState<boolean>(false);
    const signatureTCM = useRef<SignatureCanvasRef>(null);
    const signatureTCMs = useRef<SignatureCanvasRef>(null);

    const [requestCertification, setRequestCertification] = useState<FormValueCertification>({
        scm: scm?.id ?? 0,

        select_1: scm?.certification.select_1 ?? false,
        select_2: scm?.certification.select_2 ?? false,
        select_3: scm?.certification.select_3 ?? false,
        select_4: scm?.certification.select_4 ?? false,
        select_5: scm?.certification.select_5 ?? false,
        select_6: scm?.certification.select_6 ?? false,
        select_7: scm?.certification.select_7 ?? false,
        select_8: scm?.certification.select_8 ?? false,
        select_8a: scm?.certification.select_8a ?? false,
        select_8b: scm?.certification.select_8b ?? false,
        select_8c: scm?.certification.select_8c ?? false,
        select_8d: scm?.certification.select_8d ?? false,
        select_8e: scm?.certification.select_8e ?? false,
        select_9: scm?.certification.select_9 ?? false,

        tcm: scm?.tcm_id ?? 0,
        nameTCM: scm?.certification.nameTCM === "" ? scm?.tcm.full_name : scm?.certification.nameTCM ?? "",
        categoryTCM: scm?.certification.categoryTCM === "" ? scm?.tcm.categoryTCM : scm?.certification.categoryTCM ?? "CBHCM",
        signTcm: scm?.certification.signtcm ?? "data:image/png;base64,",
        dateTcm: scm?.certification.dateTcm ?? "",

        // categoryTCM: active?.activeUser?.User?.credentials ?? "CBHCM",

        supervisor: (active?.activeUser?.User?.ID === scm?.tcm_id
            ? scm?.certification.supervisor
            : active?.activeUser?.User?.ID) as number || 0,

        nameSupervisor: (active?.activeUser?.User?.ID === scm?.certification.supervisor
            ? active?.activeUser?.Record?.fullname
            : scm?.certification.nameSupervisor) as string || scm?.certification.nameSupervisor || "",

        categorySupervisor: (active?.activeUser?.User?.ID === scm?.certification.supervisor
            ? active?.activeUser?.User?.credentials
            : scm?.certification.categorySupervisor) as string || scm?.certification.categorySupervisor || "CBHCMS",

        signSupervisor: scm?.certification.signsupervisor ?? "data:image/png;base64,",
        dateSupervisor: scm?.certification.dateSupervisor ?? "",

        QA: scm?.certification.QA ?? "",
        signQA: scm?.certification.signqa ?? "data:image/png;base64,"
    });
    const handleChangeCertification = <T extends string | boolean>(name: keyof FormValueCertification, value: T) => {
        setRequestCertification(prevState => ({
            ...prevState,
            [name]: value
        }));

        // setVisibleBtnSave(true);
        // setSaveInformationClient(true);
        return requestCertification
    };

    const footerSign = (val: string) => (
        <div className="m-0 pt-5 w-full">
            <div className="flex overflow-y-auto">
                <Button
                    label="SAVE"
                    icon="pi pi-save"
                    // Habilitar el botón si la firma correspondiente está vacía
                    disabled={
                        (val === "tcm" && requestCertification.signTcm === "") ||
                        (val === "tcms" && requestCertification.signSupervisor === "")
                    }
                    className="mr-2 p-button-warning"
                    onClick={() => {
                        requestEditCertification({ requestCertification: requestCertification });
                        if (val === "tcm") {
                            setSignTCM(false);
                        }
                        if (val === "tcms") {
                            setSignTCMs(false);
                        }
                    }}
                />
            </div>
        </div>
    );
    const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia
    // Función para obtener el contenido del div
    const getContent = () => {
        if (contentRef.current && onContentChange) {
            const content = contentRef.current.innerHTML; // O usa textContent para solo texto
            onContentChange(content); // Puedes hacer algo con el contenido aquí
        }
    };
    useEffect(() => {
        getContent(); // Llamar a la función para obtener el contenido
    }, []);
    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>
            <ContentObserver onContentChange={onContentChange}>
                {/* <BlockUI blocked={requestCertification.signTcm !== "data:image/png;base64," ? requestCertification.signSupervisor !== "" ? false : true : false}> */}
                {/* Sign Client */}
                <SignatureDialog
                    header="Create TCM electronic signature"
                    visible={signTCM}
                    onHide={() => setSignTCM(false)}
                    footer={footerSign("tcm")}
                    signatureRef={signatureTCM}
                    onSignEnd={(dataUrl) => handleChangeCertification("signTcm", dataUrl)}
                    onClear={() => handleChangeCertification("signTcm", "")}
                />

                <SignatureDialog
                    header="Create Supervisor electronic signature"
                    visible={signTCMs}
                    onHide={() => setSignTCMs(false)}
                    footer={footerSign("tcms")}
                    signatureRef={signatureTCMs}
                    onSignEnd={(dataUrl) => handleChangeCertification("signSupervisor", dataUrl)}
                    onClear={() => handleChangeCertification("signSupervisor", "")}
                />

                <div ref={contentRef}>
                    <HeaderDoc
                        PrimaryText='APPENDIX J'
                        SecondaryText={`${CalculateAge({ dob: scm?.Demografic.dob ?? "" }) >= 18 ? "ADULT" : "CHILDREN"} INITIAL CERTIFICATION`}
                        ThirdText={`${CalculateAge({ dob: scm?.Demografic.dob ?? "" }) >= 18 ? "ADULT" : "CHILDREN"} MENTAL HEALTH TARGETED CASE MANAGEMENT`}
                    />
                    {/* <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>

                </div>
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    {CalculateAge({ dob: scm?.Demografic.dob ?? "" }) >= 18 ? "ADULT" : "CHILDREN"} CERTIFICATION
                </div>
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    {CalculateAge({ dob: scm?.Demografic.dob ?? "" }) >= 18 ? "ADULT" : "CHILDREN"} MENTAL HEALTH TARGETED CASE MANAGEMENT
                </div> */}

                    <div className="m-0 p-0">
                        {/* row 1 */}
                        <div className="flex w-full">
                            <div className="flex w-full">
                                <div className="flex w-full md:w-3/5 lg:w-3/5 place-items-center">
                                    <b>Recipient's Name:</b> {scm?.Demografic.first_name} {scm?.Demografic.last_name}
                                </div>
                                <div className="flex w-full md:w-1/5 lg:w-1/5  place-items-center">
                                    <b>Medicaid ID #:</b> {scm?.Demografic.medicaid}
                                </div>
                                <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                    <b>MR #: </b> {mr}
                                </div>
                            </div>

                        </div>
                        {/* row 2 */}
                        <div className="mt-5 mb-5 p-0">
                            <div className='text-justify'>
                                Is hereby certified as meeting all of the following adult mental health targeted case management criteria.
                                <br /><br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_1}
                                        onChange={(e) => handleChangeCertification("select_1", e.target.checked)}
                                    />
                                    1. Is enrolled in a Department of Children and Families adult mental health target population
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_2}
                                        onChange={(e) => handleChangeCertification("select_2", e.target.checked)}
                                    />
                                    2. Has a mental health disability (i.e., severe and persistent mental illness) which requires advocacy
                                    for and coordination of services to maintain or improve level of functioning;
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_3}
                                        onChange={(e) => handleChangeCertification("select_3", e.target.checked)}
                                    />
                                    3. Requires services to assist in attaining self sufficiency and satisfaction in the living, learning, work
                                    and social environments of choice;
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_4}
                                        onChange={(e) => handleChangeCertification("select_4", e.target.checked)}
                                    />
                                    4. Lacks a natural support system with the ability to access needed medical, social, educational and
                                    other services;
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_5}
                                        onChange={(e) => handleChangeCertification("select_5", e.target.checked)}
                                    />
                                    5. Requires ongoing assistance to access or maintain needed care consistently within the service
                                    delivery system;
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_6}
                                        onChange={(e) => handleChangeCertification("select_6", e.target.checked)}
                                    />
                                    6. Has a mental health disability (i.e., severe and persistent mental illness) duration that, based upon
                                    professional judgment, will last for a minimum of one year;
                                </div>
                                <br />
                                {CalculateAge({ dob: scm?.Demografic.dob ?? "" }) >= 18 ? (
                                    <div>
                                        <div className="flex w-full place-items-center">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                checked={requestCertification.select_7}
                                                onChange={(e) => handleChangeCertification("select_7", e.target.checked)}
                                            />
                                            7. Is not receiving duplicate case management services from another provider;
                                        </div>
                                        <br />
                                        <div className="flex w-full place-items-center">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                checked={requestCertification.select_8}
                                                onChange={(e) => handleChangeCertification("select_8", e.target.checked)}
                                            />
                                            8. Meets at least one of the following requirements (check all that apply):
                                        </div>
                                        <div className='pl-6'>
                                            <div className="flex w-full place-items-center">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                    checked={requestCertification.select_8a}
                                                    onChange={(e) => handleChangeCertification("select_8a", e.target.checked)}
                                                />
                                                a. Is awaiting admission to or has been discharged from a state mental health treatment
                                                facility;
                                            </div>
                                            <div className="flex w-full place-items-center">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                    checked={requestCertification.select_8b}
                                                    onChange={(e) => handleChangeCertification("select_8b", e.target.checked)}
                                                />
                                                b. Has been discharged from a mental health residential treatment facility;
                                            </div>
                                            <div className="flex w-full place-items-center">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                    checked={requestCertification.select_8c}
                                                    onChange={(e) => handleChangeCertification("select_8c", e.target.checked)}
                                                />
                                                c. Has had more than one admission to a crisis stabilization unit (CSU), short-term
                                                residential facility (SRT), inpatient psychiatric unit, or any combination of these
                                                facilities in the past 12 months;
                                            </div>
                                            <div className="flex w-full place-items-center">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                    checked={requestCertification.select_8d}
                                                    onChange={(e) => handleChangeCertification("select_8d", e.target.checked)}
                                                />
                                                d. Is at risk of institutionalization for mental health reasons (provide explanation);
                                            </div>
                                            <div className="flex w-full place-items-center">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                    checked={requestCertification.select_8e}
                                                    onChange={(e) => handleChangeCertification("select_8e", e.target.checked)}
                                                />
                                                e. Is experiencing long-term or acute episodes of mental impairment that may put him or
                                                her at risk of requiring more intensive services (provide explanation); or
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex w-full place-items-center">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                checked={requestCertification.select_8}
                                                onChange={(e) => handleChangeCertification("select_8", e.target.checked)}
                                            />
                                            7. Is in out-of-home mental health placement or at documented risk of out-of-home mental health
                                            placement; and
                                        </div>
                                        <br />
                                        <div className="flex w-full place-items-center">
                                            <Checkbox
                                                className='mr-2'
                                                disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                                checked={requestCertification.select_8}
                                                onChange={(e) => handleChangeCertification("select_8", e.target.checked)}
                                            />
                                            8. Is not receiving duplicate case management services from another provider; or
                                        </div>
                                    </div>
                                )}
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        disabled={requestCertification.signTcm !== "data:image/png;base64," ? (true) : (false)}
                                        checked={requestCertification.select_9}
                                        onChange={(e) => handleChangeCertification("select_9", e.target.checked)}
                                    />
                                    9. Has relocated from a Department of Children and Families district or region where he or she was
                                    receiving mental health targeted case management services.
                                </div>
                                <br />

                                {/* primera fila de firma */}
                                <div className='w-full mt-24'>
                                    <div className="flex w-full">

                                        <div className="flex w-2/5">
                                            <div className="w-full text-center content-end">{requestCertification.nameTCM}</div>
                                        </div>
                                        <div className="w-1/5">
                                            <div className="w-full text-center content-end">{requestCertification.categoryTCM === "" ? "CBHCM" : requestCertification.categoryTCM}</div>
                                        </div>
                                        <div className="w-1/5">
                                            <div className="w-full text-center content-end">
                                                {requestCertification.signTcm === "data:image/png;base64," ? (
                                                    <>
                                                        {scm?.tcm_id === active?.activeUser?.User?.ID &&
                                                            <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                                                setSignTCM(true);
                                                            }} />
                                                        }

                                                    </>

                                                ) : (
                                                    <div className="w-full place-items-center pl-10 flex text-center">
                                                        <img src={requestCertification.signTcm} style={{ width: '100px' }} alt='sign' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-1/5">
                                            <div className="w-full text-center content-end">{scm?.doa}</div>
                                        </div>
                                    </div>


                                    <div className='flex w-full'>
                                        <div className="w-2/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                    </div>


                                    <div className='flex w-full'>
                                        <div className="w-2/5 text-center"><b>Targeted Case Manager</b></div>
                                        <div className='w-1/5 text-center'><b>Credentials</b></div>
                                        <div className='w-1/5 text-center'><b>Signature TCM</b></div>
                                        <div className='w-1/5 text-center'><b>Date</b></div>
                                    </div>

                                </div>

                                <br />
                                {/* fin primera fila de firma */}

                                {/* segunda fila de firma */}

                                <div className='w-full'>

                                    <div className="flex w-full">

                                        <div className="flex w-2/5">
                                            <div className="w-full text-center content-end">{requestCertification.nameSupervisor}</div>
                                        </div>

                                        <div className="w-1/5 content-end">
                                            <div className="w-full text-center content-end">{requestCertification.categorySupervisor}</div>
                                        </div>

                                        <div className="w-1/5">
                                            <div className="w-full content-end">
                                                {requestCertification.signSupervisor === "data:image/png;base64," ? (
                                                    <>
                                                        {scm?.certification.supervisor === active?.activeUser?.User?.ID &&
                                                            scm?.certification.signtcm !== "data:image/png;base64," &&
                                                            <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                                                setSignTCMs(true);
                                                            }} />
                                                        }

                                                    </>

                                                ) : (
                                                    <div className="w-full place-items-center pl-10 flex text-center">
                                                        <img src={requestCertification.signSupervisor} style={{ width: '150px' }} alt='sign' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-1/5 content-end">
                                            <div className="w-full text-center content-end">{scm?.doa}</div>
                                        </div>
                                    </div>


                                    <div className='flex w-full'>
                                        <div className="w-2/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                        <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                    </div>


                                    <div className='flex w-full'>
                                        <div className="w-2/5 text-center"><b>Targeted Case Manager Supervisor</b></div>
                                        <div className='w-1/5 text-center'><b>Credentials</b></div>
                                        <div className='w-1/5 text-center'><b>Signature TCMS</b></div>
                                        <div className='w-1/5 text-center'><b>Date</b></div>
                                    </div>
                                </div>
                                {/* fin segunda fila de firma */}

                            </div>
                        </div>
                    </div>
                </div>
            </ContentObserver>
            {/* </BlockUI> */}
            <ScrollTop
                target="parent"
                pt={{
                    root: { className: 'bg-orange-400' }
                }}
            />
        </div>
    );

}

export { Certification };