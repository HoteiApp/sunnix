import { useState, useEffect } from 'react';
import { useGetUrls3, useGetHiringUrls3 } from "../profile/hooks";
import { PdfViewer } from ".";

type Props = {
    fileAvailable: boolean;
    section?: string;
    filePath: string;
};

const GetUrl = ({ fileAvailable, section, filePath }: Props) => {
    const { check } = useGetUrls3();
    const { urlDoc } = useGetHiringUrls3();
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        const fetchUrl = async () => {
            if (fileAvailable) {
                if (section === "hiring") {
                    const result = await urlDoc({ key: filePath, duration: '1m' });
                    if (result && result.url) {
                        setFileUrl(result.url);
                    }
                } else {

                    const result = await check({ key: filePath, duration: '1m' });
                    if (result && result.url) {
                        setFileUrl(result.url);
                    }
                }
            }
            
        };
        fetchUrl();
    }, []);

    const renderPdfOrForm = () => {
        return fileAvailable && fileUrl !== "" && (
            fileUrl ? <PdfViewer fileUrl={fileUrl} /> : <p>Cargando...</p>
        )
    };

    return (
        <div>
            {renderPdfOrForm()}
        </div>
    );
};

export { GetUrl };
