import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { routes } from "./constants/routes";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/" exact component={} /> */}
        <Redirect to={routes.home} />
      </Switch>
    </div>
  );
}

export default App;
