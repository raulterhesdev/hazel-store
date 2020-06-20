import React from 'react';
import PropTypes from 'prop-types';

import classes from './PrimaryButton.module.css';

const PrimaryButton = ({ onClick, disabled, title }) => {
  return (
    <button disabled={disabled} className={classes.Button} onClick={onClick}>
      {title}
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default PrimaryButton;
