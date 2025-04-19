import { useQuery } from "react-query";
import { get } from "../../../api";
import { Tcm } from "../../../../models";

const useTcmMyTcm = () => {
  const queryKey = ["useTcmMyTcm"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    // TODO Cambiar esta url en el api para que sugiera lo que hace es la lista de tcm no de tcms
    const response = await get("module/tcm/my/tcms");

    const supTCMS = response.status === 200 ? await response.json() : undefined;
    return supTCMS as Tcm;
  });
  const reloadMyTcms = () => refetch({ queryKey });
  return { myTcm: data, isLoadingMyTcms: isLoading, reloadMyTcms };
};

export { useTcmMyTcm };