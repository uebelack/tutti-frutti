import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
  query {
    categories {
      id
      emoji
      name
      description
    }
  }
`;

function Categories() {
  const { data } = useQuery(QUERY);

  return (
    <ul>
      {data
        && data.categories.map((category) => (
          <li key={category.name}>
            {category.emoji}
            {category.name}
          </li>
        ))}
    </ul>
  );
}

export default Categories;
