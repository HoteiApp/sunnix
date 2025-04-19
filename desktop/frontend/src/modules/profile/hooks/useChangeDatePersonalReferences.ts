import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesPersonalReferences } from "../../../models";
import { put } from "../../../hooks/api";

const useChangePersonalReferences = (reloadUserActive: () => void) => {
  const newData = async ({ personalReferences }: Props) => {
    const response = await put(
      "hiring/personalReferencesPut",
      JSON.stringify({ personalReferences: personalReferences })
    );
    return response.json();
  };

  const { mutate: changeDataPersonalReferences, isLoading: isUpdatingPersonalReferences } = useMutation(
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

  return { changeDataPersonalReferences, isUpdatingPersonalReferences };
};
type Props = {
  personalReferences: FormValuesPersonalReferences;
};
export { useChangePersonalReferences };
