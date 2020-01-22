import { Card, CardId } from "../game_logic/gameTypes"

export enum DragItemType {
  gameCard = "gameCard",
}

export type CardDragItem = {
  type: DragItemType
  id: CardId
  cardId: CardId
}
