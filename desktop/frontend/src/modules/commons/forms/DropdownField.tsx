import { Field, FieldProps, ErrorMessage } from "formik";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { Dropdown } from "primereact/dropdown";
// import { Coding, Composition } from "fhir"

const DropdownField: FC<Props> = ({
  field,
  options,
  label,
  className,
  inputClassName,
  horizontal,
  disabled,
  optionLabel = "display",
  optionValue = "code",
  filterBy,
  validation,
}) => (
  <Field name={field} validate={validation}>
    {({
      field: { name, value, onChange },
      meta: { touched, error },
    }: FieldProps) => (
      <div
        className={classNames(
          "field space-y-2 relative",
          horizontal ? "inline-flex justify-between" : "flex flex-col",
          className
        )}
      >
        {label && (
          <label
            htmlFor={name}
            className={classNames("text-sm font-medium text-gray-700", {
              "mr-3 mb-0 mt-2": horizontal,
            })}
          >
            {label}
          </label>
        )}
        <Dropdown
          id={name}
          name={name}
          optionLabel={optionLabel}
          optionValue={optionValue}
          options={options}
          onChange={onChange}
          value={value}
          disabled={disabled}
          filter={filterBy !== undefined}
          filterBy={filterBy}
          className={classNames(
            { "p-invalid": touched && error, horizontal: horizontal },
            inputClassName
          )}
        />
        <ErrorMessage name={field}>
          {(msg) => (
            <small className="p-error absolute -bottom-6 ">{msg}</small>
          )}
        </ErrorMessage>
      </div>
    )}
  </Field>
);

type Props = {
  field: string;
  options: Record<string, string | number>[];
  label?: string;
  className?: string;
  disabled?: boolean;
  optionLabel?: string;
  optionValue?: string;
  inputClassName?: string;
  horizontal?: boolean;
  filterBy?: string;
  validation?(value: string): void;
};

export { DropdownField };
