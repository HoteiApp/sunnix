import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Clients } from "../../../../models";

const useTCMClients = () => {
  const queryKey = ["useCoreTCMClients"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/my/clients");

    const clients = response.status === 200 ? await response.json() : undefined;
    return clients as Clients;
  });
  const reload = () => refetch({ queryKey });
  return { myClients: data, isLoadingmyClients: isLoading, reloadMyClients: reload };
};

export { useTCMClients };