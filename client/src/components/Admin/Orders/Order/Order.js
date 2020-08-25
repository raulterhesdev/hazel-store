import React from 'react';
import PropTypes from 'prop-types';
import classes from './Order.module.css';

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <p className={classes.Section}>
        <span>Order ID:</span> {props.order._id}
      </p>
      <p className={classes.Section}>
        <span>Date:</span>{' '}
        {`${props.order.createdAt
          .toString()
          .slice(0, 10)} ${props.order.createdAt.toString().slice(11, 19)}`}
      </p>
      <p className={classes.Section}>
        <span>Name:</span>
        {` ${props.order.firstName} ${props.order.lastName}`}
      </p>
      <p className={classes.Section}>
        <span>Total:</span>
        {` $${props.order.totalPrice} `}
      </p>
      <p className={classes.Section}>
        <span>Address:</span>
        {` ${props.order.state} ${props.order.city} ${props.order.address} ${props.order.zip}`}
      </p>
      <p className={classes.Section}>
        <span>Phone:</span>
        {` $${props.order.phone} `}
      </p>
      <p className={classes.Section}>
        <span>Email:</span>
        {` $${props.order.email} `}
      </p>
      <p className={classes.Section}>
        <span>Order Content:</span>
      </p>
      <ul>
        <li>
          <span>Product</span>
          <span>Quantity</span>
        </li>
        {props.order.products.map((prod) => {
          return (
            <li key={prod._id}>
              <span>{prod.title}</span>
              <span>{prod.quantity}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Order.propTypes = {};

export default Order;
