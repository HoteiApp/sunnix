import { Field, FieldProps, ErrorMessage } from "formik";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { Password } from "primereact/password";

const PasswordField: FC<Props> = ({
  field,
  label,
  horizontal,
  floatLabel,
  className,
  inputClassName,
  validation,
}) => (
  <Field name={field} validate={validation}>
    {({
      field: { name, value, onChange },
      meta: { touched, error },
    }: FieldProps) => (
      <div
        className={classNames(
          "field space-y-2 relative ",
          horizontal && "inline-flex justify-between",
          floatLabel && "float-label relative block mt-1",
          !horizontal && !floatLabel && "flex flex-col",
          className
        )}
      >
        {label && !floatLabel && (
          <label
            htmlFor={name}
            className={classNames("text-sm font-medium text-gray-700", {
              "mr-3 mb-0 mt-2": horizontal,
            })}
          >
            {label}
          </label>
        )}
        <Password
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          toggleMask
          promptLabel="Contraseña"
          weakLabel="Simple"
          mediumLabel="Mediana"
          strongLabel="Fuerte"
          autoComplete="off"
          aria-autocomplete="none"
          className={classNames(
            "flex items-centermt-2",
            { "p-invalid": touched && error, horizontal: horizontal },
            inputClassName
          )}
        />

        {label && floatLabel && (
          <label
            htmlFor={name}
            className="text-sm text-gray-700  left-3 top-2 absolute transition-all ease-in-out"
          >
            {label}
          </label>
        )}
        <ErrorMessage name={field}>
          {(msg) => <small className="p-error absolute -bottom-6">{msg}</small>}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

type Props = {
  field: string;
  label?: string;
  className?: string;
  horizontal?: boolean;
  floatLabel?: boolean;
  inputClassName?: string;
  validation?(value: string): void;
  disabled?: boolean;
  autocomplete?: string;
};

export { PasswordField };
