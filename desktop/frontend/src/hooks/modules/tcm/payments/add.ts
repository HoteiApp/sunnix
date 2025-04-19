import { put } from "../../../api";
import { useMutation } from "react-query";

const useTcmAddPayments = (reloadUserActive: () => void) => {
  const newData = async () => {
    const response = await put(
      "module/tcm/payments/add",
    );
    return response.json();
  };

  return useMutation(
    newData,
    {
      onError: (error: Error) => {
        // displayNotificationError(error);
      },
      onSuccess: (msg) => {
        // displayNotificationSuccess(msg.message);
        reloadUserActive();
      },
    }
  );

  // return { addBill, isUpdatingAddBill };
};

export { useTcmAddPayments };
