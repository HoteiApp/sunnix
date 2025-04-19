import { useState } from 'react';
// -- Libs PrimeReact

import { Message } from 'primereact/message';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';

// -- Component
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Badge } from 'primereact/badge';
import { MeterGroup } from 'primereact/metergroup';
import { Column } from 'primereact/column';

import { PaymentNotesTCM } from "./paymentTCMNotes";
import { PayrollDetails } from "../../tcm/payroll/details";
// New structure
import { saveAsExcelFile } from "../../commons";

import { Active } from "../../../models";
import { useTcmAllPaymentsTCM } from "../../../hooks/modules/tcm";
import { useCreatePdf } from "../../profile/hooks/core/coreCreatePDF";


type Props = {
  active?: Active;
  relad(): void;
  paymentsTcm: number;
  activePaymentDate: string;
};

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};


const PaymentTCM = ({ active, relad, paymentsTcm, activePaymentDate }: Props) => {
  const { createPDF, isUpdatingNewClient } = useCreatePdf();
  const { tcmAllPaymentsTcm } = useTcmAllPaymentsTCM(paymentsTcm);



  const [visibleNotesPayments, setVisibleNotesPayments] = useState<boolean>(false);
  const [activeTcmPayments, setActiveTcmPayments] = useState<number>(0);
  const [activeTcmName, setActiveTcmName] = useState<string>("");
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const [content, setContent] = useState<string>('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

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
      const worksheet = xlsx.utils.json_to_sheet(tcmAllPaymentsTcm?.paymentsTcm ?? []);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'PaymentsTCM');
    });
  };
  const renderHeader = () => {
    return (
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
        <div className="flex w-2/3">

          {/* <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${tcmAllPaymentsTcm?.ranges.length || 1}, minmax(0, 1fr))`,
            }}
          >
            {tcmAllPaymentsTcm?.ranges.map((r, index) => {
              const isLastRange = index === tcmAllPaymentsTcm.ranges.length - 1;
              const hours_from = Math.floor(r.from);
              const minutes_from = Math.round((r.from - hours_from) * 60);
              const hours_to = Math.floor(r.to);
              const minutes_to = Math.round((r.to - hours_to) * 60);

              return (
                <div
                  key={index}
                  className="p-4 border rounded shadow text-center bg-orange-50"
                >
                  <div className="text-lg font-bold text-gray-700">
                    {isLastRange ? (
                      <>
                        +{hours_from}h{minutes_from > 0 && `${minutes_from}m`}
                      </>
                    ) : (
                      <>
                        {hours_from}h{minutes_from > 0 && `${minutes_from}m`} <i className="pi pi-arrows-h" /> {hours_to}h{minutes_to > 0 && `${minutes_to}m`}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isLastRange ? "Starting from this hour" : "Range of hours"}
                  </div>
                  <div className="mt-2 text-md text-green-600 font-semibold">
                    ${r.rate} / hour
                  </div>
                </div>
              );
            })}

          </div> */}



        </div>
        <div className="flex justify-end">
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
    );
  };
  const header = renderHeader();
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
          <b style={{ color: 'red', fontSize: '12px' }}>{rowData.units_retroactive} units</b>
        </div>
      </div>
    );
  };
  // ------------------
  const PayMethod = (rowData) => {


    return (
      <div className='w-full'>
        <div className='flex justify-content-center gap-4 '>
          {rowData.fixed_pay ? "Fixed" : "By Rank"}
        </div>
        <div className='w-full text-sm text-red-500'>
          <b style={{ color: 'red', fontSize: '12px' }}>${rowData.rate * 4} x Hour </b>
        </div>
      </div>
    );
  };
  // ------------------
  const ColUnits = (rowData) => {
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
          <b style={{ color: 'red', fontSize: '12px' }}>{rowData.units_paid} of {rowData.units} units</b>
        </div>
      </div>
    );
  };
  // ------------------
  const Visible = (rowData) => {
    const [checked, setChecked] = useState<boolean>(rowData.visible);
    return (
      <div className='flex justify-content-center gap-4'>
        <InputSwitch
          checked={checked}
          onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)}
        />
      </div>
    );
  };// ------------------
  const Approved = (rowData) => {
    const [checked, setChecked] = useState<boolean>(rowData.approved);
    return (
      <div className='flex justify-content-center gap-4'>
        <InputSwitch
          checked={checked}
          onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)}
        />
      </div>
    );
  };
  const Notes = (rowData) => {
    // const [checked, setChecked] = useState<boolean>(rowData.approved);
    return (
      <div className='flex justify-content-center gap-4'>
        <i
          onClick={
            () => {
              setVisibleNotesPayments(true);
              setActiveTcmPayments(rowData.id);
              setActiveTcmName(rowData.tcm_name);
            }}
          className="pi pi-list p-overlay-badge cursor-pointer" style={{ fontSize: '2rem' }}>
          <Badge
            // value={rowData.NotesPayments.length}
            severity="info"
            pt={{
              root: { className: 'cursor-pointer' }
            }}
          />
        </i>
      </div>
    );
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
    <div className="w-full">
      {tcmAllPaymentsTcm?.paymentsTcm.length && tcmAllPaymentsTcm?.paymentsTcm.length > 0 ? (
        <DataTable
          value={tcmAllPaymentsTcm?.paymentsTcm}
          // onRowClick={onInfo}
          paginator
          rowHover
          stripedRows
          rows={10}
          dataKey="id"
          filters={filters}
          globalFilterFields={['tcm_name', 'paid', 'remaining_rate', 'profit']}
          header={header}
          // selectionMode="single"
          sortMode="multiple"
          emptyMessage="No customers found."
        >
          <Column field="tcm_name" header="Employee Name" sortable />
          <Column field="units_paid" header="Units and Hours" body={ColUnits} sortable />
          <Column field="units_retroactive" header="Retroactive" body={Retroactive} />
          <Column field="fixed_pay" header="Payment method" body={PayMethod} />
          <Column field="paid" header="Total" body={(rowData) => `$${rowData.paid.toFixed(2)}`} sortable className='bg-orange-100' />
          <Column field="profit" header="Profit" body={(rowData) => `$${rowData.profit.toFixed(2)}`} sortable className='bg-green-100' />
          <Column field="id" header="Details" body={Notes} />
          {/* <Column field="id" header="Visible" body={Visible} /> */}
          {/* <Column field="id" header="Approved" body={Approved} /> */}
          {/* <Column field="id" header="Liquidated" body={Approved} /> */}
        </DataTable>
      ) : (
        <Message text="No TCM payments" className="w-full mt-6 bg-gray-100 h-96" />
      )}
      <Dialog
        header={headerDialogDetails(`Payment ${activePaymentDate}`)}
        visible={visibleNotesPayments}
        maximizable
        style={{ width: "90vw" }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setVisibleNotesPayments(false)}
      >
        {/* <PaymentNotesTCM tcmPayments={activeTcmPayments} active={active} relad={relad} activePaymentDate={activePaymentDate} /> */}
        {activeTcmPayments > 0 && <PayrollDetails
          tcmPayments={activeTcmPayments}
          payment={tcmAllPaymentsTcm?.paymentsTcm.find(p => p.id === activeTcmPayments)}
          ranges={tcmAllPaymentsTcm?.ranges ?? []}
          relad={relad}
          active={active}
          onContentChange={handleContentChange}
        />}
      </Dialog>
    </div>
  );
}

export { PaymentTCM }