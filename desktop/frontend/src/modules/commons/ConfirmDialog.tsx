import React, { useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

const CustomConfirmDialog = ({ 
    header, 
    message, 
    icon = 'pi pi-question', 
    onAccept, 
    onReject, 
    acceptLabel = 'Save', 
    rejectLabel = 'Cancel', 
    toast 
}) => {
    const accept = () => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        if (onAccept) {
            onAccept(); // Ejecuta la función onAccept si está definida
        }
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        if (onReject) {
            onReject(); // Ejecuta la función onReject si está definida
        }
    };

    return (
        <ConfirmDialog
            group="headless"
            content={({ headerRef, contentRef, footerRef, hide }) => (
                <div className="align-items-center text-center surface-overlay border-round bg-white">
                    <div className="rounded-full bg-secondary inline-flex justify-content-center align-items-center h-20 w-20 -mt-24 p-4">
                        <i className={`${icon} text-5xl text-center`}></i>
                    </div>
                    <div className="p-5">
                        <span className="font-bold text-2xl block mb-2" ref={headerRef}>
                            {header}
                        </span>
                        <span className="mb-0" ref={contentRef}>
                            {message}
                        </span>
                        <div className="flex align-items-center gap-2 mt-4">
                            <Button
                                label={acceptLabel}
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-8rem"
                            />
                            <Button
                                label={rejectLabel}
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-8rem"
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export {CustomConfirmDialog};
