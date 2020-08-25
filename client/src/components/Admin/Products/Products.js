import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Products.module.css';

import EditProduct from './EditProduct/EditProduct';
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton';
import Modal from '../../UI/Modal/Modal';
import Product from './Product/Product';
import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';

import {
  fetchProducts,
  deleteProduct as deleteProductAction,
} from '../../../store/actions/shopActions';

export class Products extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    deleteProductAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    modalOpen: false,
    editMode: false,
    editProduct: null,
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  toggleModal = () => {
    this.setState({
      editMode: false,
      editProduct: null,
      modalOpen: !this.state.modalOpen,
    });
  };

  toggleEditModal = (product) => {
    this.setState({
      editMode: true,
      editProduct: product,
      modalOpen: !this.state.modalOpen,
    });
  };

  deleteProduct = (id) => {
    this.props.deleteProductAction({ id });
  };

  render() {
    let allProducts = [];
    this.props.products.forEach((product) => {
      const shopElement = (
        <Product
          product={product}
          key={product._id}
          onClick={this.toggleEditModal}
          onDelete={this.deleteProduct}
        />
      );
      allProducts.push(shopElement);
    });
    return (
      <div className={classes.Products}>
        <Modal
          show={this.state.modalOpen}
          modalClosed={this.toggleModal}
          fullScreen
        >
          <span className={classes.Close} onClick={this.toggleModal}>
            &times;
          </span>
          {!this.state.editMode ? (
            <EditProduct editMode={false} />
          ) : (
            <EditProduct editMode={true} editProduct={this.state.editProduct} />
          )}
        </Modal>
        <div className={classes.ActionArea}>
          <SecondaryButton title='Add a product' onClick={this.toggleModal} />
        </div>
        <div className={classes.ListContainer}>
          {this.props.isLoading ? <Spinner /> : allProducts}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.shop.products,
  isLoading: state.shop.isLoading,
});

const mapDispatchToProps = { fetchProducts, deleteProductAction };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
