import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Message.module.css';

export class Message extends Component {
  static propTypes = {};

  render() {
    const styleClasses = this.props.errorMessage
      ? classes.Message + ' ' + classes.Error
      : classes.Message + ' ' + classes.Success;

    return (
      <div
        className={styleClasses}
        style={{
          transform: this.props.showMessage
            ? 'translateY(0)'
            : 'translateY(10vh)',
          opacity: this.props.showMessage ? '1' : '0',
        }}
      >
        {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showMessage: state.ui.showMessage,
  errorMessage: state.ui.errorMessage,
  message: state.ui.messageText,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
