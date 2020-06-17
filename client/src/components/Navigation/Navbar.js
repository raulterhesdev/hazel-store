import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backdrop from '../UI/Backdrop/Backdrop';
import Link from './Link/Link';

import classes from './Navbar.module.css';

import { toggleNavbar } from '../../store/actions/uiActions';

import { routes } from '../../constants/routes';

export class Navbar extends Component {
  state = {
    firstMount: true,
  };
  static propTypes = {
    navbarClosed: PropTypes.bool.isRequired,
    toggleNavbar: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.props.toggleNavbar();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firstMount) {
      this.setState({
        firstMount: false,
      });
    }
  }

  render() {
    // second ternary operator is used to not add the closed animation
    let navbarStyle;
    navbarStyle = !this.props.navbarClosed
      ? classes.Navbar + ' ' + classes.Open
      : this.state.firstMount
      ? classes.Navbar
      : classes.Navbar + ' ' + classes.Closed;

    let navbarLinks = [];
    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        const element = routes[key];
        const linkElement = (
          <Link
            link={element.path}
            exact={element.exact}
            name={element.name}
            key={key}
            onClick={this.toggle}
          />
        );
        navbarLinks.push(linkElement);
      }
    }

    return (
      <React.Fragment>
        <Backdrop show={!this.props.navbarClosed} onClick={this.toggle} />
        <div className={navbarStyle}>
          <span className={classes.Close} onClick={this.toggle}>
            &times;
          </span>
          {navbarLinks}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  navbarClosed: state.ui.navbarClosed,
});

const mapDispatchToProps = { toggleNavbar };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
