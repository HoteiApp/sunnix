import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../../hooks/api";

const useDelReqClient = (reloadUserActive: () => void) => {
  const newData = async ({ id }: Props) => {
    const response = await remove(
      `module/tcm/clients/delnewreqclient/${id}`
    );
    return response.json();
  };

  const { mutate: delNewClientReq, isLoading: isUpdatingDelNewClientReq } = useMutation(
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

  return { delNewClientReq, isUpdatingDelNewClientReq };
};
type Props = {
  id: number;
};
export { useDelReqClient };
