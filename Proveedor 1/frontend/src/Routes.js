import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Views Components
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;