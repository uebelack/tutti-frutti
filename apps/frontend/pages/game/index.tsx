import { gql, useMutation } from '@apollo/client';
import Categories from '../../components/Categories';

const CREATE_GAME = gql`
  mutation CreateGame($createGameInput: CreateGameInput!) {
    createGame(createGameInput: $createGameInput) {
      id,
      categoryName,
      words { 
        id,
        text,
      }
    }
  }
`;

function Index() {
  const [createGame, { data, loading, error }] = useMutation(CREATE_GAME);

  console.log(data);

  const handleOnCategoriesSelected = (categories) => {
    createGame({ variables: { createGameInput: { categories: categories.map((c) => c.id) } } } as any);
  };

  return (
    <div className="container">
      <Categories onCategoriesSelected={handleOnCategoriesSelected}/>
    </div>
  );
}

export default Index;
