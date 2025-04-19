import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

interface InvoiceProps {
  id: number;
  paid: string;
  number: string;
}

const useNotePaid = (reload: () => void) => {
  const updateInvoiceStatus = async ({ id, paid, number }: InvoiceProps) => {
    try {
      const response = await post("module/tcm/billing/paid",
        JSON.stringify({
          id,
          paid,
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

export { useNotePaid };
