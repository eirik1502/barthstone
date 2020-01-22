import React from "react"
import styled from "styled-components"
import Card from "./Card"
import { useDrop } from "react-dnd"
import { Card as CardT, CardId } from "../game_logic/gameTypes"
import { CardDragItem, DragItemType } from "../frontend/dndTypes"
import { usePlayCard } from "../game_logic/api/playCard"
import { useAttackCardCard } from "../game_logic/api/attackCard"

type Props = {
  cards: CardT[]
  isBoard: boolean
  ownerPlayerIndex: number
  currentPlayerIndex: number
  onCardClick?: (cardId: CardId) => void
  onCardDrop?: (card: CardId) => void
  onCardDropOnCard?: (targetCard: CardId, droppedCard: CardId) => void
  canPlayCard?: (cardId: CardId) => boolean
  canAttackCardCard?: (attackingCardId: CardId, targetCardId: CardId) => boolean
}

type WrapperProps = {
  glow?: boolean
}
const Wrapper = styled.div<WrapperProps>`
  //max-height: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ${props => (props.glow ? `border: red 2px solid` : null)};
  transition: border 0.2s;
`

const CardCollection: React.FC<Props> = ({
  cards,
  isBoard,
  ownerPlayerIndex,
  currentPlayerIndex,
  onCardClick,
  onCardDrop,
  onCardDropOnCard,
}) => {
  const [canPlayCard] = usePlayCard()
  const [_, canAttackCardCard, canAttack] = useAttackCardCard()

  const [dropProps, dropRef] = useDrop({
    accept: DragItemType.gameCard,
    drop: (item: CardDragItem) => onCardDrop && onCardDrop(item.cardId),
    canDrop: item =>
      isBoard &&
      (!canPlayCard || canPlayCard(item.cardId)) &&
      ownerPlayerIndex === currentPlayerIndex,
    collect: monitor => ({
      potentialTarget: monitor.canDrop(),
    }),
  })

  return (
    <Wrapper ref={dropRef} glow={dropProps.potentialTarget}>
      {cards.map(card => (
        <Card
          card={card}
          key={card.id}
          onClick={() => onCardClick && onCardClick(card.id)}
          onCardDrop={droppedCard => onCardDropOnCard && onCardDropOnCard(card.id, droppedCard)}
          cardCanAttackThis={
            canAttackCardCard && (targetCardId => canAttackCardCard(targetCardId, card.id))
          }
          canBePicked={!isBoard ? canPlayCard(card.id) : canAttack(card.id)}
        />
      ))}
    </Wrapper>
  )
}

export default CardCollection
