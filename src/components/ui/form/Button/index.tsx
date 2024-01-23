import React from 'react';
import './Button.scss';

export enum EButtonAppearance {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: EButtonAppearance;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ appearance = EButtonAppearance.PRIMARY, children, ...props }) => {
  return (
    <button className={`button ${appearance}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
