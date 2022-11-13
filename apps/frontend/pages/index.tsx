import Link from 'next/link';
import { Button, ComingSoon } from 'UI';
import useSound from 'use-sound';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';

const Home = () => {
  const [playConfirmSfx] = useSound('/sounds/confirm.mp3');
  return (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
      <Button
        color="white"
        className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
        // @ts-ignore
        Component={Link}
        // @ts-ignore
        href="/game"
        onClick={() => playConfirmSfx()}
      >
        Quick Play
      </Button>
      <ComingSoon className="z-10">
        <Button
          color="white"
          className="text-title-lg hover:!bg-white hover:!bg-opacity-80 w-full"
        >
          Multiplayer
        </Button>
      </ComingSoon>
      <Button
        color="white"
        className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
        // @ts-ignore
        Component={Link}
        // @ts-ignore
        href="/tutorial"
      >
        Tutorial
      </Button>
    </div>
  );
};

Home.Layout = SplashScreenLayout;

export default Home;
