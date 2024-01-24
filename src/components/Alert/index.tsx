import React from 'react';
import { IoMdClose } from 'react-icons/io';
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
  dismissible = true,
  type = 'warning',
  ...props
}) => {
  return (
    <TransitionGroup>
      {show && (
        <CSSTransition timeout={500} classNames="alert">
          <div className={`alert alert-${type}`} {...props}>
            <div className="alert-container">{children}</div>
            {dismissible && (
              <button className="btn btn-close">
                <IoMdClose size={20} />
              </button>
            )}
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default Alert;
