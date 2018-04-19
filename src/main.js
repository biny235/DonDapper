import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
//import { listProducts, listCategories } from './store';
import Nav from './nav';
import Products from './products';
import Categories from './categories';
import User from './user';
import Orders from './orders';
import Home from './home';

class Main extends Component {
  //======waiting for the store=====//
  //componentDidMount() {
  // this.props.listProducts();
  // this.props.listCategoties();
  // }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact render={() => <Home />} />
          <Switch>
            <Route path="/api/products" exact render={() => <Products />} />
            <Route path="/api/catagories" exact render={() => <Categories />} />
            <Route path="/api/orders" exact render={() => <Orders />} />
            <Route path="/api/user" exact render={() => <User />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     listProducts: () => dispatch(listProducts()),
//     listCategoties: () => dispatch(listCategoties())
//   };
// };

// export default connect(null, mapDispatchToProps)(Main);

export default Main;
