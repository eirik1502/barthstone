import React, {Ref} from "react";
import styled from 'styled-components'
import {CardDragItem, DragItemType, GameCard} from "../game_data/gameTypes";
import {useDrag, useDrop} from 'react-dnd'

type Props = {
    card: GameCard
    onClick: () => void
    selected?: boolean
    onCardDrop?: (card: GameCard) => void
}

type WrapperProps = {
    selected?: boolean
}
const Wrapper = styled.div<WrapperProps>`
  width: 128px;
  height: 100%;
  box-sizing: border-box;
  background-color: #61dafb;
  border: black solid 6px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  transition: border-color 0.2s;
  
  &:hover {
    border-color: ${props => props.selected? `#773b37`:`#77734f`};
  }
  
  ${props => props.selected && `border-color: red`}
`

const TitleField = styled.div``

const Image = styled.div``

const Description = styled.div``

const StatsField = styled.div`
  display: flex;
  justify-content: space-between;
`

const DamageField = styled.div`
  width: 32px;
  height: 32px;
  background-color: #fb1a18;
  border-radius: 32px;
  border: black solid 2px;
  font-size: 32px;
   text-align: center;
`

const DefenceField = styled.div`
  width: 32px;
  height: 32px;
  background-color: #1c3bfb;
  border-radius: 32px;
  border: black solid 2px;
  font-size: 32px;
  text-align: center;
`

const Card: React.FC<Props> = ({card, onClick, selected, onCardDrop}) => {
    const [dragProps, dragRef] = useDrag({
        item: {type: DragItemType.gameCard, gameCard: card}
    })

    const [dropProps, dropRef] = useDrop({
        accept: DragItemType.gameCard,
        drop: (item: CardDragItem) => {
            console.log("card on card", item.gameCard.id)
            onCardDrop && onCardDrop(item.gameCard)
        }
    })

    return (
        <Wrapper ref={r => dragRef(r) && dropRef(r)} onClick={onClick} selected={selected}>
            <TitleField>
                {card.cardData.name}
            </TitleField>
            <Image>
                {card.cardData.image}
            </Image>
            <Description>
                {card.cardData.description}
            </Description>
            <StatsField>
                <DamageField>
                    {card.damage}
                </DamageField>
                <DefenceField>
                    {card.defence}
                </DefenceField>
            </StatsField>
        </Wrapper>
    )
}

export default Card