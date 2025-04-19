import React, { useState, useRef } from 'react';

interface CustomInputProps {
  length: number;
  type: 'string' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
}

const CustomInput = ({ length, type, value, onChange }: CustomInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = value.toString().split('');
    newValue[index] = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Elimina caracteres no alfanuméricos
    onChange(newValue.join(''));

    // Move to the next input if a character is entered
    if (e.target.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to the previous input if backspace is pressed and the current input is empty
    if (e.key === 'Backspace' && !value.toString()[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0px' }}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value.toString()[index] || ''}
          maxLength={1}
          style={{
            width: '25px',
            height: '30px',
            // fontWeight:"bold",
            fontSize:"18px",
            textAlign: 'center',
            border: '2px dashed gray',
            borderStyle: 'dotted', // Estilo de borde punteado
          }}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export { CustomInput };
