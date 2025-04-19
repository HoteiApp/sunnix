import { useEffect, useRef, useState } from "react";

const TwoFactor = () => {
  // Referencias para los campos de entrada
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    const value = inputs.reduce((prev, curr) => {
      return prev + curr;
    });

    console.log(value);
  }, [inputs]);
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
    <div className="sm:col-span-4">
      <legend className="pt-2 text-sm font-semibold leading-6 text-gray-900">
        Código
      </legend>
      <div className="mt-2 flex">
        {/* Campo de entrada oculto para capturar el valor del teclado */}
        <input
          type="text"
          id="code"
          name="code"
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
  );
};

export { TwoFactor };
