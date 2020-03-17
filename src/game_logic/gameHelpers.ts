import { Card, CardId, Player, RawCard, RawPlayer } from "./gameTypes"
import { useSelector } from "react-redux"
import { GameLifecycle, GameState } from "./store/rootReducer"
import { TurnLifecycle } from "./store/turn/turnReducer"
import { nullCard } from "./nullData"

export const initCardFromRawCard = (card: RawCard): Card => ({
  cardData: { ...card },
  id: card.id ? card.id : card.name,
  cost: card.cost,
  damage: card.damage,
  defence: card.defence,
  image: card.image,
})

export const initCardsFromRawCards = (cards: RawCard[]): Card[] => cards.map(initCardFromRawCard)

export const initPlayerFromRawPlayer = (player: RawPlayer): Player => {
  const gameCards = initCardsFromRawCards(player.deck)
  return {
    name: player.name,
    deck: gameCards,
    library: gameCards.map(card => card.id),
    hand: [],
    board: [],
    graveyard: [],
    maxMana: 3,
    mana: 3,
  }
}

export const pickRandomCardId = (cardIdCollection: CardId[]): CardId => {
  const randIndex = Math.floor(Math.random() * cardIdCollection.length)
  return cardIdCollection[randIndex]
}

export const pickRandomUniqueCardIds = (
  cardIdCollection: CardId[],
  count: number = 1,
): CardId[] => {
  const collectionCopy = [...cardIdCollection]
  const pickedIds: CardId[] = []
  while (collectionCopy.length > 0 && pickedIds.length < count) {
    const randIndex = Math.floor(Math.random() * collectionCopy.length)
    pickedIds.push(collectionCopy[randIndex])
    collectionCopy.splice(randIndex, 1)
  }
  return pickedIds
}

export const pickRandomCardIdFromLibrary = (player: Player): CardId =>
  pickRandomCardId(player.library)

export const pickRandomUniqueCardIdsFromLibrary = (player: Player, count: number = 1): CardId[] =>
  pickRandomUniqueCardIds(player.library, count)

export const findCardById = (cards: Card[], id: CardId): Card | undefined =>
  cards.find(card => card.id === id)

export const cardIdsToCards = (deck: Card[], cardIds: CardId[]): Card[] =>
  cardIds.map(id => findCardById(deck, id) || nullCard())

export const usePlayerHasControl = () => {
  const gameLifecycle = useSelector<GameState, GameLifecycle>(state => state.gameLifecycle)
  const turnLifecycle = useSelector<GameState, TurnLifecycle>(state => state.turn.turnLifecycle)
  return gameLifecycle === GameLifecycle.MAIN && turnLifecycle === TurnLifecycle.MAIN
}
