export interface Word {
  id: string;
  text: string;
  fiftyFiftyWrong?: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
}

export interface GameType {
  id: string;
  categories: GameCategory[];
  createdAt: string;
  fiftyFiftyUsesLeft: number;
  round: number;
  categoryName: string;
  categoryDescription: string;
  character: string;
  score: number;
  words: Word[];
}

export interface GameResults {
  id: string;
  score: number;
}
