import React from 'react';

import classes from './Nav.module.css';

import NavItem from './NavItem/NavItem';

import { adminRouter } from '../../../constants/routes';

const Nav = () => {
  const navContent = [];

  for (const key in adminRouter) {
    if (adminRouter.hasOwnProperty(key)) {
      const route = adminRouter[key];
      const item = (
        <NavItem key={route.path} link={`/admin/${route.path}`}>
          {route.name}
        </NavItem>
      );
      navContent.push(item);
    }
  }
  return <div className={classes.Nav}>{navContent}</div>;
};

export default Nav;
