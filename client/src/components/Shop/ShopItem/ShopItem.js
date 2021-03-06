import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../../UI/Card/Card';

import classes from './ShopItem.module.css';
import StarRating from '../../UI/StarRating/StarRating';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
// import Modal from '../../UI/Modal/Modal';
// import ShopDetails from '../ShopDetails/ShopDetails';

import { addToCart } from '../../../store/actions/cartActions';

export class ShopItem extends Component {
  static propTypes = {
    product: PropTypes.object,
  };
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  addToCart = () => {
    this.props.addToCart({
      title: this.props.product.title,
      _id: this.props.product._id,
      price: this.props.product.price,
    });
  };

  render() {
    const Modal = lazy(() => import('../../UI/Modal/Modal'));
    const ShopDetails = lazy(() => import('../ShopDetails/ShopDetails'));
    const { imageUrl, title, discount, price, rating } = this.props.product;
    return (
      <Card>
        <Suspense fallback={<div></div>}>
          <Modal
            show={this.state.showModal}
            modalClosed={this.toggleModal}
            fullScreen
          >
            <span className={classes.Close} onClick={this.toggleModal}>
              &times;
            </span>
            <ShopDetails
              product={this.props.product}
              addToCart={this.addToCart}
            />
          </Modal>
        </Suspense>
        <div className={classes.ShopItem}>
          {discount > 0 ? (
            <span className={classes.Discount}>{discount}%</span>
          ) : null}
          <img
            src={imageUrl}
            className={classes.Image}
            alt={title}
            onClick={this.toggleModal}
          />

          <div className={classes.InformationContainer}>
            <h1 className={classes.Title} onClick={this.toggleModal}>
              {title}
            </h1>
            <div className={classes.RatingContainer}>
              <StarRating rating={rating} />
              <p className={classes.Rating}>{rating}</p>
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
          <div className={classes.Button}>
            <PrimaryButton onClick={this.addToCart} title='Add to Cart' />
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);
