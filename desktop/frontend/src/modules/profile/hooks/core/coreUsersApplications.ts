import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Users } from "../../../../models";
const useCoreUsersApplications = () => {
  const queryKey = ["useCoreUsersApplications"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("core/list/applications");

    const users =
      response.status === 200 ? await response.json() : undefined;

    return users as Users;
  });
  const reloadUsersApplications = () => refetch({ queryKey });
  return { usersApplications: data, isLoading, reloadUsersApplications };
};

export { useCoreUsersApplications };