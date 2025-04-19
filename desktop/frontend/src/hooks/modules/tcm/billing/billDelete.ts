import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { remove } from "../../../api";

interface Props {
  id: number;
}

const useBillDel = (reload: () => void) => {
  const deleteBill = async ({ id }: Props) => {
    try {
      const response = await remove(
        "module/tcm/billing/",
        JSON.stringify({ id })
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return useMutation(deleteBill, {
    onError: displayNotificationError,
    onSuccess: (data) => {
      displayNotificationSuccess(data.message);
      reload();
    }
  });
};

export { useBillDel };
