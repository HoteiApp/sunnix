import { useState, useEffect, useRef } from 'react';
// -- Libs PrimeReact
import { classNames } from "primereact/utils";
import { Skeleton } from 'primereact/skeleton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { CalculateUnits } from "../notes/utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { VoiceRecorder } from "../../commons"
import { getPlanImageUrl } from "../../../utils";
// New structure
import { CalculateAge } from "../../commons";
import { Active, TcmsNotesBill } from "../../../models";
import { useBillDel, useBillApprove, useNotePeriod } from "../../../hooks/modules/tcm";
import { Nullable } from "primereact/ts-helpers";
// Añade esta función helper fuera del componente
const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};
const BillingTCMS = ({ active, relad }: Props) => {
    const { mutate: notePeriod } = useNotePeriod(relad);
    const [period, setPeriod] = useState<Nullable<(Date | null)[]>>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate: delBill } = useBillDel(relad);
    const { mutate: approveBill } = useBillApprove(relad);
    const prevPeriodRef = useRef('');
    const [listTcm, setListTCM] = useState<TcmsNotesBill[] | undefined>([]);

    const toast = useRef<Toast>(null);
    // ----------------
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    // -------------------
    const acceptDelBill = (id: number) => {
        delBill(
            { id: id },
            {
                onSuccess: () => {
                    setListTCM(prevList => prevList?.filter(item => item.billing?.id !== id));

                    relad();

                    toast.current?.show({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: 'The invoice has been successfully deleted',
                        life: 3000
                    });
                },
                onError: (error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Could not delete the invoice',
                        life: 3000
                    });
                }
            }
        );
    }
    const acceptApproveBill = (id: number) => {
        approveBill(
            { id: id, number: "1" },
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

                    relad();
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Approved',
                        detail: 'The invoice has been successfully approved',
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

    const confirmBill = (position, func: string, id: number) => {
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
                func === "delBill" ? acceptDelBill(id) : acceptApproveBill(id)
            },
            reject
        });
    };

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
        }

        // Si hay un periodo seleccionado, hacer la petición
        if (period && period[0] && period[1]) {
            setIsLoading(true);
            notePeriod(
                {
                    period: period,
                },
                {
                    onSuccess: (data) => {
                        setListTCM(data);
                        setIsLoading(false);
                    },
                    onError: () => {
                        setIsLoading(false);
                    },
                }
            );
        }
    }, [period, active?.activeUser?.WeekActive]);

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
            {!isLoading ? (
                listTcm?.length || 0 > 0 ? (
                    listTcm?.map((data, index) => {
                        return (
                            <div className="w-full">
                                <div className='w-full flex border-primary border bg-blue-100'>
                                    <div className="w-1/5 text-center p-2">
                                        <b>TCM/Credentials:</b>
                                    </div>
                                    <div className="w-4/5">
                                        <div className="w-full flex">
                                            <div className="p-2 w-1/4">
                                                {data.billing?.tcm_full_name} / {data.billing?.tcm_credentials}
                                            </div>
                                            <div className="w-2/4">
                                                <div className="w-full flex text-center text-sm">
                                                    <div className="p-2">
                                                        <b>Pay Period:</b>
                                                    </div>
                                                    <div className="p-2 w-auto">
                                                        {data.week?.start} - {data.week?.end}
                                                    </div>
                                                </div>
                                            </div>
                                            {data.billing?.tcms_signature === "data:image/png;base64," ? (
                                                <div className="w-1/4 text-center place-items-center flex">
                                                    <div
                                                        className='w-full bg-lineas-diagonales hover:bg-orange-400 h-full content-center border-primary border-l border-r'
                                                        onClick={() => {
                                                            confirmBill('bottom-right', "delBill", data.billing?.id || 0);
                                                        }}
                                                    >

                                                        <b className='text-red-500 cursor-pointer'>
                                                            Reject
                                                        </b>
                                                    </div>
                                                    <div
                                                        className='w-full bg-lineas-diagonales hover:bg-green-400 h-full content-center'
                                                        onClick={() => {
                                                            confirmBill('bottom-right', "approveBill", data.billing?.id || 0);
                                                        }}
                                                    >
                                                        <b className='text-green-500 cursor-pointer'>
                                                            Approve
                                                        </b>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-1/4 place-items-center content-center text-right" >
                                                    <b className='text-green-500 animate-pulse pr-5'>
                                                        Approved
                                                    </b>
                                                </div>
                                            )}
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
                                                            // setSelectedScm(client.scm);
                                                            // setSelectedScmNum(1);
                                                            // onInfo();
                                                        }}
                                                    >
                                                        <b>Client:</b> {client.first_name}{" "}{client.last_name}
                                                    </div>
                                                    <div className="w-4/5">
                                                        <div className="w-full flex">
                                                            <div className="w-full">
                                                                <div className="w-full flex text-center text-sm">
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>Date</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>CPT code</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>UNITS</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>LOC</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>Time In</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>Time Out</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                        <b>Time</b>
                                                                    </div>
                                                                    <div className="p-2 w-1/6">
                                                                        <b>Units</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* -------------------------------- */}
                                                <div className="w-full flex border-primary border-r-0">
                                                    <div className="w-1/5 text-center text-sm bg-orange-100 border-r border-b border-primary relative content-center">
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
                                                        </div>

                                                    </div>
                                                    <div className="w-4/5 h-full border-primary relative" style={{ zIndex: 1 }}>
                                                        <div className="absolute inset-0"
                                                            style={{
                                                                backgroundImage: client.scm.sure_active.plan_name
                                                                    ? `url(${getPlanImageUrl(client.scm.sure_active.plan_name)})`
                                                                    : 'none',
                                                                backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                                                                backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                                                                backgroundPosition: 'top', // Centra la imagen
                                                                opacity: 0.1,
                                                                zIndex: -1 // Asegura que quede detrás de los otros elementos
                                                            }}
                                                        ></div>
                                                        {client.notes.map((note) => {
                                                            return (
                                                                <div>
                                                                    <div className="w-full flex border-primary border-b">
                                                                        <div className="w-full">
                                                                            <div className="w-full flex text-center text-sm">
                                                                                <div
                                                                                    className="p-2 w-1/6 border-primary border-r"
                                                                                    onClick={(e) => {
                                                                                        // setVisible(true);
                                                                                        // setActiveNote(note);
                                                                                        // setActiveClient(client);
                                                                                    }}
                                                                                >
                                                                                    <b className="border-primary border-b text-primary hover:text-secondary ">
                                                                                        {note.date}
                                                                                    </b>
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r">
                                                                                    T1017 {age < 18 && "-HA"}
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r bg-orange-200 bg-opacity-50">
                                                                                    {note.units}
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r">
                                                                                    {note.location}
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r">
                                                                                    {note.timeIn}
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r">
                                                                                    {note.timeOut}
                                                                                </div>
                                                                                <div className="p-2 w-1/6 border-primary border-r">
                                                                                    {CalculateMinutes({
                                                                                        firstHour: note.timeIn,
                                                                                        secondHour: note.timeOut,
                                                                                    })}{" "}
                                                                                    min
                                                                                </div>
                                                                                <div className="p-2 w-1/6">
                                                                                    {CalculateUnits({
                                                                                        minutes: CalculateMinutes({
                                                                                            firstHour: note.timeIn,
                                                                                            secondHour: note.timeOut,
                                                                                        }),
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {note.timeOut_2 !== "" && (
                                                                        <div className="w-full flex border-primary border-b">
                                                                            <div className="w-full">
                                                                                <div className="w-full flex text-center text-sm">
                                                                                    <div
                                                                                        className="p-2 w-1/6 border-r text-gray-50"
                                                                                    >
                                                                                        {note.date}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-r"></div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r"></div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.location_2}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.timeIn_2}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.timeOut_2}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {CalculateMinutes({
                                                                                            firstHour: note.timeIn_2,
                                                                                            secondHour: note.timeOut_2,
                                                                                        })}{" "}
                                                                                        min
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6">
                                                                                        {CalculateUnits({
                                                                                            minutes: CalculateMinutes({
                                                                                                firstHour: note.timeIn_2,
                                                                                                secondHour: note.timeOut_2,
                                                                                            }),
                                                                                        })}
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
                                                                                        className="p-2 w-1/6 border-r text-gray-50"
                                                                                    >
                                                                                        {note.date}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-r"></div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r"></div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.location_3}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.timeIn_3}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {note.timeOut_3}
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6 border-primary border-r">
                                                                                        {CalculateMinutes({
                                                                                            firstHour: note.timeIn_3,
                                                                                            secondHour: note.timeOut_3,
                                                                                        })}{" "}
                                                                                        min
                                                                                    </div>
                                                                                    <div className="p-2 w-1/6">
                                                                                        {CalculateUnits({
                                                                                            minutes: CalculateMinutes({
                                                                                                firstHour: note.timeIn_3,
                                                                                                secondHour: note.timeOut_3,
                                                                                            }),
                                                                                        })}
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
                                    <div className={classNames(
                                        "w-full flex border-primary",
                                        (index + 1) === listTcm.length && "border-b"
                                    )}>
                                        <div className="w-1/4">
                                            <div className="w-full flex text-center text-sm h-full">
                                                <div className="p-2">
                                                    <b>Total Units:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    {data?.units}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="w-full flex text-center text-sm h-full">
                                                <div className="p-2">
                                                    <b>Total Hours:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    {data?.hours}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="w-1/4">
                                            <div className="w-full flex text-center text-sm h-full">
                                                <div className="p-2">
                                                    <b>Pay Rate:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    ${data?.pay_rate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="w-full flex text-center text-sm h-full">
                                                <div className="p-2">
                                                    <b>Week Pay:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    ${data?.week_pay}
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div>
                                <div className="flex w-full mt-5">
                                    <div className="w-2/5 text-center flex flex-col justify-end ">
                                        {data?.billing?.tcm_full_name}
                                        </div>
                                        <div className="w-1/5 text-center ml-5 flex flex-col justify-end ">
                                        {data?.billing?.tcm_credentials}
                                    </div>
                                    <div className="w-1/5 ml-5 flex items-center justify-center">
                                        <img src={data?.billing?.tcm_signature} alt="signTCM" width={100} style={{ position: "relative", top: "5px", transform: "rotate(-10deg)", maxHeight: "50px" }} />
                                    </div>
                                    <div className="w-1/5 flex flex-col justify-end">
                                        <div className='text-center'>
                                            {data?.billing?.signatureTcmDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-2/5 text-center place-items-center border-t border-primary">
                                        <b>Targeted Case Manager</b>
                                    </div>
                                    <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                                        <b>Credential</b>
                                    </div>
                                    <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                                        <b>Signature TCM</b>
                                    </div>
                                    <div className="w-1/5 place-items-center ml-5 border-t border-primary">
                                        <div className='text-center'>
                                            <b>Date</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full mt-5">
                                    <div className="w-2/5 text-center flex flex-col justify-end ">
                                        {data?.billing?.tcms_full_name}
                                    </div>
                                    <div className="w-1/5 text-center ml-5 flex flex-col justify-end ">
                                        {data?.billing?.tcm_credentials}S
                                    </div>
                                    <div className="w-1/5 ml-5 flex items-center justify-center">
                                        <img src={data?.billing?.tcms_signature} alt="signTCMS" width={100} />
                                    </div>
                                    <div className="w-1/5 flex flex-col justify-end">
                                        <div className='text-center'>
                                            {data?.billing?.signatureTCMSDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="w-2/5 text-center place-items-center border-t border-primary">
                                        <b>Targeted Case Manager Supervisor</b>
                                    </div>
                                    <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                                        <b>Credential</b>
                                    </div>
                                    <div className="w-1/5 text-center place-items-center ml-5 border-t border-primary">
                                        <b>Signature TCMS</b>
                                    </div>
                                    <div className="w-1/5 place-items-center ml-5 border-t border-primary">
                                        <div className='text-center'>
                                            <b>Date</b>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        )
                    })
                ) : (
                    <Message text="No billing for this week" className="w-full mt-6 bg-gray-100 h-96" />
                )
            ) : (
                <div>
                    <Skeleton className="mb-2"></Skeleton>
                    <Skeleton width="10rem" className="mb-2"></Skeleton>o
                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                </div>
            )}
            <Toast ref={toast} />
            <ConfirmDialog />
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { BillingTCMS }