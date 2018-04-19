import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
//import { listProducts, listCategories } from './store';
import Nav from './Nav';
import Products from './Products';
import Categories from './Categories';
import User from './User';
import Orders from './Orders';
import Home from './Home';

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
