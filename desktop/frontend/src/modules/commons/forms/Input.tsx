import { classNames } from "primereact/utils"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

const Input = ({ type = "text", className, ...props }: Props) => (
  <input
    type={type}
    className={classNames(
      "placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-sm border border-solid border-gray-300 rounded-md",
      className,
    )}
    {...props}
  />
)

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export { Input }
