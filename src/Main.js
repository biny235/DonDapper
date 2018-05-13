import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  authenticateUser,
  fetchCart
} from './store';
import { Container } from 'reactstrap';

import Navigation from './Navigation';
import Products from './Products';
import Product from './Product';
import Categories from './Categories';
import Category from './Category';
import User from './User';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';
import Dashboard from './Dashboard';
import Checkout from './Checkout';
import Autocomplete from './Autocomplete';
import PasswordChange from './PasswordChange';
import Footer from './Footer';

class Main extends Component {
  componentDidMount() {
    window.localStorage.getItem('token') && this.props.authenticateUser();
    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchCart();
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            render={({ history, location }) => (
              <Navigation history={history} path={location.pathname} />
            )}
          />
          <Container>
            <Route path="/" exact render={() => <Home />} />
            <Switch>
              <Route
                path="/dashboard"
                exact
                render={({ history }) => <Dashboard history={history} />}
              />
              <Route
                path="/products"
                exact
                render={({ history }) => <Products history={history} />}
              />
              <Route
                path="/products/:id"
                exact
                render={({ match, history }) => (
                  <Product id={match.params.id * 1} history={history} />
                )}
              />
              <Route path="/categories" exact render={() => <Categories />} />
              <Route
                path="/categories/:id"
                exact
                render={({ match }) => <Category id={match.params.id * 1} />}
              />
              <Route
                path="/cart"
                exact
                render={({ history }) => <Cart history={history} />}
              />
              <Route
                path="/checkout"
                exact
                render={({ history }) => <Checkout history={history} />}
              />
              <Route
                path="/orders/:id"
                exact
                render={({ match }) => <Order id={match.params.id * 1} />}
              />
              <Route path="/user" exact render={() => <User />} />
              <Route
                path="/user/password"
                exact
                render={({ history }) => <PasswordChange history={history} />}
              />
              <Route
                path="/test/google"
                exact
                render={() => <Autocomplete />}
              />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    authenticateUser: () => dispatch(authenticateUser),
    fetchCart: () => dispatch(fetchCart())
  };
};

export default connect(null, mapDispatchToProps)(Main);
