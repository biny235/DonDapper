import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  fetchOrders,
  fetchLineItems
} from './store';

import Nav from './Nav';
import Products from './Products';
import Product from './Product';
import Categories from './Categories';
import Category from './Category';
import User from './User';
import Orders from './Orders';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';
import LoginForm from './LoginForm';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchOrders();
    this.props.fetchLineItems();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav history={history} />
          <LoginForm />
          <Route path="/" exact render={() => <Home />} />
          <Switch>
            <Route path="/products" exact render={() => <Products />} />
            <Route
              path="/products/:id"
              exact
              render={({ match }) => <Product id={match.params.id * 1} />}
            />
            <Route path="/categories" exact render={() => <Categories />} />
            <Route
              path="/categories/:id"
              exact
              render={({ match }) => <Category id={match.params.id * 1} />}
            />
            <Route path="/cart" exact render={() => <Cart />} />
            <Route path="/orders" exact render={() => <Orders />} />
            <Route
              path="/orders/:id"
              exact
              render={({ match }) => <Order id={match.params.id * 1} />}
            />
            <Route path="/user" exact render={() => <User />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchOrders: () => dispatch(fetchOrders()),
    fetchLineItems: () => dispatch(fetchLineItems())
  };
};

export default connect(null, mapDispatchToProps)(Main);
