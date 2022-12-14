import { gql } from '@apollo/client';
import { GAME_INPUT_FRAGMENT } from '../fragments/game-input.fragment';

export const SKIP_ROUND = gql`
  ${GAME_INPUT_FRAGMENT}
  mutation SkipRound($gameId: String!) {
    skipRound(gameId: $gameId) {
      ...GameInputFragment
    }
  }
`;
