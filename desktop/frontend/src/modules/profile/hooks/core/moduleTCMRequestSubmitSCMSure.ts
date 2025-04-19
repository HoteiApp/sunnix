import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FromSubmitScmSure } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestSubmitSCMSure = (reloadUserActive: () => void) => {
  const newData = async ({ requestSubmitScmSure }: Props) => {
    const response = await post(
      "module/tcm/clients/requestSubmitSCMSure",
      JSON.stringify({ submitSure: requestSubmitScmSure })
    );
    return response.json();
  };

  const { mutate: submitEditSure, isLoading: isUpdatingRSubmitSure } = useMutation(
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

  return { submitEditSure, isUpdatingRSubmitSure };
};
type Props = {
  requestSubmitScmSure: FromSubmitScmSure;
};
export { useCoreRequestSubmitSCMSure };
