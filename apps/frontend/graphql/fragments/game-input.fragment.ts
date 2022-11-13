import { gql } from '@apollo/client';

export const GAME_INPUT_FRAGMENT = gql`
  fragment GameInputFragment on Game {
    id
    categories {
      id
      name
    }
    createdAt
    fiftyFiftyUsesLeft
    round
    categoryName
    score
    words {
      id
      text
      fiftyFiftyWrong
    }
    previousRoundCorrect
  }
`;
