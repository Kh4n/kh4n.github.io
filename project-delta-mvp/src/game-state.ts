type Source = string;
// type Type = "Unit" | "Item" | "Spell" | "Claim" | "Unit Spell"

export const BATTLEFIELD_ROWS = 2;
export const BATTLEFIELD_COLS = 6;
export const BATTLEFIELD_SIZE = BATTLEFIELD_ROWS * BATTLEFIELD_COLS;

export type CardState = "Faceup" | "Active" | "Facedown"

class Id {
    public readonly id: number = Math.random();
}

export class Card extends Id {
    constructor(
        public name: string,
        public cost: number,
        public source: Source,
        public type: string,
        public subtype: string,
        public speed: number,
        public offense: number,
        public defense: number,
        public rulesText: string,
        public flavorText: string,
        public state: CardState = "Faceup"
    ) {
        super();
    }
}

export class Player {
    constructor(
        public life: number,
        public energy: number,
        public attacks: number,
    ) {
    }
}

export type CardSpace = Card | undefined;

export interface PlayArea {
    combatArea: Card[];
    reality: Card[];

    memDiscard: Card[];
    channeled: Card[];
    voidPile: Card[];
    randomZone: Card[];
    deck: Card[];
}

export interface GameState {
    player: PlayArea
    opponent: PlayArea
    dream: Card[]
}