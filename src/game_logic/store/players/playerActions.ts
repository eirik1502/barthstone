import { CardId } from "../../gameTypes"

export const PLAYER__KILL_BOARD_CARD = "PLAYER/KILL_BOARD_CARD"
export const PLAYER__RESET_MANA = "PLAYER/RESET_MANA"
export const PLAYER__REDUCE_MANA = "PLAYER/REDUCE_MANA"
export const PLAYER__MOVE_CARD_FROM_LIBRARY_TO_HAND = "PLAYER/MOVE_CARD_FROM_LIBRARY_TO_HAND"
export const PLAYER__MOVE_CARD_FROM_HAND_TO_BOARD = "PLAYER/MOVE_CARD_FROM_HAND_TO_BOARD"
export const PLAYER__REDUCE_CARD_DEFENCE = "PLAYER/REDUCE_CARD_DEFENCE"

type MoveCardFromLibraryToHandAction = {
  type: typeof PLAYER__MOVE_CARD_FROM_LIBRARY_TO_HAND
  playerIndex: number
  cardId: CardId
}

type MoveCardFromHandToBoardAction = {
  type: typeof PLAYER__MOVE_CARD_FROM_HAND_TO_BOARD
  playerIndex: number
  cardId: CardId
}

type ReduceCardDefenceAction = {
  type: typeof PLAYER__REDUCE_CARD_DEFENCE
  playerIndex: number
  cardId: CardId
  amount: number
}

type KillBoardCardAction = {
  type: typeof PLAYER__KILL_BOARD_CARD
  playerIndex: number
  cardId: CardId
}

type ResetManaAction = {
  type: typeof PLAYER__RESET_MANA
  playerIndex: number
  amount: number
}

type ReduceManaAction = {
  type: typeof PLAYER__REDUCE_MANA
  playerIndex: number
  amount: number
}

export default {
  moveCardFromLibraryToHand: (playerIndex: number, cardId: CardId): PlayerActionTypes => ({
    type: PLAYER__MOVE_CARD_FROM_LIBRARY_TO_HAND,
    playerIndex,
    cardId,
  }),
  moveCardFromHandToBoard: (playerIndex: number, cardId: CardId): PlayerActionTypes => ({
    type: PLAYER__MOVE_CARD_FROM_HAND_TO_BOARD,
    playerIndex,
    cardId,
  }),
  reduceCardDefence: (playerIndex: number, cardId: CardId, amount: number): PlayerActionTypes => ({
    type: PLAYER__REDUCE_CARD_DEFENCE,
    playerIndex,
    cardId,
    amount,
  }),
  killBoardCard: (playerIndex: number, cardId: CardId): PlayerActionTypes => ({
    type: PLAYER__KILL_BOARD_CARD,
    playerIndex,
    cardId,
  }),
  resetMana: (playerIndex: number, amount: number): PlayerActionTypes => ({
    type: PLAYER__RESET_MANA,
    playerIndex,
    amount,
  }),
  reduceMana: (playerIndex: number, amount: number): PlayerActionTypes => ({
    type: PLAYER__REDUCE_MANA,
    playerIndex,
    amount,
  }),
}

export type PlayerActionTypes =
  | MoveCardFromLibraryToHandAction
  | MoveCardFromHandToBoardAction
  | ReduceCardDefenceAction
  | KillBoardCardAction
  | ReduceManaAction
  | ResetManaAction
