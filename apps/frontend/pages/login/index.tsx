import { useAuth0 } from '@auth0/auth0-react';
import SplashScreenLayout from 'apps/frontend/components/layout/SplashScreenLayout/SplashScreenLayout';
import { Button } from 'UI';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      color="white"
      className="w-3/4 md:w-1/2 max-w-[350px] text-title-lg"
      onClick={loginWithRedirect}
    >
      Login
    </Button>
  );
};

Login.Layout = SplashScreenLayout;

export default Login;
