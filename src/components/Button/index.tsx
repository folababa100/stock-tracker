import React from 'react';
import './Button.scss';

type Appearance = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: Appearance;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  appearance = 'primary',
  children,
  ...props
}) => {
  return (
    <button className={`button ${appearance}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
