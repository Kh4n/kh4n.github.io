import { parse } from "csv-parse/sync"
import csvUrl from './assets/atnia_set1.csv'
import { Card } from "./game-state"

const EXPECTED_HEADER = [
    "Name",
    "Energy Cost",
    "Source",
    "Type",
    "Subtype",
    "Speed",
    "Offense",
    "Defense",
    "RulesText",
    "FlavorText",
    "image",
    "CommentsTags",
    "Comments",
    "RelatedCards",
    "TagsReal",
    "Formats",
    "Set"
]

export async function getCards() {
    let cd = await (await fetch(csvUrl)).text()
    let cards = parse(cd) as string[][]
    cards = cards.filter(function(e) {
        return e.length > 0
            && e[0].length > 0
            && e[0] != "BEGIN_CARDS"
            && !e[0].startsWith("-")
    })
    for (let i = 0; i < Math.min(cards[0].length, EXPECTED_HEADER.length); ++i) {
        if (cards[0][i] !== EXPECTED_HEADER[i]) {
            throw `cards header did not match! expected ${EXPECTED_HEADER} but got ${cards[0]}`
        }
    }
    return cards.slice(1).map(function(r) {
        // let t = r[3]
        // if (t !== "Unit" && t !== "Item" && t !== "Spell" && t !== "Claim" && t !== "Unit Spell") {
        //     throw `invalid type: '${r[3]}', expected 'Unit', 'Item', or 'Spell'`
        // }
        return new Card(
            r[0], 
            parseInt(r[1]),
            r[2],
            r[3],
            r[4],
            parseInt(r[5]),
            parseInt(r[6]),
            parseInt(r[7]),
            r[8],
            r[9]
        )
    })
}