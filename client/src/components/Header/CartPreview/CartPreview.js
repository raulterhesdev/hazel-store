import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import classes from './CartPreview.module.css';

export class CartPreview extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    products: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    let cartItems = <p>No items added to the cart. Go to shop to add some.</p>;
    let productsInCart = false;
    if (this.props.cart.products.length > 0) {
      productsInCart = true;
      cartItems = this.props.cart.products.map((cartItem) => {
        return (
          <div key={cartItem.productId}>
            <p>{cartItem.title}</p>
            <span>&times;{cartItem.quantity}</span>
          </div>
        );
      });
    }
    return (
      <div className={classes.CartPreview}>
        <div className={classes.Cart} onClick={this.toggle}>
          <FontAwesomeIcon icon={faCartArrowDown} />
        </div>
        {this.state.open ? (
          <div className={classes.CartContent}>
            {productsInCart ? <p>Cart Items</p> : null}
            {cartItems}
            {productsInCart ? (
              <p>Total Price: ${this.props.cart.totalPrice}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartPreview);
