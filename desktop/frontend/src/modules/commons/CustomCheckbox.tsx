import React, { useState } from 'react';
import '../../styles/CustomCheckbox.css'; // Asegúrate de crear este archivo CSS

interface CustomInputProps {
  value: boolean;
  style?: string;
  onChange: (value: boolean) => void;
}

const CustomCheckbox = ({ value, onChange, style }: CustomInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={value} onChange={handleChange}  />
      <span className="checkmark"></span>
    </label>
  );
};

export { CustomCheckbox };
