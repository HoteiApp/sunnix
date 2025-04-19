import { post } from "../../../api";
import { ClientNotes } from "../../../../models"

const useNotesDate = () => {
  // Resto del código
  const tcmNotes = async ({ date }: Props) => {
    const response = await post('module/tcm/my/notesDate ', JSON.stringify({ date: date }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as ClientNotes;
  };
  
  return { tcmNotes };
};

type Props = {
  date: string | undefined;
};


export { useNotesDate };
