import { get } from "../../../api";
import { ClientNotes } from "../../../../models";

// const useClientNotes = ({ id }: Props) => {
//   const queryKey = ["useCoreClientNotes"];

//   const { data, isLoading, refetch } = useQuery(queryKey, async () => {
//     const response = await get(`module/tcm/notes/notes/${id}`);

//     const userNotes = response.status === 200 ? await response.json() : undefined;
//     return userNotes as ClientNotes;
//   });
//   const reloadClientNotes = () => refetch({ queryKey });
//   return { clientNotes: data, isLoading, reloadClientNotes };
// };
const useClientNotes = () => {
  // Resto del código
  const tcmClientNotes = async ({ id }: Props) => {
    const response = await get(`module/tcm/notes/notes/${id}`);
    const result = response.status === 200 ? await response.json() : undefined;
    return result as ClientNotes;
  };

  return { tcmClientNotes };
};
type Props = {
  id: string | undefined
}

export { useClientNotes };
