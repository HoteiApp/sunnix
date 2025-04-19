import moment from 'moment';
import { ClientNotes } from "../../../../models"

const CalculateOverlap = ({ timeInOut, newTime, after, allNotes, whatField }: Props) => {

    let overlap = false; // Variable para almacenar si hay superposición
    // Convierte las cadenas a objetos moment para la comparación
    let momentNewTime = moment(newTime, "hh:mm a");
    // Y suponiendo que 'allNotes' es tu objeto que contiene un arreglo de notas
    let highestTime = moment('00:00 am', "hh:mm a"); // Inicializar con una hora baja

    allNotes?.day_notes?.forEach((note) => {
        // Convertir las horas a objetos de fecha para poder compararlas
        let timeIn = moment(note.timeIn, "hh:mm a");
        let timeOut = moment(note.timeOut, "hh:mm a");
        let timeIn_2 = moment(note.timeIn_2, "hh:mm a");
        let timeOut_2 = moment(note.timeOut_2, "hh:mm a");
        let timeIn_3 = moment(note.timeIn_3, "hh:mm a");
        let timeOut_3 = moment(note.timeOut_3, "hh:mm a");

        // Verificar si la hora específica está entre la hora de inicio y fin de la primera intervencion de la nota
        if (momentNewTime >= timeIn && momentNewTime <= timeOut) {
            // console.log(`La hora ${newTime} está entre ${note.timeIn} y ${note.timeOut}.`);
            overlap = true; // Indicar que hay superposición
        } else {
            // Verificar si la hora específica está entre la hora de inicio y fin de la segunda intervencion de la nota
            if (momentNewTime >= timeIn_2 && momentNewTime <= timeOut_2) {
                // console.log(`La hora ${newTime} está entre ${note.timeIn_2} y ${note.timeOut_2}.`);
                overlap = true; // Indicar que hay superposición
            } else {
                // Verificar si la hora específica está entre la hora de inicio y fin de la segunda intervencion de la nota
                if (momentNewTime >= timeIn_3 && momentNewTime <= timeOut_3) {
                    // console.log(`La hora ${newTime} está entre ${note.timeIn_3} y ${note.timeOut_3}.`);
                    overlap = true; // Indicar que hay superposición
                }
            }
        }

        // Comparar y actualizar la hora más alta
        [timeIn, timeOut, timeIn_2, timeOut_2, timeIn_3, timeOut_3].forEach(time => {
            if (time.isAfter(highestTime)) {
                highestTime = time;
            }
        });
    });

    if (overlap) {
        // TODO: Hacer comprovacion para saber si no ahi horas guardadas luego de la fecha
        if (whatField === "timeIn" || whatField === "timeIn_2" || whatField === "timeIn_3") {
            let timeReturn = highestTime.add(moment.duration(15, "minutes"));
            return { overlap: true, time: timeReturn.format("hh:mm a") }; // Retornar la hora mas alta agregando 15 minutos
        }
        if (whatField === "timeOut" || whatField === "timeOut_2" || whatField === "timeOut_3") {
            let momentTimeInOut = moment(timeInOut, "hh:mm a");
            let timeReturn = momentTimeInOut.add(after);
            console.log(timeReturn.format("hh:mm a"));
            return { overlap: true, time: timeReturn.format("hh:mm a") }; // Retornar la hora mas alta agregando 15 minutos
        }

    }

    // En caso de que venga "" es porque es el primer valor de la intervencion
    if (timeInOut !== "") {
        let momentTimeInOut = moment(timeInOut, "hh:mm a");
        // Compara los objetos moment
        if (momentNewTime.isAfter(momentTimeInOut.add(after))) {
            // Si newTime es despues de timeInOut + el tiempo anadido, devuelve timeIn
            return { overlap: false, time: newTime };
        } else {
            // De lo contrario, devuelve newOut modificado con el tiempo anadido
            return { overlap: false, time: momentTimeInOut.format("hh:mm a") };
        }
    } else {
        return { overlap: false, time: newTime };
    }
}
type Props = {
    allNotes?: ClientNotes;
    timeInOut: string;
    newTime: string;
    after: moment.Duration;
    whatField: string;
}

export { CalculateOverlap }
