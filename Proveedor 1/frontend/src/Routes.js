import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Views Components
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import RegisterCategory from "./Views/RegisterCategory/RegisterCategory";
import ManageCategory from "./Views/ManageCategory/ManageCategory";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home}/>
        <Route path="/categories/register" exact component={RegisterCategory}/>
        <Route path="/categories/manage" exact component={ManageCategory}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;