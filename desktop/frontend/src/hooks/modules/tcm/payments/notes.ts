import { useQuery } from "react-query";
import { post } from "../../../api";
import { PaymentsAllTcmNotes } from "../../../../models";
import { number } from "yup";

const useTcmAllPaymentsTCMNotes = (id: number) => {
  const queryKey = ["useTcmAllPaymentsTCMNotes"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await post("module/tcm/payments/notes", 
      JSON.stringify({ id: id.toString() })
    );

    const result = response.status === 200 ? await response.json() : undefined;
    return result as PaymentsAllTcmNotes;
  });
  const reload = () => refetch({ queryKey });
  return { tcmAllPaymentsTcmNotes: data, isLoadingTcmAllPaymentsTcmNotes: isLoading, reloadTcmAllPaymentsTcmNotes: reload };
};

export { useTcmAllPaymentsTCMNotes };
