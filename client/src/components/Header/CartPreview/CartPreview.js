import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import classes from './CartPreview.module.css';
import { routes } from '../../../constants/routes';

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
          <div key={cartItem.productId} className={classes.Item}>
            <span>&times;{cartItem.quantity}</span>
            <p className={classes.ItemTitle}>{cartItem.title}</p>
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
            {productsInCart ? (
              <p className={classes.Title}>Cart Items</p>
            ) : null}
            {cartItems}
            {productsInCart ? (
              <p className={classes.Total}>
                Total Price: ${this.props.cart.totalPrice}
              </p>
            ) : null}
            {productsInCart ? (
              <div className={classes.LinkContainer}>
                <NavLink
                  to={routes.cart.path}
                  exact={routes.cart.exact}
                  className={classes.Link}
                  onClick={this.toggle}
                >
                  Go to Cart
                </NavLink>
              </div>
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
