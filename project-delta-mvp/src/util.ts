import type { Card } from "./game-state";

export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export function placeAtEnd(orig: Card[], updated: Card[]) {
    for (let i = 0; i < updated.length - 1; ++i) {
        const cur = updated[i];
        const ind = orig.findIndex((v) => v.id === cur.id);
        if (ind === -1) {
            const tmp = updated[updated.length - 1];
            updated[updated.length - 1] = cur;
            updated[i] = tmp;
            return updated;
        }
    }
    return updated;
}