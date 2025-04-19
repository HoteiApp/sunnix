import React, { useState, useEffect, useRef } from 'react';

// -- Primereact Libs
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { ConfigureSupervisios, LisTCM } from '../../../commons';
import { RenderText } from "../../../commons";
import { QAClients } from "../qa/qaClients";
// import { ClientInfo } from './components'
import { Affix } from 'antd';
import { classNames } from "primereact/utils";

// -- New Struct
import { Active, TcmLits, Client } from '../../../../models';
import { useTcmMyTcm } from '../../../../hooks/modules/tcm/';


const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    representative: { value: null, matchMode: FilterMatchMode.IN },

    status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const SupTCM = ({ active, relad }: Props) => {
    const { myTcm, isLoadingMyTcms, reloadMyTcms } = useTcmMyTcm();

    const [show, setShow] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    // const [tcms, setTCMS] = useState<SupTCMStruct[] | null>([]);
    const [tcmSelected, setTcmSelected] = useState<TcmLits>();
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [selectedTcmName, setSelectedTcmName] = useState<string>("");
    const [selectedClientList, setSelectedClientList] = useState<Client[] | undefined>(undefined);


    useEffect(() => {
        // setTCMS(myTcms?.tcms ?? []);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        // @ts-ignore
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <Affix offsetTop={44}>
                <div className="flex justify-between items-center w-full" style={{ backgroundColor: "#F8F9FA" }}>

                    <div className="flex w-1/4 items-center flex-wrap justify-content-center gap-3">

                    </div>
                    <div className="flex justify-end">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Search"
                                autoFocus
                                pt={{
                                    root: { className: 'border-gray-400 p-3 pl-8 bg-transparent' }
                                }}
                            />
                        </span>
                    </div>
                </div>
            </Affix>
        );
    };

    const Supervisons = (data) => {
        return (
            <div className="w-full flex justify-content-end text-center">
                <div className='text-center'>
                    <i
                        className={classNames("scm p-overlay-badge pi pi-file-check")}
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        onClick={() => {
                            setTcmSelected(data);
                            setShow(true);
                        }}
                    >
                        {/* <Badge
                            className="p-0 m-0"
                            value={1}
                            severity={1 > 0 ? "success" : "warning"}
                        /> */}
                    </i>
                </div>
            </div>
        );
    };

    const Clients = (data) => {
        return (
            <div className="flex justify-content-center items-center h-full">
                <Badge
                    className="p-0 m-0 cursor-pointer"
                    value={data.clients?.length || 0}
                    severity={data.clients?.length > 0 ? "success" : "warning"}
                    onClick={() => {
                        setSelectedTcmName(data.info.fullname);
                        setSelectedClientList(data.clients);
                        setShowInfo(true);
                    }}
                />
            </div>
        );
    };


    const closed = () => {
        setShow(false);
    }

    const header = renderHeader();
    const toast = useRef<Toast>(null);

    return (
        <div className="card w-full mt-10">
            <Toast ref={toast} />
            {show === true && <ConfigureSupervisios relad={relad} closed={closed} tcmSelected={tcmSelected} />}

            <Dialog
                header={`Clients of ${selectedTcmName}`}
                visible={showInfo}
                maximizable
                resizable
                style={{ width: "95vw" }}
                onHide={() => setShowInfo(false)}
            >
                <QAClients
                    active={active}
                    relad={relad}
                    listClient={selectedClientList}
                />
            </Dialog>

            <DataTable
                header={header}
                value={myTcm?.tcms}
                loading={isLoadingMyTcms}

                dataKey="ID"
                showGridlines
                resizableColumns
                emptyMessage="No TCMS found."
                rowHover
                stripedRows
                size="small"
                // Paginator
                paginator
                rows={15}
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[5, 10, 15, 20, 50, 75, 100, 200, 500, 1000]}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                // Filter
                filters={filters}
                globalFilterFields={['email', 'nick', 'credentials']}
                // Sort
                sortMode="multiple"
                sortField="ID"
                sortOrder={1} // 1 para ascendente, -1 para descendente


            >
                <Column
                    field="info.fullname"
                    header="FullName"
                    sortable
                    body={(rowData) => RenderText(rowData.info.fullname, toast)}
                />
                <Column
                    field="info.email"
                    header="Email"
                    sortable
                    style={{ width: '100px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.info.email, toast)}
                />
                <Column field="info.cell_phone" header="Phone"
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.info.cell_phone, toast)}
                />
                {/* <Column field="credentials" header="Credentials" sortable /> */}
                <Column field="ID" header="Clients" body={Clients}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column field="ID" header="Supervisions" body={Supervisons}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />

            </DataTable>
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { SupTCM }