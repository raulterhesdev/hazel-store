import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShopItem from './ShopItem/ShopItem';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Shop.module.css';

import { fetchProducts, fetchReviews } from '../../store/actions/shopActions';

export class Shop extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    fetchReviews: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchReviews();
  }

  render() {
    let shopItems = [];
    this.props.products.forEach((product) => {
      const shopElement = <ShopItem product={product} key={product._id} />;
      shopItems.push(shopElement);
    });
    return (
      <div className='container'>
        <div className={classes.Shop}>
          {this.props.isLoading ? <Spinner /> : shopItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.shop.products,
  isLoading: state.shop.isLoading,
});

const mapDispatchToProps = { fetchProducts, fetchReviews };

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
