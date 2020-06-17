import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Toggle.module.css';

import { toggleNavbar } from '../../../store/actions/uiActions';

export class Toggle extends Component {
  static propTypes = {
    navbarClosed: PropTypes.bool.isRequired,
    toggleNavbar: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.props.toggleNavbar();
  };

  render() {
    let style = classes.Toggle;

    style = !this.props.navbarClosed ? style + ' ' + classes.Close : style;

    return (
      <div className={style} onClick={this.toggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navbarClosed: state.ui.navbarClosed,
});

const mapDispatchToProps = { toggleNavbar };

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
