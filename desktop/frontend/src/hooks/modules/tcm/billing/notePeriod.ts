import { useMutation } from "react-query";
import { post } from "../../../api";

type Nullable<T> = T | null;

interface PeriodProps {
  period: Nullable<(Date | null)[]>;
}

const useNotePeriod = (reload: () => void) => {
  const updateInvoicePeriod = async ({ period }: PeriodProps) => {
    try {
      const response = await post("module/tcm/billing/period",
        JSON.stringify({
          period
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

export { useNotePeriod };
