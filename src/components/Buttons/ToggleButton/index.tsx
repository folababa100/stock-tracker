import React from 'react';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

import BaseButton from '../BaseButton';

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLight: boolean;
  color: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isLight,
  color,
  ...props
}) => {
  return (
    <BaseButton
      className="button-theme flex flex-center"
      aria-label="Toggle theme"
      title="Toggle theme"
      animateOnHover={{ rotate: 180 }}
      icon={
        isLight ? (
          <MdOutlineLightMode size={30} color={color} />
        ) : (
          <MdOutlineNightlight size={30} color={color} />
        )
      }
      {...props}
    />
  );
};

export default ToggleButton;
