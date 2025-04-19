import moment from 'moment';

const CalculateMinutes = ({ firstHour, secondHour }: Props) => {
    // Asegúrate de que ambos argumentos están definidos y no son nulos
    // console.log(firstHour);
    if (!firstHour || !secondHour) {
        return 0; // O maneja este caso como creas conveniente
    }

    // Usa el formato de 24 horas si es necesario
    let hora1 = moment(firstHour, "hh:mm a");
    let hora2 = moment(secondHour, "hh:mm a");

    // Calcula la diferencia
    let diferencia = moment.duration(hora2.diff(hora1));

    // Obtiene los minutos
    let minutos = diferencia.asMinutes();
    return minutos;
}

type Props = {
    firstHour?: string;
    secondHour?: string;
}

export { CalculateMinutes }
