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
  fiftyFiftyUses: boolean;
  round: number;
  categoryName: string;
  score: number;
  words: Word[];
}
