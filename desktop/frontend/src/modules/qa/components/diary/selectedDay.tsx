import { useEffect, useState, useCallback, useRef } from "react";

import { classNames } from "primereact/utils";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import { Message } from 'primereact/message';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { AddEvent } from "../../../commons/events/add";
import { VoiceRecorder, DayCalendar } from "../../../commons"
import { useEvents } from "../../../../hooks/modules/commons";
import { DiaryTCMaddNote } from "../../../tcm/tcm/components";
import { EditNotes } from "../../../tcm/notes/editNotes";
import { DiaryNote } from "../../../tcm/tcm/components/diary/diaryNote";
// -- New Struct
import {
  Active,
  Supervisons,
  Event,
  Notes,
  Clients,
  Client,
} from "../../../../models";
import { useTcmBillActive, useNoteDel, useTcmSupervisionsComplete } from "../../../../hooks/modules/tcm";
import { useEventDel } from "../../../../hooks/modules/commons";

function formatDate(date: Date) {
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();

  return month + "/" + day + "/" + year;
}
interface Task {
  id: number;
  title: string;
  description?: string;
  timeStart: string; // Formato 'HH:mm'
  timeEnd: string; // Formato 'HH:mm'
  note: Notes;
  activeCliente: Client;
}


const DiaryQa = ({
  date,
  active,
  relad,
}: Props) => {
  // const { tcmBillActive } = useTcmBillActive();
  // const { tcmSupervisionActive } = useTcmSupervisionsComplete(relad);
  // Event
  const { myEvents, reloadMyEvents } = useEvents();
  const { delEvent } = useEventDel(relad);
  const [visibleEvent, setVisibleEvent] = useState<boolean>(false);
  const [eventActive, setEventActive] = useState<Event | undefined>(undefined);
  const [visibleEventShow, setVisibleEventShow] = useState<boolean>(false);


  const [itemsEvents, setItemsEvents] = useState<MenuItem[]>([
    {
      items: [],
    },
  ]);
  const [itemsReminders, setItemsReminders] = useState<MenuItem[]>([
    {
      items: [],
    },
  ]);
  // --- SUpervisons
  const toast = useRef<Toast>(null);
  let currentDate = new Date();


  const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }
  const confirm = (id: string) => {
    confirmDialog({
      message: (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <span className='text-justify'>
            To generate the supervision certificate, <br />
            the system needs to use your electronic signature. <br />
            Do you allow this?
          </span>
        </div>
      ),
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Certificate',
          detail: (
            <span>
              The certificate already has your signature, please click on
              <i className='pi pi-file-check pl-2 pr-2 text-green-500 animate-pulse' />
              to download your certificate.
            </span>
          ),
          life: 10000,
        });
        // tcmSupervisionActive({ id: id });
      },
      reject
    });
  };

  // ---



  // const onShowNote = () => {
  //   setVisible(false);
  // };
  // const handleAddNote = () => {
  //   setVisibleNotes(true);
  // };
  const handleAddEvent = () => {
    setVisibleEvent(true);
  };

  const onCloseEvent = () => {
    setVisibleEvent(false);
  };

  // --- task
  const [tasks, setTasks] = useState<Task[]>([]);
  // const addTask = (newTask: Task) => { setTasks(prevTasks => [...prevTasks, newTask]); };


  const Reload = useCallback(() => {
    const renderedClients = new Set(); // Usamos un conjunto para evitar duplicados
    const renderedEvents = new Set(); // Usamos un conjunto para evitar duplicados
    const renderedReminders = new Set(); // Usamos un conjunto para evitar duplicados

    const newItemsNotes: MenuItem[] = [
      // Inicializamos newItemsNotes como un array vacío
      {
        items: [],
      },
    ];
    const newItemsEvents: MenuItem[] = [
      // Inicializamos newItemsEvents como un array vacío
      {
        items: [],
      },
    ];
    const newItemsReminders: MenuItem[] = [
      // Inicializamos newItemsReminders como un array vacío
      {
        items: [],
      },
    ];
    setTasks([]);
    const newsTasks: Task[] = [];
    // -----------

    setTasks(newsTasks);
    // -----------
    myEvents?.all_event?.forEach((item) => {
      if (date === item.date) {
        if (!renderedEvents.has(item.ID)) {
          renderedEvents.add(item.ID); // Agregamos el cliente al conjunto
          // Comprobamos si el cliente ya ha sido añadido a itemsNotes
          const clientAlreadyAdded = newItemsEvents.some(
            (note) => note.label === item.title
          );
          if (!clientAlreadyAdded) {
            // Agregamos el cliente a itemsNotes
            newItemsEvents.push({
              label: item.title,
              icon: <Badge value="E" className='mr-2' />,
              //   className:'bg-orange-400',
              command: () => {
                setEventActive(item);
                // setActiveClient(client);
                setVisibleEventShow(true);
              },
            });
          }
        }
      }
    });



    // Actualizamos el estado de itemsNotes con la nueva lista
    // setItemsNotes(newItemsNotes);
    setItemsEvents(newItemsEvents);
    setItemsReminders(newItemsReminders);
  }, [
    date,
    // tcmNotes,
    // myClients,
    myEvents,
    // supervisions,
    // setActiveNote,
    // setActiveClient,
    // setVisible,
    setEventActive,
    setVisibleEventShow,
    // setItemsNotes,
    setItemsEvents,
    setItemsReminders,
  ]);
  // ----------- Eventes
  const headerEvents = (title) => {
    return (
      <div className="flex w-full place-items-center">
        <div className="flex w-1/3">
          <div className="pl-2 pr-2">
            <b>{title}</b>
          </div>
        </div>
        <div className="w-2/3 text-right">
          <i
            className="pi pi-trash hover:text-red-500  cursor-pointer mr-2"
            onClick={() => {
              delEvent({ id: eventActive?.ID ?? 0 });
              reloadMyEvents();
              setVisibleEventShow(false);
            }}
          />
          {/* <i
            className="pi pi-file-edit hover:text-blue-500  cursor-pointer"
            onClick={() => {
              // setNoteHelp(true);
            }}
          /> */}
        </div>
      </div>
    );
  };
  // ----- Notes


  // -------------------
  useEffect(() => {
    reloadMyEvents();
    Reload();
  }, [Reload, relad]);

  return (
    <div className="card flex justify-content-center">
      <div className="flex w-full">
        <div className="w-2/3 m-0 border-gray-200 pr-4 border-r-2 mr-4">
          <div className="w-full flex ">
            <div className="w-2/3">
              <h2 className="flex mb-2 text-lg font-bold">To be defined</h2>
            </div>
            <div className="w-1/3 grid text-right p-2">

            </div>
          </div>
          <div className={classNames(
            "w-full h-auto",
            'overflow-y-auto'
          )}>

            <Message text="Nothing for this day" className="w-full mt-6 bg-gray-100 h-96" />

          </div>



          <Dialog
            header={headerEvents(eventActive?.title)}
            // maximizable
            visible={visibleEventShow}
            style={{ width: "30vw" }}
            closeOnEscape
            onHide={() => setVisibleEventShow(false)}
            footer={
              <VoiceRecorder
                relad={relad}
                active={active}
                to={active?.activeUser?.User?.ID.toString() || "0"}
                module="global"
                component="events"
                id_component={eventActive?.ID.toString() || "0"}
                mode='private'
              />
            }
          >
            <div className="card flex justify-content-center">
              <b>Description:</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: eventActive?.description ?? "",
                }}
              />
            </div>
          </Dialog>
        </div>



        <div className="w-1/3 m-0">

          <div className="flex flex-col flex-1">
            <div className="w-full flex">
              <div className="w-2/3">
                <h1 className="flex mb-2 text-lg font-bold">Events</h1>
              </div>
              <div className="w-1/3 grid text-right p-2">
                {date >= (active?.activeUser?.WeekActive?.start ?? "") && (
                  <Button
                    label="ADD"
                    className="m-0"
                    icon="pi pi-plus"
                    size="small"
                    onClick={handleAddEvent}
                  />
                )}
              </div>
            </div>
            <div className="h-64 overflow-y-auto">
              {itemsEvents.length > 1 ? (
                <Menu
                  model={itemsEvents}
                  pt={{
                    root: {
                      className: classNames("w-full"),
                    },
                    menuitem: {
                      className: classNames("bg-blue-100 mb-1"),
                    },
                  }}
                />
              ) : (
                <Message text="No events for this day" className="w-full mt-6 bg-gray-100" />
              )}
            </div>

            <Dialog
              header={`Add Event on (${date})`}
              maximizable
              visible={visibleEvent}
              style={{ width: "30vw" }}
              onHide={() => setVisibleEvent(false)}
            >
              <AddEvent
                active={active}
                date={date}
                relad={relad}
                setVisible={onCloseEvent}
              />
            </Dialog>
          </div>
          {/* Reminders ------------------------------------------------------*/}
          <div className="divider divider-info"><h2 className="text-lg font-bold">Reminders</h2></div>
          {itemsReminders.length > 1 ? (
            <Menu
              model={itemsReminders}
              pt={{
                root: {
                  className: classNames("w-full"),
                },
                menuitem: {
                  className: classNames("rounded"),
                },
              }}
            />
          ) : (
            <Message text="No reminders for this day" className="w-full mt-6 bg-gray-100" />
          )}

          <Toast ref={toast} />
          <ConfirmDialog />

        </div>
      </div>
    </div>
  );
};

type Props = {
  date: string;
  active: Active | undefined;
  // myClients: Clients | undefined;
  // tcmNotes: Notes[];
  // supervisions: Supervisons[];
  relad(): void;
};
export { DiaryQa };
