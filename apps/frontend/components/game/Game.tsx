import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Errors } from '@toptal-hackathon-t2/types';
import CategoriesPicker from './CategoriesPicker';
import GameRound from './GameRound';
import { AnswerRoundInput, CreateGameInput, Round } from '../../types';
import { ANSWER_ROUND } from '../../graphql/mutations/answer-round.mutation';
import { CREATE_GAME } from '../../graphql/mutations/create-game.mutation';
import { useRouter } from 'next/router';

const Game = (): JSX.Element => {
  const router = useRouter();
  const [createGame] = useMutation<{ createGame: Round }, CreateGameInput>(
    CREATE_GAME
  );

  const [answerRound] = useMutation<{ answerRound: Round }, AnswerRoundInput>(
    ANSWER_ROUND
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
    try {
      const currentRound = await answerRound({
        variables: {
          answerRoundInput: {
            gameId: round.id,
            wordId,
          },
        },
      });

      setRound(currentRound.data.answerRound);
    } catch (error) {
      if (error.message === Errors.TIME_IS_UP) {
        // TODO IMPLEMENT
        setRound(undefined);
        router.replace(`/result/${round.id}`);
        return;
      }
      throw error;
    }
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
