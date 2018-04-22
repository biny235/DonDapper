import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchOrders, fetchLineItems } from './store';

import Nav from './Nav';
import Products from './Products';
import Categories from './Categories';
import User from './User';
import Orders from './Orders';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';
import LoginForm from './LoginForm';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchOrders();
    this.props.fetchLineItems();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <LoginForm />
          <Route path='/' exact render={() => <Home />} />
          <Switch>
            <Route path='/products' exact render={() => <Products />} />
            <Route path='/categories' exact render={() => <Categories />} />
            <Route path='/cart' exact render={() => <Cart />} />
            <Route path='/orders' exact render={() => <Orders />} />
            <Route path='/orders/:id' exact render={({ match }) => <Order id={match.params.id * 1} />} />
            <Route path='/user' exact render={() => <User />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchOrders: () => dispatch(fetchOrders()),
    fetchLineItems: () => dispatch(fetchLineItems())
  };
};

export default connect(null, mapDispatchToProps)(Main);
