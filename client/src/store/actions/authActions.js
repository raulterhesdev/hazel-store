import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_START,
  REGISTER_FAIL,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../actionTypes';

import { showMessage } from './uiActions';

//register user
export const registerUser = ({ firstName, lastName, email, password }) => (
  dispatch
) => {
  // Register Start
  dispatch({ type: REGISTER_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //request body
  const body = JSON.stringify({ firstName, lastName, email, password });
  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(getLoggedUser());
    })
    .catch((error) => {
      if (error.response.data.error === 'Duplicate field value entered') {
        dispatch(showMessage(true, 'Email already registered.'));
        dispatch({ type: REGISTER_FAIL, payload: 'Email already registered.' });
      } else {
        dispatch(showMessage(true, error.response.data.error));
      }
    });
};

//Login user
export const loginUser = ({ email, password }) => (dispatch) => {
  // Login Start
  dispatch({ type: LOGIN_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //request body
  const body = JSON.stringify({ email, password });
  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(getLoggedUser());
    })
    .catch((error) => {
      dispatch(showMessage(true, error.response.data.error));
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    });
};

//Get the logged in user
export const getLoggedUser = () => (dispatch, getState) => {
  // Login Start
  dispatch({ type: FETCH_USER_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  axios
    .get('/api/auth/user', config)
    .then((res) => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
    .catch((error) => {
      dispatch({ type: FETCH_USER_ERROR, payload: error.response.data.error });
    });
};

//updateUser
export const updateUser = ({
  firstName,
  lastName,
  address,
  phone,
  city,
  state,
  zip,
}) => (dispatch, getState) => {
  // Update start
  dispatch({ type: UPDATE_USER_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  //request body
  const body = JSON.stringify({
    firstName,
    lastName,
    address,
    phone,
    city,
    state,
    zip,
  });
  axios
    .put('/api/auth/updateInfo', body, config)
    .then((res) => {
      dispatch(showMessage(false, 'Account updated successfully!'));
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(
        showMessage(true, 'There was an error. Please try again later.')
      );
      dispatch({ type: UPDATE_USER_ERROR, payload: error.response.data });
    });
};

export const logout = () => ({
  type: LOGOUT_SUCCESS,
});

//try auto login user
export const tryAutoLogin = () => (dispatch) => {
  // console.log(localStorage.getItem('token'));
  dispatch(getLoggedUser());
};
