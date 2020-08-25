import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './AddReview.module.css';

import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton';

import { addReview } from '../../../store/actions/shopActions';

export class AddReview extends Component {
  static propTypes = {
    closeReview: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    text: '',
    rating: '10',
    titleError: '',
    textError: '',
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitReview = (e) => {
    e.preventDefault();
    let canSend = true;
    if (this.state.title === '') {
      this.setState({ titleError: 'Title is Mandatory' });
      canSend = false;
    }
    if (this.state.text === '') {
      this.setState({ textError: 'Review text  is mandatory' });
      canSend = false;
    }
    if (canSend) {
      this.props.addReview({
        title: this.state.title,
        text: this.state.text,
        rating: this.state.rating,
        id: this.props.productId,
      });
    }
  };

  render() {
    return (
      <div className={classes.AddReview}>
        <p className={classes.Title}>Leave a Review</p>
        <Input
          type='text'
          name='title'
          value={this.state.title}
          label='Title'
          onChange={this.onChange}
          error={this.state.titleError}
        />
        <Input
          type='text'
          name='text'
          value={this.state.text}
          label='Review Text'
          onChange={this.onChange}
          error={this.state.textError}
        />
        <Select
          name='rating'
          onChange={this.onChange}
          label='Rating'
          options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          defaultValue={this.state.rating}
        />
        <div className={classes.Button}>
          <SecondaryButton onClick={this.props.closeReview} title='Cancel' />
          <PrimaryButton onClick={this.submitReview} title='Submit' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
