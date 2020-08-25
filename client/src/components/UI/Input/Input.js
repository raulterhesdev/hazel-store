import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.Input}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        autoComplete='off'
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      ></input>
      <p className={classes.Error}>{props.error}</p>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
