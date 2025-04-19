import { useState, useEffect, useRef } from 'react';
// -- Libs PrimeReact
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';

import { CalculateUnits } from "../notes/utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { VoiceRecorder } from "../../commons"
import { getPlanImageUrl } from "../../../utils";
// New structure
import { CalculateAge } from "../../commons";
import { DemograficView } from "../../commons/clienteFile/demografic";
import { Active, TcmsNotesBill, Demografic, Notes } from "../../../models";
import { useNoteInvoiced, useNotePeriod, useBillApprove, useNotePaid, useNotePaidUnits } from "../../../hooks/modules/tcm";

// Añade esta función helper fuera del componente
const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};
interface Item {
    name: string;
    value: string;
}
const BillingBillerDetails = ({ active, relad }: Props) => {
    const [period, setPeriod] = useState<Nullable<(Date | null)[]>>(null);
    const [listTcm, setListTCM] = useState<TcmsNotesBill[] | undefined>([]);
    const [reload, setReload] = useState(true);
    const prevPeriodRef = useRef('');

    const { mutate: noteInvoiced } = useNoteInvoiced(relad);
    const { mutate: notePeriod } = useNotePeriod(relad);
    const { mutate: notePaid } = useNotePaid(relad);
    const { mutate: notePaidUnits } = useNotePaidUnits(relad);
    // ----------------
    const [visibleDemografic, setVisibleDemografic] = useState<boolean>(false);
    const [demograficClient, setDemograficClient] = useState<Demografic | undefined>(undefined);
    // ----------------
    const [showDetails, setShowDetails] = useState(false);
    const [DetailsNote, setDetailsNote] = useState<Notes | undefined>(undefined);
    // ----------------
    const [weekActive, setWeekActive] = useState(false);
    // ----------------
    const { mutate: invoicedBill } = useBillApprove(relad);
    const toast = useRef<Toast>(null);
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const acceptApproveBill = (id: number, number: string) => {
        invoicedBill(
            { id: id, number: number },
            {
                onSuccess: () => {
                    setListTCM(prevList =>
                        prevList?.map(item => {
                            if (item.billing?.id === id) {
                                return {
                                    ...item,
                                    billing: {
                                        ...item.billing,
                                        tcms_signature: "approved"
                                    }
                                };
                            }
                            return item;
                        })
                    );

                    setReload(true);
                    relad();
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Finished',
                        detail: 'The invoice has been successfully completed',
                        life: 3000
                    });
                },
                onError: (error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'The invoice could not be approved',
                        life: 3000
                    });
                }
            }
        );
    }
    const confirmBill = (position, id: number, number: string) => {
        confirmDialog({
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <span className='text-justify'>
                        Are you sure you want to continue?
                    </span>
                </div>
            ),
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            position,
            accept: () => {
                acceptApproveBill(id, number)
            },
            reject
        });
    };
    // ----------------
    const items: Item[] = [
        { name: 'Full', value: "Full" },
        { name: 'Denied', value: "Denied" },
        { name: 'Pending', value: "Pending" }
    ];
    const items2: Item[] = [
        { name: 'Full', value: "Full" },
        { name: 'Denied', value: "Denied" },
    ];
    // ----------------
    useEffect(() => {
        // Inicializar con el periodo del active
        if (active?.activeUser?.WeekActive?.start && active?.activeUser?.WeekActive?.end) {
            const startDate = parseDate(active.activeUser.WeekActive.start);
            const endDate = parseDate(active.activeUser.WeekActive.end);
            if (startDate && endDate) {
                const currentPeriodStr = `${startDate}-${endDate}`;
                if (currentPeriodStr !== prevPeriodRef.current) {
                    setPeriod([startDate, endDate]);
                    prevPeriodRef.current = currentPeriodStr;
                }
            }
            if (startDate && period && period[0] && startDate.toDateString() === period[0].toDateString() &&
                endDate && period[1] && endDate.toDateString() === period[1].toDateString()) {
                setWeekActive(true);
            } else {
                setWeekActive(false);
            }
        }

        // Si hay un periodo seleccionado, hacer la petición
        if (period && period[0] && period[1]) {
            setReload(false);
            notePeriod(
                {
                    period: period,
                },
                {
                    onSuccess: (data) => {
                        setListTCM(data);
                    },
                    // onError: () => {
                    //     setIsLoading(false);
                    // },
                }
            );
        }
    }, [period, active?.activeUser?.WeekActive, reload]);

    return (
        <div className="w-full p-5 mt-10">
            <div className='w-full flex items-center justify-end bg-gray-50'>
                <b>Select period:</b>
                <Calendar
                    value={period}
                    onChange={(e) => setPeriod(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                    showWeek
                    maxDate={parseDate(active?.activeUser?.WeekActive?.end || '') || undefined}
                    showIcon
                    pt={{
                        root: { className: "ml-2" },
                        input: { root: { className: "text-right border-primary border" } }
                    }}
                />
            </div>
            {listTcm?.length || 0 > 0 ? (
                listTcm?.map((data) => {
                    return (
                        <div className="w-full mt-2">
                            <div className='w-full flex border-primary border bg-blue-100 items-center'>
                                <div className="w-2/6 p-2">
                                    <b className='mr-2'>TCM/Credentials:</b>
                                    {data.billing?.tcm_full_name} / {data.billing?.tcm_credentials}
                                </div>
                                <div className="w-4/6">
                                    <div className="w-full flex items-center">
                                        <div className="w-4/12">
                                            <div className="w-full flex text-center text-sm items-center">
                                                <div className="p-2">
                                                    <b>Week:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    {data.week?.start} - {data.week?.end}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-6/12 flex">
                                            <div className='w-full flex items-center'>
                                                <div className="flex mr-2">
                                                    <b className='mr-2'>Billing created on:</b> {data.billing?.date}
                                                </div>
                                                {data.billing?.signatureBillerDate !== "" && <div className="flex">
                                                    <b className='mr-2'>Invoiced on:</b> {data.billing?.signatureBillerDate}
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="w-2/12 flex justify-end items-center">
                                            {active?.activeUser?.User?.roll === "BILLER" && data.billing?.tcms_signature !== "data:image/png;base64," && <div>
                                                {data.billing?.biller_signature === "data:image/png;base64," ? (
                                                    <div className="w-auto text-center place-items-center flex p-2 h-full border-l border-r border-primary">
                                                        <div
                                                            className='w-full bg-lineas-diagonales hover:bg-green-400 h-full content-center'
                                                            onClick={() => {
                                                                confirmBill('bottom-right', data.billing?.id || 0, "1");
                                                            }}
                                                        >
                                                            <b className='text-green-500 cursor-pointer'>
                                                                Finished
                                                            </b>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-1/4 place-items-center content-center text-right" >
                                                        <b className='text-green-500 animate-pulse pr-5'>
                                                            Invoiced
                                                        </b>
                                                    </div>
                                                )}
                                            </div>}

                                            {/* TODO Esto es para poner la firma en el billing del finance */}
                                            {/* {active?.activeUser?.User?.roll === "FINANCE" &&
                                                                        data.billing?.biller_signature !== "data:image/png;base64," &&
                                                                        (
                                                                            <div>
                                                                                {isFinanceSignature(data.billing?.signature_finance) ? (
                                                                                    renderFinishedButton(data.billing?.id, "1")
                                                                                ) : (
                                                                                    isFinanceSignature(data.billing?.signature_finance2) ? (
                                                                                        renderFinishedButton(data.billing?.id, "2")
                                                                                    ) : (
                                                                                        isFinanceSignature(data.billing?.signature_finance3) ? (
                                                                                            renderFinishedButton(data.billing?.id, "3")
                                                                                        ) : (
                                                                                            renderPaidLabel()
                                                                                        )
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        )} */}

                                            <VoiceRecorder
                                                relad={relad}
                                                active={active}
                                                to={active?.activeUser?.User?.ID.toString() || "0"}
                                                module="tcm"
                                                component="Billing"
                                                id_component={data?.billing?.id.toString() || "0"}
                                                mode='private'
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='border-primary border border-t-0 border-b-0'>
                                {data.clients?.map((client) => {
                                    const age = CalculateAge({ dob: client.dob ?? "00/00/0000" });
                                    return (
                                        <div className='w-full'>
                                            {/* row 3 */}
                                            <div className="w-full flex bg-orange-200 border-primary border-b ">
                                                <div
                                                    className="w-1/5 text-center text-sm border-r border-primary place-items-center p-2 hover:text-secondary-hover hover:cursor-pointer"
                                                    onClick={() => {
                                                        setDemograficClient(client.scm.Demografic);
                                                        setVisibleDemografic(true);
                                                    }}
                                                >
                                                    <b>Client:</b> {client.first_name}{" "}{client.last_name}
                                                </div>
                                                <div className="w-4/5">
                                                    <div className="w-full flex">
                                                        <div className="w-full">
                                                            <div className="w-full flex text-center text-sm">
                                                                <div className="p-2 w-32 border-primary border-r">
                                                                    <b>Date</b>
                                                                </div>
                                                                <div className="p-2 w-24 border-primary border-r">
                                                                    <b>Ins-Id</b>
                                                                </div>
                                                                <div className="p-2 w-24 border-primary border-r">
                                                                    <b>Ins-Plan</b>
                                                                </div>
                                                                <div className="p-2 w-24 border-primary border-r">
                                                                    <b>CPT code</b>
                                                                </div>
                                                                <div className="p-2 w-20 border-primary border-r">
                                                                    <b>UNITS</b>
                                                                </div>
                                                                <div className="p-2 w-14 border-primary border-r">
                                                                    <b>LOC</b>
                                                                </div>
                                                                <div className="p-2 w-32 border-primary border-r">
                                                                    <b>Time In</b>
                                                                </div>
                                                                <div className="p-2 w-32 border-primary border-r">
                                                                    <b>Time Out</b>
                                                                </div>
                                                                <div className="p-2 w-20 border-primary border-r">
                                                                    <b>Time</b>
                                                                </div>
                                                                <div className="p-2 w-20 border-primary border-r">
                                                                    <b>Units</b>
                                                                </div>
                                                                <div className="justify-end text-center w-auto flex-grow">
                                                                    <div className='w-full flex'>

                                                                        <div className='w-1/4 p-2'><b> {active?.activeUser?.User?.roll === "BILLER" ? "Invoiced" : "Payment"}</b></div>

                                                                        <div className='w-1/4 p-2 border-r border-black'>
                                                                            1st
                                                                        </div>
                                                                        <div className='w-1/4 p-2 border-r border-black'>
                                                                            2nd
                                                                        </div>
                                                                        <div className='w-1/4 p-2'>
                                                                            3rd
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* -------------------------------- */}
                                            <div className="w-full flex border-primary border-r-0">
                                                <div className="w-1/5 text-center text-sm bg-orange-100 border-r border-b border-primary relative content-center">
                                                    <div className="absolute inset-0 bg-white opacity-20"
                                                        style={{
                                                            // backgroundImage: `url(${apiUrlStatic}/static/media/wellcare-green.png)`,
                                                            backgroundImage: client.scm.sure_active.plan_name
                                                                ? `url(${getPlanImageUrl(client.scm.sure_active.plan_name)})`
                                                                : 'none',
                                                            backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                                                            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                                                            backgroundPosition: 'center', // Centra la imagen
                                                            opacity: 0.2
                                                        }}
                                                    ></div>
                                                    <div className="relative text-black w-full">
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">MR#</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.id}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">M.H. Diagnosis:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.Mental.mental_primary}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">Medicaid:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.Demografic.medicaid}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">Medicare:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.Demografic.medicare}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">Insurance Plan:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.sure_active.plan_name}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">Insurance Id:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.sure_active.plan_id}</div>
                                                        </div>
                                                        <div className="w-full flex">
                                                            <div className="w-1/2 text-right font-bold">DOB:</div>
                                                            <div className="w-1/2 text-left pl-2">{client.scm.Demografic.dob}</div>
                                                        </div>

                                                        {weekActive && <>
                                                            <div className="w-full text-center font-bold">
                                                                Remaining Units
                                                            </div>
                                                            <div className="w-full flex items-center">
                                                                <div className='w-2/6'>
                                                                    {(client.scm.sure_active.unit ?? 0) - (client.scm.units_consumed ?? 0)} units
                                                                </div>
                                                                <progress
                                                                    className={classNames(
                                                                        "progress",
                                                                        {
                                                                            "progress-warning": ((client.scm.sure_active.unit ?? 0) - (client.scm.units_consumed ?? 0)) < 20,
                                                                            "progress-error": ((client.scm.sure_active.unit ?? 0) - (client.scm.units_consumed ?? 0)) < 10,
                                                                            "progress-info": ((client.scm.sure_active.unit ?? 0) - (client.scm.units_consumed ?? 0)) >= 20
                                                                        },
                                                                        "w-4/6 ml-2 mr-2"
                                                                    )}
                                                                    value={(client.scm.sure_active.unit ?? 0) - (client.scm.units_consumed ?? 0)}
                                                                    max={client.scm.sure_active.unit}>
                                                                </progress>
                                                                <div className='w-2/6'>
                                                                    of {client.scm.sure_active.unit}
                                                                </div>
                                                            </div>
                                                        </>}
                                                    </div>

                                                </div>
                                                <div className="w-4/5 h-full border-primary relative" style={{ zIndex: 1 }}>
                                                    {/* <div className="absolute inset-0"
                                                        style={{
                                                            backgroundImage: client.scm.sure_active.plan_name
                                                                ? `url(${getPlanImageUrl(client.scm.sure_active.plan_name)})`
                                                                : 'none',
                                                            backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                                                            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                                                            backgroundPosition: 'top', // Centra la imagen
                                                            opacity: 0.2,
                                                            zIndex: -1 // Asegura que quede detrás de los otros elementos
                                                        }}
                                                    ></div> */}
                                                    {client.notes.map((note, k) => {
                                                        return (
                                                            <div
                                                                className={classNames(
                                                                    (note.paid === "Full" || note.paid2 === "Full" || note.paid3 === "Full") ?
                                                                        "bg-green-200 bg-opacity-30" : (note.paid === "Denied" || note.paid2 === "Denied" || note.paid3 === "Denied") &&
                                                                        "bg-red-200 bg-opacity-40",
                                                                    "hover:bg-orange-200 hover:bg-opacity-20 hover:font-bold",
                                                                )}
                                                            >
                                                                <div className="w-full flex border-primary border-b">
                                                                    <div className="w-full">
                                                                        <div className="w-full flex content-center align-middle text-center text-sm">
                                                                            <div
                                                                                className="p-2 w-32 border-primary border-r place-content-center hover:cursor-pointer"
                                                                                onClick={() => {
                                                                                    setDetailsNote(note);
                                                                                    setShowDetails(true);
                                                                                }}
                                                                            >
                                                                                <b className='border-b border-black'>{note.date}</b>
                                                                            </div>
                                                                            <div className="p-2 w-24 border-primary border-r place-content-center">
                                                                                {note.insurance_id}
                                                                            </div>
                                                                            <div className="p-2 w-24 border-primary border-r place-content-center text-center flex justify-center items-center">
                                                                                <img src={getPlanImageUrl(note.insurance_plan)} className='w-10' alt={note.insurance_plan} />
                                                                            </div>
                                                                            <div className="p-2 w-24 border-primary border-r place-content-center">
                                                                                T1017 {age < 18 && "-HA"}
                                                                            </div>
                                                                            <div className="p-2 w-20 border-primary border-r place-content-center bg-orange-200 bg-opacity-50">
                                                                                {note.units}
                                                                            </div>
                                                                            <div className="p-2 w-14 border-primary border-r place-content-center">
                                                                                {note.location}
                                                                            </div>
                                                                            <div className="p-2 w-32 border-primary border-r place-content-center">
                                                                                {note.timeIn}
                                                                            </div>
                                                                            <div className="p-2 w-32 border-primary border-r place-content-center text-center flex justify-center items-center">
                                                                                {note.timeOut}
                                                                            </div>
                                                                            <div className="p-2 w-20 border-primary border-r place-content-center">
                                                                                {CalculateMinutes({
                                                                                    firstHour: note.timeIn,
                                                                                    secondHour: note.timeOut,
                                                                                })}{" "}
                                                                                min
                                                                            </div>
                                                                            <div className="p-2 w-20 border-primary border-r place-content-center">
                                                                                {CalculateUnits({
                                                                                    minutes: CalculateMinutes({
                                                                                        firstHour: note.timeIn,
                                                                                        secondHour: note.timeOut,
                                                                                    }),
                                                                                })}
                                                                            </div>
                                                                            {active?.activeUser?.User?.roll === "BILLER" ? (
                                                                                <div className="justify-end text-center w-auto flex-grow">
                                                                                    {data.billing?.tcms_signature !== "data:image/png;base64," ? (<div className='w-full flex'>
                                                                                        <div className='w-1/4 p-2'></div>
                                                                                        <div className='w-1/4 p-2 items-center border-r border-black'>

                                                                                            {note.invoiced === false ? (
                                                                                                <InputSwitch
                                                                                                    checked={note.invoiced}
                                                                                                    disabled={note.invoiced}
                                                                                                    onChange={() => {
                                                                                                        confirmDialog({
                                                                                                            message: (
                                                                                                                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                    <span className='text-justify'>
                                                                                                                        Are you sure you want to continue?
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            ),
                                                                                                            header: 'Confirmation',
                                                                                                            icon: 'pi pi-info-circle',
                                                                                                            position: 'bottom-right',
                                                                                                            accept: () => {
                                                                                                                noteInvoiced(
                                                                                                                    {
                                                                                                                        id: Number(note.ID),
                                                                                                                        invoiced: !note.invoiced,
                                                                                                                        invoice: "1"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        onSuccess: () => {
                                                                                                                            setReload(true);
                                                                                                                        }
                                                                                                                    }
                                                                                                                );
                                                                                                            },
                                                                                                            reject
                                                                                                        });
                                                                                                    }}
                                                                                                />
                                                                                            ) : (
                                                                                                note.invoiced_date
                                                                                            )}
                                                                                        </div>
                                                                                        <div className='w-1/4 p-2 border-r border-black items-center'>
                                                                                            {(note.paid === "Denied") && note.invoiced2 === false ? <InputSwitch
                                                                                                checked={note.invoiced2}
                                                                                                disabled={note.invoiced2}
                                                                                                onChange={() => {
                                                                                                    confirmDialog({
                                                                                                        message: (
                                                                                                            <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                <span className='text-justify'>
                                                                                                                    Are you sure you want to continue?
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        ),
                                                                                                        header: 'Confirmation',
                                                                                                        icon: 'pi pi-info-circle',
                                                                                                        position: 'bottom-right',
                                                                                                        accept: () => {
                                                                                                            noteInvoiced(
                                                                                                                {
                                                                                                                    id: Number(note.ID),
                                                                                                                    invoiced: !note.invoiced2,
                                                                                                                    invoice: "2"
                                                                                                                },
                                                                                                                {
                                                                                                                    onSuccess: () => {
                                                                                                                        setReload(true);
                                                                                                                    }
                                                                                                                }
                                                                                                            );
                                                                                                        },
                                                                                                        reject
                                                                                                    });
                                                                                                }}
                                                                                            /> : (
                                                                                                note.paid === "Full" ? "N/A" : note.invoiced_date2
                                                                                            )}
                                                                                        </div>
                                                                                        <div className='w-1/4 p-2'>
                                                                                            {note.paid2 === "Denied" && note.invoiced3 === false ? <InputSwitch
                                                                                                checked={note.invoiced3}
                                                                                                disabled={note.invoiced3}
                                                                                                onChange={() => {
                                                                                                    confirmDialog({
                                                                                                        message: (
                                                                                                            <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                <span className='text-justify'>
                                                                                                                    Are you sure you want to continue?
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        ),
                                                                                                        header: 'Confirmation',
                                                                                                        icon: 'pi pi-info-circle',
                                                                                                        position: 'bottom-right',
                                                                                                        accept: () => {
                                                                                                            noteInvoiced(
                                                                                                                {
                                                                                                                    id: Number(note.ID),
                                                                                                                    invoiced: !note.invoiced3,
                                                                                                                    invoice: "3"
                                                                                                                },
                                                                                                                {
                                                                                                                    onSuccess: () => {
                                                                                                                        setReload(true);
                                                                                                                    }
                                                                                                                }
                                                                                                            );
                                                                                                        },
                                                                                                        reject
                                                                                                    });
                                                                                                }}
                                                                                            /> : (
                                                                                                note.paid === "Full" ? "N/A" : note.paid2 === "Full" ? "N/A" : note.invoiced_date3
                                                                                            )}
                                                                                        </div>
                                                                                    </div>) : (
                                                                                        <b className='text-red-500'>Pending supervision</b>
                                                                                    )
                                                                                    }
                                                                                </div>
                                                                            ) : (
                                                                                // FINANCE VIEW
                                                                                <div className="flex justify-end items-center w-auto flex-grow">
                                                                                    <div className='w-full justify-end items-center flex-grow'>
                                                                                        {note.paid !== "" &&
                                                                                            <div className='w-full flex'>
                                                                                                <div className='w-1/4 p-2'></div>
                                                                                                <div className='w-1/4 p-2 border-r border-black'>
                                                                                                    {note.paid !== "" && note.paid}
                                                                                                </div>
                                                                                                <div className={classNames(
                                                                                                    'w-1/4 p-2 border-r border-black',
                                                                                                    (note.paid === "Denied" && note.invoiced2 === true && note.paid2 === "") && "bg-orange-100 animate-pulse"
                                                                                                )}>
                                                                                                    {(note.paid === "Full" || (note.paid === "Denied" && note.invoiced2 === false)) ? "X" : (
                                                                                                        <>
                                                                                                            {note.paid2 !== "" && note.paid2}
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                                <div className={classNames(
                                                                                                    'w-1/4 p-2',
                                                                                                    (note.paid2 === "Denied" && note.invoiced3 === false) && note.paid3 === "" && "bg-orange-100 animate-blink"
                                                                                                )}>
                                                                                                    {((note.paid === "Denied" && note.invoiced3 === false) || (note.paid2 === "Denied" && note.invoiced3 === false) || note.paid === "Full" || note.paid2 === "Full") ? "X" :
                                                                                                        <>
                                                                                                            {note.paid3 !== "" && note.paid3}
                                                                                                        </>
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        }

                                                                                        {((note.signature_finance === "data:image/png;base64," || note.signature_finance === undefined) &&
                                                                                            (note.paid !== "Full" && note.paid !== "Denied" && note.paid !== "Pending") &&
                                                                                            note.paidUnits === 0) ?
                                                                                            <div className={classNames(
                                                                                                'w-full flex justify-end items-center p-2',
                                                                                            )}>


                                                                                                {data.billing?.tcms_signature !== "data:image/png;base64," ? (
                                                                                                    <SelectButton
                                                                                                        disabled={!note.invoiced}
                                                                                                        value={note.paid}
                                                                                                        onChange={(e) => {
                                                                                                            confirmDialog({
                                                                                                                message: (
                                                                                                                    <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                        <span className='text-justify'>
                                                                                                                            Are you sure you want to continue?
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                ),
                                                                                                                header: 'Confirmation',
                                                                                                                icon: 'pi pi-info-circle',
                                                                                                                position: 'bottom-right',
                                                                                                                accept: () => {
                                                                                                                    notePaid({
                                                                                                                        id: Number(note.ID),
                                                                                                                        paid: e.value,
                                                                                                                        number: "1"
                                                                                                                    }, {
                                                                                                                        onSuccess: () => {
                                                                                                                            // Actualizar la lista local
                                                                                                                            setListTCM(prevList =>
                                                                                                                                prevList?.map(tcm => ({
                                                                                                                                    ...tcm,
                                                                                                                                    clients: tcm.clients?.map(client => ({
                                                                                                                                        ...client,
                                                                                                                                        notes: client.notes.map(n =>
                                                                                                                                            n.ID === note.ID
                                                                                                                                                ? { ...n, paid: e.value }
                                                                                                                                                : n
                                                                                                                                        )
                                                                                                                                    }))
                                                                                                                                }))
                                                                                                                            );

                                                                                                                            // Llamar a relad para actualizar datos del padre
                                                                                                                            relad();
                                                                                                                        }
                                                                                                                    });
                                                                                                                },
                                                                                                                reject
                                                                                                            });
                                                                                                        }}

                                                                                                        optionLabel="name"
                                                                                                        options={items}
                                                                                                    />
                                                                                                ) : (
                                                                                                    <b className='text-red-500'>Pending supervision</b>
                                                                                                )}
                                                                                            </div> : (
                                                                                                (note.signature_finance2 === "data:image/png;base64," || note.signature_finance2 === undefined) &&
                                                                                                    (note.paid === "Pending" || (note.paid === "Denied" && note.invoiced2)) &&
                                                                                                    (note.paid2 === "") ?
                                                                                                    <div className='w-full flex justify-end items-center p-2 border-t border-black'>
                                                                                                        <SelectButton
                                                                                                            disabled={!note.invoiced}
                                                                                                            value={note.paid2}
                                                                                                            onChange={(e) => {
                                                                                                                confirmDialog({
                                                                                                                    message: (
                                                                                                                        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                            <span className='text-justify'>
                                                                                                                                Are you sure you want to continue?
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    ),
                                                                                                                    header: 'Confirmation',
                                                                                                                    icon: 'pi pi-info-circle',
                                                                                                                    position: 'bottom-right',
                                                                                                                    accept: () => {
                                                                                                                        notePaid({
                                                                                                                            id: Number(note.ID),
                                                                                                                            paid: e.value,
                                                                                                                            number: "2"
                                                                                                                        }, {
                                                                                                                            onSuccess: () => {

                                                                                                                                // Actualizar la lista local
                                                                                                                                setListTCM(prevList =>
                                                                                                                                    prevList?.map(tcm => ({
                                                                                                                                        ...tcm,
                                                                                                                                        clients: tcm.clients?.map(client => ({
                                                                                                                                            ...client,
                                                                                                                                            notes: client.notes.map(n =>
                                                                                                                                                n.ID === note.ID
                                                                                                                                                    ? { ...n, paid2: e.value }
                                                                                                                                                    : n
                                                                                                                                            )
                                                                                                                                        }))
                                                                                                                                    }))
                                                                                                                                );
                                                                                                                                // Llamar a relad para actualizar datos del padre
                                                                                                                                relad();
                                                                                                                            }
                                                                                                                        });
                                                                                                                    },
                                                                                                                    reject
                                                                                                                });
                                                                                                            }}
                                                                                                            optionLabel="name"
                                                                                                            options={items2}
                                                                                                        />

                                                                                                    </div> : (
                                                                                                        (note.signature_finance3 === "data:image/png;base64," || note.signature_finance3 === undefined) &&
                                                                                                        (note.paid !== "Full" && note.paid !== "" && note.paid2 !== "Full" && note.paid2 !== "") &&
                                                                                                        (note.paid3 !== "Full" && note.paid3 !== "Denied" && note.invoiced3) &&
                                                                                                        note.paidUnits3 === 0) &&
                                                                                                    <div className='w-full flex justify-end items-center p-2 border-t border-black'>
                                                                                                        <SelectButton
                                                                                                            disabled={!note.invoiced}
                                                                                                            value={note.paid3}
                                                                                                            onChange={(e) => {
                                                                                                                confirmDialog({
                                                                                                                    message: (
                                                                                                                        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                                                                                                                            <span className='text-justify'>
                                                                                                                                Are you sure you want to continue?
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    ),
                                                                                                                    header: 'Confirmation',
                                                                                                                    icon: 'pi pi-info-circle',
                                                                                                                    position: 'bottom-right',
                                                                                                                    accept: () => {
                                                                                                                        notePaid({
                                                                                                                            id: Number(note.ID),
                                                                                                                            paid: e.value,
                                                                                                                            number: "3"
                                                                                                                        }, {
                                                                                                                            onSuccess: () => {

                                                                                                                                // Actualizar la lista local
                                                                                                                                setListTCM(prevList =>
                                                                                                                                    prevList?.map(tcm => ({
                                                                                                                                        ...tcm,
                                                                                                                                        clients: tcm.clients?.map(client => ({
                                                                                                                                            ...client,
                                                                                                                                            notes: client.notes.map(n =>
                                                                                                                                                n.ID === note.ID
                                                                                                                                                    ? { ...n, paid3: e.value }
                                                                                                                                                    : n
                                                                                                                                            )
                                                                                                                                        }))
                                                                                                                                    }))
                                                                                                                                );

                                                                                                                                // Llamar a relad para actualizar datos del padre
                                                                                                                                relad();
                                                                                                                            }
                                                                                                                        });
                                                                                                                    },
                                                                                                                    reject
                                                                                                                });
                                                                                                            }}
                                                                                                            optionLabel="name"
                                                                                                            options={items2}
                                                                                                        />

                                                                                                    </div>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {note.timeOut_2 !== "" && (
                                                                    <div className="w-full flex border-primary border-b">
                                                                        <div className="w-full">
                                                                            <div className="w-full flex text-center text-sm">
                                                                                <div
                                                                                    className="p-2 w-32 border-r text-gray-50"
                                                                                >
                                                                                    {note.date}
                                                                                </div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-20 border-primary border-r"></div>
                                                                                <div className="p-2 w-14 border-primary border-r">
                                                                                    {note.location_2}
                                                                                </div>
                                                                                <div className="p-2 w-32 border-primary border-r">
                                                                                    {note.timeIn_2}
                                                                                </div>
                                                                                <div className="p-2 w-32 border-primary border-r">
                                                                                    {note.timeOut_2}
                                                                                </div>
                                                                                <div className="p-2 w-20 border-primary border-r">
                                                                                    {CalculateMinutes({
                                                                                        firstHour: note.timeIn_2,
                                                                                        secondHour: note.timeOut_2,
                                                                                    })}{" "}
                                                                                    min
                                                                                </div>
                                                                                <div className="p-2 w-20 border-primary border-r">
                                                                                    {CalculateUnits({
                                                                                        minutes: CalculateMinutes({
                                                                                            firstHour: note.timeIn_2,
                                                                                            secondHour: note.timeOut_2,
                                                                                        }),
                                                                                    })}
                                                                                </div>

                                                                                <div className="p-2 w-auto">

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {note.timeOut_3 !== "" && (
                                                                    <div className="w-full flex border-primary border-b">
                                                                        <div className="w-full">
                                                                            <div className="w-full flex text-center text-sm">
                                                                                <div
                                                                                    className="p-2 w-32 border-r text-gray-50"
                                                                                >
                                                                                    {note.date}
                                                                                </div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-24 border-r"></div>
                                                                                <div className="p-2 w-20 border-primary border-r"></div>
                                                                                <div className="p-2 w-14 border-primary border-r">
                                                                                    {note.location_3}
                                                                                </div>
                                                                                <div className="p-2 w-32 border-primary border-r">
                                                                                    {note.timeIn_3}
                                                                                </div>
                                                                                <div className="p-2 w-32 border-primary border-r">
                                                                                    {note.timeOut_3}
                                                                                </div>
                                                                                <div className="p-2 w-20 border-primary border-r">
                                                                                    {CalculateMinutes({
                                                                                        firstHour: note.timeIn_3,
                                                                                        secondHour: note.timeOut_3,
                                                                                    })}{" "}
                                                                                    min
                                                                                </div>
                                                                                <div className="p-2 w-20 border-r border-primary">
                                                                                    {CalculateUnits({
                                                                                        minutes: CalculateMinutes({
                                                                                            firstHour: note.timeIn_3,
                                                                                            secondHour: note.timeOut_3,
                                                                                        }),
                                                                                    })}
                                                                                </div>
                                                                                <div className="p-2 w-auto">

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}

                                                </div>
                                            </div>
                                            {/* -------------------------------------------------------------------------------------------------- */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })
            ) : (
                <Message text="No billing for this period" className="w-full mt-6 bg-gray-100 h-96" />
            )
            }

            <Dialog
                header={() => {
                    return (
                        <div className='w-full flex items-center'>
                            <div className='w-1/3'>
                                Demographic
                            </div>

                        </div>
                    )
                }}
                visible={visibleDemografic}
                maximizable
                style={{ width: "90vw" }}
                breakpoints={{ "960px": "90vw", "641px": "90vw" }}
                onHide={() => setVisibleDemografic(false)}
            >
                {demograficClient !== undefined && <DemograficView demografic={demograficClient} />}
            </Dialog >
            <Dialog
                header={() => {
                    return (
                        <div className='w-full flex items-center'>
                            <div className='w-1/3'>
                                Details Note {DetailsNote?.date}
                            </div>

                        </div>
                    )
                }}
                visible={showDetails}
                maximizable
                style={{ width: "90vw" }}
                breakpoints={{ "960px": "90vw", "641px": "90vw" }}
                onHide={() => setShowDetails(false)}
            >
                {DetailsNote !== undefined &&
                    <div className='w-full'>
                        <div className='w-full flex text-center'>
                            <div className='w-1/3'><b className='border-b border-black'>1st Payment</b></div>
                            <div className='w-1/3'><b className='border-b border-black'>2nd Payment</b></div>
                            <div className='w-1/3'><b className='border-b border-black'>3rd Payment</b></div>
                        </div>
                        <div className='w-full flex'>
                            <div className='w-1/3 border-r'>
                                <div className="w-full p-4">
                                    {DetailsNote.paid !== "" ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Date:</div>
                                                <div>{DetailsNote.paid_date}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid:</div>
                                                <div>{DetailsNote?.paid}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Units:</div>
                                                <div>{DetailsNote.paidUnits}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Payroll updated by:</div>
                                                <div>{DetailsNote.finance_full_name}</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold"></div>
                                                <div className='border-b border-black'>
                                                    <img src={DetailsNote.signature_finance} style={{ width: "150px" }} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : <Message text="No information" className="w-full bg-gray-100 h-64" />}

                                </div>
                            </div>
                            <div className='w-1/3 border-r'>
                                <div className="w-full p-4">
                                    {DetailsNote.paid2 !== "" ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Date:</div>
                                                <div>{DetailsNote.paid_date2}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid:</div>
                                                <div>{DetailsNote?.paid2}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Units:</div>
                                                <div>{DetailsNote.paidUnits2}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Payroll updated by:</div>
                                                <div>{DetailsNote.finance2_full_name}</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold"></div>
                                                <div className='border-b border-black'>
                                                    <img src={DetailsNote.signature_finance2} style={{ width: "150px" }} />
                                                </div>
                                            </div>
                                        </div>) : <Message text="No information" className="w-full bg-gray-100 h-64" />}
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className="w-full p-4">
                                    {DetailsNote.paid3 !== "" ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Date:</div>
                                                <div>{DetailsNote.paid_date3}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid:</div>
                                                <div>{DetailsNote?.paid3}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Paid Units:</div>
                                                <div>{DetailsNote.paidUnits3}</div>
                                            </div>
                                            <div className="flex justify-between items-center border-b">
                                                <div className="font-bold">Payroll updated by:</div>
                                                <div>{DetailsNote.finance3_full_name}</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold"></div>
                                                <div className='border-b border-black'>
                                                    <img src={DetailsNote.signature_finance3} style={{ width: "150px" }} />
                                                </div>
                                            </div>
                                        </div>) : <Message text="No information" className="w-full bg-gray-100 h-64" />}
                                </div>
                            </div>
                        </div>


                    </div>
                }
            </Dialog >
            {/* -------------------- */}
            <Toast ref={toast} />
            <ConfirmDialog />
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { BillingBillerDetails }






