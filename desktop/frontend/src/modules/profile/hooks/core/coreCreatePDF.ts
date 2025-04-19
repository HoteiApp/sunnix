import { useMutation } from "react-query";
import {
  displayNotificationError,
  displayNotificationSuccess,
} from "../../../../utils";
import { post } from "../../../../hooks/api";

const useCreatePdf = () => {
  const newData = async ({ htmlDiv, page_size, orientation }: Props) => {
    const response = await post(
      "module/tcm/pdf/",
      JSON.stringify({
        html: htmlDiv,
        page_size: page_size,
        orientation: orientation
      }),
      // { headers: { "Content-Type": "application/json" } }   // Asegura que recibimos el PDF como blob
    );

    if (!response.ok) {
      throw new Error("Error generating PDF");
    }

    // Convertimos la respuesta a un Blob (PDF)
    const blob = await response.blob();

    // Creamos una URL temporal para descargar el archivo
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf"; // Nombre del archivo para la descarga
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Revocamos la URL temporal después de la descarga
    window.URL.revokeObjectURL(url);

    return { message: "PDF generated and downloaded successfully!" };
  };

  const { mutate: createPDF, isLoading: isUpdatingNewClient } = useMutation(
    newData,
    {
      onError: (error: Error) => {
        displayNotificationError(error);
      },
      onSuccess: (msg) => {
        displayNotificationSuccess(msg.message);
      },
    }
  );

  return { createPDF, isUpdatingNewClient };
};

type Props = {
  htmlDiv: string;
  page_size?: string | "";
  orientation?: string | "";
};

export { useCreatePdf };
