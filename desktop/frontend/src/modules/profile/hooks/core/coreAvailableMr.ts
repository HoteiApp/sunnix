import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { AvailanbleMr } from "../../../../models";

type Props = { mr: number }

const useCoreAvailableMr = () => {
  const checkMr = async ({ mr }: Props) => {
    const response = await get(`module/tcm/clients/availableMr/${mr}`);
    const result = response.status === 200 ? await response.json() : undefined;
    return result as AvailanbleMr;
  };

  return { checkMr };
};

export { useCoreAvailableMr };