import React from 'react';
import PropTypes from 'prop-types';

import classes from './CartItem.module.css';

const CartItem = ({
  product,
  quantity,
  updateQuantity,
  removeProduct,
  ...props
}) => {
  return (
    <div className={classes.CartItem}>
      <div className={classes.Quantity}>
        <p>{product.title}</p>
        <p> &times;{quantity}</p>
        <p onClick={() => updateQuantity(product._id, 'add', product.price)}>
          Add
        </p>
        <p onClick={() => updateQuantity(product._id, 'dec', product.price)}>
          Dec
        </p>
        <p onClick={() => removeProduct(product._id, quantity, product.price)}>
          Delete
        </p>
      </div>
      <p className={classes.Price}> Price per unit: ${product.price}</p>
      <p className={classes.Total}>Price: ${quantity * product.price}</p>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default CartItem;
