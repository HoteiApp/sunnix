import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationWarning,
  displayNotificationSuccess,
} from "../../utils";
import { post } from "../api";

const useChangeUserPassword = (reloadUserActive: () => void) => {
  const newPassword = async ({ uid, pass }: Props) => {
    const response = await post(
      "core/changeuserpassword",
      JSON.stringify({ uid: uid, password: pass })
    );
    return response.json();
  };

  const { mutate: changeUserPassword, isLoading: isUpdatingUserPassword } = useMutation(
    newPassword,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        if (msg.ok === "false") {
          displayNotificationWarning(msg.message);
        } else {
          displayNotificationSuccess(msg.message);
        }
        reloadUserActive();
      },
    }
  );

  return { changeUserPassword, isUpdatingUserPassword };
};
type Props = {
  uid: string;
  pass: string;
};
export { useChangeUserPassword };
