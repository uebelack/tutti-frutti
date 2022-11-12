import { Button } from 'UI';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';
import Game from '../components/game/Game';

const Home = () => (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
      <Game />

      <Button color="white" className="text-title-lg">
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

Home.Layout = SplashScreenLayout;

export default Home;
