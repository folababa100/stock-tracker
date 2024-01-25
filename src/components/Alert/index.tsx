import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AlertType } from 'types';

import './Alert.scss';

interface AlertProps {
  show: boolean;
  dismissible?: boolean;
  type?: AlertType;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  children,
  show,
  type = 'warning',
  ...props
}) => {
  return (
    <TransitionGroup>
      {show && (
        <CSSTransition timeout={500} classNames="alert">
          <div className={`alert alert-${type}`} {...props}>
            <div className="alert-container">{children}</div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default Alert;
