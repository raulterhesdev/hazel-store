import {
  SEND_ORDER_START,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
} from '../actionTypes';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  errorCode: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_ORDER_START:
    case FETCH_ORDERS_START:
      return {
        ...state,
        error: null,
        errorCode: null,
        isLoading: true,
      };
    case SEND_ORDER_ERROR:
    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        error: payload,
        errorCode: type,
        isLoading: false,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload.data,
      };
    default:
      return state;
  }
};
