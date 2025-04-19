import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../utils";
import { upload } from "../../../hooks/api";

const useUploadAvatarS3 = (reloadUserActive: () => void) => {
  const newData = async ({ files, path }: Props) => {
    const response = await upload(
      `module/tcm/s3/uploadAvatar/${path}`,
      files,
    );
    return response.json();
  };

  const { mutate: uploadAvatarS3, isLoading: isUploadAvatarS3 } = useMutation(
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

  return { uploadAvatarS3, isUploadAvatarS3 };
};
type Props = {
  files: FormData;
  path: string;
};
export { useUploadAvatarS3 };
