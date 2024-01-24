import React from 'react';
import './TextField.scss';

interface TextFieldProps {
  value: string;
  label: string;
  id: string;
  placeholder?: string;
  maxlength?: number;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  id,
  placeholder,
  maxlength,
  onChange,
}) => {
  return (
    <div className="text-field__container">
      <label htmlFor={id} className="text-field__label">
        {label}
      </label>
      <input
        id={id}
        className="text-field"
        value={value}
        placeholder={placeholder}
        maxLength={maxlength}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default TextField;
