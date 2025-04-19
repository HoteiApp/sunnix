import { useQuery } from "react-query";
import { get } from "../../../api";
import { Payments } from "../../../../models";

const useTcmAllPayments = () => {
  const queryKey = ["useTcmAllPayments"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/payments/all`);

    const result = response.status === 200 ? await response.json() : undefined;
    return result as Payments;
  });
  const reload = () => refetch({ queryKey });
  return { tcmAllPayments: data, isLoadingTcmAllPayments: isLoading, reloadTcmAllPayments: reload };
};

export { useTcmAllPayments };
