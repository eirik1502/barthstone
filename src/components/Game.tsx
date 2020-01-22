import CardCollection from "./CardCollection"
import styled from "styled-components"
import { DndProvider } from "react-dnd"
import { default as DnDBackend } from "react-dnd-html5-backend"
import { CardId, RawPlayer } from "../game_logic/gameTypes"
import React, { useEffect, useRef, useState } from "react"
import imageService from "../services/imageService"
import { useEndTurn } from "../game_logic/api/endTurn"
import { usePlayCard } from "../game_logic/api/playCard"
import { useAttackCardCard } from "../game_logic/api/attackCard"
import {
  useCurrentPlayerIndex,
  usePlayersObservation,
  useTurnRound,
} from "../game_logic/api/observations"
import { useGameCore } from "../game_logic/api/core"

const Arena = styled.div`
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
  justify-content: space-evenly;
`
const ArenaLeftCol = styled.div`
  flex: 1;
`

const ArenaRightCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ArenaCenterCol = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`

const ArenaCenterRow = styled.div`
  flex: 1;
  padding: 1%;
`

const HandArea = styled.div

const imgSize = [128, 96]
const imgUrl = `https://source.unsplash.com/random/${imgSize[0]}x${imgSize[1]}/`

type Props = {
  players: RawPlayer[]
}

const Game: React.FC<Props> = ({ players }) => {
  useGameCore(players)
  const [canEndTurn, endTurn] = useEndTurn()
  const [canPlayCard, playCard] = usePlayCard()
  const [attackCardCard, canAttackCardCard] = useAttackCardCard()
  const playersObservation = usePlayersObservation()
  const currentPlayerIndex = useCurrentPlayerIndex()
  const turnRound = useTurnRound()

  // const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  //
  // useEffect(() => {
  //   if (playersObservation.length === 2 && !imagesLoaded) {
  //     console.log("add images")
  //     playersObservation.forEach(p =>
  //       p.library.forEach(c => {
  //         setTimeout(() => imageService.addImg(c.id, imgUrl), 10)
  //       }),
  //     )
  //     setImagesLoaded(true)
  //   }
  // }, [playersObservation, imagesLoaded])

  const handleEndTurn = () => {
    endTurn()
  }

  const handleCardDropOnBoard = (boardPlayerIndex: number, cardId: CardId) => {
    playCard(cardId)
  }

  const handleCardDropOnBoardCard = (
    boardPlayerIndex: number,
    targetBoardCardId: CardId,
    droppedCardId: CardId,
  ) => {
    attackCardCard(droppedCardId, targetBoardCardId)
  }

  if (playersObservation.length === 2) {
    const renderBoard = (playerIndex: number) => (
      <CardCollection
        key={"board" + playerIndex}
        isBoard={true}
        ownerPlayerIndex={playerIndex}
        currentPlayerIndex={currentPlayerIndex}
        cards={playersObservation[playerIndex].board}
        onCardDrop={cardId => handleCardDropOnBoard(playerIndex, cardId)}
        onCardDropOnCard={(targetCardId, droppedCardId) =>
          handleCardDropOnBoardCard(playerIndex, targetCardId, droppedCardId)
        }
        canAttackCardCard={canAttackCardCard}
        canPlayCard={canPlayCard}
      />
    )

    const renderHand = (playerIndex: number) => (
      <CardCollection
        key={"hand" + playerIndex}
        isBoard={false}
        ownerPlayerIndex={playerIndex}
        currentPlayerIndex={currentPlayerIndex}
        cards={playersObservation[playerIndex].hand}
        canAttackCardCard={canAttackCardCard}
      />
    )

    return (
      <DndProvider backend={DnDBackend}>
        <Arena>
          <ArenaLeftCol />
          <ArenaCenterCol>
            <ArenaCenterRow>{renderHand(1)}</ArenaCenterRow>
            <ArenaCenterRow>{renderBoard(1)}</ArenaCenterRow>
            <ArenaCenterRow>{renderBoard(0)}</ArenaCenterRow>
            <ArenaCenterRow>{renderHand(0)}</ArenaCenterRow>
          </ArenaCenterCol>
          <ArenaRightCol>
            <span>Mana: {playersObservation[1].mana}</span>
            <button style={{ height: "64px", width: "128px" }} onClick={handleEndTurn}>
              End turn
            </button>
            <br />
            <span>{`Turn: ${turnRound}`}</span>
            <span>Mana: {playersObservation[0].mana}</span>
          </ArenaRightCol>
        </Arena>
      </DndProvider>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Game
