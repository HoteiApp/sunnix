import { useState } from 'react';
import {
  Active,
  Supervisons,
  Event,
  Notes,
  Clients,
  Client,
} from "../../models";


interface Task {
  id: number;
  title: string;
  description?: string;
  timeStart: string; // Formato 'hh:mm am/pm'
  timeEnd: string;   // Formato 'hh:mm am/pm'
  note: Notes;
  activeCliente: Client;
}

interface DayCalendarProps {
  date: string; // Día en formato 'YYYY-MM-DD'
  tasks: Task[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveNote: React.Dispatch<React.SetStateAction<Notes | undefined>>;
  setActiveClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
}

const DayCalendar = ({ date, tasks, setVisible, setActiveClient, setActiveNote }: DayCalendarProps) => {
  // const [activeNote, setActiveNote] = useState<Notes | undefined>(undefined);
  const convertTo24HourFormat = (time: string) => {
    let [hours, minutesPart] = time.split(':');
    let minutes = minutesPart.substring(0, 2);
    const period = minutesPart.substring(3).toLowerCase();

    let hoursIn24Format = parseInt(hours);
    if (period === 'pm' && hoursIn24Format !== 12) {
      hoursIn24Format += 12;
    } else if (period === 'am' && hoursIn24Format === 12) {
      hoursIn24Format = 0;
    }

    return { hours: hoursIn24Format, minutes: parseInt(minutes) };
  };

  const getPositionStyle = (timeStart: string, timeEnd: string): React.CSSProperties => {
    const { hours: startHour, minutes: startMinute } = convertTo24HourFormat(timeStart);
    const { hours: endHour, minutes: endMinute } = convertTo24HourFormat(timeEnd);

    // Calcular los minutos desde las 07:00 am
    const startMinutes = (startHour - 7) * 60 + startMinute;
    const endMinutes = (endHour - 7) * 60 + endMinute;
    const durationMinutes = endMinutes - startMinutes;

    // Ajuste de escala: 19px para cada 15 minutos (76px por hora)
    const topPosition = (startMinutes / 15) * 19;
    const height = (durationMinutes / 15) * 19;

    return {
      height: `${height}px`,
      top: `${topPosition}px`,
      position: "absolute",
      left: "0",
      right: "0",
    };
  };

  return (
    <div className="calendar-container relative w-full">
      <div className='flex w-full lines-Units h-1/2'>
        {/* Contenedor de las horas */}
        <div className="hour-slots relative w-auto">
          {Array.from({ length: 14 }).map((_, i) => { // Incrementa el número de horas si es necesario
            const hour24 = i + 7;
            const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
            const period = hour24 >= 12 ? 'pm' : 'am';

            return (
              <div key={hour24} className="w-full hour-slot place-items-center">
                <div className='w-full border-t text-black'>{`${hour12.toString().padStart(2, '0')}:00 ${period}`}</div>
                <div className='w-full border-t'>{`${hour12.toString().padStart(2, '0')}:15`}</div>
                <div className='w-full border-t'>{`${hour12.toString().padStart(2, '0')}:30`}</div>
                <div className='w-full border-t'>{`${hour12.toString().padStart(2, '0')}:45`}</div>
              </div>
            );
          })}
          <div className="w-full place-items-center">
            <div className='w-full border-t text-black' style={{ fontSize: "12px" }}>09:00 pm</div>
          </div>
        </div>

        {/* Contenedor de tareas */}
        <div className="tasks-container w-5/6 ml-10 relative" style={{ minHeight: "1100px" }}>
          {tasks.map((task, index) => (
            <div
              key={`${task.id}-${index}`}
              className="task bg-yellow-300 shadow-sm rounded-md content-center bg-opacity-50 hover:bg-opacity-100 cursor-pointer"
              style={getPositionStyle(task.timeStart, task.timeEnd)}
              onClick={() => {
                setVisible(true);
                setActiveClient(task.activeCliente);
                setActiveNote(task.note);
              }}
            >
              <div className='w-full flex group relative'>
                <div className='w-4/6'>
                  <p className='pl-2 pr-2 text-center'>{task.title}</p>
                </div>
                <div className='pl-2 pr-2 w-2/6 text-right invisible group-hover:visible animate-pulse' style={{fontSize:"10px"}}>({`${task.timeStart} - ${task.timeEnd}`})</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export { DayCalendar };
