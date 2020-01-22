import { Player } from "../../gameTypes"

export const START_GAME = "START_GAME"
export const SET_GAME_MAIN = "SET_GAME_MAIN"
export const SET_TURN_ROUND = "SET_TURN_ROUND"

type StartGameAction = {
  type: typeof START_GAME
}

type SetGameMainAction = {
  type: typeof SET_GAME_MAIN
}

type SetTurnRoundAction = {
  type: typeof SET_TURN_ROUND
  round: number
}

export default {
  startGame: (): GameFlowActionType => ({
    type: START_GAME,
  }),
  setGameMain: (): GameFlowActionType => ({
    type: SET_GAME_MAIN,
  }),
  setTurnRound: (round: number): GameFlowActionType => ({
    type: SET_TURN_ROUND,
    round,
  }),
}

export type GameFlowActionType = StartGameAction | SetGameMainAction | SetTurnRoundAction
