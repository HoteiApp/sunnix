import React from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  timeStart: string; // Formato 'HH:mm'
  timeEnd: string; // Formato 'HH:mm'
}

interface DayCalendarProps {
  date: string; // Día en formato 'YYYY-MM-DD'
  tasks: Task[];
}

const DayCalendarFull: React.FC<DayCalendarProps> = ({ date, tasks }) => {
  // Convierte la hora de la tarea en una posición de estilo CSS
  const getPositionStyle = (tasks: { timeStart: string; timeEnd: string; }[], index: number) => {
    const task = tasks[index];
    const [hour, minute] = task.timeStart.split(':').map(Number);
    const [hourEnd, minuteEnd] = task.timeEnd.split(':').map(Number);

    let menosIndex = 0;
    for (let i = 0; i < index; i++) {
      const [prevHourStart, prevMinuteStart] = tasks[i].timeStart.split(':').map(Number);
      const [prevHourEnd, prevMinuteEnd] = tasks[i].timeEnd.split(':').map(Number);
      const prevDurationMinutes = (prevHourEnd * 60 + prevMinuteEnd) - (prevHourStart * 60 + prevMinuteStart);
      menosIndex += (prevDurationMinutes / 15) * 19;
    }

    const topPosition = (((hour - 7) * 76) - 1064 - menosIndex);

    const durationMinutes = (hourEnd * 60 + minuteEnd) - (hour * 60 + minute);
    const height = (durationMinutes / 15) * 19;

    return {
      height: `${height}px`,
      top: `${topPosition}px`
    };
  };


  return (
    <div className="w-full">
      <div className="place-items-center">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={i + 8} className="w-full hour-slot place-items-center ">
            <div className='w-full border-t'>{`${(i + 8).toString().padStart(2, '0')}:00`}</div>
            <div className='w-full border-t'>{`${(i + 8).toString().padStart(2, '0')}:15`}</div>
            <div className='w-full border-t'>{`${(i + 8).toString().padStart(2, '0')}:30`}</div>
            <div className='w-full border-t'>{`${(i + 8).toString().padStart(2, '0')}:45`}</div>
          </div>
        ))}
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="task ml-16 bg-yellow-300"
            style={getPositionStyle(tasks, index)}
          >
            <p className='pl-2 pr-2'>{task.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export { DayCalendarFull };
