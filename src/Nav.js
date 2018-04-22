import React from 'react';
import { NavLink } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            <DropDownMenu value={-1} onChange>
              <MenuItem value={-1} primaryText='Products' />
              <MenuItem value={1} primaryText='category A' />
              <MenuItem value={2} primaryText='category B' />
              <MenuItem value={3} primaryText='category C' />
              <MenuItem value={4} primaryText='category D' />
              <MenuItem value={5} primaryText='category E' />
            </DropDownMenu>
          </li>
          <li>
            <NavLink to='/cart'>Cart {counter}</NavLink>
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
