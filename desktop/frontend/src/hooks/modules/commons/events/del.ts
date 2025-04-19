import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../api";

const useEventDel = (reload: () => void) => {
  const newData = async ({ id }: Props) => {
    const response = await remove(
      "my/events",
      JSON.stringify({ id: id })
    );
    return response.json();
  };

  const { mutate: delEvent, isLoading: isUpdatingDelEvent } = useMutation(
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

  return { delEvent, isUpdatingDelEvent };
};
type Props = {
  id: number;
};
export { useEventDel };
