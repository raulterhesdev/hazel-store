import React from 'react';
import PropTypes from 'prop-types';

import classes from './Review.module.css';

import StarRating from '../../UI/StarRating/StarRating';

const Review = (props) => {
  return (
    <div className={classes.Review}>
      <h1 className={classes.Title}>{props.review.title}</h1>
      <div className={classes.Details}>
        <p>{props.review.firstName + ' ' + props.review.lastName} </p>
        <p>{props.review.date.toString().slice(4, 15)}</p>
      </div>
      <div className={classes.Rating}>
        <StarRating rating={props.review.rating} />
      </div>
      <p>{props.review.text}</p>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
