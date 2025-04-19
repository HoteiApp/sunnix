import { useQuery } from "react-query";
import { post } from "../../../api";
import { PaymentsAllTcm } from "../../../../models";


const useTcmAllPaymentsTCM = (id: number) => {
  const queryKey = ["useTcmAllPaymentsTCM"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await post("module/tcm/payments/tcm", 
      JSON.stringify({ id: id.toString() })
    );

    const result = response.status === 200 ? await response.json() : undefined;
    return result as PaymentsAllTcm;
  });
  const reload = () => refetch({ queryKey });
  return { tcmAllPaymentsTcm: data, isLoadingTcmAllPaymentsTcm: isLoading, reloadTcmAllPaymentsTcm: reload };
};

export { useTcmAllPaymentsTCM };
