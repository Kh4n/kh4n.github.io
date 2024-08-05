<script lang="ts">
    import AreaC from "./components/AreaC.svelte";
    import FieldC from "./components/FieldC.svelte";
    import FieldOppC from "./components/FieldOppC.svelte";
    import { BATTLEFIELD_SIZE, Card, type PlayArea } from "./game-state";

    let cards: Card[] = [];
    let cardsOpp: Card[] = [];
    for (let i = 0; i < BATTLEFIELD_SIZE; ++i) {
        cards.push(
            new Card(
                "card" + i,
                i,
                "something",
                ["human"],
                "n",
                {
                    type: "unit",
                    n1: 12,
                    n2: 12,
                },
                "string",
                false,
            ),
        );
        cardsOpp.push(
            new Card(
                "card" + i,
                i,
                "something",
                ["human"],
                "n",
                {
                    type: "unit",
                    n1: 12,
                    n2: 12,
                },
                "string",
                false,
            ),
        );
    }

    let player: PlayArea = {
        reality: [...cards],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };

    let opponent: PlayArea = {
        reality: [...cardsOpp],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };
    let dream: Card[] = [];

    console.log(player);
</script>

<div class="flex h-screen max-h-screen min-w-[65rem] flex-row gap-2 p-1">
    <div class="shrink-0 rounded border border-black">
        <AreaC name="Dream" bind:area={dream} col={1} />
    </div>
    <div class="flex flex-col gap-1">
        <div class="shrink-0 border-b border-black pb-1">
            <FieldOppC bind:playArea={opponent} />
        </div>
        <div class="shrink-0">
            <FieldC bind:playArea={player} />
        </div>
    </div>
</div>
