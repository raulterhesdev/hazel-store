import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classes from './EditProduct.module.css';

import Input from '../../../UI/Input/Input';
import Select from '../../../UI/Select/Select';
import PrimaryButton from '../../../UI/PrimaryButton/PrimaryButton';
import FileUpload from '../../../UI/FileUpload/FileUpload';
import {
  addProduct,
  editProduct as editProductAction,
} from '../../../../store/actions/shopActions';
import Spinner from '../../../UI/Spinner/Spinner';

import { connect } from 'react-redux';

export class EditProduct extends PureComponent {
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    addProduct: PropTypes.func.isRequired,
    editProductAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    title: '',
    description: '',
    price: '0',
    category: '',
    file: '',
    fileError: '',
    titleError: '',
    descriptionError: '',
    categoryError: '',
    imageUrl: '',
  };

  componentDidUpdate(prevProps) {
    console.log(this.props.editProduct);
    if (this.props.editProduct !== prevProps.editProduct) {
      if (this.props.editProduct) {
        this.setState({
          title: this.props.editProduct.title,
          description: this.props.editProduct.description,
          price: this.props.editProduct.price.toString(),
          category: this.props.editProduct.category,
          imageUrl: this.props.editProduct.imageUrl,
        });
      } else {
        this.setState({
          title: '',
          description: '',
          price: '0',
          category: '',
          imageUrl: '',
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ file: file });
  };

  sendRequest = () => {
    let canSend = true;
    if (this.state.title === '') {
      this.setState({ titleError: 'Title is Mandatory' });
      canSend = false;
    }
    if (this.state.description === '') {
      this.setState({ descriptionError: 'Description is mandatory' });
      canSend = false;
    }
    if (this.state.file === '' && this.state.imageUrl === '') {
      this.setState({ fileError: 'A photo is mandatory' });
      canSend = false;
    }
    if (this.state.category === '') {
      this.setState({ categoryError: 'Category is mandatory' });
      canSend = false;
    }
    if (canSend) {
      if (this.props.editMode) {
        this.props.editProductAction({
          id: this.props.editProduct._id,
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
          category: this.state.category,
          file: this.state.file,
          imageUrl: this.state.imageUrl,
        });
      } else {
        this.props.addProduct({
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
          category: this.state.category,
          file: this.state.file,
        });
        this.setState({
          title: '',
          description: '',
          price: '0',
          category: '',
          imageUrl: '',
          file: '',
        });
      }
    }
  };

  render() {
    return (
      <div className={classes.EditProduct}>
        <div className={classes.Title}>
          {this.props.editMode ? 'Edit Product' : 'Add a product'}
        </div>
        <div className={classes.ProductInputs}>
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
            name='description'
            value={this.state.description}
            label='Description'
            onChange={this.onChange}
            error={this.state.descriptionError}
          />
          <Input
            type='number'
            name='price'
            value={this.state.price}
            label='Price'
            onChange={this.onChange}
          />
          <Select
            name='category'
            onChange={this.onChange}
            label='Category'
            options={[
              '',
              'Science Fiction',
              'Romance',
              'Horror',
              'Thriller',
              'Personal Development',
              'Biography',
              'Others',
            ]}
            defaultValue={this.state.category}
            error={this.state.categoryError}
          />
          <FileUpload
            onChange={this.onFileChange}
            error={this.state.fileError}
          />
          <div className={classes.ActionArea}>
            {this.props.isLoading ? (
              <Spinner />
            ) : (
              <PrimaryButton
                title={this.props.editMode ? 'Edit Product' : 'Add Product'}
                onClick={this.sendRequest}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.shop.isLoading,
});

const mapDispatchToProps = { addProduct, editProductAction };

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
