import { useState, useEffect, useRef } from 'react';
// -- Libs PrimeReact
import { SelectButton } from 'primereact/selectbutton';
import { Skeleton } from 'primereact/skeleton';
import { Message } from 'primereact/message';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';

// -- Component
import { Dialog } from "primereact/dialog";

import { classNames } from "primereact/utils";

import { Column } from 'primereact/column';

// New structure
import { CalculateAge, saveAsExcelFile } from "../../commons";

import { Active, PaymentsTcm, NotesPayments } from "../../../models";
import { useTcmAllPaymentsTCMNotes } from "../../../hooks/modules/tcm";


type Props = {
  active?: Active;
  relad(): void;
  tcmPayments: number;
  activePaymentDate: string;
};



const PaymentNotesTCM = ({ active, relad, tcmPayments, activePaymentDate }: Props) => {
  const { tcmAllPaymentsTcmNotes, reloadTcmAllPaymentsTcmNotes, isLoadingTcmAllPaymentsTcmNotes } = useTcmAllPaymentsTCMNotes(tcmPayments);
  const [visibleNotesPayments, setVisibleNotesPayments] = useState<boolean>(false);
  const [activeNotesPayments, setActiveNotesPayments] = useState<NotesPayments[]>([]);
  

  // ------------------
  const PaymentStatus = (rowData) => {
    let paymentStatus = 'Pending';

    if (rowData.paid_date === activePaymentDate) {
      paymentStatus = (rowData.paid )|| 'Pending';
    } else if (rowData.paid_date2 === activePaymentDate) {
      paymentStatus = rowData.paid2 || 'Pending';
    } else if (rowData.ppaid_date3 === activePaymentDate) {
      paymentStatus = rowData.paid3 || 'Pending';
    }

    
    return (
      <div className='justify-content-center w-full flex'>
        <div className={classNames('w-1/3', paymentStatus === 'Pending' && 'text-red-500')}>
          {paymentStatus}
        </div>
        <div className={classNames('w-2/3 text-right')}>
          {rowData.units / 4 } x {rowData.rate * 4} =  ${(rowData.units / 4) * (rowData.rate * 4)}
        </div>
      </div>
    );
  };
  // ------------------

  const Units = (rowData) => {
    const totalHours = rowData.units * 15 / 60;
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
          <b style={{ color: 'red', fontSize: '12px' }}>{rowData.units} units</b>
        </div>
      </div>
    );
  };
  // ------------------


  return (
    <div className="w-full flex">
      <div className='w-1/2 p-2'>
        {tcmAllPaymentsTcmNotes?.notes.length || 0 > 0 ? (
          <DataTable
            header="Payment notes"
            value={tcmAllPaymentsTcmNotes?.notes}
            // onRowClick={onInfo}
            paginator
            rowHover
            stripedRows
            rows={5}
            dataKey="ID"
            
            // footer={<div>
            //   asasasasasa
            // </div>}
            globalFilterFields={['date']}
            sortMode="multiple"
            emptyMessage="No customers found."
          >
            {/* <Column field="note" header="Note" sortable /> */}
            <Column field="date" header="Date" sortable />
            <Column field="units" header="Units" body={Units} />
            <Column field="paid" header="Payment Status" body={PaymentStatus} />
          </DataTable>
        ) : (
          <Message text="No Notes payments" className="w-full mt-6 bg-gray-100 h-96" />
        )}
      </div>
      <div className='w-1/2 p-2'>
        {tcmAllPaymentsTcmNotes?.retroactives?.length || 0 > 0 ? (
          <DataTable
            header="Retroactive"
            value={tcmAllPaymentsTcmNotes?.retroactives}
            // onRowClick={onInfo}
            paginator
            rowHover
            stripedRows
            rows={5}
            dataKey="ID"
            sortMode="multiple"
            emptyMessage="No customers found."
          >
            {/* <Column field="note" header="Note" sortable /> */}
            <Column field="date" header="Date" sortable />
            <Column field="units" header="Units" body={Units} />
            <Column field="paid" header="Payment Status" body={PaymentStatus} />
          </DataTable>
        ) : (
          <Message text="No Notes payments" className="w-full mt-6 bg-gray-100 h-96" />
        )}
      </div>

      <Dialog
        header="NotesPayments"
        visible={visibleNotesPayments}
        maximizable
        style={{ width: "80vw" }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setVisibleNotesPayments(false)}
      >
        {activeNotesPayments.length}
      </Dialog>
    </div>
  );
}

export { PaymentNotesTCM }