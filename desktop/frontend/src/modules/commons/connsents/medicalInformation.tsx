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

const MedicalInformation = ({ data, mr,lang, setSignClient, setSignLegalGuardian, onContentChange }: Props) => {

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
                            <b className='border-b-2 border-primary' style={{ fontSize: "24px" }}>{lang === "English" ? (
                                "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY."
                            ) : (
                                "ESTE AVISO DESCRIBE CÓMO SE PUEDE UTILIZAR Y DIVULGAR SU INFORMACIÓN MÉDICA Y CÓMO PUEDE OBTENER ACCESO A ESTA INFORMACIÓN. POR FAVOR, REVISARLO DETENIDAMENTE."
                            )}</b>
                        </div>
                        {lang === "English" ? (
                            <div className='text-justify'>
                                Our practice is dedicated to protecting your medical information. We are required by law to maintain the privacy
                                of protected health information and to provide you with this Notice of our legal duties and privacy practices with
                                respect to protected health information. Our practice is required by law to abide by the terms of this Notice.
                                <br />
                                <br />
                                This Notice of Privacy Practices describes how we may use and disclose your protected health information to
                                carry out treatment, payment or health care operations and for other purposes that are permitted or required by
                                law. It also describes your rights to access and control your protected health information. Protected health
                                information is information about you, including demographic information, that may identify you and that relates
                                to your past, present or future physical or mental health or condition and related health care services.
                                <br />
                                <br />
                                Our office is required to abide by the terms of this Notice of Privacy Practices. We may change the terms of our
                                notice, at any time. The new notice will be effective for all protected health information that we maintain at that
                                time. Upon your request, we will provide you with any revised Notice of Privacy Practices. To request a revised
                                notice you may call the office and request that a revised copy be sent to you in the mail or asking for one at the
                                time of your next appointment.
                                <br />
                                <br />
                                <b>HOW YOUR MEDICAL INFORMATION WILL BE USED AND DISCLOSED:</b>
                                <br />
                                <br />
                                We will use your medical information as part of rendering client care. For example, your medical information
                                may be used by the therapist, psychiatrist or case manager treating you, by the business office to process your
                                payment for the services rendered and in order to support the business activities of the practice, including, but
                                not limited to, use by administrative personnel reviewing the quality of the care you receive, employee review
                                activities, training of medical students, licensing, contacting or arranging for other business activities.
                                <br />
                                <br />
                                We may also use and/or disclose your information in accordance with federal and state laws for the following
                                purposes:
                                <br />
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
                                <b className='border-b-2 border-primary'>Family and Friends</b><br />
                                Unless you object, we may disclose your medical information to family members, other relatives or
                                close personal friends when the medical information is directly relevant to that person’s involvement with your
                                care.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Notification</b><br />
                                Unless you object, we may use or disclose your medical information to notify a family member, a personal
                                representative or another person responsible for your care of your location, general condition or death.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Disaster Relief</b><br />
                                We may disclose your medical information to a public or private entity, such as the American Red Cross, for
                                the purpose of coordinating with that entity to assist in disaster relief efforts.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Health Oversight Activities</b><br />
                                We may use or disclose your medical information for public health activities, including the reporting of disease,
                                injury, vital events and the conduct of public health surveillance, investigation and/or intervention. We may
                                disclose your medical information to a health oversight agency for oversight activities authorized by law,
                                including audits, investigations, inspections, licensure or disciplinary actions, administrative and/or legal
                                proceedings.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Abuse or Neglect</b><br />
                                We may disclose your medical information when it concerns abuse, neglect or violence to you in accordance
                                with federal and state law.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Legal Proceeding</b><br />
                                We may disclose your medical information in the course of certain judicial or administrative proceedings.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Law Enforcement</b><br />
                                We may disclose your medical information for law enforcement purposes or other specialized governmental
                                functions.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Coroners, Medical Examiners and Funeral Directors</b><br />
                                We may disclose your medical information to a coroner, medical examiner or a funeral director.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Organ Donation</b><br />
                                If you are an organ donor, we may disclose your medical information to an organ donation and procurement
                                organization.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Research</b><br />
                                We may use or disclose your medical information for certain research purposes if an Institutional Review Board
                                or a privacy board has altered or waived individual authorization, the review is preparatory to research or the
                                research is on only decedent’s information.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Public Safety</b><br />
                                We may use or disclose your medical information to prevent or lessen a serious threat to the health or safety of
                                another person or to the public.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Workers Compensation</b><br />
                                We may disclose your medical information as authorized by laws relating to workers compensation or similar
                                programs.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Business Associates</b><br />
                                We may disclose your health information to a business associate with whom we contract to provide services on
                                our behalf. To protect your health information, we require our business associates to appropriately safeguard
                                the health information of our patients.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>AUTHORIZATIONS:</b><br />
                                We will not use or disclose your medical information for any other purpose without your written
                                authorization. Once given, you may revoke your authorization in writing at any time. To request a Revocation
                                of Authorization form, you may contact:
                                <br />
                                <br />
                                Privacy Officer
                                <br />
                                Compliance Officer, ESEL AGUILAR
                                <br />
                                Address: 12001 SW 128 CT S-101 Miami FL 33186
                                <br />
                                Telephone: 964-860-7166
                                <br /><br />
                                <b className='border-b-2 border-primary'>YOUR RIGHTS REGARDING YOUR MEDICAL INFORMATION:</b><br />
                                You have the following rights with respect to your medical information:
                                <br /> <br />
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
                                <br />
                                <br />
                                Privacy Officer
                                <br />
                                Compliance Officer, ESEL AGUILAR
                                <br />
                                Address: 12001 SW 128 CT S-101 Miami FL 33186
                                <br />
                                Telephone: 964-860-7166
                                <br /><br />
                                <b className='border-b-2 border-primary'>REVISION OF NOTICE OF PRIVACY PRACTICES</b><br />
                                We reserve the right to change the terms of this Notice, making any revision applicable to all the protected
                                health information we maintain. If we revise the terms of this Notice, we will post a revised notice at our office
                                and will make paper copies of the revised Notice of Privacy Practices available upon request.
                            </div>
                        ) : (
                            <div className='text-justify'>
                                Nuestra práctica está dedicada a proteger su información médica. Estamos obligados por ley a mantener la privacidad.
                                de información de salud protegida y para proporcionarle este Aviso de nuestros deberes legales y prácticas de privacidad con
                                respecto a la información de salud protegida. Nuestra práctica está obligada por ley a cumplir con los términos de este Aviso.
                                <br />
                                <br />
                                Este Aviso de prácticas de privacidad describe cómo podemos usar y divulgar su información de salud protegida a
                                realizar tratamientos, pagos u operaciones de atención médica y para otros fines que estén permitidos o requeridos por
                                ley. También describe sus derechos de acceso y control de su información médica protegida. Salud protegida
                                La información es información sobre usted, incluida información demográfica, que puede identificarlo y que se relaciona
                                a su salud o condición física o mental pasada, presente o futura y a los servicios de atención médica relacionados.
                                <br />
                                <br />
                                Nuestra oficina debe cumplir con los términos de este Aviso de prácticas de privacidad. Podemos cambiar los términos de nuestro
                                aviso, en cualquier momento. El nuevo aviso será efectivo para toda la información de salud protegida que mantenemos en ese
                                tiempo. Si lo solicita, le proporcionaremos cualquier Aviso de prácticas de privacidad revisado. Para solicitar una revisión
                                aviso, puede llamar a la oficina y solicitar que se le envíe una copia revisada por correo o solicitar una en el
                                hora de su próxima cita.
                                <br />
                                <br />
                                <b>CÓMO SE UTILIZARÁ Y DIVULGARA SU INFORMACIÓN MÉDICA:</b>
                                <br />
                                <br />
                                Usaremos su información médica como parte de brindar atención al cliente. Por ejemplo, su información médica.
                                puede ser utilizado por el terapeuta, psiquiatra o administrador de casos que lo trata, por la oficina comercial para procesar su
                                pago por los servicios prestados y para apoyar las actividades comerciales de la práctica, incluyendo, pero
                                entre otros, uso por parte del personal administrativo que revisa la calidad de la atención que recibe, revisión de los empleados
                                actividades, capacitación de estudiantes de medicina, concesión de licencias, contacto u organización de otras actividades comerciales.
                                <br />
                                <br />
                                También podemos usar y/o divulgar su información de acuerdo con las leyes federales y estatales para lo siguiente
                                propósitos:
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Recordatorios de citas</b>
                                <br />
                                Es posible que nos comuniquemos con usted para brindarle recordatorios de citas.
                                <br /><br />
                                <b className='border-b-2 border-primary'>Información del tratamiento</b>
                                <br />
                                Podemos comunicarnos con usted para brindarle información sobre alternativas de tratamiento u otros beneficios relacionados con la salud y
                                servicios que puedan ser de su interés.
                                <br /><br />
                                <b className='border-b-2 border-primary'>Divulgación al Departamento de Salud y Servicios Humanos</b>
                                <br />
                                Podemos divulgar información médica cuando lo requiera el Departamento de Salud y Derechos Humanos de los Estados Unidos.
                                Servicios como parte de una investigación o determinación de nuestro cumplimiento de las leyes pertinentes.
                                <br /><br />
                                <b className='border-b-2 border-primary'>Familiares y amigos</b><br />
                                A menos que usted se oponga, podemos divulgar su información médica a familiares, otros parientes o
                                amigos personales cercanos cuando la información médica es directamente relevante para la participación de esa persona en su
                                cuidado.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Notificación</b><br />
                                A menos que usted se oponga, podemos usar o divulgar su información médica para notificar a un miembro de la familia, una persona
                                representante u otra persona responsable de su cuidado de su ubicación, condición general o muerte.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Ayuda en casos de desastre</b><br />
                                Podemos divulgar su información médica a una entidad pública o privada, como la Cruz Roja Americana, para
                                con el propósito de coordinar con esa entidad para ayudar en los esfuerzos de socorro en casos de desastre.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Actividades de supervisión de la salud</b><br />
                                Podemos usar o divulgar su información médica para actividades de salud pública, incluida la notificación de enfermedades,
                                lesiones, acontecimientos vitales y la realización de actividades de vigilancia, investigación y/o intervención en salud pública. Podemos
                                divulgar su información médica a una agencia de supervisión de la salud para actividades de supervisión autorizadas por la ley,
                                incluyendo auditorías, investigaciones, inspecciones, licencias o acciones disciplinarias, administrativas y/o legales.
                                actas.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Abuso o negligencia</b><br />
                                Podemos divulgar su información médica cuando se trate de abuso, negligencia o violencia hacia usted de acuerdo
                                con las leyes federales y estatales.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Procedimiento Legal</b><br />
                                Podemos divulgar su información médica en el curso de ciertos procedimientos judiciales o administrativos.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Aplicación de la ley</b><br />
                                Podemos divulgar su información médica para fines policiales u otros fines gubernamentales especializados.
                                funciones.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Forenses, médicos forenses y directores de funerarias</b><br />
                                Podemos divulgar su información médica a un forense, médico forense o director de funeraria.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Donación de órganos</b><br />
                                Si es donante de órganos, podemos divulgar su información médica a una organización de donación y obtención de órganos.
                                organización.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Investigación</b><br />
                                Podemos usar o divulgar su información médica para ciertos fines de investigación si una Junta de Revisión Institucional
                                o una junta de privacidad ha alterado o renunciado a la autorización individual, la revisión es preparatoria para la investigación o la
                                la investigación se basa únicamente en la información del difunto.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Seguridad pública</b><br />
                                Podemos usar o divulgar su información médica para prevenir o disminuir una amenaza grave a la salud o seguridad de
                                otra persona o al público.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Compensación para trabajadores</b><br />
                                Podemos divulgar su información médica según lo autorizado por las leyes relacionadas con la compensación laboral o similares.
                                programas.
                                <br />
                                <br />
                                <b className='border-b-2 border-primary'>Socios comerciales</b><br />
                                Podemos divulgar su información de salud a un socio comercial con quien contratamos para brindar servicios en
                                nuestro nombre. Para proteger su información de salud, requerimos que nuestros socios comerciales protejan adecuadamente
                                la información de salud de nuestros pacientes.
                                <br />
                                <br />
                                Oficial de Privacidad
                                <br />
                                Oficial de Cumplimiento, ESEL AGUILAR
                                <br />
                                Dirección: 12001 SW 128 CT S-101 Miami FL 33186
                                <br />
                                Teléfono: 964-860-7166
                                <br /><br />
                                <b className='border-b-2 border-primary'>SUS DERECHOS CON RESPECTO A TU INFORMACIÓN MÉDICA:</b><br />
                                Usted tiene los siguientes derechos con respecto a su información médica:
                                <br /> <br />
                                Puede solicitarnos que restrinjamos ciertos usos y divulgaciones de su información médica. No estamos obligados a
                                Aceptamos su solicitud, pero si lo hacemos, la cumpliremos.
                                <br /><br />
                                Tiene derecho a recibir comunicaciones nuestras de forma confidencial.
                                <br /><br />
                                Generalmente, puede inspeccionar y copiar su información médica. Este derecho está sujeto a ciertas
                                excepciones específicas, y es posible que se le cobre una tarifa razonable por cualquier copia de sus registros.
                                <br /><br />
                                Puede solicitarnos que modifiquemos su información médica. Podemos rechazar su solicitud por ciertos motivos específicos. Si
                                Si rechazamos su solicitud, le proporcionaremos una explicación por escrito del rechazo e información.
                                con respecto a otros derechos que pueda tener en ese momento.
                                <br /><br />
                                Usted tiene derecho a recibir un informe de las divulgaciones de su información médica realizadas por nuestro
                                práctica durante los últimos seis años (o después de agosto de 2020), excepto las divulgaciones para tratamiento, pago
                                u operaciones de atención médica, divulgaciones que usted autorizó y otros tipos de divulgación específicos.
                                Puede solicitar una copia impresa de este Aviso de prácticas de privacidad para información médica protegida. Tienes
                                el derecho a presentar una queja ante nosotros y/o ante el Departamento de Salud y Servicios Humanos de los Estados Unidos.
                                <br /><br />
                                Servicios si cree que hemos violado sus derechos de privacidad. Si decide presentar una queja, usted
                                no sufrirá represalias de ninguna manera. Para presentar una queja con nosotros, comuníquese con:
                                <br />
                                <br />
                                Oficial de Privacidad
                                <br />
                                Oficial de Cumplimiento, ESEL AGUILAR
                                <br />
                                Dirección: 12001 SW 128 CT S-101 Miami FL 33186
                                <br />
                                Teléfono: 964-860-7166
                                <br /><br />
                                <b className='border-b-2 border-primary'>REVISIÓN DEL AVISO DE PRÁCTICAS DE PRIVACIDAD</b><br />
                                Nos reservamos el derecho de cambiar los términos de este Aviso, haciendo que cualquier revisión sea aplicable a todos los derechos protegidos.
                                información de salud que mantenemos. Si revisamos los términos de este Aviso, publicaremos un aviso revisado en nuestra oficina.
                                y pondrá a disposición copias impresas del Aviso de prácticas de privacidad revisado, previa solicitud.

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

export { MedicalInformation };