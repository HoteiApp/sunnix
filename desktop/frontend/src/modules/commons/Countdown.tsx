import type { CountdownProps } from 'antd';
import { Statistic } from 'antd';
import { Typography } from 'antd';
import { addYears } from 'date-fns';

const { Title } = Typography;
function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

const Countdown = ({ date, hour, minutes, seconds, size, summ }: Props) => {
  const { Countdown } = Statistic;
  
  // Convertir la fecha al formato correcto
  let formattedDate = date;
  if (date.match(/^\d{2}-\d{2}-\d{4}$/)) {
    // Si está en formato MM-DD-YYYY, convertir a YYYY-MM-DD
    const [month, day, year] = date.split("-");
    formattedDate = `${year}-${month}-${day}`;
  }

  const fechaLimite = addYears(
    new Date(`${formattedDate}T${padZero(hour)}:${padZero(minutes)}:${padZero(seconds)}`),
    summ
  );

  const fechaActual = new Date(); // Obtiene la fecha actual

  // Ajusta la fecha límite para que coincida con la hora específica
  fechaLimite.setHours(hour, minutes, seconds, 0);

  const tiempoRestante = fechaLimite.getTime() - fechaActual.getTime(); // Calcula la diferencia en milisegundos

  const tiempoRestanteEnDias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24)); // Calcula los días restantes
  const tiempoRestanteEnHoras = Math.floor(tiempoRestante / (1000 * 60 * 60)); // Calcula las horas restantes
  const tiempoRestanteEnMinutos = Math.floor(tiempoRestante / (1000 * 60)); // Calcula los minutos restantes
  const tiempoRestanteEnSegundos = Math.floor(tiempoRestante / 1000); // Calcula los segundos restantes

  // Calcula las horas, minutos y segundos restantes hasta alcanzar la hora especificada
  const horasRestantes = Math.floor(tiempoRestanteEnHoras % 24);
  const minutosRestantes = Math.floor(tiempoRestanteEnMinutos % 60);
  const segundosRestantes = Math.floor(tiempoRestanteEnSegundos % 60);

  // Modifica la variable deadline para incluir las horas, minutos y segundos restantes
  const deadline = Date.now() + (1000 * 60 * 60 * 24 * tiempoRestanteEnDias) + (1000 * 60 * 60 * horasRestantes) + (1000 * 60 * minutosRestantes) + (1000 * segundosRestantes);


  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!');
  };

  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  return <Countdown value={deadline} onFinish={onFinish} format="DD:HH:mm:ss" valueStyle={{ fontSize: size }} />
};

type Props = {
  date: string;
  hour: number;
  minutes: number;
  seconds: number;
  size: string;
  summ: number;
};

export { Countdown };
