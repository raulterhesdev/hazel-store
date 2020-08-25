import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../UI/Card/Card';
import Nav from './Nav/Nav';
import Products from './Products/Products';
import Orders from './Orders/Orders';

import classes from './Admin.module.css';

import { adminRouter } from '../../constants/routes';

export class Admin extends Component {
  static propTypes = {};

  render() {
    let displayComponent;
    switch (this.props.location.pathname) {
      case `/admin/${adminRouter.orders.path}`:
        displayComponent = <Orders />;
        break;
      case `/admin/${adminRouter.products.path}`:
        displayComponent = <Products />;

      default:
        break;
    }
    return (
      <div className={classes.Admin}>
        <Card>
          <div className={classes.Container}>
            <div className={classes.Title}>Admin Panel</div>
            <Nav />
            {displayComponent}
          </div>
        </Card>
      </div>
    );
  }
}

export default Admin;
