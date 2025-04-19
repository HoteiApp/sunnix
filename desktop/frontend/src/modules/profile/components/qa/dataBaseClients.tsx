import React, { useState, useEffect, useRef } from 'react';
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { useCoreQAClientsDatabase } from "../../hooks";
import { RequetsNewClient, RequetsNewAdmission, ClientFile, ExportExcelButton, RenderText } from '../../../commons'
// import { Affix } from 'antd';
import user from "../../../../images/user.png";
import { Tooltip } from 'primereact/tooltip';
// -- New Struct
import { Active, ServiceCMActive, Client } from "../../../../models";

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "tcms_active": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "tcm_active": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },

};

const DataBaseClients = ({ active, relad, listClient }: Props) => {
    const op = useRef<OverlayPanel>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<string>("");
    // --------------------------------------------------------------------------
    // -------------------  Hooks                      --------------------------
    // --------------------------------------------------------------------------
    const { myClients, isLoading, reloadMyClienst } = useCoreQAClientsDatabase();

    // --------------------------------------------------------------------------
    // -------------------  Variable declaration       --------------------------
    // --------------------------------------------------------------------------
    const toast = useRef<Toast>(null);
    const [clients, setClients] = useState<Client[] | null>([]);
    const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScmNum, setSelectedScmNum] = useState<number>(0);



    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [showNewAdmission, setShowNewAdmission] = useState<boolean>(false);


    // --------------------------------------------------------------------------
    // -------------------  Funtions                   --------------------------
    // --------------------------------------------------------------------------
    const handleClick = () => {
        setShow(true);
    };

    const onInfo = () => {
        setShowInfo(true);
    };

    const closed = () => {
        setShow(false);
    }

    const closedNewAdmission = () => {
        setShowNewAdmission(false);
    }

    const closedInfo = () => {
        setShowInfo(false);
    }

    // --------------------------------------------------------------------------
    // -------------------  START FILTER               --------------------------
    // --------------------------------------------------------------------------
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

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
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
                        exportData={clients?.map(client => ({
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
                        {rowData.scm?.length === (index + 1) && item.status === "Close" && (
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
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const Tcm = (rowData) => {
        return (
            <div className="flex justify-center items-center">

                <img
                    src={rowData.tcm_photo === "" ? user : rowData.tcm_photo}
                    alt={""}
                    className="rounded-full w-8 cursor-pointer"
                    onClick={(e) => {
                        setSelectedPhoto(rowData.tcm_photo);
                        if (op.current) {
                            op.current.toggle(e);
                        }
                    }}
                />
            </div>
        );
    }; 
    const Tcms = (rowData) => {
        return (
            <div className="flex justify-center items-center">
                <img
                    src={rowData.tcms_photo === "" ? user : rowData.tcms_photo}
                    alt={""}
                    className="rounded-full w-8 cursor-pointer"
                    onClick={(e) => {
                        setSelectedPhoto(rowData.tcms_photo);
                        if (op.current) {
                            op.current.toggle(e);
                        }
                    }}
                />
            </div>
        );
    };

    // const RenderText = (data) => {
    //     const handleCopy = () => {
    //       navigator.clipboard.writeText(data);
    //       toast.current?.show({ severity: 'info', summary: 'Copy text', detail: data, life: 3000 });
    //     };
    
    //     return (
    //       <span
    //         className="cursor-copy hover:text-blue-800"
    //         onClick={handleCopy}
    //         onContextMenu={(e) => {
    //           e.preventDefault();
    //           handleCopy();
    //         }}
    //       >
    //         {data}
    //       </span>
    //     );
    //   };
    // --------------------------------------------------------------------------
    // -------------------  Initialization             --------------------------
    // --------------------------------------------------------------------------
    useEffect(() => {
        setClients(myClients?.clients ?? []);
    }, [])

    useEffect(() => {
        initFilters();
    }, []);


    return (
        <div className="card w-full">
            <Toast ref={toast} position="bottom-left" />
            <DataTable
                header={Header}
                value={listClient !== undefined ? listClient : myClients?.clients}
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
                globalFilterFields={['last_name', 'first_name', 'dob', 'medicaid', 'medicare', 'ss', 'phone', 'tcm_active', 'tcms_active', 'mr']}
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
                    body={(rowData) => RenderText(rowData.mr, toast)}
                />
                <Column
                    field="last_name"
                    header="Last Name"
                    sortable
                    // alignHeader={'center'}
                    style={{ width: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.last_name, toast)}
                />
                <Column
                    field="first_name"
                    header="First Name"
                    sortable
                    // alignHeader={'center'}
                    style={{ width: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.first_name, toast)}
                />

                <Column
                    field="referring_person"
                    header="Referring"
                    // body={Tcm}
                    alignHeader={'center'}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0' }}
                />

                {/* <Column
                    field="tcm_active"
                    header="TCM"
                    filter
                    filterMenuClassName='bg-gray-100'
                    alignHeader={'center'}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.tcm_active, toast)}
                /> */}
                {/* Para QA */}
                {/* {active?.activeUser?.User?.roll === "QA" && <Column
                    field="tcms_active"
                    header=""
                    body={Tcms}
                    alignHeader={'center'}
                    style={{ width: '50px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0' }}
                />
                }
                {active?.activeUser?.User?.roll === "QA" && <Column
                    field="tcms_active"
                    header="TCMS"
                    filter
                    filterMenuClassName='bg-gray-100'
                    alignHeader={'center'}
                    style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.tcms_active, toast)}
                />
                } */}
                {/* ------ */}

                <Column
                    field="dob"
                    header="DOB"
                    alignHeader={'center'}
                    style={{ width: '80px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.dob, toast)}
                />
                <Column
                    field="medicaid"
                    header="Medicaid ID"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.medicaid, toast)}
                />
                <Column
                    field="medicare"
                    header="Medicare ID"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.medicare, toast)}
                />
                <Column
                    field="ss"
                    header="SS #"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.ss, toast)}
                />
                <Column
                    field="phone"
                    header="Phone"
                    alignHeader={'center'}
                    style={{ width: '120px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    body={(rowData) => RenderText(rowData.phone, toast)}
                />
                {/* <Column
                    alignHeader={'center'}
                    align={'center'}
                    style={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    field="dob"
                    header="Admission"
                    body={Services}
                /> */}
            </DataTable>

            <style>
                {`
                    .selectable-cell {
                        user-select: text !important;
                    }
                `}
            </style>
            <OverlayPanel
                ref={op}
                id="overlay_panel"
                className="w-1/6 h-2/6 flex justify-center items-center"
                showCloseIcon
            >
                <div className="w-full h-full">
                    <img
                        src={selectedPhoto === "" ? user : selectedPhoto}
                        className="w-full h-full object-contain border-double border-4 border-orange-100"
                        alt="Avatar"
                    />
                </div>
            </OverlayPanel>
            {/* {show === true && <RequetsNewClient relad={relad} show={show} closed={closed} />}
            {showNewAdmission === true && <RequetsNewAdmission client={selectedClient} relad={relad} show={showNewAdmission} closed={closedNewAdmission} active={active} />}
            {showInfo === true && <ClientFile active={active} client={selectedClient} relad={reloadMyClienst} show={showInfo} scm={selectedScm} num={selectedScmNum} closed={closedInfo} />} */}
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
    listClient?: Client[] | undefined;
};
export { DataBaseClients }