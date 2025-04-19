import { classNames } from "primereact/utils";

const NavbarLink = ({ id, icon, label, selected, onClick }: LinkProps) => {
  return (
    <span
  className={classNames(
    "mr-4 h-11 cursor-pointer border-gray-100",
    selected === id && "bg-gray-50 rounded-t border border-b-0 border-primary"
  )}
  onClick={onClick}
>
  <div
    className={classNames(
      "flex items-center p-2",
      selected !== id && "hover:bg-secondary-hover rounded-md p-2",
      selected === id && "p-2",
      // "min-w-[100px] max-w-[200px] truncate"
    )}
  >
    <i className={classNames("pi pi-" + icon + " pr-2")} style={{ color: "primary" }}></i>
    <span>{label}</span>
  </div>
</span>

  );
};

type LinkProps = {
  id: string;
  icon?: string | "chevron-right";
  label: string;
  selected: string;
  onClick(): void;
};

export { NavbarLink };
