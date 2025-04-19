import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Users } from "../../../../models";
const useCoreUsersHiring = () => {
  const queryKey = ["usersHiring"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("core/list/hiring");

    const users =
      response.status === 200 ? await response.json() : undefined;

    return users as Users;
  });
  const reloadUsersHiring = () => refetch({ queryKey });
  return { usersHiring: data, isLoading, reloadUsersHiring };
};

export { useCoreUsersHiring };