import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmNotesBill } from "../../../../models";

const useTcmNotesBill = () => {
  const queryKey = ["useTcmNotesBill"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/my/notesWeekActive/`);

    const result = response.status === 200 ? await response.json() : undefined;
    return result as TcmNotesBill;
  });
  const reload = () => refetch({ queryKey });
  return { tcmNotesBill: data, isLoadingTcmNotesBill: isLoading, reloadTcmNotesBill: reload };
};

export { useTcmNotesBill };
