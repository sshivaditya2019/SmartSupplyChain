/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const envVariables = require('../env-variables.json');

const { apiIdentifier, auth0Domain, clientId } = envVariables;

type MyCompProp = React.PropsWithChildren<{}>;
const Auth0ProviderWithHistory = ({ children }: MyCompProp) => {
  const domain = auth0Domain;

  const history = useNavigate();

  const onRedirectCallback = (appState: any) => {
    history(appState?.returnTo || window.location.pathname);
  };
  console.log(window.location.origin);

  return (
    <Auth0Provider
      domain={domain!}
      clientId={clientId!}
      redirectUri={`${window.location.origin}/index.html/post-auth`}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithHistory;
