import { Tag } from 'primereact/tag';
// import 'primeicons/primeicons.css';
export const Legend = () => {
    return (
        <div className="flex w-full p-2 place-items-center">
            <i className="pi pi-stop-circle" style={{ color: '#8aeac0' }}></i>&nbsp;SP &nbsp;&nbsp;
            <i className="pi pi-stop-circle" style={{ color: '#ff6e00' }}></i>&nbsp;Addendums SP &nbsp;&nbsp;
            <i className="pi pi-stop-circle" style={{ color: '#6dbff2' }}></i>&nbsp;SPR &nbsp;&nbsp;
            <i className="pi pi-stop-circle" style={{ color: '#bf60f2' }}></i>&nbsp;Addendums SPR
        </div>
    )
}