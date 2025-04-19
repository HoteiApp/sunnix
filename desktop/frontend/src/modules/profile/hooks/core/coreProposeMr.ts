import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { ProposeMr } from "../../../../models";
const useCoreProposeMr = () => {
  const queryKey = ["useCoreProposeMr"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("module/tcm/clients/proposeMr");

    const users =
      response.status === 200 ? await response.json() : undefined;

    return users as ProposeMr;
  });
  const reloadProposeMr = () => refetch({ queryKey });
  return { proposeMr: data, isLoading, reloadProposeMr };
};

export { useCoreProposeMr };