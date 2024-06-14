import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import ingredientsReducer from './ingredientsReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    ingredients: ingredientsReducer,
});

export default rootReducer;