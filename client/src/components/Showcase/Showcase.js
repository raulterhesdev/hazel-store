import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { tryAutoLogin } from '../../store/actions/authActions';

import classes from './Showcase.module.css';

import { routes } from '../../constants/routes';

export class Showcase extends Component {
  static propTypes = {
    tryAutoLogin: PropTypes.func.isRequired,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.token !== '' && this.props.isAuthenticated !== true) {
      this.props.tryAutoLogin();
    }
  }

  render() {
    return (
      <div className={classes.Showcase}>
        <div className={classes.Container}>
          <div className={classes.Art}>
            <img src={require('../../assets/png.png')} alt='' />
            <a
              href='https://pngtree.com/so/teacher'
              target='_blank'
              rel='noopener noreferrer'
            >
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
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { tryAutoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);
