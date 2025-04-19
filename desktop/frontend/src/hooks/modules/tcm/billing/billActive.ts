import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmNotesBill } from "../../../../models";

const useTcmBillActive = () => {
  const queryKey = ["useTcmBillActive"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/billing/`);

    const result = response.status === 200 ? await response.json() : undefined;
    return result as TcmNotesBill;
  });
  const reload = () => refetch({ queryKey });
  return { tcmBillActive: data, isLoadingTcmBillActive: isLoading, reloadTcmBillActive: reload };
};

export { useTcmBillActive };
