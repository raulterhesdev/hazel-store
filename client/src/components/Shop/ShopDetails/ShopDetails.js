import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StarRating from '../../UI/StarRating/StarRating';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import TabButton from '../../UI/TabButton/TabButton';

import classes from './ShopDetails.module.css';

export default class ShopDetails extends Component {
  static propTypes = {
    product: PropTypes.object,
  };

  state = {
    showDescription: true,
  };

  showDescription = () => {
    this.setState({ showDescription: true });
  };

  showReviews = () => {
    this.setState({ showDescription: false });
  };

  render() {
    const {
      imageUrl,
      title,
      discount,
      price,
      rating,
      ratingCount,
      description,
    } = this.props.product;
    return (
      <div className={classes.ShopDetails}>
        {discount > 0 ? (
          <span className={classes.Discount}>{discount}%</span>
        ) : null}
        <h1 className={classes.Title}>{title}</h1>
        <div className={classes.Container}>
          <img src={imageUrl} className={classes.Image} alt={title} />
        </div>
        <div className={classes.InformationContainer}>
          <div className={classes.RatingContainer}>
            <StarRating rating={rating} />
            <p className={classes.Rating}>
              {rating} ({ratingCount})
            </p>
          </div>
          {discount > 0 ? (
            <div className={classes.PriceContainer}>
              <p className={classes.InitialPrice}>
                <del>${price}</del>
              </p>
              <p className={classes.Price}>
                ${(price - (discount / 100) * price).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className={classes.Price}>${price}</p>
          )}
        </div>
        <div className={classes.Container}>
          <PrimaryButton
            onClick={() => {
              console.log('NOT Toggle Modal');
            }}
            title='Add to Cart'
          />
        </div>
        <div className={classes.Content}>
          <div className={classes.TabBar}>
            <TabButton
              onClick={this.showDescription}
              title='Description'
              active={this.state.showDescription ? true : false}
            />
            <TabButton
              onClick={this.showReviews}
              title='Reviews'
              active={this.state.showDescription ? false : true}
            />
          </div>
          {this.state.showDescription ? (
            <div className={classes.DetailsContainer}>
              <p className={classes.Description}>{description}</p>
            </div>
          ) : (
            <div className={classes.DetailsContainer}></div>
          )}
        </div>
      </div>
    );
  }
}