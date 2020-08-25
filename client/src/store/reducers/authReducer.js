import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_START,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_START,
  UPDATE_USER_START,
  FETCH_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_SUCCESS,
} from '../actionTypes';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  },
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  error: null,
  errorCode: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_START:
    case LOGIN_START:
    case FETCH_USER_START:
    case UPDATE_USER_START:
      return {
        ...state,
        error: null,
        isLoading: true,
        errorCode: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.setItem('token', null);
      return {
        ...state,
        isLoading: false,
        error: payload,
        errorCode: type,
      };
    case LOGOUT_SUCCESS:
      localStorage.setItem('token', null);
      return {
        ...state,
        token: '',
        user: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
          city: '',
          state: '',
          zip: '',
        },
        isAuthenticated: null,
      };
    case FETCH_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      const user = {
        email: payload.data.email,
        firstName: payload.data.firstName,
        lastName: payload.data.lastName,
        address: payload.data.address,
        phone: payload.data.phone,
        city: payload.data.city,
        state: payload.data.state,
        zip: payload.data.zip,
        role: payload.data.role,
      };
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...user,
        },
      };
    case FETCH_USER_ERROR:
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
        errorCode: type,
      };
    default:
      return state;
  }
};
