import type { GameState } from "./game-state"

export type NetMessage = TurnOrderMessage | StateChangeMessage | EndTurnMessage

interface TurnOrderMessage {
    type: 'turn_order'
    flip: number
}

interface StateChangeMessage {
    type: 'state_change'
    state: GameState
}

interface EndTurnMessage {
    type: 'end_turn'
}

export function createTurnOrder() {
    return {
        type: "turn_order",
        flip: Math.random()
    } as TurnOrderMessage
}

export function createStateChange(state: GameState) {
    return {
        type: 'state_change',
        state
    }
}