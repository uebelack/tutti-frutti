import { useMutation } from '@apollo/client';
import useSound from 'use-sound';
import { Errors } from '@toptal-hackathon-t2/types';
import { pick } from 'next/dist/lib/pick';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import cn from 'classnames';
import { ClockIcon, CloseIcon, CoinIcon, MessageIcon, VolumeIcon } from 'icons';
import { motion, useAnimationControls } from 'framer-motion';
import { ANSWER_ROUND } from '../../graphql/mutations/answer-round.mutation';
import { CREATE_GAME } from '../../graphql/mutations/create-game.mutation';
import { SKIP_ROUND } from '../../graphql/mutations/skip-round.mutation';
import { USE_FIFTY_FIFTY } from '../../graphql/mutations/use-fifty-fifty';
import { AnswerRoundInput, CreateGameInput, GameType } from '../../types';
import { FiftyFiftyInput } from '../../types/fifty-fifty-input';
import { useRootContext } from '../providers/RootLayoutProvider';
import CategoriesSelect from './CategoriesSelect';
import GameRound from './GameRound';
import s from './Game.module.css';

const Score = ({ round }: { round: GameType }): JSX.Element => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (typeof round.previousRoundCorrect !== 'boolean') return;
    (async () => {
      await controls.start({
        scale: 2.4,
        opacity: 0,
        color: round.previousRoundCorrect ? 'green' : 'red',
      });
      controls.set({
        scale: 1,
        opacity: 1,
        color: 'unset',
      });
    })();
  }, [controls, round]);

  return (
    <div className={cn('hidden lg:block', s.badge)}>
      <CoinIcon />
      <div className="relative">
        <span className="relative z-10">{round.score} Points</span>
        <motion.div
          animate={controls}
          initial={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 z-0"
        >
          {round.score} Points
        </motion.div>
      </div>
    </div>
  );
};

const Game = (): JSX.Element => {
  const [playSuccessSfx] = useSound('/sounds/success.mp3');
  const [playFailSfx] = useSound('/sounds/fail.mp3');
  const [mute, setMute] = useState(false);

  const router = useRouter();
  const [round, setRound] = useState<GameType>();
  const [startTime, setStartTime] = useState(0);
  const [barPercent, setBarPercent] = useState(100);

  const { setShowHeader } = useRootContext();

  const mutationsOptions = {
    onCompleted: (data) => {
      if (mute) return;
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
      <div className="bg-white text-title-md lg:text-title-lg fixed top-0 left-0 w-full text-black z-50 border-b border-primary-95">
        <div className="container mx-auto py-4 px-8 lg:px-0 flex justify-between items-center relative z-10">
          <Countdown
            date={startTime + round.timeLimit * 1000}
            intervalDelay={100}
            precision={1}
            renderer={({ total }) => (
              <div className={s.badge}>
                <ClockIcon />
                <span className="font-bold mr-1">
                  {(total / 1e3).toFixed(1)}{' '}
                </span>
                Seconds
              </div>
            )}
            onTick={({ total }) => {
              setBarPercent(Math.round(total / round.timeLimit / 10));
            }}
            onComplete={() => {
              setShowHeader(true);
              router.replace(`/result/${round.id}`);
            }}
          />
          <div className={s.badge}>
            <MessageIcon />
            <span>
              Question
              <span className="font-bold ml-1">{round.round}</span>
            </span>
          </div>
          <Score round={round} />
          <div
            className={cn('cursor-pointer', s.badge)}
            onClick={() => setMute((m) => !m)}
          >
            <VolumeIcon />
            <span>{mute ? 'Unmute' : 'Mute'}</span>
          </div>
          <div
            className={cn('cursor-pointer', s.badge)}
            onClick={() => router.replace('/')}
          >
            <CloseIcon />
            <span>End Game</span>
          </div>
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
