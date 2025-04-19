import { useState } from "react";
// -- Component
import { Dialog } from "primereact/dialog";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ScrollTop } from "primereact/scrolltop";
import {
  DataTable,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";
import { QAClients } from "../profile/components/qa/qaClients";

// --New Struct
import { Active, TcmLits, Client } from "../../models";

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

const LisTCM = ({ active, show, listtcm, relad, closed }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedClientList, setSelectedClientList] = useState<
    Client[] | undefined
  >(undefined);
  const [showQAClients, setShowQAClients] = useState(false);
  // -- Get SCM Client

  // -----------------------------------------------FOOTER here
  const footerContent = (
    <div className="container">
      <div className="row"></div>
    </div>
  );

  const onInfo = () => {
    setShowQAClients(true);
  };

  const Clients = (data) => {
    return (
      <div className="flex justify-content-center">
        <div>
          <i
            className={classNames("scm p-overlay-badge pi pi-users")}
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={() => {
              setSelectedClientList(data.clients);
              onInfo();
            }}
          >
            <Badge
              className="p-0 m-0"
              value={data.clients?.length > 0 ? data.clients?.length : 0}
              severity={data.clients?.length > 0 ? "success" : "warning"}
            />
          </i>
        </div>
        {/* {data.list_tcm.map((item, index) => (
                    <div>
                         Aquí puedes poner el contenido que quieras para cada elemento de data.list_tcm 
                    </div>
                ))} */}
      </div>
    );
  };

  return (
    <Dialog
      header={`List tcm `}
      visible={true}
      maximizable
      resizable
      style={{ width: "95vw" }}
      onHide={() => closed()}
      footer={footerContent}
    >
      <div className="m-0">
        {/* TODO: esto va en un dialog */}
        {/* <QAClients active={active} relad={relad} listClient={selectedClientList} /> */}
        <DataTable
          value={listtcm}
          // onRowClick={onInfo}
          paginator
          showGridlines
          // stripedRowsss
          selectionMode="single"
          rows={10}
          loading={loading}
          dataKey="id"
          filters={filters}
          // filterDisplay="row"
          //globalFilterFields={['last_name', 'first_name', 'dob', 'medicaid', 'medicare', 'ss', 'phone']}
          //header={header}
          sortMode="multiple"
          emptyMessage="No customers found."
        >
          <Column field="info.fullname" header="Full Name" sortable />
          <Column field="info.email" header="Email" sortable />
          <Column field="id" header="Clients" body={Clients} />

          {/* <Column field="first_name" header="First Name" sortable />
                    <Column field="id" header="MR #" sortable />
                    <Column field="dob" header="DOB" sortable />
                    <Column field="medicaid" header="Medica ID" sortable />
                    <Column field="medicare" header="Medicare" sortable />
                    <Column field="ss" header="SS" sortable />
                    <Column field="phone" header="Phone" /> */}
          {/* <Column field="dob" header="Admission" body={Services} /> */}
        </DataTable>
      </div>

      <ScrollTop
        target="parent"
        pt={{
          root: { className: "bg-orange-400" },
        }}
      />
      {showQAClients && (
        <Dialog
          header="QAClients"
          visible={showQAClients}
          maximizable
          resizable
          style={{ width: "95vw" }}
          onHide={() => setShowQAClients(false)}
        >
          <QAClients
            active={active}
            relad={relad}
            listClient={selectedClientList}
          />
        </Dialog>
      )}
    </Dialog>
  );
};
type Props = {
  active?: Active;
  show?: boolean;
  listtcm?: TcmLits[] | undefined;

  relad(): void;
  closed(): void;
};
export { LisTCM };
