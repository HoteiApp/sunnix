import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../../hooks/api";

const useDownloadS3PDF = (reload: () => void) => {
  const downloadPdfFile = async ({ fileNames }: Props) => {
    const response = await post(
      "module/tcm/s3/downloadPdf",
      JSON.stringify({ 
        fileNames: fileNames
      }),
    );

    if (!response.ok) {
      throw new Error("Error generating PDF file");
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear un enlace de descarga para el archivo PDF
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf"; // Cambia el nombre del archivo descargado aquí
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return { message: "PDF file downloaded successfully!" };
  };

  const { mutate: downloadS3PDF, isLoading: isUpdatingDownloadS3PDF } = useMutation(
    downloadPdfFile,
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

  return { downloadS3PDF, isUpdatingDownloadS3PDF };
};

type Props = {
  fileNames: string[];
};

export { useDownloadS3PDF };
