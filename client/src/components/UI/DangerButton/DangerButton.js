import React from 'react';
import PropTypes from 'prop-types';

import classes from './DangerButton.module.css';

const DangerButton = ({ onClick, title }) => {
  return (
    <button className={classes.Button} onClick={onClick}>
      {title}
    </button>
  );
};

DangerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DangerButton;
