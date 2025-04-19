
const CalculateAge = ({ dob }: Props) => {
  const date = new Date();
  // Separa la cadena de fecha en día, mes y año
  const partesFecha = dob.split('/');
  const mes = parseInt(partesFecha[0], 10) - 1; // Resta 1 al mes ya que los meses en JavaScript comienzan en 0
  const day = parseInt(partesFecha[1], 10);
  const year = parseInt(partesFecha[2], 10);

  // Crea un objeto de fecha válido utilizando los valores separados
  const birthDate = new Date(year, mes, day);

  // Calcula la diferencia de tiempo en milisegundos
  const differenceTime = date.getTime() - birthDate.getTime();

  // Calcula la edad en años
  const age = Math.floor(differenceTime / (365.25 * 24 * 60 * 60 * 1000));
  return age;
};

type Props = {
  dob: string;
};

export { CalculateAge };
