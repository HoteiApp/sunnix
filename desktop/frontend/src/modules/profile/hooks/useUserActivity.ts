import { useQuery } from "react-query";
import { get } from "../../../hooks/api";

const useUserActivity = () => {
  const queryKey = ["activity"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("my/activity");
    const activity =
      response.status === 200 ? await response.json() : undefined;

    return activity;
  });
  const reloadUserActivity = () => refetch({ queryKey });
  return { userActivity: data, isLoading, reloadUserActivity };
};

export { useUserActivity };
