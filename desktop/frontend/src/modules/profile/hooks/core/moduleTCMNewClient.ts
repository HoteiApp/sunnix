import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { put } from "../../../../hooks/api";
import { FormNewClient, FormNewCaseManagement, FromNewScmSure } from "../../../../models";

const useNewClient = (reloadUserActive: () => void) => {
  const newData = async ({ newClient, newCaseManagement, newScmSure, data }: Props) => {
    const response = await put(
      "module/tcm/clients/add",
      JSON.stringify({ newClient: newClient, newCaseManagement: newCaseManagement, newScmSure: newScmSure, data: data })
    );
    return response.json();
  };

  const { mutate: addNewClient, isLoading: isUpdatingNewClient } = useMutation(
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

  return { addNewClient, isUpdatingNewClient };
};
type Props = {
  newClient: FormNewClient;
  newCaseManagement: FormNewCaseManagement;
  newScmSure: FromNewScmSure;
  data;
};
export { useNewClient };
