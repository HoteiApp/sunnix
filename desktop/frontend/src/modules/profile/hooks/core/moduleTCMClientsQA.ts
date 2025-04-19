import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Clients } from "../../../../models";

const useCoreQAClients = () => {
  const queryKey = ["useCoreQAClients"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/clients/list/all");

    const clients = response.status === 200 ? await response.json() : undefined;
    return clients as Clients;
  });
  const reloadMyClienst = () => refetch({ queryKey });
  return { myClients: data, isLoading, reloadMyClienst };
};

export { useCoreQAClients };