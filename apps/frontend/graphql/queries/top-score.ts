import { gql } from '@apollo/client';

export const TOP_SCORE = gql`
  query TopScore {
    topScore {
      id
      score
    }
  }
`;
