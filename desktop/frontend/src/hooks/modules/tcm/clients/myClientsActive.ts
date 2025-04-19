import { useQuery } from "react-query";
import { get } from "../../../api";
import { Clients } from "../../../../models";
const useTCMClientsActive = () => {
  const queryKey = ["useTCMClientsActive"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/my/clientsActives");

    const clients = response.status === 200 ? await response.json() : undefined;
    return clients as Clients;
  });
  const reload = () => refetch({ queryKey });
  return { myClientsActive: data, isLoadingMyClientsActive: isLoading, reloadMyClientsActive: reload };
};

export { useTCMClientsActive };