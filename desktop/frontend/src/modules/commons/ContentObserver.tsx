import React, { useEffect, useRef } from 'react';

interface ContentObserverProps {
    onContentChange: (content: string) => void;
    children: React.ReactNode;
}

const ContentObserver: React.FC<ContentObserverProps> = ({ onContentChange, children }) => {
    const contentRef = useRef<HTMLDivElement>(null); // Crear una referencia

    const getContent = () => {
        if (contentRef.current) {
            const clonedElement = contentRef.current.cloneNode(true) as HTMLElement;

            const inputs = clonedElement.querySelectorAll('input');
            const selects = clonedElement.querySelectorAll('select');

            // Actualizar valores de inputs
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.setAttribute('checked', String(input.checked));
                } else {
                    input.setAttribute('value', input.value);
                }
            });

            // Actualizar valores de selects
            selects.forEach(select => {
                const selectedOption = select.options[select.selectedIndex];
                if (selectedOption) {
                    select.value = selectedOption.value;
                }
            });

            const divContent = clonedElement.innerHTML;
            onContentChange(divContent);
        }
    };

    useEffect(() => {
        getContent(); // Obtener contenido inicial

        const observer = new MutationObserver(getContent);
        if (contentRef.current) {
            observer.observe(contentRef.current, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });

            // Escuchar eventos de entrada en los inputs
            const inputs = contentRef.current.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', getContent); // Para inputs de texto
                input.addEventListener('change', getContent); // Para checkboxes y selects
            });

            // Limpiar el observer y los event listeners al desmontar el componente
            return () => {
                observer.disconnect();
                inputs.forEach(input => {
                    input.removeEventListener('input', getContent);
                    input.removeEventListener('change', getContent);
                });
            };
        }
    }, []);
    return <div ref={contentRef}>{children}</div>;
};

export { ContentObserver };
