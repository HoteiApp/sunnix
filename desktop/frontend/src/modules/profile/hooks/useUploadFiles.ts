import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../utils";
import { upload } from "../../../hooks/api";

const useUploadFiles = (reloadUserActive: () => void) => {
  const newData = async ({ files, tipeFile}: Props) => {
    const response = await upload(
      `hiring/upload/${tipeFile}`,
      files,
    );
    return response.json();
  };

  const { mutate: uploadFiles, isLoading: isUploadFiles } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        displayNotificationSuccess(msg.message);
        reloadUserActive();
      },
    }
  );

  return { uploadFiles, isUploadFiles };
};
type Props = {
  files: FormData;
  tipeFile: string;
};
export { useUploadFiles };
