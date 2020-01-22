import { CardId, Player } from "../../gameTypes"

export type PutCardFromLibraryToHand = {}

export type DrawRandomCard = {
  playerIndex: number
}

export type PlayCard = {
  playerIndex: number
  cardId: CardId
}

export type AttackCardCard = {
  attackingPlayerIndex: number
  attackingCardId: CardId
  targetPlayerIndex: number
  targetCardId: CardId
}

export type StartGame = {
  players: Player[]
}

export type EndTurn = {}
