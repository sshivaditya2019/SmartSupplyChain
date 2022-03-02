/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-unresolved */
import Lottie from 'lottie-react';
import React, { useState, ReactDOM, useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import { BroadcastChannel } from 'broadcast-channel';
import success from '../../../assets/illustrations/success.json';
import store from '../ContextProvider/configureStore';
import getQueryVariable from '../services/getQueryVariable';
import CheckVal from '../actions/auth_val';

const channel = new BroadcastChannel('auth');
channel.postMessage(getQueryVariable('code'));

const PostAuth = () => {
  const { isAuthenticated } = useAuth0();
  // const [chkc, setChks] = useState(isAuthenticated);
  CheckVal();
  setTimeout(() => {
    console.log('Called');
    console.log(store.getState());
  }, 3000);

  connect(null, { CheckVal })(PostAuth);
  return (
    <div>
      {isAuthenticated ? (
        <Lottie animationData={success} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PostAuth;
