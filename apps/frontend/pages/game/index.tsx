import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import RootLayout from '../../components/layout/RootLayout/RootLayout';
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

function Game() {
  const [game, setGame] = useState();
  const [createGame, { data, loading, error }] = useMutation(CREATE_GAME);

  const handleOnCategoriesSelected = (categories) => {
    createGame({ variables: { createGameInput: { categories: categories.map((c) => c.id) } } } as any);
  };

  return (
    <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
      {!data && <Categories onCategoriesSelected={handleOnCategoriesSelected}/>}

    </div>
  );
}

Game.Layout = RootLayout;

export default Game;
