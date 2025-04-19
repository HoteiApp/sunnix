import { FC } from "react";

const NotificationError: FC<Props> = ({ error: { message } }) => (
  <div className="flex flex-col z-90">
    <p className="font-bold">{message}</p>
  </div>
);

type Props = { error: Error };

export { NotificationError };
