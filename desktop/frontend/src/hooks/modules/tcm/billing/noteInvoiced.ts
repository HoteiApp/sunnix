import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

interface InvoiceProps {
  id: number;
  invoiced: boolean;
  invoice: string;
}

const useNoteInvoiced = (reload: () => void) => {
  const updateInvoiceStatus = async ({ id, invoiced, invoice }: InvoiceProps) => {
    try {
      const response = await post("module/tcm/billing/invoiced",
        JSON.stringify({
          id,
          invoiced,
          invoice,
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

export { useNoteInvoiced };
