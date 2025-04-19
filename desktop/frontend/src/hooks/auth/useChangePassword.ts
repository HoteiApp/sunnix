import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationWarning,
  displayNotificationSuccess,
} from "../../utils";
import { post } from "../api";

const useChangePassword = (reloadUserActive: () => void) => {
  const newPassword = async ({ pass, current }: Props) => {
    const response = await post(
      "my/changepassword",
      JSON.stringify({ 
        password: pass,
        current: current,
       })
    );
    return response.json();
  };

  const { mutate: changePassword, isLoading: isUpdating } = useMutation(
    newPassword,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        if (msg.ok === "false"){
          displayNotificationWarning(msg.message);
        }else{
          displayNotificationSuccess(msg.message);
        }
        reloadUserActive();
      },
    }
  );

  return { changePassword, isUpdating };
};
type Props = {
  pass: string;
  current: string;
};
export { useChangePassword };
