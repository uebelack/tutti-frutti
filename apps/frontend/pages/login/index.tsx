import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'UI';
import SplashScreenLayout from '../../components/layout/SplashScreenLayout/SplashScreenLayout';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      color="white"
      className="w-3/4 md:w-1/2 max-w-[350px] text-title-lg hover:!bg-white hover:!bg-opacity-80"
      onClick={loginWithRedirect}
    >
      Login
    </Button>
  );
};

Login.Layout = SplashScreenLayout;

export default Login;
