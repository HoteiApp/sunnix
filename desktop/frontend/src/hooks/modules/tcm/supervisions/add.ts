import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormTcmAddSupervision } from "../../../../models";
import { put } from "../../../api";

const useTcmSupervisionsAdd = (reloadUserActive: () => void) => {
  const newData = async ({ newSupervisons }: Props) => {
    const response = await put(
      "module/tcm/supervisions/user/",
      JSON.stringify({ newSupervisons: newSupervisons })
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

  return { tcmSupervisionsAdd: mutate, loadeingtcmSupervisionsAdd: isLoading };
};
type Props = {
  newSupervisons: FormTcmAddSupervision;
};
export { useTcmSupervisionsAdd };
