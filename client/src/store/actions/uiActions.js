import { TOGGLE_NAVBAR, SHOW_MESSAGE, CLEAR_MESSAGE } from '../actionTypes';

export const toggleNavbar = () => ({
  type: TOGGLE_NAVBAR,
});

export const showMessage = (error, message) => (dispatch) => {
  dispatch({ type: SHOW_MESSAGE, payload: { error, message } });
  setTimeout(() => {
    dispatch({ type: CLEAR_MESSAGE });
  }, 3000);
};
