import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Products from './Products';
import Categories from './Categories';
import User from './User';
import Orders from './Orders';
import Home from './Home';
import Cart from './Cart';
import LoginForm from './LoginForm';

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <LoginForm />
        <Route path="/" exact render={() => <Home />} />
        <Switch>
          <Route path="/products" exact render={() => <Products />} />
          <Route path="/catagories" exact render={() => <Categories />} />
          <Route path="/cart" exact render={() => <Cart />} />
          <Route path="/orders" exact render={() => <Orders />} />
          <Route path="/user" exact render={() => <User />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
