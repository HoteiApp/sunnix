import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../utils";
import { upload } from "../../../hooks/api";

const useUploadFilesS3 = (reloadUserActive: () => void) => {
  const newData = async ({ files, path }: Props) => {
    const response = await upload(
      `module/tcm/s3/uploadFile/${path}`,
      files,
    );
    return response.json();
  };

  const { mutate: uploadFilesS3, isLoading: isUploadFilesS3 } = useMutation(
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

  return { uploadFilesS3, isUploadFilesS3 };
};
type Props = {
  files: FormData;
  path: string;
};
export { useUploadFilesS3 };
