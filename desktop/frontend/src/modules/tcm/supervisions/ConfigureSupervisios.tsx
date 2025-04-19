import { useEffect, useRef, useState } from "react";

// -- Libs PrimeReact
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import { SupervisionCertificate } from "../../commons";
// -- New struct
import { TcmLits, Supervisons } from "../../../models";
import {
  useTcmSupervisionsAdd,
  useTcmSupervisios,
  useTcmSupervisionsChangeDate,
} from "../../../hooks/modules/tcm";

function formatDate(date: Date) {
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();

  return month + "/" + day + "/" + year;
}

type Props = {
  tcmSelected: TcmLits | undefined;
  relad(): void;
  closed(): void;
};

const ConfigureSupervisios = ({ tcmSelected, relad, closed }: Props) => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [datesDisabled, setDatesDisabled] = useState<Date[]>([]);
  const [activeSupervisions, setActiveSupervisions] =
    useState<Supervisons | null>(null);
  const [dateOK, setDateOK] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { tcmSupervisons, reloadTcmSupervisons } = useTcmSupervisios({
    id: tcmSelected?.info?.ID.toString() ?? "0",
  });
  const { tcmSupervisionsAdd } = useTcmSupervisionsAdd(relad);
  const { tcmSupervisionsChangeDate } = useTcmSupervisionsChangeDate(relad);

  const toast = useRef<Toast>(null);

  const accept = () => {
    toast.current?.show({
      severity: "success",
      summary: "Confirmed",
      detail: "The system is scheduling TCM supervisions",
      life: 3000,
    });

    setDateOK(true);
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const footerContent = <></>;

  const confirm = (position) => {
    confirmDialog({
      message: (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <span className="text-justify">
            If you do so, please note that any <br />
            date changes will have to be made <br />
            manually, one by one.
            <br />
            Are you sure you want to continue?
          </span>
        </div>
      ),
      header: "Confirmation",
      icon: "pi pi-info-circle",
      position,
      accept,
      reject,
    });
  };
  const removeDate = (dateToRemove: string) => {
    const [month, day, year] = dateToRemove.split("/");
    const dateToRemoveObj = new Date(`${year}-${month}-${day}`);
    setDatesDisabled(
      datesDisabled.filter(
        (date) => date.getTime() !== dateToRemoveObj.getTime()
      )
    );
    reloadTcmSupervisons();
  };

  const confirmChanged = (position, sup, date, oldDate) => {
    console.log(oldDate);
    confirmDialog({
      message: (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <span className="text-justify">
            Are you sure you want to change the <br />
            supervision date?
          </span>
        </div>
      ),
      header: "Confirmation",
      icon: "pi pi-info-circle",
      position,
      accept: () => {
        removeDate(oldDate);
        tcmSupervisionsChangeDate({ id: sup, date: formatDate(date) });
        setDate(new Date(date));
        reloadTcmSupervisons();
      },
      reject,
    });
  };
  // -------------------------------
  useEffect(() => {
    if (dateOK) {
      tcmSupervisionsAdd({
        newSupervisons: {
          user: Number(tcmSelected?.info?.ID) ?? 0,
          date: date ? formatDate(date) : "",
        },
      });
    }
  }, [dateOK, tcmSupervisionsAdd, date, tcmSelected]);

  const reloadAll = () => {
    setLoading(true);
    // Filtrar supervisions del tcmSelected únicamente
    if (tcmSupervisons?.supervisions) {
      setDatesDisabled([]); // Reinicia las fechas deshabilitadas al seleccionar un nuevo TCM
      tcmSupervisons?.supervisions
        .filter(sup => sup.user === Number(tcmSelected?.info?.ID)) // Agrega este filtro
        .forEach((sup) => {
          setDatesDisabled((prevDates) => [...prevDates, new Date(sup.date)]);
        });
    }
    setLoading(false);
  };

  useEffect(() => {
    reloadTcmSupervisons();
    reloadAll();
  }, [relad, tcmSupervisons]);

  return (
    <Dialog
      header={`Setting up ${tcmSelected?.info?.fullname} supervision`}
      visible={true}
      maximizable
      resizable={false}
      draggable={false}
      style={{ width: tcmSupervisons?.supervisions?.length !== undefined &&
        tcmSupervisons?.supervisions.length > 0 ? ("60vw"):("30vw")}}
      // style={{ width: "30vw" }}
      breakpoints={{ "960px": "70vw", "641px": "90vw" }}
      onHide={() => closed()}
      footer={footerContent}
    >
      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full h-auto">
            <i
              className="pi pi-sun pi-spin text-secondary"
              style={{ fontSize: "5rem" }}
            />
          </div>
        ) : tcmSupervisons?.supervisions?.length !== undefined &&
          tcmSupervisons?.supervisions.length > 0 ? (
          <div>
            <div className="flex w-full">
              <div className="w-3/5 h-96 overflow-y-auto scroll-smooth">
                <Accordion>
                  {tcmSupervisons.supervisions.map((sup) => {
                    return (
                      <AccordionTab
                        header={
                          <div
                            onMouseMove={() => {
                              setDate(new Date(sup.date));
                              setActiveSupervisions(sup);
                            }}
                            onMouseEnter={() => {
                              setDate(new Date(sup.date));
                              setActiveSupervisions(sup);
                            }}
                          >
                            {!sup.completed ? (
                              <>
                                {sup.id === activeSupervisions?.id ? (
                                  <b className="text-secondary">
                                    {sup.date} - {sup.title}
                                  </b>
                                ) : (
                                  `${sup.date} - ${sup.title}`
                                )}
                              </>
                            ) : (
                              <div className="text-green-500">
                                {sup.date} - {sup.title}
                              </div>
                            )}
                          </div>
                        }
                        pt={{
                          content: {
                            className: classNames("bg-gray-50"),
                          },
                        }}
                      >
                        <div
                          className="flex w-full"
                          onMouseMove={() => {
                            setDate(new Date(sup.date));
                            setActiveSupervisions(sup);
                          }}
                        >
                          {sup.completed === true ? (
                            <SupervisionCertificate superv={sup} />
                          ) : (
                            <Message
                              severity="warn"
                              text="Select a new date for this supervision on the calendar"
                            />
                          )}
                        </div>
                      </AccordionTab>
                    );
                  })}
                </Accordion>
              </div>
              <div className="w-2/5">
                <Calendar
                  value={date}
                  className="w-full"
                  onChange={(e) => {
                    if (
                      activeSupervisions !== null &&
                      !activeSupervisions.completed
                    ) {
                      confirmChanged(
                        "bottom-right",
                        activeSupervisions?.id,
                        e.value,
                        activeSupervisions?.date
                      );
                    }
                  }}
                  disabledDates={datesDisabled}
                  dateTemplate={(dates) => {
                    return (
                      <div
                        className={classNames(
                          "p-5",
                          dates.otherMonth && "hidden",
                          dates.day === date?.getDate() &&
                          "bg-orange-500 text-white",
                          !dates.selectable &&
                            new Date(
                              activeSupervisions?.date ?? 0
                            ).getDate() === dates.day
                            ? "bg-orange-500"
                            : !dates.selectable && "bg-blue-500 text-white"
                        )}
                      >
                        {dates.day}
                      </div>
                    );
                  }}
                  inline
                  // showWeek
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full mx-auto">
              <Toast ref={toast} />

              <Calendar
                value={date}
                className="text-sm p-2 w-full"
                onChange={(e) => {
                  setDate(e.value);
                  confirm("bottom-right");
                }}
                inline
              />
            </div>
            <Message severity="info" text="Select the date for the TCM's first supervision. The system will automatically schedule subsequent sessions every 7 days, for all 52 topics." />
          </>
        )}

        <ConfirmDialog />
      </div>
    </Dialog>
  );
};

export { ConfigureSupervisios };
