/*  Como utilizar el complemento
    // Importar de Commons
    import {DisabledDatePicker} from '../DisabledDatePicker';
    // variables necesarias
    const myDatesToDisable = ["04/12/2024", "04/13/2024", "04/15/2024", "04/16/2024"];
    const myStartDate = '04/10/2024';
    const myEndDate = '04/20/2024';

    // Llamar el componente
    <DisabledDatePicker
      value={notes.date}
      datesToDisable={myDatesToDisable}
      startDate={myStartDate}
      endDate={myEndDate}
      format="MM/DD/YYYY"
      onChange={(date, dateString) => {
        handleChangeNotes("date", dateString);
      }}
    />
*/

import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangePickerProps } from 'antd/lib/date-picker';

interface DisabledDateArgs {
  datesToDisable: string[];
  startDate: string;
  endDate: string;
}

interface DisabledDatePickerProps {
  datesToDisable: string[];
  startDate: string;
  endDate: string;
  format: string;
  value: string;
  onChange: (date: Dayjs | null, dateString: string | string[]) => void;
}

const DisabledDatePicker: React.FC<DisabledDatePickerProps> = ({
  datesToDisable,
  startDate,
  endDate,
  format,
  value,
  onChange,
}) => {
  const disabledDate = ({
    datesToDisable,
    startDate,
    endDate,
  }: DisabledDateArgs): RangePickerProps['disabledDate'] => {
    const startDay = dayjs(startDate);
    const endDay = dayjs(endDate);

    return (current: Dayjs) => {
      return (
        current &&
        (current < startDay ||
          current > endDay ||
          datesToDisable.includes(current.format('MM/DD/YYYY')))
      );
    };
  };

  let formattedValue: Dayjs | undefined;

  // Verifica si el valor es una cadena de texto válida y no está vacía
  if (value && dayjs(value, format).isValid()) {
    formattedValue = dayjs(value, format);
  } else {
    // Maneja el caso de una fecha inválida o cadena vacía
    formattedValue = undefined; // O establece una fecha por defecto si es necesario
  }

  return (
    <DatePicker
      disabledDate={disabledDate({ datesToDisable, startDate, endDate })}
      format={format}
      value={formattedValue}
      defaultPickerValue={dayjs(startDate)}
      onChange={(date, dateString) => {
        // Llama a tu función 'onChange' con la cadena de fecha
        onChange(date, dateString);
      }}
      style={{ width: "100%", backgroundColor: 'transparent', border: 0 }}
      popupStyle={{ zIndex: 100000 }}
    />
  );
};

export { DisabledDatePicker };