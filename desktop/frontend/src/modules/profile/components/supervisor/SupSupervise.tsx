import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCoreQAClients } from "../../hooks";
import { RequetsNewClient, ClientFile } from '../../../commons'
import { Affix } from 'antd';
import { Active, ServiceCMActive } from "../../../../models";

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

const SupSupervise = ({ active, relad }: Props) => {
    const { myClients, reloadMyClienst } = useCoreQAClients();
    // const [client, setClient] = useState<DataTableValue | undefined>(undefined);
    // const [scm, setScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScmNum, setSelectedScmNum] = useState<number>(0);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [loading, setLoading] = useState<boolean>(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    // useEffect(() => {
    //     reloadMyClienst();
    // }, [relad]);

    const handleClick = () => {
        setShow(true);
    };

    const onInfo = () => {
        setShowInfo(true);
    };

    const collapseAll = () => {
        setExpandedRows(undefined);
    };

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
            <Affix offsetTop={44} onChange={(affixed) => console.log(affixed)}>
                <div className="flex justify-between items-center w-full" style={{ backgroundColor: "#F8F9FA" }}>

                    <div className="flex w-1/4 items-center flex-wrap justify-content-center gap-3">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
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
                        {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text /> */}
                        {expandedRows !== undefined && <Button icon="pi pi-minus" label="Collapse" onClick={collapseAll} text />}
                        <Button
                            icon="pi pi-user-plus"
                            label="New Client Request"
                            onClick={handleClick}
                        // pt={{
                        //     root: { className: 'bg-orange-400' }
                        // }}
                        />
                        {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
                    </div>
                </div>
            </Affix>
        );
    };

    // const Services = (rowData) => {
    //     return (
    //         <div className='flex justify-content-center gap-4'>
    //             {rowData.scm.map((item, index) => (
    //                 <div>
    //                     <Tooltip target=".scm" />
    //                     <i
    //                         className={classNames(
    //                             "scm p-overlay-badge pi",
    //                             item.status === "Open" && "pi-tag",
    //                             item.status === "Close" && "pi-verified",
    //                             item.status === "Pending" && "pi-hourglass"
    //                         )}
    //                         data-pr-tooltip={"Status: " + item.status + "\n DOA: " + item.doa + (item.closing_date !== "" ? ("\nClose: " + item.closing_date):(""))}
    //                         data-pr-position="top"
    //                         style={{ fontSize: '2rem', cursor: 'pointer' }}
    //                         onClick={() => {
    //                             setSelectedScm(item);
    //                             setSelectedScmNum(index+1);
    //                             onInfo();
    //                         }}
    //                     >
    //                         <Badge
    //                             className='p-0 m-0'
    //                             value={index + 1}
    //                             severity={item.status !== "Open" ? "danger" : "warning"}
    //                         />
    //                     </i>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };
    const closed = () => {
        setShow(false);
    }
    const closedInfo = () => {
        setShowInfo(false);
    }
    const header = renderHeader();

    return (
        <div className="card w-full">
            {show === true && <RequetsNewClient relad={relad} show={show} closed={closed} />}
            {showInfo === true && <ClientFile active={active} relad={reloadMyClienst} show={showInfo} scm={selectedScm} num={selectedScmNum} closed={closedInfo} />}
            <DataTable
                value={myClients?.clients}
                // onRowClick={onInfo}
                paginator
                showGridlines
                // stripedRows
                selectionMode="single"
                rows={10}
                loading={loading}
                dataKey="id"
                filters={filters}
                // filterDisplay="row"
                globalFilterFields={['last_name', 'first_name', 'dob', 'medicaid', 'medicare', 'ss', 'phone']}
                header={header}
                sortMode="multiple"
                emptyMessage="No customers found."
            >
                <Column field="last_name" header="Last Name" sortable />
                <Column field="first_name" header="First Name" sortable />
                <Column field="id" header="MR #" sortable />
                <Column field="dob" header="DOB" sortable />
                <Column field="medicaid" header="Medica ID" sortable />
                <Column field="medicare" header="Medicare" sortable />
                <Column field="ss" header="SS" sortable />
                <Column field="phone" header="Phone" />
                {/* <Column field="dob" header="Admission" body={Services} /> */}
            </DataTable>
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { SupSupervise }