import React from 'react';
import { Button } from 'primereact/button';
import { useCreatePdf } from "../profile/hooks";

interface DownloadPDFButtonProps {
  content: string;
  label: string;
  icon: string;
  className?: string;
}

const DownloadPDFContent: React.FC<DownloadPDFButtonProps> = ({ content, label, icon, className }) => {
  const { createPDF, isUpdatingNewClient } = useCreatePdf();

  const handleDownloadPDF = async () => {
    // Crea un elemento temporal para renderizar el HTML
    if (content !== "") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      createPDF({ htmlDiv: tempDiv.innerHTML });
    }
  };

  return (
    <Button
      label={label}
      icon={isUpdatingNewClient ? "pi pi-spin pi-spinner" : icon}
      onClick={handleDownloadPDF}
      className={className}
    />
  );
};

export { DownloadPDFContent };
