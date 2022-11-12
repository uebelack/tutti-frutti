import { gql } from '@apollo/client';

export const GET_GAME = gql`
  query Game($gameId: String!) {
    game(gameId: $gameId) {
      score
    }
  }
`;
