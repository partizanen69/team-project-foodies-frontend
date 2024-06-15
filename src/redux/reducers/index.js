import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import listReducer from './listReducer';
import ingredientsReducer from './ingredientsReducer';
import areasReducer from './areasReducer';
import filtersReducer from './filtersReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  list: listReducer,
  ingredients: ingredientsReducer,
  areas: areasReducer,
  filters: filtersReducer,
  category: categoriesReducer
  // Other reducers go here
});

export default rootReducer;
