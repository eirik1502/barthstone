import {cardToGame} from "./convertTypes";

export type Card = {
    name: string
    image: string
    description: string
    cost: number
    damage: number
    defence: number
}

export type GameCardId = string

export type GameCard = {
    id: GameCardId
    cardData: Card
    cost: number
    damage: number
    defence: number
}

export type Player = {
    name: string
    deck: Card[]
}

export type GamePlayerIdCardCollections = "library" | "hand" | "board" | "graveyard"

export type GamePlayer = {
    name: string
    deck: GameCard[]
    library: GameCardId[]
    hand: GameCardId[]
    board: GameCardId[]
    graveyard: GameCardId[]
}

export enum DragItemType {
    gameCard = "gameCard"
}

export type CardDragItem = {
    type: DragItemType
    gameCard: GameCard
}


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