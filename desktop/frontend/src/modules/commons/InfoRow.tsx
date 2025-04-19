import { ReactNode } from "react";
import { classNames } from "primereact/utils";

const InfoRow = ({ className, title, content }: Props) => (
  <div
    className={classNames(
      "flex w-full items-center text-slate-400 text-sm border-b last:border-0 py-5 first:pt-0",
      className
    )}
  >
    <p className="w-1/6 font-semibold">{title}</p>
    <div className="ml-6 whitespace-nowrap text-ellipsis overflow-hidden">
      {content}
    </div>
  </div>
);

type Props = {
  className?: string;
  title: string;
  content: string | ReactNode;
  showLink?: boolean;
  loading?: boolean;
  spinnerLoading?: boolean;
};

export { InfoRow };
