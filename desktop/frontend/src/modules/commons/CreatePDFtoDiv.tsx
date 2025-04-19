import React from 'react';
import { Button } from 'primereact/button';
import { useCreatePdf } from "../profile/hooks";

interface DownloadPDFButtonProps {
  elementId: string;
  label: string;
  icon: string;
  className?: string;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ elementId, label, icon, className }) => {
  const { createPDF } = useCreatePdf();

  const handleDownloadPDF = async () => {
    const element = document.getElementById(elementId);
    if (element) {
      // Clonar el elemento para no modificar el DOM original
      const clonedElement = element.cloneNode(true) as HTMLElement;

      // Obtener todos los campos de entrada, checkboxes y select buttons dentro del elemento clonado
      const inputs = clonedElement.querySelectorAll('input');
      const selects = clonedElement.querySelectorAll('select');

      // Recorrer los campos de entrada y checkboxes y actualizar sus valores en el HTML clonado
      inputs.forEach(input => {
        if (input.type === 'checkbox') {
          if (input.checked) {
            input.setAttribute('checked', 'true');
          } else {
            input.removeAttribute('checked');
          }
        } else {
          input.setAttribute('value', input.value);
        }
      });

      // Recorrer los select buttons y actualizar sus valores en el HTML clonado
      selects.forEach(select => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
          select.value = selectedOption.value;
        }
        // Marcar la opción seleccionada como 'selected'
        select.querySelectorAll('option').forEach(option => {
          if (option.value === select.value) {
            option.setAttribute('selected', 'true');
          } else {
            option.removeAttribute('selected');
          }
        });
      });

      // Obtener el contenido HTML del elemento clonado con los valores actualizados
      const divContent = clonedElement.innerHTML;
      createPDF({ htmlDiv: divContent });
    }
  };

  return (
    <Button
      label={label}
      icon={icon}
      onClick={handleDownloadPDF}
      className={className}
    />
  );
};

export { DownloadPDFButton };
