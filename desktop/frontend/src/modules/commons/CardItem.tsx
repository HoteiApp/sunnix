import { ReactNode } from "react";
import { classNames } from "primereact/utils";

const CardItem = ({ title, className, cardActions, content }: Props) => (
  <div
    className={classNames(
      "card w-50 h-50 bg-base-100 shadow-xl mt-4",
      className
    )}
  >
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <div>{content}</div>
      {cardActions && (
        <div className="card-actions justify-end">{cardActions}</div>
      )}
    </div>
  </div>
);

type Props = {
  title: string;
  className?: string;
  content: string | ReactNode;
  cardActions?: JSX.Element;
};

export { CardItem };
