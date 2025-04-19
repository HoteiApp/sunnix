import { useState, useRef } from 'react';
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'antd';

import { ClientInfo, FormValuesConnsents } from '../../../../../models';
import { ClientDate } from './components';
import SignatureCanvas, { SignatureCanvasRef } from 'react-signature-canvas';

const Connsents = ({ clientInfo, relad }: Props) => {
    const [visible1, setVisible1] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const signatureRef = useRef<SignatureCanvasRef>(null);
    // const [imageData, setImageData] = useState("");

    const saveSignature = (signature) => {
        ChangeFormValuesconnsent("connsentsInitial", signature);
        // setImageData(signature);
    }

    // 
    const [signClient, setSignClient] = useState<boolean>(false);
    const signatureClientRef = useRef<SignatureCanvasRef>(null);
    const [imageSignClient, setImageSignClient] = useState("");

    const saveSignatureClient = (signature) => {
        ChangeFormValuesconnsent("connsentsClientSign", signature);
        // setImageSignClient(signature);
    }

    // 
    const [signLegalGuardian, setSignLegalGuardian] = useState<boolean>(false);
    const signatureLegalGuardianRef = useRef<SignatureCanvasRef>(null);
    const [imageSignLegalGuardian, setImageSignLegalGuardian] = useState("");

    const saveSignatureLegalGuardian = (signature) => {
        ChangeFormValuesconnsent("connsentsGuardianSign", signature);
        // setImageSignLegalGuardian(signature);
    }

    // 
    const [signWitness, setSignWitness] = useState<boolean>(false);
    const signatureWitnessRef = useRef<SignatureCanvasRef>(null);

    const saveSignatureWitness = (signature) => {
        ChangeFormValuesconnsent("connsentsWitnessSign", signature);
        // setImageSignLegalGuardian(signature);
    }



    const [connsentsAuthorize, setConnsentsAuthorize] = useState('');

    const [connsentsTCM, setConnsentsTCM] = useState('');
    const [connsentsTCM1, setConnsentsTCM1] = useState('');

    // -----
    const [connsent, setConnsent] = useState<FormValuesConnsents>({
        connsentsInitial: "",
        connsentsClientSign: "",
        connsentsGuardianSign: "",
        connsentsWitnessSign: "",
        connsentsDr: "",
        connsentsDrPhone: "",
        connsentsDrFax: "",
        connsentsPCP: false,
        connsentsAuthorize: "",
        connsentsGrievanceName: "",
        connsentsGrievanceDate: "",
        connsentsGrievanceRelationship: "",
        connsentsGrievanceOther: "",
        connsentsGrievancePhone: "",
        connsentsGrievanceFax: "",
        connsentsGrievanceNature: "",
        connsentsTCM: "",
        connsentsTCM1: "",
        connsentsapprovedTCM: false,
        connsentsApprovedSupervisor: false,
        connsentsapprovedQa: false,
    });
    const ChangeFormValuesconnsent = (name: keyof FormValuesConnsents, value: string | boolean) => {
        setConnsent(prevState => ({
            ...prevState,
            [name]: value
        }));

        return connsent
    };
    // -----



    const FormarDate = (fecha) => {
        // const fecha = "2023-09-12T22:13:46.69";
        const fechaObjeto = new Date(fecha);

        const dia = fechaObjeto.getDate();
        const mes = fechaObjeto.getMonth() + 1; // Suma 1 al mes ya que los meses en JavaScript comienzan en 0
        const anio = fechaObjeto.getFullYear();

        return `${dia}/${mes}/${anio}`;
    }

    const footerContent = (
        <div>
            {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
            {/* <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" /> */}
            <Button
                label="Submit"
                icon="pi pi-check"
                className='p-button-warning'
            // onClick={() => {
            //   sign({ signature: imageData });
            // }}

            />
        </div>
    );

    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>

            <Button label="Cliente 1" icon="pi pi-external-link" onClick={() => setVisible1(true)} />
            <Dialog header="Client 1" maximizable visible={visible1} modal={false} style={{ width: '50vw' }} onHide={() => setVisible1(false)}>
                <p className="m-0">
                Demografic 1
                </p>
            </Dialog>
            <Button label="Client 2"  icon="pi pi-external-link" onClick={() => setVisible2(true)} />
            <Dialog header="Client 2" maximizable visible={visible2} modal={false} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                <p className="m-0">
                    Demografic 2
                </p>
            </Dialog>


            <Dialog
                header="Create my electronic signature"
                visible={visible}
                maximizable
                style={{ width: '80vw' }}
                breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <p className="m-0" style={{ overflow: 'auto' }}>
                    "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
                    <br /><br />
                    By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
                    <br /><br />
                    If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
                    <br /><br />
                    Please try to make the signature as legible as possible:
                    <div className='w-full' >
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                                style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                            }}
                            minWidth={2}
                            maxWidth={3}
                            onEnd={() =>
                                ChangeFormValuesconnsent("connsentsInitial", signatureRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                // setImageData(signatureRef.current.getTrimmedCanvas().toDataURL("image/png"))
                            }
                        />
                    </div>
                    <button onClick={() => {
                        signatureRef.current.clear();
                        saveSignature(null);
                        // setImageData("");
                        ChangeFormValuesconnsent("connsentsInitial", "");
                    }}> Clear </button>
                </p>
            </Dialog>

            <Dialog
                header="Create my electronic signature"
                visible={signClient}
                maximizable
                style={{ width: '80vw' }}
                breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                onHide={() => setSignClient(false)}
                footer={footerContent}
            >
                <p className="m-0" style={{ overflow: 'auto' }}>
                    "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
                    <br /><br />
                    By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
                    <br /><br />
                    If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
                    <br /><br />
                    Please try to make the signature as legible as possible:
                    <div className='w-full' >
                        <SignatureCanvas
                            ref={signatureClientRef}
                            canvasProps={{
                                style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                            }}
                            minWidth={2}
                            maxWidth={3}
                            onEnd={() =>
                                ChangeFormValuesconnsent("connsentsClientSign", signatureClientRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                // setImageSignClient(signatureClientRef.current.getTrimmedCanvas().toDataURL("image/png"))
                            }
                        />
                    </div>
                    <button onClick={() => {
                        signatureClientRef.current.clear();
                        saveSignature(null);
                        ChangeFormValuesconnsent("connsentsClientSign", "")
                        // setImageSignClient("");
                    }}> Clear </button>
                </p>
            </Dialog>


            <Dialog
                header="Create Legal Guardian electronic signature"
                visible={signLegalGuardian}
                maximizable
                style={{ width: '80vw' }}
                breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                onHide={() => setSignLegalGuardian(false)}
                footer={footerContent}
            >
                <p className="m-0" style={{ overflow: 'auto' }}>
                    "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
                    <br /><br />
                    By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
                    <br /><br />
                    If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
                    <br /><br />
                    Please try to make the signature as legible as possible:
                    <div className='w-full' >
                        <SignatureCanvas
                            ref={signatureLegalGuardianRef}
                            canvasProps={{
                                style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                            }}
                            minWidth={2}
                            maxWidth={3}
                            onEnd={() =>
                                ChangeFormValuesconnsent("connsentsGuardianSign", signatureLegalGuardianRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                // setImageSignLegalGuardian(signatureLegalGuardianRef.current.getTrimmedCanvas().toDataURL("image/png"))
                            }
                        />
                    </div>
                    <button onClick={() => {
                        signatureLegalGuardianRef.current.clear();
                        saveSignature(null);
                        // setImageSignLegalGuardian("");
                        ChangeFormValuesconnsent("connsentsGuardianSign", "")
                    }}> Clear </button>
                </p>
            </Dialog>

            <Dialog
                header="Create Witness electronic signature"
                visible={signWitness}
                maximizable
                style={{ width: '80vw' }}
                breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                onHide={() => setSignWitness(false)}
                footer={footerContent}
            >
                <p className="m-0" style={{ overflow: 'auto' }}>
                    "By clicking the "Submit" button, you are giving your consent to electronically sign the documents generated by our system. The electronic signature has the same legal validity as a paper signature and is recognized as such by applicable laws and regulations .
                    <br /><br />
                    By electronically signing these documents, you agree that these documents are valid and legally binding on all parties involved. You further acknowledge that you have read and understood the terms and conditions set forth in these documents.
                    <br /><br />
                    If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
                    <br /><br />
                    Please try to make the signature as legible as possible:
                    <div className='w-full' >
                        <SignatureCanvas
                            ref={signatureWitnessRef}
                            canvasProps={{
                                style: { width: "100%", height: 200, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                            }}
                            minWidth={2}
                            maxWidth={3}
                            onEnd={() =>
                                ChangeFormValuesconnsent("connsentsWitnessSign", signatureWitnessRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                // setImageSignLegalGuardian(signatureLegalGuardianRef.current.getTrimmedCanvas().toDataURL("image/png"))
                            }
                        />
                    </div>
                    <button onClick={() => {
                        signatureWitnessRef.current.clear();
                        saveSignature(null);
                        // setImageSignLegalGuardian("");
                        ChangeFormValuesconnsent("connsentsWitnessSign", "")
                    }}> Clear </button>
                </p>
            </Dialog>



            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <div className="m-0 p-0">
                {/* row 1 */}
                <ClientDate clientInfo={clientInfo} />
                {/* row 2 */}
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>INFORMED CONSENT/ CONSENTIMENTO INFORMADO</b>
                </div>
                <div className='text-justify'>
                    SUNISS UP is a Behavioral Healthcare provider specializing in providing community TCM and other Therapeutic
                    services at community agencies, homes, shelters, and residential settings. All TCMs and Therapists are eligible to
                    provide services in the state of Florida. TCMs and Therapists receive intensive clinical supervision from supervisor
                    and licensed clinicians, either through a psychologist, psychiatrist, or licensed mental health professional. This
                    treatment team will be responsible for monitoring progress of client during on-site visits and phone calls to clients,
                    parents and legal gurdians.<br /><br />
                    I understand completely and fully that the services or treatment I will receive will be from a qualified TCM or
                    Therapist under the direction and supervision of a fully qualified mental health professional. Furthermore, I agree
                    to participate in the services provided by SUNISS UP at home, facility, community settings and/or using Tele-health. I
                    agree to be evaluated as recommended by SUNISS UP. I understand that all information regarding my treatment is to
                    remain confidential, subject only to be reviewed by the appropriate personnel within the agency, and/or as required
                    by law.<br /><br />
                    I understand that the TCM/Therapists/Staff at SUNISS UP are mandated by law to report child abuse,
                    abandonment, neglect, or domestic violence. SUNISS UP reserves the right to terminate, services at any time for any of
                    the following reasons:
                    <br /><br />
                    1. Refusal to cooperate and/or participate with treatment.<br />
                    2. Denial of access to clients.<br />
                    3.Threats of harm or violence to therapists or staff.<br />
                    4.The client, parent, or guardian fosters an environment of hostility that prevents SUNISS UP from
                    providing therapeutic services.<br /><br />
                    It is our policy that a termination session(s) is provided prior to ending services. While receiving services from SUNISS
                    UP, I understand that I may be asked for permission to release confidential information and/or records to professionals
                    outside of SUNISS UP. I also agree to use electronic signatures as required by SUNISS UP. The personnel of SUNISS
                    UP continue to strive for the highest standards of mental healthcare and professional practice.
                </div>
                <div className='mt-5'>
                    {connsent.connsentsInitial === "" ? (
                        <Button
                            label="Sign"
                            icon="pi pi-file-edit"
                            className='p-button-warning'
                            onClick={() => {
                                setVisible(true);
                            }}

                        />
                    ) : (
                        <img src={connsent.connsentsInitial} width={50} />
                    )}

                </div>
                <div>
                    <b className='border-t-2 border-primary'>Initial</b>
                </div>
            </div>
            <hr />

            <div className="mt-5 mb-5 p-0">

                <div className='text-justify'>
                    SUNISS UP es un proveedor del cuidado y comportamiento de la salud mental. Nos especializamos en proporcionar
                    servicios de TCM y otros servicios Terapéuticos a domicilio, y centros residenciales. Todos los TCM y
                    terapeutas son licenciados ó elegibles para proveer servicios en el estado de la Florida. Estos TCM y terapeutas
                    reciben supervisión clínica intensiva de supervisores y profesionales licenciados en salud mental. Este equipo de
                    tratamiento se encarga de la supervisión relacionada con las visitas y llamadas telefónicas a los clientes, padres, and
                    guardianes legales. Entiendo completamente y plenamente que el tratamiento que recibiré será de un TCM o
                    terapeuta calificado, bajo la dirección y la supervisión de un profesional de salud mental. Estoy de acuerdo en
                    participar en los servicios y evaluaciones según lo recomienda SUNISS UP en el hogar, la agencia/oficinas, lugares
                    comunitarios y/o usando Tele-Conferencias segun sea requiredo por la agencia. Además entiendo que toda la
                    información relativa a mi tratamiento seguirá siendo confidencial, con sujeción únicamente a ser revisado por el personal
                    apropiado dentro de la agencia, y/o según lo requiera la ley.<br /><br />
                    Entiendo que el personal de terapeutas de SUNISS UP está autorizado por la ley para reportar abuso infantil,
                    abandono, negligencia, o violencia doméstica. SUNISS UP se reserva el derecho de terminar servicios en cualquier
                    momento por cualquiera de las razones siguientes:<br /><br />
                    1.Negación a cooperar y/o participar con el tratamiento.<br />
                    2.Negación del acceso a los clientes.<br />
                    3.Amenazas de violencia a los terapéuticos o al personal.<br />
                    4.El cliente, padre, o guardián fomenta un ambiente de hostilidad que impide que SUNISS UP provea servicios terapéuticos.<br /><br />

                    Es nuestra póliza de que una sesión final sea provista al niño/familia antes de terminar los servicios. Durante el
                    tiempo que esté recibiendo servicios de SUNISS UP, entiendo que se me puede pedir autorización para emisión de
                    información confidencial y/o expedientes a profesionales fuera de SUNISS UP. Yo estoy de acuerdo tambien en
                    usar Firmas Eelectronicas segun sea necesario y requiredo por SUNISS UP. El personal de SUNISS UP continúa
                    esforzándose por obtener los más altos niveles de cuidado mental y práctica profesional.
                </div>
                <div className='mt-5'>
                    {connsent.connsentsInitial === "" ? (
                        <Button
                            label="Sign"
                            icon="pi pi-file-edit"
                            className='p-button-warning'
                            onClick={() => {
                                setVisible(true);
                            }}

                        />
                    ) : (
                        <img src={connsent.connsentsInitial} width={50} />
                    )}
                </div>
                <div>
                    <b className='border-t-2 border-primary'>Initial</b>
                </div>
            </div>
            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CONSENT FOR THE USE AND/OR DISCLOSURE OF PROTECTED HEALTH INFORMATION
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">

                <div className='text-justify'>
                    I hereby give consent to SUNISS UP and all health care providers furnishing care within the practice to
                    use and disclose my protected health information for the purpose of treatment, payment, and health
                    care options. My “Protected Health Information” means health information, not including my
                    demographic information, collected from me and created or received by my therapist, psychiatrist or
                    case manager, a health plan, my employer or a health-care clearing house. This protected health
                    information related to my past, present or future or mental health or condition and identifies me, or there
                    is a reasonable basis to believe the information may
                    identify me. Please be advised that our Notice of Privacy Practices provides more detailed
                    information about how we may use and disclose your protected health information. You have the
                    right to review our Notice of Privacy Practices before you sign this consent. We reserve the right to
                    change the terms of our Notice of Privacy Practices. You may obtain a copy of the current notice by
                    contacting our Compliance Officer, at
                    954-860-7166. You have the right to request to restrict how we use and disclose protected health
                    information for the purpose of treatment, payment or health care operations. We are not required to grant
                    your request, but if we do, the restriction will be binding
                    on us. You may revoke this consent at any time. Your revocation must be in writing, signed by
                    you or on your behalf, and delivered to the above address. You may deliver your revocation by any means
                    you choose but it will be effective only when we actually receive the revocation. Your revocation will not
                    be effective to the extent that we or others have acted in reliance upon this consent.
                </div>
                <div className='mt-5'>
                    {connsent.connsentsInitial === "" ? (
                        <Button
                            label="Sign"
                            icon="pi pi-file-edit"
                            className='p-button-warning'
                            onClick={() => {
                                setVisible(true);
                            }}

                        />
                    ) : (
                        <img src={connsent.connsentsInitial} width={50} />
                    )}
                </div>
                <div>
                    <b className='border-t-2 border-primary'>Initial</b>
                </div>
            </div>
            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    ACKNOWLEDGMENT OF RECEIPT OF
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">

                <div className='text-justify'>
                    • CLIENT’S RIGHTS <br />
                    • CLIENT GRIEVANCE POLICY<br />
                    • NOTICE OF PRIVACY PRACTICES<br />
                    • PSYCHIATRIC ADVANCE DIRECTIVES<br /><br /><br />
                    I hereby acknowledge  that I  have  received a  copy and  had an  opportunity to ask questions
                    concerning all documents listed above.
                </div>


                <div className="flex w-full mt-10">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsClientSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignClient(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsClientSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Client Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsGuardianSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignLegalGuardian(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsGuardianSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">
                        {clientInfo?.client?.legal_guardian}
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Legal Guardian Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Legal Guardian Name
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsWitnessSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignWitness(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsWitnessSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Witness Name-Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Relationship to Client
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CLIENT’S RIGHTS
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    As an individual and as a client of SUNISS UP , you have rights: We, the professional staff, recognize and respect these
                    rights. If at any time you feel that any of your rights have violated, you should contact your therapist, who will act as your
                    advocate. Your advocate shall investigate, examine and see to remedy any conditions and practices which are felt to limit
                    your rights. If you feel that the issue is not resolved with your therapist, you may contact the SUNISS UP office
                    in order to file a complaint/grievance verbally in writing. The SUNISS UP  office telephone number is 964-860-7166
                    <br /><br />
                    1. The agency recognizes and respects the dignity of each client as an individual and a human being. Every client
                    has the right to the same consideration and treatment regardless of race, religion, national origin, age, sex,
                    political affiliation, sexual orientation, financial status or disability.
                    <br /><br />
                    2. The agency accommodates the written and oral communication needs of clients served. The agency employs a
                    sufficient number of bilingual personnel for all programs and/or populations in which confidential interpersonal
                    communication is necessary for adequate service delivery.
                    <br /><br />
                    3. The client has the right to receive services in a non-discriminatory manner.
                    <br /><br />
                    4. The client has the right to freedom of thought, conscience and religion, including the right to express and practice
                    religious and spiritual beliefs.
                    <br /><br />
                    5. The client has the right to care for himself/herself as fully as he/she can and the right to receive from the agency
                    whatever care is needed.
                    <br /><br />
                    6. The client has the right to receive prompt evaluation and treatment.
                    <br /><br />
                    7. The client is encouraged to ask his/her therapist and his/her problems, plans for his/her treatment, approximate
                    length of stay, the outcome foreseen, discharge plans and continued care plans.
                    <br /><br />
                    8. The therapist will ask the client to participate in the formulation of and the review of the client’s treatment plan and
                    in making improvements upon it as the client’s treatment progress.
                    <br /><br />
                    9. The client will receive information about the basic expectations for use of the organization’s services, hours that
                    services are available, rules, expectations, and other factors that can result in discharge or termination of
                    Services.
                    <br /><br />
                    10. The client will be treated under the least restrictive conditions with his/her condition, and he /she shall not be
                    subjected to restraint or seclusion.
                    <br /><br />
                    11. The agency recognizes and respects the client’s right to confidentiality. The agency recognizes and respects the
                    client’s right to confidentiality. The agency will keep all information about the client as confidential as the law
                    allows.
                    <br /><br />
                    12. The agency will not release any information about the client without written permission from the client or his/her
                    legal guardian or a court order.
                    <br /><br />
                    13. The client will not be the subject of experimental or investigative research without prior written and informed
                    consent.
                    <br /><br />
                    14. The client will be afforded an opportunity to have access to consultation with a private physician at his/her own
                    expense, in the case of hazardous treatment, the client may have upon request an impartial review prior to
                    Implementation except in the case of emergency procedures required for the preservation of the client’s health.
                    <br /><br />
                    15. The client will have the right to refuse any service, treatment, or medication, unless mandated by law or court
                    order, and the client will be informed about the consequences of such refusal, which can include discharge.
                    <br /><br />
                    16. The client will not be required to perform services for SUNISS UP that are not included for therapeutic purposes
                    in the client’s plan for care.
                    <br /><br />
                    17. Withstanding other provisions of law, the client may not have access to their clinical records unless his/her
                    physician feels that such access is consistent with his/her condition and treatment plan. This will be documented
                    by the physician in the client’s clinical record.
                    <br /><br />
                    18. The agency will encourage and assist the client to understand and Exercise his/her client’s rights to voice
                    grievances, make complaints or appeals and recommend changes in policies and services to staff. In addition, the
                    client has the right to an impartial review of violations of his/her rights assured under this section and the client will
                    be free from restraint, interference, coercion, discrimination and reprisal. The client also has the right of access to
                    legal counsel.
                    <br /><br />
                    19. The client has the right to report physical and/or sexual abuse, neglect, or domestic violence to the 1-800-96-
                    ABUSE hotline
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CLIENT’S RIGHTS
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    I have read and do hereby agree to and understand the above client’s rights as they pertain to
                    my treatment with SUNISS UP ; I have been given a copy of these rights.
                </div>


                <div className="flex w-full mt-10">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsClientSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignClient(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsClientSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Client Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsGuardianSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignLegalGuardian(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsGuardianSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">
                        {clientInfo?.client?.legal_guardian}
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Legal Guardian Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Legal Guardian Name
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsWitnessSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignWitness(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsWitnessSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Witness Name-Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Relationship to Client
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    COMMUNICATION WITH PRIMARY CARE PHYSICIAN (PCP)
                </b>
            </div>
            <div className='flex w-full place-items-center'>
                <div className='w-1/2'>
                    Date: {FormarDate(clientInfo?.client?.CreatedAt)}
                </div>
                <div className='w-1/2'>

                </div>
            </div>
            <div className='flex w-full place-items-center'>
                <div className='flex w-1/2 place-items-center'>
                    Dr:
                    <InputText
                        type="text"
                        name='connsentsDr'
                        placeholder="Type"
                        value={connsent.connsentsDr}
                        onChange={(e) => ChangeFormValuesconnsent("connsentsDr", e.target.value)}
                        className="input input-ghost w-2/3 text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </div>
                <div className='w-1/2'>
                    <Checkbox
                        className='mr-2'
                        checked={connsent.connsentsPCP}
                        onChange={(e) => ChangeFormValuesconnsent("connsentsPCP", e.target.checked ?? false)}
                    /> Do not have a PCP
                </div>
            </div>
            <div className='flex w-full pt-2'>
                <div className='w-1/2 flex place-items-center'>
                    Phone Number:
                    <InputMask
                        id="phone"
                        value={connsent.connsentsDrPhone}
                        onChange={(e: InputMaskChangeEvent) => ChangeFormValuesconnsent("connsentsDrPhone", e.target.value ?? "")}
                        mask="(999) 999-9999"
                        placeholder="Type number"
                        className="input input-ghost border-0 text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                    />
                </div>
                <div className='w-1/2 flex place-items-center'>
                    Fax Number:
                    <InputMask
                        id="phone"
                        value={connsent.connsentsDrFax}
                        onChange={(e: InputMaskChangeEvent) => ChangeFormValuesconnsent("connsentsDrFax", e.target.value ?? "")}
                        mask="(999) 999-9999"
                        placeholder="Type number"
                        className="input input-ghost border-0 text-center"
                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                    />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-1/2'>
                    Re: Client: {clientInfo?.client?.first_name} {clientInfo?.client?.last_name}
                </div>
                <div className='w-1/2'>
                    DOB: {clientInfo?.client?.dob}
                </div>
            </div>

            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    Dear Doctor:<br /><br />
                    We wish to inform you that your above-named client is receiving Behavioral Health Services from our organization.
                    In order to properly coordinate the client’s care, we would appreciate your contacting us at 964-860-7166 with any
                    pertinent information, concern, or questions. We ask you to tell our receptionist that you are the doctor for this client and
                    ask to speak to the client’s therapist.<br /><br />
                    The client’s guardian has authorized our mutual sharing of health information at the bottom of this letter. Thank you for
                    your cooperation.
                    <br /><br />
                    Sincerely, SUNISSUP
                </div>
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>
                        Guardian Authorization or Refusal/ Autorización o Denegación del Guardián
                    </b>
                </div>
                <div className="m-5 p-0">
                    <div className='text-justify'>
                        <RadioButton inputId="ingredient1" name="connsentsAuthorize" value="yes" onChange={(e) => ChangeFormValuesconnsent("connsentsAuthorize", e.target.value ?? "")} checked={connsent.connsentsAuthorize === 'yes'} /> I authorize SUNISS UP and the aforementioned doctor to mutually share my health
                        information in order to best coordinate care.
                        <br /><br />
                        <RadioButton inputId="ingredient1" name="connsentsAuthorize" value="no" onChange={(e) => ChangeFormValuesconnsent("connsentsAuthorize", e.target.value ?? "")} checked={connsent.connsentsAuthorize === 'no'} /> I refuse to authorize sharing of information between SUNISS UP and healthcare  providers.


                        <div className="flex w-full mt-10">
                            <div className="w-2/5 text-center place-items-center">
                                {clientInfo?.client?.legal_guardian !== "" ? (clientInfo?.client?.legal_guardian) : (<>{clientInfo.client.first_name} {clientInfo.client.last_name}</>)}
                            </div>
                            <div className="w-1/5 text-center ml-5 place-items-center">

                            </div>
                            <div className="w-1/5 text-center place-items-center mr-5">
                                {connsent.connsentsGuardianSign === "" ? (
                                    <Button
                                        label="Sign"
                                        icon="pi pi-file-edit"
                                        className='p-button-warning'
                                        onClick={() => {
                                            setSignLegalGuardian(true);
                                        }}

                                    />
                                ) : (
                                    <div className="w-full flex text-center">

                                        <img src={connsent.connsentsGuardianSign} width={150} />

                                    </div>
                                )}
                            </div>
                            <div className="w-1/5 place-items-center">
                                <div className='text-center'>
                                    {FormarDate(clientInfo?.client?.CreatedAt)}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                                {clientInfo?.client?.legal_guardian !== "" ? (<>Legal Guardian Name</>) : (<>Client Name</>)}
                            </div>
                            <div className="w-1/5 text-center place-items-center ml-5  ">

                            </div>
                            <div className="w-1/5 text-center border-t-2 border-primary mr-5">
                                Signature
                            </div>
                            <div className="w-1/5 place-items-center border-t-2 border-primary">
                                <div className='text-center'>
                                    Date
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CLIENT GRIEVANCES
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    SUNISS UP believes that every client has the right to have his or her opinions heard and to be included, to the greatest
                    extent possible, when any decisions are being made affecting his/her care. It is therefore the policy of SUNISS UP
                    to have an established procedure to resolve client complaints and grievances.
                    <br /><br />
                    A process for monitoring and responding to client grievances has been established and includes the following
                    guidelines:
                    <br /><br />
                    1. At the time of admission, the Initial Treatment Evaluator will review client’s rights and grievance procedures with the
                    client and legal guardian. An entry will be made into the client’s file to indicate that they have reviewed and
                    understand the procedure. In addition, the client and legal guardian will be offered a copy of this procedure.
                    <br /><br />
                    3. Clients are encouraged to meet with staffs to resolve any concern or complaints that arise during the course of
                    treatment. If clients have concerns that they are unable to resolve with staff, they will be encouraged to share
                    their concerns with the staff member’s direct supervisor.
                    <br /><br />
                    4. All concerns and/or complaints will be documented in writing on a Client Concern/Grievance Form. If the client is
                    unable or unwilling to complete this form, the staff member, or his/her supervisor, will complete the form on behalf of
                    the client.
                    <br /><br />
                    5. Completed Client Concern/Grievance Forms will be forwarded to the Director of Outreach within 24 hours for review.
                    The Director of Outreach will document the client’s concerns on the complaint/Grievance Log. In some cases, an
                    Incident Report may also be requested.
                    <br /><br />
                    6. The Clinical Director, in collaboration with staff involved, will attempt to resolve any concerns or complaints that do
                    NOT involve a potential denial of client rights directly with the client and legal guardian. Any decision by the Clinical
                    Director regarding such complaints will be considered final.
                    <br /><br />
                    7. Any concern or complaint that DOES involve a potential denial of client rights will be considered a grievance by the
                    client and/or legal guardian. The Director of Outreach will investigate the grievance as quickly as possible, and will
                    respond to the client and legal guardian within 1 4 days of the initial complaint.
                    <br /><br />
                    8. If the client is dissatisfied with the Director’s decision, the client may file a written appeal with the Clinical Director,
                    Based upon this statement, the Clinical Director will prepare a written statement that. Either supports the action
                    taken by the Clinical Director, or offers an alternative resolution.
                    <br /><br />
                    9. All clients who file a complaint or grievance will receive a written response on the Client Complaint/Grievance FollowUp Form from the staff member, supervisor, Director of Outreach or Clinical Director within 14 days of filing the
                    grievance (or appeal). A copy of the written complaint, grievance and/or appeal must be placed in the logbook as well
                    as in the client’s file.
                    <br /><br />
                    10. At least quarterly, the quality assurance team will conduct a review of all complaints, grievances, incidents, or
                    accidents involving clients to identify possible trends and to make recommendations to staff, as appropriate.
                    <br /><br />
                    (Patient Copy)
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CLIENT COMPLAINT/GRIEVANCE FORM
                </b>
            </div>
            <div className="mt-5 mb-5 p-0 border-2 border-primary">
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                        <div className="flex w-full md:w-2/3 lg:w-2/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Name of Person
                                Making Complaint:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='connsentsGrievanceName'
                                        placeholder="Type Name of Person Making Complaint"
                                        value={connsent.connsentsGrievanceName}
                                        onChange={(e) => ChangeFormValuesconnsent("connsentsGrievanceName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Date:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="connsentsGrievanceDate"
                                        value={connsent.connsentsGrievanceDate}
                                        onChange={(e: InputMaskChangeEvent) => ChangeFormValuesconnsent("connsentsGrievanceDate", e.target.value ?? "")}
                                        mask="99/99/9999"
                                        placeholder="Type date"
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/6 pl-5">
                                Regarding Client:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.client?.first_name} {clientInfo?.client?.last_name}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                            <div className="grid flex-grow w-2/6 pl-5">
                                Relationship to Client:
                            </div>
                            <div className="grid w-4/6 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='connsentsGrievanceRelationship'
                                        placeholder="Type Relationship"
                                        value={connsent.connsentsGrievanceRelationship}
                                        onChange={(e) => ChangeFormValuesconnsent("connsentsGrievanceRelationship", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/6 pl-5">
                                Other:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='connsentsGrievanceOther'
                                        placeholder="Type Other"
                                        value={connsent.connsentsGrievanceOther}
                                        onChange={(e) => ChangeFormValuesconnsent("connsentsGrievanceOther", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Phone:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputMask
                                            id="connsentsGrievancePhone"
                                            value={connsent.connsentsGrievancePhone}
                                            onChange={(e: InputMaskChangeEvent) => ChangeFormValuesconnsent("connsentsGrievancePhone", e.target.value ?? "")}
                                            mask="(999) 999-9999"
                                            placeholder="Type number"
                                            className="input input-ghost border-0 w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/4 lg:w-1/4 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Fax:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="connsentsGrievanceFax"
                                        value={connsent.connsentsGrievanceFax}
                                        onChange={(e: InputMaskChangeEvent) => ChangeFormValuesconnsent("connsentsGrievanceFax", e.target.value ?? "")}
                                        mask="(999) 999-9999"
                                        placeholder="Type number"
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full place-items-center">
                    <div className="w-full pl-4">
                        Nature of Complaint
                    </div>
                </div>
                <div className="w-full place-items-center">
                    <div className="grid w-full p-1 pl-2">
                        <div className="p-inputgroup flex-1">
                            <InputTextarea
                                value={connsent.connsentsGrievanceNature}
                                onChange={(e) => ChangeFormValuesconnsent("connsentsGrievanceNature", e.target.value)}
                                rows={5}
                                cols={30}
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND
                    DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT
                    CAREFULLY.
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    Our practice is dedicated to protecting your medical information. We are required by law to maintain the privacy
                    of protected health information and to provide you with this Notice of our legal duties and privacy practices with
                    respect to protected health information. Our practice is required by law to abide by the terms of this Notice.
                    <br /><br />
                    This Notice of Privacy Practices describes how we may use and disclose your protected health information to
                    carry out treatment, payment or health care operations and for other purposes that are permitted or required by
                    law. It also describes your rights to access and control your protected health information. Protected health
                    information is information about you, including demographic information, that may identify you and that relates
                    to your past, present or future physical or mental health or condition and related health care services.
                    <br /><br />
                    Our office is required to abide by the terms of this Notice of Privacy Practices. We may change the terms of our
                    notice, at any time. The new notice will be effective for all protected health information that we maintain at that
                    time. Upon your request, we will provide you with any revised Notice of Privacy Practices. To request a revised
                    notice you may call the office and request that a revised copy be sent to you in the mail or asking for one at the
                    time of your next appointment.
                    <br /><br />
                    <b>HOW YOUR MEDICAL INFORMATION WILL BE USED AND DISCLOSED:</b>
                    <br /><br />
                    We will use your medical information as part of rendering client care. For example, your medical information
                    may be used by the therapist, psychiatrist or case manager treating you, by the business office to process your
                    payment for the services rendered and in order to support the business activities of the practice, including, but
                    not limited to, use by administrative personnel reviewing the quality of the care you receive, employee review
                    activities, training of medical students, licensing, contacting or arranging for other business activities.
                    <br /><br />
                    We may also use and/or disclose your information in accordance with federal and state laws for the following
                    purposes:
                    <br />
                    <b className='border-b-2 border-primary'>Appointment Reminders</b>
                    <br />
                    We may contact you to provide appointment reminders.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Treatment Information</b>
                    <br />
                    We may contact you with information about treatment alternatives or other health-related benefits and
                    services that may be of interest to you.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Disclosure to Department of Health and Human Services</b>
                    <br />
                    We may disclose medical information when required by the United States Department of Health and Human
                    Services as part of an investigation or determination of our compliance with relevant laws.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Family and Friends</b>
                    <br />
                    Unless you object, we may disclose your medical information to family members, other relatives or
                    close personal friends when the medical information is directly relevant to that person’s involvement with your
                    care.
                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    <b className='border-b-2 border-primary'>Notification</b>
                    <br />
                    Unless you object, we may use or disclose your medical information to notify a family member, a personal
                    representative or another person responsible for your care of your location, general condition or death.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Disaster Relief</b>
                    <br />
                    We may disclose your medical information to a public or private entity, such as the American Red Cross, for
                    the purpose of coordinating with that entity to assist in disaster relief efforts.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Health Oversight Activities</b>
                    <br />
                    We may use or disclose your medical information for public health activities, including the reporting of disease,
                    injury, vital events and the conduct of public health surveillance, investigation and/or intervention. We may
                    disclose your medical information to a health oversight agency for oversight activities authorized by law,
                    including audits, investigations, inspections, licensure or disciplinary actions, administrative and/or legal
                    proceedings.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Abuse or Neglect</b>
                    <br />
                    We may disclose your medical information when it concerns abuse, neglect or violence to you in accordance
                    with federal and state law.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Legal Proceeding</b>
                    <br />
                    We may disclose your medical information in the course of certain judicial or administrative proceedings.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Law Enforcement</b>
                    <br />
                    We may disclose your medical information for law enforcement purposes or other specialized governmental
                    functions.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Coroners, Medical Examiners and Funeral Directors</b>
                    <br />
                    We may disclose your medical information to a coroner, medical examiner or a funeral director.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Organ Donation</b>
                    <br />
                    If you are an organ donor, we may disclose your medical information to an organ donation and procurement
                    organization.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Research</b>
                    <br />
                    We may use or disclose your medical information for certain research purposes if an Institutional Review Board
                    or a privacy board has altered or waived individual authorization, the review is preparatory to research or the
                    research is on only decedent’s information.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Public Safety</b>
                    <br />
                    We may use or disclose your medical information to prevent or lessen a serious threat to the health or safety of
                    another person or to the public.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Workers Compensation</b>
                    <br />
                    We may disclose your medical information as authorized by laws relating to workers compensation or similar
                    programs.
                    <br /><br />
                    <b className='border-b-2 border-primary'>Business Associates</b>
                    <br />
                    We may disclose your health information to a business associate with whom we contract to provide services on
                    our behalf. To protect your health information, we require our business associates to appropriately safeguard
                    the health information of our patients.
                    <br /><br />
                    (Patient Copy)

                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />

            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    <b className='border-b-2 border-primary'>AUTHORIZATIONS</b>
                    <br />
                    We will not use or disclose your medical information for any other purpose without your written
                    authorization. Once given, you may revoke your authorization in writing at any time. To request a Revocation
                    of Authorization form, you may contact:
                    <br /><br />
                    Privacy Officer<br />
                    Compliance Officer, ESEL AGUILAR<br />
                    Address: 12001 SW 128 CT S-101 Miami FL 33186<br />
                    Telephone: 964-860-7166<br />
                    <br /><br />
                    <b className='border-b-2 border-primary'>YOUR RIGHTS REGARDING YOUR MEDICAL INFORMATION</b>
                    <br />
                    You have the following rights with respect to your medical information:
                    <br /><br />
                    You may ask us to restrict certain uses and disclosures of your medical information. We are not required to
                    agree to your request, but if we do, we will honor it.
                    <br /><br />
                    You have the right to receive communications from us in a confidential manner.
                    <br /><br />
                    Generally, you may inspect and copy your medical information. This right is subject to certain
                    specific exceptions, and you may be charged a reasonable fee for any copies of your records.
                    <br /><br />
                    You may ask us to amend your medical information. We may deny your request for certain specific reasons. If
                    we deny your request, we will provide you with a written explanation for the denial and information
                    regarding further rights you may have at that point.
                    <br /><br />
                    You have the right to receive an accounting of the disclosures of your medical information made by our
                    practice during the last six years (or following August, 2020),except for disclosures for treatment, payment
                    or healthcare operations, disclosures which you authorized and certain other specific disclosure types.
                    You may request a paper copy of this Notice of Privacy Practices for Protected Health Information. You have
                    the right to complain to us and/or to the United States Department of Health and Human
                    <br /><br />
                    Services if you believe that we have violated your privacy rights. If you choose to file a complaint, you
                    will not be retaliated against in any way. To complain to us, please contact:
                    <br /><br />
                    Privacy Officer
                    <br />
                    Compliance Officer, ESEL AGUILAR<br />
                    Address: 12001 SW 128 CT S-101 Miami FL 33186<br />
                    Telephone: 954-860-7166
                    <br /><br />
                    <b className='border-b-2 border-primary'>REVISION OF NOTICE OF PRIVACY PRACTICES</b>
                    <br />
                    We reserve the right to change the terms of this Notice, making any revision applicable to all the protected
                    health information we maintain. If we revise the terms of this Notice, we will post a revised notice at our office
                    and will make paper copies of the revised Notice of Privacy Practices available upon request.

                    <br /><br />
                    (Patient Copy)

                </div>
            </div>

            <hr />
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                Outpatient Department
            </div>
            <ClientDate clientInfo={clientInfo} />
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>
                    CONSENT TO CASE MANAGEMENT SERVICES AND USE OF PHI
                </b>
            </div>
            <div className="mt-5 mb-5 p-0">
                <div className='text-justify'>
                    I acknowledge receipt of the Notice of Privacy Practices of SUNISS UP.I, undersigned client and or/legal
                    guardian, consent and authorize SUNISS UP to provide needed Targeted Case Management/
                    Therapeutic service coordination to the client. Service Coordination includes Targeted Case
                    Management and any Therapeutic services which meets the criteria set under the standards and
                    regulations of Medicaid Guidelines. I consent to the use and disclosure of protected health information
                    about Client for case management and therapeutic services coordination payment and health care
                    operations as described in the Notice of Privacy Practices. This means that information about Client’s
                    health will be used by the staff of SUNISS UP to obtain or disclosed to other Health/Mental Care
                    Provider or organizations whenever needed to:
                    <br /><br />
                    1.Client Arrange for payment of services<br />
                    2.Arrange for treatment by another health care provider.<br />
                    3.Operate the business of SUNISS UP.<br />
                    4.Enable other health care organizations or funding sources that provide treatment to Client or pay for services
                    to Client to review the quality and appropriateness of care Client receives and conduct other health care
                    operations.
                    <br /><br />
                    I have been informed of my right to make advance directives, including a Physician Directive (Living Will) and
                    a Power of Attorney for Health Care (Health Care Agent designation).
                    <br /><br />
                    <div className='flex w-full'>
                        <div className='w-2/4'>
                            <div className="flex align-items-center">
                                <RadioButton inputId="connsentsTCM1" name="connsentsTCM" value="1" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM", e.value)} checked={connsent.connsentsTCM === '1'} />
                                <label htmlFor="ingredient1" className="ml-2">
                                    I don't have Physician Directive.
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="connsentsTCM2" name="connsentsTCM" value="2" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM", e.value)} checked={connsent.connsentsTCM === '2'} />
                                <label htmlFor="ingredient2" className="ml-2">
                                    I want to complete a Physician Directive.
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="connsentsTCM3" name="connsentsTCM" value="3" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM", e.value)} checked={connsent.connsentsTCM === '3'} />
                                <label htmlFor="ingredient3" className="ml-2">
                                    I don't want to complete a Physician Directive.
                                </label>
                            </div>
                        </div>
                        <div className='w-2/4'>
                            <div className="flex align-items-center">
                                <RadioButton inputId="ingredient1" name="connsentsTCM1" value="1" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM1", e.value)} checked={connsent.connsentsTCM1 === '1'} />
                                <label htmlFor="connsentsTCM11" className="ml-2">
                                    I don't have a Power of Attorney for Health Care.
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="connsentsTCM12" name="connsentsTCM1" value="2" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM1", e.value)} checked={connsent.connsentsTCM1 === '2'} />
                                <label htmlFor="ingredient2" className="ml-2">
                                    I want to complete a Power of Attorney for Health Care.
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="connsentsTCM13" name="connsentsTCM1" value="3" onChange={(e) => ChangeFormValuesconnsent("connsentsTCM1", e.value)} checked={connsent.connsentsTCM1 === '3'} />
                                <label htmlFor="ingredient3" className="ml-2">
                                    I don't want to complete a Power of Attorney for Health Care.
                                </label>
                            </div>
                        </div>
                    </div>

                    <br /><br />
                    I understand that information disclosed pursuant to this authorization may be re-disclosed by the recipient of the
                    information. Most health care providers and all health benefit plans are required to follow federal and state laws
                    for the protection of the privacy of your medical information.
                    <br />
                    I understand that there is no time limit on this consent.
                    <br />
                    I also understand that I can revoke this consent at any time.
                    <br />
                    I am the client who is the subject of the health records that will be used or disclosed. I consent to case
                    management services, and I agree to the use and disclosure of my health information as described in this
                    consent

                </div>

                <div className="flex w-full mt-10">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsClientSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignClient(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsClientSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Client Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsGuardianSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignLegalGuardian(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsGuardianSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">
                        {clientInfo?.client?.legal_guardian}
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Legal Guardian Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Legal Guardian Name
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        {connsent.connsentsWitnessSign === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignWitness(true);
                                }}

                            />
                        ) : (
                            <div className="w-full flex text-center">

                                <img src={connsent.connsentsWitnessSign} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center">
                        <div className='text-center'>
                            {FormarDate(clientInfo?.client?.CreatedAt)}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Witness Name-Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        Relationship to Client
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 place-items-center border-t-2 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>
            </div>


            <ScrollTop target="parent" />
        </div>
    );

}
type Props = {
    relad(): void;
    clientInfo?: ClientInfo;
}
export { Connsents };