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
import LoginModal from './LoginModal';
import AccountButton from './AccountButton';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      value: -1,
      counter: props.lineItems.length,
      account: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.accountClick = this.accountClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ counter: nextProps.lineItems.length });
  }

  handleChange(ev, index, value) {
    const { products, categories } = this.props;
    let selectedCategory = categories.map(category => category.id === value);
    if (location.hash === '#/products')
      value !== -1 && value
        ? document.getElementById(value).scrollIntoView()
        : null;
  }

  accountClick(ev) {
    const account = !this.state.account;
    this.setState({ account });
  }

  render() {
    const { value, counter, account } = this.state;
    const { categories, user } = this.props;
    const { handleChange, accountClick } = this;
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <Navbar color="light" light>
              <NavbarBrand href="/#/">Grace Shopper</NavbarBrand>
              <_Nav>
                <NavItem>
                  <DropDownMenu value={value} onChange={handleChange}>
                    <MenuItem value={-1} primaryText="products" />
                    <MenuItem
                      value={0}
                      primaryText="shop all"
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
                  <AccountButton />
                </NavItem>
                {user.admin ?(
                <NavItem>
                  <_NavLink href="/#/dashboard">DashBoard</_NavLink>
                </NavItem>):null
                }
              </_Nav>
            </Navbar>
          </div>
          {account && <LoginModal />}
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = ({ categories, products, lineItems, user }) => {
  return {
    products,
    lineItems,
    categories,
    user
  };
};

export default connect(mapStateToProps)(Nav);
