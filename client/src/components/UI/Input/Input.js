import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
      ></input>
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
};

export default Input;
