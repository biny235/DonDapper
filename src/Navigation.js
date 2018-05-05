import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav
} from 'reactstrap';

import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import AccountDropdown from './AccountDropdown';
import ProductsDropdown from './ProductsDropdown';

const Navigation = ({ user, counter }) => {
  return (
    <Navbar color="light" light>
      <NavbarBrand href="/#/">Grace Shopper</NavbarBrand>
      <Nav>
        <NavItem>
          <ProductsDropdown />
        </NavItem>
        <NavItem>
          <NavLink href="/#/cart">Cart ({counter})</NavLink>
        </NavItem>
        <NavItem>
          <AccountDropdown />
        </NavItem>
        {user.admin && (
          <NavItem>
            <NavLink href="/#/dashboard">Admin Dashboard</NavLink>
          </NavItem>)
        }
      </Nav>
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

export default connect(mapStateToProps)(Navigation);
