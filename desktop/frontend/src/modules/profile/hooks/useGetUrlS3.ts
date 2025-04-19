import { post } from "../../../hooks/api";
import { UrlFileS3 } from "../../../models"

const useGetUrls3 = () => {
  // Resto del código

  const check = async ({ key, duration }: Props) => {
    const response = await post('module/tcm/s3/presignedURL',
      JSON.stringify({
        key: key,
        duration: duration
      }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as UrlFileS3;
  };

  return { check };
};

type Props = {
  key: string;
  duration: string;
};


export { useGetUrls3 };
