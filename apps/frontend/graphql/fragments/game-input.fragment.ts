import { gql } from '@apollo/client';

export const GAME_INPUT_FRAGMENT = gql`
  fragment GameInputFragment on GameEntity {
    id
    categories {
      id
      name
    }
    createdAt
    fiftyFiftyUsesLeft
    round
    categoryName
    categoryDescription
    character
    score
    words {
      id
      text
      fiftyFiftyWrong
    }
    previousRoundCorrect
    timeLimit
  }
`;
