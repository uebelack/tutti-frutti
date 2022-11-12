export interface Round {
  id: string;
  categories: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  fiftyFiftyUses: boolean;
  round: number;
  categoryName: string;
  score: number;
  words: {
    id: string;
    text: string;
  }[];
}

export interface CreateGameInput {
  createGameInput: {
    categories: string[];
  };
}

export interface AnswerRoundInput {
  answerRoundInput: {
    gameId: string;
    wordId: string;
  };
}
