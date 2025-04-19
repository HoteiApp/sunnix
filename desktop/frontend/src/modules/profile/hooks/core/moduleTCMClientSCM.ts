import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { ServiceSCM } from "../../../../models";

const useCoreClientSCM = ({ id }: Props) => {
  const queryKey = ["activeUserSCM"];
  //
  const { data, isLoading, error, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/clients/scm/${id}`);
    const activeUser =
    response.status === 200 ? await response.json() : undefined;
    return activeUser as ServiceSCM;
  });
  const reloadInfoSCM = () => refetch({ queryKey });
  return { scmInfo: data, isLoading, error, reloadInfoSCM };
};

type Props = { 
  id?: string ;
}

export { useCoreClientSCM };
