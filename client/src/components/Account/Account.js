import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Account.module.css';

import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import Spinner from '../UI/Spinner/Spinner';

import { getLoggedUser, updateUser } from '../../store/actions/authActions';

export class Account extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getLoggedUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    address: this.props.user.address,
    phone: this.props.user.phone,
    email: this.props.user.email,
    city: this.props.user.city,
    state: this.props.user.state,
    zip: this.props.user.zip,
  };

  componentDidMount() {
    this.props.getLoggedUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        city: this.props.user.city,
        state: this.props.user.state,
        zip: this.props.user.zip,
        phone: this.props.user.phone,
        email: this.props.user.email,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateProfile = () => {
    this.props.updateUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phone: this.state.phone,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    });
  };

  render() {
    return (
      <div className={classes.Account}>
        <Card>
          <div className={classes.Container}>
            <p className={classes.Title}>Your Profile</p>
            <Input
              type='text'
              name='firstName'
              value={this.state.firstName}
              label='First Name'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='lastName'
              value={this.state.lastName}
              label='Last Name'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='email'
              label='Email'
              disabled
              value={this.state.email}
            />
            <Input
              type='text'
              name='address'
              value={this.state.address}
              label='Delivery Address'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='city'
              value={this.state.city}
              label='City'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='state'
              value={this.state.state}
              label='State'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='zip'
              value={this.state.zip}
              label='ZIP Code'
              onChange={this.onChange}
            />
            <Input
              type='text'
              name='phone'
              value={this.state.phone}
              label='Phone Number'
              onChange={this.onChange}
            />
            <div className={classes.ButtonContainer}>
              {this.props.isLoading ? (
                <Spinner />
              ) : (
                <PrimaryButton
                  title='Update Profile'
                  onClick={this.updateProfile}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = { getLoggedUser, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
