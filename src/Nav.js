import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
    this.setState({ value, product: selectedProduct });
  }

  render() {
    const counter = 4;
    const { value } = this.state;
    const { products } = this.props;

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
                  containerElement={<NavLink to={'/products'} />}
                />
                {products.length
                  ? products.map(product => {
                      return (
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
const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(Nav);
