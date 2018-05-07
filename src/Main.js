import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, authenticateUser } from './store';
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

class Main extends Component {
  componentDidMount() {
    window.localStorage.getItem('token') && this.props.authenticateUser();
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation history={history} />
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
              <Route path="/user/password" exact render={({ history }) => <PasswordChange history={history} />} />
              <Route
                path="/test/google"
                exact
                render={() => <Autocomplete />}
              />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    authenticateUser: () => dispatch(authenticateUser)
  };
};

export default connect(null, mapDispatchToProps)(Main);
