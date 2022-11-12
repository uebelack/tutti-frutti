import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';

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

function Index() {
  const { data } = useQuery(QUERY);

  return (
    <ul>
      {data && data.leaderboard.map((entry) => (
      <li className="flex" key={entry.user.id}>
        {entry.place}<Image src={entry.user.picture} alt={entry.user.name} width={100} height={100}/>{entry.user.name} {entry.score}
      </li>))}
    </ul>
  );
}

export default Index;
