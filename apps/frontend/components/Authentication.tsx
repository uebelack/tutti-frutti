import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
import Login from './Login';

function Authentication({ children }) {
  const {
    isAuthenticated, isLoading,
  } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return children;
  }

  return (<Login />);
}

export default Authentication;
