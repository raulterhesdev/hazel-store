import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Header.module.css';

import Logo from './Logo/Logo';
import Toggle from './Toggle/Toggle';
import Link from '../Navigation/Link/Link';

import { routes } from '../../constants/routes';

import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';

export class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    let navbarLinks = [];
    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        const element = routes[key];

        if (
          (element.admin === false && element.authenticated === false) ||
          (element.authenticated === true &&
            element.admin === false &&
            this.props.isAuthenticated === true) ||
          // this.props.role === 'user') ||
          (element.admin === true &&
            element.authenticated === true &&
            this.props.isAuthenticated === true &&
            this.props.role === 'admin')
        ) {
          const linkElement = (
            <Link
              link={element.path}
              exact={element.exact}
              name={element.name}
              key={key}
            />
          );
          navbarLinks.push(linkElement);
        }
      }
    }
    return (
      <div className={classes.Header}>
        <Toggle />
        <Logo />
        <div className={classes.LinkContainer}>{navbarLinks}</div>
        {this.props.isAuthenticated ? (
          <span onClick={this.props.logout} className={classes.Logout}>
            Logout
          </span>
        ) : (
          <NavLink to={'/auth'} exact className={classes.Link}>
            Login
          </NavLink>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.user.role,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
