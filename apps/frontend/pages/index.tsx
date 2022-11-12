import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'UI';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';
import Game from '../components/game/Game';

const QUERY = gql`
  query {
    app {
      serverTime
    }
  }
`;

const Home = () => {
  const { data } = useQuery(QUERY);
  const { user } = useAuth0();

  return (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
      {/* <h1>Hello {user.name}!</h1>
      <Image src={user.picture} alt={user.name} width={100} height={100} />
      <Categories />
      <Leaderboard />
      <LogoutButton />
      <p>2022 copyright T² - {data?.app?.serverTime}</p> */}
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
};

Home.Layout = SplashScreenLayout;

export default Home;
