import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationWarning,
  displayNotificationSuccess,
} from "../../utils";
import { post } from "../api";

const useApprove = (reloadUserActive: () => void) => {
  const approve = async ({ uid, roll, tcms }: Props) => {
    const response = await post(
      "core/approveuser",
      JSON.stringify({ uid: uid, roll: roll, tcms: tcms })
    );
    return response.json();
  };

  const { mutate: approveUser, isLoading: isUpdatingApproveUser } = useMutation(
    approve,
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

  return { approveUser, isUpdatingApproveUser };
};
type Props = {
  uid: string;
  roll: string;
  tcms: string;
};
export { useApprove };
