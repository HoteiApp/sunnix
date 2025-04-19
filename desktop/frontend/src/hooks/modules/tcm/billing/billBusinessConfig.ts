import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

interface Props {
  id: string;
  rent: number;
  business: string;
}

const useBillBusinessConfig = (reload: () => void) => {
  const updateBillBusinessConfig = async ({ id, rent, business }: Props) => {
    try {
      const response = await post(
        "module/tcm/billing/businessconfig",
        JSON.stringify({ id, rent, business })
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return useMutation(updateBillBusinessConfig, {
    onError: displayNotificationError,
    onSuccess: (data) => {
      displayNotificationSuccess(data.message);
      reload();
    }
  });
};

export { useBillBusinessConfig };
