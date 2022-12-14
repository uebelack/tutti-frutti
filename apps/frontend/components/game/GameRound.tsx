import cn from 'classnames';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'icons';
import { Button, Popup } from 'UI';
import { GameType } from '../../types';

const getNthAlphabetLetter = (n: number) => String.fromCharCode(65 + n);

interface Props {
  round: GameType;

  onSelect(id: string): void;

  onSkip(): void;

  onFiftyFifty(): void;
}

const GameRound = ({
  round,
  onSelect,
  onSkip,
  onFiftyFifty,
}: Props): JSX.Element => {
  const fiftyFiftyUsed = round.words.some((w) => w.fiftyFiftyWrong);

  const Content = (
    <div className="flex flex-col">
      <div className="text-center mb-6 lg:mb-16 text-body-md text-secondary-60 flex flex-wrap items-center gap-2 lg:gap-5 justify-center">
        <p className="font-bold">Categories:</p>
        {round.categories.map((category) => (
          <p
            key={category.id}
            className={cn('py-0.5 px-2 border border-primary-95 rounded-4xl', {
              'bg-primary-95 text-black': category.name === round.categoryName,
            })}
          >
            {category.name}
          </p>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 mb-6 lg:mb-12 text-black mt-auto">
        <div className="text-7xl leading-none font-semibold w-32 aspect-square rounded-full relative border border-secondary-90 shrink-0">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {round.character}
          </p>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: round.categoryDescription.replace(
              '{0}',
              `<strong>${round.character}</strong>`
            ),
          }}
          className="text-body-md lg:text-body-lg"
        ></p>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8 mb-6">
        {round.words.map((word, i) => (
          <Button
            shape="rounded"
            color="outlined"
            key={word.id}
            onClick={() => onSelect(word.id)}
            disabled={word.fiftyFiftyWrong}
            className="text-left text-black"
          >
            <span className="uppercase font-bold">
              {getNthAlphabetLetter(i)}.
            </span>{' '}
            {word.text}
          </Button>
        ))}
      </div>

      <div className="mx-auto w-full lg:w-max flex justify-between gap-8 pt-6 border-t border-secondary-90">
        <Button
          shape="pill"
          color="purple"
          onClick={onFiftyFifty}
          disabled={fiftyFiftyUsed || round.fiftyFiftyUsesLeft <= 0}
        >
          50:50
        </Button>
        <Button
          shape="rounded"
          color="purple"
          className="flex items-center justify-center gap-2.5 bg-primary-95 text-body-lg"
          onClick={onSkip}
        >
          Pass <ArrowRightIcon className="w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popup
        isOpen={true}
        onClose={() => {}}
        className="!p-8 max-w-lg w-full hidden lg:block"
        overlayClassName="!bg-opacity-0 hidden lg:grid"
      >
        {Content}
      </Popup>
      <div className="fixed inset-0 lg:hidden">
        <motion.div
          initial={{ opacity: 0, x: '50%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-50%' }}
          transition={{ duration: 0.5 }}
          className="!p-8 !pt-20 w-full bg-white h-screen max-h-screen overflow-auto"
        >
          {Content}
        </motion.div>
      </div>
    </>
  );
};

export default GameRound;
