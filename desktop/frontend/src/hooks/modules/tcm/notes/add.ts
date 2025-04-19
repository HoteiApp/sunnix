import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormValueNotes } from "../../../../models";
import { put } from "../../../api";

const useNotesAdd = (reloadUserActive: () => void) => {
  const newData = async ({ notesAdd }: Props) => {
    const response = await put(
      "module/tcm/notes/",
      JSON.stringify({ notesAdd: notesAdd })
    );
    return response.json();
  };

  const { mutate: addNotes, isLoading: isUpdatingAddNotes } = useMutation(
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

  return { addNotes, isUpdatingAddNotes };
};
type Props = {
  notesAdd: FormValueNotes;
};
export { useNotesAdd };
