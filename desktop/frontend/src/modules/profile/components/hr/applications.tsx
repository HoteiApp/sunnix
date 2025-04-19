import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useCoreUsersApplications } from "../../hooks";
// import { Toast } from 'primereact/toast';
import { ApplicationUserinfo, GetInfo } from './components'
import { ChangeUserPasswordDialog } from "../../../commons/ChangeUserPasswordDialog";
import { ApplicationAction } from "./components";
import { Affix } from 'antd';
import { Active } from "../../../../models";

interface Representative {
    name: string;
    image: string;
}

interface Customer {
    id: number;
    uid: string;
    email: string;
    name: string;
    roll: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

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

const Applications = ({ active, relad }: Props) => {
    const { usersApplications, isLoading, reloadUsersApplications } = useCoreUsersApplications();
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [loading, setLoading] = useState<boolean>(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const getSeverity = (status: string) => {
        switch (status) {
            case 'hiring':
                return 'danger';

            case 'hired':
                return 'success';

            case 'new':
                return 'info';

            case 'application':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    const getRoll = (status: string) => {
        switch (status) {
            case 'HR':
                return 'success';
            case 'QA':
                return null;
            case 'TCMS':
                return 'info';

            case 'TCM':
                return 'warning';
            default:
                return 'warning';
        }
    };

    useEffect(() => {
        reloadUsersApplications();
    }, [relad]);


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
                    <div className="flex w-1/4 items-center">
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-search pl-2" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='w-full pl-8' />
                        </span>
                    </div>
                </div>
            </Affix>
        );
    };

    const rollBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.roll} severity={getRoll(rowData.roll)} />;
    };
    const rollBodyName = (rowData: Customer) => {
        return <GetInfo uid={rowData.uid} date="fullname" />
    };
    const rollBodyApplied = (rowData: Customer) => {
        return <GetInfo uid={rowData.uid} date="position_applied" />
    };

    const statusBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const header = renderHeader();

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [showModalAction, setShowModalAction] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showUid, setShowUid] = useState<string>("0");

    const showUserAplication = (event) => {

        setShowUid(event.data.uid);
        setShowInfo(true);
    };

    return (
        <div className="card w-full mt-10">

            {/* Aqui columnas hiring users */}
            <Dialog
                header="View user aplication"
                visible={showInfo}
                maximizable
                style={{ width: "95vw" }}
                onHide={() => setShowInfo(false)}
                footer={
                    <div className="pt-4 flex">
                        <Button
                            label="Action"
                            icon="pi pi-cog"
                            onClick={() => setShowModalAction(true)}
                            className="p-button-text mr-2"
                        />
                        <Button
                            label="Change Password"
                            icon="pi pi-key"
                            onClick={() => setShowModal(true)}
                            className="p-button-text"
                        />
                    </div>
                }
            >
                <ApplicationUserinfo uid={showUid} relad={relad} />
            </Dialog>


            <ApplicationAction
                showModal={showModalAction}
                setShowModal={setShowModalAction}
                active={active}
                relad={relad}
                uid={showUid}
            />

            <ChangeUserPasswordDialog
                showModal={showModal}
                setShowModal={setShowModal}
                active={active}
                relad={relad}
                uid={showUid}
            />

            {/* Listado de users! */}
            <DataTable
                value={usersApplications?.users}
                onRowClick={showUserAplication}
                paginator
                showGridlines
                stripedRows
                selectionMode="single"
                rows={10}
                loading={loading}
                dataKey="ID"
                filters={filters}
                // filterDisplay="row"
                globalFilterFields={["email"]}
                header={header}
                emptyMessage="No customers found."
            >
                {/* <Column expander={allowExpansion} style={{ width: '5rem' }} /> */}
                <Column field="email" header="Email" />
                <Column header="Fullname" body={rollBodyName} />
                <Column field="nick" header="NickName" />
                <Column header="Position applied" body={rollBodyApplied} />
                <Column field="roll" header="Roll" body={rollBodyTemplate} />
                <Column field="status" header="Status" body={statusBodyTemplate} />
            </DataTable>

        </div>
    );
}
type Props = {
    relad(): void;
    active?: Active;
};
export { Applications }