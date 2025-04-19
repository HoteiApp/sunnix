import { Field, FieldProps, ErrorMessage } from "formik"
import { classNames } from "primereact/utils"
import { FC } from "react"
import { MultiSelect } from "primereact/multiselect"

const MultiSelectField: FC<Props> = ({
  field,
  options,
  label,
  className,
  optionLabel = "label",
  optionValue = "code",
  horizontal,
  inputClassName,
}) => (
  <Field name={field}>
    {({ field: { name, value, onChange }, meta: { touched, error } }: FieldProps) => (
      <div
        className={classNames(
          "field space-y-2 relative",
          horizontal ? "inline-flex justify-between" : "flex flex-col",
          className,
        )}
      >
        {label && (
          <label
            htmlFor={name}
            className={classNames("text-sm font-medium text-gray-700", { "mr-3 mb-0 mt-2": horizontal })}
          >
            {label}
          </label>
        )}
        <MultiSelect
          id={name}
          name={name}
          optionLabel={optionLabel}
          optionValue={optionValue}
          options={options}
          onChange={onChange}
          value={value}
          className={classNames(
            "p-inputtext-sm",
            {
              "p-invalid": touched && error,
              horizontal: horizontal,
            },
            inputClassName,
          )}
        />
        <ErrorMessage name={field}>
          {(msg) => <small className="p-error absolute -bottom-6 ">{msg}</small>}
        </ErrorMessage>
      </div>
    )}
  </Field>
)

type Props = {
  field: string
  options: Object[]
  label?: string
  optionLabel: string
  optionValue?: string
  className?: string
  horizontal?: boolean
  inputClassName?: string
}

export { MultiSelectField }
