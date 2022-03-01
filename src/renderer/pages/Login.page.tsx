/* eslint-disable react/button-has-type */
import '../styles/tailwind.css';
import '../styles/output.css';
import React, { useEffect } from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import LoginButton from 'renderer/components/LoginButton.component';
import LogOutButton from 'renderer/components/LogOutButton.component';
import SignUpButton from 'renderer/components/SignUp.component';
import { BroadcastChannel } from 'broadcast-channel';
import Bar from '../components/Bar.component';
import store from '../ContextProvider/configureStore';

const channel = new BroadcastChannel('auth');
channel.onmessage = (msg) => console.log(msg);

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    auth: state,
  };
};

export default function LoginPage() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  setTimeout(() => {
    console.log(store.getState());
  }, 3000);
  return (
    <div className="flex flex-col overflow-hidden">
      <Bar />
      <br />
      {isAuthenticated ? <LogOutButton /> : <LoginButton />}
      <h1>{isAuthenticated}</h1>
    </div>
  );
}
