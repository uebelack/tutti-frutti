import { gql } from '@apollo/client';

export const GAME_RESULTS = gql`
  query GameResults($gameId: String!) {
    gameResults(gameId: $gameId) {
      id
      score
    }
  }
`;
