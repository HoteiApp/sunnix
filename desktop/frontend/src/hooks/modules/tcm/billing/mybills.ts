import { useQuery } from "react-query";
import { get } from "../../../api";
import { Billings } from "../../../../models";

const useTcmmyBills = () => {
  const queryKey = ["useTcmmyBills"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/my/billing`);

    const result = response.status === 200 ? await response.json() : undefined;
    return result as Billings;
  });
  const reload = () => refetch({ queryKey });
  return { tcmBills: data, isLoadingTcmBills: isLoading, reloadTcmBills: reload };
};

export { useTcmmyBills };
