import { Button, Popup } from 'UI';
import cn from 'classnames';
import { ArrowRightIcon } from 'icons';
import { GameType } from '../../types';

const getNthAlphabetLetter = (n: number) => String.fromCharCode(65 + n);

const MessageBar = ({ round }: { round: GameType }): JSX.Element => (
  <div className="bg-primary-95 text-2xl border-t-6 border-b-6 border-white">
    <div className="container mx-auto py-4 flex justify-between items-center">
      <div>30 seconds</div>
      <div>Question {round.round + 1}</div>
      <div>Score {round.score}</div>
      <div>Mute</div>
      <div>End game</div>
    </div>
  </div>
);

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

  return (
    <Popup isOpen={true} onClose={() => {}} className="!p-8 max-w-lg w-full">
      {/* <MessageBar round={round} /> */}
      <div className="text-center mb-16 text-body-md text-secondary-60 flex flex-wrap items-center gap-5 justify-center">
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

      <div className="flex items-center gap-5 mb-12">
        <div className="text-7xl font-semibold w-32 aspect-square rounded-full relative border border-secondary-90 shrink-0">
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
          className="text-body-lg"
        ></p>
      </div>

      <div className="flex flex-col gap-8 mb-6">
        {round.words.map((word, i) => (
          <Button
            shape="rounded"
            color="outlined"
            key={word.id}
            onClick={() => onSelect(word.id)}
            disabled={word.fiftyFiftyWrong}
            className="text-left"
          >
            <span className="uppercase font-bold">
              {getNthAlphabetLetter(i)}.
            </span>{' '}
            {word.text}
          </Button>
        ))}
      </div>

      <div className="mx-auto w-max flex gap-8 pt-6 border-t border-secondary-90">
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
    </Popup>
  );
};

export default GameRound;
