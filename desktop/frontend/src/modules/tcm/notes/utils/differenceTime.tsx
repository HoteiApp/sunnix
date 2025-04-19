import moment from 'moment';
import { Nullable } from "primereact/ts-helpers";

const TimeDifference = ({ firstHour, secondHour }: Props) => {
    // Comprueba si firstHour y secondHour son nulos antes de usarlos
    let hora1 = firstHour ? moment(firstHour).format("hh:mm A") : null;
    let hora2 = secondHour ? moment(secondHour).format("hh:mm A") : null;

    if (hora1 && hora2) {
        let diferencia = moment.duration(moment(hora2, "hh:mm A").diff(moment(hora1, "hh:mm A")));

        let minutos = diferencia.asMinutes();
        return <div>{minutos} minutes</div>;
    } else {
        return <div>N/A</div>;
    }

}
    type Props = {
        firstHour?: Nullable<Date>;
        secondHour?: Nullable<Date>;
    }

    export { TimeDifference }