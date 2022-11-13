import { Button } from 'UI';
import { GameType } from '../../types';

const getNthAlphabetLetter = (n: number) => String.fromCharCode(65 + n);

const MessageBar = ({ round }: { round: GameType }): JSX.Element => (
  <div className="bg-primary-95 text-2xl border-t-6 border-b-6 border-white">
    <div className="container mx-auto py-4 flex justify-between items-center">
      <div>30 seconds</div>
      <div>Question {round.round}</div>
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
    <div>
      <MessageBar round={round} />
      <div className="w-3/4 md:w-1/2 max-w-[350px] mx-auto flex flex-col gap-16">
        <h3>Category: {round.categoryName}</h3>
        <div className="flex">
          <div className="text-7xl mr-5">{round.character}</div>
          <p
            dangerouslySetInnerHTML={{
              __html: round.categoryDescription.replace(
                '{0}',
                `<strong>${round.character}</strong>`
              ),
            }}
          ></p>
        </div>
        <div className="flex flex-col gap-8">
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
        <div className="flex gap-8 pt-6">
          <Button
            shape="pill"
            color="purple"
            onClick={onFiftyFifty}
            disabled={fiftyFiftyUsed || round.fiftyFiftyUsesLeft <= 0}
          >
            50:50
          </Button>
          <Button shape="pill" color="purple" onClick={onSkip}>
            SKIP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameRound;
