import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormEventValue } from "../../../../models";
import { put } from "../../../api";

const useEventAdd = (reload: () => void) => {
  const newData = async ({ eventAdd }: Props) => {
    const response = await put(
      "my/events",
      JSON.stringify({ eventAdd: eventAdd })
    );
    return response.json();
  };

  const { mutate: addEvent, isLoading: isUpdatingAddEvent } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        displayNotificationSuccess(msg.message);
        reload();
      },
    }
  );

  return { addEvent, isUpdatingAddEvent };
};
type Props = {
  eventAdd: FormEventValue;
};
export { useEventAdd };
