import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import classes from './CartPreview.module.css';

export default class CartPreview extends Component {
  static propTypes = {};
  state = {
    open: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div className={classes.CartPreview}>
        <div className={classes.Cart} onClick={this.toggle}>
          <FontAwesomeIcon icon={faCartArrowDown} />
        </div>
        {this.state.open ? (
          <p className={classes.CartContent}>no content to display yet</p>
        ) : null}
      </div>
    );
  }
}
