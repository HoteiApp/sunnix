import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { LoadingView } from "../../views/components";
import { useLogout } from "../../hooks/auth/useLogout";
import { Active } from "../../models";
import { useActiveUser } from "../../hooks";
const AuthContext = createContext<State | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { activeUser, isLoading } = useActiveUser();
  const { logout } = useLogout();
  
  const navigate = useNavigate();

  useEffect(() => {

    if (!activeUser) {
      navigate("login");
    }else{
      navigate("portfolio");
    }
  }, [activeUser]);

  const logOut = useCallback(() => {
    logout();
  }, [logout]);

  const value = useMemo(
    () => ({
      activeUser,
      logOut,
    }),
    [activeUser, logOut]
  );
  if (isLoading) {
    return <LoadingView />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
type Props = {
  children: ReactNode;
};
type State = {
  activeUser?: Active;
  logOut(): void;
};

export { AuthProvider, useAuth };
