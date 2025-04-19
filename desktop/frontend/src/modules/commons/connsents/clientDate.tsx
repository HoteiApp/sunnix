import { ServiceCM } from '../../../models';

const ClientDate = ({ mr, data, lang }: Props) => {
    const FormatDate = (fecha) => {
        // const fecha = "2023-09-12T22:13:46.69";
        const fechaObjeto = new Date(fecha);

        const dia = fechaObjeto.getDate();
        const mes = fechaObjeto.getMonth() + 1; // Suma 1 al mes ya que los meses en JavaScript comienzan en 0
        const anio = fechaObjeto.getFullYear();

        return `${mes}/${dia}/${anio}`;
    }

    return (<div className="md:flex lg:flex w-full">
        <div className="md:flex lg:md:flex w-full">
            <div className="flex w-full md:w-3/5 lg:w-3/5  place-items-center">

                <b className='pr-5'>{lang === "English" ? ("Client’s Name") : ("Nombre del cliente")}:</b>
                {data?.Demografic.first_name} {data?.Demografic.last_name}
            </div>
            <div className="w-full md:w-1/5 lg:w-1/5 ">
                <b className='pr-5'> MR #:</b>{mr}
            </div>
            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center text-right">
                <b className='pr-5'> {lang === "English" ? ("Date") : ("Fecha")}:</b>{data?.doa}
            </div>
        </div>
    </div>);
};

type Props = {
    data?: ServiceCM;
    lang: string;
    mr: number;
}
export { ClientDate };