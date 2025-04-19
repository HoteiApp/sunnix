import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../../hooks/api";

const useMySignature = (reloadUserActive: () => void) => {
  const newData = async ({ signature, singSupervisor, singQa }: Props) => {
    const response = await post(
      "my/signature",
      JSON.stringify({ sign: signature, singSupervisor, singQa })
    );
    return response.json();
  };

  const { mutate: addSign, isLoading: isUpdatingSign } = useMutation(
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

  return { addSign, isUpdatingSign };
};
type Props = {
  signature: string;
  singSupervisor: boolean;
  singQa: boolean;
};
export { useMySignature };
