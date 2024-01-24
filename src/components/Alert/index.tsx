import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Button.scss';

interface AlertProps {
  show: boolean;
  dismissible?: boolean;
  type?: 'warning' | 'danger' | 'success';
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
            <div className="alert__content">{children}</div>
            {dismissible && (
              <button className="alert__close">
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
