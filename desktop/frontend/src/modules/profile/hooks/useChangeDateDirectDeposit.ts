import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesDirectDeposit } from "../../../models";
import { put } from "../../../hooks/api";

const useChangeDirectDeposit = (reloadUserActive: () => void) => {
  const newData = async ({ directDeposit }: Props) => {
    const response = await put(
      "hiring/directDepositPut",
      JSON.stringify({ directDeposit: directDeposit })
    );
    return response.json();
  };

  const { mutate: changeDataDirectDeposit, isLoading: isUpdatingDirectDeposit } = useMutation(
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

  return { changeDataDirectDeposit, isUpdatingDirectDeposit };
};
type Props = {
  directDeposit: FormValuesDirectDeposit;
};
export { useChangeDirectDeposit };
