import { TOGGLE_NAVBAR, SHOW_MESSAGE, CLEAR_MESSAGE } from '../actionTypes';

const initialState = {
  navbarClosed: true,
  showMessage: false,
  errorMessage: false,
  messageText: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navbarClosed: !state.navbarClosed,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        showMessage: false,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        showMessage: true,
        errorMessage: payload.error,
        messageText: payload.message,
      };
    default:
      return state;
  }
};
