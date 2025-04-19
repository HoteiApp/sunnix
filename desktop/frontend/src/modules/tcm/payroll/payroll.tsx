import { useState, useEffect, useRef } from 'react';
// -- Libs PrimeReact
import { SelectButton } from 'primereact/selectbutton';
import { Skeleton } from 'primereact/skeleton';
import { Message } from 'primereact/message';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';

// -- Component
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Badge } from 'primereact/badge';
import { Affix } from 'antd';

import { Column } from 'primereact/column';
// import { CalculateUnits } from "../notes/utils/calculateUnits";

// New structure

import { CalculateAge, saveAsExcelFile } from "../../commons";

import { Active, PaymentsTcm, PaymentsRateRange, ServiceCM} from "../../../models";
import { useTcmAllPayments, useTcmMyPayments } from "../../../hooks/modules/tcm";
import { useCreatePdf } from "../../profile/hooks/core/coreCreatePDF";
import { PayrollDetails } from "./details";

interface Item {
  name: string;
  value: string;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};


const Payroll = ({ active, relad }: Props) => {
  const { createPDF, isUpdatingNewClient } = useCreatePdf();
  const [visiblePayments, setVisiblePayments] = useState<boolean>(false);
  const [activePaymentDate, setActivePaymentDate] = useState<string>("");
  const [activePayments, setActivePayments] = useState<number>(0);
  const [activePayment, setActivePayment] = useState<PaymentsTcm | undefined>(undefined);
  const [activePaymentsRange, setActivePaymentsRange] = useState<PaymentsRateRange[]>([]);

  const [content, setContent] = useState<string>('');

  const { tcmMyPayments, isLoadingTcmMyPayments } = useTcmMyPayments();
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(tcmMyPayments?.paymentsTcm ?? []);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'myPayments');
    });
  };
  const renderHeader = () => {
    return (
      <Affix offsetTop={44}>
        <div className="flex justify-between items-center w-full" style={{ backgroundColor: "#F8F9FA" }}>

          <div className="flex w-1/4 items-center flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
              <i className="pi pi-search ml-2" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search"
                autoFocus
                pt={{
                  root: { className: 'border-gray-400 p-3 pl-8' }
                }}
              />
            </span>

          </div>
          <div className="flex justify-end">

            {/* <Button
              icon="pi pi-refresh"
              label="Update Payments"
              //   onClick={
              //     () => addPayments()
              //   }
              size='small'
              pt={{
                root: { className: 'mr-2' }
              }}
            /> */}
            <Button
              icon="pi pi-file-excel"
              label="Export"
              onClick={exportExcel}
              size='small'
              pt={{
                root: { className: 'bg-secondary' }
              }}
            />
          </div>
        </div>
      </Affix>
    );
  };
  const header = renderHeader();
  // ------------------
  // ------------------
  const Retroactive = (rowData) => {
    const totalHours = rowData.units_retroactive * 15 / 60;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    return (
      <div className='w-full'>
        <div className='flex justify-content-center gap-4 '>
          {hours > 0 && `${hours} h `}
          {minutes > 0 && `${minutes} min`}
          {hours === 0 && minutes === 0 && '0 min'}
        </div>
        <div className='w-full text-sm text-red-500'>
          {rowData.units_retroactive} units
        </div>
      </div>
    );
  };
  // ------------------
  const Hours = (rowData) => {
    const totalHours = rowData.units_paid * 15 / 60;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    return (
      <div className='w-full'>
        <div className='flex justify-content-center gap-4 '>
          {hours > 0 && `${hours} h `}
          {minutes > 0 && `${minutes} min`}
          {hours === 0 && minutes === 0 && '0 min'}
        </div>
        <div className='w-full text-sm text-red-500'>
          {rowData.units_paid} units
        </div>
      </div>
    );
  };
  // ------------------

  const Details = (rowData) => {
    // const [checked, setChecked] = useState<boolean>(rowData.approved);
    return (
      <div className='flex justify-content-center gap-4'>
        <i
          onClick={
            () => {
              setVisiblePayments(true);
              setActivePayments(rowData.id);
              setActivePaymentDate(rowData.date);
              setActivePaymentsRange(rowData.range);
              setActivePayment(rowData);
            }}
          className="pi pi-list p-overlay-badge cursor-pointer" style={{ fontSize: '2rem' }}>
          <Badge
            severity="info"
            pt={{
              root: { className: 'cursor-pointer' }
            }}
          />
        </i>
      </div>
    );
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  const headerDialogDetails = (title) => {
    const renderIcons = () => (
      <div className="w-2/3 text-right">
        <i
          className="pi pi-file-pdf hover:text-orange-500 cursor-pointer mr-2"
          onClick={() => {
            createPDF({
              htmlDiv: content,
              page_size: "A4",
              orientation: "horizontal"
            });
          }}
        />
      </div>
    );
    return (
      <div className="flex w-full place-items-center">
        <div className="flex w-1/3">
          <div className="pl-2 pr-2">
            <b>{title}</b>
          </div>
        </div>
        {renderIcons()}
      </div>
    );
  };
  return (
    <div className="w-full p-5 mt-10">
      {!isLoadingTcmMyPayments ? (
        // tcmMyPayments?.paymentsTcm.length || 0 > 0 ? (
        <DataTable
          value={tcmMyPayments?.paymentsTcm}
          paginator
          rowHover
          stripedRows
          rows={10}
          loading={isLoadingTcmMyPayments}
          dataKey="id"
          filters={filters}
          globalFilterFields={['date']}
          header={header}
          sortField="id"
          sortOrder={1} // -1 for descending order
          sortMode="multiple"
          emptyMessage="No customers found."
        >
          <Column field="date" header="Date" sortable />
          <Column field="hours_paid" header="Hours" body={Hours} sortable />
          <Column field="units_paid" header="Retroactive" body={Retroactive} />
          <Column field="vacation" header="Vacation" body={(rowData) => `$${rowData.vacation.toFixed(2)}`} sortable />
          <Column field="paid" header="Collect" body={(rowData) => `$${rowData.paid.toFixed(2)}`} sortable className='bg-orange-100' />
          <Column field="date" header="Details" body={Details} />
        </DataTable>
        // ) : (
        //   <Message text="No payments" className="w-full mt-6 bg-gray-100 h-96" />
        // )
      ) : (
        <div>
          <Skeleton className="mb-2"></Skeleton>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
        </div>
      )}

      <Dialog
        header={headerDialogDetails(`Payment ${activePaymentDate}`)}
        visible={visiblePayments}
        maximizable
        style={{ width: "90vw" }}
        breakpoints={{ "960px": "90vw", "641px": "90vw" }}
        onHide={() => setVisiblePayments(false)}
       
      >
        {activePayments > 0 ? <PayrollDetails tcmPayments={activePayments} payment={activePayment} ranges={activePaymentsRange} relad={relad} active={active} onContentChange={handleContentChange} /> : <Message text="No payments" className="w-full mt-6 bg-gray-100 h-96" />}
      </Dialog>
    </div>
  );
}
type Props = {
  active?: Active;
  relad(): void;
  scm?: ServiceCM | undefined;

};
export { Payroll }