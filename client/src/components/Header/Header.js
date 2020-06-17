import React from 'react';

import classes from './Header.module.css';

import Logo from './Logo/Logo';
import Toggle from './Toggle/Toggle';
import CartPreview from './CartPreview/CartPreview';
import Link from '../Navigation/Link/Link';

import { routes } from '../../constants/routes';

const Header = () => {
  let navbarLinks = [];
  for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
      const element = routes[key];
      const linkElement = (
        <Link
          link={element.path}
          exact={element.exact}
          name={element.name}
          key={key}
        />
      );
      navbarLinks.push(linkElement);
    }
  }
  return (
    <div className={classes.Header}>
      <Toggle />
      <Logo />
      <div className={classes.LinkContainer}>{navbarLinks}</div>
      <CartPreview />
    </div>
  );
};

export default Header;
