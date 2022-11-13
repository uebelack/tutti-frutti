import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { Loader } from 'UI';
import SplashScreenLayout from '../layout/SplashScreenLayout/SplashScreenLayout';

function AuthenticationCheckProvider({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  if (isLoading) {
    return (
      <SplashScreenLayout>
        <Loader />
      </SplashScreenLayout>
    );
  }

  if (isAuthenticated || router.pathname === '/login') {
    return children;
  }
  router.replace('/login');

  return null;
}

export default AuthenticationCheckProvider;
