import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import LogoutButton from '../components/auth/LogoutButton';
import Leaderboard from '../components/Leaderboard';
import Game from '../components/game/Game';

function Index() {
  const { user } = useAuth0();

  return (
    <div className="container">
      <h1>Hello {user.name}!</h1>
      <Image src={user.picture} alt={user.name} width={100} height={100} />
      <Game />
      <Leaderboard />
      <LogoutButton />
      <p>2022 copyright T²</p>
    </div>
  );
}

export default Index;
