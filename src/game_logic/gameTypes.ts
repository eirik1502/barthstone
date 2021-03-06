export type CardId = string

export type RawCard = {
  id?: CardId
  name: string
  image: string
  description: string
  cost: number
  damage: number
  defence: number
}

export type RawPlayer = {
  name: string
  deck: RawCard[]
}

export type Card = {
  id: CardId
  cardData: RawCard
  cost: number
  damage: number
  defence: number
  image?: string
}

export type PlayerCardStack = "library" | "hand" | "board" | "graveyard"

export type Player = {
  name: string
  deck: Card[]
  library: CardId[]
  hand: CardId[]
  board: CardId[]
  graveyard: CardId[]
  maxMana: number
  mana: number
}
