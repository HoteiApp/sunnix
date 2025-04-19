import { ScrollTop } from 'primereact/scrolltop';
import { ClientDate } from './clientDate';
import { ServiceCM } from '../../../models';
import { HeaderDoc } from '../../commons'
import { Block } from '../component/block';
import { ContentObserver } from "../../commons/ContentObserver";

type Props = {
    data?: ServiceCM;
    mr: number
    lang: string;
    setSignClient(): void;
    setSignLegalGuardian(): void;
    scm?: ServiceCM;
    onContentChange: (content: string) => void;

}

const InformedConnsent = ({ data, mr, scm, lang, setSignClient, setSignLegalGuardian, onContentChange }: Props) => {

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
                            <b className='border-b-2 border-primary' style={{ fontSize: "24px" }}>{lang === "English" ? ("INFORMED CONSENT") : ("CONSENTIMENTO INFORMADO")}</b>
                        </div>
                        {lang === "English" ? (
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
                        ) : (
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
                            <div className="w-1/5 place-items-end">
                                <div className="flex justify-center">
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
            </ContentObserver>

        </Block>
    );

}
export { InformedConnsent };