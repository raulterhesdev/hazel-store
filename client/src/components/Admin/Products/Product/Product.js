import React from 'react';
import PropTypes from 'prop-types';

import classes from './Product.module.css';

const Product = ({ product, ...props }) => {
  return (
    <div className={classes.Product}>
      <div className={classes.Section}>
        <img src={product.imageUrl} alt='' className={classes.Image} />
        <div className={classes.Content}>
          <p className={classes.Title}>{product.title}</p>
          <div className={classes.Details}>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
          <div className={classes.Actions}>
            <span onClick={() => props.onClick(product)}>Edit</span>
            <span onClick={() => props.onDelete(product._id)}>Delete</span>
          </div>
        </div>
      </div>
      <p className={classes.Description}>{product.description}</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
