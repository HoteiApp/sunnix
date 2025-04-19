import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
// ---
import type { TourProps } from 'antd';
import { Space, Tour } from 'antd';
// ---
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { CalculateUnits } from "./utils/calculateUnits";
import { DiaryNote } from "../tcm/components/diary/diaryNote";
import { SearchNotes } from "./searchNotes";
import { classNames } from "primereact/utils";
import { CalculateAge } from "../../commons";
import { AddNotes } from "./notes";
import { EditNotes } from "./editNotes";
import { getPlanImageUrl } from "../../../utils";
import { VoiceRecorder } from "../../commons"

// -- New Struct
import { Active, Notes, Client, ServiceCM, ClientNotes } from "../../../models";
import { useClientNotes, useTcmBillActive, useNoteDel } from "../../../hooks/modules/tcm";

const initialNotes: Notes[] = [
  // Tus notas iniciales van aquí
];

export const ListNotes = ({ active, scm, relad, noteHelp, setNoteHelp }: Props) => {
  // const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const { tcmBillActive } = useTcmBillActive();
  const { delNote } = useNoteDel(relad);
  const age = CalculateAge({ dob: scm?.Demografic.dob ?? "00/00/0000" });

  // ------
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const steps: TourProps['steps'] = [
    {
      title: 'Options bar',
      description: 'In the options bar, you can select the notes for the active week, in addition to being able to list all the notes made to the client. You can find the (Search) button that provides you with an advanced search tool.',
      // cover: (
      //   <img
      //     alt="tour.png"
      //     src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
      //   />
      // ),
      target: () => ref1.current,
    },
    {
      title: 'Week',
      description: 'The interval of days that are being carried out to send the information to the insurance is shown.',
      target: () => ref2.current,
    },
    {
      title: 'Units',
      description: 'Number of units reported in the active week notes',
      target: () => ref3.current,
    },
    {
      title: 'Add note',
      description: 'By clicking here the system will provide you with the form to add a note to the client.',
      target: () => ref4.current,
    },
    {
      title: 'Customer information',
      description: 'Here you can find data necessary for reports',
      target: () => ref5.current,
      // mask: false,
    },
  ];

  // ------

  // const { clientNotes, reloadClientNotes } = useClientNotes({
  //   id: scm?.id.toString() ?? "0",
  // });
  const { tcmClientNotes } = useClientNotes();
  const [clientNotes, setClientNotes] = useState<ClientNotes>();
  const [visible, setVisible] = useState<boolean>(false);
  const [activeNote, setActiveNote] = useState<Notes | undefined>(undefined);
  const [optionView, setOptionView] = useState<string>("week");
  // const [lastName, setActiveNote] = useState<Notes | undefined>(undefined);
  const [activeClient, setActiveClient] = useState<Client | undefined>(
    undefined
  );

  const [noteEdit, setNoteEdit] = useState<boolean>(false);
  const [visibleNotes, setVisibleNotes] = useState<boolean>(false);
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);

  const [billNote, setBillNote] = useState<string>("Billable");

  const [minutes, setMinutes] = useState<number>(0);
  const [minutes_2, setMinutes_2] = useState<number>(0);
  const [minutes_3, setMinutes_3] = useState<number>(0);
  const [minutes_Total, setMinutes_Total] = useState<number>(0);

  const [unit, setUnit] = useState<number>(32);
  const [unit_2, setUnit_2] = useState<number>(32);
  const [unit_3, setUnit_3] = useState<number>(32);

  const [units_Total, setUnits_Total] = useState<number>(0);
  const [units, setUnits] = useState<number>(0);

  const [items, setItems] = useState<MenuItem[]>([

  ]);


  const onClose = () => {
    setVisibleNotes(false);
    setNoteEdit(false);
    setVisible(false);
  };

  const headerNotes = (title) => {
    const renderIcons = () => (
      <div className="w-2/3 text-right">
        <i
          className="pi pi-trash hover:text-red-500 cursor-pointer mr-2"
          onClick={() => {
            delNote({ id: activeNote?.ID ?? 0 });
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

    const isWithinActiveWeek =
      activeNote?.date || "" >= (active?.activeUser?.WeekActive?.start ?? "") &&
      !tcmBillActive?.billing;
    const isAfterActiveWeek =
      activeNote?.date || "" > (active?.activeUser?.WeekActive?.end ?? "");

    return (
      <div className="flex w-full place-items-center">
        <div className="flex w-1/3">
          <div className="pl-2 pr-2">
            <b>{title}</b>
          </div>
        </div>
        {isWithinActiveWeek || isAfterActiveWeek ? renderIcons() : null}
      </div>
    );
  };
  const headerAddNotes = (
    <div className="flex w-full place-items-center">
      <div className="flex w-1/4">
        <div className="pl-2 pr-2">Add Note</div>
      </div>
      <div className="w-2/4 flex">
        <div className="w-2/5 place-items-center text-right pr-2">
          <p>Units consumed:</p>
        </div>
        <div className="w-3/5 flex place-items-center">
          <progress className="progress progress-warning w-full mr-2" value={units} max={scm?.sure_active.unit}></progress>
          {units}/{scm?.sure_active.unit}
        </div>
      </div>
    </div>
  );

  const footerNotes = (
    <div className="m-0 pt-1 w-full">
      {billNote === "Billable" && (
        <div className="flex overflow-y-auto">
          <div className="w-1/3">
            <b>Minutes:</b> {minutes_Total}{" "}
          </div>
          <div className="w-1/3">
            <b>Units:</b> {units_Total}
          </div>
          {/* <div className='w-1/3'>
                    <b>Collect</b> ${units_Total * 7.28}
                </div> */}
        </div>
      )}
    </div>
  );

  const [notes, setNotes] = useState(initialNotes);
  const [isAscending, setIsAscending] = useState(false); // Nuevo estado para el orden

  useEffect(() => {
    // Ordenamos las notas por fecha
    const orderedNotes = [...(clientNotes?.all_notes ?? [])].sort((a, b) => {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return isAscending
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime(); // Ordenamos dependiendo del estado isAscending
    });

    setNotes(orderedNotes);
  }, [clientNotes?.all_notes, isAscending]); // Agregamos isAscending a las dependencias del useEffect

  // Función para cambiar el orden
  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };
  // -----------------


  const loadNotes = () => {
    tcmClientNotes({ id: scm?.id.toString() })
      .then((data) => {
        setClientNotes(data);
      })
      .catch((error) => {
        console.error("Error al obtener las notas:", error);
      });
  }
  useEffect(() => {
    loadNotes();
  }, []);

  // notes
  useEffect(() => {
    let totalminutes = 0;
    if (minutes > 0) {
      totalminutes += minutes;
    }
    if (minutes_2 > 0) {
      totalminutes += minutes_2;
    }
    if (minutes_3 > 0) {
      totalminutes += minutes_3;
    }
    setMinutes_Total(totalminutes);
  }, [minutes, minutes_2, minutes_3]);

  useEffect(() => {
    let totalunit = 0;
    if (unit > 0) {
      totalunit += unit;
    }
    if (unit_2 > 0) {
      totalunit += unit_2;
    }
    if (unit_3 > 0) {
      totalunit += unit_3;
    }
    setUnits_Total(totalunit);
  }, [unit, unit_2, unit_3]);

  useEffect(() => {
    // Verifica si 'clientNotes.notes' está definido y luego suma 'note.units'
    const totalUnits =
      clientNotes?.all_notes?.reduce((sum, note) => sum + note.units, 0) || 0;
    // Establece el total en 'setUnits'
    setUnits(totalUnits);
  }, [clientNotes]); // Asegúrate de incluir 'clientNotes' en las dependencias del efecto

  // -------------------------
  useEffect(() => {
    loadNotes();
    const newItemsBar: MenuItem[] = [
      // Inicializamos newItemsNotes como un array vacío
    ];

    // --------
    scm?.status === "Open" && (
      newItemsBar.push({
        label: "Active Week",
        icon: "pi pi-calendar-times",
        command: () => {
          setOptionView("week");
        },
      })
    )

    newItemsBar.push({
      label: "All Notes",
      icon: "pi pi-list",
      command: () => {
        setOptionView("all_notes");
      },
    });
    newItemsBar.push({
      label: "Search",
      icon: "pi pi-search",
      command: () => {
        setVisibleSearch(true);
      },
    });
    // --------

    // Actualizamos el estado de itemsNotes con la nueva lista
    setItems(newItemsBar);
  }, [relad, scm]);


  return (

    <div className="card" style={{ height: "80vh" }}>
      <Space className="grid w-full">
        <div className="w-full">
          <div className="sticky top-0" ref={ref1}>
            {/* <Affix offsetTop={top}> */}
            <Menubar model={items} />
            {/* </Affix> */}
          </div>

          {optionView === "week" ? (
            <p className="m--10 p--10">
              <div className="w-full flex border-primary border-r">
                <div className="w-1/5"></div>
                <div className="w-4/5">
                  <div className="w-full flex">
                    <div className="w-4/6"></div>
                    <div className="w-2/6 border-primary border-l"></div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className="w-full flex border-primary border">
                <div className="w-1/5 text-center p-2">
                  <b>TCM/Credentials:</b>
                </div>
                <div className="w-4/5">
                  <div className="w-full flex">
                    <div className="w-4/6">
                      <div className="w-full flex">
                        <div className="p-2 w-1/3 border-primary border-r">
                          {scm?.tcm.full_name} {scm?.tcm.categoryTCM}
                        </div>
                        <div className="w-2/3">
                          <div className="w-full flex text-center text-sm h-full">
                            <div className="p-2">
                              <b>Week:</b>
                            </div>
                            <div className="p-2 w-2/5" ref={ref2}>
                              {clientNotes?.week?.start} -{" "}
                              {clientNotes?.week?.end}
                            </div>
                            <div className="p-2 w-3/5 border-primary border-l">
                              <div className="w-full">
                                <div className="w-full flex items-center justify-center">
                                  <div>Remaining Units <b>{(scm?.sure_active.unit ?? 0) - (scm?.units_consumed ?? 0)}</b> of <b className="text-green-500">{scm?.sure_active.unit}</b></div>
                                  {/* <progress
                                    className="progress progress-info w-4/5 ml-2 mr-2"
                                    value={(scm?.sure_active.unit ?? 0) - (scm?.units_consumed ?? 0)}
                                    max={scm?.sure_active.unit}></progress> */}
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    { scm?.status === "Open" ? (
                                          tcmBillActive?.week?.ID !== clientNotes?.week?.ID ? (
                      // active?.activeUser?.User?.roll === "TCM" ? (
                      <>
                        {units >= (scm?.sure_active.unit || 0) ? (
                          <div className="w-2/6 border-primary border-l bg-lineas-diagonales text-center place-items-center p-2">
                            <b style={{ color: "red" }} className="animate-blink4">Units consumed</b>
                          </div>
                        ) : (
                          <div
                            className="w-2/6 border-primary border-l bg-lineas-diagonales hover:bg-orange-400 text-center place-items-center p-2"
                            style={{ cursor: "pointer" }}
                            ref={ref4}
                            onClick={() => setVisibleNotes(true)}
                          >
                            <b>Add note</b>
                          </div>
                        )
                        }
                      </>
                    ) : (
                      <div className="w-2/6 border-primary border-l bg-lineas-diagonales text-center place-items-center p-2">
                        <b style={{ color: "red" }} className="animate-blink4">Billing for the week created</b>
                      </div>
                    )):(
                      <div className="w-2/6 border-primary border-l bg-lineas-diagonales text-center place-items-center p-2">
                        <b style={{ color: "red" }} className="animate-blink4">Admission is : {scm?.status}</b>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* row 3 */}
              <div className="w-full flex bg-blue-100 border-primary border-l border-r border-b">
                <div className="w-1/5 text-center text-smplace-items-center p-2">
                  <b>Client:</b> {scm?.Demografic.first_name}{" "}
                  {scm?.Demografic.last_name}
                </div>
                <div className="w-4/5 border-l border-primary">
                  <div className="w-full flex h-full">
                    <div className="w-full h-full">
                      <div className="w-full flex text-center text-sm h-full">
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
                <div
                  className="w-1/5 text-center text-sm bg-orange-100 border-r border-b border-primary relative"
                  ref={ref5}
                >
                  <div className="absolute inset-0 bg-white opacity-20"
                    style={{
                      // backgroundImage: `url(${apiUrlStatic}/static/media/wellcare-green.png)`,
                      backgroundImage: scm?.sure_active.plan_name
                        ? `url(${getPlanImageUrl(scm?.sure_active.plan_name)})`
                        : 'none',
                      backgroundSize: 'contain', // Ajusta para que la imagen se vea completa
                      backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                      backgroundPosition: 'center', // Centra la imagen
                      opacity: 0.1
                    }}
                  ></div>
                  <div className="relative z-10 text-black w-full">
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">MR#</div>
                      <div className="w-1/2 text-left pl-2">{scm?.id}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">M.H. Diagnosis:</div>
                      <div className="w-1/2 text-left pl-2">{scm?.Mental.mental_primary}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">Medicaid:</div>
                      <div className="w-1/2 text-left pl-2">{scm?.Demografic.medicaid}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">Medicare:</div>
                      <div className="w-1/2 text-left pl-2">{scm?.Demografic.medicare}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">Insurance Id:</div>
                      <div className="w-1/2 text-left pl-2">{scm?.sure_active.plan_id}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/2 text-right font-bold">DOB:</div>
                      <div className="w-1/2 text-left pl-2">{scm?.Demografic.dob}</div>
                    </div>
                  </div>
                </div>


                {/* <div className="w-1/5 text-center text-sm bg-orange-100 border-r border-b border-primary" ref={ref5} >
                  MR#: {scm?.id}
                  <br />
                  {scm?.Mental.mental_primary}
                  <br />
                  Med-{scm?.Demografic.medicaid}
                  <br />
                  Mcare-{scm?.Demografic.medicare}
                  <br />
                  DOB: {scm?.Demografic.dob}
                  <br />
                  Ins-{scm?.sure_active.plan_id}
                  <br />
                  <div className="flex items-center justify-center text-center w-full">
                    {scm?.sure_active.plan_name === "Sunshine Health" && <img src={`${apiUrlStatic}/static/media/sunshine-logo.png`} alt="Sunshine Health" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Cigna" && <img src={`${apiUrlStatic}/static/media/cigna.png`} alt="Cigna" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Molina Healthcare" && <img src={`${apiUrlStatic}/static/media/molinaLogo-notag.png`} alt="Molina Healthcare" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Aetna Better Health" && <img src={`${apiUrlStatic}/static/media/aetna.png`} alt="Aetna Better Health" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Aetna Health Plan" && <img src={`${apiUrlStatic}/static/media/aetnada.png`} alt="Aetna Health Plan" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Wellcare Health Plan" && <img src={`${apiUrlStatic}/static/media/wellcare.png`} alt="Wellcare Health Plan" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Simply Healthcare" && <img src={`${apiUrlStatic}/static/media/simply.png`} alt="Simply Healthcare" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Humana" && <img src={`${apiUrlStatic}/static/media/humana.png`} alt="Humana" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "HealthSun Health Plan" && <img src={`${apiUrlStatic}/static/media/healthsun.png`} alt="HealthSun Health Plan" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "CarePlus Health Plan" && <img src={`${apiUrlStatic}/static/media/careplus.png`} alt="CarePlus Health Plan" className="rounded-xl w-1/3 border border-primary" />}
                    {scm?.sure_active.plan_name === "Free Medicaid" && <img src={`${apiUrlStatic}/static/media/fcc.png`} alt="Free Medicaid" className="rounded-xl w-1/3 border border-primary" />}
                  </div>

                </div> */}
                <div className="w-4/5 h-full border-primary border-r">
                  {clientNotes?.notes_week_active?.map((note) => {
                    return (
                      <>
                        <div className="w-full flex border-primary border-b">
                          <div className="w-full">
                            <div className="w-full flex text-center text-sm">
                              <div
                                className="p-2 w-1/6"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  setVisible(true);
                                  setActiveNote(note);
                                }}
                              >
                                <b className="border-primary border-b text-primary hover:text-secondary ">
                                  {note.date}
                                </b>
                              </div>
                              <div className="p-2 w-1/6 border-primary border-l">T1017{age < 18 && " H"}</div>
                              <div className="p-2 w-1/6 border-primary border-l bg-orange-200">
                                {note.units}
                              </div>
                              <div className="p-2 w-1/6 border-primary border-l border-r">
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
                                  className="p-2 w-1/6"
                                  style={{ color: "white" }}
                                >
                                  {note.date}
                                </div>
                                <div className="p-2 w-1/6 border-l"></div>
                                <div className="p-2 w-1/6 border-l"></div>
                                <div className="p-2 w-1/6 border-primary border-l border-r">
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
                                  className="p-2 w-1/6"
                                  style={{ color: "white" }}
                                >
                                  {note.date}
                                </div>
                                <div className="p-2 w-1/6 border-l"></div>
                                <div className="p-2 w-1/6 border-l"></div>
                                <div className="p-2 w-1/6 border-primary border-l border-r">
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
                      </>
                    );
                  })}

                  {/* ----- */}
                </div>
              </div>
            </p>
          ) : (
            <p className="m-0">
              {/* row 2 */}
              <div className="w-full flex border-primary border">
                <div className="w-1/5 text-center p-2">
                  <b>TCM/Credentials:</b>
                </div>
                <div className="w-4/5">
                  <div className="w-full flex">
                    <div className="w-4/6">
                      <div className="w-full flex">
                        <div className="p-2 w-1/3 border-primary border-r">
                          {scm?.tcm.full_name} {scm?.tcm.categoryTCM}
                        </div>
                        <div className="w-2/3">
                          <div className="w-full flex text-center text-sm h-full">
                            <div className="p-2">
                              <b></b>
                            </div>
                            <div className="p-2 w-3/5 border-primary border-r"></div>
                            <div className="p-2 w-1/5">
                              <b>Units:</b>
                            </div>
                            <div className="p-2 w-1/6">{units}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* row 3 */}
              <div className="w-full flex bg-blue-100 border-primary border-l border-r border-b">
                <div className="w-1/5 text-center text-sm border-r border-primary place-items-center p-2">
                  <b>Client:</b> {scm?.Demografic.first_name}{" "}
                  {scm?.Demografic.last_name}
                </div>
                <div className="w-4/5">
                  <div className="w-full flex">
                    <div className="w-full">
                      <div className="w-full flex text-center text-sm">
                        <div className="p-2 w-1/6 border-primary border-r">
                          <b>Date</b>
                          <i
                            className={classNames(
                              "pl-5 pi cursor-pointer",
                              "hover:text-orange-400",
                              !isAscending
                                ? "pi-sort-numeric-down-alt"
                                : "pi-sort-numeric-up-alt"
                            )}
                            onClick={toggleOrder}
                          ></i>
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
                <div className="w-1/5 text-center text-sm bg-orange-100 border-r border-b border-primary">
                  MR#: {scm?.id}
                  <br />
                  {scm?.Mental.mental_primary}
                  <br />
                  Med-{scm?.Demografic.medicaid}
                  <br />
                  Mcare-{scm?.Demografic.medicare}
                  {/* <br /> */}
                  {/* Ins-{scm?.sure.plan_id} */}
                  {/* <br /> */}
                  {/* {scm?.sure.plan_name} */}
                  <br />
                  DOB: {scm?.Demografic.dob}
                  <br />
                </div>
                <div className="w-4/5 h-full border-primary border-r">
                  {notes.map((note) => {
                    return (
                      <>
                        <div className="w-full flex border-primary border-b">
                          <div className="w-full">
                            <div className="w-full flex text-center text-sm">
                              <div
                                className="p-2 w-1/6 border-primary border-r"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  setVisible(true);
                                  setActiveNote(note);
                                }}
                              >
                                <b className="border-primary border-b text-primary hover:text-secondary ">
                                  {note.date}
                                </b>
                              </div>
                              <div className="p-2 w-1/6 border-primary border-r">
                                T1017 {age < 18 && " H"}
                              </div>
                              <div className="p-2 w-1/6 border-primary border-r bg-orange-200">
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
                      </>
                    );
                  })}
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------------------- */}
            </p>
          )}
        </div>
      </Space >
      <Dialog
        header={headerAddNotes}
        visible={visibleNotes}
        // maximizable
        // resizable
        modal={false}
        style={{
          width: "80vw",
        }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setVisibleNotes(false)}
        footer={footerNotes}
      >
        <AddNotes
          scm={scm}
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
          // clientNotes={clientNotes}
          showDate
          weeks={clientNotes?.week}
        />
      </Dialog>

      <Dialog
        header={headerNotes(`Note (${activeNote?.date})`)}
        maximizable
        visible={visible}
        style={{ width: "80vw" }}
        onHide={() => setVisible(false)}
        footer={
          <VoiceRecorder
            relad={relad}
            active={active}
            to={active?.activeUser?.User?.ID.toString() || "0"}
            module="tcm"
            component="notes"
            id_component={activeNote?.ID.toString() || "0"}
            mode='private'
          />
        }
      >
        <DiaryNote
          note={activeNote}
          client={activeClient}
          lastName={
            scm?.Demografic.first_name + " " + scm?.Demografic.last_name
          }
          tcm={scm?.tcm.full_name}
          tcmSignature={scm?.tcm.signature}
          tcmCredentials={scm?.tcm.categoryTCM}
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

      {
        visibleSearch && (
          <SearchNotes
            scm={scm}
            setVisible={setVisibleSearch}
            visible={visibleSearch}
            active={active}
            relad={relad}
          />
        )
      }


      <Tour
        open={noteHelp}
        onClose={() => setNoteHelp(false)}
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

    </div >

  );
};
type Props = {
  active?: Active;
  scm: ServiceCM | undefined;
  noteHelp: boolean;
  setNoteHelp: React.Dispatch<React.SetStateAction<boolean>>;
  relad(): void;
};
