import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../api";

interface Props {
  id: number;
  number: string;
}

const useBillApprove = (reload: () => void) => {
  const updateBillStatus = async ({ id, number }: Props) => {
    try {
      const response = await post(
        "module/tcm/billing/approve",
        JSON.stringify({ id, number })
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return useMutation(updateBillStatus, {
    onError: displayNotificationError,
    onSuccess: (data) => {
      displayNotificationSuccess(data.message);
      reload();
    }
  });
};

export { useBillApprove };
