import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { fetchProducts, fetchOrders, fetchLineItems } from './store';
=======
>>>>>>> aj

import Nav from './Nav';
import Products from './Products';
import Categories from './Categories';
import User from './User';
import Orders from './Orders';
import Home from './Home';
import Cart from './Cart';
<<<<<<< HEAD
import LoginForm from './LoginForm';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchOrders();
    this.props.fetchLineItems();
  }
=======
import LoginForm from './LoginForm'

class Main extends Component {

>>>>>>> aj

  render() {
    return (

      <div>
        <Nav />
        <LoginForm />
<<<<<<< HEAD
        <Route path='/' exact render={() => <Home />} />
        <Switch>
          <Route path='/products' exact render={() => <Products />} />
          <Route path='/catagories' exact render={() => <Categories />} />
          <Route path='/cart' exact render={() => <Cart />} />
          <Route path='/orders' exact render={() => <Orders />} />
          <Route path='/user' exact render={() => <User />} />
        </Switch>
      </div>

=======
        <Route path="/" exact render={() => <Home />} />
        <Switch>
          <Route path="/products" exact render={() => <Products />} />
          <Route path="/catagories" exact render={() => <Categories />} />
          <Route path="/cart" exact render={()=> <Cart />} />
          <Route path="/orders" exact render={() => <Orders />} />
          <Route path="/user" exact render={() => <User />} />
        </Switch>
      </div>
      
>>>>>>> aj
    );
  }
}

<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchOrders: () => dispatch(fetchOrders()),
    fetchLineItems: () => dispatch(fetchLineItems())
  };
};

export default connect(null, mapDispatchToProps)(Main);
=======
export default Main;
>>>>>>> aj
