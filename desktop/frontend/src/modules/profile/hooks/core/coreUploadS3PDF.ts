import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../../hooks/api";

const useUploadS3Pdf = (reload: () => void) => {
  
  const newData = async ({ htmlDiv, name, folder, pageSize }: Props) => {
    const response = await post(
      "module/tcm/s3/uploadPDF",
      JSON.stringify({ 
        html: htmlDiv, 
        name: name, 
        folder: folder,
        pageSize: pageSize
       }),
    );

    if (!response.ok) {
      throw new Error("Error generating PDF");
    }
    
    return { message: "PDF upload successfully!" };
  };

  const { mutate: uploadS3PDF, isLoading: isUpdatingUploadS3PDF } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        reload();
        displayNotificationSuccess(msg.message);
      },
    }
  );

  return { uploadS3PDF, isUpdatingUploadS3PDF };
};

type Props = {
  htmlDiv: string;
  name: string;
  folder: string;
  pageSize: string;
};

export { useUploadS3Pdf };
