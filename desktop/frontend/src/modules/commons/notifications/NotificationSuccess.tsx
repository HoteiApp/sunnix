import { FC } from "react"

const NotificationSuccess: FC<Props> = ({ message }) => (
  <div className="flex flex-col z-90">
    <p className="font-bold">Success</p>
    <p>{message}</p>
  </div>
)

type Props = { message: string }

export { NotificationSuccess }
