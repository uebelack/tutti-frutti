import { gql } from '@apollo/client';
import { GAME_INPUT_FRAGMENT } from '../fragments/game-input.fragment';

export const CREATE_GAME = gql`
  ${GAME_INPUT_FRAGMENT}
  mutation CreateGame($createGameInput: CreateGameInput!) {
    createGame(createGameInput: $createGameInput) {
      ...GameInputFragment
    }
  }
`;
