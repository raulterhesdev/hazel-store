import React from 'react';
import PropTypes from 'prop-types';

import classes from './Quantity.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Quantity = (props) => {
  return (
    <div className={classes.Quantity}>
      <p className={classes.Up} onClick={props.add}>
        <FontAwesomeIcon icon={faAngleUp} />
      </p>
      <p className={classes.Value}> {props.value}</p>
      <p className={classes.Down} onClick={props.subtract}>
        <FontAwesomeIcon icon={faAngleDown} />
      </p>
    </div>
  );
};

Quantity.propTypes = {
  value: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  subtract: PropTypes.func.isRequired,
};

export default Quantity;
