import { useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { Button, IconButton, Loader, Popup } from 'UI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Errors } from '@toptal-hackathon-t2/types';
import useSound from 'use-sound';
import { motion } from 'framer-motion';
import { CloseIcon } from 'icons';
import SplashScreenLayout from '../../components/layout/SplashScreenLayout/SplashScreenLayout';
import { GAME_RESULTS } from '../../graphql/queries/game-results';
import { GameResults } from '../../types';

const Result = () => {
  const router = useRouter();
  const [playCongratulationSfx] = useSound('/sounds/congratulations.mp3');
  const [playPittySfx] = useSound('/sounds/pitty.mp3');

  const { width, height } = useWindowSize();

  const { data, error, loading } = useQuery<{ gameResults: GameResults }>(
    GAME_RESULTS,
    {
      variables: { gameId: router.query.gameId },
      onCompleted: (d: { gameResults: GameResults }) => {
        if (d?.gameResults?.score > 0) {
          playCongratulationSfx();
        } else {
          playPittySfx();
        }
      }
    }
  );

  if (error?.message === Errors.GAME_NOT_FOUND) {
    router.replace('/');
  }

  if (!data || loading) {
    return (
      <span className="mx-auto scale-75 md:scale-100 lg:scale-150 inline-block">
        <Loader />
      </span>
    );
  }

  const success = data?.gameResults?.score > 0;

  const Content = (
    <>
      <h1 className="text-heading-lg mb-10">{ success ? 'Congratulations 🎉' : 'What a pity 🤦‍♀️' } </h1>
      <p className="text-9xl mb-10">{ success ? '🏆' : '💩' }</p>
      <p className="text-heading-sm mb-6">Your total score:</p>
      <p className="text-5xl mb-10">{data?.gameResults?.score}</p>
      <Button
        color="blue"
        className="text-title-lg block mb-4"
        Component={Link}
        // @ts-ignore
        href="/leaderboard"
      >
        View Leaderboard
      </Button>
      <Link href="/" className="text-center underline underline-offset-2">
        Go Home
      </Link>
    </>
  );

  return (
    <>
      <Popup
        isOpen={true}
        onClose={() => {
          router.push('/leaderboard');
        }}
        motionInitial={{ opacity: 0, scale: 0.5 }}
        motionAnimate={{ opacity: 1, scale: 1 }}
        motionExit={{ opacity: 0 }}
        className="text-center !py-10 !px-16 hidden lg:block relative"
        overlayClassName="hidden lg:grid"
      >
        <IconButton
          onClick={() => {
            router.push('/leaderboard');
          }}
          className="!absolute !top-4 !right-4 w-6 !text-black hover:!bg-blue hover:!bg-opacity-10"
        >
          <CloseIcon className="w-1/2" />
        </IconButton>
        {Content}
      </Popup>
      <div className="fixed inset-0 lg:hidden grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="!p-8 !pt-20 w-full bg-white text-black relative"
        >
          <IconButton
            onClick={() => {
              router.push('/leaderboard');
            }}
            className="!absolute !top-4 !right-4 w-6 !text-black hover:!bg-blue hover:!bg-opacity-10"
          >
            <CloseIcon className="w-1/2" />
          </IconButton>
          {Content}
        </motion.div>
      </div>
      {success
      && <Confetti
        width={width}
        height={height}
        className="!z-50 !fixed"
        initialVelocityY={0.5}
      />}
    </>
  );
};

Result.Layout = SplashScreenLayout;

export default Result;
