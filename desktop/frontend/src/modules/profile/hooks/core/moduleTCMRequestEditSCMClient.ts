import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
  displayNotificationWarning,
} from "../../../../utils";
import { FormRequestEditClient, FromEditScmSure, FormEditMedical, FormEditMental } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestEditSCMClient = (reloadUserActive: () => void) => {
  // const newData = async ({ requestEditClient, requestEditScmSure, requestEditScmMedical, requestEditScmMental }: Props) => {
  const newData = async ({ requestEditClient, requestEditScmMedical, requestEditScmMental }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditSCMClient",
      JSON.stringify({ editClient: requestEditClient, editMedical: requestEditScmMedical, editMental: requestEditScmMental })
      // JSON.stringify({ editClient: requestEditClient, editSure: requestEditScmSure, editMedical: requestEditScmMedical, editMental: requestEditScmMental })
    );
    return response.json();
  };

  const { mutate: addRequestEditClient, isLoading: isUpdatingRequestEditClient } = useMutation(
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

  return { addRequestEditClient, isUpdatingRequestEditClient };
};
type Props = {
  requestEditClient: FormRequestEditClient;
  // requestEditScmSure: FromEditScmSure;
  requestEditScmMedical: FormEditMedical;
  requestEditScmMental: FormEditMental;
};
export { useCoreRequestEditSCMClient };
