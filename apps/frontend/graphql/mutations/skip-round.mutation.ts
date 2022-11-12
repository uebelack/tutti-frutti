import { gql } from '@apollo/client';

export const SKIP_ROUND = gql`
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
