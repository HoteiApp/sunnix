import { useState } from 'react';
import { useAuth } from "../modules/auth/AuthProvider";
// PrimeReact
import { Dock } from 'primereact/dock';
import { Sidebar } from "primereact/sidebar";
import { Tooltip } from 'primereact/tooltip';


import { ProfileData } from "../modules/profile/components/ProfileData";
import { MainNavbar } from "./components";
import { Banner } from "./components/Banner";

import { LoadingView, NavbarLink, SecundNavbar } from "./components";
import { Chat } from "../modules/commons/component/chat";
import { NotificationPanel } from "../modules/commons";
// --Views Qa
import { QaDashboard } from "../modules/qa/Dashboard";

// --Views Finance
import { FinanceDashboard } from "../modules/finance/Dashboard";
import { PaymentsFinance } from "../modules/finance/payments/payments";

// --Views Billing
import { BillerDashboard } from "../modules/biller/Dashboard";
import { BillingBiller } from "../modules/tcm/billing/billingBiller";
import { BillingBillerDetails } from "../modules/tcm/billing/billingBillerDetails";

// --Views TCMS
import { TcmsDashboard } from "../modules/tcms/Dashboard";
import { BillingTCMS } from "../modules/tcm/billing/billingTcms";
import { Business } from "../modules/tcms/components";

// --Views TCM
import { TCMDashboard } from "../modules/tcm/tcm/Dashboard";
import { TCMClients } from "../modules/tcm/tcm/Clients";
import { Supervisions } from "../modules/tcm/supervisions/Supervisions";
import { Billing } from "../modules/tcm/billing/billing";
import { Payroll } from "../modules/tcm/payroll/payroll";


import { SupClients, SupTCM, Tree } from '../modules/profile/components/supervisor';
import { QATcms } from "../modules/profile/components/qa/qaTcms";

import { Section1, Section2 } from "../modules/profile/components/hiring";

import { Hiring, Applications, Workers } from "../modules/profile/components/hr";

import { QARequestsClients, QAClients, DataBaseClients } from "../modules/profile/components/qa";

import { Active } from "../models";
import { HrDashboard } from '../modules/hr/Dashboard';

