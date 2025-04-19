import { useMutation } from "react-query";
import {
  displayNotificationError,
  // displayNotificationSuccess,
} from "../../../utils";
import { FormValuesEmergencyMedical } from "../../../models";
import { put } from "../../../hooks/api";

const useChangeEmergencyMedical = (reloadUserActive: () => void) => {
  const newData = async ({ emergencyMedical }: Props) => {
    const response = await put(
      "hiring/emergencyMedicalPut",
      JSON.stringify({ emergencyMedical: emergencyMedical })
    );
    return response.json();
  };

  const { mutate: changeDataEmergencyMedical, isLoading: isUpdatingEmergencyMedical } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        // displayNotificationSuccess(msg.message);
        reloadUserActive();
      },
    }
  );

  return { changeDataEmergencyMedical, isUpdatingEmergencyMedical };
};
type Props = {
  emergencyMedical: FormValuesEmergencyMedical;
};
export { useChangeEmergencyMedical };
