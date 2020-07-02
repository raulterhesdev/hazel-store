import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navigation/Navbar';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Showcase from './components/Showcase/Showcase';
import Cart from './components/Cart/Cart';
import Account from './components/Account/Account';

import { routes } from './constants/routes';

import './App.css';

function App() {
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
        <Route
          path={routes.account.path}
          exact={routes.account.exact}
          component={Account}
        />
        <Redirect to={routes.home.path} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
