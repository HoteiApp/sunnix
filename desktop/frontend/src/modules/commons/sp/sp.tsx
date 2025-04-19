import React, { useEffect, useState, useRef } from 'react';
import { classNames } from "primereact/utils";
import { ScrollTop } from 'primereact/scrolltop';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { CalculateDateFormat } from "../CalculateDateFormat"
import { Checkbox } from 'antd';

import { SignatureCanvasRef } from 'react-signature-canvas';
import { useCoreRequestEditSCMSpInitial } from "../../profile/hooks";
import { Block } from "../component/block";
import { Goals } from './utils/goals';
import { Objetives } from './utils/objetives';
import { HeaderDoc } from "../../commons"
import { CheckMarkSimple } from './utils/checkMarkSimple';
import { SpState } from './utils/initialize';
import { SignatureDialog } from '../SignatureDialog';
// New Struct
import { Active, ServiceCM, FormValueSpInitialAddendums, DiagnosticTable } from '../../../models';


type Props = {
    relad(): void;
    active?: Active;
    mr?: number;
    scm?: ServiceCM;
    view: string;
    onContentChange?: (content: string) => void;
}

const Sp = ({ active, mr, scm, relad, view, onContentChange }: Props) => {
    const { requestEditSp, isUpdatingRequestSp } = useCoreRequestEditSCMSpInitial(relad);
    const [signTCM, setSignTCM] = useState<boolean>(false);
    const [signTCMs, setSignTCMs] = useState<boolean>(false);
    const signatureTCM = useRef<SignatureCanvasRef>(null);
    const signatureTCMs = useRef<SignatureCanvasRef>(null);
    const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
    const [visibleObjetives, setVisibleObjetives] = useState<boolean>(false);

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
    const [goal2a, setGoal2a] = useState<boolean>(false);
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

    const changeSp = <T extends string | number | boolean>(name: keyof FormValueSpInitialAddendums, value: T) => {
        setSp(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name !== "categorySupervisor" && name !== "supervisor" && name !== "nameSupervisor") {
            setVisibleBtnSave(true);
            setSaveSp(true);
        }
        return sp
    };

    // ------
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
    const changeGoal = (<T extends string | number | boolean>(fieldName: keyof FormValueSpInitialAddendums, value: T, countTrue: number, formState: FormValueSpInitialAddendums, setFormState: React.Dispatch<React.SetStateAction<FormValueSpInitialAddendums>>) => {
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
            ...(fieldName.startsWith('goal') && selected <= 10 ? { [typeFieldName]: value === true ? 'initial' : '' } : {}),
        }));
        setSaveSp(true);
        setVisibleBtnSave(true);
        return sp
    });

    const HeaderPage = (
        <div>
            {/* row 1 */}
            <div className="md:flex lg:flex w-full">
                <div className="flex lg:md:flex w-full border border-primary">
                    <div className="flex w-2/4 border-b border-r border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5 pr-5">
                            <b className='mr-5'>Client's Name:</b> {scm?.Demografic.first_name} {scm?.Demografic.last_name}
                        </div>
                    </div>
                    <div className="border-b border-r border-primary md:border-b-0 lg:border-b-0">
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
            <div className="flex lg:flex w-full">
                <div className="flex lg:md:flex w-full border border-t-0 border-primary">
                    <div className="flex w-2/4 border-b border-r border-primary md:border-b-0 lg:border-b-0 place-items-center">
                        <div className="flex w-full pl-5">
                            <b className='mr-5'>TCM:</b> {scm?.tcm.full_name}
                        </div>
                    </div>
                    <div className="w-2/4 border-b  border-primary md:border-b-0 lg:border-b-0">
                        <div className="flex w-full place-items-center">
                            <div className="flex w-full pl-5">
                                <b className='mr-5'>Initial SP Development Date:</b>
                                <InputMask
                                    id="Target"
                                    value={sp.developmentDate}
                                    onChange={(e) => {
                                        changeSp("developmentDate", e.target.value ?? "");
                                        const reviewDate = CalculateDateFormat({ date: e.target.value ?? "", monthsLater: 6 });
                                        changeSp("reviewDate", reviewDate);
                                    }}
                                    mask="99/99/9999"
                                    placeholder="Type Development Date"
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

    const footerSign = (val: string) => (
        <div className="m-0 pt-5 w-full">
            <div className="flex overflow-y-auto">
                <Button
                    label="SAVE"
                    icon="pi pi-save"
                    // Habilitar el botón si la firma correspondiente está vacía
                    disabled={
                        (val === "tcm" && sp.signatureTcm === "") ||
                        (val === "tcms" && sp.signatureSupervisor === "")
                    }
                    className="mr-2 p-button-warning"
                    onClick={() => {
                        requestEditSp({ requestSP: sp });
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

    useEffect(() => {
        const goalSettings = [
            { object: scm?.sp.goal1, prefix: 'goal1a', length: 2, setter: setGoal1a },
            { object: scm?.sp.goal1, prefix: 'goal1f', length: 2, setter: setGoal1f },
            { object: scm?.sp.goal2, prefix: 'goal2a', length: 1, setter: setGoal2a },
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
                    if (object[variable] === true && object[`${variable}Type`] === "initial") {
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
            if (scm?.sp[goalKey]?.[subKey] && scm?.sp[goalKey]?.[`${subKey}Type`] === "initial") {
                selectedCount++;
            }
        });
        // --------------
        // Comprobar y contar cuántos campos ya están en true
        setSelected(selectedCount);
    }, [scm]);

    useEffect(() => {
        let sup = (Number(active?.activeUser?.User?.ID) === Number(scm?.tcm_id)
            ? scm?.sp.supervisor
            : active?.activeUser?.User?.ID) as number || 0;

        changeSp("supervisor", sup);
        let nameSupervisor = (Number(active?.activeUser?.User?.ID) === Number(scm?.sp.supervisor)
            ? active?.activeUser?.Record?.fullname
            : scm?.sp.nameSupervisor) as string || scm?.sp.nameSupervisor || "";
        changeSp("nameSupervisor", nameSupervisor);

        let categorySupervisor = (Number(active?.activeUser?.User?.ID) === Number(scm?.sp.supervisor)
            ? active?.activeUser?.User?.credentials
            : scm?.sp.categorySupervisor) as string || scm?.sp.categorySupervisor || "CBHCMS";

        changeSp("categorySupervisor", categorySupervisor);

    }, [active, scm]);
    // Esto asegura que solo se ejecute cuando 'active' o 'scm' cambien

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


            <Block active={
                active?.activeUser?.User?.roll === "TCM" ?
                    sp.signatureTcm !== "data:image/png;base64," ?
                        true : false : active?.activeUser?.User?.roll === "TCMS" ?
                        sp.signatureSupervisor !== "data:image/png;base64," ?
                            true : false : false
            }>
                <div id="content-to-pdf" ref={contentRef}>
                    <div id="page" className='page'>
                        <HeaderDoc
                            PrimaryText='TCM SERVICES'
                            SecondaryText='INITIAL SERVICE PLAN'
                        />

                        {HeaderPage}
                        {/* row 3 */}


                        {/* SECTION I: DIAGNOSIS */}
                        <div className='place-items-center text-center m-5'>
                            <b className='border-b border-primary pb-2'>SECTION I: DIAGNOSIS</b>
                        </div>

                        <div className="md:flex lg:flex w-full">
                            <div className="md:flex lg:md:flex w-full border border-primary">
                                <div className="flex w-full border-b  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                    <div className="flex w-1/6 pl-5">
                                        <b className='mr-5'>Primary:</b>
                                    </div>
                                    <div className="flex w-1/6 pl-5">
                                        {scm?.Mental.mental_primary}
                                    </div>
                                    <div className="flex w-1/6 pl-5">
                                        <b className='mr-5 text-right'>Description:</b>
                                    </div>
                                    <div className="flex w-2/6 pl-5">
                                        {DiagnosticTable[scm?.Mental.mental_primary ?? "N/A"]}
                                    </div>
                                    <div className="flex pl-5">
                                        <b className='mr-5 text-right'>Eval Date:</b>
                                    </div>
                                    <div className="flex pl-5">
                                        {scm?.Mental.mental_primary_date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex lg:flex w-full">
                            <div className="md:flex lg:md:flex w-full border border-t-0 border-primary">
                                <div className="flex w-full border-b pb-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                    <div className="flex w-1/6 pl-5">
                                        <b className='mr-5'>Secondary:</b>
                                    </div>
                                    <div className="flex w-1/6 pl-5">
                                        {scm?.Mental.mental_secondary}
                                    </div>
                                    <div className="flex w-1/6 pl-5">
                                        <b className='mr-5 text-right'>Description:</b>
                                    </div>
                                    <div className="flex w-2/6 pl-5">
                                        {DiagnosticTable[scm?.Mental.mental_secondary ?? "N/A"]}
                                    </div>
                                    <div className="flex pl-5">
                                        <b className='mr-5 text-right'>Eval Date:</b>
                                    </div>
                                    <div className="flex pl-5">
                                        {scm?.Mental.mental_secondary_date}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* SECTION II: SERVICE AREA NEEDS */}
                        <div className='place-items-center text-center m-5'>
                            <b className='border-b border-primary pb-2'>SECTION II: SERVICE AREA NEEDS ({selected}/10)</b>
                        </div>
                        <div>
                            <div className="flex w-full">
                                <div className="flex w-full border border-primary" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>1- Psychological</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>2- Medical/Dental</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>3- Financial Resources</b>
                                            </div>
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>4- Environmental Supports</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* A */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent1 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal1a}
                                                    onChange={(e) => setGoal1a(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    A - Emotional, Behavior
                                                    {goal1a &&
                                                        <i className={classNames(
                                                            "pi pi-cog",
                                                            selected < 10 && "pi-spin"
                                                        )}
                                                            style={{ cursor: "pointer" }}
                                                            onClick={(e) => goal1aSubcategory.current?.toggle(e)}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                            {goal1a && <div className='flex w-full pl-3'>
                                                <div className="w-full flex">
                                                    {sp.goal1a1 && <Chip
                                                        className="bg-secondary"
                                                        label='Psychotherapy'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal1a1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal1a2 && <Chip
                                                        className="bg-secondary"
                                                        label='ABA'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal1a2', false, selected, sp, setSp)}
                                                    />}

                                                </div>
                                                <OverlayPanel ref={goal1aSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="1" goalLong="goal1a1" label="Psychotherapy" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="1" goalLong="goal1a2" label="ABA" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                    </div>
                                                </OverlayPanel>
                                            </div>}

                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="2" goalLong="goal2a1" label="A - PCP" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent3 === "Yes" ? selected > 9 ? true : false : true}
                                                    // disabled={selected > 9 ? sp.goal3a === false ? true : false : false}
                                                    checked={goal3a}
                                                    onChange={(e) => setGoal3a(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    A- Housing {goal3a &&
                                                        <i className={classNames(
                                                            "pi pi-cog",
                                                            selected < 10 && "pi-spin"
                                                        )}
                                                            style={{ cursor: "pointer" }} onClick={(e) => goal3aSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal3a && <div className='flex w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal3a1 && <Chip
                                                        className="bg-secondary"
                                                        label='ANNUAL RECERTIFICATION'
                                                        // Annual Recertification
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3a1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3a2 && <Chip
                                                        className="bg-secondary"
                                                        label='SECTION 8'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3a2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3a3 && <Chip
                                                        className="bg-secondary"
                                                        label='LOW INCOME HOUSING'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3a3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3a4 && <Chip
                                                        className="bg-secondary"
                                                        label='AFFORDABLE HOUSING'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3a4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3a5 && <Chip
                                                        className="bg-secondary"
                                                        label='GENERAL HOUSING NEEDS'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3a5', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal3aSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3a1" label="ANNUAL RECERTIFICATION" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3a2" label="SECTION 8" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3a3" label="LOW INCOME HOUSING" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3a4" label="AFFORDABLE HOUSING" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3a5" label="GENERAL HOUSING NEEDS" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4a" label="A - Sports Programs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* B */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="1" goalLong="goal1b" label="B - Cognitive Difficulties" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="2" goalLong="goal2b" label="B - Dental Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent3 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal3b}
                                                    onChange={(e) => setGoal3b(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    <b>B</b>- Utilities and Expenses
                                                    {goal3b &&
                                                        <i className={classNames(
                                                            "pi pi-cog",
                                                            selected < 10 && "pi-spin"
                                                        )}
                                                            style={{ cursor: "pointer" }} onClick={(e) => goal3bSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal3b && <div className='w-full'>
                                                <div className="w-full flex-col">
                                                    {sp.goal3b1 && <Chip
                                                        className="bg-secondary"
                                                        label='LIHEAP'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b2 && <Chip
                                                        className="bg-secondary"
                                                        label='Free Phone'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b3 && <Chip
                                                        className="bg-secondary"
                                                        label='Tablet'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b4 && <Chip
                                                        className="bg-secondary"
                                                        label='Internet'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b5 && <Chip
                                                        className="bg-secondary"
                                                        label='Cable'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b5', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b6 && <Chip
                                                        className="bg-secondary"
                                                        label='Water'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b6', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b7 && <Chip
                                                        className="bg-secondary"
                                                        label='Computer'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b7', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3b8 && <Chip
                                                        className="bg-secondary"
                                                        label='FPL'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3b8', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal3bSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b1" label="LIHEAP" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b2" label="Free Phone" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b3" label="Tablet" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b4" label="Internet" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b5" label="Cable" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b6" label="Water" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b7" label="Computer" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3b8" label="FPL" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4b" label="B - Afterschool/Daycare" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* C */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="1" goalLong="goal1c" label="C - Psychiatric Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="2" goalLong="goal2c" label="C - Vision Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent3 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal3c}
                                                    onChange={(e) => setGoal3c(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    <b>C</b>- Economic Assistance
                                                    {goal3c && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal3cSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal3c && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal3c1 && <Chip
                                                        className="bg-secondary"
                                                        label='DCF'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3c2 && <Chip
                                                        className="bg-secondary"
                                                        label='SSI'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3c3 && <Chip
                                                        className="bg-secondary"
                                                        label='SSA'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3c4 && <Chip
                                                        className="bg-secondary"
                                                        label='Bank Checking Account'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3c5 && <Chip
                                                        className="bg-secondary"
                                                        label='Bank Credit Account'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c5', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3c6 && <Chip
                                                        className="bg-secondary"
                                                        label='Funeral Plan'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3c6', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal3cSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c1" label="DCF" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c2" label="SSI" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c3" label="SSA" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c4" label="Bank Checking Account" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c5" label="Bank Checking Account" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3c6" label="Funeral Plan" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />

                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4c" label="C - Mentoring" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* D */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    {/* 1d */}
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="1" goalLong="goal1d" label="D - Substance Abuse" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>

                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent2 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal2d}
                                                    onChange={(e) => setGoal2d(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    D - Specialist Needs
                                                    {goal2d && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal2dSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal2d && <div className='flex w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal2d1 && <Chip
                                                        className="bg-secondary"
                                                        label='Cardiologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d2 && <Chip
                                                        className="bg-secondary"
                                                        label='Neurologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d3 && <Chip
                                                        className="bg-secondary"
                                                        label='Endocrinologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d4 && <Chip
                                                        className="bg-secondary"
                                                        label='Podologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d5 && <Chip
                                                        className="bg-secondary"
                                                        label='Gastroenterologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d5', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d6 && <Chip
                                                        className="bg-secondary"
                                                        label='Dermatologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d6', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d7 && <Chip
                                                        className="bg-secondary"
                                                        label='Allergist/Immunologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d7', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d8 && <Chip
                                                        className="bg-secondary"
                                                        label='Pulmonologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d8', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d9 && <Chip
                                                        className="bg-secondary"
                                                        label='Orthopedist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d9', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d10 && <Chip
                                                        className="bg-secondary"
                                                        label='Obstetrician/Gynecologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d10', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d11 && <Chip
                                                        className="bg-secondary"
                                                        label='Urologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d11', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d12 && <Chip
                                                        className="bg-secondary"
                                                        label='Nephrologist'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2d12', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2d13 &&
                                                        <Chip
                                                            className="bg-secondary"
                                                            label={sp.goal2d13Text === "" ? "Other" : sp.goal2d13Text}
                                                            pt={{
                                                                root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                                label: { className: 'text-white' }
                                                            }}
                                                            onRemove={() => changeGoal('goal2d13', false, selected, sp, setSp)}
                                                        />

                                                    }
                                                </div>

                                                <OverlayPanel ref={goal2dSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d1" label="Cardiologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d2" label="Neurologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d3" label="Endocrinologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d4" label="Podologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d5" label="Gastroenterologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d6" label="Dermatologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d7" label="Allergist/Immunologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d8" label="Pulmonologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d9" label="Orthopedist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d10" label="Obstetrician/Gynecologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d11" label="Urologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d12" label="Nephrologist" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2d13" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        {/* 2d13 */}
                                                        {/* <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 9 ? sp.goal2d13 === false ? true : false : false}
                                                        checked={sp.goal2d13}
                                                        onChange={(e) => changeGoal('goal2d13', e.target.checked, selected, sp, setSp)}
                                                    />
                                                    <Inplace closable>
                                                        <InplaceDisplay>
                                                            {sp.goal2d13Text === "" ? "Other" : sp.goal2d13Text}
                                                        </InplaceDisplay>
                                                        <InplaceContent>
                                                            <InputText
                                                                value={sp.goal2d13Text}
                                                                placeholder='Type'
                                                                onChange={(e) => changeSp('goal2d13Text', e.target.value)}
                                                                autoFocus
                                                            />
                                                        </InplaceContent>
                                                    </Inplace>
                                                </div> */}
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent3 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal3d}
                                                    onChange={(e) => setGoal3d(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    D - Transportation
                                                    {goal3d && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal3dSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>

                                            {goal3d && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal3d1 && <Chip
                                                        className="bg-secondary"
                                                        label='Golden Pass'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d2 && <Chip
                                                        className="bg-secondary"
                                                        label='Easy Card'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d3 && <Chip
                                                        className="bg-secondary"
                                                        label='Disable Parking Permit'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d4 && <Chip
                                                        className="bg-secondary"
                                                        label='STS'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d5 && <Chip
                                                        className="bg-secondary"
                                                        label='PAPA'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d5', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d6 && <Chip
                                                        className="bg-secondary"
                                                        label='TOPS'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal3d6', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal3d7 &&
                                                        <Chip
                                                            className="bg-secondary"
                                                            label={sp.goal3d7Text === "" ? "Other" : sp.goal3d7Text}
                                                            pt={{
                                                                root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                                label: { className: 'text-white' }
                                                            }}
                                                            onRemove={() => changeGoal('goal3d7', false, selected, sp, setSp)}
                                                        />

                                                    }
                                                </div>
                                                <OverlayPanel ref={goal3dSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d1" label="Golden Pass" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d2" label="Easy Card" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d3" label="Disable Parking Permit" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d4" label="STS" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d5" label="PAPA" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d6" label="TOPS" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="3" goalLong="goal3d7" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        {/* 3d7 */}
                                                        {/* <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 9 ? sp.goal3d7 === false ? true : false : false}
                                                        checked={sp.goal3d7}
                                                        onChange={(e) => changeGoal('goal3d7', e.target.checked, selected, sp, setSp)}
                                                    />
                                                    <Inplace closable>
                                                        <InplaceDisplay>
                                                            {sp.goal3d7Text === "" ? "Other" : sp.goal3d7Text}
                                                        </InplaceDisplay>
                                                        <InplaceContent>
                                                            <InputText
                                                                value={sp.goal3d7Text}
                                                                placeholder='Type'
                                                                onChange={(e) => changeSp('goal3d7Text', e.target.value)}
                                                                autoFocus
                                                            />
                                                        </InplaceContent>
                                                    </Inplace>
                                                </div> */}
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4d" label="D - Employment" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* E */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="1" goalLong="goal1e" label="E - Psycho Sexual" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent2 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal2e}
                                                    onChange={(e) => setGoal2e(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    E - Other
                                                    {goal2e && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal2eSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal2e && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal2e1 && <Chip
                                                        className="bg-secondary"
                                                        label='Medical Center'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2e1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2e2 && <Chip
                                                        className="bg-secondary"
                                                        label='Sneacker Program'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2e2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2e3 && <Chip
                                                        className="bg-secondary"
                                                        label='Golden Ticket'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2e3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2e4 && <Chip
                                                        className="bg-secondary"
                                                        label='HHA'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal2e4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal2e5 &&
                                                        <Chip
                                                            className="bg-secondary"
                                                            label={sp.goal2e5Text === "" ? "Other" : sp.goal2e5Text}
                                                            pt={{
                                                                root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                                label: { className: 'text-white' }
                                                            }}
                                                            onRemove={() => changeGoal('goal2e5', false, selected, sp, setSp)}
                                                        />

                                                    }
                                                </div>
                                                <OverlayPanel ref={goal2eSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2e1" label="Medical Center" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2e2" label="Sneacker Program" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2e3" label="Golden Ticket" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2e4" label="HHA" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="2" goalLong="goal2e5" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        {/* 2e5 */}
                                                        {/* <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 9 ? sp.goal2e5 === false ? true : false : false}
                                                        checked={sp.goal2e5}
                                                        onChange={(e) => changeGoal('goal2e5', e.target.checked, selected, sp, setSp)}
                                                    />
                                                    <Inplace closable>
                                                        <InplaceDisplay>
                                                            {sp.goal2e5Text === "" ? "Other" : sp.goal2e5Text}
                                                        </InplaceDisplay>
                                                        <InplaceContent>
                                                            <InputText
                                                                value={sp.goal2e5Text}
                                                                placeholder='Type'
                                                                onChange={(e) => changeSp('goal2e5Text', e.target.value)}
                                                                autoFocus
                                                            />
                                                        </InplaceContent>
                                                    </Inplace>
                                                </div> */}
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="3" goalLong="goal3e" label="E - Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4e" label="E - Summer Camp" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* F */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent1 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal1f}
                                                    onChange={(e) => {
                                                        setGoal1f(e.target.checked);
                                                    }}
                                                />
                                                <div className='place-items-center'>
                                                    F - Other
                                                    {goal1f && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal1fSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal1f && <div className="w-full p-0 m-0">
                                                <div className="w-full flex-col">
                                                    {sp.goal1f1 && <Chip
                                                        className="bg-secondary"
                                                        label='PSR'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal1f1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal1f2 &&
                                                        <Chip
                                                            className="bg-secondary"
                                                            label={sp.goal1f2Text === "" ? "Click to Edit" : sp.goal1f2Text}
                                                            pt={{
                                                                root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                                label: { className: 'text-white' }
                                                            }}
                                                            onRemove={() => changeGoal('goal1f2', false, selected, sp, setSp)}
                                                        />

                                                    }
                                                </div>
                                                <OverlayPanel ref={goal1fSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="1" goalLong="goal1f1" label="PSR" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="1" goalLong="goal1f2" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />

                                                        {/* 1f2 */}
                                                        {/* <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 9 ? sp.goal1f2 === false ? true : false : false}
                                                        checked={sp.goal1f2}
                                                        onChange={(e) => changeGoal('goal1f2', e.target.checked, selected, sp, setSp)}
                                                    />
                                                    <Inplace closable>
                                                        <InplaceDisplay>
                                                            {sp.goal1f2Text === "" ? "Click to Edit" : sp.goal1f2Text}
                                                        </InplaceDisplay>
                                                        <InplaceContent>
                                                            <InputText
                                                                value={sp.goal1f2Text}
                                                                placeholder='Type'
                                                                onChange={(e) => changeSp('goal1f2Text', e.target.value)}
                                                                autoFocus
                                                            />
                                                        </InplaceContent>
                                                    </Inplace>
                                                </div> */}
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="3" goalLong="goal3f" label="F - Donations Programs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="4" goalLong="goal4f" label="F - Tutoring" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-primary" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>5- Permanency</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>6- Educational Vocational</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>7- Legal Assistance</b>
                                            </div>
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">
                                                <b>8- Family Supports</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* A */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="5" goalLong="goal5a" label="A - DCF Dependency Legal Services" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent6 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal6a}
                                                    onChange={(e) => setGoal6a(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    A - General Education
                                                    {goal6a && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal6aSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal6a && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal6a1 && <Chip
                                                        className="bg-secondary"
                                                        label='Hurricane Season'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal6a1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal6a2 && <Chip
                                                        className="bg-secondary"
                                                        label='Library Card'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal6a2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal6a3 && <Chip
                                                        className="bg-secondary"
                                                        label='English Classes'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal6a3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal6a4 && <Chip
                                                        className="bg-secondary"
                                                        label='Adult School'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal6a4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal6a5 && <Chip
                                                        className="bg-secondary"
                                                        label='Vocational Rehab'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal6a5', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal6aSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="6" goalLong="goal6a1" label="Hurricane Season" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="6" goalLong="goal6a2" label="Library Card" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="6" goalLong="goal6a3" label="English Classes" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="6" goalLong="goal6a4" label="Adult School" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="6" goalLong="goal6a5" label="Vocational Rehab" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="7" goalLong="goal7a" label="A - Eviction" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="8" goalLong="goal8a" label="A - Psychological and Psychiatric Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* B */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="5" goalLong="goal5b" label="B - Independent Living Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="6" goalLong="goal6b" label="B - Academic Difficulties" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent7 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal7b}
                                                    onChange={(e) => setGoal7b(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    B - Immigration Issues
                                                    {goal7b && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal7bSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal7b && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal7b1 && <Chip
                                                        className="bg-secondary"
                                                        label='Naturalization'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7b1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7b2 && <Chip
                                                        className="bg-secondary"
                                                        label='Green Card'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7b2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7b3 && <Chip
                                                        className="bg-secondary"
                                                        label='US Passport'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7b3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7b4 && <Chip
                                                        className="bg-secondary"
                                                        label='Asylums'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7b4', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal7bSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7b1" label="Naturalization" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7b2" label="Green Card" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7b3" label="US Passport" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7b4" label="Asylums" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="8" goalLong="goal8b" label="B - Employment Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* C */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="5" goalLong="goal5c" label="C - Therapeutic Supervise Family Visitation" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="6" goalLong="goal6c" label="C - School Attendance Difficulties" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="7" goalLong="goal7c" label="C - Custody" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="8" goalLong="goal8c" label="C - Vocational Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* D */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="5" goalLong="goal5d" label="D - Supervised Family Visitation and Contact" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="6" goalLong="goal6d" label="D - Peer Difficulties" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="7" goalLong="goal7d" label="D - Department of Juvenile Justice" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="8" goalLong="goal8d" label="D - Literacy Needs" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* E */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="5" goalLong="goal5e" label="E - Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="6" goalLong="goal6e" label="E - Vocational Training" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full">
                                                <Checkbox
                                                    className='mr-2'
                                                    disabled={scm?.assessment.recipent7 === "Yes" ? selected > 9 ? true : false : true}
                                                    checked={goal7e}
                                                    onChange={(e) => setGoal7e(e.target.checked)}
                                                />
                                                <div className='place-items-center'>
                                                    E - Other
                                                    {goal7e && <i className={classNames(
                                                        "pi pi-cog",
                                                        selected < 10 && "pi-spin"
                                                    )} style={{ cursor: "pointer" }} onClick={(e) => goal7eSubcategory.current?.toggle(e)}></i>}
                                                </div>
                                            </div>
                                            {goal7e && <div className='w-full pl-3'>
                                                <div className="w-full flex-col">
                                                    {sp.goal7e1 && <Chip
                                                        className="bg-secondary"
                                                        label='Work Permit'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e1', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e2 && <Chip
                                                        className="bg-secondary"
                                                        label='Cuban Passport'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e2', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e3 && <Chip
                                                        className="bg-secondary"
                                                        label='Florida ID'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e3', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e4 && <Chip
                                                        className="bg-secondary"
                                                        label='FL Driver License'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e4', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e5 && <Chip
                                                        className="bg-secondary"
                                                        label='Us Passport'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e5', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e6 && <Chip
                                                        className="bg-secondary"
                                                        label='Change Address'
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e6', false, selected, sp, setSp)}
                                                    />}
                                                    {sp.goal7e7 && <Chip
                                                        className="bg-secondary"
                                                        label={sp.goal7e7Text === "" ? "Other" : sp.goal7e7Text}
                                                        pt={{
                                                            root: { style: { backgroundColor: '#FAB710', borderRadius: '24px' } },
                                                            label: { className: 'text-white' }
                                                        }}
                                                        onRemove={() => changeGoal('goal7e7', false, selected, sp, setSp)}
                                                    />}
                                                </div>
                                                <OverlayPanel ref={goal7eSubcategory} showCloseIcon dismissable={false} className='w-auto'>
                                                    <div className="w-full p-0 m-0">
                                                        <b>Select subcategory</b>
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e1" label="Work Permit" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e2" label="Cuban Passport" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e3" label="Florida ID" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e4" label="FL Driver License" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e5" label="Jury Duties" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e6" label="Change Address" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        <CheckMarkSimple docType="initial" need="7" goalLong="goal7e7" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                                        {/* 7e7 */}
                                                        {/* <div className="flex">
                                                    <Checkbox
                                                        className='mr-2'
                                                        disabled={selected > 9 ? sp.goal7e7 === false ? true : false : false}
                                                        checked={sp.goal7e7}
                                                        onChange={(e) => changeGoal('goal7e7', e.target.checked, selected, sp, setSp)}
                                                    />
                                                    <Inplace closable>
                                                        <InplaceDisplay>
                                                            {sp.goal7e7Text === "" ? "Other" : sp.goal7e7Text}
                                                        </InplaceDisplay>
                                                        <InplaceContent>
                                                            <InputText
                                                                value={sp.goal7e7Text}
                                                                placeholder='Type'
                                                                onChange={(e) => changeSp('goal7e7Text', e.target.value)}
                                                                autoFocus
                                                            />
                                                        </InplaceContent>
                                                    </Inplace>
                                                </div> */}
                                                    </div>
                                                </OverlayPanel>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="8" goalLong="goal8e" label="Other" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* F */}
                            <div className="flex w-full">
                                <div className="flex w-full border border-t-0 border-primary">
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <CheckMarkSimple docType="initial" need="6" goalLong="goal6f" label="F - Placement Issues" sp={sp} scm={scm} selected={selected} changeGoal={changeGoal} setFormState={setSp} />
                                        </div>
                                    </div>
                                    <div className="w-1/4 border-b  border-primary md:border-b-0 lg:border-b-0 md:border-r lg:border-r">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full  pl-3">

                                            </div>
                                        </div>
                                    </div><div className="w-1/4 border-b-0 border-r-0  border-primary">
                                        <div className="w-full place-items-center p-1">
                                            <div className="flex w-full pl-3">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="page" className='page'>
                        {/* SECTION III: OBJECTIVES */}
                        {view !== "Edit" ? (
                            <div>
                                <div className='place-items-center text-center mt-5 p-1'>
                                    <b className='border-b border-primary'>SECTION III: SHORT TERM GOALS-OBJECTIVES</b>
                                </div>
                                <Objetives />
                            </div>
                        ) : (
                            <div>
                                <div className='place-items-center text-center mt-5 p-1 bg-secondary hover:bg-orange-200' style={{ cursor: "pointer", borderRadius: "5px" }} onClick={() => { setVisibleObjetives(true) }}>
                                    <b className='border-b border-primary'>SECTION III: SHORT TERM GOALS-OBJECTIVES</b>
                                </div>
                                <Dialog header="SHORT TERM GOALS-OBJECTIVES" visible={visibleObjetives} style={{ width: '90vw' }} onHide={() => setVisibleObjetives(false)}>
                                    <Objetives />
                                </Dialog>
                            </div>
                        )}
                    </div>

                    {/* ----------------------------------------------------------------------------------------------- */}
                    <div id="page" className='page'>

                        <div className="m-0 p-0 pt-8">
                            <div className='place-items-center text-center mt-5'>
                                <b className='border-b border-primary'>SECTION III: LONG TERM GOALS</b>
                                {view !== "Edit" && <p style={{ fontSize: "10px" }}>(Expectations of the individual, where does the individual see himself/herself in the future. It is written in the first person by the individual or family, with help and support from the case manager.)</p>}
                            </div>
                            {/* 1 Psychological */}
                            {goal1a && <>
                                {sp.goal1a1 &&
                                    sp.goal1a1Type === "initial" &&
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
                                        // --
                                        goalType={sp.goal1a1Type ?? ""}
                                    // --
                                    />
                                }
                                {sp.goal1a2 &&
                                    sp.goal1a2Type === "initial" &&
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
                                        // --
                                        goalType={sp.goal1a2Type ?? ""}
                                    // --
                                    />
                                }
                            </>
                            }
                            {/* 1B */}
                            {sp.goal1b &&
                                sp.goal1bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal1bType ?? ""}
                                // --
                                />
                            }
                            {/* 1C */}
                            {sp.goal1c &&
                                sp.goal1cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal1cType ?? ""}
                                // --
                                />
                            }
                            {/* 1D */}
                            {sp.goal1d &&
                                sp.goal1dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal1dType ?? ""}
                                // --
                                />
                            }
                            {/* 1E */}
                            {sp.goal1e &&
                                sp.goal1eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal1eType ?? ""}
                                // --
                                />
                            }

                            {/* 1f1 */}
                            {goal1f && <>
                                {/* 1E */}
                                {sp.goal1f1 &&
                                    sp.goal1f1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal1f1Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 1F2 */}
                                {sp.goal1f2 &&
                                    sp.goal1f2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal1f2Type ?? ""}
                                    // --
                                    />
                                }
                            </>
                            }
                            {/* 2 Medical/Dental */}
                            {sp.goal2a1 &&
                                sp.goal2a1Type === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal2a1Type ?? ""}
                                />
                            }

                            {/* 2b */}
                            {sp.goal2b &&
                                sp.goal2bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal2bType ?? ""}
                                // --
                                />
                            }
                            {/* 2c */}
                            {sp.goal2c &&
                                sp.goal2cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal2cType ?? ""}
                                // --
                                />
                            }
                            {/* 2d */}
                            {goal2d && <>
                                {/* 2d1 */}
                                {sp.goal2d1 &&
                                    sp.goal2d1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d1Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d2 */}
                                {sp.goal2d2 &&
                                    sp.goal2d2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d2Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d3 */}
                                {sp.goal2d3 &&
                                    sp.goal2d3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d3Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d4 */}
                                {sp.goal2d4 &&
                                    sp.goal2d4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d4Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d5 */}
                                {sp.goal2d5 &&
                                    sp.goal2d5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d5Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d6 */}
                                {sp.goal2d6 &&
                                    sp.goal2d6Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d6Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d7 */}
                                {sp.goal2d7 &&
                                    sp.goal2d7Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d7Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d8 */}
                                {sp.goal2d8 &&
                                    sp.goal2d8Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d8Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d9 */}
                                {sp.goal2d9 &&
                                    sp.goal2d9Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d9Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d10 */}
                                {sp.goal2d10 &&
                                    sp.goal2d10Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d10Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d11 */}
                                {sp.goal2d11 &&
                                    sp.goal2d11Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d11Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d12 */}
                                {sp.goal2d12 &&
                                    sp.goal2d12Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d12Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2d13 */}
                                {sp.goal2d13 &&
                                    sp.goal2d13Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2d13Type ?? ""}
                                    // --
                                    />
                                }
                            </>}
                            {/* 2e */}
                            {goal2e && <>
                                {/* 2e1 */}
                                {sp.goal2e1 &&
                                    sp.goal2e1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2e1Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2e2 */}
                                {sp.goal2e2 &&
                                    sp.goal2e2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2e2Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2e3 */}
                                {sp.goal2e3 &&
                                    sp.goal2e3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2e3Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2e4 */}
                                {sp.goal2e4 &&
                                    sp.goal2e4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2e4Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 2e5 */}
                                {sp.goal2e5 &&
                                    sp.goal2e5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal2e5Type ?? ""}
                                    // --
                                    />
                                }
                            </>}
                            {/* 3 Financial Resources */}
                            {goal3a && <>
                                {/* 3a1 */}
                                {sp.goal3a1 &&
                                    sp.goal3a1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3a1Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 3a2 */}
                                {sp.goal3a2 &&
                                    sp.goal3a2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3a2Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 3a3 */}
                                {sp.goal3a3 &&
                                    sp.goal3a3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3a3Type ?? ""}
                                    />
                                }
                                {/* 3a4 */}
                                {sp.goal3a4 &&
                                    sp.goal3a4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3a4Type ?? ""}
                                    />
                                }
                                {/* 3a5 */}
                                {sp.goal3a5 &&
                                    sp.goal3a5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3a5Type ?? ""}
                                    />
                                }
                            </>}

                            {/* 3b */}
                            {goal3b && <>
                                {/* 3b1 */}
                                {sp.goal3b1 &&
                                    sp.goal3b1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b1Type ?? ""}
                                    // --
                                    />
                                }
                                {/* 3b2 */}
                                {sp.goal3b2 &&
                                    sp.goal3b2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b2Type ?? ""}
                                    />
                                }
                                {/* 3b3 */}
                                {sp.goal3b3 &&
                                    sp.goal3b3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b3Type ?? ""}
                                    />
                                }
                                {/* 3b4 */}
                                {sp.goal3b4 &&
                                    sp.goal3b4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b4Type ?? ""}
                                    />
                                }
                                {/* 3b5 */}
                                {sp.goal3b5 &&
                                    sp.goal3b5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b5Type ?? ""}
                                    />
                                }
                                {/* 3b6 */}
                                {sp.goal3b6 &&
                                    sp.goal3b6Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b6Type ?? ""}
                                    />
                                }
                                {/* 3b7 */}
                                {sp.goal3b7 &&
                                    sp.goal3b7Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b7Type ?? ""}
                                    />
                                }
                                {/* 3b8 */}
                                {sp.goal3b8 &&
                                    sp.goal3b8Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3b8Type ?? ""}
                                    />
                                }
                            </>}
                            {/* 3c */}
                            {goal3c && <>
                                {/* 3c1 */}
                                {sp.goal3c1 &&
                                    sp.goal3c1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c1Type ?? ""}
                                    />
                                }
                                {/* 3c2 */}
                                {sp.goal3c2 &&
                                    sp.goal3c2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c2Type ?? ""}
                                    />
                                }
                                {/* 3c3 */}
                                {sp.goal3c3 &&
                                    sp.goal3c3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c3Type ?? ""}
                                    />
                                }
                                {/* 3c4 */}
                                {sp.goal3c4 &&
                                    sp.goal3c4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c4Type ?? ""}
                                    />
                                }
                                {/* 3c5 */}
                                {sp.goal3c5 &&
                                    sp.goal3c5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c5Type ?? ""}
                                    />
                                }
                                {/* 3c6 */}
                                {sp.goal3c6 &&
                                    sp.goal3c6Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3c6Type ?? ""}
                                    />
                                }
                            </>}
                            {/* 3d Transportation */}
                            {goal3d && <>
                                {/* 3d1 */}
                                {sp.goal3d1 &&
                                    sp.goal3d1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d1Type ?? ""}
                                    />
                                }
                                {/* 3d2 */}
                                {sp.goal3d2 &&
                                    sp.goal3d2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d2Type ?? ""}
                                    />
                                }
                                {/* 3d3 */}
                                {sp.goal3d3 &&
                                    sp.goal3d3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d3Type ?? ""}
                                    />
                                }
                                {/* 3d4 */}
                                {sp.goal3d4 &&
                                    sp.goal3d4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d4Type ?? ""}
                                    />
                                }
                                {/* 3d5 */}
                                {sp.goal3d5 &&
                                    sp.goal3d5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d5Type ?? ""}
                                    />
                                }
                                {/* 3d6 */}
                                {sp.goal3d6 &&
                                    sp.goal3d6Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d6Type ?? ""}
                                    />
                                }
                                {/* 3d7 */}
                                {sp.goal3d7 &&
                                    sp.goal3d7Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal3d7Type ?? ""}
                                    />
                                }
                            </>}
                            {/* TODO text identified 3e */}
                            {sp.goal3e &&
                                sp.goal3eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal3eType ?? ""}
                                />
                            }
                            {/* 3f */}
                            {sp.goal3f &&
                                sp.goal3fType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal3fType ?? ""}
                                />
                            }
                            {/* 4 Environmental Supports */}
                            {/* 4a */}
                            {sp.goal4a &&
                                sp.goal4aType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4aType ?? ""}
                                />
                            }
                            {/* 4b */}
                            {sp.goal4b &&
                                sp.goal4bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4bType ?? ""}
                                />
                            }
                            {/* 4c */}
                            {sp.goal4c &&
                                sp.goal4cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4cType ?? ""}
                                />
                            }
                            {/* 4d */}
                            {sp.goal4d &&
                                sp.goal4dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4dType ?? ""}
                                />
                            }
                            {/* 4e */}
                            {sp.goal4e &&
                                sp.goal4eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4eType ?? ""}
                                />
                            }
                            {/* 4f */}
                            {sp.goal4f &&
                                sp.goal4fType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal4fType ?? ""}
                                />
                            }

                            {/* 5 Permanency */}
                            {/* 5a */}
                            {sp.goal5a &&
                                sp.goal5aType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal5aType ?? ""}
                                />
                            }
                            {/* 5b */}
                            {sp.goal5b &&
                                sp.goal5bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal5bType ?? ""}
                                />
                            }
                            {/* 5c */}
                            {sp.goal5c &&
                                sp.goal5cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal5cType ?? ""}
                                />
                            }
                            {/* 5d */}
                            {sp.goal5d &&
                                sp.goal5dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal5dType ?? ""}
                                />
                            }
                            {/* 5e */}
                            {sp.goal5e &&
                                sp.goal5eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal5eType ?? ""}
                                />
                            }
                            {/* 6 Educational Vocational */}
                            {goal6a && <>
                                {/* 6a1 */}
                                {sp.goal6a1 &&
                                    sp.goal6a1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal6a1Type ?? ""}
                                    />
                                }
                                {/* 6a2 */}
                                {sp.goal6a2 &&
                                    sp.goal6a2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal6a2Type ?? ""}
                                    />
                                }
                                {/* 6a3 */}
                                {sp.goal6a3 &&
                                    sp.goal6a3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal6a3Type ?? ""}
                                    />
                                }
                                {/* 6a4 */}
                                {sp.goal6a4 &&
                                    sp.goal6a4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal6a4Type ?? ""}
                                    />
                                }
                                {/* 6a5 */}
                                {sp.goal6a5 &&
                                    sp.goal6a5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal6a5Type ?? ""}
                                    />
                                }
                            </>}
                            {/* 6b */}
                            {sp.goal6b &&
                                sp.goal6bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal6bType ?? ""}
                                />
                            }
                            {/* 6c */}
                            {sp.goal6c &&
                                sp.goal6cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal6cType ?? ""}
                                />
                            }
                            {/* 6d */}
                            {sp.goal6d &&
                                sp.goal6dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal6dType ?? ""}
                                />
                            }
                            {/* 6e */}
                            {sp.goal6e &&
                                sp.goal6eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal6eType ?? ""}
                                />
                            }
                            {/* 6f */}
                            {sp.goal6f &&
                                sp.goal6fType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal6fType ?? ""}
                                />
                            }
                            {/* 7 Legal Assistance */}
                            {sp.goal7a &&
                                sp.goal7aType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal7aType ?? ""}
                                />
                            }
                            {/* 7b */}
                            {goal7b && <>
                                {/* 7b1 */}
                                {sp.goal7b1 &&
                                    sp.goal7b1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7b1Type ?? ""}
                                    />
                                }
                                {/* 7b2 */}
                                {sp.goal7b2 &&
                                    sp.goal7b2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7b2Type ?? ""}
                                    />
                                }
                                {/* 7b3 */}
                                {sp.goal7b3 &&
                                    sp.goal7b3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7b3Type ?? ""}
                                    />
                                }
                                {/* 7b4 */}
                                {sp.goal7b4 &&
                                    sp.goal7b4Type === "initial" && <Goals
                                        area='7B'
                                        areaName="Legal Assistance - Immigration Issues"
                                        subcategory='Asylums'
                                        margin
                                        changeSp={changeSp}
                                        client={scm?.Demografic.first_name}
                                        identified={`${scm?.Demografic.first_name} will apply for Asylums by the target date.`}
                                        long={sp.goal7b4Long}
                                        goal="goal7b4"
                                        responsible={sp.goal7b4Responsible}
                                        startDate={sp.developmentDate ?? ""}
                                        // --
                                        goalType={sp.goal7b4Type ?? ""}
                                    />
                                }

                            </>}
                            {/* 7C */}
                            {sp.goal7c &&
                                sp.goal7cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal7cType ?? ""}
                                />
                            }
                            {/* 7D */}
                            {sp.goal7d &&
                                sp.goal7dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal7dType ?? ""}
                                />
                            }
                            {/* 7E */}
                            {goal7e && <>
                                {/* 7e1 */}
                                {sp.goal7e1 &&
                                    sp.goal7e1Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e1Type ?? ""}
                                    />
                                }
                                {/* 7e2 */}
                                {sp.goal7e2 &&
                                    sp.goal7e2Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e2Type ?? ""}
                                    />
                                }
                                {/* 7e3 */}
                                {sp.goal7e3 &&
                                    sp.goal7e3Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e3Type ?? ""}
                                    />
                                }
                                {/* 7e4 */}
                                {sp.goal7e4 &&
                                    sp.goal7e4Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e4Type ?? ""}
                                    />
                                }
                                {/* 7e5 */}
                                {sp.goal7e5 &&
                                    sp.goal7e5Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e5Type ?? ""}
                                    />
                                }
                                {/* 7e6 */}
                                {sp.goal7e6 &&
                                    sp.goal7e6Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e6Type ?? ""}
                                    />
                                }
                                {/* 7e7 */}
                                {sp.goal7e7 &&
                                    sp.goal7e7Type === "initial" && <Goals
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
                                        // --
                                        goalType={sp.goal7e7Type ?? ""}
                                    />
                                }

                            </>}

                            {/* 8 Family Supports */}
                            {/* 8A */}
                            {sp.goal8a &&
                                sp.goal8aType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal8aType ?? ""}
                                />
                            }
                            {/* 8B */}
                            {sp.goal8b &&
                                sp.goal8bType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal8bType ?? ""}
                                />
                            }
                            {/* 8c */}
                            {sp.goal8c &&
                                sp.goal8cType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal8cType ?? ""}
                                />
                            }
                            {/* 8d */}
                            {sp.goal8d &&
                                sp.goal8dType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal8dType ?? ""}
                                />
                            }
                            {/* 8e */}
                            {sp.goal8e &&
                                sp.goal8eType === "initial" && <Goals
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
                                    // --
                                    goalType={sp.goal8eType ?? ""}
                                />
                            }

                        </div>

                        {/* TODO Section signature */}
                        {/* SECTION V:  */}
                        <div className='place-items-center text-center mt-5 mb-5'>
                            <b className='border-b border-primary'>SECTION V: SERVICE PLAN SIGNATURES:</b>
                            <p style={{ fontSize: "10px", textAlign: "justify" }}>
                                We members of the Case Management Team hereby certified that this client is eligible
                                for case management services, which will be rendered through SUNISS UP. The signatures
                                below are provided by Client, TCM and TCM Supervisor and with the appropriate consent
                                provided by Client to use {scm?.Demografic.sexo === "Male" ? "his" : "her"} or legal guardian
                                digital signature. The signatures indicate that the goals and objetives as outlined in the
                                service plan have been developed in partnership with the client/and or legal guardian and are
                                valid for a period of 6 months. This Initial Service Plan will be reviewed by: {sp.developmentDate ?? ""}
                            </p>
                        </div>
                        <b>We the undersigned have reviewed and received a copy of the service plan and agree with the goals and objectives as written.</b>


                        {/* Bloque de firmas */}
                        <div className='w-full pt-80'>

                            {/* inicio primera linea */}
                            <div className='flex w-full'>
                                <div className="w-2/5 text-center content-end">{scm?.Demografic.legal_guardian === "" ? `${scm.Demografic.first_name} ${scm.Demografic.last_name}` : scm?.Demografic.legal_guardian}</div>
                                <div className='w-1/5'></div>
                                <div className='w-1/5 content-end text-center'>
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
                                            <img src={scm?.Demografic.sign_client} width={150} style={{ position: "relative", top: "2px", transform: "rotate(-10deg)", maxHeight: "50px" }} />
                                        </div>
                                    )}
                                </div>
                                <div className="w-1/5 text-center content-end">{scm?.doa}</div>
                            </div>

                            <div className='flex w-full'>
                                <div className="w-2/5 border-t border-black mr-5 ml-5"></div>
                                <div className="w-1/5 border-t border-white mr-5 ml-5"></div>
                                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>
                                <div className="w-1/5 border-t border-black mr-5 ml-5"></div>

                            </div>

                            <div className='flex w-full'>
                                <div className="w-2/5 text-center"><b>{scm?.Demografic.legal_guardian === "" ? "Client Name" : "Legal Guardian Name"}</b></div>
                                <div className='w-1/5'></div>
                                <div className='w-1/5 text-center'><b>{scm?.Demografic.legal_guardian === "" ? "Client Signature" : "Legal Guardian Signature"}</b></div>
                                <div className='w-1/5 text-center'><b>Date</b></div>
                            </div>
                            {/* fin primera linea */}
                            <br />

                            {/* inicio segunda linea */}

                            <div className='flex w-full'>
                                <div className="w-2/5 text-center content-end">{scm?.tcm.full_name}</div>
                                <div className="w-1/5 text-center content-end">{scm?.tcm.categoryTCM || "CBHCM"}</div>
                                <div className='w-1/5 content-end text-center'>
                                    {sp.signatureTcm === "data:image/png;base64," ? (
                                        <>
                                            {Number(scm?.tcm_id) === Number(active?.activeUser?.User?.ID) && sp.developmentDate !== "" &&
                                                <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                                    setSignTCM(true);
                                                }} />
                                            }
                                        </>
                                    ) : (
                                        <div className="w-full place-items-center pl-10 flex text-center">
                                            {/* TODO: Mirar el style que lo puse para probar que la firma se ponga en ocaciones sobre la linea de border-b para simular que se firmo la hoja */}
                                            <img src={sp.signatureTcm} width={150} alt='sign' style={{ position: "relative", top: "5px", transform: "rotate(-10deg)", maxHeight: "50px" }} />
                                        </div>
                                    )}
                                </div>
                                <div className="w-1/5 text-center content-end">{scm?.doa}</div>
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

                            {/* fin segunda linea */}
                            <br />

                            {/* inicio tercera linea */}

                            <div className='flex w-full'>
                                <div className="w-2/5 text-center content-end">{sp.nameSupervisor}</div>
                                <div className="w-1/5 text-center content-end">{sp.categorySupervisor}</div>
                                <div className='w-1/5 content-end text-center'>
                                    {sp.signatureSupervisor === "data:image/png;base64," ? (
                                        <>
                                            {Number(scm?.sp.supervisor) === Number(active?.activeUser?.User?.ID) &&
                                                scm?.sp.signatureTcm !== "data:image/png;base64," &&
                                                <i className='pi pi-file-edit' style={{ color: "#FB923C", cursor: "pointer" }} onClick={() => {
                                                    setSignTCMs(true);
                                                }} />
                                            }

                                        </>

                                    ) : (
                                        <div className="w-full place-items-center pl-10 flex text-center">
                                            <img src={sp.signatureSupervisor} width={150} alt='sign' style={{ position: "relative", top: "5px", transform: "rotate(-10deg)", maxHeight: "50px" }} />
                                        </div>
                                    )}
                                </div>
                                <div className="w-1/5 text-center content-end">{scm?.doa}</div>
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

                            <br />

                            {/* fin tercera linea */}

                        </div>

                    </div>
                    {/* ----------------------------------------------------------------------------------------------- */}
                </div>
            </Block>
            {/* Sign Client */}
            <SignatureDialog
                header="Create TCM electronic signature"
                visible={signTCM}
                onHide={() => setSignTCM(false)}
                footer={footerSign("tcm")}
                signatureRef={signatureTCM}
                onSignEnd={(dataUrl) => changeSp("signatureTcm", dataUrl)}
                onClear={() => changeSp("signatureTcm", "")}
            />

            <SignatureDialog
                header="Create Supervisor electronic signature"
                visible={signTCMs}
                onHide={() => setSignTCMs(false)}
                footer={footerSign("tcms")}
                signatureRef={signatureTCMs}
                onSignEnd={(dataUrl) => changeSp("signatureSupervisor", dataUrl)}
                onClear={() => changeSp("signatureSupervisor", "")}
            />
            <ScrollTop
                target="parent"
                pt={{
                    root: { className: 'bg-orange-400' }
                }}
            />
        </div >
    );
}


export { Sp };