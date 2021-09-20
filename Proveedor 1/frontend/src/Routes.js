import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Views Components
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import RegisterCategory from "./Views/RegisterCategory/RegisterCategory";
import RegisterProduct from "./Views/RegisterProduct/RegisterProduct";
import SearchProduct from "./Views/SearchProduct/SearchProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home}/>
        <Route path="/register/categories" exact component={RegisterCategory}/>
        <Route path="/register/products" exact component={RegisterProduct}/>
        <Route path="/search/products" exact component={SearchProduct}/>
        <Route path="/delete/products" exact component={RegisterProduct}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;