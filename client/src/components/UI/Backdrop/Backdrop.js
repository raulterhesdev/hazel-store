import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

const Backdrop = ({ transparent, show, onClick, onlySmallScreen }) => {
  let additionalClass = onlySmallScreen ? classes.OnlySmall : '';
  additionalClass = transparent
    ? additionalClass + ' ' + classes.Transparent
    : additionalClass + ' ' + classes.Blurred;
  return show ? (
    <div
      className={classes.Backdrop + ' ' + additionalClass}
      onClick={onClick}
    ></div>
  ) : null;
};

Backdrop.propTypes = {
  transparent: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
