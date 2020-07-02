import React from 'react';
import PropTypes from 'prop-types';

import classes from './Breadcrumbs.module.css';

const Breadcrumbs = ({ numberOfCrumbs, activeCrumb, onClick, ...props }) => {
  const breadcrumbs = [];
  for (let i = 0; i < numberOfCrumbs; i++) {
    let style;
    if (activeCrumb === i) {
      style = classes.Crumb + ' ' + classes.Active;
    } else {
      style = classes.Crumb;
    }
    const crumb = (
      <span key={i} className={style} onClick={() => onClick(i)}>
        {i + 1}
      </span>
    );
    breadcrumbs.push(crumb);
  }
  return <div className={classes.Container}>{breadcrumbs}</div>;
};

Breadcrumbs.propTypes = {
  numberOfCrumbs: PropTypes.number.isRequired,
  activeCrumb: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Breadcrumbs;
