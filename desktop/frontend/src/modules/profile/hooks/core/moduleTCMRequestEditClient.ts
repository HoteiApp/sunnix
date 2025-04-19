import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormRequestEditClient, FromEditScmSure, FormEditMedical, FormEditMental } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestEditClient = (reloadUserActive: () => void) => {
  const newData = async ({ requestEditClient, requestEditScmSure, requestEditScmMedical, requestEditScmMental }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditClient",
      JSON.stringify({ editClient: requestEditClient, editSure: requestEditScmSure, editMedical: requestEditScmMedical, editMental: requestEditScmMental })
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
  requestEditScmSure: FromEditScmSure;
  requestEditScmMedical: FormEditMedical;
  requestEditScmMental: FormEditMental;
};
export { useCoreRequestEditClient };
