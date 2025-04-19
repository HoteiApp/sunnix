import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FromEditScmSure } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestEditSCMSure = (reloadUserActive: () => void) => {
  const newData = async ({ requestEditScmSure }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditSCMSure",
      JSON.stringify({ editSure: requestEditScmSure })
    );
    return response.json();
  };

  const { mutate: addRequestEditSure, isLoading: isUpdatingRequestEditSure } = useMutation(
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

  return { addRequestEditSure, isUpdatingRequestEditSure };
};
type Props = {
  requestEditScmSure: FromEditScmSure;
};
export { useCoreRequestEditSCMSure };
