import { Toast } from 'primereact/toast';

const RenderText = (data, toastRef: React.RefObject<Toast>) => {
    
    const handleCopy = () => {
        navigator.clipboard.writeText(data);
        toastRef.current?.show({ severity: 'info', summary: 'Copy text', detail: data, life: 3000 });
    };

    return (
        <span
            className="cursor-copy hover:text-blue-800"
            onClick={handleCopy}
            onContextMenu={(e) => {
                e.preventDefault();
                handleCopy();
            }}
        >
            {data}
        </span>
    );
};
export { RenderText };