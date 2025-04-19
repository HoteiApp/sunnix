import { post } from "../../../api";
import { useMutation } from "react-query";

import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";

const useTcmSupervisionsChangeDate = (reloadUserActive: () => void) => {
  const newData = async ({ id, date }: Props) => {
    const response = await post(
      "module/tcm/supervisions/user/",
      JSON.stringify({ id: id, date: date })
    );
    return response.json();
  };

  const { mutate, isLoading } = useMutation(
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

  return { tcmSupervisionsChangeDate: mutate, loadingTcmSupervisionsChangeDate: isLoading };
};
type Props = {
  id: string | undefined;
  date: string | undefined;
};


export { useTcmSupervisionsChangeDate };
