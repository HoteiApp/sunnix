import { useQuery } from "react-query";
import { post } from "../../../api";
import { Payments } from "../../../../models";

const useTcmAllPaymentsBusiness = (id: string) => {
  const queryKey = ["useTcmAllPaymentsBusiness"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await post(`module/tcm/payments/business`,
      JSON.stringify({ id: id.toString() })
    );

    const result = response.status === 200 ? await response.json() : undefined;
    return result as Payments;
  });
  const reload = () => refetch({ queryKey });
  return { paymentsBusiness: data, isLoadingPaymentsBusiness: isLoading, reloadPaymentsBusiness: reload };
};

export { useTcmAllPaymentsBusiness };
