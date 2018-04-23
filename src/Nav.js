import React from 'react';
import { NavLink } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';

const Nav = ({ counter }) => {
  counter = 4;
  return (
    <MuiThemeProvider>
      <div>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Products</NavLink>
          </li>
          <li>
            <NavLink to='/categories'>Categories</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Cart ({counter})</NavLink>
          </li>
          <li>
            <NavLink to='/user'>Account</NavLink>
          </li>
        </ul>
      </div>
    </MuiThemeProvider>
  );
};

export default Nav;
