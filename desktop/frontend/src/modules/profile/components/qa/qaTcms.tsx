import React, { useState, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Toast } from 'primereact/toast';
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";
import { useCoreListTCMS } from "../../../../hooks/modules/tcm";
import { RequetsNewClient, LisTCM } from "../../../commons";
import { Affix } from "antd";
import { Tooltip } from "primereact/tooltip";

// -- New Struct
import { Active, ServiceCMActive, TcmLits } from "../../../../models";




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

const QATcms = ({ active, relad }: Props) => {
  const { tcms, isLoading, reloadTCMS } = useCoreListTCMS();
  // const [client, setClient] = useState<DataTableValue | undefined>(undefined);
  // const [scm, setScm] = useState<ServiceCMActive | undefined>(undefined);
  const toast = useRef<Toast>(null);
  const [selectedScm, setSelectedScm] = useState<ServiceCMActive | undefined>(
    undefined
  );
  const [selectedTcmList, setSelectedTcmList] = useState<TcmLits[] | undefined>(
    undefined
  );


  const [selectedScmNum, setSelectedScmNum] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  // const [show, setShow] = useState<boolean>(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  // useEffect(() => {
  //     reloadMyClienst();
  // }, [relad]);

  // const handleClick = () => {
  //     setShow(true);
  // };

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
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <Affix offsetTop={44}>
        <div
          className="flex justify-between items-center w-full"
          style={{ backgroundColor: "#F8F9FA" }}
        >
          <div className="flex w-1/4 items-center flex-wrap justify-content-center gap-3">
            <span className="p-input-icon-left">
              <i className="pi pi-search ml-2" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search"
                autoFocus
                pt={{
                  root: { className: "border-gray-400 p-3 pl-8" },
                }}
              />
            </span>
          </div>
          <div className="flex justify-end">
            {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text /> */}
            {expandedRows !== undefined && (
              <Button
                icon="pi pi-minus"
                label="Collapse"
                onClick={collapseAll}
                text
              />
            )}
          </div>
        </div>
      </Affix>
    );
  };


  const Tcm = (data) => {
    return (
      <div className="flex justify-content-center">
        <div>
          <i
            className={classNames("scm p-overlay-badge pi pi-users")}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => {
              setSelectedTcmList(data.list_tcm);
              onInfo();
            }}
          >
            <Badge
              className="p-0 m-0"
              value={data.total_tcm ? data.total_tcm : 0}
              severity={data.total_tcm ? data.total_tcm > 0 ? "success" : "warning" : "danger"}
            />
          </i>
        </div>
      </div>
    );
  };


  const RenderText = (data) => {
    const handleCopy = () => {
      navigator.clipboard.writeText(data);
      toast.current?.show({ severity: 'info', summary: 'Copy text', detail: data, life: 3000 });
    };

    return (
      <span
        className="cursor-copy hover:text-blue-800"
        onClick={handleCopy}
        onContextMenu={(e) => {
          e.preventDefault();
          handleCopy();
        }}
      >
        {data}
      </span>
    );
  };

  const closedInfo = () => {
    setShowInfo(false);
  };

  const header = renderHeader();

  return (
    <div className="card w-full mt-10">

      {showInfo === true && (
        <LisTCM
          active={active}
          relad={reloadTCMS}
          show={showInfo}
          listtcm={selectedTcmList}
          closed={closedInfo}
        />
      )}
      <Toast ref={toast} position="bottom-left" />
      <DataTable
        header={header}
        value={tcms?.tcms}
        loading={isLoading}

        rowHover
        stripedRows

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
        dataKey="id"
        // Sort
        sortMode="multiple"
        sortField="id"
        sortOrder={1} // 1 para ascendente, -1 para descendente
        tableStyle={{ userSelect: 'text' }} // Allow text selection
      >
        <Column
          field="info.fullname"
          header="Full Name"
          sortable
          alignHeader={'left'}
          style={{ width: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => RenderText(rowData.info.fullname)} // Fallback to first and last name if fullname is not available
        />
        <Column
          field="user.credentials" header="Credentials" sortable
          alignHeader={'center'}
          style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => RenderText(rowData.user.credentials)} 
        />
        <Column field="user.business" header="Business" sortable
          alignHeader={'center'}
          style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => {
            return <Badge
            className="p-0 m-0"
            value={rowData.user.business}
            severity={rowData.user.business ? rowData.user.business > 0 ? "info" : "warning" : "danger"}
          />
          }} 
        />
        <Column field="info.email" header="Email" sortable
          alignHeader={'center'}
          style={{ width: '100px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => RenderText(rowData.user.email)} 
        />

        <Column field="info.cell_phone" header="Cell Phone" sortable
          alignHeader={'center'}
          style={{ width: '100px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => RenderText(rowData.info.cell_phone)} 
        />
        <Column field="info.dob" header="DOB" sortable
          alignHeader={'center'}
          style={{ width: '100px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          body={(rowData) => RenderText(rowData.info.dob)} 
        />


        <Column field="id" header="TCM" body={Tcm}
          style={{ width: 'auto', textAlign: 'left' }}
        />
      </DataTable>
    </div>
  );
};
type Props = {
  active?: Active;
  relad(): void;
};
export { QATcms };
