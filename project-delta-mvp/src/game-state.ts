import type { Tuple } from "./util";

type Source = "something";
type Subtype = "human" | "wizard";
type Speed = "n" | "y";
type Stats = UnitStats | ItemStats;

export const BATTLEFIELD_ROWS = 2;
export const BATTLEFIELD_COLS = 6;
export const BATTLEFIELD_SIZE = BATTLEFIELD_ROWS * BATTLEFIELD_COLS;

interface UnitStats {
    type: "unit";
    n1: number;
    n2: number;
}

interface ItemStats {
    type: "item";
    n: number;
}

class Id {
    public readonly id: number = Math.random();
}

export class Card extends Id {
    constructor(
        public name: string,
        public cost: number,
        public source: Source,
        public subtype: Subtype[],
        public speed: Speed,
        public stats: Stats,
        public rulesTxt: string,
        public faceDown: boolean,
    ) {
        super();
    }
}

interface Player {
    life: number;
    resources: number;
}

export type CardSpace = Card | undefined;

export interface PlayArea {
    combatArea: Card[];
    reality: Card[];
    hand: Card[];

    memDiscard: Card[];
    channeled: Card[];
    voidPile: Card[];
    randomZone: Card[];
    deck: Card[];
}
