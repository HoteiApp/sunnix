import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmsNotesBill } from "../../../../models";

const useTcmBillActivesTcm = () => {
  const queryKey = ["tcm-billing-actives"];

  return useQuery<TcmsNotesBill[]>({
    queryKey,
    queryFn: async () => {
      const response = await get(`module/tcm/billing/tcms`);
      if (!response.ok) {
        throw new Error('Error getting TCM billing data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });
};

export { useTcmBillActivesTcm };
