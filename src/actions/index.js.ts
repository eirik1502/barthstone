import {GameCardId, GamePlayer} from "../game_data/gameTypes";


export enum ActionType {
    DRAW_RANDOM_CARD = "DRAW_RANDOM_CARD",
    PLAY_CARD = "PLAY_CARD",
    ATTACK_CARD_CARD = "ATTACK_CARD_CARD"
}

export type Action = {
    type: ActionType
    [key: string]: any
}

type ActionFuncsTypes = {
    [key: string]: (...args: any[]) => Action
}

const actions: ActionFuncsTypes = {
    drawRadnomCard: (playerIndex: number) => ({
        type: ActionType.DRAW_RANDOM_CARD,
        playerIndex
    }),
    playCard: (playerIndex: number, cardId: GameCardId) => ({
        type: ActionType.PLAY_CARD,
        playerIndex,
        cardId
    }),
    attackCardCard: (attackingPlayerIndex: number, attackingCardId: GameCardId, targetPlayerIndex: number, targetCardId: number) => ({
        type: ActionType.ATTACK_CARD_CARD,
        attackingPlayerIndex,
        attackingCardId,
        targetPlayerIndex,
        targetCardId
    }),
}

export default actions