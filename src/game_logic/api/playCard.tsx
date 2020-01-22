import { CardId, Player } from "../gameTypes"
import { useDispatch, useSelector } from "react-redux"
import { GameState } from "../store/rootReducer"
import playerActions from "../store/players/playerActions"
import { findCardById, usePlayerHasControl } from "../gameHelpers"
import turnActions from "../store/turn/turnActions"

export const usePlayCard = (): [(cardId: CardId) => boolean, (cardId: CardId) => void] => {
  const players = useSelector<GameState, Player[]>(state => state.players)
  const currPlayerIndex = useSelector<GameState, number>(state => state.turn.currPlayerIndex)
  const currPlayerMana = useSelector<GameState, number>(state =>
    state.players.length === 2 ? state.players[currPlayerIndex].mana : 0,
  )
  const dispatch = useDispatch()
  const playerHasControl = usePlayerHasControl()

  const canPlayCard = (cardId: CardId): boolean => {
    const currPlayer = players[currPlayerIndex]
    const currCard = findCardById(currPlayer.deck, cardId)
    return (
      playerHasControl &&
      currPlayer.hand.includes(cardId) &&
      !!currCard &&
      currPlayerMana >= currCard.cost
    )
  }
  const playCard = (cardId: CardId) => {
    if (canPlayCard(cardId)) {
      const currPlayer = players[currPlayerIndex]
      const card = findCardById(currPlayer.deck, cardId)!
      dispatch(playerActions.reduceMana(currPlayerIndex, card.cost))
      dispatch(playerActions.moveCardFromHandToBoard(currPlayerIndex, cardId))
      dispatch(turnActions.cardHasAttacked(cardId))
    }
  }

  return [canPlayCard, playCard]
}
