import { DownloadPDFButton } from "../CreatePDFtoDiv";
import { ServiceCM } from "../../../models";
const Simply = ({ scm }: Props) => {
    return (
        <div style={{ height: "80vh", overflow: "auto" }}>
            <DownloadPDFButton elementId="content-to-pdf" icon="pi pi-file-pdf" label="Download" className="p-button-text" />
            <div id="content-to-pdf">
                SIMPLY AUTHORIZATION
            </div>
        </div>
    );
}
type Props = {
    scm: ServiceCM | undefined;
}
export { Simply };