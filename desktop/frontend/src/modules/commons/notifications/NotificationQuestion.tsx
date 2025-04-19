import { FC } from "react"

const NotificationQuestion: FC<Props> = ({ message }) => (
  <div className="flex flex-col z-90">
    <p className="font-bold">Question or Command</p>
    <p>{message}</p>
  </div>
)

type Props = { message: string }

export { NotificationQuestion }
