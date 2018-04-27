import React, { Component } from 'react';

import { NavLink, Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { render } from 'react-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      value: -1
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev, index, value) {
    const { products } = this.props;

    let selectedProduct = products.find(product => product.id === value);
    if (location.hash === '#/products' && value !== -1) {
      const theProduct = document.getElementById(value).scrollIntoView();
      this.setState({ value: -1, product: {} });
    } else {
      this.setState({ value, product: selectedProduct });
    }
    console.log(this.state);
  }

  render() {
    const { value } = this.state;
    const { products, cart } = this.props;
    const counter = cart.lineItems ? cart.lineItems.length : 0;

    return (
      <MuiThemeProvider>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <DropDownMenu value={value} onChange={this.handleChange}>
                <MenuItem
                  value={-1}
                  primaryText="products"
                  containerElement={<Link to={'/products'} />}
                />
                {products.length
                  ? products.map(product => {
                      return location.hash !== '#/products' ? (
                        <MenuItem
                          key={product.id}
                          value={product.id}
                          primaryText={product.name}
                          containerElement={
                            <Link to={`/products/${product.id}`} />
                          }
                        />
                      ) : (
                        <MenuItem
                          key={product.id}
                          value={product.id}
                          primaryText={product.name}
                        />
                      );
                    })
                  : null}
              </DropDownMenu>
            </li>
            <li>
              <NavLink to="/cart">Cart ({counter})</NavLink>
            </li>
            <li>
              <NavLink to="/user">Account</NavLink>
            </li>
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = ({ products, cart }) => {
  return {
    products,
    cart
  };
};

export default connect(mapStateToProps)(Nav);
