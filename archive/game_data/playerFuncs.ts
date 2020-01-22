// import {GameCard, GameCardId, GamePlayer, GamePlayerIdCardCollections, nullGameCard} from "./gameTypes";
//
//
// const findCardById = (cards: GameCard[], id: GameCardId): GameCard => cards.find(card => card.id === id) || nullGameCard
// const removeCardById = (cardIds: GameCard[], id: GameCardId): GameCard[] => cardIds.filter(card => card.id !== id)
//
// const removeCardId = (cardIds: GameCardId[], id: GameCardId): GameCardId[] => cardIds.filter(cardId => cardId !== id)
//
// export const cardIdsToCards = (deck: GameCard[], cardIds: GameCardId[]): GameCard[] =>
//     cardIds.map(id => findCardById(deck, id))
//
// export const playCard = (player: GamePlayer, cardId: GameCardId) => {
//     player.hand = removeCardId(player.hand, cardId)
//     player.board = [...player.board, cardId]
// }
//
// export const drawCard = (player: GamePlayer) => {
//     if (player.library.length > 0) {
//         const randDeckIndex = Math.floor(Math.random() * player.library.length)
//         const drawCardId = player.library[randDeckIndex]
//         player.library = removeCardId(player.library, drawCardId)
//         player.hand = [...player.hand, drawCardId]
//     }
// }
//
// const checkDead = (player: GamePlayer, cardCollectionKey: GamePlayerIdCardCollections, cardId: GameCardId) => {
//     const card = findCardById(player.deck, cardId)
//     if (card.defence <= 0) {
//         player[cardCollectionKey] = removeCardId(player[cardCollectionKey], cardId)
//     }
// }
//
// // player1: attacker, player2: target
// export const attack = (attackingPlayer:GamePlayer, attackCardId: GameCardId, defendingPlayer:GamePlayer, defendingCardId: GameCardId) => {
//     const attackingCard = findCardById(attackingPlayer.deck, attackCardId)
//     const defendingCard = findCardById(defendingPlayer.deck, defendingCardId)
//     defendingCard.defence -= attackingCard.damage
//     attackingCard.defence -= defendingCard.damage
//
//     checkDead(defendingPlayer, "board", defendingCardId)
//     checkDead(attackingPlayer, "board", attackCardId)
//     // defendingPlayer.deck = defendingPlayer.deck.map(card => {
//     //     if (card.id === defendingCardId) {
//     //         return ({
//     //             ...card,
//     //             defence: card.defence - attackingCard.damage
//     //         })
//     //     }
//     //     else {
//     //         return card
//     //     }
//     // })
// }