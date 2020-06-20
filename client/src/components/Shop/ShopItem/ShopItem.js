import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../../UI/Card/Card';

import classes from './ShopItem.module.css';
import StarRating from '../../UI/StarRating/StarRating';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import Modal from '../../UI/Modal/Modal';

export class ShopItem extends Component {
  static propTypes = {
    product: PropTypes.object,
  };

  render() {
    const {
      imageUrl,
      title,
      discount,
      price,
      rating,
      ratingCount,
    } = this.props.product;
    return (
      <Card>
        {/* TODO */}
        <Modal show transparent>
          <p className={classes.Price}>${price}</p>
        </Modal>

        <div className={classes.ShopItem}>
          <img src={imageUrl} className={classes.Image} alt={title} />
          {/* Show discount badge in the corner if there is a discount */}
          {discount > 0 ? (
            <span className={classes.Discount}>{discount}%</span>
          ) : null}

          <div className={classes.InformationContainer}>
            <h1 className={classes.Title}>{title}</h1>
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

            <div className={classes.RatingContainer}>
              <StarRating rating={rating} />
              <p className={classes.Rating}>
                {rating} ({ratingCount})
              </p>
            </div>

            <PrimaryButton onClick={() => {}} title='Add to Cart' />
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);
