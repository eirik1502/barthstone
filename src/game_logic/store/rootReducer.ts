import { CardId, Player } from "../gameTypes"
import {
  GameFlowActionType,
  SET_GAME_MAIN,
  SET_TURN_ROUND,
  START_GAME,
} from "./actions/gameFlowActions"
import { combineReducers, Reducer } from "redux"
import playersReducer from "./players/playersReducer"
import turnReducer from "./turn/turnReducer"

export enum GameLifecycle {
  LOADING = "LOADING",
  START = "START",
  MAIN = "MAIN",
  END = "END",
}

// const initialState: GameState = {
//   players: [],
//   gameLifecycle: GameLifecycle.LOADING,
//   turnRound: -1,
//   turn: {
//     currPlayerIndex: -1,
//     turnLifecycle: TurnLifecycle.NONE,
//     hasAttacked: [],
//     timeLeft: 60,
//   },
// }

// type ActionTypes = GameFlowActionType | TurnActionTypes | PlayersActionTypes

const turnRoundReducer: Reducer<number, GameFlowActionType> = (round = 0, action) => {
  if (action.type === SET_TURN_ROUND) {
    return action.round
  }
  return round
}

const gameLifecycleReducer: Reducer<GameLifecycle, GameFlowActionType> = (
  gameLifecycle = GameLifecycle.LOADING,
  action,
) => {
  if (action.type === START_GAME) {
    return GameLifecycle.START
  } else if (action.type === SET_GAME_MAIN) {
    return GameLifecycle.MAIN
  }
  return gameLifecycle
}

const rootReducer = combineReducers({
  players: playersReducer,
  gameLifecycle: gameLifecycleReducer,
  turnRound: turnRoundReducer,
  turn: turnReducer,
})

export default rootReducer

export type GameState = ReturnType<typeof rootReducer>

// {
//   state = { ...state }
//   if (action.type === SET_PLAYERS) {
//     state.players = [...action.players]
//     state.gameLifecycle = GameLifecycle.START
//   }
//   if (action.type === SET_FIRST_TURN) {
//     state.gameLifecycle = GameLifecycle.MAIN
//     state.turnRound = 1
//     state.turn = {
//       ...state.turn,
//       currPlayerIndex: 0,
//       turnLifecycle: TurnLifecycle.START,
//     }
//   }
//   if (action.type === NEXT_TURN) {
//     state.turnRound += state.turn.currPlayerIndex === 1 ? 1 : 0
//     state.turn = {
//       ...state.turn,
//       currPlayerIndex: (state.turn.currPlayerIndex + 1) % state.players.length,
//       turnLifecycle: TurnLifecycle.START,
//     }
//   }
//   if (action.type === SET_TURN_MAIN) {
//     state.turn = {
//       ...state.turn,
//       turnLifecycle: TurnLifecycle.MAIN,
//     }
//   }
//   if (action.type === END_TURN) {
//     state.turn = {
//       ...state.turn,
//       turnLifecycle: TurnLifecycle.END,
//     }
//   }
//
//   state.players = playersReducer(state.players, action)
//
//   return state
// }

//
// const putRandomCardFromLibraryToHand = (player: GamePlayer, count: number = 1): GamePlayer => {
//     range(count).forEach(_ => {
//         if (player.library.length > 0) {
//             const randDeckIndex = Math.floor(Math.random() * player.library.length)
//             const drawCardId = player.library[randDeckIndex]
//             player = {
//                 ...player,
//                 library: filterOut(player.library, drawCardId),
//                 hand: [...player.hand, drawCardId]
//             }
//         }
//     })
//     return player
// }
//
//
// const findCardById = (player: GamePlayer, id: GameCardId): GameCard | undefined =>
//     player.deck.find(card => card.id === id)
//
//
// const takeDamage = (player: GamePlayer, cardId: GameCardId, damage: number) => ({
//     ...player,
//     deck: player.deck.map(card => {
//         if (card.id === cardId) {
//             return ({
//                 ...card,
//                 defence: card.defence - damage
//             })
//         }
//         return card
//     })
// })
//
// const removeCardOnBoardIfDead = (player: GamePlayer, cardId: GameCardId) => {
//     const card = player.deck.find(card => card.id === cardId)
//     if (card && card.defence <= 0) {
//         return ({
//             ...player,
//             deck: filterOut(player.deck, card),
//             board: filterOut(player.board, cardId)
//         })
//     }
//     return player
// }
//
// const playersReducer = (players: GamePlayer[], action: Action) => {
//     if (action.type === ActionType.ATTACK_CARD_CARD) {
//         const attackingPlayer = players[action.attackingPlayerIndex]
//         const targetPlayer = players[action.targetPlayerIndex]
//         if (attackingPlayer !== targetPlayer) {
//             if (attackingPlayer.board.includes(action.attackingCardId) &&
//                 targetPlayer.board.includes(action.targetCardId)) {
//                 const attackingCardDamage = findCardById(attackingPlayer, action.attackingCardId)!.damage
//                 const targetCardDamage = findCardById(targetPlayer, action.targetCardId)!.damage
//
//                 let newAttackingPlayer = takeDamage(attackingPlayer, action.attackingCardId, targetCardDamage)
//                 let newTargetPlayer =  takeDamage(targetPlayer, action.targetCardId, attackingCardDamage)
//                 newAttackingPlayer = removeCardOnBoardIfDead(newAttackingPlayer, action.attackingCardId)
//                 newTargetPlayer = removeCardOnBoardIfDead(newTargetPlayer, action.targetCardId)
//
//                 const newPlayers = []
//                 newPlayers[action.attacingPlayerIndex] = newAttackingPlayer
//                 newPlayers[action.attacingPlayerIndex] = newTargetPlayer
//
//                 return newPlayers
//             }
//         }
//     }
//
//     return players.map((player, i) => {
//         // if (action.type === ActionType.DRAW_RANDOM_CARD) {
//         //     if (action.playerIndex === i) {
//         //         if (player.library.includes(action.cardId)) {
//         //             return ({
//         //                 ...player,
//         //                 library: filterOut(player.library, action.cardId),
//         //                 hand: [...player.hand, action.cardId]
//         //             })
//         //         }
//         //     }
//         // }
//         if (action.type === ActionType.DRAW_RANDOM_CARD) {
//             if (action.playerIndex === i) {
//                 return putRandomCardFromLibraryToHand(player)
//             }
//         } else if (action.type === ActionType.PLAY_CARD) {
//             if (action.playerIndex === i) {
//                 if (player.hand.includes(action.cardId)) {
//                     return ({
//                         ...player,
//                         hand: filterOut(player.hand, action.cardId),
//                         board: [...player.board, action.cardId]
//                     })
//                 }
//             }
//         }
//
//         return player
//     })
// }
