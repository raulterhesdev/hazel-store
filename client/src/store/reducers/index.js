import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  ui: uiReducer,
  shop: shopReducer,
});
