import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmSupervisionsAll } from "../../../../models";

const useTcmSupervisionsDomain = () => {
  const queryKey = ["useTcmSupervisionsDomain"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/supervisions/`);

    const supervisios = response.status === 200 ? await response.json() : undefined;
    return supervisios as TcmSupervisionsAll;
  });
  const reloadTcmSupervisionsAll = () => refetch({ queryKey });
  return { tcmSupervisiosAll: data, isLoadingTcmSupervionsAll: isLoading, reloadTcmSupervisionsAll };
};

export { useTcmSupervisionsDomain };
