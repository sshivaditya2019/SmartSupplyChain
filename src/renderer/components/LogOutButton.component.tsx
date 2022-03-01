/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogOutButton = () => {
  const { logout } = useAuth0();
  // eslint-disable-next-line react/button-has-type
  return (
    <button
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
