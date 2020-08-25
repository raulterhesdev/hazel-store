import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FileUpload extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <input type='file' name='file' onChange={this.props.onChange} />
        <p>{this.props.error}</p>
      </div>
    );
  }
}

export default FileUpload;
