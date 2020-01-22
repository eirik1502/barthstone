import { CardId } from "../../gameTypes"
import { PlayerActionTypes } from "../players/playerActions"

export const SET_TURN_MAIN = "SET_TURN_MAIN"
export const START_TURN = "START_TURN"
export const END_TURN = "END_TURN"
export const CARD_HAS_ATTACKED = "CARD_HAS_ATTACKED"

type StartTurnAction = {
  type: typeof START_TURN
  playerIndex: number
}

type SetTurnMainAction = {
  type: typeof SET_TURN_MAIN
}

type EndTurnAction = {
  type: typeof END_TURN
}
type CardHasAttackedAction = {
  type: typeof CARD_HAS_ATTACKED
  cardId: CardId
}

export default {
  startTurn: (playerIndex: number): TurnActionTypes => ({
    type: START_TURN,
    playerIndex,
  }),
  setTurnMain: (): TurnActionTypes => ({
    type: SET_TURN_MAIN,
  }),
  endTurn: (): TurnActionTypes => ({
    type: END_TURN,
  }),
  cardHasAttacked: (cardId: CardId): TurnActionTypes => ({
    type: CARD_HAS_ATTACKED,
    cardId,
  }),
}

export type TurnActionTypes =
  | StartTurnAction
  | SetTurnMainAction
  | EndTurnAction
  | CardHasAttackedAction
