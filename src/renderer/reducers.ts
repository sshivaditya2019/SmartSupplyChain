/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from '@reduxjs/toolkit';
import AUTH_VAL from './actions/types';

const initalState = {
  isAuth: false,
};

export default function RootReducer(state = initalState, action: any) {
  switch (action.type) {
    case AUTH_VAL:
      console.log('checking auth rec from dispatch auth_val');
      return {
        ...state,
        isAuth: true,
      };
    default:
      console.log('checking auth rec from dispatch default');
      return state;
  }
}

// export default combineReducers({ auths: RootReducer });
