import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav as _Nav, NavItem, NavLink as _NavLink } from 'reactstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      value: -1,
      counter: props.lineItems.length
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ counter: nextProps.lineItems.length });
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
  }

  render() {
    const { value, counter } = this.state;
    const { products } = this.props;
    return (
      <MuiThemeProvider>
        <div>
<<<<<<< HEAD
          <Navbar color="light" light>
          <NavbarBrand href="/#/">Grace Shopper</NavbarBrand>
          <_Nav>
              <NavItem>
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
              </NavItem>
              <NavItem>
                <_NavLink href="/#/cart">Cart ({counter})</_NavLink>
              </NavItem>
              <NavItem>
                <_NavLink href="/#/user">Account</_NavLink>
              </NavItem>
            </_Nav>
          </Navbar>
=======
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
>>>>>>> master
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = ({ products, lineItems }) => {
  return {
    products,
    lineItems
  };
};

export default connect(mapStateToProps)(Nav);
