import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

interface Props {
  id: string;
  fixedPay: boolean;
  paymentRate: number;
}

const useBillUserConfig = (reload: () => void) => {
  const updateBillUserConfig = async ({ id, fixedPay, paymentRate }: Props) => {
    try {
      const response = await post(
        "module/tcm/billing/userconfig",
        JSON.stringify({ id, fixedPay, paymentRate })
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return useMutation(updateBillUserConfig, {
    onError: displayNotificationError,
    onSuccess: (data) => {
      displayNotificationSuccess(data.message);
      reload();
    }
  });
};

export { useBillUserConfig };
