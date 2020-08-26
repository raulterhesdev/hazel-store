import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navigation/Navbar';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Showcase from './components/Showcase/Showcase';
import Cart from './components/Cart/Cart';
import Account from './components/Account/Account';
import Admin from './components/Admin/Admin';
import Auth from './components/Auth/Auth';
import Message from './components/Message/Message';

import { routes } from './constants/routes';

import './App.css';

export class App extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
    role: PropTypes.string,
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Navbar />
        <Switch>
          <Route
            path={routes.home.path}
            exact={routes.home.exact}
            component={Showcase}
          />
          <Route
            path={routes.products.path}
            exact={routes.products.exact}
            component={Shop}
          />
          <Route
            path={routes.cart.path}
            exact={routes.cart.exact}
            component={Cart}
          />
          {this.props.isAuth ? (
            <Route
              path={routes.account.path}
              exact={routes.account.exact}
              component={Account}
            />
          ) : null}
          {this.props.role === 'admin' ? (
            <Route
              path={routes.admin.path}
              exact={routes.admin.exact}
              component={Admin}
            />
          ) : null}
          <Route path={'/auth'} exact component={Auth} />
          <Redirect to={routes.home.path} />
        </Switch>
        <Footer />
        <Message />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  role: state.auth.user.role,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
