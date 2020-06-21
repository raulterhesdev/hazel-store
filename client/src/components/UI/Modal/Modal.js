import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, modalClosed, transparent, fullScreen, ...props }) => {
  const modalClasses = fullScreen
    ? classes.Modal + ' ' + classes.Full
    : classes.Modal;
  return (
    <React.Fragment>
      <Backdrop show={show} onClick={modalClosed} transparent={transparent} />
      <div
        className={modalClasses}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

Modal.propTypes = {};

export default Modal;
