import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormValueRegister } from "../../../../models";
import { post } from "../../../../hooks/api";

const useCoreRegister = (reloadUserActive: () => void) => {
  const newData = async ({ requestRegister }: Props) => {
    const response = await post(
      "register",
      JSON.stringify({ requestRegister: requestRegister })
    );
    return response.json();
  };

  const { mutate: addRegister, isLoading: isUpdatingRegister } = useMutation(
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

  return { addRegister, isUpdatingRegister };
};
type Props = {
  requestRegister: FormValueRegister;
};
export { useCoreRegister };
