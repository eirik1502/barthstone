import React, { Ref } from "react"
import styled from "styled-components"
import { useDrag, useDrop } from "react-dnd"
import { CardDragItem, DragItemType } from "../frontend/dndTypes"
import { Card as CardT, CardId } from "../game_logic/gameTypes"
import { Simulate } from "react-dom/test-utils"
import { CostField, DamageField, DefenceField } from "./AttributeFields"
import RandomImage from "./RandomImage"
import imageService from "../services/imageService"
import { useCardImage } from "../services/useCardImage"

type Props = {
  card: CardT
  onClick: () => void
  onCardDrop?: (cardId: CardId) => void
  cardCanAttackThis?: (cardId: CardId) => boolean
  canPlay?: () => boolean
  canBeTargeted?: boolean
  canBePicked?: boolean
}

type WrapperProps = {
  canBeTargeted?: boolean
  canBePicked?: boolean
}
const Wrapper = styled.div<WrapperProps>`
  width: 128px;
  height: 100%;
  //height: 384px;
  box-sizing: border-box;
  background-color: #61dafb;
  border: black solid 6px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0 0px 12px
    ${props => (props.canBeTargeted && `8px`) || (props.canBePicked && `8px`) || `2px`}
    ${props => (props.canBeTargeted && `#de6a4e`) || (props.canBePicked && `#59e292`) || `#565131`};

  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #565131;
  }
`
// border-color: ${props =>
//       (props.canBeTargeted && `#773b37`) || (props.canBePicked && `#2b7149`) || `#565131`};

const CardRow = styled.div`
  flex: 1;
`

const TopField = styled.div`
  display: flex;
  justify-content: space-between;
`

const TitleField = styled.div``

const Image = styled.div``

const Description = styled.div``

const StatsField = styled.div`
  display: flex;
  justify-content: space-between;
`

const Card: React.FC<Props> = ({
  card,
  onClick,
  onCardDrop,
  canPlay,
  cardCanAttackThis,
  canBeTargeted,
  canBePicked,
}) => {
  const [dragProps, dragRef] = useDrag({
    item: { type: DragItemType.gameCard, id: card.id, cardId: card.id },
  })

  const canDrop = (item: CardDragItem) => !cardCanAttackThis || cardCanAttackThis(item.cardId)
  const [dropProps, dropRef] = useDrop({
    accept: DragItemType.gameCard,
    drop: (item: CardDragItem) => {
      console.log("card on card", item.cardId)
      onCardDrop && onCardDrop(item.cardId)
    },
    canDrop,
    collect: monitor => ({
      // monitor.canDrop() throws an error :(
      canBeDroppedOn: monitor.getItem() && canDrop(monitor.getItem()),
    }),
  })

  return (
    <Wrapper
      key={card.id}
      ref={r => dragRef(r) && dropRef(r)}
      onClick={onClick}
      canBeTargeted={canBeTargeted || dropProps.canBeDroppedOn}
      canBePicked={canBePicked}
    >
      <CardRow>
        <TopField>
          <TitleField>{card.cardData.name} </TitleField>
          <CostField>{card.cost}</CostField>
        </TopField>
      </CardRow>
      <CardRow>
        {card.image ? (
          <img src={card.image} style={{ width: "100%", height: "100%" }} />
        ) : (
          <Image>Card image</Image>
        )}
      </CardRow>
      <CardRow>
        <Description>{card.cardData.description}</Description>
      </CardRow>
      <CardRow>
        <StatsField>
          <DamageField>{card.damage}</DamageField>
          <DefenceField>{card.defence}</DefenceField>
        </StatsField>
      </CardRow>
    </Wrapper>
  )
}

export default Card
