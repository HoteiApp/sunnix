import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { SCM } from "../../../../models";

const useServiceSCMactive = ({ id }: Props) => {
  const queryKey = ["useServiceSCMcliente", id];

  const { data, isLoading, error, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/clients/service/SCMactive/${id}`);
    const service = response.status === 200 ? await response.json() : undefined;
    return service as SCM;
  });

  const reloadServiceSCMactive = () => refetch();

  return { ServiceSCMactive: data, isLoading, error, reloadServiceSCMactive };
};

type Props = { id: string }

export { useServiceSCMactive };
