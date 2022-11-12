import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import LogoutButton from '../components/LogoutButton';
import Categories from '../components/Categories';
import Leaderboard from '../components/Leaderboard';
import SplashScreenLayout from '../components/layout/SplashScreenLayout/SplashScreenLayout';

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
    <div className="container">
      <h1>Hello {user.name}!</h1>
      <Image src={user.picture} alt={user.name} width={100} height={100} />
      <Categories />
      <Leaderboard />
      <LogoutButton />
      <p>2022 copyright T² - {data?.app?.serverTime}</p>
    </div>
  );
};

Home.Layout = SplashScreenLayout;

export default Home;
