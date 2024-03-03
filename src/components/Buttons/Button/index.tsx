import React from 'react';
import { ButtonType } from 'types';
import BaseButton from '../BaseButton';

import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  return (
    <BaseButton
      className={`btn btn-${variant} ${className}`}
      animateOnHover={{ rotate: 10 }}
      icon={icon}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
