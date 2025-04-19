import { Button } from 'primereact/button';
import { saveAsExcelFile } from '../../commons'
type ExportExcelProps = {
    exportData: any[];
    fileName: string;
};

const ExportExcelButton: React.FC<ExportExcelProps> = ({ exportData, fileName }) => {
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exportData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, fileName);
        });
    };

    return (
        <Button
            icon="pi pi-file-excel"
            label="Export to Excel"
            onClick={exportExcel}
            size='small'
            pt={{
                root: { className: 'bg-primary'  }
            }}
        />
    );
};

export { ExportExcelButton };