import { gql } from '@apollo/client';
import { GAME_INPUT_FRAGMENT } from '../fragments/game-input.fragment';

export const ANSWER_ROUND = gql`
  ${GAME_INPUT_FRAGMENT}
  mutation AnswerRound($answerRoundInput: AnswerRoundInput!) {
    answerRound(answerRoundInput: $answerRoundInput) {
      ...GameInputFragment
    }
  }
`;
