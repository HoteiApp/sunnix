import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";

import { post } from "../../../../hooks/api";
import { FormValueAssessment } from "../../../../models";

const useCoreRequestEditSCMAssessment = (reloadUserActive: () => void) => {
  const newData = async ({ requestAssessment }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditSCMAssessment",
      JSON.stringify({ editAssessment: requestAssessment })
    );
    return response.json();
  };

  const { mutate: requestEditAssessment, isLoading: isUpdatingRequestAssessment } = useMutation(
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

  return { requestEditAssessment, isUpdatingRequestAssessment };
};
type Props = {
  requestAssessment: FormValueAssessment;
};
export { useCoreRequestEditSCMAssessment };
