import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
// import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowEvent,
  DataTableValueArray,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import {
  useCoreUsersHiring,
  useCheckEmail,
  useCoreRegister,
} from "../../hooks";
import { ChangeUserPasswordDialog } from "../../../commons/ChangeUserPasswordDialog";
import { HiringProcess } from "../../../commons";
import { Toast } from "primereact/toast";
import { HiringUserinfo } from "./components";
import { Affix, message } from "antd";
import { Steps } from "primereact/steps";
import { FormValueRegister, Active } from "../../../../models";
import { MenuItem } from "primereact/menuitem";


interface Representative {
  name: string;
  image: string;
}

interface Country {
  name: string;
  code: string;
}

interface Customer {
  id: number;
  uid: string;
  email: string;
  country: Country;
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
  email: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

function randomString(length, chars) {
  var mask = "";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("#") > -1) mask += "0123456789";
  if (chars.indexOf("!") > -1) mask += "!@#$%&*()_+-={}[]:';<>?,./|\\";
  var result = "";
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

type Props = {
  relad(): void;
  active?: Active;
  // uid: string;
};

const Hiring = ({ active, relad }: Props) => {
  const { addRegister, isUpdatingRegister } = useCoreRegister(relad);
  const [showModal, setShowModal] = useState(false);
  const { usersHiring, isLoading, reloadUsersHiring } = useCoreUsersHiring();
  const [pass] = useState(randomString(32, "a#").substr(0, 10));
  const { check } = useCheckEmail();
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const toast = useRef<Toast>(null);

  const [statuses] = useState<string[]>([
    "hiring",
    "hired",
    "new",
    "negotiation",
    "renewal",
  ]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "hiring":
        return "danger";

      case "hired":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };

  const getRoll = (status: string) => {
    switch (status) {
      case "tmp":
        return "warning";

      case "HR Assistant":
        return "success";

      case "new":
        return "info";

      case "renewal":
        return null;
    }
  };

  // -----
  const [requestRegister, setRequestRegister] = useState<FormValueRegister>({
    username: "",
    password: pass,
  });

  const handleChangeFormrequestRegister = <T extends string>(
    name: keyof FormValueRegister,
    value: T
  ) => {
    setRequestRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    return requestRegister;
  };
  // -----

  useEffect(() => {
    initFilters();
  }, []);

  useEffect(() => {
    reloadUsersHiring();
  }, [relad]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    async function makeRequest() {
      if (activeIndex === 1) {
        await delay(5000);
        setActiveIndex(2);
      }
    }
    makeRequest();
  }, [activeIndex]);

