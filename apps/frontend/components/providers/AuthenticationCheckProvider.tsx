import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import Loader from '../Loader';

function AuthenticationCheckProvider({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated || router.pathname === '/login') {
    return children;
  }
  router.replace('/login');

  return null;
}

export default AuthenticationCheckProvider;
