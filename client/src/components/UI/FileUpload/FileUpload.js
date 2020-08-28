import React, { Component } from 'react';

import firebase from '../../../firebase';

import classes from './FileUpload.module.css';

export class FileUpload extends Component {
  render() {
    return (
      <div className={classes.Upload}>
        <input type='file' name='file' onChange={this.props.onChange} />
        <p>{this.props.error}</p>
      </div>
    );
  }
}

export default FileUpload;
