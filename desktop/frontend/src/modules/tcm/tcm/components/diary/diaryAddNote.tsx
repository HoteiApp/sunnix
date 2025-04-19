import React, { useRef, useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Skeleton } from 'primereact/skeleton';
// import { DiaryTCMaddNoteSCM } from "./diaryAddNoteSCM";

// -- New Struct
// import { useTCMClients } from "../../../../../hooks/modules/tcm";
import { Active, Notes, Client, ServiceCMActive } from "../../../../../models";
import { useCoreClientSCM } from "../../../../profile/hooks";
import { AddNotes } from "../../../notes/notes";

const DiaryTCMaddNote = ({ date, active, clients, notes, relad, setVisibleNotes }: Props) => {
    const [itemsNotes, setItemsNotes] = useState<MenuItem[]>([
        {
            items: []
        }
    ]);
    const [saveNote, setSaveNote] = useState<boolean>(false);
    const [clientActive, setClientActive] = useState<string | null>(null);
    const [ActiveClient, setActiveClient] = useState<Client | null>(null);
    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);

    const { scmInfo, isLoading, reloadInfoSCM } = useCoreClientSCM({ id: selectedScm?.id.toString() });

    const [billNote, setBillNote] = useState<string>("Billable");
    const [minutes, setMinutes] = useState<number>(0);
    const [minutes_2, setMinutes_2] = useState<number>(0);
    const [minutes_3, setMinutes_3] = useState<number>(0);
    const [unit, setUnit] = useState<number>(32);
    const [unit_2, setUnit_2] = useState<number>(32);
    const [unit_3, setUnit_3] = useState<number>(32);

    useEffect(() => {
        reloadInfoSCM();
    }, [selectedScm]);

    useEffect(() => {
        const newItemsNotes: MenuItem[] = []; // Inicializamos newItemsNotes como un array vacío
        clients?.forEach((client) => {
            // Buscamos si el cliente actual está en las notas
            const clientInNotes = notes?.some((note) => note.scm.toString() === client.id.toString() && date === note.date);

            // Si el cliente no está en las notas, lo agregamos a newItemsNotes
            if (!clientInNotes) {

                newItemsNotes.push({
                    label: `${client.first_name} ${client.last_name}`,
                    icon: 'pi pi-user',
                    command: () => {
                        stepperRef.current.nextCallback()
                        setClientActive(client.first_name + " " + client.last_name);
                        setActiveClient(client);
                        client.scm.forEach((scm) => {
                            if (scm.status === "Open") {
                                setSelectedScm(scm);
                            }
                        })
                    }
                });
            }
        });
        // Actualizamos el estado de itemsNotes con la nueva lista
        setItemsNotes(newItemsNotes);
    }, [date]);


    const stepperRef = useRef<null | any>(null);

    return (
        <div className="card flex justify-content-center">
            <Stepper
                ref={stepperRef}
                orientation="vertical"
                linear
            >
                <StepperPanel header="Available clients">
                    <div className="flex flex-column h-12rem">
                        <div className="flex-auto flex justify-content-center align-items-center font-medium">
                            <Menu
                                model={itemsNotes}
                                pt={{
                                    root: {
                                        className: classNames("w-full"),
                                    },
                                    menuitem: {
                                        className: classNames('bg-blue-200 rounded w-1/3'),
                                    },

                                }}
                            />

                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-end">
                        {/* <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} /> */}
                    </div>
                </StepperPanel>
                <StepperPanel header={clientActive === null ? "Create Note" : "Create Note to " + clientActive}>
                    <div className="flex flex-column h-12rem">
                        <div className="flex-auto flex justify-content-center align-items-center font-medium">
                            {ActiveClient !== null && selectedScm !== undefined && scmInfo?.scm.id !== 0 && (
                                isLoading ? (<Skeleton className="mb-2" height="4rem" ></Skeleton>) : (
                                    <AddNotes
                                        scm={scmInfo?.scm}
                                        minutes={minutes}
                                        setMinutes={setMinutes}
                                        minutes_2={minutes_2}
                                        setMinutes_2={setMinutes_2}
                                        minutes_3={minutes_3}
                                        setMinutes_3={setMinutes_3}
                                        unit={unit}
                                        setUnit={setUnit}
                                        unit_2={unit_2}
                                        setUnit_2={setUnit_2}
                                        unit_3={unit_3}
                                        setUnit_3={setUnit_3}
                                        relad={relad}
                                        setVisibleNotes={setVisibleNotes}
                                        billNote={billNote}
                                        date={date}
                                        weeks={active?.activeUser?.WeekActive}
                                        showDate={false}
                                        save={saveNote}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Save" className='ml-2' severity="secondary" icon="pi pi-save" onClick={() => setSaveNote(true)} />
                        {/* <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} /> */}
                    </div>
                </StepperPanel>
            </Stepper>
        </div >
    )
};
type Props = {
    date: string;
    active: Active | undefined;
    clients?: Client[] | undefined;
    notes?: Notes[];
    relad(): void;
    setVisibleNotes(): void;
}
export { DiaryTCMaddNote };