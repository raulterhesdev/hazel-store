import React from 'react';
import classes from './Select.module.css';
import PropTypes from 'prop-types';

const Select = (props) => {
  const options = props.options.map((option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });

  return (
    <div className={classes.SelectContainer}>
      <label htmlFor={props.name} className={classes.Label}>
        {props.label}
      </label>
      <select
        className={classes.Select}
        name={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {options}
      </select>
      <p>{props.error}</p>
    </div>
  );
};
Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default Select;
