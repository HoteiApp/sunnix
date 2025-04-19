import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesPersonalInformation } from "../../../models";
import { put } from "../../../hooks/api";

const useChangePersonalInformation = (reloadUserActive: () => void) => {
  const newData = async ({ personalInformation }: Props) => {
    const response = await put(
      "hiring/personalInformationPut",
      JSON.stringify({ personalInformation: personalInformation })
    );
    return response.json();
  };

  const { mutate: changeData, isLoading: isUpdating } = useMutation(
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

  return { changeData, isUpdating };
};
type Props = {
  personalInformation: FormValuesPersonalInformation;
};
export { useChangePersonalInformation };
