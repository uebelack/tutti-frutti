import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import LogoutButton from '../components/LogoutButton';
import Categories from '../components/Categories';
import Leaderboard from '../components/Leaderboard';


function Index() {
  const { user } = useAuth0();

  return (
    <div className="container">
    <h1>Hello {user.name}!</h1>
    <Image src={user.picture} alt={user.name} width={100} height={100}/>
    <Categories />
    <Leaderboard />
    <LogoutButton />
    <p>2022 copyright T²</p>
    </div>
  );
}

export default Index;
