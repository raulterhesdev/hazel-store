import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShopItem from './ShopItem/ShopItem';

import classes from './Shop.module.css';

export class Shop extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  };

  render() {
    let shopItems = [];
    this.props.products.forEach((product) => {
      const shopElement = <ShopItem product={product} key={product._id} />;
      shopItems.push(shopElement);
    });
    return (
      <div className='container'>
        <div className={classes.Shop}>{shopItems}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.shop.products,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
