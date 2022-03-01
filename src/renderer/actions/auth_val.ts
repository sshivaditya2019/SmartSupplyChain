/* eslint-disable no-console */
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AUTH_VAL from './types';

export default function CheckVal() {
  const dispatch = useDispatch();
  console.log('checking auth');
  dispatch({
    type: AUTH_VAL,
    payload: true,
  });
}
