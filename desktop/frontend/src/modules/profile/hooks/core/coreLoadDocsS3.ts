import { DocsS3 } from "../../../../models"
import { post } from "../../../../hooks/api";

const useLoadDocsS3 = () => {

  const loadDocs = async ({ paht }: Props) => {
    const response = await post('module/tcm/s3/getdocs',
      JSON.stringify({
        path: paht,
      }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as DocsS3;
  };

  return { loadDocs };

};

type Props = {
  paht: string;
};

export { useLoadDocsS3 };
