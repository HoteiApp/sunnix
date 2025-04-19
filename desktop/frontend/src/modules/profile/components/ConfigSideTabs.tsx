import {
  faBell,
  faPaintBrush,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideTab } from "./SideTab";

const ConfigSideTabs = () => {
  return (
    <div className="w-1/4 border-r-2 p-1">
      <SideTab
        label="Informaci&oacute;n visible de su perfil p&uacute;blico"
        icon={<FontAwesomeIcon icon={faUser} className="text-gray-400" />}
        onClick={() => {}}
      />
      <SideTab
        label="Apariencia"
        icon={<FontAwesomeIcon icon={faPaintBrush} className="text-gray-400" />}
        onClick={() => {}}
      />
      <SideTab
        label="Notificaciones"
        icon={<FontAwesomeIcon icon={faBell} className="text-gray-400" />}
        onClick={() => {}}
      />
      <SideTab
        label="Seguridad y autenticacíon"
        icon={<FontAwesomeIcon icon={faUserShield} className="text-gray-400" />}
        onClick={() => {}}
      />
    </div>
  );
};

export { ConfigSideTabs };
