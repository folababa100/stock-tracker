import React from 'react';
import Button from 'components/Button';

import { AlertType } from 'types';

import './Alert.scss';

interface AlertProps {
  show: boolean;
  onClick: () => void;
  type?: AlertType;
  isConnecting: boolean;
}

const Alert: React.FC<AlertProps> = ({
  show,
  type = 'warning',
  isConnecting,
  onClick,
}) => {
  return show ? (
    <div className={`alert alert-${type}`}>
      <div className="alert-container">
        {isConnecting
          ? 'Connecting...'
          : 'Oops! Something went wrong. Please try again.'}
        <Button
          variant="secondary"
          className="btn-sm mt-2"
          onClick={onClick}
          disabled={isConnecting}
        >
          Reconnect
        </Button>
      </div>
    </div>
  ) : null;
};

export default Alert;
