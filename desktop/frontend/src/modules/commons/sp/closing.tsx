import React, { useEffect, useState, useRef } from 'react';
import { classNames } from "primereact/utils";
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { BlockUI } from 'primereact/blockui';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Checkbox } from 'antd';
import { Dropdown } from 'primereact/dropdown';
import { Chip } from 'primereact/chip';
import html2pdf from 'html2pdf.js';
import SignatureCanvas, { SignatureCanvasRef } from 'react-signature-canvas';
import { useCoreRequestEditSCMSpInitial } from "../../profile/hooks";
import { Goals } from './utils/goals';
import { CheckMarkSimple } from './utils/checkMarkSimple';
import { count } from 'console';
import { HeaderDoc } from "../../commons"
import { SpState } from './utils/initialize';

import { ServiceCM, FormValueSpInitialAddendums, DiagnosticTable } from '../../../models';
// Define la función fuera del componente principal



type Props = {
    relad(): void;
    mr?: number;
    scm?: ServiceCM;
    view: string;
}

const Closing = ({ scm, mr, relad, view }: Props) => {
    const { requestEditSp, isUpdatingRequestSp } = useCoreRequestEditSCMSpInitial(relad);
    const [signTCM, setSignTCM] = useState<boolean>(false);
    const signatureTCM = useRef<SignatureCanvasRef>(null);
    const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
    const handleDownloadPDF = () => {
        // const modalContent = document.getElementById('pdf-HANDBOOK'); // Reemplaza 'modal-content' con el ID del elemento que contiene el contenido del modal
        const pages = document.querySelectorAll('.page'); // Selecciona todas las capas
        const combinedContent = document.createElement('div');

        Array.from(pages).forEach((page) => {
            combinedContent.appendChild(page.cloneNode(true)); // Clona el contenido de cada capa y lo agrega al elemento combinado
        });

        html2pdf().from(combinedContent).toPdf().save('document.pdf');
    };
    // -----------
    const goal1aSubcategory = useRef<OverlayPanel>(null);
    const goal1fSubcategory = useRef<OverlayPanel>(null);
    // const goal2aSubcategory = useRef<OverlayPanel>(null);
    const goal2dSubcategory = useRef<OverlayPanel>(null);
    const goal2eSubcategory = useRef<OverlayPanel>(null);
    const goal3aSubcategory = useRef<OverlayPanel>(null);
    const goal3bSubcategory = useRef<OverlayPanel>(null);
    const goal3cSubcategory = useRef<OverlayPanel>(null);
    const goal3dSubcategory = useRef<OverlayPanel>(null);
    // const goal3fSubcategory = useRef<OverlayPanel>(null);
    const goal6aSubcategory = useRef<OverlayPanel>(null);
    const goal7bSubcategory = useRef<OverlayPanel>(null);
    const goal7eSubcategory = useRef<OverlayPanel>(null);

    // -----------

    const [saveSP, setSaveSp] = useState<boolean>(false);
    // ---------------------------
    // 1 - Psychological 
    const [goal1a, setGoal1a] = useState<boolean>(false);
    const [goal1f, setGoal1f] = useState<boolean>(false);
    const [goal2d, setGoal2d] = useState<boolean>(false);
    const [goal2e, setGoal2e] = useState<boolean>(false);
    const [goal3a, setGoal3a] = useState<boolean>(false);
    const [goal3b, setGoal3b] = useState<boolean>(false);
    const [goal3c, setGoal3c] = useState<boolean>(false);
    const [goal3d, setGoal3d] = useState<boolean>(false);
    const [goal6a, setGoal6a] = useState<boolean>(false);
    const [goal7b, setGoal7b] = useState<boolean>(false);
    const [goal7e, setGoal7e] = useState<boolean>(false);

    const { sp, setSp } = SpState(scm);

    const changeSp = <T extends string | boolean>(name: keyof FormValueSpInitialAddendums, value: T) => {
        setSp(prevState => ({
            ...prevState,
            [name]: value
        }));
        setVisibleBtnSave(true);
        setSaveSp(true);
        return sp
    };

    const handleButtonClick = () => {
        if (saveSP) {
            requestEditSp({ requestSP: sp });
            setSaveSp(false);
        }
        relad();
        setVisibleBtnSave(false);
    };
    // -------------------
    // -- Modificar la asignacion de Goals
    const [selected, setSelected] = useState<number>(0);
    const changeGoal = (<T extends string | boolean>(fieldName: keyof FormValueSpInitialAddendums, value: T, countTrue: number, formState: FormValueSpInitialAddendums, setFormState: React.Dispatch<React.SetStateAction<FormValueSpInitialAddendums>>) => {
        // Comprobar y contar cuántos campos ya están en true
        for (const key in formState) {
            if (key === fieldName) {
                const value = !formState[key];
                setFormState((prevState) => ({ ...prevState, [key]: value }));
                if (value === true) {
                    countTrue++;
                } else {
                    countTrue--;
                }
            }
        }
        if (countTrue < 0) {
            setSelected(0);
        } else {
            setSelected(countTrue);
        }
        // Actualizar los tipos según la lógica establecida
        const typeFieldName = `${fieldName}Type` as keyof FormValueSpInitialAddendums;

        setSp((prevState) => ({
            ...prevState,
            [fieldName]: value,
            // Verificar si el campo modificado es goal1-8a-q y el valor de selected es menor que 10
            ...(fieldName.startsWith('goal') && selected <= 4 ? { [typeFieldName]: value === true ? 'addendoms' : '' } : {}),
        }));
        setSaveSp(true);
        setVisibleBtnSave(true);
        return sp
    });

    const HeaderPage = (
        <div>
            {/* row 1 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-primary">
                    <div className="flex w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5 pr-5">
                            <b className='mr-5'>Client’s Name:</b> {scm?.Demografic.first_name} {scm?.Demografic.last_name}
                        </div>
                    </div>
                    <div className="border-b-2 border-l-2 border-r-2 border-primary md:border-b-0 lg:border-b-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>MR #:</b> {mr} &nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                    <div className="flex w-1/4 place-items-center">
                        <div className="flex w-full pl-5">
                            <b className='mr-5'>Date of Admission:</b> {scm?.doa}
                        </div>
                    </div>
                </div>
            </div>
            {/* row 2 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-2/4 border-b-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5">
                            <b className='mr-5'>TCM:</b> {scm?.tcm.full_name}
                        </div>
                    </div>
                    <div className="w-2/4 border-b-2 border-l-2 border-primary md:border-b-0 lg:border-b-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>Initial SP Development Date:</b>
                                {sp.developmentDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* row 3 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full">
                    <div className="flex w-2/4 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5">

                        </div>
                    </div>
                    <div className="w-2/4 border-primary border-2 border-t-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>Service Plan closing Date:</b>
                                {/* <InputMask
                                    id="Target"
                                    value={sp.developmentDate}
                                    onChange={(e) => changeSp("developmentDate", e.target.value ?? "")}
                                    mask="99/99/9999"

                                    placeholder="Type Date"
                                    className="input input-ghost border-0 text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0, height: "30px", borderRadius: 0 }}
                                /> */}
                                {/* TODO cambiar a el campo de fecha closing */}
                                {sp.developmentDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* row 4 */}
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full">
                    <div className="flex w-2/4 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5">

                        </div>
                    </div>
                    <div className="w-2/4 border-primary border-2 border-t-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>Closing SP closing Date:</b>
                                <InputMask
                                    id="Target"
                                    value={sp.developmentDate}
                                    onChange={(e) => changeSp("developmentDate", e.target.value ?? "")}
                                    mask="99/99/9999"

                                    placeholder="Type Date"
                                    className="input input-ghost border-0 text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0, height: "30px", borderRadius: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
    // ---------------------------
    const footerSign = (
        <div className="m-0 pt-5 w-full">
            <div className='flex overflow-y-auto'>
                {/* {visibleBtnSave && <Button label="SAVE" icon="pi pi-save" className="mr-2 p-button-warning" onClick={() => handleButtonClick()} />} */}
                {/* {requestCertification.signTcm !== "" && */}
                <Button
                    label="SAVE"
                    icon="pi pi-save"
                    className="mr-2 p-button-warning"
                    onClick={() => {
                        setSignTCM(false);
                        // requestEditAssessment({ requestAssessment: assessment });
                    }}
                />
                {/* } */}
            </div>
        </div>

    );


    useEffect(() => {
        const goalSettings = [
            { object: scm?.sp.goal1, prefix: 'goal1a', length: 2, setter: setGoal1a },
            { object: scm?.sp.goal1, prefix: 'goal1f', length: 2, setter: setGoal1f },
            { object: scm?.sp.goal2, prefix: 'goal2d', length: 13, setter: setGoal2d },
            { object: scm?.sp.goal2, prefix: 'goal2e', length: 5, setter: setGoal2e },
            { object: scm?.sp.goal3, prefix: 'goal3a', length: 8, setter: setGoal3a },
            { object: scm?.sp.goal3, prefix: 'goal3b', length: 8, setter: setGoal3b },
            { object: scm?.sp.goal3, prefix: 'goal3c', length: 6, setter: setGoal3c },
            { object: scm?.sp.goal3, prefix: 'goal3d', length: 7, setter: setGoal3d },
            { object: scm?.sp.goal6, prefix: 'goal6a', length: 5, setter: setGoal6a },
            { object: scm?.sp.goal7, prefix: 'goal7b', length: 3, setter: setGoal7b },
            { object: scm?.sp.goal7, prefix: 'goal7e', length: 7, setter: setGoal7e },
            // Add more goal settings as needed
        ];

        let selectedCount = 0;

        goalSettings.forEach(({ object, prefix, length, setter }) => {
            if (object) {
                for (let i = 1; i <= length; i++) {
                    const variable = `${prefix}${i}`;
                    if (object[variable] === true && object[`${variable}Type`] === "addendoms") {
                        if (setter) {
                            setter(true);
                        }
                        selectedCount++;
                    }
                }
            }
        });

        // Matriz con las rutas de las propiedades que se deben verificar
        const propertiesToCheck = [
            'goal1.goal1b',
            'goal1.goal1c',
            'goal1.goal1d',
            'goal1.goal1e',
            'goal2.goal2b',
            'goal2.goal2c',
            'goal3.goal3e',
            'goal3.goal3f',
            'goal4.goal4a',
            'goal4.goal4b',
            'goal4.goal4c',
            'goal4.goal4d',
            'goal4.goal4e',
            'goal4.goal4f',
            'goal5.goal5a',
            'goal5.goal5b',
            'goal5.goal5c',
            'goal5.goal5d',
            'goal5.goal5e',
            'goal6.goal6b',
            'goal6.goal6c',
            'goal6.goal6d',
            'goal6.goal6e',
            'goal6.goal6f',
            'goal7.goal7a',
            'goal7.goal7c',
            'goal7.goal7d',
            'goal8.goal8a',
            'goal8.goal8b',
            'goal8.goal8c',
            'goal8.goal8d',
            'goal8.goal8e',
        ];

        propertiesToCheck.forEach(property => {
            const [goalKey, subKey] = property.split('.');
            if (scm?.sp[goalKey]?.[subKey] && scm?.sp[goalKey]?.[`${subKey}Type`] === "addendoms") {
                selectedCount++;
            }
        });
        // --------------
        // Comprobar y contar cuántos campos ya están en true
        setSelected(selectedCount);
    }, [scm]);

    return (
        <div className="w-full p-0 " style={{ height: '80vh', 'overflow': 'auto' }}>
            {visibleBtnSave && <div style={{ position: "absolute", right: "20px", top: "20px", zIndex: 99999 }}>
                <Button
                    icon="pi pi-save"
                    rounded
                    severity="warning"
                    tooltip="Keep the information on file until you complete editing the Service Plan"
                    tooltipOptions={{ position: 'top' }}
                    onClick={() => handleButtonClick()}
                /></div>}
            {/* <BlockUI blocked={assessment.signatureTcm !== "" ? assessment.signatureSupervisor !== "" ? false : true : false}> */}

            {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
            <div className='page'>
                <HeaderDoc
                    PrimaryText='TCM SERVICES'
                    SecondaryText='CLOSING SERVICE PLAN closing'
                />

                {HeaderPage}

            </div>

            {/* ----------------------------------------------------------------------------------------------- */}
            <div className='page'>

                <div className="m-0 p-0">
                    <div className='place-items-center text-center mt-5'>
                        <b className='border-b-2 border-primary'>SECTION IV: LONG TERM GOALS FROM INITIAL SERVICE PLAN.</b> (First 3 goals come from Addendums)
                        <p style={{ fontSize: "10px" }}>(Expectations of the individual, where does the individual see himself/herself in the future. It is written in the first person by the individual or family, with help and support from the case manager.)</p>
                    </div>

                    {sp.goal1a1 &&
                        <Goals
                            area='1A'
                            areaName="Psychological - Emotional, Behavior"
                            subcategory="Psychotherapy"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Therapeuti services by the target date.`}
                            // --
                            long={sp.goal1a1Long}
                            goal="goal1a1"
                            // --
                            responsible={sp.goal1a1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {sp.goal1a2 &&
                        <Goals
                            area='1A'
                            areaName="Psychological - Emotional, Behavior"
                            subcategory='Apa'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive ABA services by the target date.`}
                            // --
                            long={sp.goal1a2Long}
                            goal="goal1a2"
                            // --
                            responsible={sp.goal1a2Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }

                    {/* 1B */}
                    {sp.goal1b &&
                        <Goals
                            area='1B'
                            areaName="Psychological - Cognitive Difficulties"
                            // subcategory='Apa'
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Cognitie therapy by the target date.`}
                            // --
                            long={sp.goal1bLong}
                            goal="goal1b"
                            // --
                            responsible={sp.goal1bResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 1C */}
                    {sp.goal1c &&
                        <Goals
                            area='1C'
                            areaName="Psychological - Psychiatric Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Psychiatric services by the target date.`}
                            // --
                            long={sp.goal1cLong}
                            goal="goal1c"
                            // --
                            responsible={sp.goal1cResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 1D */}
                    {sp.goal1d &&
                        <Goals
                            area='1D'
                            areaName="Psychological - Substance Abuse"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Substance Abuse services by the target date.`}
                            // --
                            long={sp.goal1dLong}
                            goal="goal1d"
                            // --
                            responsible={sp.goal1dResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 1E */}
                    {sp.goal1e &&
                        <Goals
                            area='1E'
                            areaName="Psychological - Psycho Sexual"
                            // subcategory='Apa'
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Psycho-Sexual educatin and services by the target date.`}
                            // --
                            long={sp.goal1eLong}
                            goal="goal1e"
                            // --
                            responsible={sp.goal1eResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }


                    {/* 1E */}
                    {sp.goal1f1 &&
                        <Goals
                            area='1F'
                            areaName="Psychological - Other"
                            subcategory='PSR'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive PSR or other services by the target date.`}
                            // --
                            long={sp.goal1f1Long}
                            goal="goal1f1"
                            // --
                            responsible={sp.goal1f1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 1F2 */}
                    {sp.goal1f2 &&
                        <Goals
                            area='1F'
                            areaName="Psychological - Other"
                            subcategory={sp.goal1f2Text === "" ? "To define" : sp.goal1f2Text}
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive ${sp.goal1f2Text} or other services by the target date.`}
                            // --
                            long={sp.goal1f2Long}
                            goal="goal1f2"
                            // --
                            responsible={sp.goal1f2Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }

                    {/* 2 Medical/Dental */}
                    {sp.goal2a1 &&
                        <Goals
                            area='2A'
                            areaName="Medical/Dental - Medical Needs"
                            subcategory="PCP"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive PCP services by the target date.`}
                            long={sp.goal2a1Long}
                            goal="goal2a1"
                            responsible={sp.goal2a1Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 2b */}
                    {sp.goal2b &&
                        <Goals
                            area='2B'
                            areaName="Medical/Dental - Dental Needs"
                            // subcategory={sp.goal2a2Text === "" ? "To define" : sp.goal2a2Text}
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Dental services by the target date.`}
                            // --
                            long={sp.goal2bLong}
                            goal="goal2b"
                            // --
                            responsible={sp.goal2bResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2c */}
                    {sp.goal2c &&
                        <Goals
                            area='2C'
                            areaName="Medical/Dental - Vision Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Vision services by the target date.`}
                            // --
                            long={sp.goal2cLong}
                            goal="goal2c"
                            // --
                            responsible={sp.goal2cResponsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }

                    {/* 2d1 */}
                    {sp.goal2d1 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Cardiologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Cardiologist services by the target date.`}
                            // --
                            long={sp.goal2d1Long}
                            goal="goal2d1"
                            // --
                            responsible={sp.goal2d1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d2 */}
                    {sp.goal2d2 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Neurologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Neurologist services by the target date.`}
                            // --
                            long={sp.goal2d2Long}
                            goal="goal2d2"
                            // --
                            responsible={sp.goal2d2Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d3 */}
                    {sp.goal2d3 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Endocrinologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Endocrinologist services by the target date.`}
                            // --
                            long={sp.goal2d3Long}
                            goal="goal2d3"
                            // --
                            responsible={sp.goal2d3Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d4 */}
                    {sp.goal2d4 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Podologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Podologist services by the target date.`}
                            // --
                            long={sp.goal2d4Long}
                            goal="goal2d4"
                            // --
                            responsible={sp.goal2d4Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d5 */}
                    {sp.goal2d5 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Gastroenterologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Gastroenterologist services by the target date.`}
                            // --
                            long={sp.goal2d5Long}
                            goal="goal2d5"
                            // --
                            responsible={sp.goal2d5Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d6 */}
                    {sp.goal2d6 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Dermatologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Dermatologist services by the target date.`}
                            // --
                            long={sp.goal2d6Long}
                            goal="goal2d6"
                            // --
                            responsible={sp.goal2d6Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d7 */}
                    {sp.goal2d7 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Allergist/Immunologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Allergist/Immunologist services by the target date.`}
                            // --
                            long={sp.goal2d7Long}
                            goal="goal2d7"
                            // --
                            responsible={sp.goal2d7Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d8 */}
                    {sp.goal2d8 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Pulmonologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Pulmonologist services by the target date.`}
                            // --
                            long={sp.goal2d8Long}
                            goal="goal2d8"
                            // --
                            responsible={sp.goal2d8Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d9 */}
                    {sp.goal2d9 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Orthopedist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Orthopedist services by the target date.`}
                            // --
                            long={sp.goal2d9Long}
                            goal="goal2d9"
                            // --
                            responsible={sp.goal2d9Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d10 */}
                    {sp.goal2d10 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Obstetrician/Gynecologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Obstetrician/Gynecologist services by the target date.`}
                            // --
                            long={sp.goal2d10Long}
                            goal="goal2d10"
                            // --
                            responsible={sp.goal2d10Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d11 */}
                    {sp.goal2d11 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Urologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Urologist services by the target date.`}
                            // --
                            long={sp.goal2d11Long}
                            goal="goal2d11"
                            // --
                            responsible={sp.goal2d11Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d12 */}
                    {sp.goal2d12 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory="Nephrologist"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist Nephrologist services by the target date.`}
                            // --
                            long={sp.goal2d12Long}
                            goal="goal2d12"
                            // --
                            responsible={sp.goal2d12Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2d13 */}
                    {sp.goal2d13 &&
                        <Goals
                            area='2D'
                            areaName="Medical/Dental - Specialist Needs"
                            subcategory={sp.goal2d13Text === "" ? "To define" : sp.goal2d13Text}
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Specialist ${sp.goal2d13Text} services by the target date.`}
                            // --
                            long={sp.goal2d13Long}
                            goal="goal2d13"
                            // --
                            responsible={sp.goal2d13Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }

                    {/* 2e1 */}
                    {sp.goal2e1 &&
                        <Goals
                            area='2E'
                            areaName="Medical/Dental - Other"
                            subcategory="Medical Center"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive services from a Medical Center by the target date.`}
                            // --
                            long={sp.goal2e1Long}
                            goal="goal2e1"
                            // --
                            responsible={sp.goal2e1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2e2 */}
                    {sp.goal2e2 &&
                        <Goals
                            area='2E'
                            areaName="Medical/Dental - Other"
                            subcategory="Sneacker Program"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will partiipate on the Silver Sneaker Program by the target date.`}
                            // --
                            long={sp.goal2e2Long}
                            goal="goal2e2"
                            // --
                            responsible={sp.goal2e2Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2e3 */}
                    {sp.goal2e3 &&
                        <Goals
                            area='2E'
                            areaName="Medical/Dental - Other"
                            subcategory="Golden Ticket"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive Golden Ticket by the target date.`}
                            // --
                            long={sp.goal2e3Long}
                            goal="goal2e3"
                            // --
                            responsible={sp.goal2e3Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2e4 */}
                    {sp.goal2e4 &&
                        <Goals
                            area='2E'
                            areaName="Medical/Dental - Other"
                            subcategory="HHA"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive HHA services by the target date.`}
                            // --
                            long={sp.goal2e4Long}
                            goal="goal2e4"
                            // --
                            responsible={sp.goal2e4Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 2e5 */}
                    {sp.goal2e5 &&
                        <Goals
                            area='2E'
                            areaName="Medical/Dental - Other"
                            subcategory={sp.goal2e5Text === "" ? "To define" : sp.goal2e5Text}

                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will receive ${sp.goal2e5Text} services by the target date.`}
                            // --
                            long={sp.goal2e5Long}
                            goal="goal2e5"
                            // --
                            responsible={sp.goal2e5Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }

                    {/* 3a1 */}
                    {sp.goal3a1 &&
                        <Goals
                            area='3A'
                            areaName="Financial Resources - Housing"
                            subcategory="ANNUAL RECERTIFICATION"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will complete the Housing Annual Recertification by the target date.`}
                            // --
                            long={sp.goal3a1Long}
                            goal="goal3a1"
                            // --
                            responsible={sp.goal3a1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 3a2 */}
                    {sp.goal3a2 &&
                        <Goals
                            area='3A'
                            areaName="Financial Resources - Housing"
                            subcategory="Section 8"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will apply for Section 8 Housing Program by the target date.`}
                            // --
                            long={sp.goal3a2Long}
                            goal="goal3a2"
                            // --
                            responsible={sp.goal3a2Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 3a3 */}
                    {sp.goal3a3 &&
                        <Goals
                            area='3A'
                            areaName="Financial Resources - Housing"
                            subcategory="LOW INCOME HOUSING"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Section 8 Miami Beach Housing Program by the target date.`}
                            long={sp.goal3a3Long}
                            goal="goal3a3"
                            responsible={sp.goal3a3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3a4 */}
                    {sp.goal3a4 &&
                        <Goals
                            area='3A'
                            areaName="Financial Resources - Housing"
                            subcategory="AFFORDABLE HOUSING"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Section 8 Homestead Housing Program by the target date.`}
                            long={sp.goal3a4Long}
                            goal="goal3a4"
                            responsible={sp.goal3a4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3a5 */}
                    {sp.goal3a5 &&
                        <Goals
                            area='3A'
                            areaName="Financial Resources - Housing"
                            subcategory="GENERAL HOUSING NEEDS"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Section 8 Pembroke Pines Housing Program by the target date.`}
                            long={sp.goal3a5Long}
                            goal="goal3a5"
                            responsible={sp.goal3a5Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }



                    {/* 3b1 */}
                    {sp.goal3b1 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="LIHEAP"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            // --
                            identified={`${scm?.Demografic.first_name} will apply for LIHEAP benefis by the target date.`}
                            // --
                            long={sp.goal3b1Long}
                            goal="goal3b1"
                            // --
                            responsible={sp.goal3b1Responsible}
                            // --
                            startDate={sp.developmentDate ?? ""}
                            closing
                        // --
                        />
                    }
                    {/* 3b2 */}
                    {sp.goal3b2 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Free Phone"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Free Phone benefi by the target date.`}
                            long={sp.goal3b2Long}
                            goal="goal3b2"
                            responsible={sp.goal3b2Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b3 */}
                    {sp.goal3b3 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Tablet"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Tablet benefi by the target date.`}
                            long={sp.goal3b3Long}
                            goal="goal3b3"
                            responsible={sp.goal3b3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b4 */}
                    {sp.goal3b4 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Internet"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Internet services by the target date.`}
                            long={sp.goal3b4Long}
                            goal="goal3b4"
                            responsible={sp.goal3b4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b5 */}
                    {sp.goal3b5 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Cable"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Cable services by the target date.`}
                            long={sp.goal3b5Long}
                            goal="goal3b5"
                            responsible={sp.goal3b5Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b6 */}
                    {sp.goal3b6 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Water"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will contiue receiving Water services by the target date.`}
                            long={sp.goal3b6Long}
                            goal="goal3b6"
                            responsible={sp.goal3b6Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b7 */}
                    {sp.goal3b7 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="Computer"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply to obtain a computer as a benefi by the target date.`}
                            long={sp.goal3b7Long}
                            goal="goal3b7"
                            responsible={sp.goal3b7Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3b8 */}
                    {sp.goal3b8 &&
                        <Goals
                            area='3B'
                            areaName="Financial Resources - Utilities and Expenses"
                            subcategory="FPL"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive FPL services by the target date.`}
                            long={sp.goal3b8Long}
                            goal="goal3b8"
                            responsible={sp.goal3b8Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }


                    {/* 3c1 */}
                    {sp.goal3c1 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="DCF"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive DCF benefis by the target date.`}
                            long={sp.goal3c1Long}
                            goal="goal3c1"
                            responsible={sp.goal3c1Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3c2 */}
                    {sp.goal3c2 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="SSI"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive SSI benefi by the target date.`}
                            long={sp.goal3c2Long}
                            goal="goal3c2"
                            responsible={sp.goal3c2Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3c3 */}
                    {sp.goal3c3 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="SSA"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive SSA benefi by the target date.`}
                            long={sp.goal3c3Long}
                            goal="goal3c3"
                            responsible={sp.goal3c3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3c4 */}
                    {sp.goal3c4 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="Bank Checking Account"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive Bank Checking Account services by the target date.`}
                            long={sp.goal3c4Long}
                            goal="goal3c4"
                            responsible={sp.goal3c4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3c5 */}
                    {sp.goal3c5 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="Bank Credit Account"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive Bank Credit Account services by the target date.`}
                            long={sp.goal3c5Long}
                            goal="goal3c5"
                            responsible={sp.goal3c5Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3c6 */}
                    {sp.goal3c6 &&
                        <Goals
                            area='3C'
                            areaName="Financial Resources - Economic Assistance"
                            subcategory="Funeral Plan"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for a Low Cost Funeral Plan by the target date.`}
                            long={sp.goal3c6Long}
                            goal="goal3c6"
                            responsible={sp.goal3c6Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 3d Transportation */}
                    {goal3d && <>
                        {/* 3d1 */}
                        {sp.goal3d1 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="Golden Pass"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for Golden Pass by the target date`}
                                long={sp.goal3d1Long}
                                goal="goal3d1"
                                responsible={sp.goal3d1Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d2 */}
                        {sp.goal3d2 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="Easy Card"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for Easy Card services by the target date`}
                                long={sp.goal3d2Long}
                                goal="goal3d2"
                                responsible={sp.goal3d2Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d3 */}
                        {sp.goal3d3 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="Disable Parking Permit"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for Disable Parking Permit benefi by the target date.`}
                                long={sp.goal3d3Long}
                                goal="goal3d3"
                                responsible={sp.goal3d3Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d4 */}
                        {sp.goal3d4 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="STS"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for STS service by the target date.`}
                                long={sp.goal3d4Long}
                                goal="goal3d4"
                                responsible={sp.goal3d4Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d5 */}
                        {sp.goal3d5 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="Papa"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for PAPA program by the target date.`}
                                long={sp.goal3d5Long}
                                goal="goal3d5"
                                responsible={sp.goal3d5Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d6 */}
                        {sp.goal3d6 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory="Tops"
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for TOPS program by the target date.`}
                                long={sp.goal3d6Long}
                                goal="goal3d6"
                                responsible={sp.goal3d6Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                        {/* 3d7 */}
                        {sp.goal3d7 &&
                            <Goals
                                area='3D'
                                areaName="Financial Resources - Transportation"
                                subcategory={sp.goal3d7Text === "" ? "To define" : sp.goal3d7Text}
                                margin
                                changeSp={changeSp}
                                client={scm?.Demografic.first_name}
                                identified={`${scm?.Demografic.first_name} will apply for ${sp.goal3d7Text} Transportatin services by the target date.`}
                                long={sp.goal3d7Long}
                                goal="goal3d7"
                                responsible={sp.goal3d7Responsible}
                                startDate={sp.developmentDate ?? ""}
                                closing
                            />
                        }
                    </>}
                    {/* TODO text identified 3e */}
                    {sp.goal3e &&
                        <Goals
                            area='3E'
                            areaName="Financial Resources - Other"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive assistance with need by the target date.`}
                            long={sp.goal3eLong}
                            goal="goal3e"
                            responsible={sp.goal3eResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 3f */}
                    {sp.goal3f &&
                        <Goals
                            area='3F'
                            areaName="Financial Resources - Donations Programs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Food/Clothes/Furniture/General Donatin benefis by the target date.`}
                            long={sp.goal3fLong}
                            goal="goal3f"
                            responsible={sp.goal3fResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4 Environmental Supports */}
                    {/* 4a */}
                    {sp.goal4a &&
                        <Goals
                            area='4A'
                            areaName="Environmental Supports - Sports Programs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will apply for Sport Programs by the target date.`}
                            long={sp.goal4aLong}
                            goal="goal4a"
                            responsible={sp.goal4aResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4b */}
                    {sp.goal4b &&
                        <Goals
                            area='4B'
                            areaName="Environmental Supports - Afterschool/Daycare"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will apply for Aftr School/Daycare by the target date.`}
                            long={sp.goal4bLong}
                            goal="goal4b"
                            responsible={sp.goal4bResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4c */}
                    {sp.goal4c &&
                        <Goals
                            area='4C'
                            areaName="Environmental Supports - Mentoring"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Mentoring benefis and services by the target date.`}
                            long={sp.goal4cLong}
                            goal="goal4c"
                            responsible={sp.goal4cResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4d */}
                    {sp.goal4d &&
                        <Goals
                            area='4D'
                            areaName="Environmental Supports - Employment"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will apply for Employment by the target date.`}
                            long={sp.goal4dLong}
                            goal="goal4d"
                            responsible={sp.goal4dResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4e */}
                    {sp.goal4e &&
                        <Goals
                            area='4E'
                            areaName="Environmental Supports - Summer Camp"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will partipate in Summer Camps Program by the target date.`}
                            long={sp.goal4eLong}
                            goal="goal4e"
                            responsible={sp.goal4eResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 4f */}
                    {sp.goal4f &&
                        <Goals
                            area='4F'
                            areaName="Environmental Supports - Tutoring"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Tutoring Classes benefis and services by the target date.`}
                            long={sp.goal4fLong}
                            goal="goal4f"
                            responsible={sp.goal4fResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 5 Permanency */}
                    {/* 5a */}
                    {sp.goal5a &&
                        <Goals
                            area='5A'
                            areaName="Permanency - DCF Dependency Legal Services"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive DCF Dependency Legal Services by the target date.`}
                            long={sp.goal5aLong}
                            goal="goal5a"
                            responsible={sp.goal5aResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 5b */}
                    {sp.goal5b &&
                        <Goals
                            area='5B'
                            areaName="Permanency - Independent Living Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will apply for Independent Living Programs by the target date.`}
                            long={sp.goal5bLong}
                            goal="goal5b"
                            responsible={sp.goal5bResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 5c */}
                    {sp.goal5c &&
                        <Goals
                            area='5C'
                            areaName="Permanency - Therapeutic Supervise Family Visitation"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Therapeuti Supervise Family Visitatin services by the target date.`}
                            long={sp.goal5cLong}
                            goal="goal5c"
                            responsible={sp.goal5cResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 5d */}
                    {sp.goal5d &&
                        <Goals
                            area='5D'
                            areaName="Permanency - Supervised Family Visitation and Contact"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Supervised Fasmily Visitatin and Contact by the target date.`}
                            long={sp.goal5dLong}
                            goal="goal5d"
                            responsible={sp.goal5dResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 5e */}
                    {sp.goal5e &&
                        <Goals
                            area='5E'
                            areaName="Permanency - Other"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Other benefis by the target date.`}
                            long={sp.goal5eLong}
                            goal="goal5e"
                            responsible={sp.goal5eResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 6a1 */}
                    {sp.goal6a1 &&
                        <Goals
                            area='6A'
                            areaName="Educational Vocational - General Education"
                            subcategory='Hurricane Season'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive supported services during Hurricane Season by the target date.`}
                            long={sp.goal6a1Long}
                            goal="goal6a1"
                            responsible={sp.goal6a1Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6a2 */}
                    {sp.goal6a2 &&
                        <Goals
                            area='6A'
                            areaName="Educational Vocational - General Education"
                            subcategory='Library Card'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for a Library Crad benefi by the target date.`}
                            long={sp.goal6a2Long}
                            goal="goal6a2"
                            responsible={sp.goal6a2Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6a3 */}
                    {sp.goal6a3 &&
                        <Goals
                            area='6A'
                            areaName="Educational Vocational - General Education"
                            subcategory='English Classes'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive English Classes by the target date.`}
                            long={sp.goal6a3Long}
                            goal="goal6a3"
                            responsible={sp.goal6a3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6a4 */}
                    {sp.goal6a4 &&
                        <Goals
                            area='6A'
                            areaName="Educational Vocational - General Education"
                            subcategory='Adult School'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will partiipate in Adult School by the target date.`}
                            long={sp.goal6a4Long}
                            goal="goal6a4"
                            responsible={sp.goal6a4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6a5 */}
                    {sp.goal6a5 &&
                        <Goals
                            area='6A'
                            areaName="Educational Vocational - General Education"
                            subcategory='Vocational Rehab'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive Vocatinal Rehabilitatin benefi and service by the target date.`}
                            long={sp.goal6a5Long}
                            goal="goal6a5"
                            responsible={sp.goal6a5Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 6b */}
                    {sp.goal6b &&
                        <Goals
                            area='6B'
                            areaName="Educational Vocational - Academic Difficulties"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will improve Academic Diffiltis by getti higher grades by the target date.`}
                            long={sp.goal6bLong}
                            goal="goal6b"
                            responsible={sp.goal6bResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6c */}
                    {sp.goal6c &&
                        <Goals
                            area='6C'
                            areaName="Educational Vocational - School Attendance Difficulties"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will improve School Attndance Diffiltis by the target date.`}
                            long={sp.goal6cLong}
                            goal="goal6c"
                            responsible={sp.goal6cResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6d */}
                    {sp.goal6d &&
                        <Goals
                            area='6D'
                            areaName="Educational Vocational - Peer Difficulties"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will improve Peer Relatinship/Diffiltis by the target date.`}
                            long={sp.goal6dLong}
                            goal="goal6d"
                            responsible={sp.goal6dResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6e */}
                    {sp.goal6e &&
                        <Goals
                            area='6E'
                            areaName="Educational Vocational - Vocational Training"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Vocatinal Trainings/Classes by the target date.`}
                            long={sp.goal6eLong}
                            goal="goal6e"
                            responsible={sp.goal6eResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 6f */}
                    {sp.goal6f &&
                        <Goals
                            area='6F'
                            areaName="Educational Vocational - Placement Issues"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will improve any Placement Issues by the target date.`}
                            long={sp.goal6fLong}
                            goal="goal6f"
                            responsible={sp.goal6fResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7 Legal Assistance */}
                    {sp.goal7a &&
                        <Goals
                            area='7A'
                            areaName="Legal Assistance - Eviction"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive supported services due to Evictin process by the target date.`}
                            long={sp.goal7aLong}
                            goal="goal7a"
                            responsible={sp.goal7aResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 7b1 */}
                    {sp.goal7b1 &&
                        <Goals
                            area='7B'
                            areaName="Legal Assistance - Immigration Issues"
                            subcategory='Naturalization'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply to become a US Citien by the target date.`}
                            long={sp.goal7b1Long}
                            goal="goal7b1"
                            responsible={sp.goal7b1Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7b2 */}
                    {sp.goal7b2 &&
                        <Goals
                            area='7B'
                            areaName="Legal Assistance - Immigration Issues"
                            subcategory='Green Card'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive supported services during the Green Card applicatin process by the target date.`}
                            long={sp.goal7b2Long}
                            goal="goal7b2"
                            responsible={sp.goal7b2Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7b3 */}
                    {sp.goal7b3 &&
                        <Goals
                            area='7B'
                            areaName="Legal Assistance - Immigration Issues"
                            subcategory='Us Passport'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for US Passport by the target date.`}
                            long={sp.goal7b3Long}
                            goal="goal7b3"
                            responsible={sp.goal7b3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7b4 */}
                    {sp.goal7b4 &&
                        <Goals
                            area='7B'
                            areaName="Legal Assistance - Immigration Issues"
                            subcategory='Asylums'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Asylums by the target date.`}
                            long={sp.goal7b4Long}
                            goal="goal7b3"
                            responsible={sp.goal7b4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }


                    {/* 7C */}
                    {sp.goal7c &&
                        <Goals
                            area='7C'
                            areaName="Legal Assistance - Custody"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive supported services for the Custody process by the target date.`}
                            long={sp.goal7cLong}
                            goal="goal7c"
                            responsible={sp.goal7cResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7D */}
                    {sp.goal7d &&
                        <Goals
                            area='7D'
                            areaName="Legal Assistance - Department of Juvenile Justice"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive supportig services with the Department of Juvenile Justie by the target date.`}
                            long={sp.goal7dLong}
                            goal="goal7d"
                            responsible={sp.goal7dResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }


                    {/* 7e1 */}
                    {sp.goal7e1 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='Work Permit'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Work Permit program by the target date.`}
                            long={sp.goal7e1Long}
                            goal="goal7e1"
                            responsible={sp.goal7e1Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e2 */}
                    {sp.goal7e2 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='Cuban Passport'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for Cuban Passport by the target date.`}
                            long={sp.goal7e2Long}
                            goal="goal7e2"
                            responsible={sp.goal7e2Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e3 */}
                    {sp.goal7e3 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='Florida ID'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply for the Florida ID by the target date.`}
                            long={sp.goal7e3Long}
                            goal="goal7e3"
                            responsible={sp.goal7e3Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e4 */}
                    {sp.goal7e4 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='FL Driver License'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive FL Driver License Program service by the target date.`}
                            long={sp.goal7e4Long}
                            goal="goal7e4"
                            responsible={sp.goal7e4Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e5 */}
                    {sp.goal7e5 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='Jury Duties'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive assistance for assigned Jury Dutis by the target date.`}
                            long={sp.goal7e5Long}
                            goal="goal7e5"
                            responsible={sp.goal7e5Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e6 */}
                    {sp.goal7e6 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory='Change Address'
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will update her Physical Address with community programs and providers by the target date.`}
                            long={sp.goal7e6Long}
                            goal="goal7e6"
                            responsible={sp.goal7e6Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 7e7 */}
                    {sp.goal7e7 &&
                        <Goals
                            area='7E'
                            areaName="Legal Assistance - Other"
                            subcategory={sp.goal7e7Text}
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will apply to ${sp.goal7e7Text} by the target date.`}
                            long={sp.goal7e7Long}
                            goal="goal7e7"
                            responsible={sp.goal7e7Responsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                    {/* 8 Family Supports */}
                    {/* 8A */}
                    {sp.goal8a &&
                        <Goals
                            area='8A'
                            areaName="Family Supports - Psychological and Psychiatric Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Family Support for Psychological and Psychiatric needs by the target date.`}
                            long={sp.goal8aLong}
                            goal="goal8a"
                            responsible={sp.goal8aResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 8B */}
                    {sp.goal8b &&
                        <Goals
                            area='8B'
                            areaName="Family Supports - Employment Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Family Support for Employment purposes by the target date.`}
                            long={sp.goal8bLong}
                            goal="goal8b"
                            responsible={sp.goal8bResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 8c */}
                    {sp.goal8c &&
                        <Goals
                            area='8C'
                            areaName="Family Supports - Vocational Needs"
                            margin
                            client={scm?.Demografic.first_name}
                            changeSp={changeSp}
                            identified={`${scm?.Demografic.first_name} will receive Family Support for Vocatinal services by the target date.`}
                            long={sp.goal8cLong}
                            goal="goal8c"
                            responsible={sp.goal8cResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 8d */}
                    {sp.goal8d &&
                        <Goals
                            area='8D'
                            areaName="Family Supports - Literacy Needs"
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive Family Support for Literacy Improvements by the target date.`}
                            long={sp.goal8dLong}
                            goal="goal8d"
                            responsible={sp.goal8dResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }
                    {/* 8e */}
                    {sp.goal8e &&
                        <Goals
                            area='8E'
                            areaName="Family Supports - Other"
                            subcategory={sp.goal8eText}
                            margin
                            changeSp={changeSp}
                            client={scm?.Demografic.first_name}
                            identified={`${scm?.Demografic.first_name} will receive Family Support for ${sp.goal8eText} by the target date.`}
                            long={sp.goal8eLong}
                            goal="goal8e"
                            responsible={sp.goal8eResponsible}
                            startDate={sp.developmentDate ?? ""}
                            closing
                        />
                    }

                </div>

                {/* TODO Section signature */}
                {/* SECTION IV:  */}
                <div className='place-items-center text-center mt-5 mb-5'>
                    <b className='border-b-2 border-primary'>ECTION IV: CLOSING SERVICE PLAN REVIEW SIGNATURES:</b>
                    <p style={{ fontSize: "10px", textAlign: "justify" }}>
                        We members of the Case Management Team hereby certified that this client was eligible for case management services, which was rendered through SUNISS UP. The signatures below
                        indicate that the goals and objectives as outlined in the Service Plan have been developed in partnership with the client/and or legal guardian. Services Plan has been closed as required by
                        Suniss Up Polices and Procedures.
                    </p>
                </div>
                <b>We the undersigned have closinged and received a copy of the service plan and agree with the goals and objectives as written.</b>
                <div className="flex w-full mt-5">
                    <div className="w-2/5 text-center place-items-center">
                        {scm?.Demografic.legal_guardian === "" ? `${scm.Demografic.first_name} ${scm.Demografic.last_name}` : scm?.Demografic.legal_guardian}
                    </div>
                    <div className="w-1/5 text-center ml-5 place-items-center">

                    </div>
                    <div className="w-1/5 ml-5 place-items-center text-center">
                        {scm?.Demografic.sign_client === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignTCM(true);
                                }}

                            />
                        ) : (
                            <div className="w-full place-items-center pl-10 flex text-center">
                                <img src={scm?.Demografic.sign_client} width={150} />
                            </div>
                        )}
                    </div>
                    <div className="w-1/5  place-items-center ml-5">
                        <div className='text-center'>
                            {scm?.doa}
                        </div>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                        <b>{scm?.Demografic.legal_guardian === "" ? "Client Name" : "Legal Guardian Name"}</b>
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5 ">
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        <b>{scm?.Demografic.legal_guardian === "" ? "Client Signature" : "Legal Guardian Signature"}</b>
                    </div>
                    <div className="w-1/5 place-items-center ml-5 border-t-2 border-primary">
                        <div className='text-center'>
                            <b>Date</b>
                        </div>
                    </div>
                </div>

                <br />

                <div className="flex w-full mt-5">
                    <div className="w-2/5 text-center place-items-center">
                        {scm?.tcm.full_name}
                    </div>
                    <div className="w-1/5 text-center ml-5 place-items-center">
                        {/* {requestCertification.signTcm !== "" ? (requestCertification.categoryTCM) : ( */}
                        <select
                            // value={requestCertification.categoryTCM ?? "CBHCM"}
                            // onChange={(e) => handleChangeCertification("categoryTCM", e.target.value ?? "CBHCM")}
                            className="input input-ghost border-0 w-full text-center"
                            // disabled={requestCertification.signTcm !== "" ? true : false}
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        >
                            <option value="CBHCM" selected>CBHCM</option>
                            <option value="CBHCM-P">CBHCM-P</option>
                            <option value="BS">BS</option>
                            <option value="BA">BA</option>
                        </select>
                        {/* )} */}

                    </div>
                    <div className="w-1/5 ml-5 place-items-center text-center">
                        {sp.signatureTcm === "" ? (
                            <Button
                                label="Sign"
                                icon="pi pi-file-edit"
                                className='p-button-warning'
                                onClick={() => {
                                    setSignTCM(true);
                                }}

                            />
                        ) : (
                            <div className="w-full place-items-center pl-10 flex text-center">

                                <img src={sp.signatureTcm} width={150} />

                            </div>
                        )}
                    </div>
                    <div className="w-1/5  place-items-center ml-5">
                        <div className='text-center'>
                            {scm?.doa}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                        <b>Targeted Case Manager</b>
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        <b>Credentials</b>
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        <b>Signature TCM</b>
                    </div>
                    <div className="w-1/5 place-items-center ml-5 border-t-2 border-primary">
                        <div className='text-center'>
                            <b>Date</b>
                        </div>
                    </div>
                </div>
                <br />

                <div className="flex w-full mt-5">
                    <div className="w-2/5 text-center place-items-center">

                    </div>
                    <div className="w-1/5 text-center ml-5 place-items-center">
                        <select
                            // value={requestCertification.categoryTCM ?? "CBHCM"}
                            // onChange={(e) => handleChangeCertification("categoryTCM", e.target.value ?? "CBHCM")}
                            className="input input-ghost border-0 w-full text-center"
                            // disabled={requestCertification.signTcm !== "" ? true : false}
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        >
                            <option value="CBHCM" selected>CBHCM</option>
                            <option value="CBHCM-P">CBHCM-P</option>
                            <option value="BS">BS</option>
                            <option value="BA">BA</option>
                        </select>
                    </div>
                    <div className="w-1/5 ml-5">

                    </div>
                    <div className="w-1/5 place-items-center ml-5">
                        <div className='text-center'>
                            {scm?.doa}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                        <b>Targeted Case Manager Supervisor</b>
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        <b>Credentials</b>
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">
                        <b>Signature TCMS</b>
                    </div>
                    <div className="w-1/5 place-items-center ml-5 border-t-2 border-primary">
                        <div className='text-center'>
                            <b>Date</b>
                        </div>
                    </div>
                </div>

            </div>
            {/* ----------------------------------------------------------------------------------------------- */}
            {/* </BlockUI> */}
            <ScrollTop
                target="parent"
                pt={{
                    root: { className: 'bg-orange-400' }
                }}
            />
        </div >
    );
}

export { Closing };