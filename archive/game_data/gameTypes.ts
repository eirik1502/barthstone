import {cardToGame} from "./convertTypes";




export const nullGameCardId = "NULL"

export const nullCard: Card = {
    name: nullGameCardId,
    image: "",
    description: "",
    cost: -1,
    damage: -1,
    defence: -1
}

export const nullGameCard: GameCard = cardToGame(nullCard)