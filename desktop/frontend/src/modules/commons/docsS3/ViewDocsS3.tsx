import { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { ScrollTop } from 'primereact/scrolltop';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
// New Struct
import { Active, ServiceCM, UrlDocsS3 } from '../../../models';
import { PdfViewer } from "../ViewPDF"

import { useDeleteS3Object } from "../../profile/hooks";

const ViewDocsS3 = ({ active, scm, relad, visible, setVisible, header, listDocsS3 }: Props) => {

    // Hooks
    const { deleteS3object, isUpdatingDeleteS3object } = useDeleteS3Object(relad);
    // Variables
    const [date, setDate] = useState<string>('');
    const [viewDoc, setViewDoc] = useState<boolean>(false);
    const [urlDoc, setUrlDoc] = useState<string>('');

    // Funtions
    const formatKey = (key: string) => {
        const parts = key.split('/');
        const fileName = parts[parts.length - 1];
        const datePart = fileName.split('.')[0];
        const formattedDate = `${datePart.slice(0, 2)}/${datePart.slice(2, 4)}/${datePart.slice(4)}`;
        return formattedDate;
    }
    // ---
    const toast = useRef<Toast>(null);
        const reject = () => {
            toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'The operation has been cancelled', life: 3000 });
        };
     const confirm = (position, onaccept, text, text1, ico) => {
            confirmDialog({
                header: text,
                message: text1,
                icon: ico,
                position,
                accept: () => {
                    onaccept();
                    setVisible(false);
                },
                reject
            });
        };

    return (
        <Dialog
            header={header}
            visible={visible}
            resizable
            modal={false}
            style={{
                width: "40vw",
            }}
            breakpoints={{ "960px": "70vw", "641px": "70vw" }}
            onHide={() => setVisible(false)}
        >
            <div className="w-full p-0 " style={{ height: '35vh', 'overflow': 'auto' }}>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDocsS3.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center"><b>{formatKey(item.Key)}</b></td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                                        onClick={() => {
                                            setDate(formatKey(item.Key));
                                            setViewDoc(true);
                                            setUrlDoc(item.URL);
                                        }}
                                    >
                                        <i className='pi pi-eye mr-2' /> View
                                    </button>
                                    <a href={item.URL} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <i className='pi pi-download mr-2' /> Download
                                        </button>
                                    </a>
                                    <button
                                        className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
                                        onClick={() => {
                                            console.log(item.Key);
                                            confirm(
                                                'bottom-right',
                                                () => {
                                                    deleteS3object({ // Aquí pasamos una función anónima que ejecuta deleteS3object
                                                        key: item.Key,
                                                    });
                                                },
                                                "Warning",
                                                "Are you sure you want to delete the file?",
                                                "pi pi-exclamation-triangle",
                                            )
                                        }}
                                    >
                                        <i className='pi pi-trash mr-2' /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            <Dialog
                header={date}
                visible={viewDoc}
                resizable
                modal={false}
                style={{
                    width: "60vw",
                }}
                breakpoints={{ "960px": "70vw", "641px": "70vw" }}
                onHide={() => setViewDoc(false)}
            >
                {urlDoc ? <PdfViewer fileUrl={urlDoc} /> : <p>Cargando...</p>}
            </Dialog>
            <ScrollTop
                target="parent"
                threshold={100}
                className="custom-scrolltop"
                icon="pi pi-arrow-up"
            />
            <Toast ref={toast} />
            <ConfirmDialog />

        </Dialog>
    );
}

type Props = {
    relad(): void;
    active?: Active
    scm?: ServiceCM;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    header: string;
    listDocsS3: UrlDocsS3[];
}
export { ViewDocsS3 };