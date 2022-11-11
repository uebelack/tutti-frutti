import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import LogoutButton from '../components/LogoutButton';

const QUERY = gql`
  query {
    categories {
      id,
      emoji,
      name,
      description
    }
  }
`;

function Categories() {
  const { data } = useQuery(QUERY);

  return (
    <ul>
      {data && data.categories.map((category) => (<li>{category.emoji}{category.name}</li>))}
    </ul>
  );
}

export default Categories;
