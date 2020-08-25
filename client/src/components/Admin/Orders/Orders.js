import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Orders.module.css';

import { fetchOrders } from '../../../store/actions/ordersActions';
import Order from './Order/Order';

export class Orders extends Component {
  static propTypes = {
    fetchOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const ordersContent = this.props.orders.map((order) => {
      return <Order key={order._id} order={order} />;
    });
    return <div className={classes.Orders}>{ordersContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  products: state.shop.products,
});

const mapDispatchToProps = { fetchOrders };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
