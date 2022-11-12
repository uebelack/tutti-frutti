import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
import Login from './LoginButton';

function AuthenticationCheckProvider({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Login />;
}

export default AuthenticationCheckProvider;
