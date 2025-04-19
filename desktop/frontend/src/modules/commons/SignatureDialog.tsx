
import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import SignatureCanvas from 'react-signature-canvas'; // Asegúrate de tener instalado react-signature-canvas


interface SignatureDialogProps {
  header: string;
  visible: boolean;
  onHide: () => void;
  footer: React.ReactNode;
  onSignEnd: (dataUrl: string) => void;
  onClear: () => void;
  signatureRef: React.RefObject<SignatureCanvas>;
}

const SignatureDialog: React.FC<SignatureDialogProps> = ({
  header,
  visible,
  onHide,
  footer,
  onSignEnd,
  onClear,
  signatureRef,
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      maximizable
      style={{ width: '80vw' }}
      breakpoints={{ '960px': '70vw', '641px': '90vw' }}
      onHide={onHide}
      footer={footer}
    >
      <p className="m-0" style={{ overflow: 'auto' }}>
        By signing this document, you acknowledge that the content of the document cannot be edited without proper authorization. Any future changes or revisions must be requested and approved by your supervisor or the relevant authorized personnel.
        <br />
        <br />
        If you have any questions about the electronic signature process or the documents you are asked to sign, please contact our support team.
        <br />
        <br />
        Please try to make the signature as legible as possible:
        <div className="w-full">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              style: { width: '100%', height: 200, backgroundColor: '#e5ecfc', borderColor: '#fff' },
            }}
            minWidth={2}
            maxWidth={3}
            onEnd={() => {
              if (signatureRef.current) {
                onSignEnd(signatureRef.current.getTrimmedCanvas().toDataURL('image/png'));
              }
            }}
          />
        </div>
        <button
          onClick={() => {
            if (signatureRef.current) {
              signatureRef.current.clear();
              onClear();
            }
          }}
        >
          Clear
        </button>
      </p>
    </Dialog>
  );
};

export {SignatureDialog};