import { Popup } from 'UI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SplashScreenLayout from '../../components/layout/SplashScreenLayout/SplashScreenLayout';

const Tutorial = () => {
  const router = useRouter();

  const Content = (
    <>
      <h1 className="text-heading-lg mb-10">Tutorial</h1>
      <article className="prose mb-5">
        <h2>What is the game Tutti Frutti?</h2>
        <p>Tutti Frutti is a creative fun  category game you can play on your own or with up to four other people.
          The original version is very popular in Argentina and all Latin American countries, but is played all around the world
          under different names: In France, it is known as &apos;Le jeu du baccalauréat&apos;, German speaking people call it “City, Country,
          River” and in English speaking countries, it is known as &apos;Scattergories&apos;,
          &apos;Tutti Frutti&apos;  or &apos;Stop the Bus,&apos; depending on the version being played.
        </p>
        <h2>Tutti Frutti Game Instructions</h2>
        <h3>How do you play Tutti Frutti?</h3>
        <p>This game is about how fast you can choose the right word for a randomly selected category and a
          starting letter. Each game lasts 30 seconds and the goal is to play as many rounds as possible.
           The more words you choose correctly, the more points you get.</p>
        <h3>How does the 50:50 Lifeline work?</h3>
        <p>You can click on the 50:50 button if you get stuck to eliminate 50% of the wrong answers. But keep in mind that for every game you can use the 50:50 lifeline only ones.
          Unless you are among the top 10 in the ranking, then you are allowed to use the 50:50 lifeline even twice.</p>
        <h3>How are points counted?</h3>
        <p>For every right answer you get 10 points, for every wrong answer you lose 20 points.
          If you don't know the answer for sure, it might make more sense to skip the round with the skip button.</p>
      </article>
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
          router.push('/');
        }}
        motionInitial={{ opacity: 0, scale: 0.5 }}
        motionAnimate={{ opacity: 1, scale: 1 }}
        motionExit={{ opacity: 0 }}
        className="text-center !py-10 !px-16 hidden lg:block"
        overlayClassName="hidden lg:grid"
      >
        {Content}
      </Popup>
      <div className="fixed inset-0 lg:hidden grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="!p-8 !pt-20 w-full bg-white text-black"
        >
          {Content}
        </motion.div>
      </div>
    </>
  );
};

Tutorial.Layout = SplashScreenLayout;

export default Tutorial;
