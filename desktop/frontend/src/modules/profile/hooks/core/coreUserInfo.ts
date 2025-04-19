import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { UserInfo } from "../../../../models";

const useCoreUserInfo = ({ uid }: Props) => {
  const queryKey = ["useUserInfo", uid];

  const { data, isLoading, error, refetch } = useQuery(queryKey, async () => {
    const response = await get(`core/list/user/${uid}`);
    const userInfo = response.status === 200 ? await response.json() : undefined;
    return userInfo as UserInfo;
  });

  const reloadUserInfo = () => refetch();

  return { userInfo: data, isLoading, error, reloadUserInfo };
};

type Props = { uid: string }

export { useCoreUserInfo };
