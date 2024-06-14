import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  list: listReducer,
  // Other reducers go here
});

export default rootReducer;
