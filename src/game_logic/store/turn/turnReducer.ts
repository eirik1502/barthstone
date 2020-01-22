import { Reducer } from "redux"
import {
  CARD_HAS_ATTACKED,
  END_TURN,
  SET_TURN_MAIN,
  START_TURN,
  TurnActionTypes,
} from "./turnActions"
import { CardId } from "../../gameTypes"

export enum TurnLifecycle {
  NONE = "NONE",
  START = "START",
  MAIN = "MAIN",
  END = "END",
}

export type TurnState = {
  currPlayerIndex: number
  turnLifecycle: TurnLifecycle
  hasAttacked: CardId[]
  timeLeft: number
}

const initialTurn = {
  currPlayerIndex: 0,
  turnLifecycle: TurnLifecycle.NONE,
  hasAttacked: [],
  timeLeft: 60,
}

// export const SET_TURN_MAIN = "SET_TURN_MAIN"
// export const START_TURN = "START_TURN"
// export const END_TURN = "END_TURN"

const turnReducer: Reducer<TurnState, TurnActionTypes> = (turn = initialTurn, action) => {
  switch (action.type) {
    case START_TURN:
      return {
        ...turn,
        currPlayerIndex: action.playerIndex,
        turnLifecycle: TurnLifecycle.START,
        hasAttacked: [],
        timeLeft: 60,
      }
    case SET_TURN_MAIN:
      return {
        ...turn,
        turnLifecycle: TurnLifecycle.MAIN,
      }
    case END_TURN:
      return {
        ...turn,
        turnLifecycle: TurnLifecycle.END,
      }
    case CARD_HAS_ATTACKED:
      return {
        ...turn,
        hasAttacked: [...turn.hasAttacked, action.cardId],
      }
    default:
      return turn
  }
}

export default turnReducer
