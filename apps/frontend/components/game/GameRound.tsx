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
    <h3>Category: {round.categoryName}</h3>
    <p>Total points: {round.score}</p>
    <div>
      {round.words.map((word) => (
        <button key={word.id} onClick={() => onSelect(word.id)}>
          {word.text}
        </button>
      ))}
    </div>
  </div>
);

export default GameRound;
