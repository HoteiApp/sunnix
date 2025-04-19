import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Users } from "../../../../models";
const useCoreUsers = () => {
  const queryKey = ["users"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("core/list/users");

    const users =
      response.status === 200 ? await response.json() : undefined;

    return users as Users;
  });
  const reloadUsers = () => refetch({ queryKey });
  return { users: data, isLoading, reloadUsers };
};

export { useCoreUsers };