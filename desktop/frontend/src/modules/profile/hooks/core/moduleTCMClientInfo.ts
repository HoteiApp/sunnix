import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { ClientInfo } from "../../../../models";

const useCoreClientInfo = ({ id }: Props) => {
  const queryKey = ["useCoreClientInfo"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/clients/list/${id}`);

    const userInfo = response.status === 200 ? await response.json() : undefined;
    return userInfo as ClientInfo;
  });
  const reloadClientInfo = () => refetch({ queryKey });
  return { clientInfo: data, isLoading, reloadClientInfo };
};

type Props = { id: string }

export { useCoreClientInfo };
