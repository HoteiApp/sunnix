import { useQuery } from "react-query";
import { get } from "../api";
import { Active } from "../../models";
// 

const useActiveUser = () => {
  const queryKey = ["activeUser"];
  //
  const { data, isLoading, error, refetch } = useQuery(queryKey, async () => {
    const response = await get("active");

    const activeUser =
      response.status === 200 ? await response.json() : undefined;

    return activeUser as Active;
  });
  const reloadActiveUser = () => refetch({ queryKey });
  return { activeUser: data, isLoading, error, reloadActiveUser };
};

export { useActiveUser };
