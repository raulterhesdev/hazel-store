import axios from 'axios';
import {
  SEND_ORDER_START,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  FETCH_ORDERS_START,
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_SUCCESS,
  CLEAR_CART,
} from '../actionTypes';

import { showMessage } from './uiActions';

//send order
export const sendOrder = (payload) => (dispatch, getState) => {
  // Register Start
  dispatch({ type: SEND_ORDER_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //request path
  let path = '/api/orders/public';

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    path = '/api/orders';
  }

  //request body
  const body = JSON.stringify(payload);

  axios
    .post(path, body, config)
    .then((res) => {
      dispatch({ type: SEND_ORDER_SUCCESS, payload: res.data });
      dispatch({ type: CLEAR_CART });
    })
    .catch((error) => {
      dispatch(showMessage(true, error.response.data.error));
      dispatch({
        type: SEND_ORDER_ERROR,
        payload: error.response.data.error,
      });
    });
};

// Fetch all orders - Admin
export const fetchOrders = (payload) => (dispatch, getState) => {
  dispatch({ type: FETCH_ORDERS_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //request path
  let path = '/api/orders';

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  axios
    .get(path, config)
    .then((res) => {
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        showMessage(
          true,
          'There was an error getting the orders. Please try again'
        )
      );
      dispatch({
        type: FETCH_ORDERS_ERROR,
        payload: error.response.data.error,
      });
    });
};
