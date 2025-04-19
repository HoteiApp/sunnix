import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesEducation } from "../../../models";
import { put } from "../../../hooks/api";

const useChangeEducation = (reloadUserActive: () => void) => {
  const newData = async ({ education }: Props) => {
    const response = await put(
      "hiring/educationPut",
      JSON.stringify({ education: education })
    );
    return response.json();
  };

  const { mutate: changeDataEducation, isLoading: isUpdatingEducation } = useMutation(
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

  return { changeDataEducation, isUpdatingEducation };
};
type Props = {
  education: FormValuesEducation;
};
export { useChangeEducation };
