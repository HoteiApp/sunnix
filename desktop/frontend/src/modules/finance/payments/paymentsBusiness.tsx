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

import { Active, PaymentsTcm } from "../../../models";
import { useTcmAllPaymentsBusiness, useTcmAddPayments } from "../../../hooks/modules/tcm";

import { PaymentTCM } from "./paymentTCM";
import { classNames } from 'primereact/utils';

interface Item {
  name: string;
  value: string;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};


const PaymentsBusiness = ({ active, relad, id }: Props) => {
  const [visiblePayments, setVisiblePayments] = useState<boolean>(false);
  const [activePaymentDate, setActivePaymentDate] = useState<string>("");

  const [activePayments, setActivePayments] = useState<number>(0);


  const { paymentsBusiness, isLoadingPaymentsBusiness, reloadPaymentsBusiness } = useTcmAllPaymentsBusiness(id);

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
  // const exportExcel = () => {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(paymentsBusiness?.payments ?? []);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: 'xlsx',
  //       type: 'array'
  //     });

  //     saveAsExcelFile(excelBuffer, 'clients');
  //   });
  // };
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
              icon={isAddingPayments ? "pi pi-spin pi-spinner" : "pi pi-refresh "}
              label="Update Payments"
              onClick={() => {
                addPayments();
                setTimeout(() => {
                  reloadTcmAllPayments();
                }, 1000);
              }}
              size='small'
              pt={{
                root: { className: 'mr-2' }
              }}
            /> */}
            {/* <Button
              icon="pi pi-file-excel"
              label="Export"
              onClick={exportExcel}
              size='small'
              pt={{
                root: { className: 'bg-secondary' }
              }}
            /> */}
          </div>
        </div>
      </Affix>
    );
  };
  const header = renderHeader();
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
  const Retroactive = (rowData) => {
    const totalHours = rowData.units_paid_retroactive * 15 / 60;
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
          {rowData.units_paid_retroactive} units
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
  };
  // ------------------
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
  const Details = (rowData) => {
    // const [checked, setChecked] = useState<boolean>(rowData.approved);
    return (
      <div className='flex justify-content-center gap-4'>
        <i
          onClick={
            () => {
              setVisiblePayments(true);
              setActivePayments(rowData.ID);
              setActivePaymentDate(rowData.date);
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

  return (
    <div className="w-full p-5 mt-10">
      {!isLoadingPaymentsBusiness ? (
        // tcmAllPayments?.payments.length || 0 > 0 ? (
        <DataTable
          value={paymentsBusiness?.payments}
          // onRowClick={onInfo}
          paginator
          rowHover
          stripedRows
          rows={10}
          loading={isLoadingPaymentsBusiness}
          dataKey="ID"
          filters={filters}
          globalFilterFields={['date']}
          header={header}
          // selectionMode="single"
          sortMode="multiple"
          emptyMessage="No customers found."
        >
          <Column field="date" header="Date" sortable />
          <Column field="hours_paid" header="Units and Hours" body={Hours} sortable />
          <Column field="paid" header="Paid to TCM" body={(rowData) => `$${rowData.paid.toFixed(2)}`} sortable className='bg-orange-100' />
          <Column field="profit" header="Business Profit" body={
            (rowData) => `$${rowData.profit.toFixed(2)} / 2 = $${(rowData.profit / 2).toFixed(2)}`
          } sortable className='bg-green-100' />

          <Column field="rent" header="Rent" body={(rowData)=>`$${rowData.rent}`}/>
          <Column field="rent" header="Pay"
            body={
              (rowData) => {
                return <div className={classNames(
                  ((rowData.profit / 2) - rowData.rent) < 0 ? 'text-red-500' : 'text-green-500',
                )}>
                  ${(rowData.profit / 2).toFixed(2)} - ${rowData.rent} = ${((rowData.profit / 2) - rowData.rent).toFixed(2)}
                </div>
              }
            }

          />
          {/* <Column field="date" header="Details" body={Details} /> */}
        </DataTable>

      ) : (
        <div>
          <Skeleton className="mb-2"></Skeleton>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
        </div>
      )}

      <Dialog
        header={`Payments ${activePaymentDate}`}
        visible={visiblePayments}
        maximizable
        style={{ width: "90vw" }}
        breakpoints={{ "960px": "90vw", "641px": "90vw" }}
        onHide={() => setVisiblePayments(false)}
      >
        {activePayments > 0 ? <PaymentTCM paymentsTcm={activePayments} relad={relad} active={active} activePaymentDate={activePaymentDate} /> : <Message text="No payments" className="w-full mt-6 bg-gray-100 h-96" />}
      </Dialog>
    </div>
  );
}
type Props = {
  active?: Active;
  relad(): void;
  id: string;
};
export { PaymentsBusiness }