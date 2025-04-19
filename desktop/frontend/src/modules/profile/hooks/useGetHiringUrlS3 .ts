import { post } from "../../../hooks/api";
import { UrlFileS3 } from "../../../models"

const useGetHiringUrls3 = () => {
  // Resto del código

  const urlDoc = async ({ key, duration }: Props) => {
    const response = await post('module/tcm/s3/presignedURL',
      JSON.stringify({
        key: key,
        duration: duration
      }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as UrlFileS3;
  };

  return { urlDoc };
};

type Props = {
  key: string;
  duration: string;
};


export { useGetHiringUrls3 };
