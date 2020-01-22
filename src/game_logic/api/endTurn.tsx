import { useDispatch, useSelector } from "react-redux"
import { GameLifecycle, GameState } from "../store/rootReducer"
import turnActions from "../store/turn/turnActions"
import { usePlayerHasControl } from "../gameHelpers"
import { TurnLifecycle, TurnState } from "../store/turn/turnReducer"

export const useEndTurn = (): [() => boolean, () => void] => {
  const turn = useSelector<GameState, TurnState>(state => state.turn)
  const gameLifecycle = useSelector<GameState, GameLifecycle>(state => state.gameLifecycle)
  const dispatch = useDispatch()
  const playerHasControl = usePlayerHasControl()

  const canEndTurn = (): boolean =>
    playerHasControl &&
    gameLifecycle === GameLifecycle.MAIN &&
    turn.turnLifecycle === TurnLifecycle.MAIN

  const endTurn = () => {
    if (canEndTurn()) {
      dispatch(turnActions.endTurn())
    }
  }

  return [canEndTurn, endTurn]
}
