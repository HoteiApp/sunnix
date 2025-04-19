import React, { useState, useEffect, useRef } from "react";
// Libs Primereact
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Message } from 'primereact/message';
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// Globals
import {
  FormValueNotes,
  regexDate,
} from "../../../models";
import moment from "moment";

// New Struct
import { ClientNotes, Weeks, ServiceCM } from "../../../models";
import { useNotesAdd, useNotesDate, useClientNotes } from "../../../hooks/modules/tcm";
// Internal Components
// import { ReadText } from '../../commons';
import { SelectGoal } from "./utils/selectGoal";
import { CalculateUnits } from "./utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { CalculateOverlap } from "./utils/calculateOverlap";
import { DisabledDatePicker } from "../../commons/DisabledDatePicker";
import { Block } from "../../commons/component/block";

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

const AddNotes = ({
  scm,
  minutes,
  setMinutes,
  minutes_2,
  setMinutes_2,
  minutes_3,
  setMinutes_3,
  // --
  unit,
  setUnit,
  unit_2,
  setUnit_2,
  unit_3,
  setUnit_3,
  setVisibleNotes,
  relad,
  billNote,
  // clientNotes,
  // ---
  date,
  showDate,
  weeks,
  save,
}: Props) => {
  // const { clientNotes } = useClientNotes({ id: scm?.id.toString() ?? "0" });
  const { tcmClientNotes } = useClientNotes();
  // const [clientNotes, setClientNotes] = useState<ClientNotes>();
  const { addNotes } = useNotesAdd(relad);
  const { tcmNotes } = useNotesDate();

  const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
  const [isUnitsFull, setIsUnitsFull] = useState<boolean>(false);
  const [blockUnitsFull, setBlockUnitsFull] = useState<boolean>(false);
  const [datesToDisable, setDatesToDisable] = useState<string[]>([]);
  // const [saveNote, setSaveNote] = useState<boolean>(false);
  const [notes, setNotes] = useState<FormValueNotes>({
    tcm: scm?.tcm?.ID ?? 0,
    scm: scm?.id ?? 0,
    weeks: weeks?.ID ?? 0,
    insurance: scm?.sure_active.ID ?? 0,
    date: date ?? "",
    billable: billNote,
    minutes: 0,
    units: 0,

    timeIn: "",
    timeOut: "",
    minutes_1: 0,
    location: "12",
    opening: [],
    sp: [],
    addendums: [],
    sprfollowup: [],
    spr: [],
    closing: [],
    description: "",

    charged: false,
    // --
    timeIn_2: "",
    timeOut_2: "",
    minutes_2: 0,
    location_2: "12",
    opening_2: [],
    sp_2: [],
    addendums_2: [],
    sprfollowup_2: [],
    spr_2: [],
    closing_2: [],
    description_2: "",
    charged_2: false,
    // --
    timeIn_3: "",
    timeOut_3: "",
    minutes_3: 0,
    location_3: "12",
    opening_3: [],
    sp_3: [],
    addendums_3: [],
    sprfollowup_3: [],
    spr_3: [],
    closing_3: [],
    description_3: "",
    charged_3: false,
    // --
    valueProgress1: "",
    valueProgress2: "",
    valueProgress3: "",
    valueProgress4: "",
    valueProgress5: "",
    valueProgress6: "",
    valueProgress7: "",
    valueProgress8: "",
    valueFollowUp: "",
    // -- Approve
    signatureTCM: "",
    signatureTCMS: "",
    signatureBILLER: "",
    // -- Billing
    invoiced: false, // Facturado
    paid: "",
  });
  const [tcmAllNotes, setTcmAllNotes] = useState<ClientNotes>();

  const handleChangeNotes = <T extends string | string[] | number | boolean>(
    name: keyof FormValueNotes,
    value: T
  ) => {
    setNotes((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if ((notes.date !== "" && notes.timeIn !== "" && notes.timeOut !== "") || (name === "date" && notes.date !== "")) {
      setVisibleBtnSave(true);
    } else {
      setVisibleBtnSave(false);
    }
    return notes;
  };

  // ----------------------------------------------
  const toast = useRef<Toast>(null);

  const confirm1 = (name: keyof FormValueNotes, value: string) => {
    const accept = () => {
      handleChangeNotes(name, value);
      toast.current?.show({
        severity: "success",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    };

    const reject = () => {
      handleChangeNotes(name, "");
      toast.current?.show({
        severity: "warn",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    };
    // TODO: Se repite 2 veces
    // ReadText({ text: "I can provide you with an available time. Are you agree?", lang: "en-EN" });
    confirmDialog({
      // group: 'templating',
      header: "Overlap",
      message: (
        <div className="text-center align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i className="pi pi-exclamation-circle text-6xl text-primary-500 mb-5"></i>
          <br />
          <p>
            Time overlay exists, another note containing the specified time
            already exists.
          </p>
          <br />
          <p>
            The system can provide you with an available time, Do wants you to
            perform the operation?
          </p>
        </div>
      ),
      // message: 'Time Overlay exists, another note containing the specified time already exists. \nThe system can provide you with an available time, it wants you to perform the operation?',
      // header: 'Overlap',
      // icon: 'pi pi-exclamation-triangle',
      // defaultFocus: 'accept',
      accept,
      reject,
    });
  };

  const confirm2 = (name: keyof FormValueNotes, value: string) => {
    const accept = () => {
      handleChangeNotes(name, value);
      toast.current?.show({
        severity: "success",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    };

    confirmDialog({
      header: "Overlap",
      message: (
        <div className="text-center align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i className="pi pi-exclamation-circle text-6xl text-primary-500 mb-5"></i>
          <br />
          <p>
            Time overlay exists, another note containing the specified time
            already exists.
          </p>
          <br />
          <p>
            The system will clear the time you provided to avoid overlap the
            hour.
          </p>
        </div>
      ),
      accept,
    });
  };


  const UnitsFull = (text: string) => {
    const accept = () => {
      setVisibleBtnSave(false);
      setIsUnitsFull(true);
      toast.current?.show({
        severity: "success",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    };

    confirmDialog({
      header: "Alert",
      message: (
        <div className="text-center align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i className="pi pi-exclamation-circle text-6xl text-primary-500 mb-5"></i>
          <br />
          <p>
            You need to adjust the times, you only have {text} available.
          </p>
        </div>
      ),
      accept,
    });
  };
  // ----------------------------------------------
  const handleButtonClick = () => {
    if (visibleBtnSave) {
      addNotes({ notesAdd: notes });
      // setSaveNote(false);
    }
    relad();
    setVisibleBtnSave(false);
    setVisibleNotes(false);
  };
  // ----------------------------------------------
  useEffect(() => {
    if (save) {
      handleButtonClick();
    }
  }, [save]);

  useEffect(() => {
    let minutes_I1 = CalculateMinutes({
      firstHour: notes.timeIn,
      secondHour: notes.timeOut,
    });
    let minutes_I2 = CalculateMinutes({
      firstHour: notes.timeIn_2,
      secondHour: notes.timeOut_2,
    });
    let minutes_I3 = CalculateMinutes({
      firstHour: notes.timeIn_3,
      secondHour: notes.timeOut_3,
    });
    setMinutes(minutes_I1);
    setMinutes_2(minutes_I2);
    setMinutes_3(minutes_I3);
    handleChangeNotes("minutes", minutes_I1 + minutes_I2 + minutes_I3);
    handleChangeNotes("minutes_1", minutes_I1);
    handleChangeNotes("minutes_2", minutes_I2);
    handleChangeNotes("minutes_3", minutes_I3);
  }, [
    notes.timeIn,
    notes.timeOut,
    notes.timeIn_2,
    notes.timeOut_2,
    notes.timeIn_3,
    notes.timeOut_3,
  ]);

  useEffect(() => {
    let unit_I1 = CalculateUnits({ minutes: minutes });
    let unit_I2 = CalculateUnits({ minutes: minutes_2 });
    let unit_I3 = CalculateUnits({ minutes: minutes_3 });
    setUnit(unit_I1);
    setUnit_2(unit_I2);
    setUnit_3(unit_I3);
    handleChangeNotes("units", unit_I1 + unit_I2 + unit_I3);

    let unitsAvailable = (scm?.sure_active.unit || 0) - (scm?.units_consumed || 0);
    if ((unit_I1 + unit_I2 + unit_I3) > unitsAvailable) {
      UnitsFull(`${unitsAvailable} unit${unitsAvailable > 1 && "s"}`);
      setVisibleBtnSave(false);
      setIsUnitsFull(true);
    } else {
      setIsUnitsFull(false);
    }
  }, [minutes, minutes_2, minutes_3]);

  useEffect(() => {
    handleChangeNotes("billable", billNote);
  }, [billNote]);



  // useEffect(() => {
  //   // Crear un nuevo arreglo con todas las fechas de las notas
  //   const newDates = clientNotes?.all_notes?.map((note) => note.date) || [];
  //   // Actualizar el estado con el nuevo arreglo de fechas
  //   setDatesToDisable(newDates);
  // }, [clientNotes]);
  useEffect(() => {
    // Crear un nuevo arreglo con todas las fechas de las notas
    if (scm?.id) {
      tcmClientNotes({ id: scm.id.toString() })
        .then((data) => {
          const newDates = data.all_notes?.map((note) => note.date) || [];
          // Actualizar el estado con el nuevo arreglo de fechas
          setDatesToDisable(newDates);
        })
        .catch((error) => {
          console.error("Error al obtener las notas:", error);
        });
    }
    let unitsAvailable = (scm?.sure_active.unit || 0) - (scm?.units_consumed || 0);
    if (unitsAvailable === 0) {
      setBlockUnitsFull(true);
    }
  }, [scm?.id]);

  useEffect(() => {
    if (notes.date) {
      tcmNotes({ date: notes.date })
        .then((data) => {
          setTcmAllNotes(data);
        })
        .catch((error) => {
          console.error("Error al obtener las notas:", error);
        });
    }
  }, [notes.date]);
  // -------------
  const myStartDate = "05/01/2024";
  const myEndDate = getNextMonthDate();
  // -------------
  return (
    <>
      {visibleBtnSave && !isUnitsFull && (
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "29px",
            zIndex: 99999,
            textAlign: "center"
          }}
        >
          <i className="pi pi-save animate-ping hover:animate-none hover:text-blue-500" onClick={() => handleButtonClick()} />
        </div>
      )}
      <div className="w-full">
        
        {blockUnitsFull ? <Message text="You have used up all the notes approved by the insurance." className="w-full mt-6 bg-gray-100 h-96" /> : (
          <div>
            <Toast ref={toast} position="top-left" />
            <ConfirmDialog />
            {/* 1 */}
            <div className="flex w-full place-items-center border-primary border border-b-0">
              <div className="flex w-2/5">
                <div className="pl-2 pr-2">
                  <b>Client`s Name:</b>
                </div>
                <div className="pl-2 pr-2">
                  {scm?.Demografic?.first_name} {scm?.Demografic?.last_name}
                </div>
              </div>

              <div className="flex w-1/5 place-items-center">

                <div><b>{(scm?.sure_active.unit ?? 0) - (scm?.units_consumed ?? 0)}</b> Remaining Units</div>
              </div>

              <div className="flex w-2/5 place-items-center">

                <div className="w-1/6 text-right pr-2">
                  <b>MR #:</b>
                </div>
                <div className="w-1/6 pl-2">{scm?.id}</div>
                {showDate && (
                  <>
                    <div className="w-2/6 text-right pr-2">
                      <b>Service Date:</b>
                    </div>
                    <div className="w-2/6 text-center bg-red-100">
                      <DisabledDatePicker
                        value={notes.date}
                        datesToDisable={datesToDisable}
                        startDate={weeks ? weeks.start : myStartDate}
                        endDate={myEndDate}
                        format="MM/DD/YYYY"
                        onChange={(date, dateString) => {
                          handleChangeNotes("date", dateString);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <Block
              active={notes.date === "" ? true : false} bg={true} copy>
              <>
                {/* ----------------------------------- */}
                {/* Intervention 1 */}
                <div className="flex w-full place-items-center border-primary border">
                  <div className="flex w-1/4 place-items-center">
                    <div className="pl-2 pr-2">Intervention: 1</div>
                  </div>
                  <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                    <div className="pl-2 pr-2">Time In:</div>
                    <div className="w-1/6 border-primary text-center">
                      <InputMask
                        mask="99:99 am"
                        value={notes.timeIn}
                        onChange={(e) => {
                          if (regexDate.test(e.value ?? "")) {
                            let { overlap, time } = CalculateOverlap({
                              timeInOut: "",
                              newTime: e.value ?? "",
                              after: moment.duration(15, "minutes"),
                              allNotes: tcmAllNotes,
                              whatField: "timeIn",
                            });
                            if (overlap) {
                              confirm1("timeIn", time);
                            } else {
                              handleChangeNotes("timeIn", time);
                            }
                          } else {
                            handleChangeNotes("timeIn", "");
                            handleChangeNotes("timeOut", "");
                            setVisibleBtnSave(false);
                          }
                        }}
                        style={{
                          width: "100px",
                          backgroundColor: "#e5ecfc",
                          border: 0,
                        }}
                      />
                    </div>
                    <div className="pl-2 pr-2">Time Out:</div>
                    <div className="w-1/6 border-primary border-r text-center">
                      <InputMask
                        mask="99:99 am"
                        value={notes.timeOut}
                        disabled={notes.timeIn === "" ? true : false}
                        onChange={(e) => {
                          if (regexDate.test(e.value ?? "")) {
                            let { overlap, time } = CalculateOverlap({
                              timeInOut: notes.timeIn,
                              newTime: e.value ?? "",
                              after: moment.duration(8, "minutes"),
                              allNotes: tcmAllNotes,
                              whatField: "timeOut",
                            });
                            if (overlap) {
                              confirm2("timeOut", notes.timeIn);
                              setVisibleBtnSave(false);
                            } else {
                              handleChangeNotes("timeOut", time);
                            }
                          } else {
                            handleChangeNotes("timeOut", "");
                          }
                        }}
                        style={{
                          width: "100px",
                          backgroundColor: "#e5ecfc",
                          border: 0,
                        }}
                      />
                    </div>
                    <div className="pl-2 pr-2">Duration:</div>
                    <div className="w-1/6 text-center flex place-items-center">
                      <input
                        id="minutes_1"
                        type="number"
                        disabled={notes.timeIn === "" ? true : false}
                        value={notes.minutes_1}
                        onChange={(e) => {
                          let timeOut = moment(notes.timeIn, "hh:mm a")
                            .add(moment.duration(e.target.value, "minutes"))
                            .format("hh:mm a");
                          handleChangeNotes("timeOut", timeOut);
                          handleChangeNotes("minutes_1", e.target.value ?? 0);
                        }}
                        placeholder="Type minutes"
                        className="input input-ghost border-0 w-full text-center"
                        style={{
                          backgroundColor: "#e5ecfc",
                          border: 0,
                          borderRadius: 0,
                          width: "90px",
                        }}
                      />
                      minutes
                    </div>
                  </div>
                  <div className="flex place-items-center w-1/6">
                    <div className="pl-2 pr-2"># Unit</div>
                    <div className="w-1/6 text-center">{unit}</div>
                  </div>
                  <div className="flex w-1/4 place-items-center border-l border-primary">
                    <div className="pl-2 pr-2">Location:</div>
                    <div className="flex w-full text-center place-items-center">
                      {notes.location}
                      <select
                        className="input input-ghost border-0 w-full text-center ml-2"
                        onChange={(e) => {
                          handleChangeNotes("location", e.target.value);
                        }}
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                      >
                        <option value="12" selected>
                          Home
                        </option>
                        <option value="11">Office</option>
                        <option value="99">Other</option>
                        <option value="3">School</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* hasta 3 goal */}
                <SelectGoal
                  scm={scm}
                  handleChangeNotes={handleChangeNotes}
                  intervention="1"
                />
                {/* Description */}
                <div
                  className="flex w-full place-items-center border-primary pl-3 border border-t-0"
                  style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
                >
                  DESCRIPTION
                </div>
                <div className="flex w-full place-items-center border-primary border border-t-0">
                  <InputTextarea
                    value={notes.description}
                    placeholder="WHAT HAPPENED..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChangeNotes("description", e.target.value)
                    }
                    rows={2}
                    className="bg-indigo-100 w-full"
                  />
                </div>
                {/* ----------- */}
                <Block active={unit > 0 ? (unit === 38 ? true : false) : true}>
                  <div>
                    {/* 2 */}
                    <div className="flex w-full place-items-center border-primary border border-t-0">
                      <div className="flex w-1/4 place-items-center">
                        <div className="pl-2 pr-2">Intervention: 2</div>
                      </div>
                      <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                        <div className="pl-2 pr-2">Time In:</div>
                        <div className="w-1/6 text-center">
                          <InputMask
                            mask="99:99 am"
                            value={notes.timeIn_2}
                            disabled={notes.timeOut === "" ? true : false}
                            onChange={(e) => {
                              if (regexDate.test(e.value ?? "")) {
                                let { overlap, time } = CalculateOverlap({
                                  timeInOut: notes.timeOut,
                                  newTime: e.value ?? "",
                                  after: moment.duration(15, "minutes"),
                                  allNotes: tcmAllNotes,
                                  whatField: "timeIn_2",
                                });
                                if (overlap) {
                                  confirm2("timeIn_2", notes.timeOut);
                                  setVisibleBtnSave(false);
                                } else {
                                  handleChangeNotes("timeIn_2", time);
                                }
                              } else {
                                handleChangeNotes("timeIn_2", "");
                              }
                            }}
                            style={{
                              width: "100px",
                              backgroundColor: "#e5ecfc",
                              border: 0,
                            }}
                          />
                        </div>
                        <div className="pl-2 pr-2">Time Out:</div>
                        <div className="w-1/6 border-primary border-r text-center">
                          <InputMask
                            mask="99:99 am"
                            value={notes.timeOut_2}
                            disabled={notes.timeIn_2 === "" ? true : false}
                            onChange={(e) => {
                              if (regexDate.test(e.value ?? "")) {
                                let { overlap, time } = CalculateOverlap({
                                  timeInOut: notes.timeIn_2,
                                  newTime: e.value ?? "",
                                  after: moment.duration(8, "minutes"),
                                  allNotes: tcmAllNotes,
                                  whatField: "timeOut_2",
                                });
                                if (overlap) {
                                  confirm2("timeOut_2", time);
                                  setVisibleBtnSave(false);
                                } else {
                                  handleChangeNotes("timeOut_2", time);
                                }
                              } else {
                                handleChangeNotes("timeOut_2", "");
                              }
                            }}
                            style={{
                              width: "100px",
                              backgroundColor: "#e5ecfc",
                              border: 0,
                            }}
                          />
                        </div>
                        <div className="pl-2 pr-2">Duration:</div>
                        <div className="w-1/6 text-center flex place-items-center">
                          <input
                            id="minutes_1"
                            type="number"
                            disabled={notes.timeIn_2 === "" ? true : false}
                            value={notes.minutes_2}
                            onChange={(e) => {
                              let timeOut = moment(notes.timeIn_2, "hh:mm a")
                                .add(moment.duration(e.target.value, "minutes"))
                                .format("hh:mm a");
                              handleChangeNotes("timeOut_2", timeOut);
                              handleChangeNotes("minutes_2", e.target.value ?? 0);
                            }}
                            placeholder="Type minutes"
                            className="input input-ghost border-0 w-full text-center"
                            style={{
                              backgroundColor: "#e5ecfc",
                              border: 0,
                              borderRadius: 0,
                              width: "90px",
                            }}
                          />
                          minutes
                        </div>
                      </div>
                      <div className="flex w-1/6 place-items-center">
                        <div className="pl-2 pr-2"># Unit</div>
                        <div className="w-1/6 text-center">{unit_2}</div>
                      </div>
                      <div className="flex w-1/4 place-items-center border-l border-primary">
                        <div className="pl-2 pr-2">Location:</div>
                        <div className="flex w-full text-center place-items-center">
                          {notes.location_2}
                          <select
                            className="input input-ghost border-0 w-full text-center ml-2"
                            onChange={(e) => {
                              handleChangeNotes("location_2", e.target.value);
                            }}
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          >
                            <option value="12" selected>
                              Home
                            </option>
                            <option value="11">Office</option>
                            <option value="99">Other</option>
                            <option value="3">School</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* hasta 3 goal */}
                    <SelectGoal
                      scm={scm}
                      handleChangeNotes={handleChangeNotes}
                      intervention="2"
                    />
                    {/* Description */}
                    <div
                      className="flex w-full place-items-center border-primary pl-3 border border-t-0"
                      style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
                    >
                      DESCRIPTION
                    </div>
                    <div className="flex w-full place-items-center border-primary border border-t-0">
                      <InputTextarea
                        value={notes.description_2}
                        placeholder="WHAT HAPPENED..."
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleChangeNotes("description_2", e.target.value)
                        }
                        rows={2}
                        className="bg-indigo-100 w-full"
                      />
                    </div>
                  </div>
                </Block>
                {/* ----------- */}
                <Block active={unit_2 > 0 ? false : true} bg={true}>
                  <div>
                    {/* 3 */}
                    <div className="flex w-full place-items-center border-primary border border-t-0">
                      <div className="flex w-1/4 place-items-center">
                        <div className="pl-2 pr-2">Intervention: 3</div>
                      </div>
                      <div className="flex w-5/6 border-primary border-l border-r place-items-center">
                        <div className="pl-2 pr-2">Time In:</div>
                        <div className="w-1/6   text-center">
                          <InputMask
                            mask="99:99 am"
                            value={notes.timeIn_3}
                            disabled={notes.timeOut_2 === "" ? true : false}
                            onChange={(e) => {
                              if (regexDate.test(e.value ?? "")) {
                                let { overlap, time } = CalculateOverlap({
                                  timeInOut: notes.timeOut_2,
                                  newTime: e.value ?? "",
                                  after: moment.duration(15, "minutes"),
                                  allNotes: tcmAllNotes,
                                  whatField: "timeIn_3",
                                });
                                if (overlap) {
                                  confirm2("timeIn_3", time);
                                  setVisibleBtnSave(false);
                                } else {
                                  handleChangeNotes("timeIn_3", time);
                                }
                              } else {
                                handleChangeNotes("timeIn_3", "");
                              }
                            }}
                            style={{
                              width: "100px",
                              backgroundColor: "#e5ecfc",
                              border: 0,
                            }}
                          />
                        </div>
                        <div className="pl-2 pr-2">Time Out:</div>
                        <div className="w-1/6 border-primary border-r text-center">
                          <InputMask
                            mask="99:99 am"
                            value={notes.timeOut_3}
                            disabled={notes.timeIn_3 === "" ? true : false}
                            onChange={(e) => {
                              if (regexDate.test(e.value ?? "")) {
                                // handleChangeNotes("timeOut_3", CalculateOverlap({ timeInOut: notes.timeIn_3, newTime: e.value ?? "", after: moment.duration(8, "minutes") }));\
                                let { overlap, time } = CalculateOverlap({
                                  timeInOut: notes.timeIn_3,
                                  newTime: e.value ?? "",
                                  after: moment.duration(15, "minutes"),
                                  allNotes: tcmAllNotes,
                                  whatField: "timeOut_3",
                                });
                                if (overlap) {
                                  confirm2("timeOut_3", time);
                                  setVisibleBtnSave(false);
                                } else {
                                  handleChangeNotes("timeOut_3", time);
                                }
                              } else {
                                handleChangeNotes("timeOut_3", "");
                              }
                            }}
                            style={{
                              width: "100px",
                              backgroundColor: "#e5ecfc",
                              border: 0,
                            }}
                          />
                        </div>
                        <div className="pl-2 pr-2">Duration:</div>
                        <div className="w-1/6 text-center flex place-items-center">
                          <input
                            id="minutes_3"
                            type="number"
                            disabled={notes.timeIn_3 === "" ? true : false}
                            value={notes.minutes_3}
                            onChange={(e) => {
                              let timeOut = moment(notes.timeIn_3, "hh:mm a")
                                .add(moment.duration(e.target.value, "minutes"))
                                .format("hh:mm a");
                              handleChangeNotes("timeOut_3", timeOut);
                              handleChangeNotes("minutes_3", e.target.value ?? 0);
                            }}
                            placeholder="Type minutes"
                            className="input input-ghost border-0 w-full text-center"
                            style={{
                              backgroundColor: "#e5ecfc",
                              border: 0,
                              borderRadius: 0,
                              width: "90px",
                            }}
                          />
                          minutes
                        </div>
                      </div>
                      <div className="flex w-1/6 place-items-center">
                        <div className="pl-2 pr-2"># Unit</div>
                        <div className="w-1/6 text-center">{unit_3}</div>
                      </div>
                      <div className="flex w-1/4 place-items-center border-l border-primary">
                        <div className="pl-2 pr-2">Location:</div>
                        <div className="flex w-full text-center place-items-center">
                          {notes.location_3}
                          <select
                            className="input input-ghost border-0 w-full text-center ml-2"
                            onChange={(e) => {
                              handleChangeNotes("location_3", e.target.value);
                            }}
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                          >
                            <option value="12" selected>
                              Home
                            </option>
                            <option value="11">Office</option>
                            <option value="99">Other</option>
                            <option value="3">School</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* hasta 3 goal */}
                    <SelectGoal
                      scm={scm}
                      handleChangeNotes={handleChangeNotes}
                      intervention="3"
                    />
                    {/* Description */}
                    <div
                      className="flex w-full place-items-center border-primary pl-3 border border-t-0"
                      style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
                    >
                      DESCRIPTION
                    </div>
                    <div className="flex w-full place-items-center border-primary border border-t-0">
                      <InputTextarea
                        value={notes.description_3}
                        placeholder="WHAT HAPPENED..."
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleChangeNotes("description_3", e.target.value)
                        }
                        rows={2}
                        className="bg-indigo-100 w-full"
                      />
                    </div>
                    {/* ----------------------------------- */}

                    {/* FOLLOW UP */}
                    {/* <div className="flex w-full place-items-center border-primary pl-3 border border-t-0" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                        FOLLOW UP
                    </div>
                    <div className="flex w-full place-items-center border-primary border border-t-0">
                        <InputTextarea
                            value={notes.valueFollowUp_3}
                            placeholder="WHAT NEXT..."
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeNotes("valueFollowUp_3", e.target.value)}
                            rows={2}
                            className="bg-indigo-100 w-full"
                        />
                    </div> */}
                  </div>
                </Block>

                {/* ----------------------------------- */}

                {/* Pogress */}
                <div
                  className="flex w-full place-items-center border-primary pl-3 border border-t-0"
                  style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
                >
                  PROGRESS{" "}
                  <i style={{ fontSize: "10px" }}>
                    &nbsp;-&nbsp; Use Client’s Name on Progress/You can use ONE (1)
                    STATEMENT PER LINE
                  </i>
                </div>
                <div className="w-full place-items-center border-primary pl-3 border border-t-0">
                  <div className="flex w-full border-gray-200 border-b">
                    <div>1</div>
                    <div className="w-full pl-2">
                      <InputText
                        value={notes.valueProgress1}
                        disabled={notes.valueProgress2 !== ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeNotes("valueProgress1", e.target.value)
                        }
                        pt={{
                          root: { className: "w-full h-6" },
                        }}
                      />
                    </div>
                  </div>

                  {notes.valueProgress1 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>2</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress2}
                          disabled={notes.valueProgress3 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress2", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress2 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>3</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress3}
                          disabled={notes.valueProgress4 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress3", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress3 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>4</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress4}
                          disabled={notes.valueProgress5 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress4", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress4 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>5</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress5}
                          disabled={notes.valueProgress6 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress5", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress5 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>6</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress6}
                          disabled={notes.valueProgress7 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress6", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress6 !== "" && (
                    <div className="flex w-full border-gray-200 border-b">
                      <div>7</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress7}
                          disabled={notes.valueProgress8 !== ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress7", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {notes.valueProgress7 !== "" && (
                    <div className="flex w-full ">
                      <div>8</div>
                      <div className="w-5/6 pl-2">
                        <InputText
                          value={notes.valueProgress8}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeNotes("valueProgress8", e.target.value)
                          }
                          pt={{
                            root: { className: "w-full h-6" },
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* FOLLOW UP */}
                <div
                  className="flex w-full place-items-center border-primary pl-3 border border-t-0"
                  style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}
                >
                  FOLLOW UP
                </div>
                <div className="flex w-full place-items-center border-primary border border-t-0">
                  <InputTextarea
                    value={notes.valueFollowUp}
                    placeholder="WHAT NEXT..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChangeNotes("valueFollowUp", e.target.value)
                    }
                    rows={2}
                    className="bg-indigo-100 w-full"
                  />
                </div>
              </>
            </Block>
          </div>
        )}

      </div>
    </>
  );
};

type Props = {
  scm?: ServiceCM;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  minutes_2: number;
  setMinutes_2: React.Dispatch<React.SetStateAction<number>>;
  minutes_3: number;
  setMinutes_3: React.Dispatch<React.SetStateAction<number>>;
  unit: number;
  setUnit: React.Dispatch<React.SetStateAction<number>>;
  unit_2: number;
  setUnit_2: React.Dispatch<React.SetStateAction<number>>;
  unit_3: number;
  setUnit_3: React.Dispatch<React.SetStateAction<number>>;
  setVisibleNotes: React.Dispatch<React.SetStateAction<boolean>>;
  relad(): void;
  billNote: string;
  // ---
  date?: string;
  showDate?: boolean | true;
  weeks?: Weeks;
  // clientNotes: ClientNotes | undefined;
  save?: boolean;
};
export { AddNotes };
