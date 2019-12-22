import {GameCard, GameCardId, GamePlayer, nullGameCard} from "../game_data/gameTypes";
import {Action, ActionType} from "../actions/index.js";
import {filterOut} from "../utils/arrayUtils";

enum TurnState {
    None,
    Start,
    Main,
    End
}

enum GameLifecycle {
    Loading,
    Start,
    Play,
    End
}

type StoreState = {
    players: GamePlayer[]
    gameLifecycle: GameLifecycle
    turnState: TurnState
    turn: {
        hasAttacked: GameCardId[]
        timeLeft: number
    }
}

const initialState: StoreState = {
    players: [],
    gameLifecycle: GameLifecycle.Loading,
    turnState: TurnState.None,
    turn: {
        hasAttacked: [],
        timeLeft: 60
    }
}


export default (state = initialState, action: Action) => {
    return ({
        ...state,
        players: playersReducer(state.players, action),
    })
}

const findCardById = (player: GamePlayer, id: GameCardId): GameCard | undefined =>
    player.deck.find(card => card.id === id)


const takeDamage = (player: GamePlayer, cardId: GameCardId, damage: number) => ({
    ...player,
    deck: player.deck.map(card => {
        if (card.id === cardId) {
            return ({
                ...card,
                defence: card.defence - damage
            })
        }
        return card
    })
})

const removeCardOnBoardIfDead = (player: GamePlayer, cardId: GameCardId) => {
    const card = player.deck.find(card => card.id === cardId)
    if (card && card.defence <= 0) {
        return ({
            ...player,
            deck: filterOut(player.deck, card),
            board: filterOut(player.board, cardId)
        })
    }
    return player
}

const playersReducer = (players: GamePlayer[], action: Action) => {
    if (action.type === ActionType.ATTACK_CARD_CARD) {
        const attackingPlayer = players[action.attackingPlayerIndex]
        const targetPlayer = players[action.targetPlayerIndex]
        if (attackingPlayer !== targetPlayer) {
            if (attackingPlayer.board.includes(action.attackingCardId) &&
                targetPlayer.board.includes(action.targetCardId)) {
                const attackingCardDamage = findCardById(attackingPlayer, action.attackingCardId)!.damage
                const targetCardDamage = findCardById(targetPlayer, action.targetCardId)!.damage

                let newAttackingPlayer = takeDamage(attackingPlayer, action.attackingCardId, targetCardDamage)
                let newTargetPlayer =  takeDamage(targetPlayer, action.targetCardId, attackingCardDamage)
                newAttackingPlayer = removeCardOnBoardIfDead(newAttackingPlayer, action.attackingCardId)
                newTargetPlayer = removeCardOnBoardIfDead(newTargetPlayer, action.targetCardId)

                const newPlayers = []
                newPlayers[action.attacingPlayerIndex] = newAttackingPlayer
                newPlayers[action.attacingPlayerIndex] = newTargetPlayer

                return newPlayers
            }
        }
    }

    return players.map((player, i) => {
        // if (action.type === ActionType.DRAW_RANDOM_CARD) {
        //     if (action.playerIndex === i) {
        //         if (player.library.includes(action.cardId)) {
        //             return ({
        //                 ...player,
        //                 library: filterOut(player.library, action.cardId),
        //                 hand: [...player.hand, action.cardId]
        //             })
        //         }
        //     }
        // }
        if (action.type === ActionType.DRAW_RANDOM_CARD) {
            if (action.playerIndex === i) {
                if (player.library.length > 0) {
                    const randDeckIndex = Math.floor(Math.random() * player.library.length)
                    const drawCardId = player.library[randDeckIndex]
                    return ({
                        ...player,
                        library: filterOut(player.library, drawCardId),
                        hand: [...player.hand, drawCardId]
                    })
                }
            }
        } else if (action.type === ActionType.PLAY_CARD) {
            if (action.playerIndex === i) {
                if (player.hand.includes(action.cardId)) {
                    return ({
                        ...player,
                        hand: filterOut(player.hand, action.cardId),
                        board: [...player.board, action.cardId]
                    })
                }
            }
        }

        return player
    })
}
