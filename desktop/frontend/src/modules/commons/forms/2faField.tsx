import { useRef, useEffect, useState } from "react";
import { Field, FieldProps, useFormikContext } from "formik";
import { classNames } from "primereact/utils";

const TwoFactorField = ({
  field,
  label,
  horizontal,
  floatLabel,
  className,
  inputClassName,
  validation,
  disabled,
  autofoco,
}: Props) => {
  const { setFieldValue, values } = useFormikContext<Code>();

  // Referencias para los campos de entrada
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, [autofoco]);

  useEffect(() => {
    const value = inputs.reduce((prev, curr) => {
      return prev + curr;
    });
    setFieldValue(field, value);
  }, [setFieldValue, inputs, field]);

  // Función que divide el valor de entrada en bloques de 6 caracteres y actualiza el valor de cada campo de entrada
  const cutCode = (value: string) => {
    const chunks = value.match(/.{1,1}/g) || [];
    const newInputs = [...inputs];
    chunks.forEach((chunk, index) => {
      newInputs[index] = chunk || "";
    });
    setInputs(newInputs);
  };

  // Manejador de eventos para pegar texto en los campos de entrada
  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    cutCode(event.clipboardData.getData("text"));
  };

  // Manejador de eventos para cambiar el valor de los campos de entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    cutCode(value);
  };

  // Manejador de eventos para presionar una tecla en los campos de entrada
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (!isNaN(Number(event.key))) {
      // Si se presiona un número, actualizar el valor del campo de entrada y enfocar el siguiente campo (si existe)
      const newInputs = [...inputs];
      newInputs[currentIndex] = event.key;
      setInputs(newInputs);
      if (event.key) {
        event.preventDefault();
        if (currentIndex < 5) {
          refs.current[currentIndex + 1]?.focus();
        }
      }
    } else {
      // Si se presiona la tecla de retroceso, borrar el valor del campo de entrada y enfocar el campo anterior (si existe)
      if (event.key === "Backspace") {
        const newInputs = [...inputs];
        newInputs[currentIndex] = "";
        setInputs(newInputs);
        event.preventDefault();
        if (currentIndex > 0) {
          refs.current[currentIndex - 1]?.focus();
        }
      }
    }
  };
  return (
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
          <div className="sm:col-span-4">
            <div className="mt-2 flex">
              {/* Campo de entrada oculto para capturar el valor del teclado */}
              <input
                type="text"
                id={name}
                name={name}
                value={values.code}
                onPaste={handleOnPaste}
                onChange={handleInputChange}
                className="block hidden"
              />

              {/* Campos de entrada para el código de autenticación */}
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`2fa${index + 1}`}
                  name={`2fa${index + 1}`}
                  type="text"
                  // Ref para enfocar el campo de entrada siguiente o anterior
                  ref={(ref) => (refs.current[index] = ref)}
                  onPaste={handleOnPaste}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  value={inputs[index]}
                  placeholder="0"
                  className="block m-1 p-2 w-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ))}
            </div>
          </div>

          {label && floatLabel && (
            <label
              htmlFor={name}
              className="text-sm text-gray-700  left-3 top-2 absolute transition-all ease-in-out"
            >
              {label}
            </label>
          )}
        </div>
      )}
    </Field>
  );
};

type Props = {
  field: string;
  label?: string;
  className?: string;
  horizontal?: boolean;
  floatLabel?: boolean;
  inputClassName?: string;
  validation?(value: string): void;
  disabled?: boolean;
  autofoco?: boolean;
};

type Code = {
  code?: string;
};

export { TwoFactorField };
