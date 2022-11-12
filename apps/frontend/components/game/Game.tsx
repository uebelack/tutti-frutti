import { useMutation } from '@apollo/client';
import { useState } from 'react';
import CategoriesPicker from './CategoriesPicker';
import { ANSWER_ROUND, CREATE_GAME } from './queries';
import { AnswerRoundInput, CreateGameInput, Round } from './types';
import GameRound from './GameRound';

const Game = (): JSX.Element => {
  const [createGame] = useMutation<{ createGame: Round }, CreateGameInput>(
    CREATE_GAME,
  );

  const [answerRound] = useMutation<{ answerRound: Round }, AnswerRoundInput>(
    ANSWER_ROUND,
  );

  const [round, setRound] = useState<Round>();

  const onSelectCategories = async (categories: string[]) => {
    const currentRound = await createGame({
      variables: {
        createGameInput: {
          categories,
        },
      },
    });

    setRound(currentRound.data.createGame);
  };

  const onAnswerRound = async (wordId: string) => {
    const currentRound = await answerRound({
      variables: {
        answerRoundInput: {
          gameId: round.id,
          wordId,
        },
      },
    });

    setRound(currentRound.data.answerRound);
  };

  return (
    <div>
      <h1>Game</h1>
      {!round ? (
        <CategoriesPicker onSelect={onSelectCategories} />
      ) : (
        <GameRound round={round} onSelect={onAnswerRound} />
      )}
    </div>
  );
};

export default Game;
