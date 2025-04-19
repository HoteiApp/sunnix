import { useQuery } from "react-query";
import { get } from "../../../api";
import { TcmSupervisons } from "../../../../models";

const useTcmSupervisios = ({ id }: Props) => {
  const queryKey = ["useTcmSupervisios"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get(`module/tcm/supervisions/user/${id}`);

    const tcmSup = response.status === 200 ? await response.json() : undefined;
    return tcmSup as TcmSupervisons;
  });
  const reloadTcmSupervisons = () => refetch({ queryKey });
  return { tcmSupervisons: data, isLoadingSupervisons: isLoading, reloadTcmSupervisons };
};

type Props = { id: string }

export { useTcmSupervisios };
