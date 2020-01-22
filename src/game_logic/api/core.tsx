import { Player, RawPlayer } from "../gameTypes"
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux"
import rootReducer, { GameLifecycle, GameState } from "../store/rootReducer"
import playerActions from "../store/players/playerActions"
import {
  findCardById,
  initCardFromRawCard,
  initPlayerFromRawPlayer,
  pickRandomUniqueCardIdsFromLibrary,
} from "../gameHelpers"
import React, { useEffect } from "react"
import playersActions from "../store/players/playersActions"
import gameFlowActions from "../store/actions/gameFlowActions"
import turnActions from "../store/turn/turnActions"
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { TurnLifecycle, TurnState } from "../store/turn/turnReducer"
import { nullPlayer } from "../nullData"

const store = createStore(rootReducer, composeWithDevTools())

export const BarthstoneProvider: React.FC = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export const useGameCore = (initialPlayers: RawPlayer[]) => {
  const players = useSelector<GameState, Player[]>(state => state.players)
  const currPlayerIndex = useSelector<GameState, number>(state => state.turn.currPlayerIndex)
  const turnRound = useSelector<GameState, number>(state => state.turnRound)
  const turn = useSelector<GameState, TurnState>(state => state.turn)
  const gameLifecycle = useSelector<GameState, GameLifecycle>(state => state.gameLifecycle)
  const currPlayerMaxMana = useSelector<GameState, number>(state =>
    state.players.length === 2 ? state.players[currPlayerIndex].maxMana : nullPlayer.maxMana,
  )
  const dispatch = useDispatch()

  const drawRandomCard = (playerIndex: number, count: number = 1) => {
    pickRandomUniqueCardIdsFromLibrary(players[playerIndex], count).forEach(cardId =>
      dispatch(playerActions.moveCardFromLibraryToHand(playerIndex, cardId)),
    )
  }

  useEffect(() => {
    if (initialPlayers.length === 2) {
      dispatch(playersActions.setPlayers(initialPlayers.map(initPlayerFromRawPlayer)))
    }
  }, [initialPlayers, dispatch])

  useEffect(() => {
    if (players.length === 2 && gameLifecycle === GameLifecycle.LOADING) {
      dispatch(gameFlowActions.startGame())
    }
  }, [players, gameLifecycle, dispatch])

  useEffect(() => {
    if (gameLifecycle === GameLifecycle.START) {
      players.forEach((_, playerIndex) => drawRandomCard(playerIndex, 3))
      dispatch(gameFlowActions.setGameMain())
      dispatch(gameFlowActions.setTurnRound(0))
      players.forEach((_, playerIndex) => dispatch(playerActions.resetMana(playerIndex, 0)))
      dispatch(turnActions.startTurn(0))
    }
  }, [players, gameLifecycle, dispatch])

  useEffect(() => {
    if (gameLifecycle === GameLifecycle.MAIN && turn.turnLifecycle === TurnLifecycle.START) {
      currPlayerIndex === 0 && dispatch(gameFlowActions.setTurnRound(turnRound + 1))
      dispatch(playerActions.resetMana(currPlayerIndex, currPlayerMaxMana + 1))
      drawRandomCard(currPlayerIndex)
      dispatch(turnActions.setTurnMain())
    }
  }, [
    gameLifecycle,
    turn.turnLifecycle,
    currPlayerIndex,
    currPlayerMaxMana,
    drawRandomCard,
    dispatch,
  ])

  useEffect(() => {
    if (gameLifecycle === GameLifecycle.MAIN && turn.turnLifecycle === TurnLifecycle.END) {
      dispatch(turnActions.startTurn((currPlayerIndex + 1) % players.length))
    }
  }, [gameLifecycle, turn.turnLifecycle, dispatch])

  useEffect(() => {
    players.forEach((player, playerIndex) =>
      player.board.forEach(
        cardId =>
          findCardById(player.deck, cardId)!.defence <= 0 &&
          dispatch(playerActions.killBoardCard(playerIndex, cardId)),
      ),
    )
  }, [players, dispatch])
}
