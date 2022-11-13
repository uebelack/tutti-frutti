import Link from 'next/link';
import { Button } from 'UI';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';

const Home = () => (
  <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
    <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
      Component={Link}
      // @ts-ignore
      href="/game"
      // onClick={() => {
      //   window.sessionStorage.setItem('mode', 'single');
      // }}
    >
      Quick Play
    </Button>
    {/* <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
    >
      Multiplayer
    </Button> */}
    <Button
      color="white"
      className="text-title-lg hover:!bg-white hover:!bg-opacity-80"
    >
      Tutorial
    </Button>
  </div>
);

Home.Layout = SplashScreenLayout;

export default Home;
