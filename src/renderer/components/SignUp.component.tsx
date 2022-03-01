/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();
  // eslint-disable-next-line react/button-has-type
  return (
    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
      Sign Up
    </button>
  );
};

export default SignUpButton;
