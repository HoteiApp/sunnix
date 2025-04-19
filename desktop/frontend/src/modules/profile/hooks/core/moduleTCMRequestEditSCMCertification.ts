import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormValueCertification } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRequestEditSCMCertification = (reloadUserActive: () => void) => {
  const newData = async ({ requestCertification }: Props) => {
    const response = await post(
      "module/tcm/clients/requestEditSCMCertification",
      JSON.stringify({ editCertification: requestCertification })
    );
    return response.json();
  };

  const { mutate: requestEditCertification, isLoading: isUpdatingRequestCertification } = useMutation(
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

  return { requestEditCertification, isUpdatingRequestCertification };
};
type Props = {
  requestCertification: FormValueCertification;
};
export { useCoreRequestEditSCMCertification };
