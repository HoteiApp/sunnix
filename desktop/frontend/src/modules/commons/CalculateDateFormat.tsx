import { format, addMonths, isValid } from 'date-fns';

const CalculateDateFormat = ({ date, monthsLater }: Props): string => {
  let formattedDate = ''; // Valor predeterminado si la fecha no es válida

  const parsedDate = new Date(date);

  // Verificar si la fecha es válida antes de realizar cálculos
  if (isValid(parsedDate)) {
    const dateSixMonthsLater = addMonths(parsedDate, monthsLater);
    formattedDate = format(dateSixMonthsLater, 'MM/dd/yyyy'); // Formatear la fecha válida
  }

  return formattedDate;
};

type Props = {
  date: string;
  monthsLater: number;
};

export { CalculateDateFormat };
