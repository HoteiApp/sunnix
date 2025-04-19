import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableRowEvent, DataTableFilterMeta, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
// import { Toast } from 'primereact/toast';

import { useCoreRequestsNewClients } from "../../hooks";
import { RequetsNewClient, NewClient, ExportExcelButton } from '../../../commons'
import { Affix } from 'antd';
// import { RequestNewClient } from "../../../data-types";
import { Active, RequestNewClient } from "../../../../models";

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "last_name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "first_name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
};

const QARequestsClients = ({ active, relad }: Props) => {
    const { requestsNewClients, isLoading, reloadRequestsNewClients } = useCoreRequestsNewClients();

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [requestActive, setRequestActive] = useState<DataTableValue | undefined>(undefined);
    const [showWindowsNewClient, setShowWindowsNewClient] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [request, setRequest] = useState<RequestNewClient[] | null>([]);
    
    const onClickRequest = (event: DataTableRowEvent) => {
        setRequestActive(event.data);
        setShowWindowsNewClient(true);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const handleClick = () => {
        setShow(true);
    };

    const SplitDate = (rowData) => {
        // return <GetInfo email={rowData.email} date="fullname" />
        return rowData.CreatedAt.split("T")[0];
    };

    const Services = (rowData) => {
        // return <GetInfo email={rowData.email} date="fullname" />
        return (
            <div>
                {rowData.case_management && <Tag severity="warning" value="Case Management"></Tag>}
                {rowData.individual_therapy && <Tag severity="success" value="Individual Therapy" className='ml-1'></Tag>}
                {rowData.family_therapy && <Tag severity="danger" value="Family Therapy" className='ml-1'></Tag>}
                {rowData.adult_psr && <Tag severity="info" value="Adult PSR" className='ml-1'></Tag>}
                {rowData.psychiatrist && <Tag style={{ background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)' }} value="Psychiatrist" className='ml-1'></Tag>}
                {rowData.other && <Tag value="Other" className='ml-1'></Tag>}

            </div>
        );
    };
    const Action = (rowData) => {
        // return <GetInfo email={rowData.email} date="fullname" />
        return (
            <div>
                {rowData.client_id === 0 ?
                    <Tag severity="warning" value="New Client"></Tag> :
                    <Tag severity="danger" value="New Admission" className='ml-1'></Tag>
                }

            </div>
        );
    };



    const Header = () => {
        return (
            // <Affix offsetTop={80}>
            <div className="flex justify-between items-center w-full bg-transparent">
                <div className="flex w-1/4 items-center">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search ml-2" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className='bg-transparent p-3 pl-8' />
                    </span>
                </div>
                <div className="flex justify-end">
                    <Button
                        className='animate-bounce hover:animate-none'
                        icon="pi pi-user-plus"
                        label="New Client Request"
                        onClick={handleClick}
                        text
                        autoFocus />

                    {/* <ExportExcelButton
                        exportData={request?.map(req => ({
                            "Last Name": req.LastName,
                            "First Name": req.FirstName,
                            "Sexo": req.Sexo,
                            "DOB": req.DOB,
                        })) ?? []}
                        fileName="clients_requests"
                    /> */}
                </div>
            </div>
            // </Affix>
        );
    };

    const closed = () => {
        setShow(false);
        setShowWindowsNewClient(false);
    }

    useEffect(() => {
        initFilters();
    }, []);

    useEffect(() => {
        reloadRequestsNewClients();
        closed();
    }, [relad]);

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };
    useEffect(() => {
        setRequest(requestsNewClients?.request ?? []);
    }, [])

    return (
        <div className="card w-full mt-10">
            {show === true && <RequetsNewClient relad={relad} show={show} closed={closed} />}
            {showWindowsNewClient === true && <NewClient relad={relad} active={active} show={showWindowsNewClient} closed={closed} data={requestActive} />}
            <DataTable
                value={requestsNewClients?.request}
                onRowClick={onClickRequest}
                // Paginator
                rows={10}
                paginator
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[5, 10, 20, 50, 75, 100, 200, 500, 1000]}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                // -------
                rowHover
                showGridlines
                loading={isLoading}
                dataKey="ID"
                filters={filters}
                // filterDisplay="row"
                globalFilterFields={['last_name', 'first_name']}
                header={Header}
                emptyMessage="No customers found."
            >
                {/* <Column expander={allowExpansion} style={{ width: '5rem' }} /> */}
                <Column field="dob" header="Action" style={{ minWidth: '8rem' }} body={Action} />
                <Column field="last_name" filter header="Last Name" style={{ minWidth: '8rem' }} sortable />
                <Column field="first_name" filter header="First Name" style={{ minWidth: '8rem' }} sortable />
                <Column field="sexo" header="SEXO" sortable />
                <Column field="dob" header="DOB" sortable />
                <Column field="dob" header="Requested Services" body={Services} style={{ maxWidth: '12rem' }} />
                <Column field="CreatedAt" header="Application Date" body={SplitDate} sortable />
            </DataTable>
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { QARequestsClients }