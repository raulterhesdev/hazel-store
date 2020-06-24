import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Showcase.module.css';

import { routes } from '../../constants/routes';

const Showcase = () => {
  return (
    <div className={classes.Showcase}>
      <div className={classes.Container}>
        <div className={classes.Art}>
          <img src={require('../../assets/png.png')} />
          <a href='https://pngtree.com/so/teacher' target='_blank'>
            teacher png from pngtree.com
          </a>
        </div>
        <div>
          <div className={classes.ShowcaseText}>
            <p>
              <q>
                A reader lives a thousand lives before he dies. The man who
                never reads lives only one.
              </q>{' '}
              <span>- George R.R. Martin</span>
            </p>
          </div>
          <div className={classes.Button}>
            <NavLink to={routes.products.path} exact className={classes.Link}>
              Explore our library!
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
