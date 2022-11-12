import { useRouter } from 'next/router';
import { Button } from 'UI';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';

const Home = () => {
  const router = useRouter();
  return (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
      <Button
        color="white"
        className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
        onClick={() => router.replace('/game')}
      >
        Quick Play
      </Button>
      <Button color="white" className="text-title-lg">
        Multiplayer
      </Button>
      <Button color="white" className="text-title-lg">
        Tutorial
      </Button>
    </div>
  );
};

Home.Layout = SplashScreenLayout;

export default Home;
