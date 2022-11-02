import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  query {app {serverTime}}
`;

function Index() {
  const { data } = useQuery(QUERY);

  return (
    <div className="container">
    <h1>Hello World!</h1>
    <p>2022 copyright T² - {data?.app?.serverTime}</p>
    </div>
  );
}

export default Index;
