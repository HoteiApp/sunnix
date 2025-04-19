import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../api";

const useNoteDel = (reload: () => void) => {
  const newData = async ({ id }: Props) => {
    const response = await remove(
      `module/tcm/notes/${id}`,
    );
    return response.json();
  };

  const { mutate: del, isLoading } = useMutation(
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

  return { delNote:del, isUpdatingDelNote: isLoading };
};
type Props = {
  id: number | string;
};
export { useNoteDel };
