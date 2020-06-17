import { TOGGLE_NAVBAR } from '../actionTypes';

const initialState = {
  navbarClosed: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navbarClosed: !state.navbarClosed,
      };
    default:
      return state;
  }
};
