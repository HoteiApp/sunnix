import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmsNotesBill } from "../../../../models";

const useTcmBillActivesBiller = () => {
  const queryKey = ["biller-billing-actives"];

  return useQuery<TcmsNotesBill[]>({
    queryKey,
    queryFn: async () => {
      const response = await get(`module/tcm/billing/biller`);
      if (!response.ok) {
        throw new Error('Error getting TCM billing data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });
};

export { useTcmBillActivesBiller };
