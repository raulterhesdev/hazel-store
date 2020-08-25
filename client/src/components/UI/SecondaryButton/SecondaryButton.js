import React from 'react';
import PropTypes from 'prop-types';

import classes from './SecondaryButton.module.css';

const SecondaryButton = ({ onClick, disabled, title }) => {
  return (
    <button disabled={disabled} className={classes.Button} onClick={onClick}>
      {title}
    </button>
  );
};

SecondaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default SecondaryButton;
