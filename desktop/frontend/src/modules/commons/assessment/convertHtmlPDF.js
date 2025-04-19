import html2pdf from 'html2pdf.js'

export function convertHtmlPDF(divElement) {

    // const handleDownloadPDF = () => {
        // const modalContent = document.getElementById('pdf-HANDBOOK'); // Reemplaza 'modal-content' con el ID del elemento que contiene el contenido del modal
        const pages = document.querySelectorAll('.page'); // Selecciona todas las capas
        const combinedContent = document.createElement('div');
  
        Array.from(pages).forEach((page) => {
            combinedContent.appendChild(page.cloneNode(true)); // Clona el contenido de cada capa y lo agrega al elemento combinado
        });
  
        

        const opciones = {
            filename: 'documentOK.pdf',
            image: { type: 'pdf', quality: 0.98 },
            html2canvas: { scale: 1.5 },
            jsPDF: {                 
                units: 'in',
                format: 'a3', 
                orientation: 'portrait', 
            }
        }

        // html2pdf().set(opciones).from(combinedContent).save();
        html2pdf().set(opciones).from(combinedContent).toPdf().get('pdf').then(

            function(pdf) {
                const newWindow = window.open(pdf.output('bloburl'), '_blank');
                if (newWindow) {
                    newWindow.onload = () => {
                        newWindow.print()
                    }
                }
            }
        )
    // };

}