import { useState, useEffect, useRef, useCallback } from 'react';
// -- Libs PrimeReact
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import { Affix } from 'antd';
import { Toast } from 'primereact/toast';
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import { Message } from 'primereact/message';

import { CalculateUnits } from "../notes/utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { DiaryNote } from "../tcm/components/diary/diaryNote";
import { getPlanImageUrl } from "../../../utils";
import { BillingBillerTcmView } from "./billingBillerTcmView";
// New structure
import { CalculateAge, ClientFile, VoiceRecorder } from "../../commons";

import { Active, Notes, ClientsBill, ServiceCMActive, TcmNotesBill, ServiceCM } from "../../../models";
import { useTcmNotesBill, useTcmBillActive, useBillAdd, useTcmmyBills, useNoteDel } from "../../../hooks/modules/tcm";

import { EditNotes } from "../notes/editNotes";

const Billing = ({ active, scm, relad }: Props) => {
    const { addBill } = useBillAdd(relad);
    const { delNote } = useNoteDel(relad);
    const { tcmBills, reloadTcmBills } = useTcmmyBills();
    const { tcmNotesBill, reloadTcmNotesBill } = useTcmNotesBill();
    const { tcmBillActive, reloadTcmBillActive } = useTcmBillActive();
    const [listTcm, setListTCM] = useState<TcmNotesBill | undefined>();

    const [visible, setVisible] = useState<boolean>(false);
    const [activeNote, setActiveNote] = useState<Notes | undefined>(undefined);
    const [noteEdit, setNoteEdit] = useState<boolean>(false);
    const [activeClient, setActiveClient] = useState<ClientsBill | undefined>(undefined);

    // ----
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScmNum, setSelectedScmNum] = useState<number>(0);

    // const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
    // -- Visible Bill
    const [visibleView, setVisibleView] = useState<boolean>(false);
    const [viewSelectBill, setViewSelectBill] = useState<string>("")


    const onInfo = () => {
        setShowInfo(true);
    };
    const closedInfo = () => {
        setShowInfo(false);
    }
    const onClose = () => {
        setNoteEdit(false)
        setVisible(false);
    };

    const [nodes, setNodes] = useState<MenuItem[]>([]);

    // ---
    const toast = useRef<Toast>(null);
    const accept = () => {
        addBill();
        toast.current?.show({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'The system is ceating billing',
            life: 3000,
        });
        relad();
        // setDateOK(true);
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm = (position) => {
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
            accept,
            reject
        });
    };

    // ----- Notes
    const headerNote = (title) => {
        const renderIcons = () => (
            <div className="w-2/3 text-right">
                <i
                    className="pi pi-trash hover:text-red-500 cursor-pointer mr-2"
                    onClick={() => {
                        delNote({ id: activeNote?.ID ?? 0 })
                        setVisible(false);
                    }}
                />
                <i
                    className="pi pi-file-edit hover:text-blue-500 cursor-pointer"
                    onClick={() => {
                        setNoteEdit(true);
                    }}
                />
            </div>
        );

        return (
            <div className="flex w-full place-items-center">
                <div className="flex w-1/3">
                    <div className="pl-2 pr-2">
                        <b>{title}</b>
                    </div>
                </div>
                {!tcmBillActive?.billing ? renderIcons() : null}
            </div>
        );
    };

    // ----------------
    const [expandedKeys, setExpandedKeys] = useState<any>({});

    // const toggleAll = () => {
    //     if (Object.keys(expandedKeys).length) {
    //         collapseAll();
    //     } else {
    //         expandAll();
    //     }
    // };

    const expandAll = () => {
        nodes.forEach(expandNode);
        setExpandedKeys({ ...expandedKeys });
    };

    // const collapseAll = () => {
    //     setExpandedKeys({});
    // };

    const expandNode = (node) => {
        if (node.items && node.items.length) {
            expandedKeys[node.key] = true;
            node.items.forEach(expandNode);
        }
    };
    // ----------------
    useEffect(() => {
        tcmBillActive?.billing ? setListTCM(tcmBillActive) : setListTCM(tcmNotesBill)
    }, [reloadTcmNotesBill, reloadTcmBillActive, tcmBillActive, tcmNotesBill]);

    useEffect(() => {
        reloadTcmNotesBill();
        reloadTcmBillActive();
        // expandAll();
    }, [relad]);

    const itemRenderer = (item, options) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className="flex items-center h-full align-items-center px-3 py-2 cursor-pointer hover:bg-secondary-hover" onClick={options.onClick}>
            <span className={`${item.icon} text-primary`} />
            <span className="mx-2">{item.items && <i className='pi pi-check' />}{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const CreateMenu = useCallback(() => {
        reloadTcmBills();
        const tree = tcmBills?.billing?.year?.map((year, keyYear) => ({
            key: `${keyYear}`,
            label: year.year,
            icon: "pi pi-fw pi-folder",
            items: year?.month?.map((month, keyMonth) => {
                return {
                    key: `${keyYear}_${keyMonth}`,
                    label: month.month,
                    icon: "pi pi-fw pi-folder",
                    items: month?.date?.map((date, index) => ({
                        key: `${keyYear}_${keyMonth}_${index}`,
                        label: date,
                        icon: "pi pi-bitcoin",
                        shortcut: <i className='pi pi-check-circle' />,
                        template: itemRenderer,
                        command: () => {
                            setViewSelectBill(date);
                            setVisibleView(true);
                        }
                    }))
                };
            })
        }));
        if (tree) {
            setNodes(tree);
        }
        expandAll();
    }, [tcmBills]);




    useEffect(() => {
        CreateMenu()
    }, [relad, CreateMenu]);

    useEffect(() => {
        CreateMenu()
    }, [CreateMenu]);


    return (
        <div className="flex w-full mt-10">
            <div className='w-1/6 pl-5 pt-5'>
                <Affix offsetTop={105} >
                    <div className="card flex justify-content-center">
                        <PanelMenu
                            model={nodes}
                            expandedKeys={expandedKeys}
                            onExpandedKeysChange={setExpandedKeys}
                            className="w-full md:w-20rem"
                            multiple
                        />
                    </div>

                </Affix>
            </div>
            <div className='w-5/6'>
                {showInfo === true && <ClientFile active={active} relad={relad} show={showInfo} scm={selectedScm} num={selectedScmNum} closed={closedInfo} />}

                {/* ----------------- */}
                <p className="ml-5 mr-5 mt-5">
                    {/* row 2 */}
                    {tcmNotesBill?.clients?.length ? (
                        <>
                            {/* <Affix offsetTop={92} > */}
                            <div className="w-full flex border-primary border border-b-0 bg-blue-100">
                                <div className="w-1/5 text-center p-2">
                                    <b>TCM/Credentials:</b>
                                </div>
                                <div className="w-4/5">
                                    <div className="w-full flex">
                                        <div className="p-2 w-1/4">
                                            {active?.activeUser?.Record?.fullname} <i>{active?.activeUser?.User?.credentials}</i>
                                        </div>

                                        <div className="w-2/4">
                                            <div className="w-full flex text-center text-sm h-full">
                                                <div className="p-2">
                                                    <b>Pay Period:</b>
                                                </div>
                                                <div className="p-2 w-auto">
                                                    {active?.activeUser?.WeekActive?.start} - {active?.activeUser?.WeekActive?.end}
                                                </div>
                                            </div>
                                        </div>
                                        {!tcmBillActive?.billing ? (
                                            <div className="w-1/4 border-primary border-l bg-lineas-diagonales hover:bg-orange-400 text-center place-items-center p-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => confirm('bottom-right')}
                                            >
                                                <b className='animate-blink3'>Submit Bill</b>
                                            </div>
                                        ) : (
                                            <div className="w-1/4 text-center place-items-center p-2 flex">
                                                {tcmBillActive.amount_notes === tcmNotesBill?.amount_notes ? (
                                                    <div className='flex'>
                                                        {tcmBillActive.billing.tcms_signature !== "data:image/png;base64," ? (
                                                            <><i className='pi pi-check-circle mr-5' />
                                                                {tcmBillActive.billing.date}</>
                                                        ) : (
                                                            <b className='text-red-500 animate-pulse'>
                                                                Pending supervision
                                                            </b>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className='cursor-pointer msg'
                                                        onClick={() => {
                                                            confirm('bottom-right');
                                                        }}
                                                        data-pr-tooltip="Notes have been added this week that are not associated with billing"
                                                        data-pr-position="left"

                                                    >
                                                        <Tooltip target=".msg" position='left' />
                                                        <i
                                                            className='pi pi-sync cursor-pointer text-red-500 pi-spin hover:animate-none hover:text-orange-400 mr-5'

                                                        />

                                                        <i
                                                            className='animate-blink2 text-red-500'

                                                        >
                                                            Here are some notes to add</i>

                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <VoiceRecorder
                                            relad={relad}
                                            active={active}
                                            to={active?.activeUser?.User?.ID.toString() || "0"}
                                            module="tcm"
                                            component="Billing"
                                            id_component={tcmBillActive?.billing?.id.toString() || "0"}
                                            mode='private'
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* </Affix> */}
                            {/* ----------------- */}

                            {listTcm?.clients?.map((client) => {
                                const age = CalculateAge({ dob: client.dob ?? "00/00/0000" });
                                return (
                                    <p>
                                        {/* row 3 */}
                                        <div className="w-full flex bg-blue-100 border-primary border">
                                            <div
                                                className="w-1/5 text-center text-sm border-r border-primary place-items-center p-2 hover:text-secondary-hover hover:cursor-pointer"
                                                onClick={() => {
                                                    setSelectedScm(client.scm);
                                                    setSelectedScmNum(1);
                                                    onInfo();
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
                                        <div className="w-full flex border-primary border-l">
                                            {/* en este div poner insurance logo en background */}
                                            <div className="w-1/5 text-center text-sm bg-orange-100 border-r border-primary relative content-center">
                                                <div className="absolute inset-0 bg-white opacity-20"
                                                    style={{
                                                        // backgroundImage: `url(${apiUrlStatic}/static/media/wellcare.png)`,
                                                        backgroundImage: client.scm.sure_active.plan_name
                                                            ? `url(${getPlanImageUrl(client.scm.sure_active.plan_name)})`
                                                            : 'none',
                                                        backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                                                        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                                                        backgroundPosition: 'center', // Centra la imagen
                                                        opacity: 0.3
                                                    }}
                                                ></div>
                                                {(console.log(scm?.sure_active.plan_name), null)}
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
                                            <div className="w-4/5 h-full border-primary border-r relative" style={{ zIndex: 1 }}>
                                                <div className="absolute inset-0 bg-white"
                                                    style={{
                                                        backgroundImage: client.scm.sure_active.plan_name
                                                            ? `url(${getPlanImageUrl(client.scm.sure_active.plan_name)})`
                                                            : 'none',
                                                        backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                                                        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                                                        backgroundPosition: 'center', // Centra la imagen
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
                                                                                setVisible(true);
                                                                                setActiveNote(note);
                                                                                setActiveClient(client);
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
                                                                                className="p-2 w-1/6 border-r"
                                                                                style={{ color: "white" }}
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
                                                                                className="p-2 w-1/6 border-r"
                                                                                style={{ color: "white" }}
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
                                    </p>
                                );
                            })}
                            {/* ------- */}
                            {/* {tcmBillActive?.billing && */}
                            <p>
                                <div className="w-full flex border-primary border bg-blue-100">
                                    <div className="w-1/4">
                                        <div className="w-full flex text-center text-sm h-full">
                                            <div className="p-2">
                                                <b>Total Units:</b>
                                            </div>
                                            <div className="p-2 w-auto">
                                                {listTcm?.units}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                        <div className="w-full flex text-center text-sm h-full">
                                            <div className="p-2">
                                                <b>Total Hours:</b>
                                            </div>
                                            <div className="p-2 w-auto">
                                                {listTcm?.hours}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                        {/* <div className="w-full flex text-center text-sm h-full">
                                            <div className="p-2">
                                                <b>Pay Rate:</b>
                                            </div>
                                            <div className="p-2 w-auto">
                                                ${listTcm?.pay_rate}
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="w-1/4">
                                        {/* <div className="w-full flex text-center text-sm h-full">
                                            <div className="p-2">
                                                <b>Week Pay:</b>
                                            </div>
                                            <div className="p-2 w-auto">
                                                ${listTcm?.week_pay}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </p>
                            {/* } */}
                            {tcmBillActive?.billing &&
                                <div>
                                    {/* Signatures */}
                                    <div className="flex w-full mt-5">
                                        <div className="w-2/5 text-center flex flex-col justify-end ">
                                            {tcmBillActive?.billing?.tcm_full_name}
                                        </div>
                                        <div className="w-1/5 text-center ml-5 flex flex-col justify-end ">
                                            {tcmBillActive?.billing?.tcm_credentials}
                                        </div>
                                        <div className="w-1/5 ml-5 flex items-center justify-center">
                                            <img src={tcmBillActive?.billing?.tcm_signature} alt="signTCM" width={100} />
                                        </div>
                                        <div className="w-1/5 flex flex-col justify-end">
                                            <div className='text-center'>
                                                {tcmBillActive?.billing?.signatureTcmDate}
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
                                            {tcmBillActive?.billing?.tcms_full_name}
                                        </div>
                                        <div className="w-1/5 text-center ml-5 flex flex-col justify-end ">
                                            {tcmBillActive?.billing?.tcm_credentials}
                                        </div>
                                        <div className="w-1/5 ml-5 flex items-center justify-center">
                                            <img src={tcmBillActive?.billing?.tcms_signature} alt="signTCMS" width={100} />
                                        </div>
                                        <div className="w-1/5 flex flex-col justify-end">
                                            <div className='text-center'>
                                                {tcmBillActive?.billing?.signatureTCMSDate}
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
                                </div>
                            }
                        </>
                    ) : (
                        <Message text="No notes for this week" className="w-full bg-gray-100" />
                    )}

                </p>
                {/* ------- */}
                <Toast ref={toast} />
                <ConfirmDialog />
                <Dialog
                    header={headerNote(activeNote?.date)}
                    maximizable
                    visible={visible}
                    style={{ width: "80vw" }}
                    onHide={() => setVisible(false)}
                >
                    <DiaryNote
                        note={activeNote}
                        client={activeClient}
                        tcm={tcmBillActive?.billing?.tcm_full_name}
                        tcmSignature={tcmBillActive?.billing?.tcm_signature}
                        tcmCredentials={tcmBillActive?.billing?.tcm_credentials}
                    />
                </Dialog>

                <Dialog
                    header={`Edit Note`}
                    maximizable
                    visible={noteEdit}
                    style={{ width: "80vw" }}
                    onHide={() => setNoteEdit(false)}
                >
                    {activeNote !== undefined ? (
                        <EditNotes
                            note={activeNote}
                            setVisibleNotes={onClose}
                            relad={relad}
                        />
                    ) : (
                        "err"
                    )}
                </Dialog>

                <Dialog
                    header={`Details of the bill of ${viewSelectBill}`}
                    maximizable
                    visible={visibleView}
                    style={{ width: "80vw" }}
                    onHide={() => setVisibleView(false)}
                >
                    <BillingBillerTcmView date={viewSelectBill} active={active} relad={relad} />
                </Dialog>


            </div>
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
    scm?: ServiceCM | undefined;

};
export { Billing }