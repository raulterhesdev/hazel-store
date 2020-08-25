import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StarRating from '../../UI/StarRating/StarRating';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton';
import TabButton from '../../UI/TabButton/TabButton';
import Review from '../Review/Review';
import AddReview from '../AddReview/AddReview';

import classes from './ShopDetails.module.css';

class ShopDetails extends Component {
  static propTypes = {
    product: PropTypes.object,
    reviews: PropTypes.array,
    addToCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  state = {
    showDescription: true,
    showAddReview: false,
  };

  showDescription = () => {
    this.setState({ showDescription: true });
  };

  showReviews = () => {
    this.setState({ showDescription: false });
  };

  showAddReview = () => {
    this.setState({ showAddReview: !this.state.showAddReview });
  };

  render() {
    let reviewCount = 0;
    const {
      _id,
      imageUrl,
      title,
      discount,
      price,
      rating,
      description,
    } = this.props.product;

    const reviewData = this.props.reviews
      .filter((review) => review.productId === _id)
      .map((review) => {
        reviewCount += 1;
        return <Review key={review._id} review={review} />;
      });
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
              {rating} ({reviewCount})
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
        <div className={classes.ActionContainer}>
          {this.props.isAuthenticated ? (
            <SecondaryButton
              onClick={this.showAddReview}
              title='Leave a rating'
            />
          ) : null}
          <PrimaryButton onClick={this.props.addToCart} title='Add to Cart' />
        </div>
        {this.state.showAddReview ? (
          <AddReview closeReview={this.showAddReview} productId={_id} />
        ) : null}
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
            <div className={classes.DetailsContainer}>{reviewData}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.shop.reviews,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails);
