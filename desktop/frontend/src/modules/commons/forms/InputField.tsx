import { Field, FieldProps, ErrorMessage } from "formik";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

const InputField: FC<Props> = ({
  field,
  label,
  type,
  mask,
  unmask,
  horizontal,
  floatLabel,
  className,
  inputClassName,
  validation,
  disabled,
  autocomplete,
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
            className={classNames("text-sm font-medium text-white", {
              "mr-3 mb-0 mt-2": horizontal,
            })}
          >
            {label}
          </label>
        )}
        {!!mask ? (
          <InputMask
            type={type}
            mask={mask}
            unmask={unmask}
            id={name}
            name={name}
            onChange={onChange}
            value={value}
            disabled={disabled}
            className={classNames(
              "p-inputtext-sm ",
              { "p-invalid": touched && error, horizontal: horizontal },
              inputClassName
            )}
          ></InputMask>
        ) : (
          <InputText
            type={type}
            autoComplete="on"
            id={name}
            name={name}
            onChange={onChange}
            value={value}
            className={classNames(
              "p-inputtext-sm w-full",
              "border-2 text-white border-primary bg-slate-600 bg-opacity-60 focus:bg-opacity-90",
              { "p-invalid": touched && error, horizontal: horizontal },
              inputClassName
            )}
          />
        )}

        {label && floatLabel && (
          <label
            htmlFor={name}
            className="text-sm text-primary left-3 top-4 absolute transition-all ease-in-out"
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
  type?: string;
  mask?: string;
  unmask?: boolean;
  className?: string;
  horizontal?: boolean;
  floatLabel?: boolean;
  inputClassName?: string;
  validation?(value: string): void;
  disabled?: boolean;
  autocomplete?: string;
};

export { InputField };
