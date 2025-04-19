import { ScrollTop } from 'primereact/scrolltop';
import { ClientDate } from './clientDate';
import { ServiceCM } from '../../../models';
import { HeaderDoc } from '../../commons'
import { Block } from '../component/block';
import { ContentObserver } from "../../commons/ContentObserver";

type Props = {
    data?: ServiceCM;
    mr: number;
    lang: string;
    setSignClient(): void;
    setSignLegalGuardian(): void;
    onContentChange: (content: string) => void;
}

const ClientRights = ({ data, mr, lang, setSignClient, setSignLegalGuardian, onContentChange }: Props) => {
    return (
        <Block active={false}>
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
                            <b className='border-b-2 border-primary' style={{ fontSize: "24px" }}>{lang === "English" ? ("CLIENT'S RIGHTS") : ("DERECHOS DEL CLIENTE")}</b>
                        </div>
                        {lang === "English" ? (
                            <div className='text-justify'>
                                As an individual and as a client of SUNISS UP , you have rights: We, the professional staff, recognize and respect these
                                rights. If at any time you feel that any of your rights have violated, you should contact your therapist, who will act as your
                                advocate. Your advocate shall investigate, examine and see to remedy any conditions and practices which are felt to limit
                                your rights. If you feel that the issue is not resolved with your therapist, you may contact the SUNISS UP office
                                in order to file a complaint/grievance verbally in writing. The SUNISS UP  office telephone number is 964-860-7166
                                <br />
                                <div className='w-full'>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>1. </b></div>
                                        <div className='w-full'>
                                            The agency recognizes and respects the dignity of each client as an individual and a human being. Every client
                                            has the right to the same consideration and treatment regardless of race, religion, national origin, age, sex,
                                            political affiliation, sexual orientation, financial status or disability.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>2. </b></div>
                                        <div className='w-full'>
                                            The agency accommodates the written and oral communication needs of clients served. The agency employs a
                                            sufficient number of bilingual personnel for all programs and/or populations in which confidential interpersonal
                                            communication is necessary for adequate service delivery.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>3. </b></div>
                                        <div className='w-full'>
                                            The client has the right to receive services in a non-discriminatory manner.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>4. </b></div>
                                        <div className='w-full'>
                                            The client has the right to freedom of thought, conscience and religion, including the right to express and practice
                                            religious and spiritual beliefs.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>5. </b></div>
                                        <div className='w-full'>
                                            The client has the right to care for himself/herself as fully as he/she can and the right to receive from the agency
                                            whatever care is needed.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>6. </b></div>
                                        <div className='w-full'>
                                            The client has the right to receive prompt evaluation and treatment.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>7. </b></div>
                                        <div className='w-full'>
                                            The client is encouraged to ask his/her therapist and his/her problems, plans for his/her treatment, approximate
                                            length of stay, the outcome foreseen, discharge plans and continued care plans.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>8. </b></div>
                                        <div className='w-full'>
                                            The therapist will ask the client to participate in the formulation of and the review of the client's treatment plan and
                                            in making improvements upon it as the client's treatment progress.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>9. </b></div>
                                        <div className='w-full'>
                                            The client will receive information about the basic expectations for use of the organization's services, hours that
                                            services are available, rules, expectations, and other factors that can result in discharge or termination of
                                            Services.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>10. </b></div>
                                        <div className='w-full'>
                                            The client will be treated under the least restrictive conditions with his/her condition, and he /she shall not be
                                            subjected to restraint or seclusion.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>11. </b></div>
                                        <div className='w-full'>
                                            The agency recognizes and respects the client's right to confidentiality. The agency recognizes and respects the
                                            client's right to confidentiality. The agency will keep all information about the client as confidential as the law
                                            allows.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>12. </b></div>
                                        <div className='w-full'>
                                            The agency will not release any information about the client without written permission from the client or his/her
                                            legal guardian or a court order.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>13. </b></div>
                                        <div className='w-full'>
                                            The client will not be the subject of experimental or investigative research without prior written and informed
                                            consent.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>14. </b></div>
                                        <div className='w-full'>
                                            The client will be afforded an opportunity to have access to consultation with a private physician at his/her own
                                            expense, in the case of hazardous treatment, the client may have upon request an impartial review prior to
                                            Implementation except in the case of emergency procedures required for the preservation of the client's health.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>15. </b></div>
                                        <div className='w-full'>
                                            The client will have the right to refuse any service, treatment, or medication, unless mandated by law or court
                                            order, and the client will be informed about the consequences of such refusal, which can include discharge.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>16. </b></div>
                                        <div className='w-full'>
                                            The client will not be required to perform services for SUNISS UP that are not included for therapeutic purposes
                                            in the client's plan for care.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>17. </b></div>
                                        <div className='w-full'>
                                            Withstanding other provisions of law, the client may not have access to their clinical records unless his/her
                                            physician feels that such access is consistent with his/her condition and treatment plan. This will be documented
                                            by the physician in the client's clinical record.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>18. </b></div>
                                        <div className='w-full'>
                                            The agency will encourage and assist the client to understand and Exercise his/her client's rights to voice
                                            grievances, make complaints or appeals and recommend changes in policies and services to staff. In addition, the
                                            client has the right to an impartial review of violations of his/her rights assured under this section and the client will
                                            be free from restraint, interference, coercion, discrimination and reprisal. The client also has the right of access to
                                            legal counsel.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>19. </b></div>
                                        <div className='w-full'>
                                            The client has the right to report physical and/or sexual abuse, neglect, or domestic violence to the 1-800-96-
                                            ABUSE hotline.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-justify'>
                                Como individuo y como cliente de SUNISS UP , usted tiene derechos. Nosotros como personal profesional,
                                reconocemos el respeto de estos derechos. Si usted en cualquier momento siente que sus derechos son violados, usted
                                debe ponerse en contacto con su terapeuta, quien actuará como su defensor. Su defensor deberá investigar, examinar y
                                ver, para poner remedio a las condiciones y prácticas que se dejan sentir en el límite de sus derechos. Si usted cree que el
                                problema no se resuelve con su terapeuta, puede ponerse en contacto con la oficina con el fin de presentar
                                una reclamación, queja verbalmente o por escrito. El número de teléfono de la oficina de SUNISS UP es 964-860-7166.
                                <br />
                                <div className='w-full'>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>1. </b></div>
                                        <div className='w-full'>
                                            La agencia reconoce y respeta la dignidad de cada cliente como individuo y como persona. Cada cliente tiene
                                            derecho a la misma consideración y tratamiento, independientemente de su raza, religión, origen nacional, edad,
                                            sexo, afiliación política, orientación sexual, situación económica o discapacidad.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>2. </b></div>
                                        <div className='w-full'>
                                            La agencia ayudará a las necesidades de usted, ya sean escritas o verbales para un buen servicio. La compañía
                                            cuenta con un número suficiente de personal bilingüe, para todos los programas y/o poblaciones en la cual es
                                            necesario la confidencialidad interpersonal para entrega de servicio adecuado.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>3. </b></div>
                                        <div className='w-full'>
                                            Usted tiene el derecho de recibir los servicios sin ninguna discriminación.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>4. </b></div>
                                        <div className='w-full'>
                                            Usted tiene derecho de libertad de expresión, principios y religión incluyendo el
                                            derecho de expresar, o practicar creencias religiosas y espirituales.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>5. </b></div>
                                        <div className='w-full'>
                                            Usted tiene el derecho de cuidar de su persona tan completamente como usted pueda y el derecho de recibir de
                                            nosotros todo el cuidado que sea necesario.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>6. </b></div>
                                        <div className='w-full'>
                                            Usted tiene el derecho de recibir pronta evaluación y tratamiento.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>7. </b></div>
                                        <div className='w-full'>
                                            Le sugerimos a obtener de su terapeuta y psiquiatra una evaluación completa de sus problemas, planes para su
                                            tratamiento, resultados de la evaluación, tiempo aproximado de estadía, plan de salida y de cuidado continuo.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>8. </b></div>
                                        <div className='w-full'>
                                            Le pediremos a usted. que participe con nosotros en la formulación y la revisión del tratamiento para mejorar el
                                            progreso.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>9. </b></div>
                                        <div className='w-full'>
                                            Usted recibirá información acerca de las expectativas básicas para el uso de los servicios de la organización,
                                            horarios en que los servicios están disponibles, normas, expectativas u otros factores que pueden resultar en la
                                            aprobación de la gestión o la cancelación de sus servicios.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>10. </b></div>
                                        <div className='w-full'>
                                            Usted será tratado bajo la menor condición restrictivita, y no le sujetaremos con métodos de alojamiento o reclusión.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>11. </b></div>
                                        <div className='w-full'>
                                            Reconocemos y respetamos el derecho de la confidencialidad, desde luego que se mantendrá toda la información
                                            sobre usted tan confidencial como la ley lo permite.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>12. </b></div>
                                        <div className='w-full'>
                                            La agencia no divulgará ninguna información sobre el cliente sin la autorización escrita del cliente, guardián legal o
                                            una orden judicial.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>13. </b></div>
                                        <div className='w-full'>
                                            Usted no será objeto de ninguna experimentación o investigación sin consentimiento anteriormente escrito o sin ser
                                            informado.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>14. </b></div>
                                        <div className='w-full'>
                                            Al cliente se le ofrece la oportunidad de tener acceso a la consulta con un médico privado en su propio costo, en el
                                            caso de tratamiento de residuos peligrosos, usted puede obtener la petición de una revisión imparcial antes de poner
                                            en práctica el tratamiento, excepto en el caso de los procedimientos de emergencia requeridos para la preservación
                                            de su salud.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>15. </b></div>
                                        <div className='w-full'>
                                            Usted tendrá el derecho de rechazar cualquier servicio, tratamientos o medicina, al menos que sea requerido por la
                                            ley o una orden de la corte. Usted será informado de las consecuencias de dicho rechazo la cual puede incluír, la
                                            cancelación de los servicios.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>16. </b></div>
                                        <div className='w-full'>
                                            Usted no estara obligado a realizar ningún servicio para SUNISS UP que no sean los incluídos para los
                                            propósitos terapeuticos en su plan de cuidado.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>17. </b></div>
                                        <div className='w-full'>
                                            Procediendo a las demás disposiciones de la ley, el cliente no podrá tener acceso a su historial a menos que su
                                            médico considere que dicho acceso es coherente con su condición y plan de tratamiento. Esto será documentado por
                                            el médico en el expediente clínico.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>18. </b></div>
                                        <div className='w-full'>
                                            La agencia fomentará y ayudará al cliente a entender y ejercer sus derechos de expresar sus quejas, hacer
                                            denuncias ó apelaciones y recomendar cambios en los procedimientos de los servicio al personal. Además, el cliente
                                            tiene derecho a una revisión imparcial de las violaciónes los derechos garantizados en esta sección y el cliente
                                            estará libre de restricción, interferencia, coerción, discriminación y represalias. El cliente también tiene el derecho de
                                            acceso a un abogado.
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='pl-5'><b className='pr-5'>19. </b></div>
                                        <div className='w-full'>
                                            Usted tiene derecho de reportar cualquier abuso físico y/ó sexual, negligencia ó violencia doméstica al teléfono
                                            directo: 1-800-96-ABUSE.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="flex w-full mt-10">
                            {/* firma del cliente */}
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
                            {/* nombre del cliente */}
                            <div className="w-2/5 ml-5 content-end">
                                <div className="flex justify-center">
                                    <div className='text-center'>
                                        {data?.Demografic.legal_guardian === "" ? (<>{data?.Demografic.first_name} {data?.Demografic.last_name}</>) : (data?.Demografic.legal_guardian)}{" "}
                                    </div>
                                </div>
                            </div>
                            {/* div vacio */}
                            <div className="w-1/5">
                            </div>
                            {/* fecha */}
                            <div className="w-1/5 place-items-center content-end">
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
                            <div className="w-2/5 text-center place-items-center ml-5 border-t-2 border-primary">
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
                        threshold={100}
                    />

                </div>
            </ContentObserver >
        </Block>
    );

}

export { ClientRights };