import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CartItem from './CartItem/CartItem';
import Card from '../UI/Card/Card';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import Input from '../UI/Input/Input';
import Payment from './Payment/Payment';

import { sendOrder } from '../../store/actions/ordersActions';

import classes from './Cart.module.css';

import { updateCartItem, removeProduct } from '../../store/actions/cartActions';
import { getLoggedUser } from '../../store/actions/authActions';

const stripePromise = loadStripe(
  'pk_test_51HJcsuDOFMg8jbOcUlDUzoZPCZzA04m2sfdpPsablzEvghuvTRuTYm2caCSLspujQAAdG2fwIn4SNzOS449tMXyL00ZXtvXA2m'
);

export class Cart extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    user: PropTypes.object,
    getLoggedUser: PropTypes.func.isRequired,
    sendOrder: PropTypes.func.isRequired,
  };

  state = {
    step: 0,
    deliveryInformation: {
      firstName: this.props.user.firstName ? this.props.user.firstName : '',
      lastName: this.props.user.lastName ? this.props.user.lastName : '',
      email: this.props.user.email ? this.props.user.email : '',
      address: this.props.user.address ? this.props.user.address : '',
      city: this.props.user.city ? this.props.user.city : '',
      state: this.props.user.state ? this.props.user.state : '',
      zip: this.props.user.zip ? this.props.user.zip : '',
      phone: this.props.user.phone ? this.props.user.phone : '',
    },
  };

  componentDidMount() {
    this.props.getLoggedUser();
  }

  nextStep = () => {
    if (this.state.step === 3) {
      this.setState({ step: 0 });
    } else {
      this.setState({ step: this.state.step + 1 });
    }
  };

  changeStep = (index) => {
    if (index !== 3) {
      this.setState({ step: index });
    }
  };

  updateQuantity = (id, type, price) => {
    this.props.updateCartItem({ id, type, price });
  };

  removeProduct = (id, quantity, price) => {
    this.props.removeProduct({ id, quantity, price });
  };

  onChange = (e) => {
    this.setState({
      deliveryInformation: {
        [e.target.name]: e.target.value,
      },
    });
  };

  paymentSuccess = () => {
    this.props.sendOrder({
      ...this.state.deliveryInformation,
      products: this.props.cart.products,
      paymentConfirmed: 'confirmed',
      totalPrice: this.props.cart.totalPrice.toFixed(2),
    });
    this.setState({ step: 3 });
  };

  render() {
    let cartItems = <p>No items added to the cart. Go to shop to add some.</p>;
    if (this.props.cart.products.length > 0) {
      cartItems = this.props.cart.products.map((cartItem) => {
        const currentProduct = this.props.products.filter(
          (product) => product._id === cartItem.productId
        );
        return (
          <CartItem
            product={currentProduct[0]}
            key={currentProduct[0]._id}
            quantity={cartItem.quantity}
            updateQuantity={this.updateQuantity}
            removeProduct={this.removeProduct}
          />
        );
      });
    }

    const steps = [];
    steps[0] = (
      <Card>
        <div className={classes.Container}>
          <p className={classes.Title}>Your Cart:</p>
          {cartItems}
          <p className={classes.TotalPrice}>
            Total Price: ${this.props.cart.totalPrice.toFixed(2)}
          </p>
        </div>
      </Card>
    );
    steps[1] = (
      <Card>
        <div className={classes.Container}>
          <p className={classes.Title}>Delivery Details:</p>
          <Input
            type='text'
            name='firstName'
            value={this.state.deliveryInformation.firstName}
            label='First Name'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='lastName'
            value={this.state.deliveryInformation.lastName}
            label='Last Name'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='email'
            label='Email'
            value={this.state.deliveryInformation.email}
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='address'
            value={this.state.deliveryInformation.address}
            label='Delivery Address'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='city'
            value={this.state.deliveryInformation.city}
            label='City'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='state'
            value={this.state.deliveryInformation.state}
            label='State'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='zip'
            value={this.state.deliveryInformation.zip}
            label='ZIP Code'
            onChange={this.onChange}
          />
          <Input
            type='text'
            name='phone'
            value={this.state.deliveryInformation.phone}
            label='Phone Number'
            onChange={this.onChange}
          />
        </div>
      </Card>
    );
    steps[2] = (
      <Card>
        <div className={classes.Container}>
          <p className={classes.Title}>Payment</p>
          <Payment
            deliveryInformation={this.state.deliveryInformation}
            amount={this.props.cart.totalPrice.toFixed(2)}
            onSuccess={this.paymentSuccess}
            disableButton={this.props.paymentLoading}
          />
        </div>
      </Card>
    );
    steps[3] = (
      <Card>
        <div className={classes.Container}>
          <p className={classes.Title}>Order was sent</p>
          <p>Thank you for the purchase.</p>
        </div>
      </Card>
    );

    const buttonText = ['Next >>', 'Next >>', 'Send order', 'Back to Shop'];

    return (
      <div className={classes.Cart}>
        <Elements stripe={stripePromise}>
          <Breadcrumbs
            numberOfCrumbs={4}
            activeCrumb={this.state.step}
            onClick={this.changeStep}
          />
          {steps[this.state.step]}
          <div className={classes.ButtonContainer}>
            {this.state.step === 2 ? null : (
              <PrimaryButton
                title={buttonText[this.state.step]}
                onClick={this.nextStep}
              />
            )}
          </div>
        </Elements>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  products: state.shop.products,
  user: state.auth.user,
  paymentLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  updateCartItem,
  removeProduct,
  getLoggedUser,
  sendOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
