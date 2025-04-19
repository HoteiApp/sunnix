import { useState, useEffect } from 'react';
// -- Primereact Libs
import { classNames } from 'primereact/utils';
import { SpeedDial } from 'primereact/speeddial';
import { Skeleton } from 'primereact/skeleton';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
// -- ANTD Libs
import { Calendar as AntdCalendar, CalendarProps } from 'antd';
// -- Other Libs
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
// ------
import { Active, Event } from "../../models";
// TODO New struct
import { useDateDiary } from "../../hooks/modules/tcm";
// -- Component
import { DiaryBiller } from "./components";

dayjs.extend(dayLocaleData);


function formatDate(date: Date) {
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();

  return month + '/' + day + '/' + year;
}

const BillerDashboard = ({ active, relad }: Props) => {
  // const { myClientsActive, reloadMyClientsActive } = useTCMClientsActive();
  const { dateDiary, isLoadingdateDiary } = useDateDiary();
  // const { myEvents, reloadMyEvents } = useEvents();
  const [events, setEvents] = useState<Event[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [dateSelect, setDateSelect] = useState<string>("");


  // -----------
  // -- Siempre se muestra el mes donde este la semana activa
  const [dateRender, setDateRender] = useState<Dayjs>(active?.activeUser?.WeekActive?.end ? dayjs(active.activeUser.WeekActive.end) : dayjs());
  const [yearRender, setYearRender] = useState<Nullable<Date>>(active?.activeUser?.WeekActive?.end ? dayjs(active.activeUser.WeekActive.end).toDate() : dayjs().toDate());
  const [monthRender, setMonthRender] = useState<Nullable<Date>>(active?.activeUser?.WeekActive?.end ? dayjs(active.activeUser.WeekActive.end).toDate() : dayjs().toDate());

  // Función para restar un mes
  const subtractMonth = () => {
    setDateRender(dateRender.subtract(1, 'month'));
    setYearRender(dateRender.subtract(1, 'month').toDate());
    setMonthRender(dateRender.subtract(1, 'month').toDate());
    fetchDiaryData(dateRender.subtract(1, 'month').toDate());
  };

  // Función para sumar un mes
  const addMonth = () => {
    setDateRender(dateRender.add(1, 'month'));
    setYearRender(dateRender.add(1, 'month').toDate());
    setMonthRender(dateRender.add(1, 'month').toDate());

    fetchDiaryData(dateRender.add(1, 'month').toDate());
  };
  // -----------

  const dateCellRender = (value: Dayjs) => {
    const current = dayjs().format('MM/DD/YYYY');

    const dates = value.format("MM/DD/YYYY");
    // Convertir la cadena a un objeto Date
    const dateObject = new Date(dates);
    const dayOfWeek = dateObject.getDay();



    let numEvents = 0;


    // Agrupar eventos por fecha con tipo explícito para eventsByDate
    const eventsByDate: { [key: string]: Event[] } = events.reduce((acc, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    }, {} as { [key: string]: Event[] });

    const renderedEvents = Object.entries(eventsByDate).map(([date, eventsOnSameDate]) => {
      // Solo muestra el primer evento y luego un contador para el resto
      let datesEvents = new Date(date);
      if (dates === formatDate(datesEvents)) {
        numEvents = eventsOnSameDate.length;
        const firstEvent = eventsOnSameDate[0];
        const additionalEvents = eventsOnSameDate.length - 1;
        let title = firstEvent.title.split(" ");
        let primerasPalabras = title.slice(0, 3).join(" ");
        return (
          <li key={firstEvent.ID} className="flex">
            <Tooltip target={`.custom-target-event-${firstEvent.ID}`} />
            <Badge
              value="E"
              severity="info"
              className={classNames(`custom-target-event-${firstEvent.ID}`)}
              data-pr-tooltip="Event"
              data-pr-position="top"
            />
            {(new Date(date) < new Date(active?.activeUser?.WeekActive?.start ?? "")) ? (
              <s className="pl-2">
                {primerasPalabras} {additionalEvents > 0 && `+${additionalEvents} more`}
              </s>
            ) : (new Date(date) > new Date(active?.activeUser?.WeekActive?.end ?? "")) ? (
              <i className="pl-2">
                {primerasPalabras} {additionalEvents > 0 && `+${additionalEvents} more`}
              </i>
            ) : (
              <span className="pl-2">
                {primerasPalabras} {additionalEvents > 0 && `+${additionalEvents} more`}
              </span>
            )}
          </li>
        );
      }
    });



    const combineAndAlternate = (arr1: JSX.Element[], arr2: JSX.Element[], arr3: JSX.Element[]) => {
      const result: JSX.Element[] = [];
      for (let i = 0; i < Math.max(arr1.length, arr2.length, arr3.length); i++) {
        if (i < arr1.length) {
          result.push(arr1[i]);
        }
        if (i < arr2.length) {
          result.push(arr2[i]);
        }
        if (i < arr3.length) {
          result.push(arr3[i]);
        }
      }
      return result;
    };

    // const safeRenderedNotes = (renderedNotes || []).flat().filter((item): item is JSX.Element => item !== null && item !== undefined);
    const safeRenderedEvents = (renderedEvents || []).flat().filter((item): item is JSX.Element => item !== null && item !== undefined);
    // const safeRenderedReminders = (renderedReminders || []).flat().filter((item): item is JSX.Element => item !== null && item !== undefined);

    const combinedEvents = combineAndAlternate([], safeRenderedEvents, []);

    return (
      <div
        className={classNames(
          'h-36 p-1 pt-0 border-t hover:bg-gray-100',
          'p-ripple',
        )}
        onClick={() => { onSelect(value) }}
      >
        {/* TODO: Modificar estructura de calencario */}

        <div className={classNames(
          'w-full shadow-lg',
          dates === dateSelect ? 'bg-green-100' : (
            ((dayjs(dates).isSame(dayjs(active?.activeUser?.WeekActive?.start ?? "")) || dayjs(dates).isAfter(dayjs(active?.activeUser?.WeekActive?.start ?? ""))) &&
              (dayjs(dates).isSame(dayjs(active?.activeUser?.WeekActive?.end ?? "")) || dayjs(dates).isBefore(dayjs(active?.activeUser?.WeekActive?.end ?? "")))) ?
              'bg-blue-100' : (numEvents > 0) ?
                'bg-yellow-100' : (dayOfWeek === 0 || dayOfWeek === 6) ?
                  "bg-gray-50" : 'bg-white'
          ),
        )}>
          <div className={classNames(
            'w-full flex shadow-sm text-center pt-2'
          )}>
            {/* TODO: Header to day */}
            <div className='w-1/2 text-right flex'></div>
            <div className='text-center'>
              {
                dates > (active?.activeUser?.WeekActive?.start ?? "") &&
                (numEvents) > 0 &&
                <i className='pi pi-thumbtack' style={{ position: 'relative', top: "-5px", transform: "rotate(30deg)" }} />
              }
            </div>
            <div className='w-1/2 text-right justify-content-center'>

              <Badge value={dates.split("/", 2)[1]} className={classNames(
                dates === current ? 'bg-primary' : dates === dateSelect ? 'bg-gray-300 text-primary' : dates.split("/", 2)[0] !== current.split("/", 2)[0] ? 'bg-transparent text-gray-300' : 'bg-transparent text-primary'
              )}></Badge>
            </div>
          </div>
          <div className={classNames(
            'w-full text-left pl-1 overflow-y-auto h-24',
          )}>
            {isLoadingdateDiary ? (
              <>
                <Skeleton className="mb-2"></Skeleton>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
              </>
            ) : (
              <ul>
                {combinedEvents}
              </ul>
            )}

          </div>
        </div>
        <Ripple
          pt={{
            root: { style: { background: 'rgba(255, 193, 6, 0.3)' } }
          }}
        />
      </div >
    )
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const onSelect = (value: Dayjs) => {
    const dates = value.format("MM/DD/YYYY");
    // -- Si la fecha pertenece al mes que se esta renderizando se muestra lo que tienen el dia
    const isSameMonth = value.isSame(dayjs(dateRender), 'month');
    if (isSameMonth) {
      setVisible(true);
    }
    // -----
    setDateSelect(dates);
    setDateRender(dayjs(dates));
    setYearRender(dayjs(dates).toDate());
    setMonthRender(dayjs(dates).toDate());

  };

  const fetchDiaryData = async (monthRender) => {
    // Formatear la fecha a mm/dd/yyyy
    const formattedDate = `${String(monthRender.getMonth() + 1).padStart(2, '0')}/${String(monthRender.getDate()).padStart(2, '0')}/${monthRender.getFullYear()}`;
    try {
      // Llamar a la función de mutación y esperar el resultado
      const result = await dateDiary({ date: formattedDate });
      // Verifica si la propiedad notes existe en el resultado
      if (result) {
        // setNotes(result.notes);
        setEvents(result.events);
        if (result.supervisions !== null) {
          // setSupervisons(result.supervisions);
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos del diario:", error);
    }
  };

  useEffect(() => {
    fetchDiaryData(monthRender);
  }, []);



  useEffect(() => {
    // -- Recargar los datos
    fetchDiaryData(monthRender);

    if (typeof document !== 'undefined') {
      // Ahora puedes utilizar el objeto 'document' de manera segura
      let elements = Array.from(document.querySelectorAll('.transition-opacity'));

      // Mezcla el array de elementos
      elements = elements.sort(() => Math.random() - 0.1);

      let i = 0;

      const interval = setInterval(() => {
        if (i >= elements.length) {
          clearInterval(interval);
        } else {
          elements[i].classList.remove('opacity-0');
          elements[i].classList.add('opacity-100');
          i++;
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [relad]);

  return (
    <div className="relative w-full h-screen">
      <div className="sticky top-1/2 right-0 z-50 opacity-20 hover:opacity-100">
        <SpeedDial
          showIcon={<i className="pi pi-angle-right pl-2" style={{ fontSize: '2rem' }}></i>}
          pt={{
            root: {
              className: "-right-[20px] hover:pr-5 hover:animate-pulse hover:w-auto"
            },
          }}
          onClick={() => addMonth()}
        />
      </div>
      <div className="sticky top-1/2 transform -translate-y-1/2 left-0 z-50 opacity-20 hover:opacity-100">
        <SpeedDial
          pt={{
            root: {
              className: "-left-[20px] hover:pl-5 hover:animate-pulse hover:w-auto"
            },
          }}
          showIcon={<i className="pi pi-angle-left" style={{ fontSize: '2rem' }}></i>}
          onClick={() => subtractMonth()}
        />
      </div>

      <AntdCalendar
        className='bg-gray-50'
        mode='month'
        value={dateRender}
        fullscreen={true}
        headerRender={() => {
          return (
            <div className='w-full flex'>
              <div className='w-1/2 pt-5 pl-5 flex'>
                <div className='w-full flex'>
                  <div className='flex justify-center items-center h-full'>
                    <b>SELECT DATE:</b>
                  </div>
                  <div className='w-1/2 flex items-center h-full'>
                    <PrimeCalendar
                      className='w-16 '
                      value={yearRender}
                      variant="filled"
                      onChange={(e) => {
                        setDateRender(dayjs(e.value));
                        setYearRender(e.value);
                        setMonthRender(e.value);
                      }}
                      view="year" dateFormat="yy"
                    />/
                    <PrimeCalendar
                      className='w-28 '
                      value={monthRender}
                      variant="filled"
                      onChange={(e) => {
                        setDateRender(dayjs(e.value));
                        setYearRender(e.value);
                        setMonthRender(e.value);
                      }}
                      view="month" dateFormat="MM"
                    />
                  </div>
                </div>
              </div>
              <div className='w-1/2 text-right pr-5 pt-5 items-center'>
                <b>Legend:</b>
                <Badge value="E" className='ml-3 mr-2' />Events
                <i className='pi pi-eye pl-3 mr-2 text-red-500' /> Reminders
              </div>
            </div>
          );
        }}
        fullCellRender={cellRender}
      />
      <Dialog header={dateSelect} maximizable visible={visible} modal={true} style={{ width: '60vw' }} onHide={() => setVisible(false)}>
        <DiaryBiller date={dateSelect} active={active} relad={relad} />
      </Dialog>
    </div>
  );
};
type Props = {
  active?: Active;
  relad(): void;
};

export { BillerDashboard };
