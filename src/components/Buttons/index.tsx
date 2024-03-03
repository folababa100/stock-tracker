import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { ButtonType } from 'types';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {icon && (
        <motion.div
          className="flex"
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {icon}
        </motion.div>
      )}
      {children}
    </button>
  );
};

export default Button;
