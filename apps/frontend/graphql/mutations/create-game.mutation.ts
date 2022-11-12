import { gql } from '@apollo/client';

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
