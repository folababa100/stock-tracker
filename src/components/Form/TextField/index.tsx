import React from 'react';
import './TextField.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  id: string;
  maxlength?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  id,
  maxlength,
  onChange,
  ...props
}) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        maxLength={maxlength}
        onChange={onChange}
        required
        {...props}
      />
    </div>
  );
};

export default TextField;
