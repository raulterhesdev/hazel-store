import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Link.module.css';

const Link = ({ link, exact, name, onClick }) => {
  return (
    <div className={classes.LinkContainer}>
      <NavLink
        to={link}
        exact={exact}
        className={classes.Link}
        activeClassName={classes.ActiveLink}
        onClick={onClick}
      >
        {name}
      </NavLink>
    </div>
  );
};

Link.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Link;
