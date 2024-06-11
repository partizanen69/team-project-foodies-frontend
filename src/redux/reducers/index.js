import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
  // Other reducers go here
});

export default rootReducer;