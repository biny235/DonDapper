import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ counter }) => {
  counter = 4;
  return (
    <div>
      <ul>
        <NavLink to={'/'}>Home </NavLink>
      </ul>
    </div>
  );
};

export default Nav;
