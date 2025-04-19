import React, { useState, useEffect, useRef } from "react";
// Libs Primereact
import { Toast } from "primereact/toast";
import { BlockUI } from "primereact/blockui";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// Globals
import {
  FormValueNotes,
  Notes,
  regexDate,
} from "../../../models";
import moment from "moment";

import { useCoreClientSCM } from "../../profile/hooks";
// New Struct
import { ClientNotes } from "../../../models";
import { useNotesEdit, useNotesDate, useClientNotes } from "../../../hooks/modules/tcm";
// Internal Components
// import { SelectGoal } from "./utils/selectGoal";
import { CalculateUnits } from "./utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
import { CalculateOverlap } from "./utils/calculateOverlap";
import { DisabledDatePicker } from "../../commons/DisabledDatePicker";

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

const EditNotes = ({ note, save, setVisibleNotes, relad }: Props) => {
  const { scmInfo } = useCoreClientSCM({
    id: note?.scm.toString(),
  });
  const { editNotes } = useNotesEdit(relad);
  const { tcmClientNotes } = useClientNotes();
  // -- Esto es para optener todas las notas de ese dia, para el overlap
  const { tcmNotes } = useNotesDate();

  const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
  const [datesToDisable, setDatesToDisable] = useState<string[]>([]);
  // const [saveNote, setSaveNote] = useState<boolean>(false);
  const [notes, setNotes] = useState<FormValueNotes>({
    tcm: note?.tcm ?? 0,
    scm: note?.scm ?? 0,
    weeks: note?.weeks ?? 0,
    insurance: note?.insurance ?? 0,
    date: note?.date ?? "",
    billable: note?.billable ?? "",
    minutes: note?.minutes ?? 0,
    units: note?.units ?? 0,

    timeIn: note?.timeIn ?? "",
    timeOut: note?.timeOut ?? "",
    minutes_1: 0,
    location: note?.location ?? "12",
    opening: note?.opening.split(',') ?? [],
    sp: note?.sp.split(',') ?? [],
    addendums: note?.addendums.split(',') ?? [],
    sprfollowup: note?.sprfollowup.split(',') ?? [],
    spr: note?.spr.split(',') ?? [],
    closing: note?.closing.split(',') ?? [],
    description: note?.description ?? "",

    charged: note?.charged ?? false,
    // --
    timeIn_2: note?.timeIn_2 ?? "",
    timeOut_2: note?.timeOut_2 ?? "",
    minutes_2: 0,
    location_2: note?.location_2 ?? "12",
    opening_2: note?.opening_2.split(',') ?? [],
    sp_2: note?.sp_2.split(',') ?? [],
    addendums_2: note?.addendums_2.split(',') ?? [],
    sprfollowup_2: note?.sprfollowup_2.split(',') ?? [],
    spr_2: note?.spr_2.split(',') ?? [],
    closing_2: note?.closing_2.split(',') ?? [],
    description_2: note?.description_2 ?? "",
    charged_2: note?.charged_2 ?? false,
    // --
    timeIn_3: note?.timeIn_3 ?? "",
    timeOut_3: note?.timeOut_3 ?? "",
    minutes_3: 0,
    location_3: note?.location_3 ?? "12",
    opening_3: note?.opening_3.split(',') ?? [],
    sp_3: note?.sp_3.split(',') ?? [],
    addendums_3: note?.addendums_3.split(',') ?? [],
    sprfollowup_3: note?.sprfollowup_3.split(',') ?? [],
    spr_3: note?.spr_3.split(',') ?? [],
    closing_3: note?.closing_3.split(',') ?? [],
    description_3: note?.description_3 ?? "",
    charged_3: note?.charged_3 ?? false,
    // --
    valueProgress1: note?.valueProgress1 ?? "",
    valueProgress2: note?.valueProgress2 ?? "",
    valueProgress3: note?.valueProgress3 ?? "",
    valueProgress4: note?.valueProgress4 ?? "",
    valueProgress5: note?.valueProgress5 ?? "",
    valueProgress6: note?.valueProgress6 ?? "",
    valueProgress7: note?.valueProgress7 ?? "",
    valueProgress8: note?.valueProgress8 ?? "",
    valueFollowUp: note?.valueFollowUp ?? "",
    // -- Approve
    signatureTCM: "",
    signatureTCMS: "",
    signatureBILLER: "",
    // -- Billing
    invoiced: note?.invoiced ?? false, // Facturado
    paid: note?.paid ?? ""
  });

  // const [clientNotes, setClientNotes] = useState<ClientNotes>();
  const [tcmAllNotes, setTcmAllNotes] = useState<ClientNotes>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleChangeNotes<T extends string | string[] | number | boolean>(name: keyof FormValueNotes,
    value: T) {
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
  }

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

  // ----------------------------------------------
  const handleButtonClick = () => {
    if (note.scm !== 0) {
      if (visibleBtnSave) {
        editNotes({ id: note.ID, notesEdit: notes });
      }
      // setSaveNote(false);
      setVisibleBtnSave(false);
    }
    setVisibleNotes();
  };
  // ----------------------------------------------

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
    let minutes = minutes_I1 + minutes_I2 + minutes_I3
    handleChangeNotes("minutes", minutes);
    handleChangeNotes("units", CalculateUnits({ minutes: minutes }));

    handleChangeNotes("minutes_1", minutes_I1);
    handleChangeNotes("minutes_2", minutes_I2);
    handleChangeNotes("minutes_3", minutes_I3);
  }, [notes.timeIn, notes.timeOut, notes.timeIn_2, notes.timeOut_2, notes.timeIn_3, notes.timeOut_3, handleChangeNotes]);

  useEffect(() => {
    // Crear un nuevo arreglo con todas las fechas de las notas
    if (note.scm) {
      tcmClientNotes({ id: note.scm.toString() })
        .then((data) => {
          const newDates = data.all_notes?.map((note) => note.date) || [];
          // Actualizar el estado con el nuevo arreglo de fechas
          setDatesToDisable(newDates);
        })
        .catch((error) => {
          console.error("Error al obtener las notas:", error);
        });
    }
  }, [note.scm]);

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
  // const myDatesToDisable = ["04/12/2024", "04/13/2024", "04/15/2024", "04/16/2024"];
  // const myStartDate = "05/01/2024";
  const myEndDate = getNextMonthDate();
  // -------------
  return (
    <>
      {visibleBtnSave && (
        <div
          style={{
            position: "absolute",
            right: "100px",
            top: "29px",
            zIndex: 99999,
            textAlign: "center"
          }}
        >
          <i className="pi pi-save animate-ping hover:animate-none hover:text-blue-500" onClick={() => handleButtonClick()} />
        </div>
      )}
      <div>
        <Toast ref={toast} position="top-left" />
        <ConfirmDialog />
        {/* 1 */}
        <div className="flex w-full place-items-center border-primary border border-b-0">
          <div className="flex w-3/5">
            <div className="pl-2 pr-2">
              <b>Client`s Name:</b>
            </div>
            <div className="pl-2 pr-2">
              {scmInfo?.scm.Demografic?.first_name} {scmInfo?.scm.Demografic?.last_name}
            </div>
          </div>
          <div className="flex w-2/5 place-items-center">
            <div className="w-1/6 text-right pr-2">
              <b>MR #:</b>
            </div>
            <div className="w-1/6 pl-2">{note?.scm}</div>
            <div className="w-2/6 text-right pr-2">
              <b>Service Date:</b>
            </div>
            <div className="w-2/6 text-center bg-red-100">
              <DisabledDatePicker
                value={notes.date}
                datesToDisable={datesToDisable}
                startDate={notes.date}
                endDate={myEndDate}
                format="MM/DD/YYYY"
                onChange={(date, dateString) => {
                  handleChangeNotes("date", dateString);
                }}
              />
            </div>


          </div>
        </div>
        <BlockUI
          blocked={notes.date === "" ? true : false}>
          <>
            {/* ----------------------------------- */}
            {/* Intervention 1 */}
            <div className="flex w-full place-items-center border-primary border">
              <div className="flex w-1/4 place-items-center">
                <div className="pl-2 pr-2">Intervention: 1 </div>
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
                {/* <div className="w-1/6 text-center">{unit}</div> */}
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
            {/* <SelectGoal
              scm={scmInfo?.scm}
              handleChangeNotes={handleChangeNotes}
              intervention="1"
            /> */}
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
            {/* <BlockUI blocked={unit > 0 ? (unit === 38 ? true : false) : true}> */}
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
                  {/* <div className="w-1/6 text-center">{unit_2}</div> */}
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
              {/* <SelectGoal
                  scm={scmInfo?.scm}
                  handleChangeNotes={handleChangeNotes}
                  intervention="2"
                /> */}
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
            {/* </BlockUI> */}
            {/* ----------- */}
            {/* <BlockUI blocked={unit_2 > 0 ? false : true}> */}
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
                  {/* <div className="w-1/6 text-center">{unit_3}</div> */}
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
              {/* <SelectGoal
                  scm={scmInfo?.scm}
                  handleChangeNotes={handleChangeNotes}
                  intervention="3"
                /> */}
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
            {/* </BlockUI> */}

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
        </BlockUI>
      </div>
    </>
  );
};

type Props = {
  note: Notes;
  save?: boolean;
  setVisibleNotes(): void;
  relad(): void;
};
export { EditNotes };
