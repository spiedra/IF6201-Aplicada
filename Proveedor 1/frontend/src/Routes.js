import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Views Components
import Login from "./Views/Login/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact componets={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;