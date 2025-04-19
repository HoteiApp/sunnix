import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FromEditScmSure } from "../../../../models";
import { put } from "../../../../hooks/api";

const useCoreRequestAddSCMSure = (reloadUserActive: () => void) => {
  const newData = async ({ requestAddScmSure }: Props) => {
    const response = await put(
      "module/tcm/clients/requestAddSCMSure",
      JSON.stringify({ addSure: requestAddScmSure })
    );
    return response.json();
  };

  const { mutate: addRequestAddSure, isLoading: isUpdatingRequestAddSure } = useMutation(
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

  return { addRequestAddSure, isUpdatingRequestAddSure };
};
type Props = {
  requestAddScmSure: FromEditScmSure;
};
export { useCoreRequestAddSCMSure };