  const items: MenuItem[] = [
    {
      label: "Check email",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "First Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Needed information",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "Second Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Confirmation",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "Last Step",
          detail: event.item.label,
        });
      },
    },
  ];

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showUid, setShowUid] = useState<string>("0");


  const [visible, setVisible] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const footerContent = (
    <div className="card w-full">
      <Toast ref={toast}></Toast>
      {activeIndex === 2 ? (
        <Button
          label="SAVE"
          //   icon="pi pi-save"
          pt={{
            root: { className: "bg-orange-400 p-2" },
          }}
          onClick={() => handleButtonClick()}
        />
      ) : (
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={true}
          pt={{
            root: { className: "w-30rem" },
            step: { className: "color-seconary" },
          }}
        />
      )}
    </div>
  );

  const handleButtonClick = () => {
    if (create) {
      addRegister({
        requestRegister: requestRegister,
      });
      setCreate(false);
    }
    relad();
    setVisible(false);
    setCreate(false);
    setEditEmail(true);
  };

  const showUserData = (event) => {
    setShowUid(event.data.uid);
    setShowInfo(true);
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <Affix offsetTop={44} onChange={(affixed) => console.log(affixed)}>
        <div
          className="flex justify-between items-center w-full"
          style={{ backgroundColor: "#F8F9FA" }}
        >
          <div className="flex w-1/4 items-center">
            <span className="p-input-icon-left w-full ml-2">
              <i className="pi pi-search ml-2" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
                pt={{
                  root: { className: "border-gray-400 p-3 pl-8" },
                }}
              />
            </span>
          </div>
          <div className="flex justify-end">
            {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
                        <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text /> */}
            <Button
              icon="pi pi-user-plus"
              label="Add a hire"
              onClick={() => setVisible(true)}
              text
            />
          </div>
        </div>
      </Affix>
    );
  };

  const rollBodyTemplate = (rowData: Customer) => {
    return <Tag value={rowData.roll} severity={getRoll(rowData.roll)} />;
  };

  const statusBodyTemplate = (rowData: Customer) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const activityBodyTemplate = (row: Customer) => {
    return <HiringProcess uid={row.uid} relad={relad} />;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const header = renderHeader();

  const CheckEmailF = async (e) => {
    const value = e.target.value;
    if (value.length > 6 && value.includes(".")) {
      const result = await check({ email: value });
      if (result.CREATE) {
        setEditEmail(false);
        setCreate(true);
        setMsg(result.message);
        handleChangeFormrequestRegister("username", value);
        setActiveIndex(1);
      } else {
        setCreate(false);
        setMsg(result.message);
        setActiveIndex(0);
      }
    } else {
      setEditEmail(true);
      setCreate(false);
      setMsg("You must write a valid email");
      setActiveIndex(0);
    }
  };

  return (

    <div className="card w-full mt-10">

      {/* Add Hire */}
      <Dialog
        header="Add a hire"
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <p className="m-0 text-base text-justify">
          It is necessary to check the email address to validate it against
          existing users in the system to ensure the uniqueness and security of
          the data.
          <br />
          <span className="p-input-icon-right w-full mt-8">
            {editEmail ? (
              <i className="pi pi-spin pi-spinner ml-4" />
            ) : (
              <i
                className={classNames(
                  "pi ml-4",
                  create ? "pi-check" : "pi-times"
                )}
              />
            )}

            <InputText
              placeholder="Email"
              keyfilter="email"
              onFocus={(e) => {
                setEditEmail(true);
              }}
              onBlur={(e) => {
                setEditEmail(false);
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              onChange={(e) => {
                CheckEmailF(e);
              }}
              pt={{
                root: {
                  className: classNames(
                    "border-gray-400 p-3 pl-10 w-full",
                    create
                      ? "bg-green-100"
                      : editEmail
                        ? "bg-blue-100"
                        : "bg-red-100"
                  ),
                },
              }}
            />
          </span>
          <p className="mt-4" style={{ fontSize: "16px" }}>
            {msg}
          </p>
          <br />
          {create && (
            <>
              <b className="mr-2">Initial password:</b>
              <InputText
                placeholder="Password"
                value={requestRegister.password}
                onPaste={(e) => {
                  e.preventDefault();
                }}
                onChange={(e) => {
                  handleChangeFormrequestRegister(
                    "password",
                    e.target.value
                  );
                }}
                pt={{
                  root: {
                    className: classNames(
                      "bg-green-100 border-gray-400 p-3 w-32"
                      // create ? "bg-red-100" : editEmail ? "bg-blue-100" : "bg-red-100"
                    ),
                  },
                }}
              />
              <br />
              <p className="mt-2 text-base text-justify">
                The user will be created with a temporary roll until they fill
                out the contract form. From the creation date they have 15 days
                to send their application, otherwise the system will
                automatically delete the user.
              </p>
            </>
          )}
        </p>
      </Dialog>

      {/* Aqui columnas hiring users */}
      <Dialog
        header="View user"
        visible={showInfo}
        maximizable
        style={{ width: "95vw" }}
        onHide={() => setShowInfo(false)}
        footer={
          <div className="pt-4">
            <Button
              label="Change Password"
              icon="pi pi-key"
              onClick={() => setShowModal(true)}
              className="p-button-text"
            />
          </div>
        }

      >

        <HiringUserinfo uid={showUid} />
      </Dialog>

        <ChangeUserPasswordDialog
          showModal={showModal}
          setShowModal={setShowModal}
          active={active}
          relad={relad}
          uid={showUid}
        />
      {/* Listado de users! */}
      <DataTable
        value={usersHiring?.users}
        // expandedRows={expandedRows}
        // onRowToggle={(e) => setExpandedRows(e.data)}
        // onRowExpand={onRowExpand}
        // onRowCollapse={onRowCollapse}
        // rowExpansionTemplate={showUserData}
        onRowClick={showUserData}
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
        <Column
          field="uid"
          header="Username"
        // filter
        // filterPlaceholder="Search by User"
        // style={{ minWidth: "12rem" }}
        />
        <Column
          field="email"
          header="Email"
        // filter
        // filterPlaceholder="Search by email"
        // style={{ minWidth: "12rem" }}
        />
        <Column
          field="roll"
          header="Roll"
          body={rollBodyTemplate}
        // style={{ minWidth: "12rem" }}
        />
        <Column
          field="status"
          header="Status"
        // filterMenuStyle={{ width: "2rem" }}
        // body={statusBodyTemplate}
        // filter
        // filterElement={statusFilterTemplate}
        />
        <Column
          field="global"
          header="Hiring Process"
          // showFilterMatchModes={false}
          // style={{ minWidth: "12rem" }}
          body={activityBodyTemplate}
        />
      </DataTable>

      {/* <div className="w-full border-black border-2 p-5 bg-slate-400"></div> */}
    </div>

  );
};
export { Hiring };
