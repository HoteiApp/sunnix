import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

const useTcmSupervisionsComplete = (reloadUserActive: () => void) => {
  const newData = async ({ id }: Props) => {
    const response = await post(
      "module/tcm/supervisions/complete/",
      JSON.stringify({ id: id })
    );
    return response.json();
  };

  const { mutate, isLoading } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        displayNotificationSuccess(msg.message);
        reloadUserActive();
      },
    }
  );

  return { tcmSupervisionActive: mutate, tcmSupervisionActiveLoading: isLoading };
};
type Props = {
  id: string;
};
export { useTcmSupervisionsComplete };
