/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';
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
import RootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['persist/PERSIST'],
};

const state = { isAuth: false };

const middlewares = [
  // disable PERSIST action.
  createStateSyncMiddleware({
    blacklist: [PERSIST],
  }),
];

const persistedReducer = persistReducer(persistConfig, RootReducer);

// export default () => {
//  const store = createStore(persistedReducer);
//  const persistor = persistStore(store);
//  return { store, persistor };
// };
const reduxStateSyncConfig = {};

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }),
});
