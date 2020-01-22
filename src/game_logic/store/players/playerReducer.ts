import { Reducer } from "redux"
import { Player } from "../../gameTypes"
import {
  PLAYER__KILL_BOARD_CARD,
  PLAYER__MOVE_CARD_FROM_HAND_TO_BOARD,
  PLAYER__MOVE_CARD_FROM_LIBRARY_TO_HAND,
  PLAYER__REDUCE_CARD_DEFENCE,
  PLAYER__REDUCE_MANA,
  PLAYER__RESET_MANA,
  PlayerActionTypes,
} from "./playerActions"
import { filterOut } from "../../../utils/arrayUtils"
import { nullPlayer } from "../../nullData"

const initialPlayer: Player = nullPlayer

const playerReducer: Reducer<Player, PlayerActionTypes> = (player = initialPlayer, action) => {
  switch (action.type) {
    case PLAYER__MOVE_CARD_FROM_LIBRARY_TO_HAND:
      return {
        ...player,
        library: filterOut(player.library, action.cardId),
        hand: [...player.hand, action.cardId],
      }
    case PLAYER__MOVE_CARD_FROM_HAND_TO_BOARD:
      return {
        ...player,
        hand: filterOut(player.hand, action.cardId),
        board: [...player.board, action.cardId],
      }
    case PLAYER__REDUCE_CARD_DEFENCE:
      return {
        ...player,
        deck: player.deck.map(card =>
          card.id === action.cardId ? { ...card, defence: card.defence - action.amount } : card,
        ),
      }
    case PLAYER__KILL_BOARD_CARD:
      return {
        ...player,
        board: filterOut(player.board, action.cardId),
        graveyard: [...player.graveyard, action.cardId],
      }
    case PLAYER__REDUCE_MANA:
      return {
        ...player,
        mana: player.mana - action.amount,
      }
    case PLAYER__RESET_MANA:
      return {
        ...player,
        maxMana: action.amount,
        mana: action.amount,
      }
    default:
      return player
  }
}

export default playerReducer
