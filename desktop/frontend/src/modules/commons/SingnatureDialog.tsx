import React, { useState, useEffect, useRef } from 'react';
//-- Components
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';
import SignatureCanvas, { SignatureCanvasRef } from 'react-signature-canvas';
//-- Types 
import { useMySignature } from "../profile/hooks";
// -- New Struct
import { Active } from "../../models";

const SignatureDialog = ({ showModal, setShowModal, active, relad }: Props) => {
  const { addSign, isUpdatingSign } = useMySignature(relad);
  const signatureRef = useRef<SignatureCanvasRef>(null);
  const [imageSign, setImageSign] = useState("");
  const [singSupervisor, setSingSupervisor] = useState<boolean>(false);
  const [singQa, setSingQa] = useState<boolean>(false);

  useEffect(() => {
    setImageSign(active?.activeUser?.Signature ?? "");
    setSingQa(active?.activeUser?.User?.qa_can_sign ?? false)
    setSingSupervisor(active?.activeUser?.User?.supervisor_can_sign ?? false)
  }, [active]);


  const footerContent = (
    <div className='w-full pt-4 flex justify-end'>

      <Button
        label="Clear (Sign again)"
        icon="pi pi-eraser"
        onClick={() => {
          signatureRef.current.clear();
          setImageSign("");
        }}
        className="p-button-secondary bg-orange-400 mr-2"
      />
      <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text mr-2" />
      <Button
        label="Save Signature"
        icon="pi pi-save"
        className='p-button-warning'
        loading={isUpdatingSign}
        disabled={imageSign === "" ? true : false}
        onClick={() => {
          addSign({ signature: imageSign, singSupervisor: singSupervisor, singQa: singQa });
          setShowModal(false);
        }}
      />

    </div>
  );

  return (
    <Dialog
      id="signature"
      visible={showModal}
      maximizable
      style={{ width: '30vw' }}
      breakpoints={{ '960px': '70vw', '641px': '90vw' }}
      onHide={() => setShowModal(false)}
      header="Signature Options"
      footer={footerContent}
    >
      <div className="flex">
        {active?.activeUser?.Signature === "" ? (
          <p className="m-0 text-justify" style={{ overflow: 'auto', lineHeight: '1.5', fontSize: '12px' }}>
            - On our platform, your digital signature is essential to expedite and ensure the authenticity of your documents.
            To provide you with complete security, your signature is stored in a highly secure manner. This means that no
            one else can use your signature unless you explicitly authorize it a specific user.
            <br />
            - Furthermore, each time your signature is used, you will receive detailed notifications informing you about who used
            it and which document was signed, keeping you informed about every interaction with your digital identity.
            <br />
            - Your trust and security are paramount to us. Therefore, we continuously strive to provide you with the best experience
            in document management, ensuring that your data is protected at all times.
            <br /><br />
            Please try to make the signature as legible as possible:
            <div className='w-full' >
              <SignatureCanvas
                autoFocus
                ref={signatureRef}
                canvasProps={{
                  style: { width: "100%", height: 300, backgroundColor: "#e5ecfc", borderColor: "#fff" }
                }}
                minWidth={2}
                maxWidth={3}
                onEnd={() =>
                  // ChangeFormValuesconnsent("connsentsClientSign", signatureClientRef.current.getTrimmedCanvas().toDataURL("image/png"))
                  setImageSign(signatureRef.current.getTrimmedCanvas().toDataURL("image/png"))
                }
              />
            </div>
            {/* <button onClick={() => {
              signatureRef.current.clear();
              setImageSign("");
            }}> Clear </button> */}
          </p>
        ) : (
          <div className='w-full'>
            {/* TODO Esto es lo que no permite copiar de la pantalla */}
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-secondary" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  <div className="w-32">
                    <img src={imageSign} width={150} alt='sign' draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  </div>
                </div>
                <div className="stat-value avatar online">Digital</div>
                <div className="stat-title">Signature done</div>
                <div className="stat-desc text-secondary">View signature history</div>
                <div className="stat-desc text-secondary"><Button
                  label="Change"
                  icon="pi pi-undo"
                  className='p-button-warning'
                  loading={isUpdatingSign}
                  disabled={imageSign === "" ? true : false}
                  onClick={() => {
                    addSign({ signature: "", singSupervisor: singSupervisor, singQa: singQa });
                  }}
                />
                </div>
              </div>
            </div>
          </div>
        )}

        <ScrollTop
          target="parent"
          pt={{
            root: { className: 'bg-orange-400' }
          }}
        />
      </div>
    </Dialog>
  );
};
type Props = {
  showModal: boolean;
  setShowModal(showModal: boolean): void;
  active?: Active;
  relad(): void;
};

export { SignatureDialog };
