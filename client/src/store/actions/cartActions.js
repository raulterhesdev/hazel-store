import { ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_PRODUCT } from '../actionTypes';

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const updateCartItem = (payload) => ({
  type: UPDATE_CART_ITEM,
  payload,
});

export const removeProduct = (payload) => ({
  type: REMOVE_PRODUCT,
  payload,
});
