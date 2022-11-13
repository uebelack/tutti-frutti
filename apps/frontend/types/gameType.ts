export interface Word {
  id: string;
  text: string;
  fiftyFiftyWrong?: boolean;
}

export interface Category {
  id: string;
  text: string;
}

export interface GameType {
  id: string;
  categories: Category[];
  createdAt: string;
  fiftyFiftyUsesLeft: number;
  round: number;
  categoryName: string;
  score: number;
  words: Word[];
}
