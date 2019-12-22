import React, {useCallback, useEffect, useRef, useState, MouseEvent, ReactElement} from "react";
import {GameCard, GameCardId, GamePlayer, nullGameCardId, Player} from "../game_data/gameTypes";
import {playerToGame} from "../game_data/convertTypes";
import {range} from "../game_data/utils";
import * as PlayerFuncs from "../game_data/playerFuncs";
import Hand from "./Hand";
import styled from "styled-components";
import { DndProvider } from 'react-dnd'
import { default as DnDBackend } from 'react-dnd-html5-backend'
import { Provider as ReduxProvider } from 'react-redux'
import gameStore from '../game_store/mainStore'


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

type Props = {
    players: Player[]
}

enum TurnState {
    None,
    Start,
    Main,
    End
}

enum GameState {
    Loading,
    Start,
    Play,
    End
}

type TargetMarker = {
    x: number
    y: number
}

const StyledMarker = styled.div<TargetMarker>`
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: #ff000055;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`

const Game: React.FC<Props> = ({players}) => {
    const [gamePlayers, setGamePayers] = useState<GamePlayer[]>([])
    const [gameState, setGameState] = useState<GameState>(GameState.Loading)
    const [turn, setTurn] = useState<number>(-1)
    const [turnState, setTurnState] = useState<TurnState>(TurnState.None)
    const [playerTurn, setPlayerTurn] = useState(0)
    const [selectedBoardCardId, setSelectedBoardCardId] = useState<GameCardId | undefined>(undefined)
    const [targetMarker, setTargetMarker] = useState<TargetMarker | undefined>(undefined)
    const marker = useRef<ReactElement | null>(null)

    useEffect(() => {
        if (players.length === 2 && gameState === GameState.Loading) {
            setGamePayers(players.map(playerToGame))
            setGameState(GameState.Start)
            setTurn(0)
            setTurnState(TurnState.Start)
            setPlayerTurn(0)

            // window.addEventListener("mousemove", mouseMove)
        }
    }, [players, gameState])

    useEffect(() => {
        if (gameState === GameState.Start) {
            const drawCount = 3
            gamePlayers.forEach(p => range(drawCount).forEach(_ => PlayerFuncs.drawCard(p)))
            setGamePayers([...gamePlayers])

            setGameState(GameState.Play)
        }
    }, [gameState, gamePlayers])


    useEffect(() => {
        if (gameState === GameState.Play && turnState === TurnState.Start) {
            PlayerFuncs.drawCard(gamePlayers[playerTurn])

            setTurnState(TurnState.Main)
        }
    }, [gameState, turnState, playerTurn])

    useEffect(() => {
        if (gameState === GameState.Play && turnState === TurnState.End) {
            playerTurn === 1 && setTurn(turn+1)
            setPlayerTurn((playerTurn + 1) % gamePlayers.length)
            setTurnState(TurnState.Start)
        }
    })

    const currPlayerTurn = (): GamePlayer => {
        return gamePlayers[playerTurn]
    }

    const endTurn = () => {
        if (gameState === GameState.Play && turnState === TurnState.Main) {
            setTurnState(TurnState.End)
        }
    }

    const playCard = (gplayer: GamePlayer, handCardId: GameCardId) => {
        if (gplayer === gamePlayers[playerTurn]) {
            PlayerFuncs.playCard(gplayer, handCardId)
            setGamePayers([...gamePlayers])
        }
        setSelectedBoardCardId(undefined)
    }

    const attack = (attackingPlayer: GamePlayer, attackingCardId: GameCardId, defendingPlayer: GamePlayer, defendingCardId: GameCardId) => {
        PlayerFuncs.attack(attackingPlayer, attackingCardId, defendingPlayer, defendingCardId)
        setGamePayers([...gamePlayers])
    }

    const handleCardDropOnBoard = (boardOwner: GamePlayer, cardId: GameCardId) => {
        if (currPlayerTurn() === boardOwner) {
            if (boardOwner.hand.includes(cardId)) {
                playCard(boardOwner, cardId)
            }
        }
    }

    const handleCardDropOnBoardCard = (boardOwner: GamePlayer, targetBoardCardId: GameCardId, droppedCardId: GameCardId) => {
        const currPlayer = currPlayerTurn()
        if (currPlayer !== boardOwner) {
            if (currPlayer.board.includes(droppedCardId)) {
                attack(currPlayer, droppedCardId, boardOwner, targetBoardCardId)
            }
        }
    }


    if (gamePlayers.length === 2) {
        const [gplayer1, gplayer2] = gamePlayers;
        return (
            // <ReduxProvider store={gameStore}>
                <DndProvider backend={DnDBackend}>
                    <Arena>
                        <ArenaLeftCol/>
                        <ArenaCenterCol>
                            <ArenaCenterRow>
                                <Hand
                                    cards={PlayerFuncs.cardIdsToCards(gplayer2.deck, gplayer2.hand)}
                                />
                            </ArenaCenterRow>
                            <ArenaCenterRow>
                                <Hand
                                    cards={PlayerFuncs.cardIdsToCards(gplayer2.deck, gplayer2.board)}
                                    selectedCardId={selectedBoardCardId}
                                    onCardDrop={card => handleCardDropOnBoard(gplayer2, card.id)}
                                    onCardDropOnCard={(targetCard, droppedCard) =>
                                        handleCardDropOnBoardCard(gplayer2, targetCard.id, droppedCard.id)
                                    }
                                />
                            </ArenaCenterRow>
                            <ArenaCenterRow>
                                <Hand
                                    cards={PlayerFuncs.cardIdsToCards(gplayer1.deck, gplayer1.board)}
                                    selectedCardId={selectedBoardCardId}
                                    onCardDrop={(card: GameCard) => handleCardDropOnBoard(gplayer1, card.id)}
                                />
                            </ArenaCenterRow>
                            <ArenaCenterRow>
                                <Hand
                                    cards={PlayerFuncs.cardIdsToCards(gplayer1.deck, gplayer1.hand)}
                                />
                            </ArenaCenterRow>
                        </ArenaCenterCol>
                        <ArenaRightCol>
                            <button onClick={endTurn}>End turn</button>
                        </ArenaRightCol>
                    </Arena>
                </DndProvider>
            // </ReduxProvider>
        )
    }
    else {
        return <div>Loading...</div>
    }
}

export default Game