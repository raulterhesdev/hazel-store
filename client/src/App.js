import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navigation/Navbar';

import { routes } from './constants/routes';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Switch>
        {/* <Route path="/" exact component={} /> */}
        <Redirect to={routes.home.path} />
      </Switch>
    </div>
  );
}

export default App;
