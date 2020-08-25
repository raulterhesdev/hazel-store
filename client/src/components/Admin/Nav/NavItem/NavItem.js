import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

const NavItem = (props) => {
  return (
    <NavLink
      to={props.link}
      exact
      className={classes.NavItem}
      activeClassName={classes.ActiveLink}
    >
      {props.children}
    </NavLink>
  );
};

export default NavItem;
