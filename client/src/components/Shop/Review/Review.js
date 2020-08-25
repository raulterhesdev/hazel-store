import React from 'react';
import PropTypes from 'prop-types';

import classes from './Review.module.css';

import StarRating from '../../UI/StarRating/StarRating';

const Review = (props) => {
  return (
    <div className={classes.Review}>
      <div className={classes.TitleContainer}>
        <h1 className={classes.Title}>{props.review.title}</h1>
        <div className={classes.Rating}>
          <StarRating rating={props.review.rating} />
        </div>
      </div>
      <div className={classes.Details}>
        <p>
          {props.review.userId.firstName + ' ' + props.review.userId.lastName}{' '}
        </p>
        <p>{props.review.createdAt.toString().slice(0, 10)}</p>
      </div>
      <p>{props.review.text}</p>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
