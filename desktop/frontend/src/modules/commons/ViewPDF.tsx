// PdfViewer.jsx
// import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
// import { printPlugin } from '@react-pdf-viewer/print';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/print/lib/styles/index.css';
import '@react-pdf-viewer/print/lib/styles/index.css';

const PdfViewer = ({ fileUrl }) => {
    // Inicializar el plugin de impresión
    // const printPluginInstance = printPlugin();
    // const { PrintButton } = printPluginInstance;
    
    return (
        <div>
            {/* <div style={{ marginBottom: '10px' }}>

                <PrintButton />
            </div> */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={fileUrl}
                    // plugins={[printPluginInstance]}
                />
            </Worker>


        </div>
    );
};

export { PdfViewer };
