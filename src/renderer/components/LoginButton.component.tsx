/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Bar from './Bar.component';

declare const window: any;
const LoginButton = () => {
  const { loginWithRedirect, loginWithPopup, buildAuthorizeUrl } = useAuth0();

  async function LoginNewWindow() {
    const url = await buildAuthorizeUrl();
    const wins = window.trons.bws.getWin(url);
  }
  // eslint-disable-next-line react/button-has-type
  return (
    <div>
      <button onClick={() => LoginNewWindow()}>Login</button>
    </div>
  );
};

export default LoginButton;
