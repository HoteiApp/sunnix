import { useQuery } from "react-query";
import { get } from "../../../../hooks/api";
import { Messages } from "../../../../models";

const useCoreChatConversation = ({ id }: Props) => {
  const queryKey = ["useChatConversation", id];

  const { data, isLoading, error, refetch } = useQuery(queryKey, async () => {
    const response = await get(`chat/sms/${id}`);
    const message = response.status === 200 ? await response.json() : undefined;
    return message as Messages;
  });

  const reloadMessage = () => refetch();

  return { message: data, isLoading, error, reloadMessage };
};

type Props = { id: number }

export { useCoreChatConversation };
