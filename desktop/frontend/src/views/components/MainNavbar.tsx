import { useRef, useState, useEffect } from "react";
import { faCog, faCogs, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

import { classNames } from "primereact/utils";

// import { Sidebar } from "primereact/sidebar";
// import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Settings } from "../../modules/commons";

import user from "../../images/user.png";
import logo from "../../images/LogoSunnix.png";
import { useAuth } from "../../modules/auth/AuthProvider";
import { ChangePasswordDialog } from "../../modules/commons/ChangePasswordDialog";

// import { Chat } from "../../modules/commons/component/chat";
// -- New Struct
import { Active } from "../../models";
// import { profile } from "console";

const MainNavbar = ({ active, relad }: Props) => {
  // const location = useLocation();
  // const match = location.pathname.includes("configuracion");
  // const [selected, setSelected] = useState("0");
  const [showModal, setShowModal] = useState(false);
  // const [visibleRight, setVisibleRight] = useState(false);
  // const [visibleLeft, setVisibleLeft] = useState(false);
  
  const [showModalProfile, setShowModalProfile] = useState(false);
  const menu = useRef<any>(null);
  // const menuModules = useRef<any>(null);

  // Command
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const viewProfile = () => {
    navigate("/portfolio");
  };

  const items = [
    // {
    //   label: "Dashboard",
    //   icon: <i className="pi pi-th-large mr-3" />,
    //   command: viewProfile,
    // },
    {
      label: "Change Password",
      icon: <i className="pi pi-key mr-3" />,
      command: () => setShowModal(true),
    },
    // {
    //   label: "Signature Options",
    //   icon: (
    //     <i
    //       className={classNames(
    //         "pi pi-pencil mr-3",
    //         active?.activeUser?.User?.roll === "tmp" && "text-gray-200"
    //       )}
    //     />
    //   ),
    //   command: () => setShowModalSignature(true),
    // },
    {
      label: "Settings",
      disabled: active?.activeUser?.User?.roll === "tmp",
      icon: <FontAwesomeIcon icon={faCog} className="mr-3" />,
      command: () => setShowModalProfile(true),
    },
    {
      label: "Logout",
      icon: <FontAwesomeIcon icon={faSignOut} className="mr-3" />,
      command: () => logOut(),
    },
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

  const greetingText = active?.activeUser?.Record?.fullname
    ? active.activeUser.Record.fullname.split(" ")[0].toUpperCase() // Tomar la primera palabra
    : active?.activeUser?.User?.nick?.toUpperCase() || ""; // Usar el nick si no hay fullname


  useEffect(() => {
    if (active?.activeUser?.User?.change_password) {
      setShowModal(true);
    }
  }, [active]);

  return (
    <div
      className={classNames(
        // active?.activeUser?.User?.roll === "TCM"
        //   ? "bg-secondary"
        //   : "bg-primary",
        "bg-secondary fixed",
        "text-white w-full h-12 flex items-center z-10"
      )}
    >
      <div className="w-full flex h-16">
        <div className="w-1/5 flex items-center bg-gray-200" style={{ borderTopRightRadius: "95%" }}>
          <span
            className={classNames(
              "mt-1 mr-4 flex items-center p-2"
            )}
          >
            <div className="w-48 z-20 flex items-center text-primary">
              <img src={logo} alt="Logo" className="w-44 h-16" />
            </div>
          </span>
        </div>
        <div className={classNames(
          "flex flex-1 w-4/5 h-14 justify-end pr-5 items-center",
          "bg-primary",
        )}
          style={{ borderTopLeftRadius: "100%" }}
        >
          {/* {active?.activeUser?.User?.roll !== "tmp" && <Button
            icon="pi pi-comments"
            pt={{ icon: { className: "pl-1" } }}
            //onClick={() => setVisibleRight(true)}
            onClick={() => setVisibleLeft(true)}
            className="m-4 bg-transparent"
            rounded
          />}
          <Sidebar
            visible={visibleLeft}
            position="right"
            onHide={() => setVisibleLeft(false)}
            header={headerChatList}
            closeOnEscape
            pt={{
              header: { className: "bg-secondary w-full p-0 m-0" },
              icons: { className: "text-white p-0 m-0" },
              closeIcon: { className: "pi-spin mr-4" },
            }}
          >
            <Chat active={active} relad={relad} />
          </Sidebar> */}
          {/* <FontAwesomeIcon
          icon={faUserLock}
          className="mr-4 "
          title="Change password"
          onClick={() => setShowModal(true)}
        /> */}
          <div
            className="flex items-center justify-center cursor-pointer w-10  rounded-full"
            onClick={(event) => menu?.current?.toggle(event)}
          >
            <div className="flex ease-in-out">
              <span className="sr-only">Open user menu</span>
              <img src={active?.activeUser?.Avatar === "" ? user : active?.activeUser?.Avatar} alt={""} className="rounded-full mt-1" />
            </div>

            <Menu
              className="ml-3"
              popup
              model={items}
              ref={menu}
              style={{ width: "230px" }}
            />
          </div>
          <div className="pl-2">
            HI, {greetingText}
          </div>
        </div>
      </div>

      <ChangePasswordDialog
        showModal={showModal}
        setShowModal={setShowModal}
        active={active}
        relad={relad}
      />
      
      <Dialog header="Settings" visible={showModalProfile} maximizable style={{ width: '75vw' }} onHide={() => { if (!showModalProfile) return; setShowModalProfile(false); }}>
        <Settings active={active} relad={relad} />
      </Dialog>
    </div>
  );
};
type Props = {
  active?: Active;
  relad(): void;
};
export { MainNavbar };
