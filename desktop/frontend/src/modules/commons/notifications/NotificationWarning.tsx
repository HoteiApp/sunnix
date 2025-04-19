import { FC } from "react"

const NotificationWarning: FC<Props> = ({ message }) => (
  <div className="flex flex-col z-90">
    <p className="font-bold">Advertencia</p>
    <p>{message}</p>
  </div>
)

type Props = { message: string }

export { NotificationWarning }
