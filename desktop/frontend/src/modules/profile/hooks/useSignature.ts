import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../utils";
import { post } from "../../../hooks/api";

const useSignature = (reloadUserActive: () => void) => {
  const newData = async ({ signature }: Props) => {
    const response = await post(
      "hiring/sign",
      JSON.stringify({ signature: signature })
    );
    return response.json();
  };

  const { mutate: sign, isLoading: isSign } = useMutation(
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

  return { sign, isSign };
};
type Props = {
  signature: string;
};
export { useSignature };
