import { Routes, Route, Navigate } from "react-router-dom";
// import { NotFoundView } from "./views/components";
import { ProfileView } from "./views/GlobalView";
import { Logout } from "./modules/auth";
import { Active } from "./models";

const RoutesContainer = ({ activeUser, isLoading, reloadActiveUser }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<ProfileView activeUser={activeUser} isLoading={isLoading} reloadActiveUser={reloadActiveUser} />} />
      <Route path="logout" element={<Logout />} />
      <Route path="*" element={<Navigate to={"/portfolio"} />} />
    </Routes>
  );
};
type Props = {
  activeUser?: Active;
  isLoading?: boolean;
  reloadActiveUser(): void;
};
export { RoutesContainer };
