import { combineReducers } from 'redux';

import ordersReducer from './ordersReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import shopReducer from './shopReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  orders: ordersReducer,
  auth: authReducer,
  ui: uiReducer,
  shop: shopReducer,
  cart: cartReducer,
});