const ProfileView = ({ activeUser, isLoading, reloadActiveUser }: Props) => {
  const { logOut } = useAuth();
  // const { activeUser, activeUser, reloadActiveUser } = useActiveUser();
  const [visibleChat, setVisibleChat] = useState(false);
  const [selected, setSelected] = useState("1");
  // -----
  
  const itemsDock = [
    {
      label: 'Chat',
      icon: () => <i
        className='pi pi-comments text-primary hover:text-secondary hover:animate-pulse' style={{ fontSize: '2rem' }}
      />,
      command: () => {
        setVisibleChat(true);
      }
    },
    {
      label: 'Logout',
      icon: () => <i className='pi pi-sign-out text-primary hover:text-secondary' style={{ fontSize: '2rem' }} />,
      command: () => {
        logOut();
      }
    }

  ];
  
  const headerChatList = () => {
    return (
      <div className="w-full p-3  align-items-center bg-secondary">
        <h2
          className="text-left font-bold text-lg"
          style={{ backgroundColor: "#fab710", color: "#ffff" }}
        >
          <i className="pi pi-comments"></i> Suniss-Chat
        </h2>
      </div>
    );
  };

  // -----
  const hiring = [
    <NavbarLink
      id="1"
      label="Application"
      icon="pencil"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Documents and other information"
      icon="paperclip"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    // <NavbarLink
    //   id="3"
    //   label="tmp"
    //   // icon="microsoft"
    //   selected={selected}
    //   onClick={() => setSelected("3")}
    // />,
  ];

  const devops = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Hirings"
      icon="file-edit"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="Applications"
      icon="check-square"
      selected={selected}
      onClick={() => setSelected("3")}
    />,
    <NavbarLink
      id="4"
      label="Staff"
      icon="users"
      selected={selected}
      onClick={() => setSelected("4")}
    />,
  ];

  const hr = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Hirings"
      icon="file-edit"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="Applications"
      icon="check-square"
      selected={selected}
      onClick={() => setSelected("3")}
    />,
    <NavbarLink
      id="4"
      label="Staff"
      icon="users"
      selected={selected}
      onClick={() => setSelected("4")}
    />,
  ];

  const qa = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Clients"
      icon="users"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="Business"
      icon="building-columns"
      selected={selected}
      onClick={() => setSelected("3")}
    />,
    <NavbarLink
      id="4"
      label="New Clients Requested"
      icon="users"
      selected={selected}
      onClick={() => setSelected("4")}
    />,
    <NavbarLink
      id="6"
      label="Database"
      icon="database"
      selected={selected}
      onClick={() => setSelected("6")}
    />,
    // <NavbarLink
    //   id="6"
    //   label="Supervisions"
    //   icon="check-circle"
    //   selected={selected}
    //   onClick={() => setSelected("6")}
    // />,
    // <NavbarLink
    //   id="7"
    //   label="Tree"
    //   icon="sitemap"
    //   selected={selected}
    //   onClick={() => setSelected("7")}
    // />
  ]

  const finance = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Business"
      icon="building-columns"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="All Billings"
      icon="list-check"
      selected={selected}
      onClick={() => setSelected("3")}
    />,
    <NavbarLink
      id="5"
      label="PayRoll"
      icon="dollar"
      selected={selected}
      onClick={() => setSelected("5")}
    />,
  ]

  const biller = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Business Billing"
      icon="building-columns"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="All billings"
      icon="list-check"
      selected={selected}
      onClick={() => setSelected("3")}
    />
  ]

  const tcms = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="TCM"
      icon="graduation-cap"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="All Clients"
      icon="users"
      selected={selected}
      onClick={() => setSelected("3")}
    />,

    <NavbarLink
      id="4"
      label="New Client Requested"
      icon="user-plus"
      selected={selected}
      onClick={() => setSelected("4")}
    />,

    <NavbarLink
      id="5"
      label="My Clients"
      icon="users"
      selected={selected}
      onClick={() => setSelected("5")}
    />,

    <NavbarLink
      id="6"
      label="Billing Review"
      icon="bitcoin"
      selected={selected}
      onClick={() => setSelected("6")}
    />,
    <NavbarLink
      id="7"
      label="My Billing"
      icon="bitcoin"
      selected={selected}
      onClick={() => setSelected("7")}
    />,
    <NavbarLink
      id="8"
      label="Supervisions"
      icon="file-check"
      selected={selected}
      onClick={() => setSelected("8")}
    />,
    <NavbarLink
      id="9"
      label="Payments"
      icon="dollar"
      selected={selected}
      onClick={() => setSelected("9")}
    />,
    // <NavbarLink
    //   id="4"
    //   label="Reviews"
    //   icon="check-circle"
    //   selected={selected}
    //   onClick={() => setSelected("4")}
    // />,
  ]

  const tcm = [
    <NavbarLink
      id="1"
      label="Diary"
      icon="sun animate-blink"
      selected={selected}
      onClick={() => setSelected("1")}
    />,
    <NavbarLink
      id="2"
      label="Clients"
      icon="users"
      selected={selected}
      onClick={() => setSelected("2")}
    />,
    <NavbarLink
      id="3"
      label="Supervisions"
      icon="file-check"
      selected={selected}
      onClick={() => setSelected("3")}
    />,
    <NavbarLink
      id="4"
      label="Billing"
      icon="bitcoin"
      selected={selected}
      onClick={() => setSelected("4")}
    />,
    <NavbarLink
      id="5"
      label="Payments"
      icon="dollar"
      selected={selected}
      onClick={() => setSelected("5")}
    />,

  ]
  // -- Global Tabs  
  const tabs = [
    <NavbarLink
      id="102"
      label="Notifications"
      icon="bell"
      selected={selected}
      onClick={() => setSelected("102")}
    />,
  ];

  let tabsHiring = [...tabs];
  if (activeUser?.activeUser?.User?.status === "hiring") {
    tabsHiring = [...hiring];
  }
  
  const tabsDevops = [...hr, ...tabs];
  const tabsHr = [...hr, ...tabs];
  const tabsQa = [...qa, ...tabs];
  const tabsFinance = [...finance, ...tabs];
  const tabsBiller = [...biller, ...tabs];
  const tabsTcm = [...tcm, ...tabs];
  const tabsSUP = [...tcms, ...tabs];

  if (!activeUser || isLoading) {
    return <LoadingView relad="/login" timeOut={5000} />;
  } else {
    return (
      <div className='bg-gray-50 h-full'>
        <MainNavbar active={activeUser} relad={reloadActiveUser} />
        {selected === "1" && <Banner active={activeUser} relad={reloadActiveUser} />}
        {/* HIRING */}
        {activeUser?.activeUser?.User?.roll === "tmp" && <SecundNavbar tabs={tabsHiring} />}
        {activeUser?.activeUser?.User?.roll === "tmp" && <div className="flex flex-col">
          {activeUser.activeUser.User.status === "application" ? (
            <div className="flex flex-col w-full items-start justify-start mt-4 p-4">
              <p className="m-0">
                Dear {activeUser.activeUser.Record?.fullname},
                <br /><br />
                We are pleased to inform you that your recruitment application has been successfully submitted. Now, you must wait for the corresponding approval. It is important that you regularly check the messages section in our system, as well as your email, since we will send you the answer through these channels.

                We promise to process your application as quickly as possible and will keep you informed of any important updates. We appreciate your patience and understanding during this process.

                If you have any additional questions or need more information, feel free to contact our support team. We are here to help you at all times.
                <br /><br />
                Sincerely,
                <br /><br />
                The SunissUp team
              </p>
            </div>
          ) : (
            <>
              {selected === "1" &&
                <div className="flex flex-col w-full items-start justify-start mt-4 p-4">
                  <div className="card w-full lg:card-side">
                    <div className="flex flex-col w-full lg:flex-row">
                      <div className="grid w-full">
                        <div className="card">
                          <p className="m-0">
                            <Section1 active={activeUser} relad={reloadActiveUser} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {selected === "2" &&
                <div className="flex flex-col w-full items-start justify-start mt-4 p-4">
                  <div className="card w-full lg:card-side">
                    <div className="flex flex-col w-full lg:flex-row">
                      <div className="grid w-full">
                        <div className="card">
                          <p className="m-0">
                            <Section2 active={activeUser} relad={reloadActiveUser} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          )}

        </div>
        }

        {/* Devops */}
        {activeUser?.activeUser?.User?.roll === "DEVOPS" && <SecundNavbar tabs={tabsDevops} />}
        {
          activeUser?.activeUser?.User?.roll === "DEVOPS" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <HrDashboard active={activeUser} relad={reloadActiveUser} />}
            {selected === "2" && <Hiring relad={reloadActiveUser} active={activeUser}/>}
            {selected === "3" && <Applications relad={reloadActiveUser} active={activeUser} />}
            {selected === "4" && <Workers relad={reloadActiveUser} active={activeUser}/>}
            {selected === "100" && <ProfileData active={activeUser} relad={reloadActiveUser} />}

          </div>
        }

        {/* HR */}
        {activeUser?.activeUser?.User?.roll === "HR" && <SecundNavbar tabs={tabsHr} />}
        {
          activeUser?.activeUser?.User?.roll === "HR" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <HrDashboard active={activeUser} relad={reloadActiveUser} />}
            {selected === "2" && <Hiring relad={reloadActiveUser} active={activeUser}/>}
            {selected === "3" && <Applications relad={reloadActiveUser} active={activeUser} />}
            {selected === "4" && <Workers relad={reloadActiveUser} active={activeUser}/>}
            {selected === "100" && <ProfileData active={activeUser} relad={reloadActiveUser} />}

          </div>
        }

        {/* QA */}
        {activeUser?.activeUser?.User?.roll === "QA" && <SecundNavbar tabs={tabsQa} />}
        {
          activeUser?.activeUser?.User?.roll === "QA" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <QaDashboard active={activeUser} relad={reloadActiveUser} />}
            {/* {selected === "1" && <ProfileInfo active={activeUser} />} */}
            {selected === "2" && <QAClients active={activeUser} relad={reloadActiveUser} />}
            {selected === "3" && <Business relad={reloadActiveUser} active={activeUser} />}
            {/* {selected === "3" && <QATcms relad={reloadActiveUser} />} */}
            {selected === "4" && <QARequestsClients relad={reloadActiveUser} />}
            {/* {selected === "4" && <QASupervisor relad={reloadActiveUser} />} */}
            {selected === "5" && <SupClients relad={reloadActiveUser} active={activeUser} />}
            {selected === "6" && <DataBaseClients active={activeUser} relad={reloadActiveUser} />}

            {/* {selected === "7" && <Tree relad={reloadActiveUser} active={activeUser} />} */}

            {selected === "102" && <NotificationPanel />}
          </div>
        }

        {/* FINANCE */}
        {activeUser?.activeUser?.User?.roll === "FINANCE" && <SecundNavbar tabs={tabsFinance} />}
        {
          activeUser?.activeUser?.User?.roll === "FINANCE" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <FinanceDashboard active={activeUser} relad={reloadActiveUser} />}
            {selected === "2" && <BillingBiller relad={reloadActiveUser} active={activeUser} />}
            {selected === "3" && <BillingBillerDetails relad={reloadActiveUser} active={activeUser} />}

            {selected === "5" && <PaymentsFinance relad={reloadActiveUser} active={activeUser} />}
            {selected === "102" && <NotificationPanel />}
          </div>
        }

        {/* BILLING */}
        {activeUser?.activeUser?.User?.roll === "BILLER" && <SecundNavbar tabs={tabsBiller} />}
        {
          activeUser?.activeUser?.User?.roll === "BILLER" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <BillerDashboard active={activeUser} relad={reloadActiveUser} />}
            {selected === "2" && <BillingBiller relad={reloadActiveUser} active={activeUser} />}
            {selected === "3" && <BillingBillerDetails relad={reloadActiveUser} active={activeUser} />}
            {selected === "102" && <NotificationPanel />}
          </div>
        }

        {/* TCMS */}
        {activeUser?.activeUser?.User?.roll === "TCMS" && <SecundNavbar tabs={tabsSUP} />}
        {
          activeUser?.activeUser?.User?.roll === "TCMS" && <div className="flex flex-col md:flex-row">
            {selected === "1" && <TcmsDashboard active={activeUser} relad={reloadActiveUser} />}
            {selected === "2" && <SupTCM relad={reloadActiveUser} active={activeUser} />}
            {selected === "3" && <QAClients relad={reloadActiveUser} active={activeUser} />}
            {selected === "4" && <QARequestsClients relad={reloadActiveUser} active={activeUser} />}

            {selected === "5" && <TCMClients relad={reloadActiveUser} active={activeUser} />}

            {selected === "6" && <BillingTCMS relad={reloadActiveUser} active={activeUser} />}
            {/* {selected === "4" && <SupClients relad={reloadActiveUser} active={activeUser} />} */}
            {/* {selected === "5" && <Supervisions relad={reloadActiveUser} active={activeUser} />} */}
            {/* TODO: Aqui debe de hacerse un avista comun para los que puedan ver las sulicitudes de nuevos 
              clientes, pero si el user es un supervisor solo pueda ver las solicitudes que cree uno de sus 
              tcm o las que cree el
              */}

            {selected === "7" && <Billing relad={reloadActiveUser} active={activeUser} />}
            {selected === "8" && <Supervisions relad={reloadActiveUser} active={activeUser} />}
            {selected === "9" && <Payroll relad={reloadActiveUser} active={activeUser} />}
            {selected === "102" && <NotificationPanel />}
          </div>
        }

        {/* TCM */}
        {activeUser?.activeUser?.User?.roll === "TCM" && <SecundNavbar tabs={tabsTcm} />}
        {
          activeUser?.activeUser?.User?.roll === "TCM" && <div className="flex flex-col md:flex-row">
            {selected === "1" &&
              <TCMDashboard active={activeUser} relad={reloadActiveUser} />
            }
            {selected === "2" && <TCMClients relad={reloadActiveUser} active={activeUser} />}
            {selected === "3" && <Supervisions relad={reloadActiveUser} active={activeUser} />}
            {selected === "4" && <Billing relad={reloadActiveUser} active={activeUser} />}
            {selected === "5" && <Payroll relad={reloadActiveUser} active={activeUser} />}

            {selected === "102" && <NotificationPanel />}
          </div>
        }
        {/* -------------------- */}
        <Sidebar
          // visible={visibleRight}
          // position="right"
          // onHide={() => setVisibleRight(false)}
          visible={visibleChat}
          position="right"
          onHide={() => setVisibleChat(false)}
          header={headerChatList}
          closeOnEscape
          // showCloseIcon={false}
          pt={{
            header: { className: "bg-secondary w-full p-0 m-0" },
            icons: { className: "text-white p-0 m-0" },
            closeIcon: { className: "pi-spin mr-4" },
          }}
        >
          <Chat active={activeUser} relad={reloadActiveUser} />
        </Sidebar>
        {/* -------------------- */}
        <div className='h-5'></div>
        <Tooltip className="dark-tooltip" target=".dock-advanced .p-dock-action" my="center bottom" at="center top" showDelay={150} />
        <div className="a dock-window z-100 dock-advanced fixed bottom-0 left-0 right-0 h-1 hover:h-auto p-0 m-0">
          {/* <Dock
            model={itemsDock}
            position={'bottom'}
            pt={{
              root: {
                className: "h-5 hover:h-auto m-0 p-0"
              },
              container: {
                className: "p-0 m-0 bg-primary animate-pulse hover:animate-none bg-opacity-100 hover:bg-opacity-0"
              },
              menu: {
                className: "m-0 p-0 h-1 opacity-0 hover:opacity-100"
              },
              menuitem: {
                className: "m-0 p-4"
              },
              action: {
                className: "m-0 p-0"
              },
              icon: {
                className: "m-0 p-0"
              }
            }}
          /> */}
        </div>
      </div>
    );
  }
};
type Props = {
  activeUser?: Active;
  isLoading?: boolean;
  reloadActiveUser(): void;
};
export { ProfileView };
