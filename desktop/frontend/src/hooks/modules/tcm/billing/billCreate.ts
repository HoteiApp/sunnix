import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { put } from "../../../api";

const useBillAdd = (reloadUserActive: () => void) => {
  const newData = async () => {
    const response = await put(
      "module/tcm/billing/",
    );
    return response.json();
  };

  const { mutate: addBill, isLoading: isUpdatingAddBill } = useMutation(
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

  return { addBill, isUpdatingAddBill };
};
// type Props = {
//   notesAdd: FormValueNotes;
// };
export { useBillAdd };
