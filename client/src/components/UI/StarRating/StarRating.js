import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './StarRating.module.css';

const StarRating = ({ rating }) => {
  let stars = [];
  for (let index = 1; index <= 5; index++) {
    let element;
    if (index < Math.round(rating)) {
      element = (
        <FontAwesomeIcon icon={faStar} className={classes.Star} key={index} />
      );
    } else if (index === Math.round(rating)) {
      if (rating - Math.floor(rating) >= 0.5) {
        element = (
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            className={classes.Star}
            key={index}
          />
        );
      } else {
        element = (
          <FontAwesomeIcon icon={faStar} className={classes.Star} key={index} />
        );
      }
    } else {
      element = (
        <FontAwesomeIcon icon={faStar} className={classes.Empty} key={index} />
      );
    }
    stars.push(element);
  }
  return <div>{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
