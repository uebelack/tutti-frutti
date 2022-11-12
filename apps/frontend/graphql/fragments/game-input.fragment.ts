import { gql } from '@apollo/client';

export const GAME_INPUT_FRAGMENT = gql`
  fragment GameInputFragment on Game {
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
`;
