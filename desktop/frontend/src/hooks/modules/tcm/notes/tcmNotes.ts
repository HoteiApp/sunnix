import { useQuery } from "react-query";
import { get } from "../../../api";
import { ClientNotes } from "../../../../models";

const useTcmNotes = () => {
  const queryKey = ["useCoreClientNotes"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/my/notes`);

    const userNotes = response.status === 200 ? await response.json() : undefined;
    return userNotes as ClientNotes;
  });
  const reloadTcmNotes = () => refetch({ queryKey });
  return { tcmNotes: data, isLoading, reloadTcmNotes };
};

// type Props = { id: string }

export { useTcmNotes };
