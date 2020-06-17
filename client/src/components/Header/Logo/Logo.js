import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.css';

function Logo() {
  return (
    <div className={classes.Logo}>
      <NavLink
        to='/'
        exact
        style={{ transition: 'all 0.2s ease-out' }}
        className={classes.LogoText}
      >
        Hazel Shop
      </NavLink>
    </div>
  );
}

export default Logo;
