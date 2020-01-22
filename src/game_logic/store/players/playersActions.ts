import { Player } from "../../gameTypes"
import { PlayerActionTypes } from "./playerActions"

export const SET_PLAYERS = "SET_PLAYERS"

type SetPlayersAction = {
  type: typeof SET_PLAYERS
  players: Player[]
}

export default {
  setPlayers: (players: Player[]): PlayersActionTypes => ({
    type: SET_PLAYERS,
    players,
  }),
}

export type PlayersActionTypes = PlayerActionTypes | SetPlayersAction
