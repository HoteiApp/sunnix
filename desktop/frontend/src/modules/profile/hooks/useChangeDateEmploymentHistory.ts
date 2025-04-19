import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesEmploymentHistory } from "../../../models";
import { put } from "../../../hooks/api";

const useChangeEmploymentHistory = (reloadUserActive: () => void) => {
  const newData = async ({ employmentHistory }: Props) => {
    const response = await put(
      "hiring/employmentHistoryPut",
      JSON.stringify({ employmentHistory: employmentHistory })
    );
    return response.json();
  };

  const { mutate: changeDataEmploumentHistory, isLoading: isUpdatingEmploumentHistory } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        // displayNotificationSuccess(msg.message);
        reloadUserActive();
      },
    }
  );

  return { changeDataEmploumentHistory, isUpdatingEmploumentHistory };
};
type Props = {
  employmentHistory: FormValuesEmploymentHistory;
};
export { useChangeEmploymentHistory };
