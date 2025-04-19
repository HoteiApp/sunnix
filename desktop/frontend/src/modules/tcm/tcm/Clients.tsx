import React, { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Affix } from 'antd';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from "primereact/utils";
import { Block } from '../../commons/component/block';
import { RequetsNewClient, ClientFile, ExportExcelButton } from '../../commons'
// -- New Struct
import { useTCMClients } from "../../../hooks/modules/tcm";
import { Active, Client, ServiceCMActive } from "../../../models";

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const TCMClients = ({ active, relad }: Props) => {
    const { myClients, isLoadingmyClients, reloadMyClients } = useTCMClients();
    const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScmNum, setSelectedScmNum] = useState<number>(0);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


    const handleClick = () => {
        setShow(true);
    };

    const onInfo = () => {
        setShowInfo(true);
    };



    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    // --------------------------------------------------------------------------
    // -------------------  Renders                    --------------------------
    // --------------------------------------------------------------------------
    const Header = () => {
        return (
            // <Affix offsetTop={95}>
            <div className="flex justify-between items-center w-full bg-transparent mt-10">
                <div className="flex w-1/3 items-center flex-wrap justify-content-center gap-3 z-0">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search ml-2" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Search"
                            autoFocus
                            pt={{
                                root: { className: 'border-gray-400 p-3 pl-8 bg-transparent ' }
                            }}
                        />
                    </span>
                </div>
                <div className="flex w-1/3 items-center flex-wrap justify-content-center gap-3 z-0">
                    <Button
                        icon="pi pi-user-plus animate-pulse"
                        label="New Client Request"
                        onClick={handleClick}
                        size='small'
                        pt={{
                            root: { className: 'bg-primary' }
                        }}
                    />
                    <ExportExcelButton
                        exportData={myClients?.clients?.map(client => ({
                            "MR #": client.mr,
                            "Last Name": client.last_name,
                            "First Name": client.first_name,
                            "TCM": client.tcm_active,
                            "DOB": client.dob,
                            "Medica ID": client.medicaid,
                            "Medicare": client.medicare,
                            "SS": client.ss,
                            "Phone": client.phone,
                        })) ?? []}
                        fileName="clients"
                    />
                </div>

                <div className="flex justify-end items-center flex-wrap justify-content-center gap-3 z-0">

                    Admissions status:
                    {["warning", "danger", "success", "info"].map((severity, index) => (
                        <React.Fragment key={severity}>
                            {(index !== 3 || active?.activeUser?.User?.roll === "QA") && (
                                <i
                                    className={classNames(
                                        "scm p-overlay-badge pi",
                                        index === 3 ? "pi-plus animate-pulse" : "pi-home",
                                    )}
                                    style={{ fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    <Badge
                                        className='p-0 m-0'
                                        value=""
                                        severity={severity as "success" | "warning" | "danger"}
                                    />
                                </i>
                            )}
                            {index === 0 && "Pending"}
                            {index === 1 && "Close"}
                            {index === 2 && "Open"}
                            {index === 3 && active?.activeUser?.User?.roll === "QA" && "Add"}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            // </Affix>
        );
    };

    const Services = (rowData) => {
        return (
            <div className='w-full flex justify-content-center justify-center gap-4'>
                {rowData.scm?.map((item, index) => (
                    <div className='flex'>
                        <Tooltip target=".scm" />
                        <i
                            className={classNames(
                                "scm p-overlay-badge pi pi-home",
                                // item.status === "Open" && "pi-tag",
                                // item.status === "Close" && "pi-verified",
                                // item.status === "Pending" && "pi-hourglass"
                            )}
                            data-pr-tooltip={"Admission #: " + (index + 1) + "\nStatus: " + item.status + "\n DOA: " + item.doa + (item.closing_date !== "" ? ("\nClose: " + item.closing_date) : (""))}
                            data-pr-position="top"
                            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                            onClick={() => {
                                setSelectedClient(rowData);
                                setSelectedScm(item);
                                setSelectedScmNum(index + 1);
                                onInfo();
                            }}
                        >
                            <Badge
                                className='p-0 m-0'
                                // value={index + 1}
                                value={""}
                                severity={item.status === "Open" ? "success" : item.status === "Pending" ? "warning" : "danger"}
                            />
                        </i>
                        {/* {rowData.scm?.length === (index + 1) && item.status === "Close" && (
                            <div>
                                <Tooltip target=".scmadd" />
                                <i
                                    className={classNames(
                                        "scmadd pl-5 p-overlay-badge pi pi-plus",
                                    )}
                                    data-pr-tooltip="Add admission"
                                    data-pr-position="top"
                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedClient(rowData);
                                        setShowNewAdmission(true);
                                    }}
                                />
                            </div>
                        )} */}
                    </div>
                ))}
            </div>
        );
    };

    const closed = () => {
        setShow(false);
    }
    const closedInfo = () => {
        setShowInfo(false);
    }


    return (
        <div className="card w-full">
            {show === true && <RequetsNewClient relad={relad} show={show} closed={closed} />}
            {showInfo === true && <ClientFile
                active={active}
                relad={reloadMyClients}
                show={showInfo}
                client={selectedClient}
                scm={selectedScm}
                num={selectedScmNum}
                closed={closedInfo}
            />}
            {/* <Block
                active={false}
                copy
            > */}
            <DataTable
                header={Header}
                value={myClients?.clients}
                rowHover
                stripedRows
                loading={isLoadingmyClients}
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
                globalFilterFields={['last_name', 'first_name', 'dob', 'medicaid', 'medicare', 'ss', 'phone', 'mr']}
                emptyMessage="No customers found."
                // Sort
                sortMode="multiple"
                sortField="mr"
                sortOrder={1} // 1 para ascendente, -1 para descendente
            >
                <Column
                    field="mr"
                    header="MR #"
                    sortable
                    alignHeader={'center'}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="last_name"
                    header="Last Name"
                    sortable
                    // alignHeader={'center'}
                    style={{ width: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="first_name"
                    header="First Name"
                    sortable
                    // alignHeader={'center'}
                    style={{ width: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />

                <Column
                    field="dob"
                    header="DOB"
                    alignHeader={'center'}
                    style={{ width: '80px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="medicaid"
                    header="Medicaid ID"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="medicare"
                    header="Medicare ID"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="ss"
                    header="SS #"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    field="phone"
                    header="Phone"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <Column
                    alignHeader={'center'}
                    align={'center'}
                    style={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    field="dob"
                    header="Admission"
                    body={Services}
                />
            </DataTable>
            {/* </Block> */}
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { TCMClients }