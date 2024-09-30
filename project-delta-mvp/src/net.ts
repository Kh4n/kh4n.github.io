export type NetMessage = TurnOrderMessage

interface TurnOrderMessage {
    type: 'turn_order'
    flip: number
}

export function createTurnOrder() {
    return {
        type: "turn_order",
        flip: Math.random()
    } as TurnOrderMessage
}