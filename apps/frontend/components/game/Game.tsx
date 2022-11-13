import { useMutation } from '@apollo/client';
import useSound from 'use-sound';
import { Errors } from '@toptal-hackathon-t2/types';
import { pick } from 'next/dist/lib/pick';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Countdown from 'react-countdown';
import cn from 'classnames';
import { ANSWER_ROUND } from '../../graphql/mutations/answer-round.mutation';
import { CREATE_GAME } from '../../graphql/mutations/create-game.mutation';
import { SKIP_ROUND } from '../../graphql/mutations/skip-round.mutation';
import { USE_FIFTY_FIFTY } from '../../graphql/mutations/use-fifty-fifty';
import { AnswerRoundInput, CreateGameInput, GameType } from '../../types';
import { FiftyFiftyInput } from '../../types/fifty-fifty-input';
import { useRootContext } from '../providers/RootLayoutProvider';
import CategoriesSelect from './CategoriesSelect';
import GameRound from './GameRound';

const Game = (): JSX.Element => {
  const [playSuccessSfx] = useSound('/sounds/success.mp3');
  const [playFailSfx] = useSound('/sounds/fail.mp3');

  const router = useRouter();
  const [round, setRound] = useState<GameType>();
  const [startTime, setStartTime] = useState(0);
  const [barPercent, setBarPercent] = useState(100);

  const { setShowHeader } = useRootContext();

  const mutationsOptions = {
    onCompleted: (data) => {
      if (data.answerRound?.previousRoundCorrect) {
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
      setStartTime(Date.now());
      setShowHeader(false);
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
    <>
      <div className="bg-white text-title-lg fixed top-0 left-0 w-full text-black z-50">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Countdown
            date={startTime + round.timeLimit * 1000}
            intervalDelay={100}
            precision={1}
            renderer={({ total }) => (
              <span>{(total / 1e3).toFixed(1)} seconds left</span>
            )}
            onTick={({ total }) => {
              setBarPercent(Math.round(total / round.timeLimit / 10));
            }}
            onComplete={() => {
              setShowHeader(true);
              router.push(`/result/${round.id}`);
            }}
          />
          <div>Score {round.score}</div>
          <div>Question {round.round}</div>
          {/* <div>End game</div> */}
        </div>
        <span
          className={cn(
            'absolute top-2 left-0 bottom-2 opacity-10 w-full origin-left transition-[transform,_background-color] ease-linear duration-1000',
            {
              'bg-primary-50': barPercent > 25,
              'bg-warning': barPercent > 10 && barPercent <= 25,
              'bg-error': barPercent <= 10,
            }
          )}
          style={{
            transform: `scaleX(${barPercent}%)`,
          }}
        />
        <span
          className={cn(
            'absolute -bottom-2 left-0 w-full h-2 origin-left transition-[transform,background-color] ease-linear duration-1000',
            {
              'bg-primary-50': barPercent > 25,
              'bg-warning': barPercent > 10 && barPercent <= 25,
              'bg-error': barPercent <= 10,
            }
          )}
          style={{
            transform: `scaleX(${barPercent}%)`,
          }}
        />
      </div>
      <GameRound
        round={round}
        onSelect={onAnswerRound}
        onSkip={onSkipRound}
        onFiftyFifty={onFiftyFifty}
      />
    </>
  );
};

export default Game;
