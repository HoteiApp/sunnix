import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { FormValueNotes } from "../../../../models";
import { post } from "../../../api";

const useNotesEdit = (reload: () => void) => {
  const newData = async ({ id, notesEdit }: Props) => {
    const response = await post(
      "module/tcm/notes/",
      JSON.stringify({ id: id, notesEdit: notesEdit })
    );
    return response.json();
  };

  const { mutate: editNotes, isLoading: isLoadingNote } = useMutation(
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

  return { editNotes, isLoadingEditNote: isLoadingNote };
};
type Props = {
  notesEdit: FormValueNotes;
  id: string;
};
export { useNotesEdit };
