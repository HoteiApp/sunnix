import { useState, useRef } from 'react';
import { DataTable, DataTableRowEvent, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useCoreUsers } from "../../hooks";
import { Affix } from "antd";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { useCoreUsersApplications } from "../../hooks";
import { Tag } from 'primereact/tag';
import { ApplicationUserinfo } from './components'
import { Dialog } from "primereact/dialog";
import { Active } from "../../../../models";
import { ChangeUserPasswordDialog } from "../../../commons/ChangeUserPasswordDialog";
import { RenderText } from "../../../commons";
import { ApplicationAction } from "./components";
interface User {
    uid: string;
    email: string;
    roll: string;
    status: string;
    approved: boolean;
    change_password: boolean;
}

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

const Workers = ({ active, relad }: Props) => {
    const { users, isLoading, reloadUsers } = useCoreUsers();
    const toast = useRef<Toast>(null);
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [dialogVisible, setDialogVisible] = useState(false);
    // const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalAction, setShowModalAction] = useState<boolean>(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    // const onRowClick = (event: DataTableRowEvent) => {
    //     setSelectedUser(event.data as User);
    //     setDialogVisible(true);
    // };
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const header = () => {
        return (
            // <Affix offsetTop={44}>
            <div
                className="flex justify-between items-center w-full mt-2"
            >
                <div className="flex w-1/2 items-center flex-wrap justify-content-center gap-3 mb-2">
                    <span className="p-input-icon-left w-1/3 hover:w-full transition-all duration-300 ease-in-out focus-within:w-full border-2 border-gray-400 rounded-sm">
                        <i className="pi pi-search ml-2" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Search ..."
                            autoFocus
                            pt={{
                                root: { className: "border-gray-400 p-3 pl-8 w-full" },
                            }}
                        />
                    </span>
                </div>
            </div>
            // </Affix>
        );
    };

    const defaultFilters: DataTableFilterMeta = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        }
    };

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

    const getRoll = (status: string) => {
        switch (status) {
            case 'HR':
                return 'success';
            case 'QA':
                return 'success';
            case 'FINANCE':
                return 'danger';
            case 'BILLER':
                return 'danger';
            case 'TCMS':
                return 'info';
            case 'TCM':
                return 'warning';
            case 'DEVOPS':
                return 'danger';
            default:
                return 'warning';
        }
    };

    const rollBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.roll} severity={getRoll(rowData.roll)} />;
    };
    // const rollBodyName = (rowData: Customer) => {
    //     return <GetInfo uid={rowData.uid} date="fullname" />
    // };
    // const rollBodyApplied = (rowData: Customer) => {
    //     return <GetInfo uid={rowData.uid} date="position_applied" />
    // };


    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [showUid, setShowUid] = useState<string>("0");

    // const showUserAplication = (event: DataTableRowEvent) => {
    //     setShowUid(event.data.uid);
    //     setShowInfo(true);
    // };

    return (

        <div className='w-full mt-10'>
            <Toast ref={toast} />
            <Dialog
                // header="View user aplication"
                visible={showInfo}
                maximizable
                style={{ width: "95vw" }}
                onHide={() => {
                    setShowInfo(false);
                    reloadUsers();
                }}
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

            {/* Test STAFF INFO */}
            <DataTable
                header={header}
                value={users?.users?.filter(user => user.roll !== "tmp")}
                // onRowClick={showUserAplication}
                rowHover
                stripedRows
                loading={isLoading}
                dataKey="id"
                size="small"
                // Paginator
                rows={15}
                paginator
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                rowsPerPageOptions={[5, 10, 15, 20, 50, 75, 100, 200, 500, 1000]}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                // Filter
                filters={filters}
                globalFilterFields={['uid', 'nick', 'roll']}
                emptyMessage="No customers found."
                // Sort
                sortMode="multiple"
                sortField="id"
                sortOrder={1} // 1 para ascendente, -1 para descendente
            >
                <Column
                    header="Username"
                    field="uid"
                    sortable
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.uid, toast)}
                />
                <Column header="Fullname" field='nick' sortable />
                <Column
                    header="Roll"
                    alignHeader={'center'}

                    field="roll"
                    sortable
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={rollBodyTemplate} />
                <Column
                    header="Active"
                    alignHeader={'center'}
                    field="active"
                    sortable
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => (
                        rowData.active ? (
                            <i className="pi pi-thumbs-up text-green-500" style={{ fontSize: '1.2rem' }} />
                        ) : (
                            <i className="pi pi-thumbs-down text-red-500" style={{ fontSize: '1.2rem' }} />
                        )
                    )} />
                <Column
                    header="File"
                    alignHeader={'center'}
                    field="active"

                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => (
                        <span
                            onClick={() => {
                                setShowUid(rowData.uid);
                                setShowInfo(true);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="pi pi-address-book text-secondary" style={{ fontSize: '1.2rem' }} />
                        </span>
                    )} />

            </DataTable>
        </div>
    );
}

type Props = {
    active?: Active;
    relad(): void;
};

export { Workers };