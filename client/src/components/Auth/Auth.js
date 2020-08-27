import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Auth.module.css';

import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import Spinner from '../UI/Spinner/Spinner';

import { registerUser, loginUser } from '../../store/actions/authActions';
import { connect } from 'react-redux';

export class Auth extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  state = {
    isSignUp: false,
    firstName: 'Terhes',
    lastName: 'Raul',
    email: 'raul1234@gmail.com',
    password: 'Test1234',
    confirmPassword: 'Test1234',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    firstTouched: false,
  };

  toggle = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateField = (target) => {
    switch (target) {
      case 'firstName':
        if (this.state.firstName === '' && this.state.isSignUp) {
          this.setState({ firstNameError: 'Please fill in your first name' });
        }
        break;
      case 'lastName':
        if (this.state.lastName === '' && this.state.isSignUp) {
          this.setState({ lastNameError: 'Please fill in your last name' });
        }
        break;
      case 'email':
        if (this.state.isSignUp) {
          if (this.state.email === '')
            this.setState({ emailError: 'Please fill in your email address' });
          else {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!pattern.test(this.state.email)) {
              this.setState({
                emailError: 'Please enter a valid email address',
              });
            }
          }
        } else {
          if (this.state.email === '') {
            this.setState({ emailError: 'Please enter your email address' });
          }
        }

        break;
      case 'password':
        if (this.state.password === '') {
          this.setState({ passwordError: 'Please enter a password' });
        } else {
          var patternPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
          if (!patternPass.test(this.state.password)) {
            this.setState({
              passwordError:
                'Password must be at least 6 character long and contain: one digit, one uppercase and one lowercase character',
            });
          }
        }
        break;
      case 'confirmPassword':
        if (
          this.state.password !== this.state.confirmPassword &&
          this.state.isSignUp
        ) {
          this.setState({
            confirmPasswordError: 'The two passwords must match.',
          });
        }
        break;

      default:
        break;
    }
  };

  resetError = (e) => {
    switch (e.target.name) {
      case 'firstName':
        this.setState({ firstNameError: '' });
        break;
      case 'lastName':
        this.setState({ lastNameError: '' });
        break;
      case 'email':
        this.setState({ emailError: '' });
        break;
      case 'password':
        this.setState({ passwordError: '' });
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: '' });
        break;

      default:
        break;
    }
  };

  authAction = () => {
    this.validateField('firstName');
    this.validateField('lastName');
    this.validateField('email');
    this.validateField('password');
    this.validateField('confirmPassword');
    if (
      this.state.firstNameError !== '' ||
      this.state.lastNameError !== '' ||
      this.state.emailError !== '' ||
      this.state.password !== '' ||
      this.state.confirmPassword !== ''
    ) {
      if (this.state.isSignUp) {
        this.props.registerUser({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        });
      } else {
        this.props.loginUser({
          email: this.state.email,
          password: this.state.password,
        });
      }
      this.props.history.push('/products');
    }
  };

  render() {
    return (
      <div className={classes.Auth}>
        <Card>
          <div className={classes.Container}>
            <p className={classes.Title}>
              {' '}
              {this.state.isSignUp ? 'Register Account' : 'Log In'}
            </p>
            <p className={classes.Toggle} onClick={this.toggle}>
              {this.state.isSignUp
                ? 'Already have an account? Go to Login'
                : "Don't have an account? Go to Sign Up"}
            </p>

            <div className={classes.Form}>
              {this.state.isSignUp ? (
                <Input
                  type='text'
                  name='firstName'
                  value={this.state.firstName}
                  label='First Name'
                  onChange={this.onChange}
                  error={this.state.firstNameError}
                  onBlur={(e) => this.validateField(e.target.name)}
                  onFocus={this.resetError}
                />
              ) : null}
              {this.state.isSignUp ? (
                <Input
                  type='text'
                  name='lastName'
                  value={this.state.lastName}
                  label='Last Name'
                  onChange={this.onChange}
                  error={this.state.lastNameError}
                  onBlur={(e) => this.validateField(e.target.name)}
                  onFocus={this.resetError}
                />
              ) : null}
              <Input
                type='text'
                name='email'
                label='Email'
                value={this.state.email}
                onChange={this.onChange}
                error={this.state.emailError}
                onBlur={(e) => this.validateField(e.target.name)}
                onFocus={this.resetError}
              />
              <Input
                type='password'
                name='password'
                label='Password'
                value={this.state.password}
                onChange={this.onChange}
                error={this.state.passwordError}
                onBlur={(e) => this.validateField(e.target.name)}
                onFocus={this.resetError}
              />
              {this.state.isSignUp ? (
                <Input
                  type='password'
                  name='confirmPassword'
                  label='Confirm Password'
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={this.state.confirmPasswordError}
                  onBlur={(e) => this.validateField(e.target.name)}
                  onFocus={this.resetError}
                />
              ) : null}
              <div className={classes.ButtonContainer}>
                {this.props.loading ? (
                  <Spinner />
                ) : (
                  <PrimaryButton
                    title={this.state.isSignUp ? 'Sign Up' : 'Log In'}
                    onClick={this.authAction}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.isLoading,
});

const mapDispatchToProps = { registerUser, loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
