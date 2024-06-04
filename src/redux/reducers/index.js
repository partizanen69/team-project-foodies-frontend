import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './exampleReducer'; 

const rootReducer = combineReducers({
  example: exampleReducer, 
  // Other reducers go here
});

export default rootReducer;