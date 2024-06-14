import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import ingredientsReducer from './ingredientsReducer'
import areasReducer from './areasReducer'
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    ingredients: ingredientsReducer,
    areas: areasReducer,
    filters: filtersReducer
});

export default rootReducer;