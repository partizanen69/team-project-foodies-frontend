import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';
import { combineReducers } from 'redux';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { testimonialsApi } from './testimonialsApi';
const persistConfig = {
  key: 'authSlice',
  storage,
};

const rootReducer = combineReducers({
  [testimonialsApi.reducerPath]: testimonialsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const apiMiddlewares = [
  testimonialsApi.middleware,
];

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(...apiMiddlewares);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  // Add middleware or other store configuration options here if needed
});

const persistor = persistStore(store);
export default persistor;
