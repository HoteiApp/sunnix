import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { NotFoundView } from "./views/components";

import { LoginFormContiner } from "./views/login";

import { useActiveUser } from "./hooks";

const LoginRoute: React.FC = () => {
  const { activeUser, reloadActiveUser } = useActiveUser();

  return (
    <Routes>
      {!activeUser && <Route path="/login" element={<LoginFormContiner relad={reloadActiveUser} />} />}
      <Route path="/" element={<Navigate to={"portfolio"} />} />
      <Route path="portfolio/*" element={<AppLayout activeUser={activeUser} reloadActiveUser={reloadActiveUser}/>} />
      <Route path="*" element={<NotFoundView />} />
      {/* <Route path="*" element={<Navigate to={"portfolio"} />} /> */}
    </Routes>
  );
};

export { LoginRoute };
