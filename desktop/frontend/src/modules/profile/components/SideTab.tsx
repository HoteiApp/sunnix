import { classNames } from "primereact/utils";

const SideTab = ({ icon, label, className, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "w-full  pb-3 pt-3 pl-4 hover:bg-gray-300 cursor-pointer border-b last:border-b-0"
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </div>
  );
};

type Props = {
  icon: JSX.Element;
  label: string;
  className?: string;
  onClick(): void;
};
export { SideTab };
