import { useQuery } from "react-query";
import { get } from "../../../api";
import { Events } from "../../../../models";

const useEvents = () => {
  const queryKey = ["useCoreEvents"];

  const { data, isLoading, refetch } = useQuery(queryKey, async () => {
    const response = await get("my/events");

    const events = response.status === 200 ? await response.json() : undefined;
    return events as Events;
  });
  const reloadMyEvents = () => refetch({ queryKey });
  return { myEvents: data, isLoadingEvents: isLoading, reloadMyEvents };
};

export { useEvents };