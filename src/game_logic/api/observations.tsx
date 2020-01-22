import { useSelector } from "react-redux"
import { GameState } from "../store/rootReducer"
import { Card, Player } from "../gameTypes"
import { useEffect, useState } from "react"
import { cardIdsToCards } from "../gameHelpers"

export type PlayerObservation = {
  name: string
  mana: number
  library: Card[]
  hand: Card[]
  board: Card[]
  graveyard: Card[]
}

export type PlayersObservation = PlayerObservation[]

export const usePlayersObservation = (): PlayersObservation => {
  const players = useSelector<GameState, Player[]>(state => state.players)
  const [playersObservation, setPlayersObservation] = useState<PlayerObservation[]>([])

  useEffect(() => {
    setPlayersObservation(
      players.map(player => ({
        name: player.name,
        mana: player.mana,
        library: cardIdsToCards(player.deck, player.library),
        hand: cardIdsToCards(player.deck, player.hand),
        board: cardIdsToCards(player.deck, player.board),
        graveyard: cardIdsToCards(player.deck, player.graveyard),
      })),
    )
  }, [players])

  return playersObservation
}

export const useCurrentPlayerIndex = (): number =>
  useSelector<GameState, number>(state => state.turn.currPlayerIndex)

export const useTurnRound = (): number => useSelector<GameState, number>(state => state.turnRound)
