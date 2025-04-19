import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../../hooks/api";

const useDownloadS3Zip = (reload: () => void) => {
  const downloadZipFile = async ({ fileNames }: Props) => {
    const response = await post(
      "module/tcm/s3/downloadZip",
      JSON.stringify({ 
        fileNames: fileNames
       }),
    );

    if (!response.ok) {
      throw new Error("Error generating ZIP file");
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear un enlace de descarga para el archivo ZIP
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "files.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return { message: "ZIP file downloaded successfully!" };
  };

  const { mutate: downloadS3Zip, isLoading: isUpdatingDownloadS3Zip } = useMutation(
    downloadZipFile,
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

  return { downloadS3Zip, isUpdatingDownloadS3Zip };
};

type Props = {
  fileNames: string[];
};

export { useDownloadS3Zip };
