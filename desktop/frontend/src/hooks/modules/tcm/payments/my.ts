import { useQuery } from "react-query";
import { get } from "../../../api";
import { PaymentsAllTcm } from "../../../../models";

const useTcmMyPayments = () => {
  const queryKey = ["useTcmMyPayments"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/my/payments`);

    const result = response.status === 200 ? await response.json() : undefined;
    return result as PaymentsAllTcm;
  });
  const reload = () => refetch({ queryKey });
  return { tcmMyPayments: data, isLoadingTcmMyPayments: isLoading, reloadTcmMyPayments: reload };
};

export { useTcmMyPayments };
