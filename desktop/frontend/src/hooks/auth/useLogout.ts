import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { displayNotificationError } from "../../utils";
import { operation } from "../api";
import { useSpeech } from "../../hooks/modules/commons/voices/speech";
const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: speech } = useSpeech();
  const LogOut = async () => {
    const response = await operation("logout");

    const resp = await response.json();
    return resp;
  };
  const { mutate: logout, isLoading } = useMutation(LogOut, {
    onError: (error: Error) => {
      displayNotificationError(error);
    },
    onSuccess: () => {
      speech({ text: "See you soon", lang: "en-EN" });
      navigate("portfolio/logout");
    },
  });

  return { logout, isLogout: isLoading };
};

export { useLogout };
