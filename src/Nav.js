import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav as _Nav,
  NavItem,
  NavLink as _NavLink
} from 'reactstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      value: -1,
      counter: props.lineItems.length
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ counter: nextProps.lineItems.length });
  }

  handleChange(ev, index, value) {
    const { products, categories } = this.props;
    let selectedCategory = categories.map(category => category.id === value);
    if (location.hash === '#/products')
      value ? document.getElementById(value).scrollIntoView() : null;
  }

  render() {
    const { value, counter } = this.state;
    const { categories } = this.props;
    return (
      <MuiThemeProvider>
        <div>
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
                  {categories.length
                    ? categories.map(category => {
                        return (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                            primaryText={category.name}
                            containerElement={
                              <Link
                                to={{
                                  pathname: '/products',
                                  state: { id: category.id }
                                }}
                              />
                            }
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
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = ({ categories, products, lineItems }) => {
  return {
    products,
    lineItems,
    categories
  };
};

export default connect(mapStateToProps)(Nav);
