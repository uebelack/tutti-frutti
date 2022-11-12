import { Word } from './gameType';

export interface FiftyFiftyInput {
  fiftyFiftyInput: {
    gameId: string;
    words: Word[];
  };
}
