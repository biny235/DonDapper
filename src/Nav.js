import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav as _Nav,
  NavItem,
  NavLink as _NavLink
} from 'reactstrap';

import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import AccountDropdown from './AccountDropdown';
import ProductsDropdown from './ProductsDropdown'

const Nav = ({user, counter}) => {
  return (
    <Navbar color="light" light>
      <NavbarBrand href="/#/">Grace Shopper</NavbarBrand>
      <_Nav>
        <NavItem>
          <ProductsDropdown />
        </NavItem>
        <NavItem>
          <_NavLink href="/#/cart">Cart ({counter})</_NavLink>
        </NavItem>
        <NavItem>
          <AccountDropdown />
        </NavItem>
        {user.admin ?(
        <NavItem>
          <_NavLink href="/#/dashboard">DashBoard</_NavLink>
        </NavItem>):null
        }
      </_Nav>
    </Navbar>
  );
}
const mapStateToProps = ({ user, lineItems }) => {
  const counter = lineItems.length;
  return {
    user,
    counter
  };
};

export default connect(mapStateToProps)(Nav);
