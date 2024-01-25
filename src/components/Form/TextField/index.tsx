import React from 'react';
import './TextField.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  id: string;
  placeholder?: string;
  maxlength?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  id,
  placeholder,
  maxlength,
  onChange,
  ...props
}) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        maxLength={maxlength}
        onChange={onChange}
        required
        {...props}
      />
    </div>
  );
};

export default TextField;
