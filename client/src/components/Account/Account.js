import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Account.module.css';

import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';

export class Account extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    address: this.props.user.address,
    phone: this.props.user.phone,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateProfile = () => {
    console.log('Update');
  };

  render() {
    return (
      <div className={classes.Account}>
        <Card>
          <div className={classes.Container}>
            <p className={classes.Title}>Your Profile</p>
            {!this.props.user.emailValid ? (
              <p className={classes.EmailValid}>
                Email not valid. Please check your email account and validate
                your email or RESEND EMAIL
              </p>
            ) : null}
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
              defaultValue={this.props.user.email}
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
              name='phone'
              value={this.state.phone}
              label='Phone Number'
              onChange={this.onChange}
            />
            <div className={classes.ButtonContainer}>
              <PrimaryButton
                title='Update Profile'
                onClick={this.updateProfile}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
