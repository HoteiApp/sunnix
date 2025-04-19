import { Skeleton } from 'primereact/skeleton';
import { useCoreChatConversation } from "../../profile/hooks";
import { classNames } from "primereact/utils";
// -- New Struct
import { Active } from "../../../models";

export const Message = ({ active, relad, conversation }: Props) => {
  const { message, isLoading, reloadMessage } = useCoreChatConversation({ id: conversation });
  // useEffect(() => {
  // }, [conversationActive])

  return (
    <div className="p-2">
      {isLoading ? (<>
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="10rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" className="mb-2"></Skeleton>
      </>) : (
        <>
          {message?.msgs.map(msg => {
            return (
              <div className={classNames(
                "chat",
                Number(active?.activeUser?.User?.ID) !== msg.CFrom ? "chat-start" : "chat-end"
              )}>
                <div className="chat-header opacity-50">
                  {Number(active?.activeUser?.User?.ID) === msg.CFrom && "You"}
                  {/* <time className="text-xs opacity-50">2 hours ago</time> */}
                </div>
                <div className={
                  classNames(
                    "chat-bubble text-gray-700",
                    Number(active?.activeUser?.User?.ID) !== msg.CFrom ? "bg-blue-100" : "bg-orange-200"
                  )
                }>
                  {msg.Content}
                </div>
                <div className="chat-footer opacity-50">Seen</div>
              </div >
      );
          })}
      {/* {message?.map(sms => {
            return (
              <div className="chat chat-start">
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble bg-blue-100 text-gray-700">
                  You were the Chosen One!the Chosen One! the Chosen One!
                </div>
                <div className="chat-footer opacity-50">Seen</div>
              </div >
            );
          })} */}


      {/* <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble bg-blue-100 text-gray-700">
              You were the Chosen One!
            </div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hour ago</time>
            </div>
            <div className="chat-bubble bg-orange-100 text-gray-700">
              I loved you.
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div> */}
    </>
  )
}
    </div >
  );
};

type Props = {
  conversation: number;
  active: Active | undefined;
  relad(): void;
}
