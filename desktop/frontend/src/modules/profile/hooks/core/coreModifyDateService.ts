import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";

import { put } from "../../../../hooks/api";

const useCoreModifyDateService = (reloadUserActive: () => void) => {
  const newData = async ({ uid, service, date }: Props) => {
    const response = await put(
      "verification/serviceModifyDate",
      JSON.stringify({ username: uid, service: service, date: date })
    );
    return response.json();
  };

  const { mutate: changeDateService, isLoading: isUpdatingDateService } = useMutation(
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

  return { changeDateService, isUpdatingDateService };
};
type Props = {
  uid: string;
  service: string;
  date: string;
};
export { useCoreModifyDateService };
