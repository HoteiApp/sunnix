import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmsList } from "../../../../models";

const useCoreListTCMS = () => {
  const queryKey = ["useCoreListTCMS"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/tcms/list");

    const result = response.status === 200 ? await response.json() : undefined;
    return result as TcmsList;
  });
  const reloadTCMS = () => refetch({ queryKey });
  return { tcms: data, isLoading, reloadTCMS };
};

export { useCoreListTCMS };