import { gql } from '@apollo/client';
import { GAME_INPUT_FRAGMENT } from '../fragments/game-input.fragment';

export const USE_FIFTY_FIFTY = gql`
  ${GAME_INPUT_FRAGMENT}
  mutation UseFiftyFifty($fiftyFiftyInput: FiftyFiftyInput!) {
    useFiftyFifty(fiftyFiftyInput: $fiftyFiftyInput) {
      ...GameInputFragment
    }
  }
`;
