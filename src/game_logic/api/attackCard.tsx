import { CardId, Player } from "../gameTypes"
import { useDispatch, useSelector } from "react-redux"
import { GameState } from "../store/rootReducer"
import { findCardById, usePlayerHasControl } from "../gameHelpers"
import playerActions from "../store/players/playerActions"
import turnActions from "../store/turn/turnActions"

export type AttackCardCard = (attackingCardId: CardId, targetCardId: CardId) => void
export type CanAttackCardCard = (attackingCardId: CardId, targetCardId: CardId) => boolean
export type CanAttack = (cardId: CardId) => boolean

export const useAttackCardCard = (): [AttackCardCard, CanAttackCardCard, CanAttack] => {
  const players = useSelector<GameState, Player[]>(state => state.players)
  const currPlayerIndex = useSelector<GameState, number>(state => state.turn.currPlayerIndex)
  const dispatch = useDispatch()
  const playerHasControl = usePlayerHasControl()
  const hasAttackedCardIds = useSelector<GameState, CardId[]>(state => state.turn.hasAttacked)

  const canAttack: CanAttack = cardId => {
    const currPlayer = players[currPlayerIndex]
    return (
      playerHasControl && currPlayer.board.includes(cardId) && !hasAttackedCardIds.includes(cardId)
    )
  }

  const canAttackCardCard: CanAttackCardCard = (attackingCardId, targetCardId) => {
    const currPlayer = players[currPlayerIndex]
    return (
      canAttack(attackingCardId) &&
      players.some(player => player !== currPlayer && player.board.includes(targetCardId))
    )
  }

  const attackCardCard: AttackCardCard = (attackingCardId, targetCardId) => {
    if (canAttackCardCard(attackingCardId, targetCardId)) {
      const attackingPlayerIndex = currPlayerIndex
      const targetPlayerIndex = players.findIndex(player => player.board.includes(targetCardId))!
      const attackingPlayer = players[attackingPlayerIndex]
      const targetPlayer = players[targetPlayerIndex]
      const attackingCard = findCardById(attackingPlayer.deck, attackingCardId)!
      const targetCard = findCardById(targetPlayer.deck, targetCardId)!
      dispatch(
        playerActions.reduceCardDefence(targetPlayerIndex, targetCard.id, attackingCard.damage),
      )
      dispatch(
        playerActions.reduceCardDefence(attackingPlayerIndex, attackingCard.id, targetCard.damage),
      )
      dispatch(turnActions.cardHasAttacked(attackingCardId))
    }
  }

  return [attackCardCard, canAttackCardCard, canAttack]
}
