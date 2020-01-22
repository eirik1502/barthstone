import { Reducer } from "redux"
import { Player } from "../../gameTypes"
import { PlayerActionTypes } from "./playerActions"
import { PlayersActionTypes, SET_PLAYERS } from "./playersActions"
import playerReducer from "./playerReducer"

const initialPlayers: Player[] = []

const playersReducer: Reducer<Player[], PlayersActionTypes> = (
  players = initialPlayers,
  action,
) => {
  if (action.type.startsWith("PLAYER/")) {
    const playerAction = action as PlayerActionTypes
    return players.map((player, i) =>
      playerAction.playerIndex === i ? playerReducer(player, playerAction) : player,
    )
  }

  if (action.type === SET_PLAYERS) {
    return [...action.players]
  }
  return players
}

export default playersReducer
