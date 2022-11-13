import { useQuery, gql } from '@apollo/client';
import { TrophyIcon } from 'icons';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import SplashScreenLayout from '../../components/layout/SplashScreenLayout/SplashScreenLayout';

const QUERY = gql`
  query {
    leaderboard {
      place
      user {
        name
        picture
      }
      score
    }
  }
`;

const TrophyNumber = ({ num }: { num: number }) => (
  <div className="relative w-8">
    <TrophyIcon className="w-full text-[#B0AFB1]" />
    <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-label-md">
      {num}
    </span>
  </div>
);

export const Leaderboard = () => {
  const { data } = useQuery(QUERY);

  const topThree = useMemo(
    () => data?.leaderboard.filter((_, index) => index < 3),
    [data]
  );

  return data ? (
    <ul className="mx-auto w-full lg:w-max px-8">
      <div className="flex justify-center gap-8 items-end text-center">
        {topThree[1] && (
          <div className="flex-1">
            <div className="w-28 aspect-square rounded-full overflow-hidden border-4 border-[#A8A8A8] mb-4 mx-auto">
              <Image
                src={topThree[1].user.picture}
                alt={topThree[1].user.name}
                width={200}
                height={200}
              />
            </div>
            <p className="text-body-lg">{topThree[1].user.name}</p>
            <p className="text-title-lg text-warning">{topThree[1].score}</p>
          </div>
        )}

        {topThree[0] && (
          <div className="flex-1 relative bottom-10 left-1">
            <div className="aspect-square rounded-full overflow-hidden w-32 border-4 border-warning mb-4 mx-auto">
              <Image
                src={topThree[0].user.picture}
                alt={topThree[0].user.name}
                width={200}
                height={200}
              />
            </div>
            <p className="text-body-lg font-semibold">
              {topThree[0].user.name}
            </p>
            <p className="text-title-lg font-semibold text-warning">
              {topThree[0].score}
            </p>
          </div>
        )}

        {topThree[2] && (
          <div className="flex-1">
            <div className="w-24 aspect-square rounded-full overflow-hidden border-4 border-[#FB8A4A] mb-4 mx-auto">
              <Image
                src={topThree[2].user.picture}
                alt={topThree[2].user.name}
                width={200}
                height={200}
              />
            </div>
            <p className="text-body-lg">{topThree[2].user.name}</p>
            <p className="text-title-lg text-warning">{topThree[2].score}</p>
          </div>
        )}
      </div>

      <div className="bg-white pt-8 px-4 pb-6 rounded-[16px] mt-10 flex flex-col gap-6">
        {data.leaderboard
          .filter((_, index) => index >= 3)
          .map((entry) => (
            <li
              className="flex items-center rounded-[200px] border border-primary-95"
              key={entry.user.id}
            >
              <div className="px-6">
                <TrophyNumber num={entry.place} />
              </div>
              <div className="flex items-center py-6 px-6 min-w-[30ch] border-x border-primary-95 gap-6">
                <div className="w-8 aspect-square rounded-full overflow-hidden">
                  <Image
                    src={entry.user.picture}
                    alt={entry.user.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-black text-body-lg">{entry.user.name}</p>
              </div>
              <p className="text-black text-title-md px-6">{entry.score}</p>
            </li>
          ))}
        <Link href="/" className="text-black underline text-body-md">
          Go Home
        </Link>
      </div>
    </ul>
  ) : null;
};

Leaderboard.Layout = SplashScreenLayout;

export default Leaderboard;

export async function getStaticProps() {
  return { props: { noAnimation: true } };
}
