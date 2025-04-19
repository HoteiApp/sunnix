import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Tcms } from "../../../../models";

const useCoreTCMS = () => {
  const queryKey = ["useCoreTCMS"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/tcms/all");

    const result = response.status === 200 ? await response.json() : undefined;
    return result as Tcms;
  });
  const reloadTCMS = () => refetch({ queryKey });
  return { tcms: data, isLoading, reloadTCMS };
};

export { useCoreTCMS };