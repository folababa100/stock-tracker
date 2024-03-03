import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  animateOnHover: object;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  icon,
  animateOnHover,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        animate={isHovered ? animateOnHover : {}}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      {children}
    </button>
  );
};

export default BaseButton;
