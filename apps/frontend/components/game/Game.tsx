import { useMutation } from '@apollo/client';
import { useState } from 'react';
import useSound from 'use-sound';
import { Errors } from '@toptal-hackathon-t2/types';
import { pick } from 'next/dist/lib/pick';
import { useRouter } from 'next/router';
import CategoriesSelect from './CategoriesSelect';
import GameRound from './GameRound';
import { AnswerRoundInput, CreateGameInput, GameType } from '../../types';
import { ANSWER_ROUND } from '../../graphql/mutations/answer-round.mutation';
import { CREATE_GAME } from '../../graphql/mutations/create-game.mutation';
import { SKIP_ROUND } from '../../graphql/mutations/skip-round.mutation';
import { USE_FIFTY_FIFTY } from '../../graphql/mutations/use-fifty-fifty';
import { FiftyFiftyInput } from '../../types/fifty-fifty-input';

const Game = (): JSX.Element => {
  const [playSuccessSfx] = useSound('/sounds/success.mp3');
  const [playFailSfx] = useSound('/sounds/fail.mp3');

  const router = useRouter();
  const [round, setRound] = useState<GameType>();

  const mutationsOptions = {
    onCompleted: (data) => {
      console.log(data.answerRound);
      if (data.answerRound.previousRoundCorrect) {
        playSuccessSfx();
      } else {
        playFailSfx();
      }
    },
    onError: (error) => {
      if (error.message === Errors.TIME_IS_UP) {
        router.replace(`/result/${round.id}`);
      } else {
        throw error;
      }
    },
  };

  const [createGame] = useMutation<{ createGame: GameType }, CreateGameInput>(
    CREATE_GAME
  );

  const [answerRound] = useMutation<
    { answerRound: GameType },
    AnswerRoundInput
  >(ANSWER_ROUND, mutationsOptions);

  const [skipRound] = useMutation<{ skipRound: GameType }, { gameId: string }>(
    SKIP_ROUND,
    mutationsOptions
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

    if (currentRound.data?.createGame) {
      setRound(currentRound.data.createGame);
    }
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
    if (currentRound.data?.answerRound) {
      setRound(currentRound.data.answerRound);
    }
  };

  const onSkipRound = async () => {
    const currentRound = await skipRound({ variables: { gameId: round.id } });
    if (currentRound.data?.skipRound) {
      setRound(currentRound.data.skipRound);
    }
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
    if (currentRound.data?.useFiftyFifty) {
      setRound(currentRound.data.useFiftyFifty);
    }
  };

  return !round ? (
    <CategoriesSelect onSelect={onSelectCategories} />
  ) : (
    <GameRound
      round={round}
      onSelect={onAnswerRound}
      onSkip={onSkipRound}
      onFiftyFifty={onFiftyFifty}
    />
  );
};

export default Game;
