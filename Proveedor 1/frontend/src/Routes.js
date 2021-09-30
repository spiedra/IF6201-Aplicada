import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Views Components
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import RegisterCategory from "./Views/RegisterCategory/RegisterCategory";
import ManageCategory from "./Views/ManageCategory/ManageCategory";
import RegisterProduct from "./Views/RegisterProduct/RegisterProduct";
import SearchProduct from "./Views/SearchProduct/SearchProduct";
import ManageProduct from "./Views/ManageProduct/ManageProduct";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home}/>
        <Route path="/categories/register" exact component={RegisterCategory}/>
        <Route path="/categories/manage" exact component={ManageCategory}/>
        <Route path="/products/register" exact component={RegisterProduct}/>
        <Route path="/products/manage" exact component={ManageProduct}/>
        <Route path="/search/products" exact component={SearchProduct}/>
        <Route path="/delete/products" exact component={RegisterProduct}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;