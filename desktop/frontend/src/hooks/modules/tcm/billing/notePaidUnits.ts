import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";


interface InvoiceProps {
  id: number;
  paidUnits: number;
  number: string;
}

const useNotePaidUnits = (reload: () => void) => {
  const updateInvoiceStatus = async ({ id, paidUnits, number }: InvoiceProps) => {
    try {
      const response = await post("module/tcm/billing/paidUnits",
        JSON.stringify({
          id,
          paidUnits,
          number,
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

  return useMutation(updateInvoiceStatus, {
    onError: displayNotificationError,
    onSuccess: (data) => {
      displayNotificationSuccess(data.message);
      reload();
    }
  });
};

export { useNotePaidUnits };
