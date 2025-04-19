import { useMutation } from "react-query";
import { post } from "../../../api";


interface PeriodProps {
  tcm: number;
  date: string;
}

const useBillTcmView = (reload: () => void) => {
  const updateInvoicePeriod = async ({ date, tcm }: PeriodProps) => {
    try {
      const response = await post("module/tcm/billing/view",
        JSON.stringify({
          date, tcm
        })
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return useMutation(updateInvoicePeriod, {
    onSuccess: (data) => {
      reload();
    }
  });
};

export { useBillTcmView };
