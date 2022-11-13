import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Errors } from '@toptal-hackathon-t2/types';
import { pick } from 'next/dist/lib/pick';
import { useRouter } from 'next/router';
import CategoriesPicker from './CategoriesPicker';
import GameRound from './GameRound';
import { AnswerRoundInput, CreateGameInput, GameType } from '../../types';
import { ANSWER_ROUND } from '../../graphql/mutations/answer-round.mutation';
import { CREATE_GAME } from '../../graphql/mutations/create-game.mutation';
import { SKIP_ROUND } from '../../graphql/mutations/skip-round.mutation';
import { USE_FIFTY_FIFTY } from '../../graphql/mutations/use-fifty-fifty';
import { FiftyFiftyInput } from '../../types/fifty-fifty-input';

const Game = (): JSX.Element => {
  const router = useRouter();
  const [round, setRound] = useState<GameType>();
  const [noMoreFiftyFifty, setNoMoreFiftyFifty] = useState(false);

  const mutationsOptions = {
    onError: (error) => {
      if (error.message === Errors.TIME_IS_UP) {
        router.replace(`/result/${round.id}`);
      } else if (error.message === Errors.NO_MORE_50_50) {
        setNoMoreFiftyFifty(true);
      } else {
        throw error;
      }
    },
  };

  const [createGame] = useMutation<{ createGame: GameType }, CreateGameInput>(
    CREATE_GAME,
  );

  const [answerRound] = useMutation<
  { answerRound: GameType },
  AnswerRoundInput
  >(ANSWER_ROUND, mutationsOptions);

  const [skipRound] = useMutation<{ skipRound: GameType }, { gameId: string }>(
    SKIP_ROUND,
    mutationsOptions,
  );

  const [mutateFiftyFifty] = useMutation<
  { useFiftyFifty: GameType },
  FiftyFiftyInput
  >(USE_FIFTY_FIFTY, mutationsOptions);

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
    // when time is app this did lead to an error
    if (currentRound.data) {
      setRound(currentRound.data.answerRound);
    }
  };

  const onSkipRound = async () => {
    const currentRound = await skipRound({ variables: { gameId: round.id } });
    setRound(currentRound.data.skipRound);
  };

  const onFiftyFifty = async () => {
    const currentRound = await mutateFiftyFifty({
      variables: {
        fiftyFiftyInput: {
          gameId: round.id,
          words: round.words.map((w) => pick(w, ['id', 'text'])),
        },
      },
    });
    setRound(currentRound.data.useFiftyFifty);
  };

  return (
    <div>
      <h1>Game</h1>
      {!round ? (
        <CategoriesPicker onSelect={onSelectCategories} />
      ) : (
        <GameRound
          round={round}
          onSelect={onAnswerRound}
          onSkip={onSkipRound}
          onFiftyFifty={onFiftyFifty}
          fiftyFiftyDisabled={noMoreFiftyFifty}
        />
      )}
    </div>
  );
};

export default Game;
