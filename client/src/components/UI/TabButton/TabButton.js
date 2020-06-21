import React from 'react';
import PropTypes from 'prop-types';

import classes from './TabButton.module.css';

const TabButton = ({ onClick, disabled, title, active }) => {
  const style = active ? classes.Button + ' ' + classes.Active : classes.Button;
  return (
    <button disabled={disabled} className={style} onClick={onClick}>
      {title}
    </button>
  );
};

TabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default TabButton;
