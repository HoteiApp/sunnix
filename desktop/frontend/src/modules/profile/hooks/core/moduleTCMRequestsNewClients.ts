import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Requests } from "../../../../models";

const useCoreRequestsNewClients = () => {
  const queryKey = ["useCoreRequestsNewClients"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/clients/requestNewClients");

    const request =
      response.status === 200 ? await response.json() : undefined;

    return request as Requests;
  });
  const reloadRequestsNewClients = () => refetch({ queryKey });
  return { requestsNewClients: data, isLoading, reloadRequestsNewClients };
};

export { useCoreRequestsNewClients };