<script lang="ts">
    import AreaC from "./components/AreaC.svelte";
    import CardC from "./components/CardC.svelte";
    import FieldC from "./components/FieldC.svelte";
    import { BATTLEFIELD_SIZE, Card, type PlayArea } from "./game-state";

    let cards: Card[] = [];
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
    }

    let playArea: PlayArea = {
        battleField: [...cards],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };

    let playArea2: PlayArea = {
        battleField: [],
        channeled: [],
        combatArea: [],
        deck: [],
        hand: [],
        memDiscard: [],
        randomZone: [],
        voidPile: [],
    };
    let dream: Card[] = [];

    console.log(playArea);
</script>

<div class="flex flex-row gap-2 p-2">
    <div class="shrink-0">
        <FieldC bind:playArea />
    </div>
    <div class="shrink-0 rounded border border-black p-2">
        <AreaC name="Dream" bind:area={dream} cols={3} />
    </div>
    <div class="shrink-0">
        <FieldC bind:playArea={playArea2} />
    </div>
</div>
