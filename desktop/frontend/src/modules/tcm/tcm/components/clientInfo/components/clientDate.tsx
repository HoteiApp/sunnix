import { ClientInfo } from '../../../../../../models';

const ClientDate = ({ clientInfo }: Props) => {
    const FormarDate = (fecha) => {
        // const fecha = "2023-09-12T22:13:46.69";
        const fechaObjeto = new Date(fecha);

        const dia = fechaObjeto.getDate();
        const mes = fechaObjeto.getMonth() + 1; // Suma 1 al mes ya que los meses en JavaScript comienzan en 0
        const anio = fechaObjeto.getFullYear();

        return `${dia}/${mes}/${anio}`;
    }

    return (<div className="md:flex lg:flex w-full">
        <div className="md:flex lg:md:flex w-full border-2 border-primary">
            <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                    Client’s Name:
                </div>
                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                        {clientInfo?.client?.first_name} {clientInfo?.client?.last_name}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">
                        MR #:
                    </div>
                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                        <div className="p-inputgroup flex-1">
                            {clientInfo?.client?.id}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                <div className="grid flex-grow w-1/4 pl-5">
                    Date:
                </div>
                <div className="grid w-3/4 p-1 pl-0">
                    <div className="p-inputgroup flex-1">
                        {FormarDate(clientInfo?.client?.CreatedAt)}
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

type Props = {
    clientInfo?: ClientInfo;
}
export { ClientDate };