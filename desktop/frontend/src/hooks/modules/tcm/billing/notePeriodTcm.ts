import { useMutation } from "react-query";
import { post } from "../../../api";

type Nullable<T> = T | null;

interface PeriodProps {
  period: Nullable<(Date | null)[]>;
  id: string;
}

const useNotePeriodTcm = (reload: () => void) => {
  const updateInvoicePeriod = async ({ period, id }: PeriodProps) => {
    try {
      const response = await post("module/tcm/billing/periodTcm",
        JSON.stringify({
          period, id
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

export { useNotePeriodTcm };
