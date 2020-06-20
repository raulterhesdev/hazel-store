import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, modalClosed, transparent, ...props }) => {
  return (
    <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} transparent={transparent} />
      <div
        className={classes.Modal}
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
