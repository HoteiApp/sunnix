import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableExpandedRows, DataTableValueArray, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { RequetsNewClient, ClientFile } from '../../../commons';
import { ClientFileReview } from '../../../commons/ClientFileReview';
// import { ClientInfo } from './components'
import { Affix, Row } from 'antd';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from "primereact/utils";

import { useCoreSUPClients } from '../../hooks';

// -- New Struct
// import { useTCMClients } from "../../../../hooks/modules/tcm";
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

const SupClients = ({ active, relad }: Props) => {
    const { myClients, reloadMyClienst } = useCoreSUPClients();
    const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(undefined);
    const [selectedScmNum, setSelectedScmNum] = useState<number>(0);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [reviewShowInfo, setReviewShowInfo] = useState<boolean>(false);
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

    const reviewOnInfo = () => {    

        setReviewShowInfo(true);
    }

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
                        {/* <Button
                            icon="pi pi-user-plus"
                            label="New Client Request"
                            onClick={handleClick}
                        // pt={{
                        //     root: { className: 'bg-orange-400' }
                        // }}
                        /> */}
                        {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
                    </div>
                </div>
            </Affix>
        );
    };

    const Services = (rowData) => {
        return (
            <div className='flex justify-content-center gap-4'>
                {rowData.scm.map((item, index) => (
                    <div>
                        <Tooltip target=".scm" />
                        <i
                            className={classNames(
                                "scm p-overlay-badge pi",
                                item.status === "Open" && "pi-tag",
                                item.status === "Close" && "pi-verified",
                                item.status === "Pending" && "pi-hourglass"
                            )}
                            data-pr-tooltip={"Status: " + item.status + "\n DOA: " + item.doa + (item.closing_date !== "" ? ("\nClose: " + item.closing_date) : (""))}
                            data-pr-position="top"
                            style={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => {
                                setSelectedScm(item);
                                setSelectedScmNum(index + 1);
                                onInfo();
                            }}
                        >
                            <Badge
                                className='p-0 m-0'
                                value={index + 1}
                                severity={item.status !== "Open" ? "danger" : "warning"}
                            />
                        </i>
                    </div>
                ))}
            </div>
        );
    };

    const reviewIconNotes = (rowData) => {

        const reviewIcon = rowData.notes ? "pi-eye" : "pi-check-circle"
        const reviewSeverity = rowData.notes ? "danger" : "success"
        // Aqui ver de donde sacar el numero de cantidad de notas por revisar
        const reviewValue = rowData.notes ? "1" : "ok"

        return (
            <div className='flex justify-content-center gap-4'>
                {rowData.scm.map((item, index) => (
                    <div>
                        <Tooltip target=".scm" />
                        <i
                            className={classNames(
                                "scm p-overlay-badge pi",
                                reviewIcon
                            )}
                            // data-pr-tooltip={"Status: " + item.status + "\n DOA: " + item.doa + (item.closing_date !== "" ? ("\nClose: " + item.closing_date) : (""))}
                            data-pr-position="top"
                            style={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => {
                                // reviewOnInfo()

                            }}
                        >
                            <Badge
                                className='p-0 m-0'
                                value={reviewValue}
                                severity={reviewSeverity}
                            />
                        </i>
                    </div>
                ))}
            </div>
        );
    };

    const reviewIconCertification = (rowData) => {
        // Traer a la variable revisionStatus el estado de revision (true o false)  
        const reviewIcon = rowData.certification ? "pi-eye" : "pi-check-circle"

        
        return (
            <div className='flex justify-content-center gap-4'>
                <div>
                    <i
                        className={classNames(
                            "scm p-overlay-badge pi",
                            reviewIcon
                        )}

                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => {
                            // setSelectedScm(item);
                            // setSelectedScmNum(index+1);
                            // onInfo();
                            reviewOnInfo();
                            
                        }}
                    >
                        {/* AQUI EL BADGE  */}

                        <Badge
                            className={classNames(
                                'p-0 m-0',
                                rowData.certification && 'pl-2 pr-2'
                            )}
                            value={rowData.certification ? "check" : "ok"}
                            severity={rowData.certification ? "danger" : "success"}
                        />
                    </i>
                </div>
                {/* ))} */}
            </div>
        );
    };
    const reviewIconAssessment = (rowData) => {
        // Traer a la variable revisionStatus el estado de revision (true o false)  
        const reviewIcon = rowData.assessment ? "pi-eye" : "pi-check-circle"
        return (
            <div className='flex justify-content-center gap-4'>
                <div>
                    <i
                        className={classNames(
                            "scm p-overlay-badge pi",
                            reviewIcon
                        )}

                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => {
                            // setSelectedScm(item);
                            // setSelectedScmNum(index+1);
                            // onInfo();
                        }}
                    >
                        {/* AQUI EL BADGE  */}
                        <Badge
                            className={classNames(
                                'p-0 m-0',
                                rowData.assessment && 'pl-2 pr-2'
                            )}
                            value={rowData.assessment ? "check" : "ok"}
                            severity={rowData.assessment ? "danger" : "success"}
                        />
                    </i>
                </div>
                {/* ))} */}
            </div>
        );
    };
    const reviewIconSp = (rowData) => {
        // Traer a la variable revisionStatus el estado de revision (true o false)  
        const reviewIcon = rowData.sp ? "pi-eye" : "pi-check-circle"
        return (
            <div className='flex justify-content-center gap-4'>
                <div>
                    <i
                        className={classNames(
                            "scm p-overlay-badge pi",
                            reviewIcon
                        )}

                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => {
                            // setSelectedScm(item);
                            // setSelectedScmNum(index+1);
                            // onInfo();
                        }}
                    >

                        <Badge
                            className={classNames(
                                'p-0 m-0',
                                rowData.sp && 'pl-2 pr-2'
                            )}
                            value={rowData.sp ? "check" : "ok"}
                            severity={rowData.sp ? "danger" : "success"}
                        />
                    </i>
                </div>
                {/* ))} */}
            </div>
        );
    };

    const closed = () => {
        setShow(false);
    }
    const closedInfo = () => {
        setShowInfo(false);
    }
    const reviewClosedInfo = () => {
        setReviewShowInfo(false);
    }
    const header = renderHeader();

    return (
        <div className="card w-full">
            {show === true && <RequetsNewClient relad={relad} show={show} closed={closed} />}
            {showInfo === true && <ClientFile active={active} relad={reloadMyClienst} show={showInfo} scm={selectedScm} num={selectedScmNum} closed={closedInfo} />}
            {reviewShowInfo === true && <ClientFileReview active={active} relad={reloadMyClienst} show={reviewShowInfo} scm={selectedScm} num={selectedScmNum} closed={reviewClosedInfo} />}
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
                globalFilterFields={['last_name', 'first_name', 'phone']}
                header={header}
                sortMode="multiple"
                emptyMessage="No customers found."
            >
                <Column field="last_name" header="Last Name" sortable />
                <Column field="first_name" header="First Name" sortable />
                <Column field="id" header="MR #" sortable />
                <Column field="phone" header="Phone" />
                <Column field="certification" header="Certification" body={reviewIconCertification} />
                <Column field="assessment" header="Assessment" body={reviewIconAssessment} />
                <Column field="sp" header="SP" body={reviewIconSp} />
                <Column field="notes" header="Notes" body={reviewIconNotes} />
                <Column field="id" header="Admission" body={Services} />
            </DataTable>
        </div>
    );
}
type Props = {
    active?: Active;
    relad(): void;
};
export { SupClients }