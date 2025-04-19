import { FC, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Field, FieldProps, ErrorMessage } from "formik";
import { classNames } from "primereact/utils";

// import { useAzureContainer } from "../hooks"

const FileUploaderField: FC<Props> = ({
  field,
  azureContainer,
  label,
  accept = "application/pdf",
  className,
  disabled,
  maxFileSize,
}) => {
  const fileInput = useRef<FileUpload>(null);
  const clearFiles = () => fileInput.current?.clear();
  // const { uploadFile } = useAzureContainer(azureContainer)

  const handleFileSelect =
    (
      name: string,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => void
    ) =>
    (event: { files: any[] }) => {
      const file = event.files[0];
      // uploadFile(file).then((url) => {
      //   setFieldValue(name, { url })
      // })
    };

  return (
    <Field name={field}>
      {({
        field: { name },
        meta: { touched, error },
        form: { setFieldValue, setFieldError, setFieldTouched },
      }: FieldProps) => {
        const addValidationError = (f: File) => {
          if (maxFileSize && f.size > maxFileSize) {
            setFieldError(
              name,
              `Invalid file. Max file size is ${Math.floor(
                maxFileSize / 1000000
              )}MB.`
            );
          }

          setFieldTouched(name, true, false);
        };

        return (
          <div
            className={classNames("field flex flex-col relative", className)}
          >
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700 mb-2"
              >
                {label}
              </label>
            )}
            <FileUpload
              id={name}
              name={name}
              accept={accept}
              maxFileSize={maxFileSize}
              disabled={disabled}
              customUpload
              ref={fileInput}
              uploadHandler={clearFiles}
              onSelect={handleFileSelect(name, setFieldValue)}
              onValidationFail={addValidationError}
              mode="basic"
              className={classNames("p-button-sm", {
                "p-invalid": touched && error,
              })}
            />

            <div className="flex items-start p-error h-2 mt-1">
              <ErrorMessage name={field}>
                {(msg) => <small>{msg}</small>}
              </ErrorMessage>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

type Props = {
  field: string;
  azureContainer: string;
  label?: string;
  accept?: "application/pdf" | "image/*";
  className?: string;
  disabled?: boolean;
  maxFileSize?: number;
};

export { FileUploaderField };
