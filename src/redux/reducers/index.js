import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
  // Other reducers go here
});

export default rootReducer;