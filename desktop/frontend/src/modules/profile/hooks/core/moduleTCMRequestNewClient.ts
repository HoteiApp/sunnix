import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormRequestNewClient } from "../../../../models";
import { put } from "../../../../hooks/api";

const useCoreRequestNewClient = (reloadUserActive: () => void) => {
  const newData = async ({ requestNewClient }: Props) => {
    const response = await put(
      "module/tcm/clients/requestNewClient",
      JSON.stringify({ requestNewClient: requestNewClient })
    );
    return response.json();
  };

  const { mutate: addRequestNewClient, isLoading: isUpdatingRequestNewClient } = useMutation(
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

  return { addRequestNewClient, isUpdatingRequestNewClient };
};
type Props = {
  requestNewClient: FormRequestNewClient;
};
export { useCoreRequestNewClient };
