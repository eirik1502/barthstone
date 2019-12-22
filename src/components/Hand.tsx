import React from "react";
import styled from "styled-components";
import {CardDragItem, DragItemType, GameCard, GameCardId} from "../game_data/gameTypes";
import Card from "./Card";
import {useDrop} from 'react-dnd'


type Props = {
    cards: GameCard[]
    onCardClick?: (cardId: GameCardId) => void
    selectedCardId?: GameCardId
    onCardDrop?: (card: GameCard) => void
    onCardDropOnCard?: (targetCard: GameCard, droppedCard: GameCard) => void
}

const Wrapper = styled.div`
  //max-height: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`


const Hand: React.FC<Props> = ({cards, onCardClick, selectedCardId, onCardDrop, onCardDropOnCard}) => {
    const [dropProps, dropRef] = useDrop({
        accept: DragItemType.gameCard,
        drop: (item: CardDragItem) => onCardDrop && onCardDrop(item.gameCard)
    })

    return (
        <Wrapper ref={dropRef}>
            {cards.map(card =>
                <Card
                    card={card}
                    key={card.id}
                    onClick={() => onCardClick && onCardClick(card.id)}
                    selected={selectedCardId === card.id}
                    onCardDrop={droppedCard => onCardDropOnCard && onCardDropOnCard(card, droppedCard)}
                />)
            }
        </Wrapper>
    )
}

export default Hand