import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Clients } from "../../../../models";

const useCoreQAClientsDatabase = () => {
  const queryKey = ["useCoreQAClientsDatabase"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/clients/database");

    const clients = response.status === 200 ? await response.json() : undefined;
    return clients as Clients;
  });
  const reloadMyClienst = () => refetch({ queryKey });
  return { myClients: data, isLoading, reloadMyClienst };
};

export { useCoreQAClientsDatabase };