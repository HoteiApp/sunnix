import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormValueSpInitialAddendums } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestEditSCMSpInitial = (reloadUserActive: () => void) => {
  const newData = async ({ requestSP }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditSCMSpInitial",
      JSON.stringify({ editSp: requestSP })
    );
    return response.json();
  };

  const { mutate: requestEditSp, isLoading: isUpdatingRequestSp } = useMutation(
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

  return { requestEditSp, isUpdatingRequestSp };
};
type Props = {
  requestSP: FormValueSpInitialAddendums;
};
export { useCoreRequestEditSCMSpInitial };
