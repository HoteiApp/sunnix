import { UrlsVoicesS3 } from "../../../../models"
import { post } from "../../../../hooks/api";

const useLoadVoicesNote = () => {

  const loadvoice = async ({ mode, from, to, module, component, id_component }: Props) => {
    const response = await post('voice/get/',
      JSON.stringify({
        mode: mode,
        from: from,
        to: to,
        module: module,
        component: component,
        id_component: id_component
      }));
    const result = response.status === 200 ? await response.json() : undefined;
    return result as UrlsVoicesS3;
  };

  return { loadvoice };

};

type Props = {
  mode: string;
  from: string;
  to: string;
  module: string;
  component: string;
  id_component: string;
};

export { useLoadVoicesNote };
