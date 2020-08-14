import React from 'react';
import PropTypes from 'prop-types';

import classes from './CartItem.module.css';

import Quantity from '../../UI/Quantity/Quantity';
import DangerButton from '../../UI/DangerButton/DangerButton';

const CartItem = ({
  product,
  quantity,
  updateQuantity,
  removeProduct,
  ...props
}) => {
  return (
    <div className={classes.CartItem}>
      <div className={classes.Container}>
        <Quantity
          value={quantity}
          add={() => updateQuantity(product._id, 'add', product.price)}
          subtract={() => updateQuantity(product._id, 'dec', product.price)}
        />
        <div>
          <p className={classes.Title}>{product.title}</p>
          <p className={classes.Price}> Price per unit: ${product.price}</p>
        </div>

        <DangerButton
          title='X'
          onClick={() => removeProduct(product._id, quantity, product.price)}
        />
      </div>

      <p className={classes.Total}>
        Price:{' '}
        <span className={classes.Highlight}>${quantity * product.price}</span>
      </p>
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
