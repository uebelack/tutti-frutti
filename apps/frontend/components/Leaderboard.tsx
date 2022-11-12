import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

const QUERY = gql`
  query {
    leaderboard {
      place,
      user {
        name,
        picture
      },
      score,
    }
  }
`;

function Leaderboard() {
  const { data } = useQuery(QUERY);

  console.log(data);

  return (
    <ul>
      {data && data.leaderboard.map((entry) => (
      <li>
        {entry.place}<Image src={entry.user.picture} alt={entry.user.name} width={100} height={100}/>{entry.user.name} {entry.score}
      </li>))}
    </ul>
  );
}

export default Leaderboard;
