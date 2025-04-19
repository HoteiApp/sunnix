import { ScrollTop } from 'primereact/scrolltop';
import { ClientDate } from './clientDate';
import { HeaderDoc } from '../../commons'
import { ServiceCM } from '../../../models';
import { Block } from '../component/block';
import { ContentObserver } from "../../commons/ContentObserver";

type Props = {
    data?: ServiceCM;
    mr: number;
    lang: string;
    setSignClient(): void;
    setSignLegalGuardian(): void;
    scm?: ServiceCM;
    onContentChange: (content: string) => void;

}
const ProtectedHealth = ({ data, mr, scm, lang, setSignClient, setSignLegalGuardian, onContentChange }: Props) => {


    return (
        <Block active={scm?.status === "Open" ? true : false}>
            <ContentObserver onContentChange={onContentChange}>
                <div className="w-full p-0">

                    <HeaderDoc
                        PrimaryText='SUNISS UP'
                        SecondaryText='Outpatient Department'
                    />
                    <div className="m-0 p-0">

                        {/* row 1 */}
                        <ClientDate mr={mr} data={data} lang={lang} />
                        {/* row 2 */}

                        <div className='place-items-center text-center m-5'>
                            <b className='border-b-2 border-primary' style={{ fontSize: "24px" }}>{lang === "English" ? ("CONSENT FOR THE USE AND/OR DISCLOSURE OF PROTECTED HEALTH INFORMATION") : ("CONSENTIMIENTO PARA EL USO Y / O LA DIVULGACIÓN DE INFORMACIÓN MÉDICA")}</b>
                        </div>
                        {lang === "English" ? (
                            <div className='text-justify'>
                                I hereby give consent to SUNISS UP and all health care providers furnishing care within the practice to
                                use and disclose my protected health information for the purpose of treatment, payment, and health
                                care options. My “Protected Health Information” means health information, not including my
                                demographic information, collected from me and created or received by my therapist, psychiatrist or
                                case manager, a health plan, my employer or a health-care clearing house. This protected health
                                information related to my past, present or future or mental health or condition and identifies me, or there is
                                a reasonable basis to believe the information may
                                identify me. Please be advised that our Notice of Privacy Practices provides more detailed
                                information about how we may use and disclose your protected health information. You have the
                                right to review our Notice of Privacy Practices before you sign this consent. We reserve the right to
                                change the terms of our Notice of Privacy Practices. You may obtain a copy of the current notice by
                                contacting our Compliance Officer, at 954-860-7166. You have the right to request to restrict how we
                                use and disclose protected health information for the purpose of treatment, payment or health care
                                operations. We are not required to grant your request, but if we do, the
                                restriction will be binding on us. You may revoke this consent at any time. Your
                                revocation must be in writing, signed by you or on your behalf, and delivered to the above address. You
                                may deliver your revocation by any means you choose but it will be effective only when we actually receive
                                the revocation. Your revocation will not be effective to the extent that we or others have acted in reliance
                                upon this consent.
                            </div>
                        ) : (
                            <div className='text-justify'>
                                Yo doy consentimiento a SUNISS UP y todos los agentes de salud a suministrar dentro de la práctica de
                                usar y divulgar mi información protegida de salud con el propósito de tratamiento, pago, y las opciones
                                de cuidado de la salud. Mi "Información Protegida de Salud" significa información de salud, no incluyendo
                                mi información demográfica, por mí, y creada o recibida por mi terapeuta, psiquiatra o un administrador
                                de casos, un plan de salud, mi empleador o un centro de atención de salud. Esta información protegida de
                                salud relacionados con mi salud pasada, presente o futuro o mental o condición y me identifica, o que
                                existe una base razonable para creer que la información que pueda
                                identificarme. Tenga en cuenta que nuestro aviso de prácticas de privacidad proporciona información más
                                detallada acerca de cómo podemos utilizar y divulgar su información protegida de salud. Usted tiene el
                                derecho de revisar nuestra Notificación de Prácticas de Privacidad antes de firmar este consentimiento.
                                Nos reservamos el derecho a modificar los términos de nuestra Notificación de Prácticas de Privacidad.
                                Usted puede obtener una copia del aviso actual en contacto con nuestro Oficial de Cumplimiento,
                                en el 964-860-7166. Usted tiene el derecho de solicitar a restringir la manera en que utilizamos y
                                revelamos información de salud protegida con el fin de las operaciones de tratamiento, pago
                                o atención médica. No estamos obligados a conceder su petición, pero si lo hacemos, la
                                restricción será vinculante para nosotros. Usted puede revocar este consentimiento en cualquier
                                momento. Su revocación debe ser por escrito, firmada por usted o en su nombre, y entregado a la
                                dirección arriba indicada. Usted puede enviar su revocación por cualquier medio que usted elija, pero
                                que sólo será efectiva cuando en realidad reciben la revocación. Su revocación no será efectiva en la
                                medida en que nosotros u otros hayan actuado en este consentimiento.
                            </div>
                        )}


                        <div className="flex w-full mt-10">
                            <div className="w-1/5 place-items-center">
                                {data?.Demografic.legal_guardian === "" ? (
                                    data?.Demografic.sign_client === "" ? (
                                        <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                            setSignClient();
                                        }} />
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <div className='text-center'>
                                                <img src={data?.Demografic.sign_client} width={150} alt='sing' />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    data?.Demografic.sign_guardian === "" ? (
                                        <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                            setSignLegalGuardian();
                                        }} />
                                    ) : (
                                        <div className="w-full flex text-center">
                                            <img src={data?.Demografic.sign_guardian} width={150} alt='sing' />
                                        </div>
                                    )
                                )}

                            </div>
                            <div className="w-2/5 text-center ml-5 place-items-center">
                                <div className="flex items-end justify-center">
                                    <div className='text-center flex flex-col justify-end'>
                                        {data?.Demografic.legal_guardian === "" ? (<>{data?.Demografic.first_name} {data?.Demografic.last_name}</>) : (data?.Demografic.legal_guardian)}{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center">
                                <div className="flex items-end justify-center">
                                    <div className='text-center flex flex-col justify-end'>
                                        {data?.doa}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                                <b>{data?.Demografic.legal_guardian === "" ? (lang === "English" ? ("Client's Signature") : ("Firma del Cliente")) : (lang === "English" ? ("Legal Guardian Signature") : ("Firma del Tutor Legal"))}</b>
                            </div>
                            <div className="w-2/5 text-center place-items-center ml-5  border-t-2 border-primary">
                                <b>{data?.Demografic.legal_guardian === "" ? (lang === "English" ? ("Client's Name") : ("Nombre del Cliente")) : (lang === "English" ? ("Legal Guardian Name") : ("Nombre del Tutor Legal"))}</b>
                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center border-t-2 border-primary">
                                <div className='text-center'>
                                    <b>{lang === "English" ? ("Date") : ("Fecha")}</b>
                                </div>
                            </div>
                        </div>


                    </div>
                    <ScrollTop
                        target="parent"
                        pt={{
                            root: { className: 'bg-orange-400' }
                        }}
                    />
                </div>
            </ContentObserver >

        </Block>
    );

}

export { ProtectedHealth };