import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { Dialog } from 'primereact/dialog';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
// ---
import { TourProps, Space, Tour } from 'antd';


import { DiaryNote } from "../tcm/components/diary/diaryNote";
import { SelectGoalSearch } from "./utils/selectGoalSearch";
// --New Struct
import { Active, Notes, Client, ServiceCM, ClientNotes } from '../../../models';
import { useClientNotes } from '../../../hooks/modules/tcm';

function getNextMonthDate() {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);

    // Asegúrate de manejar el cambio de año
    if (nextMonth.getMonth() === 0) {
        nextMonth.setFullYear(currentDate.getFullYear() + 1);
    }

    // Formatea la fecha como "MM/DD/YYYY"
    const formattedDate = `${nextMonth.getMonth() + 1
        }/${nextMonth.getDate()}/${nextMonth.getFullYear()}`;
    return formattedDate;
}

export const SearchNotes = ({ active, scm, relad, setVisible, visible }: Props) => {

    // const { clientNotes, reloadClientNotes } = useClientNotes({ id: scm?.id.toString() ?? "0" });
    const { tcmClientNotes } = useClientNotes();
    const [clientNotes, setClientNotes] = useState<ClientNotes>();
    const options = ['Date', 'Range', 'Month', 'Goal', 'Any'];
    const [value, setValue] = useState(options[0]);
    const [text, setText] = useState<string>("");
    const [valueDate, setValueDate] = useState<string | undefined>();
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
    const [listNote, setListNote] = useState<Notes[] | []>([]);

    const [visibleNote, setVisibleNote] = useState<boolean>(false);
    const [activeClient, setActiveClient] = useState<Client | undefined>(undefined);
    const [activeNote, setActiveNote] = useState<Notes | undefined>(undefined);


    // -----
    const [searchHelp, setSearchHelp] = useState<boolean>(false);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    // const ref3 = useRef(null);
    // const ref4 = useRef(null);
    // const ref5 = useRef(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Select search method',
            description: `Select how you want to search for notes.
            Date: Search for a specific date.
            Range: Search a range of dates.
            Month: Shows the notes for the selected month.
            Goal: Search the notes for a specific goal.
            Any: Searches for matches in the description texts and in FOLLOW UP`,
            // cover: (
            //   <img
            //     alt="tour.png"
            //     src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
            //   />
            // ),
            target: () => ref1.current,
        },
        {
            title: 'Search field',
            description: 'This field is modified depending on the selected search method.',
            target: () => ref2.current,
        },
        // {
        //     title: 'Units',
        //     description: 'Number of units reported in the active week notes',
        //     target: () => ref3.current,
        // },
        // {
        //     title: 'Add note',
        //     description: 'By clicking here the system will provide you with the form to add a note to the client.',
        //     target: () => ref4.current,
        // },
        // {
        //     title: 'Customer information',
        //     description: 'Here you can find data necessary for reports',
        //     target: () => ref5.current,
        //     // mask: false,
        // },
    ];
    // -----
    useEffect(() => {

        tcmClientNotes({ id: scm?.id.toString() })
            .then((data) => {
                setClientNotes(data);
            })
            .catch((error) => {
                console.error("Error al obtener las notas:", error);
            });

    }, [relad]);

    useEffect(() => {
        // Crear un nuevo arreglo con todas las fechas de las notas
        // const newDates = clientNotes?.all_notes?.map((note) => note.date) || [];

        // Actualizar el estado con el nuevo arreglo de fechas
        if (value === "Any") {
            const notesWithText = clientNotes?.all_notes?.filter((note) => note.description.includes(text ?? "") ||
                note.description_2.includes(text ?? "") ||
                note.description_3.includes(text ?? "") ||
                note.valueProgress1.includes(text ?? "") ||
                note.valueProgress2.includes(text ?? "") ||
                note.valueProgress3.includes(text ?? "") ||
                note.valueProgress4.includes(text ?? "") ||
                note.valueProgress5.includes(text ?? "") ||
                note.valueProgress6.includes(text ?? "") ||
                note.valueProgress7.includes(text ?? "") ||
                note.valueProgress8.includes(text ?? "") ||
                note.sprfollowup.includes(text ?? "")) ||
                [];
            setListNote(notesWithText)
        }
        if (value === "Goal") {
            const notesWithText = clientNotes?.all_notes?.filter((note) =>
                note.opening.includes(text ?? "") ||
                note.opening_2.includes(text ?? "") ||
                note.opening_3.includes(text ?? "") ||
                // --
                note.sp.includes(text ?? "") ||
                note.sp_2.includes(text ?? "") ||
                note.sp_3.includes(text ?? "") ||
                // --
                note.spr.includes(text ?? "") ||
                note.spr_2.includes(text ?? "") ||
                note.spr_3.includes(text ?? "") ||
                // --
                note.addendums.includes(text ?? "") ||
                note.addendums_2.includes(text ?? "") ||
                note.addendums_3.includes(text ?? "") ||
                // --
                note.closing.includes(text ?? "") ||
                note.closing_2.includes(text ?? "") ||
                note.closing_3.includes(text ?? "") ||
                // --
                note.opening.includes(text ?? "")) || [];
            setListNote(notesWithText)
            // console.log(notesWithText);
        }
        if (value === "Date") {
            const notesWithText = clientNotes?.all_notes?.filter((note) => note.date.includes(text ?? "")) || [];
            setListNote(notesWithText)
        }
        if (value === "Range") {
            if (dates && dates.length === 2 && dates[0] && dates[1]) {
                const [startDate, endDate] = dates;
                const notesInRange = clientNotes?.all_notes?.filter((note) => {
                    const noteDate = new Date(note.date);
                    // Convertimos las fechas a formato mm/dd/yyyy
                    const formattedNoteDate = (noteDate.getMonth() + 1) + '/' + noteDate.getDate() + '/' + noteDate.getFullYear();
                    const formattedStartDate = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();
                    const formattedEndDate = (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear();
                    return formattedNoteDate >= formattedStartDate && formattedNoteDate <= formattedEndDate;
                }) || [];
                setListNote(notesInRange);
            }
        }
        if (value === "Month") {
            const notesInRange = clientNotes?.all_notes?.filter((note) => {
                const noteDate = new Date(note.date);
                // Convertimos las fechas a formato mm/dd/yyyy
                const formattedNoteDate = (noteDate.getMonth()) + '/' + noteDate.getFullYear();
                const formattedDate = (date?.getMonth()) + '/' + date?.getFullYear();
                return formattedNoteDate === formattedDate;
            }) || [];

            setListNote(notesInRange);
        }
        // setDatesToDisable(newDates);
    }, [clientNotes, text, valueDate, dates, date]);

    const header = (
        <div className="flex w-full place-items-start">

            <div className="flex w-2/3">

            </div>
            <div className="w-1/3 text-right align-top">
                <i
                    className="pi pi-question-circle animate-blink cursor-pointer"
                    onClick={() => {
                        setSearchHelp(true);
                    }}
                /></div>
        </div>
    );

    const footer = (
        <div className="w-full flex justify-between">
            <div className='w-1/2 text-left'>
                {/* <b style={{ fontSize: "12px" }}>Select search method</b>
                <SelectButton
                    value={value}
                    onChange={(e) => {
                        setText("");
                        setValue(e.value);
                    }}
                    options={options}
                /> */}
            </div>
            <div className="w-1/2 h-auto flex justify-end items-end text-right">
                <i style={{ fontSize: "12px" }}>Press <b>ESC</b> to exit</i>
            </div>
        </div>

    );
    // -----------------
    const onRowSelect = (e: DataTableSelectEvent) => {
        setActiveNote(e.data);
        setVisibleNote(true);
    };

    useEffect(() => {

    }, [relad]);


    return (
        <>

            <Dialog
                position="top"
                header={header}
                visible={visible}
                maximizable

                // resizable
                // modal={true}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '60vw', '641px': '80vw' }}
                onHide={() => setVisible(false)}
                footer={footer}
                closeOnEscape
            >
                <div className='grid w-full'>
                    <Space className='grid'>
                        <div className="grid w-full">
                            <div style={{ position: "absolute", top: "5px" }} ref={ref1}>
                                <b style={{ fontSize: "12px" }}>Select search method</b>
                                <SelectButton
                                    value={value}

                                    onChange={(e) => {
                                        setText("");
                                        setValue(e.value);
                                    }}
                                    options={options}
                                />
                            </div>
                            {/* <div className='grid w-full bg-red-200'> */}
                            <div ref={ref2} className='w-full  border-secondary rounded-md'>
                                <IconField iconPosition="left" className='w-full'>
                                    {value === "Date" ? (
                                        <InputMask
                                            className='w-full'
                                            value={text}
                                            onChange={(e: InputMaskChangeEvent) => setText(e.target.value ?? "")}
                                            mask="99/99/9999"
                                            placeholder="mm/dd/yyyy"
                                            slotChar="mm/dd/yyyy"
                                        />
                                    ) : (
                                        value === "Goal" ? (
                                            <div className='pt-1'>
                                                <SelectGoalSearch scm={scm} setText={setText} />
                                            </div>
                                        ) : (
                                            value === "Month" ? <>
                                                <Calendar
                                                    value={date}
                                                    onChange={(e) => {
                                                        setDate(e.value);
                                                        setText("month");
                                                    }}
                                                    view="month"
                                                    dateFormat="mm/yy"
                                                />
                                            </> :
                                                (
                                                    value === "Range" ? <>
                                                        <Calendar
                                                            value={dates}
                                                            onChange={(e) => {
                                                                setDates(e.value);
                                                                setText("range");
                                                            }}
                                                            selectionMode="range"
                                                            placeholder="Search Range"
                                                            hideOnRangeSelection
                                                            numberOfMonths={2}
                                                        />
                                                    </> : <>
                                                        <InputIcon className="pi pi-question"></InputIcon>
                                                        <InputText
                                                            className='w-full pl-10 bg-gray-100 w-full'
                                                            placeholder="Search Note"
                                                            autoFocus
                                                            value={text}
                                                            onChange={(e) => { setText(e.target.value) }}
                                                        />
                                                    </>
                                                )
                                        )
                                    )}
                                </IconField>
                            </div>

                            {/* </div> */}
                            {(text !== "") && listNote.length > 0 ? (
                                <div className='w-full'>
                                    <DataTable
                                        value={listNote}
                                        stripedRows
                                        paginator
                                        selectionMode="single"
                                        rows={5}
                                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                        alwaysShowPaginator
                                        onRowSelect={onRowSelect}
                                    >
                                        <Column field="date" header="Date"></Column>
                                        <Column field="timeIn" header="Time IN"></Column>
                                        <Column field="timeOut" header="Time OUT"></Column>
                                    </DataTable>
                                </div>
                            ) : (
                                <div className='w-full'>
                                    {/* specify what you want to search */}
                                </div>
                            )}


                        </div>
                    </Space>
                </div>
                <Dialog header="Note" maximizable visible={visibleNote} style={{ width: '80vw' }} onHide={() => setVisibleNote(false)}>
                    <DiaryNote
                        note={activeNote}
                        client={activeClient}
                        lastName={scm?.Demografic.first_name + " " + scm?.Demografic.last_name}
                        tcm={scm?.tcm.full_name}
                        tcmSignature={scm?.tcm.signature}
                        tcmCredentials={scm?.tcm.categoryTCM}
                    />
                </Dialog>

            </Dialog>

            <Tour
                open={searchHelp}
                onClose={() => setSearchHelp(false)}
                steps={steps}
                zIndex={50000}
                type="primary"
                mask={{
                    style: {
                        boxShadow: 'inset 0 0 15px #333',
                    },
                    color: 'rgba(31, 31, 31, .7)',
                }}
            />
        </>
    )
}
type Props = {
    active?: Active,
    scm: ServiceCM | undefined;
    relad(): void;
    visible: boolean | true;
    setVisible: (value: React.SetStateAction<boolean>) => void;
}