import { Button } from 'UI';
import { Round } from './types';

const GameRound = ({
  round,
  onSelect,
}: {
  round: Round;
  onSelect(id: string): void;
}): JSX.Element => (
  <div>
    <h2>Round {round.round + 1}</h2>
    <p>Total points: {round.score}</p>
    <h3>Category: {round.categoryName}</h3>
    <div className="flex flex-col gap-4">
      {round.words.map((word) => (
        <Button key={word.id} onClick={() => onSelect(word.id)}>
          {word.text}
        </Button>
      ))}
    </div>
  </div>
);

export default GameRound;
