import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query {
    categories {
      id
      emoji
      name
      description
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($createGameInput: CreateGameInput!) {
    createGame(createGameInput: $createGameInput) {
      id
      categories {
        id
        name
      }
      createdAt
      fiftyFiftyUses
      round
      categoryName
      score
      words {
        id
        text
      }
      previousRoundCorrect
    }
  }
`;

export const ANSWER_ROUND = gql`
  mutation AnswerRound($answerRoundInput: AnswerRoundInput!) {
    answerRound(answerRoundInput: $answerRoundInput) {
      id
      categories {
        id
        name
      }
      createdAt
      fiftyFiftyUses
      round
      categoryName
      score
      words {
        id
        text
      }
      previousRoundCorrect
    }
  }
`;
