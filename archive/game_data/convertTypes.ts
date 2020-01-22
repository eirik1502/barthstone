
// import {Card, GameCard, GamePlayer, Player} from "./gameTypes";
//
//
// export const cardToGame = (card: Card): GameCard => ({
//     cardData: {...card},
//     id: card.name,
//     cost: card.cost,
//     damage: card.damage,
//     defence: card.defence
// })
//
// export const cardsToGame = (cards: Card[]): GameCard[] => cards.map(cardToGame)
//
// export const playerToGame = (player: Player): GamePlayer => {
//     const gameCards = cardsToGame(player.deck)
//     return ({
//         name: player.name,
//         deck: gameCards,
//         library: gameCards.map(card => card.id),
//         hand: [],
//         board: [],
//         graveyard: []
//     })
// }