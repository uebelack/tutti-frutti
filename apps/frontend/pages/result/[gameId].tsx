import { Button } from 'UI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Errors } from '@toptal-hackathon-t2/types';
import { GET_GAME } from '../../graphql/queries/games.query';
import Loader from '../../components/Loader';

const Result = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(GET_GAME, { variables: { gameId: router.query.gameId } });

  if (error?.message === Errors.GAME_NOT_FOUND) {
    router.replace('/');
  }

  if (!data || loading) {
    return (<Loader/>);
  }

  return (<div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16 text-center">
    <h1>Congratulations 🎉</h1>
    <div className="text-9xl">🏆</div>
    <div>Your total score:</div>
    <div className="text-3xl">{data?.game?.score}</div>
    <Button color="blue" className="text-title-lg" onClick={() => router.replace('/leaderboard')}>
      View Leaderboard
    </Button>
    <Link href="/" className="text-center">Go Home</Link>
  </div>);
};

export default Result;
