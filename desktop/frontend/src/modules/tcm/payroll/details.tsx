import { useState } from 'react';
// -- Libs PrimeReact
import { DataTable } from 'primereact/datatable';
// -- Component
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Column } from 'primereact/column';
// import { CalculateUnits } from "../notes/utils/calculateUnits";
import { CalculateMinutes } from "../../commons/CalcultaeMinutes";
// import { VoiceRecorder } from "../../commons"
import { getPlanImageUrl } from "../../../utils";
// New structure
// import { CalculateAge, saveAsExcelFile } from "../../commons";

import { Active, PaymentsTcm, PaymentsRateRange, NotesPayments, ServiceCM } from "../../../models";
import { useTcmAllPaymentsTCMNotes } from "../../../hooks/modules/tcm";
import { ContentObserver } from "../../commons/ContentObserver";

const PayrollDetails = ({ payment, tcmPayments, ranges, scm, onContentChange }: Props) => {
  const { tcmAllPaymentsTcmNotes } = useTcmAllPaymentsTCMNotes(tcmPayments);
  const [visibleNotesPayments, setVisibleNotesPayments] = useState<boolean>(false);
  const [activeNotesPayments, setActiveNotesPayments] = useState<NotesPayments[]>([]);
  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";

  // ------------------
  const Info = (rowData) => {
    let status = "Pending";
    if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date3 !== "" && rowData.paid_date3 === rowData.paid_date) {
      status = rowData.paid3;
    } else if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date2 === rowData.paid_date) {
      status = rowData.paid2;
    } else {
      status = rowData.paid;
    }
    return (
      <div className="relative">
        <div
          className={classNames(
            'w-full text-sm',
            status === 'Denied' ? 'text-red-500' :
              status === 'Pending' ? 'text-yellow-500' :
                !rowData.retroactive && 'text-green-500'
          )}
        >
          <div
            style={{
              backgroundImage: rowData.sure_name
                ? `url(${getPlanImageUrl(rowData.sure_name)})`
                : 'none',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.2,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />
          <div className='relative z-2 flex justify-content-center gap-4 '>
            {rowData.date}
          </div>
          <div className='relative z-2 w-full text-sm'>
            {rowData.client}
          </div>
        </div>
      </div>
    );
  };
  // ------------------
  const Hours = (rowData) => {
    const totalHours = rowData.units * 15 / 60;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    let status = "Pending";
    if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date3 !== "" && rowData.paid_date3 === rowData.paid_date) {
      status = rowData.paid3;
    } else if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date2 === rowData.paid_date) {
      status = rowData.paid2;
    } else {
      status = rowData.paid;
    }
    return (
      <div className='w-full text-center'>
        <div className='flex justify-center text-center gap-4 '>
          {hours > 0 && `${hours} h `}
          {minutes > 0 && `${minutes} min`}
          {hours === 0 && minutes === 0 && '0 min'}
        </div>
        <div className={classNames(
          'w-full text-sm text-center',
          status === 'Denied' ? 'text-red-500' :
            status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
        )}
          style={{ fontSize: "10px" }}
        >
          {rowData.units} units
        </div>
      </div>
    );
  };
  // ------------------
  const Status = (rowData) => {
    let status = "Pending";
    if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date3 !== "" && rowData.paid_date3 === rowData.paid_date) {
      status = rowData.paid3;
    } else if (rowData.paid_date !== "" && rowData.paid_date2 !== "" && rowData.paid_date2 === rowData.paid_date) {
      status = rowData.paid2;
    } else {
      status = rowData.paid;
    }
    return (
      <div className='w-full'>
        <div className={classNames(
          'w-full text-sm',
          status === 'Denied' ? 'text-red-500' :
            status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
        )}>
          {status}
        </div>
      </div>
    );
  };
  // ------------------


  // ------------------
  const HoursRetroactive = (rowData) => {
    const totalHours = rowData.units * 15 / 60;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    return (
      <div className='w-full text-center'>
        <div className='flex justify-center gap-4 '>
          {hours > 0 && `${hours} h `}
          {minutes > 0 && `${minutes} min`}
          {hours === 0 && minutes === 0 && '0 min'}
          {" "} x ${rowData.rate * 4}= ${rowData.units * rowData.rate}
        </div>
        <div className='w-full text-sm text-red-500 text-center' style={{ fontSize: "10px" }}>
          {rowData.units} units
        </div>
      </div>
    );
  };
  // ------------------

  return (
    <ContentObserver onContentChange={onContentChange}>
      <div className="w-full">
        <div className="flex w-full mt-5">

          <div className={classNames(
            payment?.units_retroactive === 0 ? "w-1/2" : "w-1/3",
            ' text-center rounded border mr-5',

          )}
            style={{
              position: 'relative',
            }}
          >
            <div className='w-full flex justify-center items-center pt-10' style={{
              position: 'absolute',
              opacity: 0.1,
              zIndex: 1,
            }}>
              <img src={`${apiUrlStatic}/static/media/logo.png`} alt="logo" />
            </div>

            <div className="w-full p-2" style={{ position: 'relative', zIndex: 2 }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">PAYMENT REPORT</span>
                <span className="text-gray-800">{payment?.tcm_name}</span>
              </div>
              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Payment Date</span>
                <span className="text-gray-800">{payment?.date}</span>
              </div>
              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Active Payment (Fortnight)</span>
                <span className="text-gray-800">{payment?.fortnight.start} - {payment?.fortnight.end_second}</span>
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Firtnight Total Payment</span>
                <span className="text-green-600 font-bold">${payment && payment.paid}</span>
              </div>
              <hr className="mb-4 border-gray-300" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Total Units/Hrs</span>
                <span className="text-gray-800">
                  {payment && (payment?.units_paid + payment?.units_retroactive)} U / {payment && (payment?.hours_paid + (payment.units_retroactive / 4))} H
                </span>
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Active Payment (Units/Hours/Rate)</span>
                <span className="text-gray-800">
                  {payment?.units_paid} U / {payment?.hours_paid} H / ${payment && payment?.rate * 4}
                </span>
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Retroactive Payment (Units/Hours)</span>
                <span className="text-gray-800">
                  {payment?.units_retroactive} U / {payment && (payment?.units_retroactive / 4)} H
                </span>
              </div>
              <hr className="mb-4 border-gray-300" />

              {/* <div className="text-right text-sm text-gray-500">
                <em>Generated on {payment?.date}</em>
              </div> */}
              <b>Active payment rate</b>
              <hr className='mb-2' />
              {payment?.fixed_pay ? <div>
                Fixed payment at <b>${payment && payment?.rate * 4}</b> per hour
              </div> : <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${ranges.length || 1}, minmax(0, 1fr))`,
                }}
              >
                {ranges.map((r, index) => {
                  const isLastRange = index === ranges.length - 1;
                  const hours_from = Math.floor(r.from);
                  const minutes_from = Math.round((r.from - hours_from) * 60);
                  const hours_to = Math.floor(r.to);
                  const minutes_to = Math.round((r.to - hours_to) * 60);
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded shadow text-center bg-gray-50"
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
              </div>}
              <div className='pt-5'>
                <b>Note:</b> Retroactive notes are paid using the payment rate that was active during the week in which the service was provided.
              </div>
            </div>
          </div>

          <div
            className={classNames(
              payment?.units_retroactive === 0 ? "w-1/2" : "w-1/3",
              ' text-center rounded border mr-5',

            )}
          >
            <div className="w-full p-2" style={{ position: 'relative', zIndex: 2 }}>
              <div className="flex justify-center items-center mb-2">
                <span className="font-bold text-gray-800">ACTIVE PAYMENT</span>
              </div>
              <div style={{
                position: 'relative',
              }}>
                <div className=" items-center mb-2">
                  <div className='w-full flex'>
                    <div className='w-1/4'>
                      <span className="text-gray-800 font-bold">
                        Date
                      </span>
                    </div>
                    <div className='w-1/4'>
                      <span className="text-gray-800 font-bold">
                        Insurance
                      </span>
                    </div>

                    <div className='w-1/4'>
                      <span className="text-gray-800 font-bold">
                        Hours/Units
                      </span>
                    </div>
                    <div className='w-1/4'>
                      <span className="text-gray-800 font-bold">
                        Status
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {tcmAllPaymentsTcmNotes?.notes.map((note) => {
                return (
                  <div style={{
                    position: 'relative',
                  }}>
                    <div
                      style={{
                        backgroundImage: note.sure_name
                          ? `url(${getPlanImageUrl(note.sure_name)})`
                          : 'none',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        opacity: 0.2,
                        position: 'absolute',
                        top: 4,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0, // Change zIndex to 0
                      }}
                    />
                    <div className="relative z-1"> {/* Change zIndex to 1 */}
                      <hr className="mb-2 border-gray-300" />
                      <div className="items-center mb-2">
                        <div className='w-full flex'>
                          <div className='w-1/4'>

                            <div>{note.date}</div>
                            <div style={{ fontSize: "10px" }}>{note.client}</div>

                          </div>
                          <div className='w-1/4'>
                            <div>{note.sure}</div>
                            <div style={{ fontSize: "10px" }}>{note.sure_name}</div>
                          </div>
                          <div className='w-1/4'>
                            <span className="text-gray-800">
                              {Hours(note)}
                            </span>
                          </div>
                          <div className='w-1/4'>
                            <span className="text-gray-800">
                              {note.paid === "" || note.paid === "Pending" ?
                                (note.paid_date2 === payment?.date && note.paid2 === "" ?
                                  "Pending" :
                                  (note.paid_date3 === payment?.date && note.paid3 === "" ?
                                    "Pending" :
                                    note.paid2 || note.paid3 || "Pending")) :
                                note.paid}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}





            </div>
            {/* <DataTable
              header="Active Payments Fortnight Details"
              value={tcmAllPaymentsTcmNotes?.notes}
              rowHover
              stripedRows
              sortField="date"
              sortOrder={1} // -1 for descending order
              emptyMessage="No customers found."
            >
              <Column field="date" header="Note" body={Info} />
              <Column field="note" header="Time" sortable body={Hours} />
              <Column field="paid" header="Payment Status" sortable />
            </DataTable> */}
          </div>

          {(payment?.units_retroactive !== undefined) && payment?.units_retroactive > 0 && (
            <div className='w-1/3 text-center rounded border mr-5'>
              <div className="w-full p-2" style={{ position: 'relative', zIndex: 2 }}>
                <div className="flex justify-center items-center mb-2">
                  <span className="font-bold text-gray-800">RETROACTIVE PAYMENT</span>
                </div>
                <div style={{
                  position: 'relative',
                }}>
                  <div className=" items-center mb-2">
                    <div className='w-full flex'>
                      <div className='w-1/4'>
                        <span className="text-gray-800 font-bold">
                          Date
                        </span>
                      </div>
                      <div className='w-1/4'>
                        <span className="text-gray-800 font-bold">
                          Insurance
                        </span>
                      </div>
                      <div className='w-2/4'>
                        <span className="text-gray-800 font-bold">
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {tcmAllPaymentsTcmNotes?.retroactives?.map((note) => {
                  return (
                    <div style={{
                      position: 'relative',
                    }}>
                      <div
                        style={{
                          backgroundImage: note.sure_name
                            ? `url(${getPlanImageUrl(note.sure_name)})`
                            : 'none',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          opacity: 0.2,
                          position: 'absolute',
                          top: 4,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 0, // Change zIndex to 0
                        }}
                      />
                      <div className="relative z-1"> {/* Change zIndex to 1 */}
                        <hr className="mb-2 border-gray-300" />
                        <div className="items-center mb-2">
                          <div className='w-full flex'>
                            <div className='w-1/4'>

                              <div>{note.date}</div>
                              <div style={{ fontSize: "10px" }}>{note.client}</div>

                            </div>
                            <div className='w-1/4'>
                              <div>{note.sure}</div>
                              <div style={{ fontSize: "10px" }}>{note.sure_name}</div>
                            </div>
                            <div className='w-2/4'>
                              <span className="text-gray-800">
                                {HoursRetroactive(note)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}





              </div>
              {/* <DataTable
                  header="Active Payments Fortnight Details"
                  value={tcmAllPaymentsTcmNotes?.notes}
                  rowHover
                  stripedRows
                  sortField="date"
                  sortOrder={1} // -1 for descending order
                  emptyMessage="No customers found."
                >
                  <Column field="date" header="Note" body={Info} />
                  <Column field="note" header="Time" sortable body={Hours} />
                  <Column field="paid" header="Payment Status" sortable />
                </DataTable> */}
            </div>
          )}


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
      </div>
    </ContentObserver>

  );
}

type Props = {
  active?: Active;
  relad(): void;
  tcmPayments: number;
  payment: PaymentsTcm | undefined;
  ranges: PaymentsRateRange[];
  onContentChange: (content: string) => void;
  scm?: ServiceCM | undefined;
};

export { PayrollDetails }