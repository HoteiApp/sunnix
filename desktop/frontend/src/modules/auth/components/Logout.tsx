import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingView } from "../../../views/components";
import { useActiveUser } from "../../../hooks";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { activeUser, isLoading } = useActiveUser();
  useEffect(() => {
    if (!activeUser) {
      navigate("/login");
    }
  }, [activeUser, navigate]);
  if (isLoading) {
    return <LoadingView />;
  }
  return null;
};

export { Logout };
