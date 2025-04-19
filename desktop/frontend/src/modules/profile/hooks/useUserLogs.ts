import { useQuery } from "react-query";
import { get } from "../../../hooks/api";

const useUserLogs = () => {
  const queryKey = ["userLogs"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("my/logs");

    const logs = response.status === 200 ? await response.json() : undefined;

    return logs;
  });
  const reloadUserLogs = () => refetch({ queryKey });
  return { userLogs: data, isLoading, reloadUserLogs };
};

export { useUserLogs };
