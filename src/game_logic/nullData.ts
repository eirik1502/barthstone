import { Player } from "./gameTypes"
import { initCardFromRawCard } from "./gameHelpers"

export const nullPlayer: Player = {
  name: "NULL",
  deck: [],
  library: [],
  hand: [],
  board: [],
  graveyard: [],
  maxMana: 0,
  mana: 0,
}

export const nullCardId = "NULL_CARD"
export const nullRawCard = {
  name: nullCardId,
  image: "",
  description: "NULL",
  cost: 0,
  damage: 0,
  defence: 0,
}

export const nullCard = () => initCardFromRawCard(nullRawCard)
