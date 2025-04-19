import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNames } from "primereact/utils";

const Button = ({
  type = "button",
  label,
  icon,
  iconSize = "h-5 w-5",
  buttonStyle = "primary",
  size = "md",
  className,
  onClick,
  disabled,
  loading,
}: Props) => (
  <button
    type={type}
    className={classNames(
      "font-semibold shadow-sm focus:primary-ring-shadow",
      {
        "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50":
          buttonStyle === "default",
      },
      {
        "bg-primary text-white hover:bg-primary-hover":
          buttonStyle !== "default",
      },
      { "inline-flex items-center gap-x-1.5": icon || loading },
      { "text-xs": size === "xs" },
      { "text-sm": size !== "xs" },
      { rounded: ["xs", "sm"].includes(size) },
      {
        "rounded-md":
          !["xs", "sm"].includes(size) && buttonStyle !== "floating",
      },
      { "rounded-full": buttonStyle === "floating" },
      {
        "py-1 px-2": ["xs", "sm"].includes(size) && buttonStyle !== "floating",
      },
      { "py-1.5 px-2.5": size === "md" && buttonStyle !== "floating" },
      { "py-2 px-3": size === "lg" && buttonStyle !== "floating" },
      { "py-2.5 px-3.5": size === "xl" && buttonStyle !== "floating" },
      { "p-1": ["xs", "sm"].includes(size) && buttonStyle === "floating" },
      { "p-2": size === "md" && buttonStyle === "floating" },
      { "p-3": size === "lg" && buttonStyle === "floating" },
      { "p-4": size === "xl" && buttonStyle === "floating" },
      { "opacity-60": disabled || loading },
      className
    )}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {(icon || loading) && (
      <FontAwesomeIcon
        icon={loading ? faCircleNotch : (icon as IconDefinition | IconName)}
        className={classNames(iconSize)}
        spin={loading}
      />
    )}
    {label}
  </button>
);

const FloatingButton = ({
  size = "xl",
  icon = faPlus,
  className = "fixed bottom-6 right-6",
  ...props
}: FloatingProps) => {
  return (
    <Button
      buttonStyle="floating"
      size={size}
      icon={icon}
      className={className}
      {...props}
    />
  );
};

const AddFieldArrayItemButton = ({
  className = "py-4",
  onClick,
  disabled,
  label = "Add new",
}: FieldArrayProps) => (
  <button
    type="button"
    className={classNames(
      "bg-white flex focus:outline-none items-center border-b border-gray-200 w-full group",
      className
    )}
    onClick={onClick}
    disabled={disabled}
  >
    <span
      className={classNames(
        "border-2 border-dashed border-gray-300 flex h-8 w-8 items-center justify-center rounded-full text-gray-400",
        { "group-hover:border-gray-400 group-hover:text-gray-500": !disabled }
      )}
    >
      <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
    </span>
    <span
      className={classNames(
        "ml-4 text-sm font-medium",
        { "text-gray-400": disabled },
        { "text-primary hover:text-primary-hover": !disabled }
      )}
    >
      {label}
    </span>
  </button>
);

type FloatingProps = Omit<Props, "style">;

type FieldArrayProps = Pick<
  Props,
  "label" | "className" | "onClick" | "disabled"
>;

type Props = {
  type?: "submit" | "button";
  label?: string;
  icon?: IconDefinition | IconName;
  iconSize?: string;
  buttonStyle?: "default" | "primary" | "floating";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
  onClick?(event?: React.SyntheticEvent | undefined | null): void;
  disabled?: boolean;
  loading?: boolean;
};

export { Button, FloatingButton, AddFieldArrayItemButton };
